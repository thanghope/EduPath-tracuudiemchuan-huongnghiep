// Shared JavaScript logic
console.log("EduPath App Initialized");

// Placeholder for Chat Button Interaction
document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Tính năng Chatbot đang được phát triển!");
        });
    }
});
