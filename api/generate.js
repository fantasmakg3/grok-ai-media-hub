export default async function handler(req, res) {
    // حماية: التأكد من أن الطلب من نوع POST
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { prompt, mode } = req.body;
    const apiKey = process.env.GROK_API_KEY; // المفتاح الذي وضعته في إعدادات Vercel

    // اختيار الموديل الأرخص بناءً على رصيدك ($4.37)
    let selectedModel = "grok-3-mini"; // للدردشة (أرخص شيء)
    
    if (mode === 'image') {
        selectedModel = "grok-imagine-image"; // لتوليد الصور (أرخص شيء)
    } else if (mode === 'video') {
        selectedModel = "grok-imagine-video"; // للفيديو
    } else if (mode === 'edit') {
        selectedModel = "grok-3"; // للتعديل والرؤية
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
            return res.status(response.status).json({ result: `خطأ: ${data.error?.message || 'تأكد من الرصيد'}` });
        }

        // إرسال الرد للموقع
        res.status(200).json({ result: data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ result: "فشل الاتصال بخوادم Grok" });
    }
}

// كود تفعيل زر Enter للإرسال
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // منع السطر الجديد
        sendMessage(); // تشغيل دالة الإرسال
    }
});
