// js/holland.js - Holland Career Quiz with Likert 5-Scale and Radar Chart

const HOLLAND_TYPES = {
    R: {
        name: 'Realistic (Thực tế)',
        shortName: 'Thực tế',
        icon: '🔧',
        color: '#ef4444',
        description: 'Bạn thích làm việc với đồ vật, máy móc, công cụ. Bạn có kỹ năng thực hành tốt và thích giải quyết vấn đề cụ thể.',
        careers: ['Kỹ sư cơ khí', 'Kỹ thuật viên', 'Thợ điện', 'Kiến trúc sư', 'Phi công', 'Nông nghiệp'],
        majors: ['Cơ khí', 'Điện - Điện tử', 'Xây dựng', 'Công nghệ ô tô', 'Nông lâm']
    },
    I: {
        name: 'Investigative (Nghiên cứu)',
        shortName: 'Nghiên cứu',
        icon: '🔬',
        color: '#3b82f6',
        description: 'Bạn thích nghiên cứu, phân tích và giải quyết vấn đề phức tạp. Bạn ham học hỏi và có tư duy logic mạnh.',
        careers: ['Nhà khoa học', 'Bác sĩ', 'Dược sĩ', 'Lập trình viên', 'Nhà phân tích dữ liệu'],
        majors: ['Y khoa', 'Dược học', 'Công nghệ thông tin', 'Khoa học dữ liệu', 'Sinh học']
    },
    A: {
        name: 'Artistic (Nghệ thuật)',
        shortName: 'Nghệ thuật',
        icon: '🎨',
        color: '#ec4899',
        description: 'Bạn sáng tạo, thích tự do biểu đạt và có cảm quan thẩm mỹ tốt. Bạn thích làm việc trong môi trường linh hoạt.',
        careers: ['Thiết kế đồ họa', 'Nhà văn', 'Đạo diễn', 'Nhiếp ảnh gia', 'Nhạc sĩ', 'Kiến trúc sư'],
        majors: ['Thiết kế đồ họa', 'Kiến trúc', 'Mỹ thuật', 'Truyền thông đa phương tiện', 'Âm nhạc']
    },
    S: {
        name: 'Social (Xã hội)',
        shortName: 'Xã hội',
        icon: '🤝',
        color: '#22c55e',
        description: 'Bạn thích giúp đỡ, dạy dỗ và chăm sóc người khác. Bạn có kỹ năng giao tiếp tốt và đồng cảm cao.',
        careers: ['Giáo viên', 'Tâm lý học', 'Nhân viên xã hội', 'Bác sĩ', 'Nhà tư vấn', 'Nhân sự'],
        majors: ['Sư phạm', 'Tâm lý học', 'Công tác xã hội', 'Y tế công cộng', 'Nhân sự']
    },
    E: {
        name: 'Enterprising (Quản lý)',
        shortName: 'Quản lý',
        icon: '💼',
        color: '#f59e0b',
        description: 'Bạn thích lãnh đạo, thuyết phục và ảnh hưởng người khác. Bạn có tính cạnh tranh và thích thử thách.',
        careers: ['Doanh nhân', 'Quản lý', 'Luật sư', 'Chính trị gia', 'Sales', 'Marketing'],
        majors: ['Quản trị kinh doanh', 'Marketing', 'Luật', 'Quan hệ quốc tế', 'Tài chính']
    },
    C: {
        name: 'Conventional (Nghiệp vụ)',
        shortName: 'Nghiệp vụ',
        icon: '📊',
        color: '#06b6d4',
        description: 'Bạn thích làm việc có tổ chức, theo quy trình rõ ràng. Bạn cẩn thận, chính xác và đáng tin cậy.',
        careers: ['Kế toán', 'Thư ký', 'Ngân hàng', 'Kiểm toán', 'Quản trị văn phòng'],
        majors: ['Kế toán', 'Tài chính - Ngân hàng', 'Quản trị văn phòng', 'Logistics', 'Thống kê']
    }
};

const LIKERT_OPTIONS = [
    { value: 5, emoji: '😍', text: 'Rất đồng ý', desc: 'Đúng hoàn toàn với tôi' },
    { value: 4, emoji: '🙂', text: 'Đồng ý', desc: 'Khá giống tôi' },
    { value: 3, emoji: '😐', text: 'Trung lập', desc: 'Có thể đúng hoặc sai' },
    { value: 2, emoji: '🙁', text: 'Không đồng ý', desc: 'Không giống tôi lắm' },
    { value: 1, emoji: '😤', text: 'Rất không đồng ý', desc: 'Hoàn toàn không phải tôi' }
];

class HollandQuiz {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.answers = [];
        this.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        this.startTime = null;

        this.init();
    }

    async init() {
        await this.loadQuestions();
    }

    async loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            const data = await response.json();
            this.questions = data.questions || [];
        } catch (error) {
            console.error('Error loading questions:', error);
            // Fallback questions
            this.questions = this.getDefaultQuestions();
        }
    }

    getDefaultQuestions() {
        return [
            { text: "Tôi thích sửa chữa đồ đạc, máy móc trong nhà.", type: "R" },
            { text: "Tôi thích làm việc ngoài trời hơn trong văn phòng.", type: "R" },
            { text: "Tôi thích tìm hiểu về cách hoạt động của các thiết bị.", type: "R" },
            { text: "Tôi thích làm thí nghiệm khoa học.", type: "I" },
            { text: "Tôi thích giải các bài toán khó.", type: "I" },
            { text: "Tôi thích nghiên cứu, phân tích dữ liệu.", type: "I" },
            { text: "Tôi thích vẽ, thiết kế hoặc sáng tạo.", type: "A" },
            { text: "Tôi thích viết lách, làm thơ hoặc kể chuyện.", type: "A" },
            { text: "Tôi thích nghe nhạc và có thể chơi nhạc cụ.", type: "A" },
            { text: "Tôi thích giúp đỡ người khác giải quyết vấn đề.", type: "S" },
            { text: "Tôi dễ đồng cảm với hoàn cảnh của người khác.", type: "S" },
            { text: "Tôi thích làm việc nhóm và giao tiếp.", type: "S" },
            { text: "Tôi thích thuyết phục người khác.", type: "E" },
            { text: "Tôi thích đứng đầu và dẫn dắt mọi người.", type: "E" },
            { text: "Tôi thích cạnh tranh và chiến thắng.", type: "E" },
            { text: "Tôi thích làm việc theo quy trình rõ ràng.", type: "C" },
            { text: "Tôi cẩn thận, tỉ mỉ trong công việc.", type: "C" },
            { text: "Tôi thích sắp xếp, tổ chức mọi thứ ngăn nắp.", type: "C" },
            { text: "Tôi thích tháo lắp và kiểm tra máy móc.", type: "R" },
            { text: "Tôi thích làm việc với số liệu và thống kê.", type: "I" },
            { text: "Tôi có xu hướng suy nghĩ theo cách riêng.", type: "A" },
            { text: "Tôi thích dạy học hoặc hướng dẫn người khác.", type: "S" },
            { text: "Tôi tự tin khi nói trước đám đông.", type: "E" },
            { text: "Tôi thích lập kế hoạch và tuân thủ thời gian biểu.", type: "C" },
            { text: "Tôi thích làm ra sản phẩm bằng tay.", type: "R" },
            { text: "Tôi đọc nhiều sách về khoa học và công nghệ.", type: "I" },
            { text: "Tôi thường có những ý tưởng sáng tạo.", type: "A" },
            { text: "Tôi quan tâm đến cảm xúc của người khác.", type: "S" },
            { text: "Tôi thích đàm phán và thương lượng.", type: "E" },
            { text: "Tôi thích công việc có kết quả rõ ràng.", type: "C" }
        ];
    }

    start() {
        this.currentIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        this.startTime = Date.now();

        document.getElementById('intro-section').style.display = 'none';
        document.getElementById('progress-section').style.display = 'block';
        document.getElementById('question-section').style.display = 'block';
        document.getElementById('result-section').style.display = 'none';

        this.renderQuestion();
    }

    renderQuestion() {
        const question = this.questions[this.currentIndex];
        const container = document.getElementById('question-container');

        // Update progress
        this.updateProgress();

        // Get type info for badge
        const typeInfo = HOLLAND_TYPES[question.type];

        container.innerHTML = `
            <div class="question-number">
                Câu hỏi ${this.currentIndex + 1}
                <span class="question-type-badge">${typeInfo.icon} ${typeInfo.shortName}</span>
            </div>
            <div class="question-text">${question.text}</div>
            
            <div class="likert-scale">
                ${LIKERT_OPTIONS.map(opt => `
                    <div class="likert-option" onclick="hollandQuiz.answer(${opt.value})">
                        <span class="likert-emoji">${opt.emoji}</span>
                        <div>
                            <div class="likert-text">${opt.text}</div>
                            <div class="likert-desc">${opt.desc}</div>
                        </div>
                        <span class="likert-score">+${opt.value}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="question-nav">
                <button class="nav-btn back" onclick="hollandQuiz.goBack()" ${this.currentIndex === 0 ? 'disabled' : ''}>
                    <i class="fa-solid fa-arrow-left"></i> Quay lại
                </button>
                <button class="nav-btn skip" onclick="hollandQuiz.skip()">
                    Bỏ qua <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;
    }

    updateProgress() {
        const percent = Math.round((this.currentIndex / this.questions.length) * 100);
        const remaining = this.questions.length - this.currentIndex;
        const minutesLeft = Math.ceil(remaining * 10 / 60); // ~10s per question

        document.getElementById('progress-info').textContent =
            `Câu ${this.currentIndex + 1}/${this.questions.length}`;
        document.getElementById('progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-time').innerHTML =
            `<i class="fa-solid fa-clock"></i> ~${minutesLeft} phút còn lại`;
    }

    answer(value) {
        const question = this.questions[this.currentIndex];
        this.answers[this.currentIndex] = { type: question.type, value };

        // Add animation feedback
        const options = document.querySelectorAll('.likert-option');
        options.forEach(opt => opt.style.pointerEvents = 'none');

        setTimeout(() => {
            this.next();
        }, 200);
    }

    goBack() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderQuestion();
        }
    }

    skip() {
        this.answers[this.currentIndex] = { type: this.questions[this.currentIndex].type, value: 3 };
        this.next();
    }

    next() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            this.calculateResults();
        } else {
            this.renderQuestion();
        }
    }

    calculateResults() {
        // Reset scores
        this.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        const maxScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

        // Calculate scores
        this.answers.forEach((answer, index) => {
            if (answer) {
                this.scores[answer.type] += answer.value;
                maxScores[answer.type] += 5; // Max possible per question
            }
        });

        // Convert to percentages
        const percentages = {};
        for (let type in this.scores) {
            percentages[type] = maxScores[type] > 0
                ? Math.round((this.scores[type] / maxScores[type]) * 100)
                : 0;
        }

        // Sort types by score
        const sortedTypes = Object.entries(this.scores)
            .sort((a, b) => b[1] - a[1])
            .map(([type]) => type);

        const primaryType = sortedTypes[0];
        const secondaryType = sortedTypes[1];

        // Save to localStorage for chat integration
        this.saveResult(primaryType, secondaryType, percentages);

        // Show results
        this.showResults(primaryType, secondaryType, percentages);
    }

    saveResult(primary, secondary, percentages) {
        const result = {
            primary: HOLLAND_TYPES[primary].shortName,
            secondary: HOLLAND_TYPES[secondary].shortName,
            code: `${primary}${secondary}`,
            percentages,
            suggestedMajors: HOLLAND_TYPES[primary].majors,
            date: new Date().toISOString()
        };

        // Save with the key chat.js expects
        localStorage.setItem('edupath_holland_result', JSON.stringify(result));
    }

    showResults(primary, secondary, percentages) {
        document.getElementById('progress-section').style.display = 'none';
        document.getElementById('question-section').style.display = 'none';
        document.getElementById('result-section').style.display = 'block';

        const primaryInfo = HOLLAND_TYPES[primary];
        const secondaryInfo = HOLLAND_TYPES[secondary];

        const resultContent = document.getElementById('result-content');
        resultContent.innerHTML = `
            <div class="result-header">
                <div class="result-badge">
                    <i class="fa-solid fa-trophy"></i> Hoàn thành!
                </div>
                <h2 class="result-title">${primaryInfo.icon} ${primaryInfo.name}</h2>
                <p class="result-code">Mã Holland của bạn: <strong>${primary}${secondary}</strong></p>
            </div>
            
            <!-- Radar Chart -->
            <div class="chart-container">
                <canvas id="holland-chart"></canvas>
            </div>
            
            <!-- Top Types -->
            <div class="top-types">
                <div class="type-card primary">
                    <div class="type-card-header">
                        <span class="type-card-icon">${primaryInfo.icon}</span>
                        <div class="type-card-info">
                            <h3>${primaryInfo.shortName}</h3>
                            <span>Nhóm chính • ${percentages[primary]}%</span>
                        </div>
                    </div>
                    <p>${primaryInfo.description}</p>
                </div>
                <div class="type-card">
                    <div class="type-card-header">
                        <span class="type-card-icon">${secondaryInfo.icon}</span>
                        <div class="type-card-info">
                            <h3>${secondaryInfo.shortName}</h3>
                            <span>Nhóm phụ • ${percentages[secondary]}%</span>
                        </div>
                    </div>
                    <p>${secondaryInfo.description}</p>
                </div>
            </div>
            
            <!-- Suggested Careers -->
            <div class="careers-section">
                <h4 class="section-title">
                    <i class="fa-solid fa-briefcase"></i> Nghề nghiệp phù hợp
                </h4>
                <div class="careers-grid" style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${primaryInfo.careers.map(c => `
                        <span class="career-chip"><i class="fa-solid fa-check"></i> ${c}</span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Suggested Majors -->
            <div class="careers-section">
                <h4 class="section-title">
                    <i class="fa-solid fa-graduation-cap"></i> Ngành học phù hợp
                </h4>
                <div class="careers-grid" style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${primaryInfo.majors.map(m => `
                        <span class="career-chip" style="border-color: ${primaryInfo.color};">
                            <i class="fa-solid fa-book" style="color: ${primaryInfo.color};"></i> ${m}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Actions -->
            <div class="result-actions">
                <a href="chat.html?q=${encodeURIComponent('Dựa trên kết quả Holland ' + primary + secondary + ' của tôi, hãy tư vấn ngành học và điểm chuẩn phù hợp')}" class="action-btn primary">
                    <i class="fa-solid fa-robot"></i> Tư vấn với AI
                </a>
                <a href="lookup.html" class="action-btn secondary">
                    <i class="fa-solid fa-search"></i> Tra cứu điểm chuẩn
                </a>
                <button onclick="hollandQuiz.restart()" class="action-btn secondary">
                    <i class="fa-solid fa-redo"></i> Làm lại
                </button>
            </div>
        `;

        // Create radar chart
        this.createRadarChart(percentages);
    }

    createRadarChart(percentages) {
        const ctx = document.getElementById('holland-chart').getContext('2d');

        const data = {
            labels: ['Thực tế (R)', 'Nghiên cứu (I)', 'Nghệ thuật (A)', 'Xã hội (S)', 'Quản lý (E)', 'Nghiệp vụ (C)'],
            datasets: [{
                label: 'Điểm của bạn',
                data: [percentages.R, percentages.I, percentages.A, percentages.S, percentages.E, percentages.C],
                fill: true,
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                borderColor: 'rgba(139, 92, 246, 1)',
                pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 2
            }]
        };

        new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: '#64748b',
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#94a3b8',
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    restart() {
        document.getElementById('intro-section').style.display = 'block';
        document.getElementById('progress-section').style.display = 'none';
        document.getElementById('question-section').style.display = 'none';
        document.getElementById('result-section').style.display = 'none';
    }
}

// Global instance
let hollandQuiz;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    hollandQuiz = new HollandQuiz();
});

// Global functions
function startQuiz() {
    hollandQuiz.start();
}
