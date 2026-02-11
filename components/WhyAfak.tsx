import React from 'react';
import { Zap, Users, Award, Sparkles } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const WhyAfak: React.FC = () => {
  const reasons = [
    { icon: <Zap size={28} />, title: 'تطوير مهاراتك', desc: 'ورشات عمل متخصصة في القيادة، التواصل، البرمجة، والتصميم لبناء قدراتك العملية.', color: 'from-amber-500/10 to-amber-500/5' },
    { icon: <Users size={28} />, title: 'بناء شبكة علاقات', desc: 'تعرّف على زملاء من مختلف التخصصات وابنِ صداقات مهنية ستفتح لك أبواباً جديدة.', color: 'from-primary/10 to-primary/5' },
    { icon: <Award size={28} />, title: 'فرص قيادية', desc: 'تولَّ مسؤوليات حقيقية في تنظيم الفعاليات وإدارة الفرق واكتسب خبرة ميدانية.', color: 'from-accent/10 to-accent/5' },
    { icon: <Sparkles size={28} />, title: 'بيئة محفّزة', desc: 'أجواء مفعمة بالحماس والإبداع تدفعك للتميز وتحقيق أفضل نسخة من نفسك.', color: 'from-emerald-500/10 to-emerald-500/5' },
  ];

  return (
    <section id="why-afak" className="py-28 md:py-36 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <RevealOnScroll>
            <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">لماذا آفاق؟</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">أربعة أسباب للانضمام</h2>
            <div className="h-1 w-24 gold-gradient mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              انضمامك إلى آفاق ليس مجرد عضوية… إنه بداية رحلة تغيير حقيقية.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
          {reasons.map((r, idx) => (
            <RevealOnScroll key={idx} delay={idx * 120}>
              <div className="perspective-container">
                <div className={`tilt-card glass-card p-9 rounded-3xl border-b-4 border-transparent hover:border-accent group bg-gradient-to-br ${r.color} h-full`}>
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-400 mb-7 group-hover:rotate-6 group-hover:scale-110">
                    {r.icon}
                  </div>
                  <h3 className="text-xl font-black text-primary mb-3">{r.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAfak;
