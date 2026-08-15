export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        return res.status(500).json({
            error: 'GROQ_API_KEY is not configured'
        });
    }

    try {
        const {
            messages,
            model,
            temperature,
            max_completion_tokens
        } = req.body || {};

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: 'messages is required'
            });
        }

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model || 'llama-3.3-70b-versatile',
                    messages,
                    temperature: temperature ?? 0.7,
                    max_completion_tokens:
                        max_completion_tokens ?? 2048
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq API response:', data);

            return res.status(response.status).json({
                error:
                    data?.error?.message ||
                    'Groq API request failed',
                details: data
            });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Groq API Error:', error);

        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}