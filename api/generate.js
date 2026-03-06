// api/generate.js
// هذا الملف يعمل على سيرفر Vercel ولا يراه المستخدم النهائي
export default async function handler(req, res) {
    // التأكد من أن الطلب من نوع POST فقط لحماية السيرفر
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt, mode } = req.body;
    const apiKey = process.env.GROK_API_KEY; // جلب المفتاح بأمان من الإعدادات

    try {
        // الاتصال بـ API الخاص بـ Grok
        // ملاحظة: الرابط أدناه هو مثال، سنحدثه حسب توثيق Grok الرسمي لديك
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "grok-beta", // أو الموديل المخصص للصور
                messages: [
                    { role: "system", content: "You are a creative AI assistant." },
                    { role: "user", content: prompt }
                ]
            }),
        });

        const data = await response.json();
        
        // إعادة النتيجة للواجهة الأمامية
        res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'فشل السيرفر في معالجة الطلب' });
    }
}
