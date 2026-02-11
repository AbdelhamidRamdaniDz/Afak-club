import React from 'react';
import { Eye, Target } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const VisionMission: React.FC = () => (
  <section className="py-28 md:py-36 bg-warm/40 relative gradient-mesh">
    <div className="container mx-auto px-6">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">رؤيتنا ورسالتنا</div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">نحو أفق أوسع</h2>
          <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <RevealOnScroll direction="right" delay={100}>
          <div className="bg-white rounded-3xl p-10 md:p-12 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-7">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-5">رؤيتنا</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              بناء جيل جامعي واعٍ ومثقف، يمتلك آفاقاً واسعة للمعرفة والإبداع، وقادر على إحداث التغيير الإيجابي في المجتمع. نسعى ليكون النادي منارة علمية وثقافية رائدة على مستوى الجامعات الجزائرية.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="left" delay={250}>
          <div className="bg-primary rounded-3xl p-10 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-7">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-5">رسالتنا</h3>
            <p className="text-white/75 leading-relaxed text-lg">
              نسعى لتكوين فضاء علمي وثقافي محفّز يواكب تطلعات الطلبة الجامعيين، ويغرس فيهم قيم المسؤولية والإبداع والانفتاح على مجالات المعرفة المتعددة، عبر برامج وأنشطة نوعية تطور مهاراتهم وتصقل شخصياتهم.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

export default VisionMission;
