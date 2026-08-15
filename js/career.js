// js/career.js - Holland Career Quiz

let questions = [];
let careerTypes = {};
let currentQuestionIndex = 0;
let scores = { "R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0 };

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});

async function fetchQuestions() {
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        questions = data.questions;
        careerTypes = data.types;
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    for (let key in scores) scores[key] = 0;

    document.getElementById('intro-section').style.display = 'none';
    document.getElementById('question-section').style.display = 'block';
    document.getElementById('result-box').style.display = 'none';

    renderQuestion();
}

function renderQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    const progressLabel = document.getElementById('progress-label');
    const progressPercent = document.getElementById('progress-percent');
    const progress = document.getElementById('progress');

    // Update progress
    const percent = Math.round((currentQuestionIndex / questions.length) * 100);
    progressLabel.textContent = `Câu ${currentQuestionIndex + 1}/${questions.length}`;
    progressPercent.textContent = `${percent}%`;
    progress.style.width = `${percent}%`;

    container.innerHTML = `
        <div class="question-number">Câu hỏi ${currentQuestionIndex + 1}</div>
        <div class="question-text">${question.text}</div>
        
        <button class="option-btn yes" onclick="answer(true)">
            <i class="fa-solid fa-check-circle"></i>
            <span>Đúng / Giống tôi</span>
        </button>
        <button class="option-btn no" onclick="answer(false)">
            <i class="fa-solid fa-times-circle"></i>
            <span>Sai / Không giống tôi</span>
        </button>
    `;
}

function answer(isYes) {
    if (isYes) {
        const type = questions[currentQuestionIndex].type;
        scores[type]++;
    }
    currentQuestionIndex++;
    renderQuestion();
}

function showResults() {
    document.getElementById('quiz-box').style.display = 'none';
    const resultBox = document.getElementById('result-box');
    const resultContent = document.getElementById('result-content');

    // Calculate percentages and find top types
    const typeScores = [];

    for (let type in scores) {
        const count = scores[type];
        const maxPossible = questions.filter(q => q.type === type).length;
        typeScores.push({
            type,
            score: count,
            maxPossible,
            percent: maxPossible > 0 ? Math.round((count / maxPossible) * 100) : 0
        });
    }

    // Sort by score
    typeScores.sort((a, b) => b.score - a.score);
    const topType = typeScores[0];
    const secondType = typeScores[1];
    const resultType = careerTypes[topType.type];

    // Build careers HTML with detailed info
    const careersHTML = resultType.careers ? resultType.careers.map(career => `
        <div class="career-card">
            <div class="career-header">
                <span class="career-name">${career.name}</span>
                <span class="career-demand ${career.demand === 'Rất cao' ? 'high' : career.demand === 'Cao' ? 'medium' : 'low'}">${career.demand}</span>
            </div>
            <p class="career-desc">${career.description}</p>
            <div class="career-salary">
                <i class="fa-solid fa-money-bill-wave"></i>
                <span>${career.salary}</span>
            </div>
        </div>
    `).join('') : '<p>Đang cập nhật...</p>';

    // Build majors HTML
    const majorsHTML = resultType.majors ? resultType.majors.map(major => `
        <div class="major-card">
            <div class="major-name">${major.name}</div>
            <div class="major-meta">
                <span class="major-score"><i class="fa-solid fa-chart-line"></i> ${major.scoreRange} điểm</span>
            </div>
            <div class="major-unis">
                ${major.universities.map(u => `<span class="uni-tag">${u}</span>`).join('')}
            </div>
        </div>
    `).join('') : '';

    // Build blocks HTML
    const blocksHTML = resultType.blocks ? resultType.blocks.map(b =>
        `<span class="block-tag">${b}</span>`
    ).join('') : '';

    // Build strengths HTML
    const strengthsHTML = resultType.strengths ? resultType.strengths.map(s =>
        `<span class="strength-tag"><i class="fa-solid fa-check"></i> ${s}</span>`
    ).join('') : '';

    resultContent.innerHTML = `
        <div class="result-header" style="text-align: center; margin-bottom: 24px;">
            <div class="result-icon" style="font-size: 3rem; margin-bottom: 12px;">${resultType.icon || '🎯'}</div>
            <div class="result-type" style="color: ${resultType.color};">${resultType.name}</div>
            <div class="result-code" style="font-size: 0.9rem; color: var(--gray-500); margin-top: 4px;">
                Mã Holland: <strong>${topType.type}${secondType.type}</strong>
            </div>
        </div>
        
        <p class="result-description" style="text-align: center; color: var(--gray-600); line-height: 1.7; margin-bottom: 24px;">${resultType.description}</p>
        
        ${strengthsHTML ? `
        <div class="result-section" style="margin-bottom: 24px;">
            <h4 style="font-size: 0.85rem; color: var(--gray-500); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-star"></i> Điểm mạnh của bạn
            </h4>
            <div class="strengths-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${strengthsHTML}
            </div>
        </div>
        ` : ''}
        
        <div class="result-section" style="margin-bottom: 24px;">
            <h4 style="font-size: 0.85rem; color: var(--gray-500); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-briefcase"></i> Nghề nghiệp phù hợp
            </h4>
            <div class="careers-grid">
                ${careersHTML}
            </div>
        </div>
        
        ${majorsHTML ? `
        <div class="result-section" style="margin-bottom: 24px;">
            <h4 style="font-size: 0.85rem; color: var(--gray-500); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-graduation-cap"></i> Ngành học phù hợp
            </h4>
            <div class="majors-grid">
                ${majorsHTML}
            </div>
        </div>
        ` : ''}
        
        ${blocksHTML ? `
        <div class="result-section" style="margin-bottom: 24px;">
            <h4 style="font-size: 0.85rem; color: var(--gray-500); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-book"></i> Khối thi phù hợp
            </h4>
            <div style="display: flex; gap: 8px;">
                ${blocksHTML}
            </div>
        </div>
        ` : ''}
        
        <div style="margin-top: 24px;">
            <h4 style="font-size: 0.85rem; color: var(--gray-500); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-chart-bar"></i> Điểm các nhóm tính cách
            </h4>
            ${typeScores.map(t => `
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                    <span style="width: 28px; font-size: 1.1rem;">${careerTypes[t.type].icon || ''}</span>
                    <span style="width: 90px; font-size: 0.85rem; color: var(--gray-700);">${careerTypes[t.type].shortName || careerTypes[t.type].name.split('(')[0].trim()}</span>
                    <div style="flex: 1; background: var(--gray-200); height: 10px; border-radius: 5px; overflow: hidden;">
                        <div style="width: ${t.percent}%; background: ${careerTypes[t.type].color || (t.type === topType.type ? 'var(--accent-gold)' : 'var(--primary-navy)')}; height: 100%; transition: width 0.5s ease;"></div>
                    </div>
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--gray-700); min-width: 45px;">${t.percent}%</span>
                </div>
            `).join('')}
        </div>
        
        <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: center;">
            <button onclick="retakeQuiz()" class="btn btn-secondary" style="font-size: 0.9rem;">
                <i class="fa-solid fa-redo"></i> Làm lại
            </button>
            <a href="lookup.html" class="btn btn-gold" style="font-size: 0.9rem; text-decoration: none;">
                <i class="fa-solid fa-search"></i> Tra cứu điểm chuẩn
            </a>
        </div>
    `;

    resultBox.style.display = 'block';

    // Save result to localStorage
    saveResult(topType.type, secondType.type, typeScores);
}

function retakeQuiz() {
    document.getElementById('quiz-box').style.display = 'block';
    document.getElementById('result-box').style.display = 'none';
    document.getElementById('intro-section').style.display = 'block';
    document.getElementById('question-section').style.display = 'none';
}

function saveResult(topType, secondType, scores) {
    const result = {
        topType,
        secondType,
        scores,
        date: new Date().toISOString()
    };
    localStorage.setItem('hollandResult', JSON.stringify(result));
}

function loadPreviousResult() {
    const saved = localStorage.getItem('hollandResult');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}
