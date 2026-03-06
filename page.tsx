"use client";
import React, { useState } from 'react';

export default function GrokApp() {
  const [selectedMode, setSelectedMode] = useState('image'); // المود الافتراضي

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      {/* القائمة الجانبية */}
      <aside style={{ width: '250px', borderRight: '1px solid #334155', padding: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Grok Vision</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setSelectedMode('image')} style={{ padding: '10px', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedMode === 'image' ? '#2563eb' : 'transparent', border: 'none', color: 'white' }}>🖼️ توليد صورة</button>
          <button onClick={() => setSelectedMode('edit')} style={{ padding: '10px', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedMode === 'edit' ? '#2563eb' : 'transparent', border: 'none', color: 'white' }}>🎨 تعديل صورة</button>
          <button onClick={() => setSelectedMode('video')} style={{ padding: '10px', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedMode === 'video' ? '#2563eb' : 'transparent', border: 'none', color: 'white' }}>🎬 تحويل لفيديو</button>
        </div>
      </aside>

      {/* منطقة المحادثة */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', maxWidth: '80%' }}>
            أهلاً بك! أنا مساعدك الذكي. لقد اخترت الآن وضع: **{selectedMode === 'image' ? 'توليد الصور' : selectedMode === 'edit' ? 'تعديل الصور' : 'صناعة الفيديو'}**. ماذا تريد أن نصنع؟
          </div>
        </div>

        {/* حقل الإدخال */}
        <div style={{ padding: '20px', borderTop: '1px solid #334155' }}>
          <input 
            type="text" 
            placeholder="اكتب طلبك هنا..." 
            style={{ width: '100%', padding: '15px', borderRadius: '10px', backgroundColor: '#1e293b', border: '1px solid #475569', color: 'white', outline: 'none' }}
          />
        </div>
      </main>
    </div>
  );
}
