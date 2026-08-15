// js/config.example.js - Example Configuration
// Copy this file to config.js and add your API key

const CONFIG = {
    // Groq API Configuration  
    GROQ_API_KEY: 'YOUR_GROQ_API_KEY_HERE', // Get from https://console.groq.com
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_MODEL: 'llama-3.3-70b-versatile',

    // App Configuration
    MAX_CONVERSATION_LENGTH: 50,
    STORAGE_KEY_CHAT: 'edupath_chat_history',
    STORAGE_KEY_HOLLAND: 'edupath_holland_result',

    // System prompt for AI
    SYSTEM_PROMPT: `Bạn là EduPath AI - trợ lý tư vấn tuyển sinh đại học Việt Nam...`
};
