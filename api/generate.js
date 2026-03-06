export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    const apiKey = process.env.GROK_API_KEY;

    try {
        // الرابط الصحيح حسب التوثيق للمحادثة وتوليد الصور
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "grok-2-vision-1212", // هذا الموديل يدعم الرؤية والصور
                messages: [
                    { role: "user", content: prompt }
                ],
                stream: false,
                temperature: 0.7
            }),
        });

        const data = await response.json();

        // فحص إذا كان هناك خطأ من Grok نفسه (مثل نقص الرصيد)
        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: 'تعذر الاتصال بخوادم xAI' });
    }
}
