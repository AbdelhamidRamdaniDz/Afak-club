import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    { name: 'أحمد بن عمر', role: 'عضو سابق - دفعة 2019', text: 'نادي آفاق غيّر مسار حياتي الجامعية بالكامل. تعلمت مهارات لا تُدرَّس في القاعات، وبنيت صداقات ستدوم العمر.', img: 'https://i.pravatar.cc/200?u=afak_t1' },
    { name: 'سارة مقداد', role: 'عضوة نشطة - دفعة 2022', text: 'بيئة محفزة ومليئة بالتحديات الإيجابية. كل فعالية هي فرصة تعلم جديدة، وكل عضو هو مصدر إلهام.', img: 'https://i.pravatar.cc/200?u=afak_t2' },
    { name: 'ياسين خالدي', role: 'مسؤول الإعلام - دفعة 2021', text: 'اكتشفت شغفي بالتصميم والتواصل من خلال عملي في النادي. المهارات التي اكتسبتها هنا فتحت لي آفاقاً مهنية لم أكن أتخيلها.', img: 'https://i.pravatar.cc/200?u=afak_t3' },
    { name: 'نور الهدى', role: 'عضوة - دفعة 2023', text: 'أنصح كل طالب جديد بالانضمام. الجو العائلي والاحترافية في التنظيم يجعلان من التجربة شيئاً لا يُنسى.', img: 'https://i.pravatar.cc/200?u=afak_t4' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 md:py-36 bg-warm/40 relative gradient-mesh">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">شهادات الأعضاء</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">ماذا يقول أعضاؤنا؟</h2>
            <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={200}>
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${
                    idx === activeIdx ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                  style={{ display: idx === activeIdx ? 'block' : 'none' }}
                >
                  <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl text-center relative">
                    <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <Quote size={24} className="text-primary" />
                    </div>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium italic">
                      "{t.text}"
                    </p>
                    <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-4 border-warm shadow-md" />
                    <h4 className="font-black text-primary text-lg">{t.name}</h4>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? 'w-8 bg-accent' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default TestimonialsSection;
