// js/personalize.js - Personalization Dashboard with AI Integration

class PersonalizeDashboard {
    constructor() {
        this.analysisData = null;
        this.universitiesData = [];
        this.inlineMessages = [];
        this.isLoading = false;

        this.init();
    }

    async init() {
        // Load saved analysis data
        this.loadAnalysisData();

        if (!this.analysisData) {
            // Show no data state
            document.getElementById('no-data-state').style.display = 'block';
            document.getElementById('dashboard-content').style.display = 'none';
            return;
        }

        // Show dashboard
        document.getElementById('no-data-state').style.display = 'none';
        document.getElementById('dashboard-content').style.display = 'block';

        // Load universities data
        await this.loadUniversitiesData();

        // Render all sections
        this.renderProfile();
        this.renderMetrics();
        this.renderSubjects();
        this.renderRoadmap();
        this.renderAlternatives();

        // Setup event listeners
        this.setupEventListeners();

        // Get AI analysis
        this.getAIAnalysis();
    }

    loadAnalysisData() {
        try {
            const saved = localStorage.getItem('edupath_analysis_result');
            if (saved) {
                this.analysisData = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading analysis data:', e);
        }
    }

    async loadUniversitiesData() {
        try {
            const response = await fetch('data/universities.json');
            const data = await response.json();
            this.universitiesData = this.flattenUniversitiesData(data);
        } catch (e) {
            console.error('Error loading universities:', e);
        }
    }

    flattenUniversitiesData(rawData) {
        const flatData = [];
        const universities = rawData.universities || rawData;

        universities.forEach(uni => {
            if (uni.majors) {
                uni.majors.forEach(major => {
                    const scoreEntry = major.scores?.find(s => s.method === 'THPT' && s.year === 2025)
                        || major.scores?.[0];

                    flatData.push({
                        school_name: uni.name,
                        major_name: major.name,
                        score: scoreEntry?.score || 0,
                        block: scoreEntry?.block || 'A00'
                    });
                });
            }
        });

        return flatData;
    }

    // ===== RENDER FUNCTIONS =====
    renderProfile() {
        const target = this.analysisData.target;
        document.getElementById('target-major').textContent = target.major?.split('(')[0]?.trim() || '--';
        document.getElementById('target-school').textContent = target.school || '--';
    }

    renderMetrics() {
        const { totalScore, target, scores } = this.analysisData;
        const targetScore = target.score;
        const gap = totalScore - targetScore;

        // Calculate probability
        const probability = this.calculateProbability(totalScore, targetScore);
        const probLevel = this.getProbabilityLevel(probability);

        // Update UI
        document.getElementById('metric-probability').textContent = `${probability}%`;
        const badge = document.getElementById('probability-badge');
        badge.textContent = probLevel.label;
        badge.className = `metric-badge ${probLevel.level}`;

        // Update ring
        const ringFill = document.getElementById('ring-fill');
        const circumference = 2 * Math.PI * 45;
        ringFill.style.strokeDashoffset = circumference - (probability / 100) * circumference;
        ringFill.style.stroke = probLevel.color;

        // Gap
        const gapEl = document.getElementById('metric-gap');
        gapEl.textContent = `${gap >= 0 ? '+' : ''}${gap.toFixed(2)} điểm`;
        gapEl.style.color = gap >= 0 ? '#22c55e' : '#ef4444';
        document.getElementById('gap-description').textContent = gap >= 0 ? 'Đã vượt điểm chuẩn' : 'Cần cải thiện thêm';

        // Score
        document.getElementById('metric-score').textContent = totalScore.toFixed(2);
        document.getElementById('target-score').textContent = targetScore.toFixed(2);

        // Days
        const examDate = new Date('2026-06-26');
        const today = new Date();
        const days = Math.max(0, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));
        document.getElementById('metric-days').textContent = days;
    }

    renderSubjects() {
        const { scores, target } = this.analysisData;
        const container = document.getElementById('subjects-list');

        // Calculate subject analysis
        const subjects = this.analyzeSubjects(scores, target.score);

        container.innerHTML = subjects.map(subject => `
            <div class="subject-row ${subject.status}">
                <div class="subject-icon">
                    <i class="fa-solid fa-book"></i>
                </div>
                <div class="subject-info">
                    <div class="subject-name">${subject.name}</div>
                    <div class="subject-progress">
                        <div class="subject-progress-fill" style="width: ${subject.current * 10}%"></div>
                    </div>
                </div>
                <div class="subject-scores">
                    <div class="subject-current">${subject.current.toFixed(1)}</div>
                    <div class="subject-target">Mục tiêu: ${subject.suggested.toFixed(1)}</div>
                </div>
            </div>
        `).join('');
    }

    async renderRoadmap() {
        const container = document.getElementById('roadmap-timeline');
        const { scores, totalScore, target } = this.analysisData;

        // Calculate days remaining
        const examDate = new Date('2026-06-26');
        const today = new Date();
        const daysRemaining = Math.max(0, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));

        // Show loading state
        container.innerHTML = `
            <div class="roadmap-loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>Đang tạo lộ trình cá nhân hóa...</span>
            </div>
        `;

        try {
            // Get AI-generated roadmap
            const phases = await this.generateAIRoadmap(scores, totalScore, target, daysRemaining);
            this.renderRoadmapPhases(phases);
        } catch (error) {
            console.error('Roadmap AI Error:', error);
            // Fallback to static roadmap
            const staticPhases = this.generateStaticRoadmap(daysRemaining);
            this.renderRoadmapPhases(staticPhases);
        }
    }

    renderRoadmapPhases(phases) {
        const container = document.getElementById('roadmap-timeline');

        container.innerHTML = phases.map((phase, idx) => `
            <div class="timeline-item">
                <div class="timeline-dot">${idx + 1}</div>
                <div class="timeline-content">
                    <div class="timeline-title">${phase.name}</div>
                    <div class="timeline-duration"><i class="fa-solid fa-clock"></i> ${phase.duration}</div>
                    <div class="timeline-desc">${phase.description}</div>
                    ${phase.activities ? `
                        <ul class="timeline-activities">
                            ${phase.activities.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <div class="timeline-tags">
                        ${phase.focus.map(f => `<span class="timeline-tag">${f}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    async generateAIRoadmap(scores, totalScore, target, daysRemaining) {
        // Analyze weak subjects
        const subjectAnalysis = this.analyzeSubjects(scores, target.score);
        const weakSubjects = subjectAnalysis
            .filter(s => s.status === 'critical' || s.status === 'warning')
            .map(s => `${s.name}: ${s.current.toFixed(1)} → cần ${s.suggested.toFixed(1)}`);

        const strongSubjects = subjectAnalysis
            .filter(s => s.status === 'good')
            .map(s => s.name);

        const gap = totalScore - target.score;
        const scoresList = Object.entries(scores)
            .map(([k, v]) => `${this.getSubjectName(k)}: ${v}`)
            .join(', ');

        const prompt = `Tạo lộ trình ôn tập CHI TIẾT và CÁ NHÂN HÓA:

**Thông tin học sinh:**
- Mục tiêu: ${target.major?.split('(')[0]?.trim()} - ${target.school}
- Điểm chuẩn cần đạt: ${target.score}
- Điểm hiện tại: ${totalScore.toFixed(2)} (${scoresList})
- Khoảng cách: ${gap >= 0 ? '+' : ''}${gap.toFixed(2)} điểm
- Số ngày còn lại: ${daysRemaining} ngày

**Phân tích môn học:**
- Môn cần cải thiện: ${weakSubjects.length > 0 ? weakSubjects.join('; ') : 'Không có'}
- Môn đã tốt: ${strongSubjects.length > 0 ? strongSubjects.join(', ') : 'Không có'}

**Yêu cầu:**
Trả về JSON array với 3-4 giai đoạn ôn tập. Mỗi giai đoạn có:
- name: Tên giai đoạn ngắn gọn
- duration: Thời gian (VD: "4 tuần", "60 ngày")
- description: Mô tả ngắn mục tiêu giai đoạn
- activities: Array 2-3 hoạt động cụ thể cho MÔN YẾU NHẤT
- focus: Array 2-3 tags ngắn (VD: ["Toán", "Lý thuyết"])

CHỈ trả về JSON array, không có text khác. Ví dụ:
[{"name":"Củng cố Toán","duration":"3 tuần","description":"Tập trung đạo hàm và tích phân","activities":["Làm 20 bài đạo hàm/ngày","Học công thức tích phân"],"focus":["Toán","Giải tích"]}]`;

        const response = await this.callAI(prompt);

        // Parse JSON from response
        try {
            // Clean response - remove markdown code blocks if present
            let cleanResponse = response.trim();
            if (cleanResponse.startsWith('```')) {
                cleanResponse = cleanResponse.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
            }

            const phases = JSON.parse(cleanResponse);
            if (Array.isArray(phases) && phases.length > 0) {
                return phases;
            }
        } catch (parseError) {
            console.error('Failed to parse AI roadmap:', parseError);
        }

        // If parsing fails, return static
        return this.generateStaticRoadmap(daysRemaining);
    }

    generateStaticRoadmap(daysRemaining) {
        const phases = [];

        if (daysRemaining >= 90) {
            phases.push({
                name: 'Củng cố nền tảng',
                duration: `${Math.floor(daysRemaining * 0.4)} ngày`,
                description: 'Tập trung vào môn yếu nhất, xây dựng kiến thức cơ bản',
                activities: ['Học lý thuyết trọng tâm', 'Làm bài tập cơ bản mỗi ngày'],
                focus: ['Lý thuyết', 'Bài tập cơ bản']
            });
            phases.push({
                name: 'Nâng cao toàn diện',
                duration: `${Math.floor(daysRemaining * 0.35)} ngày`,
                description: 'Ôn luyện đều cả 3 môn, nâng dần độ khó',
                activities: ['Làm đề nâng cao', 'Ôn đề minh họa Bộ GD'],
                focus: ['Bài tập nâng cao', 'Đề minh họa']
            });
            phases.push({
                name: 'Sprint cuối',
                duration: `${Math.floor(daysRemaining * 0.25)} ngày`,
                description: 'Luyện đề, rèn tốc độ và kỹ năng thi',
                activities: ['2 đề/ngày', 'Phân tích lỗi sai'],
                focus: ['Đề thi thử', 'Quản lý thời gian']
            });
        } else if (daysRemaining >= 30) {
            phases.push({
                name: 'Ôn tập tập trung',
                duration: `${Math.floor(daysRemaining * 0.6)} ngày`,
                description: 'Ưu tiên môn yếu, duy trì môn mạnh',
                activities: ['Focus môn yếu nhất', 'Review môn mạnh'],
                focus: ['Môn yếu', 'Trọng tâm']
            });
            phases.push({
                name: 'Luyện đề',
                duration: `${Math.floor(daysRemaining * 0.4)} ngày`,
                description: 'Làm đề thi thử liên tục',
                activities: ['1-2 đề thi thử/ngày'],
                focus: ['Đề thi thử']
            });
        } else {
            phases.push({
                name: 'Sprint cuối',
                duration: `${daysRemaining} ngày`,
                description: 'Ôn trọng tâm, làm đề thi thử',
                activities: ['Ôn công thức quan trọng', 'Làm đề thi thử'],
                focus: ['Trọng tâm', 'Đề thi thử']
            });
        }

        return phases;
    }

    renderAlternatives() {
        const container = document.getElementById('alternatives-list');
        const { totalScore, target } = this.analysisData;

        // Find similar majors
        const alternatives = this.findAlternatives(totalScore, target.major);

        if (alternatives.length === 0) {
            container.innerHTML = `<p style="color: #64748b; text-align: center; padding: 1rem;">Không tìm thấy trường thay thế phù hợp</p>`;
            return;
        }

        container.innerHTML = alternatives.slice(0, 5).map((alt, idx) => `
            <div class="alt-item ${alt.level}">
                <div class="alt-rank">${idx + 1}</div>
                <div class="alt-info">
                    <div class="alt-school">${alt.school_name}</div>
                    <div class="alt-major">${alt.major_name}</div>
                </div>
                <div class="alt-score">${alt.score.toFixed(1)}đ</div>
                <span class="alt-prob">${alt.probability}%</span>
            </div>
        `).join('');
    }

    // ===== AI INTEGRATION =====
    async getAIAnalysis() {
        const responseEl = document.getElementById('ai-response');

        try {
            const { scores, totalScore, target } = this.analysisData;
            const gap = totalScore - target.score;
            const probability = this.calculateProbability(totalScore, target.score);

            // Build detailed context
            const scoresList = Object.entries(scores)
                .map(([k, v]) => `${this.getSubjectName(k)}: ${v}`)
                .join(', ');

            const prompt = `Phân tích chi tiết cho học sinh:

**Mục tiêu:** ${target.major?.split('(')[0]?.trim()} - ${target.school}
**Điểm chuẩn:** ${target.score} điểm
**Điểm thi thử:** ${totalScore.toFixed(2)} điểm (${scoresList})
**Khoảng cách:** ${gap >= 0 ? '+' : ''}${gap.toFixed(2)} điểm
**Khả năng đậu:** ${probability}%

Hãy đưa ra:
1. **Đánh giá tổng quan** về khả năng đậu
2. **Môn cần ưu tiên** cải thiện và mức điểm cần đạt
3. **Chiến lược ôn tập** cụ thể trong ${Math.ceil((new Date('2026-06-26') - new Date()) / (1000 * 60 * 60 * 24))} ngày còn lại
4. **Lời khuyên** về tinh thần học tập

Trả lời ngắn gọn, súc tích, dễ hiểu.`;

            const response = await this.callAI(prompt);

            responseEl.innerHTML = `<div class="ai-content">${this.formatMarkdown(response)}</div>`;

        } catch (error) {
            console.error('AI Error:', error);
            responseEl.innerHTML = `
                <div style="color: #ef4444; text-align: center; padding: 1rem;">
                    <i class="fa-solid fa-exclamation-circle"></i>
                    Không thể tải phân tích AI. <button onclick="refreshAI()" style="color: #3b82f6; background: none; border: none; cursor: pointer;">Thử lại</button>
                </div>
            `;
        }
    }

    async callAI(prompt) {
        const messages = [
            {
                role: 'system',
                content: `Bạn là EduPath AI - chuyên gia tư vấn tuyển sinh đại học Việt Nam.
Nhiệm vụ: Phân tích điểm thi thử và đưa ra lời khuyên ôn tập cá nhân hóa.
Quy tắc:
- Trả lời bằng tiếng Việt, thân thiện, động viên
- Đưa ra lời khuyên cụ thể, thực tế
- Sử dụng markdown để format (## cho tiêu đề, **bold**, danh sách)
- Giữ câu trả lời ngắn gọn, tập trung`
            },
            { role: 'user', content: prompt }
        ];

        let response;

        if (CONFIG.isProduction()) {
            response = await fetch(CONFIG.GROQ_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: CONFIG.GROQ_MODEL,
                    messages: messages,
                    temperature: 0.7,
                    max_completion_tokens: 1500
                })
            });
        } else {
            if (!CONFIG.GROQ_API_KEY) {
                throw new Error('API key chưa được cấu hình');
            }
            response = await fetch(CONFIG.GROQ_DIRECT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: CONFIG.GROQ_MODEL,
                    messages: messages,
                    temperature: 0.7,
                    max_completion_tokens: 1500
                })
            });
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    formatMarkdown(text) {
        if (typeof marked !== 'undefined') {
            marked.setOptions({ breaks: true, gfm: true });
            return marked.parse(text);
        }
        return text.replace(/\n/g, '<br>');
    }

    // ===== INLINE CHAT =====
    setupEventListeners() {
        const form = document.getElementById('inline-chat-form');
        const input = document.getElementById('inline-chat-input');

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (message && !this.isLoading) {
                await this.sendInlineMessage(message);
                input.value = '';
            }
        });
    }

    async sendInlineMessage(content) {
        if (this.isLoading) return;

        // Hide empty state and quick actions on first message
        const emptyState = document.getElementById('chat-empty');
        const quickActions = document.getElementById('quick-actions');
        if (emptyState) emptyState.style.display = 'none';
        if (this.inlineMessages.length === 0 && quickActions) {
            quickActions.style.display = 'none';
        }

        // Add user message
        this.inlineMessages.push({ role: 'user', content });
        this.renderInlineMessages();

        // Show loading state
        this.isLoading = true;
        this.showTypingIndicator();

        try {
            // Build context with analysis data
            const { scores, totalScore, target } = this.analysisData;
            const scoresList = Object.entries(scores)
                .map(([k, v]) => `${this.getSubjectName(k)}: ${v}`)
                .join(', ');

            const context = `Bạn đang tư vấn cho học sinh có thông tin sau:
- Mục tiêu: ${target.major} tại ${target.school}
- Điểm chuẩn: ${target.score}
- Điểm hiện tại: ${totalScore.toFixed(2)} (${scoresList})
- Số ngày còn lại: ${Math.ceil((new Date('2026-06-26') - new Date()) / (1000 * 60 * 60 * 24))}

Trả lời ngắn gọn, thân thiện, đưa ra lời khuyên cụ thể.`;

            const response = await this.callAI(`${context}\n\nCâu hỏi: ${content}`);

            this.inlineMessages.push({ role: 'assistant', content: response });
        } catch (error) {
            this.inlineMessages.push({
                role: 'assistant',
                content: '❌ Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.'
            });
        }

        this.isLoading = false;
        this.renderInlineMessages();
    }

    showTypingIndicator() {
        const container = document.getElementById('inline-chat-messages');
        const typingHtml = `
            <div class="chat-msg assistant" id="typing-indicator">
                <div class="chat-msg-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="chat-msg-bubble typing">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', typingHtml);
        container.scrollTop = container.scrollHeight;
    }

    renderInlineMessages() {
        const container = document.getElementById('inline-chat-messages');

        // Remove typing indicator if exists
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();

        if (this.inlineMessages.length === 0) {
            container.innerHTML = `
                <div class="chat-empty" id="chat-empty">
                    <i class="fa-solid fa-robot"></i>
                    <p>Hỏi bất cứ điều gì về lộ trình ôn tập của bạn!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.inlineMessages.map(msg => `
            <div class="chat-msg ${msg.role}">
                <div class="chat-msg-avatar">
                    <i class="fa-solid fa-${msg.role === 'user' ? 'user' : 'robot'}"></i>
                </div>
                <div class="chat-msg-bubble">${this.formatMarkdown(msg.content)}</div>
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    clearInlineChat() {
        this.inlineMessages = [];
        this.renderInlineMessages();

        // Show quick actions again
        const quickActions = document.getElementById('quick-actions');
        if (quickActions) quickActions.style.display = 'flex';
    }

    // ===== HELPER FUNCTIONS =====
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

    getSubjectName(code) {
        const names = {
            'toan': 'Toán', 'ly': 'Vật lý', 'hoa': 'Hóa học',
            'sinh': 'Sinh học', 'van': 'Ngữ văn', 'anh': 'Tiếng Anh',
            'su': 'Lịch sử', 'dia': 'Địa lý'
        };
        return names[code] || code;
    }

    analyzeSubjects(scores, targetScore) {
        const totalGap = Math.max(0, targetScore - Object.values(scores).reduce((a, b) => a + b, 0));
        const subjects = Object.entries(scores)
            .map(([code, score]) => ({ code, score }))
            .sort((a, b) => a.score - b.score);

        let remainingGap = totalGap;
        return subjects.map(subject => {
            const potential = 10 - subject.score;
            const allocation = Math.min(potential, remainingGap * 0.45, 2.5);
            remainingGap -= allocation;

            return {
                code: subject.code,
                name: this.getSubjectName(subject.code),
                current: subject.score,
                suggested: Math.min(10, subject.score + allocation),
                gap: allocation,
                status: allocation >= 1.5 ? 'critical' : allocation >= 0.5 ? 'warning' : 'good'
            };
        });
    }

    generateRoadmap(daysRemaining) {
        const phases = [];

        if (daysRemaining >= 90) {
            phases.push({
                name: 'Củng cố nền tảng',
                duration: `${Math.floor(daysRemaining * 0.4)} ngày`,
                description: 'Tập trung vào môn yếu nhất, xây dựng kiến thức cơ bản',
                focus: ['Lý thuyết', 'Bài tập cơ bản']
            });
            phases.push({
                name: 'Nâng cao toàn diện',
                duration: `${Math.floor(daysRemaining * 0.35)} ngày`,
                description: 'Ôn luyện đều cả 3 môn, nâng dần độ khó',
                focus: ['Bài tập nâng cao', 'Đề minh họa']
            });
            phases.push({
                name: 'Sprint cuối',
                duration: `${Math.floor(daysRemaining * 0.25)} ngày`,
                description: 'Luyện đề, rèn tốc độ và kỹ năng thi',
                focus: ['Đề thi thử', 'Quản lý thời gian']
            });
        } else if (daysRemaining >= 30) {
            phases.push({
                name: 'Ôn tập tập trung',
                duration: `${Math.floor(daysRemaining * 0.6)} ngày`,
                description: 'Ưu tiên môn yếu, duy trì môn mạnh',
                focus: ['Môn yếu', 'Trọng tâm']
            });
            phases.push({
                name: 'Luyện đề',
                duration: `${Math.floor(daysRemaining * 0.4)} ngày`,
                description: 'Làm đề thi thử liên tục',
                focus: ['Đề thi thử']
            });
        } else {
            phases.push({
                name: 'Sprint cuối',
                duration: `${daysRemaining} ngày`,
                description: 'Ôn trọng tâm, làm đề thi thử',
                focus: ['Trọng tâm', 'Đề thi thử']
            });
        }

        return phases;
    }

    findAlternatives(currentScore, targetMajorName) {
        const keywords = (targetMajorName || '').toLowerCase().split(' ').filter(w => w.length > 2);

        let candidates = this.universitiesData.filter(uni => {
            if (uni.score > currentScore + 2 || uni.score < 15) return false;
            const majorLower = (uni.major_name || '').toLowerCase();
            return keywords.some(kw => majorLower.includes(kw));
        });

        return candidates.map(uni => {
            const probability = this.calculateProbability(currentScore, uni.score);
            const level = this.getProbabilityLevel(probability);
            return { ...uni, probability, level: level.level };
        }).sort((a, b) => b.probability - a.probability).slice(0, 8);
    }
}

// Global functions
function refreshAnalysis() {
    window.location.href = 'analysis.html';
}

function refreshAI() {
    window.dashboard?.getAIAnalysis();
}

function exportPDF() {
    alert('Tính năng xuất PDF đang được phát triển!');
}

function askQuickQuestion(question) {
    const input = document.getElementById('inline-chat-input');
    if (input) {
        input.value = question;
        document.getElementById('inline-chat-form')?.dispatchEvent(new Event('submit'));
    }
}

function clearInlineChat() {
    window.dashboard?.clearInlineChat();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new PersonalizeDashboard();
});
