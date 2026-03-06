export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { prompt, mode } = req.body;
    const apiKey = process.env.GROK_API_KEY;

    // اختيار الموديل الأنسب والأرخص من قائمة أسعار xAI
    let selectedModel = "grok-3-mini"; 
    
    if (mode === 'image') {
        selectedModel = "grok-imagine-image"; 
    } else if (mode === 'video') {
        selectedModel = "grok-imagine-video"; 
    } else if (mode === 'edit') {
        selectedModel = "grok-3"; 
    }

    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [{ role: "user", content: prompt }],
                stream: false
            }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json({ result: `تنبيه: ${data.error?.message || 'تأكد من إعدادات الحساب'}` });
        }

        res.status(200).json({ result: data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ result: "فشل السيرفر في الوصول لـ xAI" });
    }
}
