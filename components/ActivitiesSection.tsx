import React from 'react';
import { Lightbulb, Users, Award, Globe, BookOpen } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const ActivitiesSection: React.FC = () => {
  const acts = [
    { title: 'فعاليات علمية', desc: 'ندوات ومؤتمرات تغطي أحدث الابتكارات والبحوث الأكاديمية في كافة المجالات.', icon: <Lightbulb size={28} />, color: 'from-amber-500/10 to-amber-500/5' },
    { title: 'فعاليات ثقافية', desc: 'أمسيات أدبية، معارض فنية، ومسابقات ثقافية تعزز الذوق والمعرفة العامة.', icon: <BookOpen size={28} />, color: 'from-blue-500/10 to-blue-500/5' },
    { title: 'ورشات عمل', desc: 'تطوير المهارات العملية والتقنية لتمكين الطلبة مهنياً وشخصياً.', icon: <Users size={28} />, color: 'from-primary/10 to-primary/5' },
    { title: 'مسابقات', icon: <Award size={28} />, desc: 'إطلاق روح المنافسة الشريفة في الأدب، الفن، المعرفة والبرمجة.', color: 'from-accent/10 to-accent/5' },
    { title: 'عمل تطوعي', icon: <Globe size={28} />, desc: 'مبادرات اجتماعية وبيئية تعزز روح المسؤولية وخدمة المجتمع.', color: 'from-emerald-500/10 to-emerald-500/5' },
  ];

  return (
    <section id="activities" className="py-28 md:py-36 bg-warm/40 relative overflow-hidden gradient-mesh">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <RevealOnScroll>
            <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">ما نقدمه</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">نشاطاتنا الرئيسية</h2>
            <div className="h-1 w-24 gold-gradient mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              نسعى لتسطير برامج وأنشطة متنوعة تعود بالنفع على الطلبة أكاديمياً وثقافياً وشخصياً.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {acts.map((act, idx) => (
            <RevealOnScroll key={idx} delay={idx * 120}>
              <div className={`glass-card p-9 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-b-4 border-transparent hover:border-accent group bg-gradient-to-br ${act.color}`}>
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-400 mb-7 group-hover:rotate-6 group-hover:scale-110">
                  {act.icon}
                </div>
                <h3 className="text-xl font-black text-primary mb-3">{act.title}</h3>
                <p className="text-gray-500 leading-relaxed">{act.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
