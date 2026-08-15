// js/chat.js - AI Chatbot with Groq API

class EduPathChat {
    constructor() {
        this.messages = [];
        this.universitiesData = null;
        this.hollandResult = null;
        this.currentMajorContext = null;
        this.isLoading = false;

        this.init();
    }

    async init() {
        // Load conversation history
        this.loadConversation();

        // Load Holland result if exists
        this.loadHollandResult();

        // Load major context from session if exists
        this.loadMajorContext();

        // Check for preset question first
        const hasPresetQuestion = sessionStorage.getItem(
            'edupath_preset_question'
        );

        // Clear old messages when opening a preset question
        if (hasPresetQuestion) {
            this.messages = [];
        }

        // Load universities data for context
        await this.loadUniversitiesData();

        // Update context bar UI
        this.updateContextBar();

        // Render existing messages
        this.renderMessages();

        // Setup event listeners
        this.setupEventListeners();

        // Check for preset question and fill input
        this.checkPresetQuestion();

        // Focus input
        document.getElementById('chat-input')?.focus();
    }

    loadConversation() {
        try {
            const saved = localStorage.getItem(
                CONFIG.STORAGE_KEY_CHAT
            );

            if (saved) {
                this.messages = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading conversation:', e);
            this.messages = [];
        }
    }

    saveConversation() {
        try {
            // Keep only last N messages to prevent localStorage overflow
            const toSave = this.messages.slice(
                -CONFIG.MAX_CONVERSATION_LENGTH
            );

            localStorage.setItem(
                CONFIG.STORAGE_KEY_CHAT,
                JSON.stringify(toSave)
            );
        } catch (e) {
            console.error('Error saving conversation:', e);
        }
    }

    loadHollandResult() {
        try {
            const saved = localStorage.getItem(
                CONFIG.STORAGE_KEY_HOLLAND
            );

            if (saved) {
                this.hollandResult = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading Holland result:', e);
        }
    }

    loadMajorContext() {
        try {
            const saved = sessionStorage.getItem(
                'edupath_major_context'
            );

            if (saved) {
                this.currentMajorContext = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading major context:', e);
        }
    }

    saveMajorContext(major) {
        try {
            sessionStorage.setItem(
                'edupath_major_context',
                JSON.stringify(major)
            );

            this.currentMajorContext = major;
            this.updateContextBar();
        } catch (e) {
            console.error('Error saving major context:', e);
        }
    }

    updateContextBar() {
        const contextBar = document.getElementById('context-bar');
        const hollandEl = document.getElementById(
            'context-holland'
        );
        const majorEl = document.getElementById('context-major');

        if (!contextBar) {
            return;
        }

        let hasContext = false;

        // Update Holland context
        if (
            this.hollandResult &&
            this.hollandResult.primary &&
            hollandEl
        ) {
            hollandEl.style.display = 'flex';

            const hollandText = document.getElementById(
                'holland-text'
            );

            if (hollandText) {
                hollandText.textContent =
                    `Holland: ${this.hollandResult.primary}`;
            }

            hasContext = true;
        } else if (hollandEl) {
            hollandEl.style.display = 'none';
        }

        // Update major context
        if (this.currentMajorContext && majorEl) {
            majorEl.style.display = 'flex';

            const majorText = document.getElementById(
                'major-text'
            );

            if (majorText) {
                majorText.textContent =
                    `${this.currentMajorContext.majorName} - ` +
                    `${this.currentMajorContext.uniName}`;
            }

            hasContext = true;
        } else if (majorEl) {
            majorEl.style.display = 'none';
        }

        // Show or hide context bar
        if (hasContext) {
            contextBar.classList.add('active');
        } else {
            contextBar.classList.remove('active');
        }
    }

    async loadUniversitiesData() {
        try {
            const response = await fetch(
                'data/universities.json'
            );

            if (!response.ok) {
                throw new Error(
                    `Không thể tải universities.json: ${response.status}`
                );
            }

            const data = await response.json();
            this.universitiesData = data.universities || data;
        } catch (e) {
            console.error(
                'Error loading universities data:',
                e
            );
        }
    }

    checkPresetQuestion() {
        const question = sessionStorage.getItem(
            'edupath_preset_question'
        );

        const majorData = sessionStorage.getItem(
            'edupath_major_context'
        );

        // Parse major data if exists
        if (majorData) {
            try {
                const major = JSON.parse(majorData);
                this.saveMajorContext(major);
                this.updateContextBar();
            } catch (e) {
                console.error(
                    'Error parsing major data:',
                    e
                );
            }

            sessionStorage.removeItem(
                'edupath_major_context'
            );
        }

        if (question) {
            sessionStorage.removeItem(
                'edupath_preset_question'
            );

            const input = document.getElementById(
                'chat-input'
            );

            if (input) {
                input.value = question;
                input.focus();
                input.style.height = 'auto';
                input.style.height =
                    Math.min(input.scrollHeight, 200) + 'px';
            }
        }
    }

    setupEventListeners() {
        const form = document.getElementById('chat-form');
        const input = document.getElementById('chat-input');
        const clearBtn = document.getElementById(
            'clear-chat'
        );

        form?.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = input?.value.trim();

            if (message && !this.isLoading) {
                this.sendMessage(message);
                input.value = '';
                input.style.height = 'auto';
            }
        });

        clearBtn?.addEventListener('click', () => {
            if (
                confirm(
                    'Bạn có chắc muốn xóa lịch sử trò chuyện?'
                )
            ) {
                this.clearConversation();
            }
        });

        // Quick questions using data-question
        document
            .querySelectorAll('.quick-question')
            .forEach((btn) => {
                btn.addEventListener('click', () => {
                    const question = btn.dataset.question;

                    if (question && !this.isLoading) {
                        this.sendMessage(question);
                    }
                });
            });
    }

    async sendMessage(content) {
        if (this.isLoading) {
            return;
        }

        // Add user message
        this.messages.push({
            role: 'user',
            content
        });

        this.renderMessages();
        this.saveConversation();

        // Show loading
        this.isLoading = true;
        this.showLoading();

        try {
            const response = await this.callGroqAPI(content);

            // Add assistant message
            this.messages.push({
                role: 'assistant',
                content: response
            });

            this.saveConversation();
        } catch (error) {
            console.error('API Error:', error);

            this.messages.push({
                role: 'assistant',
                content:
                    'Xin lỗi, đã có lỗi xảy ra. ' +
                    'Vui lòng thử lại sau.'
            });
        } finally {
            this.isLoading = false;
            this.renderMessages();
        }
    }

    async callGroqAPI(userMessage) {
        const contextMessages = this.buildContext(userMessage);

        if (!CONFIG.GROQ_API_KEY) {
            throw new Error(
                'Groq API key chưa được cấu hình'
            );
        }

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        `Bearer ${CONFIG.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model:
                        CONFIG.GROQ_MODEL ||
                        'llama-3.3-70b-versatile',
                    messages: contextMessages,
                    temperature: 0.6,
                    max_completion_tokens: 2048
                })
            }
        );

        let data;

        try {
            data = await response.json();
        } catch (error) {
            throw new Error(
                `Groq API trả về dữ liệu không hợp lệ: ` +
                `${response.status}`
            );
        }

        if (!response.ok) {
            console.error('Groq API Error:', data);

            throw new Error(
                data?.error?.message ||
                data?.error ||
                `Groq API Error: ${response.status}`
            );
        }

        const content =
            data?.choices?.[0]?.message?.content;

        if (!content) {
            console.error(
                'Invalid Groq response:',
                data
            );

            throw new Error(
                'Groq API không trả về nội dung'
            );
        }

        return content;
    }

    buildContext(userMessage) {
        let systemPrompt = CONFIG.SYSTEM_PROMPT;

        // Add Holland result context if available
        if (this.hollandResult) {
            systemPrompt += `

Kết quả trắc nghiệm Holland của thí sinh:
- Nhóm tính cách chính: ${
    this.hollandResult.primary || 'Chưa xác định'
}
- Nhóm tính cách phụ: ${
    this.hollandResult.secondary || 'Chưa xác định'
}
- Các ngành phù hợp: ${
    this.hollandResult.suggestedMajors?.join(', ') ||
    'Chưa xác định'
}`;
        }

        // Add current major context if available
        if (this.currentMajorContext) {
            systemPrompt += `

Thí sinh đang quan tâm đến:
- Ngành: ${this.currentMajorContext.majorName}
- Trường: ${this.currentMajorContext.uniName}
- Điểm chuẩn: ${this.currentMajorContext.score} điểm
- Khối: ${this.currentMajorContext.block}
- Năm: ${this.currentMajorContext.year}`;
        }

        // Add some university data context
        if (
            Array.isArray(this.universitiesData) &&
            this.universitiesData.length > 0
        ) {
            const topUniversities = this.universitiesData
                .slice(0, 10)
                .map((university) => university.name)
                .filter(Boolean)
                .join(', ');

            systemPrompt += `

Một số trường trong database: ${topUniversities}...`;
        }

        // Build messages array
        const messages = [
            {
                role: 'system',
                content: systemPrompt
            }
        ];

        // The current user message is already present in this.messages
        const recentMessages = this.messages.slice(-10);
        messages.push(...recentMessages);

        return messages;
    }

    renderMessages() {
        const container = document.getElementById(
            'chat-messages'
        );

        if (!container) {
            return;
        }

        container.innerHTML = '';

        if (this.messages.length === 0) {
            container.innerHTML = `
                <div class="welcome-state">
                    <div class="welcome-left">
                        <div class="welcome-icon">
                            <i class="fa-solid fa-sparkles"></i>
                        </div>

                        <h1 class="welcome-title">
                            Xin chào,<br>
                            tôi có thể giúp gì?
                        </h1>

                        <p class="welcome-subtitle">
                            Trợ lý AI tư vấn tuyển sinh,
                            tra cứu điểm chuẩn và hướng nghiệp.
                            Hãy hỏi bất cứ điều gì bạn muốn biết.
                        </p>

                        ${
                            this.hollandResult
                                ? `
                                    <div class="holland-badge">
                                        <i class="fa-solid fa-check-circle"></i>
                                        Kết quả Holland:
                                        ${this.hollandResult.primary}
                                    </div>
                                `
                                : `
                                    <a
                                        href="career.html"
                                        class="holland-link"
                                    >
                                        <i class="fa-solid fa-compass"></i>
                                        Làm bài test hướng nghiệp Holland
                                    </a>
                                `
                        }
                    </div>

                    <div class="welcome-right">
                        <div class="quick-grid">
                            <div
                                class="quick-card"
                                onclick="askQuestion(
                                    'Điểm chuẩn ngành Công nghệ thông tin ở các trường top năm 2025?'
                                )"
                            >
                                <div class="quick-card-icon blue">
                                    <i class="fa-solid fa-chart-line"></i>
                                </div>
                                <h4>Tra cứu điểm chuẩn</h4>
                                <p>
                                    Xem điểm chuẩn CNTT các trường
                                    hàng đầu
                                </p>
                            </div>

                            <div
                                class="quick-card"
                                onclick="askQuestion(
                                    'Tôi được 25 điểm khối A, có thể đậu những trường nào ở Hà Nội?'
                                )"
                            >
                                <div class="quick-card-icon gold">
                                    <i class="fa-solid fa-bullseye"></i>
                                </div>
                                <h4>Phân tích cơ hội</h4>
                                <p>
                                    Đánh giá khả năng trúng tuyển
                                    theo điểm
                                </p>
                            </div>

                            <div
                                class="quick-card"
                                onclick="askQuestion(
                                    'So sánh ngành Kinh tế và ngành Marketing về điểm chuẩn và cơ hội việc làm'
                                )"
                            >
                                <div class="quick-card-icon green">
                                    <i class="fa-solid fa-scale-balanced"></i>
                                </div>
                                <h4>So sánh ngành học</h4>
                                <p>
                                    So sánh điểm và cơ hội
                                    nghề nghiệp
                                </p>
                            </div>

                            <div
                                class="quick-card"
                                onclick="askQuestion(
                                    'Tôi thích làm việc độc lập, phù hợp với ngành nào?'
                                )"
                            >
                                <div class="quick-card-icon purple">
                                    <i class="fa-solid fa-lightbulb"></i>
                                </div>
                                <h4>Tư vấn theo tính cách</h4>
                                <p>
                                    Gợi ý ngành phù hợp với bạn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            return;
        }

        this.messages.forEach((msg) => {
            const div = document.createElement('div');
            div.className = `message ${msg.role}`;

            const avatar =
                msg.role === 'user'
                    ? '<i class="fa-solid fa-user"></i>'
                    : '<i class="fa-solid fa-robot"></i>';

            div.innerHTML = `
                <div class="message-avatar">
                    ${avatar}
                </div>

                <div class="message-content">
                    <div class="message-bubble">
                        ${this.formatMessage(msg.content)}
                    </div>
                </div>
            `;

            container.appendChild(div);
        });

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    formatMessage(content) {
        if (typeof content !== 'string') {
            return '';
        }

        // Use marked.js for Markdown rendering
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true
            });

            return marked.parse(content);
        }

        // Fallback formatting
        return content
            .replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
            )
            .replace(
                /\*(.*?)\*/g,
                '<em>$1</em>'
            )
            .replace(
                /`(.*?)`/g,
                '<code>$1</code>'
            )
            .replace(
                /\n/g,
                '<br>'
            );
    }

    showLoading() {
        const container = document.getElementById(
            'chat-messages'
        );

        if (!container) {
            return;
        }

        const loadingDiv = document.createElement('div');

        loadingDiv.className =
            'message assistant loading-message';

        loadingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        container.appendChild(loadingDiv);
        container.scrollTop = container.scrollHeight;
    }

    clearConversation() {
        this.messages = [];
        localStorage.removeItem(CONFIG.STORAGE_KEY_CHAT);
        this.renderMessages();
    }
}

// Send a question from welcome quick cards
function askQuestion(question) {
    if (
        question &&
        window.eduPathChat &&
        !window.eduPathChat.isLoading
    ) {
        window.eduPathChat.sendMessage(question);
    }
}

// Global function for Holland context button
function clearHollandContext() {
    localStorage.removeItem(CONFIG.STORAGE_KEY_HOLLAND);

    if (window.eduPathChat) {
        window.eduPathChat.hollandResult = null;
        window.eduPathChat.updateContextBar();
    }
}

// Global function for major context button
function clearMajorContext() {
    sessionStorage.removeItem('edupath_major_context');

    if (window.eduPathChat) {
        window.eduPathChat.currentMajorContext = null;
        window.eduPathChat.updateContextBar();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.eduPathChat = new EduPathChat();
});