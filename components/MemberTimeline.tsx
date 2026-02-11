import React from 'react';
import { Search, Star, Crown, Rocket } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const MemberTimeline: React.FC = () => {
  const stages = [
    { year: 'السنة الأولى', title: 'اكتشاف', desc: 'تعرّف على النادي، شارك في أولى الفعاليات، واكتشف مواهبك وشغفك الحقيقي.', icon: <Search size={24} />, color: 'bg-blue-500' },
    { year: 'السنة الثانية', title: 'مشاركة', desc: 'تولّ مهاماً فعلية، ساهم في التنظيم، وطوّر مهاراتك من خلال الممارسة.', icon: <Star size={24} />, color: 'bg-accent' },
    { year: 'السنة الثالثة', title: 'قيادة', desc: 'قُد فريقك الخاص، أطلق مبادرتك، وألهم الأعضاء الجدد بتجربتك.', icon: <Crown size={24} />, color: 'bg-primary' },
    { year: 'السنة الرابعة', title: 'تأثير', desc: 'اترك بصمتك الخاصة في تاريخ النادي وادعم الجيل القادم من القادة.', icon: <Rocket size={24} />, color: 'bg-emerald-600' },
  ];

  return (
    <section className="py-28 md:py-36 bg-warm/60 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <RevealOnScroll>
            <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">رحلتك معنا</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">مسار العضو في آفاق</h2>
            <div className="h-1 w-24 gold-gradient mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              كل سنة هي فصل جديد من النمو والتطور في رحلتك الجامعية.
            </p>
          </RevealOnScroll>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Central line */}
          <div className="absolute right-1/2 md:right-1/2 top-0 bottom-0 w-0.5 bg-gray-200 translate-x-1/2 hidden md:block" />

          {stages.map((stage, idx) => (
            <RevealOnScroll key={idx} direction={idx % 2 === 0 ? 'right' : 'left'} delay={idx * 200}>
              <div className={`flex items-center gap-8 mb-16 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                    <span className="text-accent font-black text-sm">{stage.year}</span>
                    <h3 className="text-2xl font-black text-primary mt-2 mb-3">{stage.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{stage.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className={`w-14 h-14 ${stage.color} rounded-full flex items-center justify-center text-white shadow-lg z-10 flex-shrink-0 ring-4 ring-warm`}>
                  {stage.icon}
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberTimeline;
