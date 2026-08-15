// js/analysis.js - Score Analysis Module

class ScoreAnalyzer {
    constructor() {
        this.universitiesData = [];
        this.examGroups = {};
        this.priorityScores = {};
        this.selectedTarget = null;
        this.currentScores = {};

        this.init();
    }

    async init() {
        await this.loadData();
        this.populateSchools();
        this.setupEventListeners();
        this.calculateDaysRemaining();
    }

    // ===== DATA LOADING =====
    async loadData() {
        try {
            // Load universities data
            const uniResponse = await fetch('data/universities.json');
            const rawData = await uniResponse.json();

            // Flatten the nested structure for easier use
            this.universitiesData = this.flattenUniversitiesData(rawData);

            // Load exam groups
            const examResponse = await fetch('data/exam_groups.json');
            this.examGroups = await examResponse.json();

            // Load priority scores
            const priorityResponse = await fetch('data/priority_scores.json');
            this.priorityScores = await priorityResponse.json();

        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Flatten nested universities data into flat array
    flattenUniversitiesData(rawData) {
        const flatData = [];

        const universities = rawData.universities || rawData;

        universities.forEach(uni => {
            if (uni.majors) {
                // Nested structure: university -> majors
                uni.majors.forEach(major => {
                    // Get score for THPT method, block A00 first, or first available
                    const scoreEntry = major.scores?.find(s => s.method === 'THPT' && s.year === 2025)
                        || major.scores?.find(s => s.year === 2025)
                        || major.scores?.[0];

                    // Get all blocks for this major
                    const blocks = [...new Set(
                        major.scores
                            ?.filter(s => s.method === 'THPT')
                            ?.map(s => s.block) || ['A00']
                    )];

                    flatData.push({
                        id: `${uni.code}-${major.code}`,
                        school_code: uni.code,
                        school_name: uni.name,
                        major_code: major.code,
                        major_name: major.name,
                        exam_groups: blocks,
                        block: scoreEntry?.block || 'A00',
                        score_2025: scoreEntry?.score || 0,
                        scores: {
                            '2025': scoreEntry?.score || 0
                        },
                        region: this.getRegionFromLocation(uni.location),
                        location: uni.location,
                        quota: major.quota
                    });
                });
            } else {
                // Already flat structure
                flatData.push(uni);
            }
        });

        return flatData;
    }

    getRegionFromLocation(location) {
        const northCities = ['Hà Nội', 'Hải Phòng', 'Thái Nguyên', 'Hưng Yên', 'Bắc Ninh'];
        const southCities = ['TP.HCM', 'Hồ Chí Minh', 'Cần Thơ', 'Bình Dương', 'Đồng Nai'];

        if (northCities.some(c => location?.includes(c))) return 'Miền Bắc';
        if (southCities.some(c => location?.includes(c))) return 'Miền Nam';
        return 'Miền Trung';
    }

    // ===== POPULATE DROPDOWNS =====
    populateSchools() {
        const schoolSelect = document.getElementById('school-select');

        // Get unique schools
        const schools = [...new Set(this.universitiesData.map(u => u.school_name))].filter(s => s).sort();

        console.log(`Loaded ${schools.length} schools from ${this.universitiesData.length} records`);

        if (schools.length === 0) {
            console.error('No schools found in data!');
            schoolSelect.innerHTML = '<option value="">-- Không có dữ liệu trường --</option>';
            return;
        }

        schools.forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            schoolSelect.appendChild(option);
        });

        // Add count info
        const countInfo = document.createElement('small');
        countInfo.className = 'school-count';
        countInfo.textContent = `(${schools.length} trường)`;
        countInfo.style.cssText = 'color: var(--gray-500); font-size: 0.8rem; margin-left: 8px;';
        schoolSelect.parentElement.querySelector('label')?.appendChild(countInfo);
    }

    populateMajors(schoolName) {
        const majorSelect = document.getElementById('major-select');
        majorSelect.innerHTML = '<option value="">-- Chọn ngành --</option>';

        const majors = this.universitiesData
            .filter(u => u.school_name === schoolName)
            .sort((a, b) => (a.major_name || '').localeCompare(b.major_name || ''));

        console.log(`Found ${majors.length} majors for "${schoolName}"`);

        if (majors.length === 0) {
            majorSelect.innerHTML = '<option value="">-- Không có ngành --</option>';
            return;
        }

        majors.forEach(major => {
            const option = document.createElement('option');
            option.value = major.id || `${major.school_code}-${major.major_code}`;
            // Hiển thị tên ngành + điểm chuẩn
            const score = major.score_2025 || major.scores?.['2025'] || major.score || 0;
            option.textContent = `${major.major_name} (${score.toFixed(2)}đ)`;
            option.dataset.score = score;
            option.dataset.blocks = JSON.stringify(major.exam_groups || [major.block]);
            majorSelect.appendChild(option);
        });

        majorSelect.disabled = false;
    }

    populateBlocks(blocks) {
        const blockSelect = document.getElementById('block-select');
        blockSelect.innerHTML = '<option value="">-- Chọn khối --</option>';

        blocks.forEach(block => {
            const option = document.createElement('option');
            option.value = block;
            option.textContent = this.examGroups[block]?.name || block;
            blockSelect.appendChild(option);
        });

        blockSelect.disabled = false;

        // Auto-select if only one block
        if (blocks.length === 1) {
            blockSelect.value = blocks[0];
            this.onBlockChange();
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // School select
        document.getElementById('school-select').addEventListener('change', (e) => {
            this.onSchoolChange(e.target.value);
        });

        // Major select
        document.getElementById('major-select').addEventListener('change', (e) => {
            this.onMajorChange(e.target);
        });

        // Block select
        document.getElementById('block-select').addEventListener('change', () => {
            this.onBlockChange();
        });

        // Priority selects
        document.getElementById('region-select').addEventListener('change', () => {
            this.updateScoreSummary();
        });

        document.getElementById('object-select').addEventListener('change', () => {
            this.updateScoreSummary();
        });

        // Analyze button
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.analyze();
        });

        // Reset button
        document.getElementById('reset-btn')?.addEventListener('click', () => {
            this.reset();
        });

        // Save button
        document.getElementById('save-btn')?.addEventListener('click', () => {
            this.saveResults();
        });

        // Ask AI button
        document.getElementById('ask-ai-btn')?.addEventListener('click', () => {
            this.askAI();
        });
    }

    onSchoolChange(schoolName) {
        if (schoolName) {
            this.populateMajors(schoolName);
        } else {
            document.getElementById('major-select').disabled = true;
            document.getElementById('major-select').innerHTML = '<option value="">-- Chọn ngành --</option>';
        }

        // Reset subsequent fields
        document.getElementById('block-select').disabled = true;
        document.getElementById('block-select').innerHTML = '<option value="">-- Chọn khối --</option>';
        document.getElementById('target-info').style.display = 'none';
        document.getElementById('score-inputs').innerHTML = '<p class="placeholder-text">Vui lòng chọn trường và ngành trước</p>';
        document.getElementById('score-summary').style.display = 'none';
        document.getElementById('analyze-btn').disabled = true;
    }

    onMajorChange(selectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];

        if (selectedOption.value) {
            const score = parseFloat(selectedOption.dataset.score);
            const blocks = JSON.parse(selectedOption.dataset.blocks);

            // Show target score
            document.getElementById('target-score-value').textContent = score.toFixed(2) + ' điểm';
            document.getElementById('target-info').style.display = 'block';

            // Store selected target
            this.selectedTarget = {
                school: document.getElementById('school-select').value,
                major: selectElement.options[selectElement.selectedIndex].textContent,
                majorId: selectedOption.value,
                score: score,
                blocks: blocks
            };

            // Populate blocks
            this.populateBlocks(blocks);
        }
    }

    onBlockChange() {
        const block = document.getElementById('block-select').value;

        if (block && this.examGroups[block]) {
            this.selectedTarget.block = block;
            this.renderScoreInputs(block);
            document.getElementById('score-summary').style.display = 'block';
        }
    }

    // ===== RENDER SCORE INPUTS =====
    renderScoreInputs(block) {
        const container = document.getElementById('score-inputs');
        const examGroup = this.examGroups[block];

        container.innerHTML = examGroup.subjects.map((subject, index) => `
            <div class="score-input-group">
                <label>
                    <i class="fa-solid fa-book"></i>
                    ${subject}
                </label>
                <input type="number" 
                       id="score-${examGroup.subject_codes[index]}"
                       data-subject="${examGroup.subject_codes[index]}"
                       min="0" max="10" step="0.25"
                       placeholder="0.0"
                       value="">
            </div>
        `).join('');

        // Add event listeners to score inputs
        container.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateScoreInput(e.target);
                this.updateScoreSummary();
            });
        });
    }

    validateScoreInput(input) {
        const value = parseFloat(input.value);

        input.classList.remove('valid', 'invalid');

        if (input.value === '') return;

        if (isNaN(value) || value < 0 || value > 10) {
            input.classList.add('invalid');
        } else {
            input.classList.add('valid');
        }
    }

    // ===== SCORE CALCULATIONS =====
    updateScoreSummary() {
        const inputs = document.querySelectorAll('#score-inputs input');
        let rawScore = 0;
        let validInputs = 0;

        this.currentScores = {};

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value) && value >= 0 && value <= 10) {
                rawScore += value;
                validInputs++;
                this.currentScores[input.dataset.subject] = value;
            }
        });

        // Calculate priority score
        const region = document.getElementById('region-select').value;
        const object = document.getElementById('object-select').value;

        const regionScore = this.priorityScores.regions[region]?.score || 0;
        const objectScore = this.priorityScores.objects[object]?.score || 0;
        const priorityScore = regionScore + objectScore;

        const totalScore = rawScore + priorityScore;

        // Update UI
        document.getElementById('raw-score').textContent = rawScore.toFixed(2);
        document.getElementById('priority-score').textContent = `+${priorityScore.toFixed(2)}`;
        document.getElementById('total-score').textContent = totalScore.toFixed(2);

        // Enable/disable analyze button
        document.getElementById('analyze-btn').disabled = validInputs !== inputs.length || inputs.length === 0;

        // Store for analysis
        this.currentTotalScore = totalScore;
        this.currentPriorityScore = priorityScore;
    }

    // ===== ANALYSIS ALGORITHMS =====
    calculateProbability(currentScore, targetScore) {
        const gap = currentScore - targetScore;

        let probability;
        if (gap >= 2.0) probability = 95;
        else if (gap >= 0.5) probability = 80;
        else if (gap >= 0) probability = 65;
        else if (gap >= -1.0) probability = 45;
        else if (gap >= -2.0) probability = 25;
        else if (gap >= -3.0) probability = 10;
        else probability = 5;

        return Math.max(5, Math.min(95, probability));
    }

    getProbabilityLevel(probability) {
        if (probability >= 80) return { level: 'safe', label: 'An toàn', color: '#22c55e' };
        if (probability >= 60) return { level: 'moderate', label: 'Vừa sức', color: '#3b82f6' };
        if (probability >= 40) return { level: 'risky', label: 'Có rủi ro', color: '#f59e0b' };
        return { level: 'hard', label: 'Khó đậu', color: '#ef4444' };
    }

    allocateTargetScores(currentScores, totalGap) {
        const subjects = Object.entries(currentScores)
            .map(([code, score]) => ({ code, score }))
            .sort((a, b) => a.score - b.score);

        let remainingGap = Math.max(0, totalGap);
        const result = [];

        for (const subject of subjects) {
            const potential = 10 - subject.score;
            const allocation = Math.min(
                potential,
                remainingGap * 0.45,
                2.5
            );

            const actualAllocation = Math.max(0, allocation);

            result.push({
                code: subject.code,
                name: this.getSubjectName(subject.code),
                current: subject.score,
                suggested: Math.min(10, subject.score + actualAllocation),
                gap: actualAllocation,
                priority: this.getSubjectPriority(actualAllocation),
                status: this.getSubjectStatus(actualAllocation)
            });

            remainingGap -= actualAllocation;
        }

        return result.sort((a, b) => a.priority - b.priority);
    }

    getSubjectName(code) {
        const names = {
            'toan': 'Toán',
            'ly': 'Vật lý',
            'hoa': 'Hóa học',
            'sinh': 'Sinh học',
            'van': 'Ngữ văn',
            'anh': 'Tiếng Anh',
            'su': 'Lịch sử',
            'dia': 'Địa lý'
        };
        return names[code] || code;
    }

    getSubjectPriority(gap) {
        if (gap >= 1.5) return 1;
        if (gap >= 0.5) return 2;
        return 3;
    }

    getSubjectStatus(gap) {
        if (gap >= 1.5) return 'critical';
        if (gap >= 0.5) return 'warning';
        return 'good';
    }

    findAlternatives(currentScore, targetMajorName) {
        // Find schools with same or related majors
        const keywords = targetMajorName.toLowerCase().split(' ').filter(w => w.length > 2);

        let candidates = this.universitiesData.filter(uni => {
            // Score should be achievable (current + 2)
            const uniScore = uni.score_2025 || uni.scores?.['2025'] || uni.score || 0;
            if (uniScore > currentScore + 2) return false;

            // Check if major name contains keywords
            const majorLower = uni.major_name.toLowerCase();
            return keywords.some(kw => majorLower.includes(kw));
        });

        // Calculate probability for each
        candidates = candidates.map(uni => {
            const uniScore = uni.score_2025 || uni.scores?.['2025'] || uni.score || 0;
            const probability = this.calculateProbability(currentScore, uniScore);
            const level = this.getProbabilityLevel(probability);

            return {
                ...uni,
                score: uniScore,
                probability,
                level: level.level,
                gap: currentScore - uniScore
            };
        });

        // Sort by probability (highest first) then by score gap
        candidates.sort((a, b) => {
            if (b.probability !== a.probability) return b.probability - a.probability;
            return Math.abs(a.gap) - Math.abs(b.gap);
        });

        // Remove duplicates and limit
        const seen = new Set();
        return candidates.filter(c => {
            const key = `${c.school_name}-${c.major_name}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, 8);
    }

    generateRoadmap(subjectAnalysis, daysRemaining) {
        const phases = [];
        const weakSubjects = subjectAnalysis.filter(s => s.priority <= 2);
        const subjectNames = weakSubjects.map(s => s.name);

        if (daysRemaining >= 90) {
            phases.push({
                number: 1,
                name: 'Củng cố nền tảng',
                duration: `${Math.floor(daysRemaining * 0.4)} ngày`,
                description: 'Tập trung vào các môn cần cải thiện nhiều nhất',
                focus: subjectNames.slice(0, 2)
            });

            phases.push({
                number: 2,
                name: 'Nâng cao toàn diện',
                duration: `${Math.floor(daysRemaining * 0.35)} ngày`,
                description: 'Ôn luyện đều cả 3 môn, nâng dần độ khó',
                focus: subjectAnalysis.map(s => s.name)
            });

            phases.push({
                number: 3,
                name: 'Luyện đề & Sprint',
                duration: `${Math.floor(daysRemaining * 0.25)} ngày`,
                description: 'Làm đề thi thử, rèn tốc độ và kỹ năng làm bài',
                focus: ['Đề thi thử', 'Rèn thời gian']
            });
        } else if (daysRemaining >= 30) {
            phases.push({
                number: 1,
                name: 'Ôn tập tập trung',
                duration: `${Math.floor(daysRemaining * 0.6)} ngày`,
                description: 'Ưu tiên môn yếu, duy trì môn mạnh',
                focus: subjectNames
            });

            phases.push({
                number: 2,
                name: 'Luyện đề',
                duration: `${Math.floor(daysRemaining * 0.4)} ngày`,
                description: 'Làm đề thi thử liên tục',
                focus: ['Đề thi thử']
            });
        } else {
            phases.push({
                number: 1,
                name: 'Sprint cuối',
                duration: `${daysRemaining} ngày`,
                description: 'Ôn kiến thức trọng tâm, làm đề thi thử',
                focus: ['Trọng tâm', 'Đề thi thử']
            });
        }

        return phases;
    }

    calculateDaysRemaining() {
        const examDate = new Date('2026-06-26');
        const today = new Date();
        const diffTime = examDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        document.getElementById('days-value').textContent = `${Math.max(0, diffDays)} ngày`;

        return Math.max(0, diffDays);
    }

    // ===== MAIN ANALYSIS =====
    analyze() {
        if (!this.selectedTarget || Object.keys(this.currentScores).length === 0) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const totalScore = this.currentTotalScore;
        const targetScore = this.selectedTarget.score;
        const gap = totalScore - targetScore;
        const daysRemaining = this.calculateDaysRemaining();

        // Calculate probability
        const probability = this.calculateProbability(totalScore, targetScore);
        const probLevel = this.getProbabilityLevel(probability);

        // Analyze subjects
        const subjectAnalysis = this.allocateTargetScores(this.currentScores, Math.abs(gap));

        // Find alternatives
        const alternatives = this.findAlternatives(totalScore, this.selectedTarget.major);

        // Generate roadmap
        const roadmap = this.generateRoadmap(subjectAnalysis, daysRemaining);

        // Auto-save results for personalization page
        const analysisResult = {
            target: this.selectedTarget,
            scores: this.currentScores,
            totalScore: totalScore,
            probability: probability,
            gap: gap,
            subjectAnalysis: subjectAnalysis,
            alternatives: alternatives,
            roadmap: roadmap,
            daysRemaining: daysRemaining,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('edupath_analysis_result', JSON.stringify(analysisResult));

        // Render results
        this.renderResults({
            probability,
            probLevel,
            gap,
            totalScore,
            targetScore,
            subjectAnalysis,
            alternatives,
            roadmap,
            daysRemaining
        });
    }

    goPersonalize() {
        // Navigate to personalize page
        window.location.href = 'personalize.html';
    }

    // ===== RENDER RESULTS =====
    renderResults(data) {
        const resultsSection = document.getElementById('results-section');
        resultsSection.style.display = 'block';

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Probability card
        const probCard = document.getElementById('probability-card');
        probCard.className = `overview-card probability-card ${data.probLevel.level}`;
        document.getElementById('probability-percent').textContent = `${data.probability}%`;
        document.getElementById('probability-level').textContent = data.probLevel.label;
        document.getElementById('probability-bar').style.width = `${data.probability}%`;

        // Gap card
        const gapValue = document.getElementById('gap-value');
        gapValue.textContent = `${data.gap >= 0 ? '+' : ''}${data.gap.toFixed(2)} điểm`;
        gapValue.className = `gap-value ${data.gap >= 0 ? 'positive' : 'negative'}`;

        document.getElementById('gap-description').textContent = data.gap >= 0
            ? 'Bạn đã vượt điểm chuẩn!'
            : 'Cần cải thiện thêm';

        // Subject analysis
        this.renderSubjectAnalysis(data.subjectAnalysis);

        // Alternatives
        this.renderAlternatives(data.alternatives);

        // Roadmap
        this.renderRoadmap(data.roadmap);
    }

    renderSubjectAnalysis(subjects) {
        const container = document.getElementById('subjects-analysis');

        container.innerHTML = subjects.map(subject => `
            <div class="subject-item ${subject.status}">
                <div class="subject-name">
                    <i class="fa-solid fa-book"></i>
                    ${subject.name}
                </div>
                <div class="subject-progress">
                    <div class="subject-scores">
                        <span class="current">Hiện tại: ${subject.current.toFixed(1)}</span>
                        <span class="target">Mục tiêu: ${subject.suggested.toFixed(1)}</span>
                    </div>
                    <div class="subject-bar">
                        <div class="subject-bar-fill" style="width: ${subject.current * 10}%"></div>
                        <div class="subject-bar-target" style="left: ${subject.suggested * 10}%"></div>
                    </div>
                </div>
                <div class="subject-gap">
                    <div class="value">+${subject.gap.toFixed(1)}</div>
                    <div class="label">cần tăng</div>
                </div>
            </div>
        `).join('');
    }

    renderAlternatives(alternatives) {
        const container = document.getElementById('alternatives-list');

        if (alternatives.length === 0) {
            container.innerHTML = `
                <div class="no-alternatives">
                    <i class="fa-solid fa-info-circle"></i>
                    <p>Không tìm thấy trường thay thế phù hợp. Hãy thử tìm kiếm ngành khác.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = alternatives.map(alt => `
            <div class="alternative-item ${alt.level}">
                <div class="alternative-info">
                    <h4>${alt.school_name}</h4>
                    <p>${alt.major_name}</p>
                </div>
                <div class="alternative-score">${alt.score.toFixed(2)}đ</div>
                <div class="alternative-probability">
                    <span class="badge">${alt.probability}% đậu</span>
                </div>
            </div>
        `).join('');
    }

    renderRoadmap(phases) {
        const container = document.getElementById('roadmap');

        container.innerHTML = phases.map(phase => `
            <div class="roadmap-phase">
                <div class="phase-number">${phase.number}</div>
                <div class="phase-content">
                    <h4>${phase.name}</h4>
                    <div class="phase-duration">
                        <i class="fa-solid fa-clock"></i> ${phase.duration}
                    </div>
                    <p>${phase.description}</p>
                    <div class="phase-focus">
                        ${phase.focus.map(f => `<span>${f}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ===== ACTIONS =====
    reset() {
        document.getElementById('results-section').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    saveResults() {
        const data = {
            target: this.selectedTarget,
            scores: this.currentScores,
            totalScore: this.currentTotalScore,
            savedAt: new Date().toISOString()
        };

        localStorage.setItem('edupath_analysis_result', JSON.stringify(data));
        alert('Đã lưu kết quả phân tích!');
    }

    askAI() {
        // Build question for AI
        const question = `Tôi vừa làm bài thi thử với kết quả: ${Object.entries(this.currentScores).map(([k, v]) => `${this.getSubjectName(k)}: ${v}`).join(', ')
            }. Tổng điểm xét tuyển: ${this.currentTotalScore.toFixed(2)}. Mục tiêu: ${this.selectedTarget.major} tại ${this.selectedTarget.school} (điểm chuẩn ${this.selectedTarget.score}). Cho tôi lời khuyên chi tiết để cải thiện?`;

        // Store in session and redirect
        sessionStorage.setItem('edupath_preset_question', question);
        window.location.href = 'chat.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ScoreAnalyzer();
});
