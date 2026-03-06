export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt, mode } = req.body;
    const apiKey = process.env.GROK_API_KEY;

    try {
        // سنستخدم الموديل Grok-2-vision لأنه الأقوى حالياً
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "grok-2-vision-1212",
                messages: [
                    { 
                        role: "system", 
                        content: `You are a helpful assistant. Current mode: ${mode}. If mode is image, describe it vividly. If chat, be conversational.` 
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            }),
        });

        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        // إرجاع النص الناتج من Grok
        res.status(200).json({ result: data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ error: "فشل السيرفر في التواصل مع Grok" });
    }
}
