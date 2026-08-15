// js/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    initChatWidget();
});

function initChatWidget() {
    const container = document.getElementById('chat-widget-container');

    // Add Chat UI HTML
    container.innerHTML = `
        <div id="chat-window" style="
            display: none;
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            flex-direction: column;
            z-index: 1001;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        ">
            <div style="background: var(--primary-color); color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 600;">EduPath Assistant</div>
                <button onclick="toggleChat()" style="background: none; border: none; color: white; cursor: pointer;">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            
            <div id="chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
                <div class="message bot-message" style="align-self: flex-start; background: #f1f5f9; padding: 10px 14px; border-radius: 12px 12px 12px 0; max-width: 80%;">
                    Xin chào! Tôi có thể giúp gì cho bạn về tuyển sinh và hướng nghiệp?
                </div>
            </div>
            
            <div style="padding: 12px; border-top: 1px solid #e2e8f0; display: flex; gap: 8px;">
                <input type="text" id="chat-input" placeholder="Nhập câu hỏi..." style="flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 20px; outline: none;">
                <button onclick="sendMessage()" style="background: var(--primary-color); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer;">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
        
        <button id="chat-toggle-btn" onclick="toggleChat()" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            border: none;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            cursor: pointer;
            z-index: 1000;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <i class="fa-solid fa-comment-dots"></i>
        </button>
    `;

    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';

    // Simulate AI typing
    setTimeout(() => {
        const reply = getBotReply(message);
        addMessage(reply, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    const isBot = sender === 'bot';

    div.style.alignSelf = isBot ? 'flex-start' : 'flex-end';
    div.style.background = isBot ? '#f1f5f9' : 'var(--primary-color)';
    div.style.color = isBot ? 'black' : 'white';
    div.style.padding = '10px 14px';
    div.style.borderRadius = isBot ? '12px 12px 12px 0' : '12px 12px 0 12px';
    div.style.maxWidth = '80%';
    div.textContent = text;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function getBotReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('điểm chuẩn') || msg.includes('điểm')) return "Bạn có thể tra cứu điểm chuẩn chi tiết tại mục 'Tra cứu điểm chuẩn' trên thanh menu nhé!";
    if (msg.includes('ngành nào') || msg.includes('học gì')) return "Để biết mình hợp ngành nào, bạn hãy thử làm bài trắc nghiệm hướng nghiệp Holland của chúng tôi.";
    if (msg.includes('xin chào') || msg.includes('hi')) return "Chào bạn! Chúc bạn một ngày tốt lành.";
    return "Cảm ơn câu hỏi của bạn. Hệ thống AI đang được nâng cấp để trả lời chi tiết hơn. Hiện tại vui lòng tham khảo các tính năng trên website.";
}
