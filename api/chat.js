// Vercel Serverless Function - Proxy cho Groq API
// API key được lưu trong Vercel Environment Variables, KHÔNG nằm trong code

module.exports = async function handler(req, res) {
    // Chỉ cho phép POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Lấy API key từ environment variable của Vercel
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { messages, model, temperature, max_completion_tokens } = req.body;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model || 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: temperature || 0.7,
                max_completion_tokens: max_completion_tokens || 2048
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Groq API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
