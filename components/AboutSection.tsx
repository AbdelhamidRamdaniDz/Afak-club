import React from 'react';
import { History, Lightbulb, Users, Heart, Shield } from 'lucide-react';
import { RevealOnScroll, useParallax, StatCounter } from './Helpers';

const AboutSection: React.FC = () => {
  const scrollY = useParallax();

  const values = [
    { icon: <Lightbulb size={24} />, title: 'الابتكار', desc: 'بيئة تحتضن الأفكار الجديدة وتحوّلها لمشاريع حقيقية.' },
    { icon: <Users size={24} />, title: 'العمل الجماعي', desc: 'قوتنا في تكاتفنا وتعاوننا عبر مختلف التخصصات.' },
    { icon: <Heart size={24} />, title: 'المسؤولية', desc: 'إيمان عميق بدورنا تجاه المجتمع الجامعي والمحلي.' },
    { icon: <Shield size={24} />, title: 'التميّز', desc: 'نسعى لأعلى المعايير في كل ما نقدمه من نشاطات وفعاليات.' },
  ];

  return (
    <section id="about" className="py-28 md:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="container mx-auto px-4 sm:px-6">
        {/* Founding story */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <RevealOnScroll direction="right">
            <div className="relative">
              <div 
                className="absolute -top-6 -right-6 w-32 h-32 gold-gradient opacity-15 rounded-full blur-2xl"
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              />
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                className="rounded-3xl shadow-2xl border-[12px] border-warm relative z-10 w-full" 
                alt="تأسيس النادي" 
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-primary p-5 sm:p-8 rounded-2xl shadow-2xl text-white z-20 border-b-4 border-accent">
                <History size={28} className="mb-2 sm:mb-3 text-accent sm:[&]:w-9 sm:[&]:h-9" />
                <h3 className="text-2xl sm:text-3xl font-black">2013</h3>
                <p className="text-xs sm:text-sm opacity-80">سنة التأسيس</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={200}>
            <div>
              <div className="bg-primary/5 inline-block px-4 py-1 rounded-lg text-primary font-bold mb-4 text-sm">من نحن؟</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">حكاية إيمان بضرورة التغيير</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                تأسس نادي آفاق العلمي الثقافي سنة 2013 على يد مجموعة من الطلبة الجامعيين المؤمنين بضرورة إحداث التغيير داخل الوسط الجامعي، وذلك عبر خلق فضاء علمي وثقافي يجمع بين المعرفة والإبداع.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                يُعد نادي آفاق <strong className="text-primary">أقدم نادٍ علمي ثقافي نشط</strong> في جامعة زيان عاشور بالجلفة، حيث استطاع عبر أكثر من عقد من الزمن أن يصنع بصمة حقيقية في الحياة الجامعية.
              </p>
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2.5 rounded-full font-bold text-sm">
                <Shield size={16} />
                أقدم نادٍ نشط في الجامعة
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Core Values */}
        <RevealOnScroll>
          <div className="text-center mb-14">
            <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">قيمنا</div>
            <h3 className="text-3xl md:text-4xl font-black text-primary">القيم التي نؤمن بها</h3>
          </div>
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, idx) => (
            <RevealOnScroll key={idx} delay={idx * 120}>
              <div className="bg-warm p-7 rounded-2xl border-r-4 border-accent hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-4">
                  {v.icon}
                </div>
                <h4 className="font-black text-primary text-xl mb-2">{v.title}</h4>
                <p className="text-gray-500 text-[15px] leading-relaxed">{v.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-primary py-14 rounded-3xl relative overflow-hidden section-shadow">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 relative z-10">
            <StatCounter end={12} label="سنة من العطاء" suffix="+" />
            <StatCounter end={500} label="عضو نشط" suffix="+" />
            <StatCounter end={150} label="فعالية منظمة" suffix="+" />
            <StatCounter end={50} label="شريك أكاديمي" suffix="+" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
