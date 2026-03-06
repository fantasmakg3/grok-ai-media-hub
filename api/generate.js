export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { prompt, mode } = req.body;
    const apiKey = process.env.GROK_API_KEY;

    // تحديد الموديل الأرخص بناءً على قائمة الأسعار
    let selectedModel = "grok-3-mini"; // الافتراضي للدردشة (الأرخص بـ $0.30)
    let endpoint = 'https://api.x.ai/v1/chat/completions';

    if (mode === 'image') {
        selectedModel = "grok-imagine-image"; // الأوفر للتوليد بـ $0.02
    } else if (mode === 'video') {
        selectedModel = "grok-imagine-video"; // موديل الفيديو
    } else if (mode === 'edit') {
        selectedModel = "grok-3"; // موديل يدعم الرؤية للتعديل
    }

    try {
        const response = await fetch(endpoint, {
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
            return res.status(response.status).json({ result: `خطأ من Grok: ${data.error?.message || 'تأكد من الرصيد'}` });
        }

        // في حالة الصور، Grok قد يرسل رابطاً أو نصاً وصفياً
        const output = data.choices ? data.choices[0].message.content : "تمت المعالجة بنجاح";
        res.status(200).json({ result: output });

    } catch (error) {
        res.status(500).json({ result: "فشل في الاتصال بالسيرفر" });
    }
}
