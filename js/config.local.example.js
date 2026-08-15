// js/config.local.js - Local Development Configuration
// ⚠️ COPY file này thành config.local.js và thêm API key của bạn
// ⚠️ KHÔNG commit file config.local.js lên Git!

// Override CONFIG với API key cho local development
if (typeof CONFIG !== 'undefined') {
    CONFIG.GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // Thay bằng API key thật
}
