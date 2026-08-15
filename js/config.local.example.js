// js/config.local.js - Local Development Configuration
// ⚠️ COPY file này thành config.local.js và thêm API key của bạn
// ⚠️ KHÔNG commit file config.local.js lên Git!

// Override CONFIG với API key cho local development
if (typeof CONFIG !== 'undefined') {
    CONFIG.GROQ_API_KEY = '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'; // Thay bằng API key thật
}
