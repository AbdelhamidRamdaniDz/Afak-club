import React from 'react';
import { ChevronDown, Sparkles, UserPlus, ArrowRight } from 'lucide-react';
import { useParallax, FloatingParticles } from './Helpers';

const Hero: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const scrollY = useParallax();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 parallax-bg"
        style={{ transform: `translateY(${scrollY * 0.35}px) scale(1.1)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1523050335392-9befafa56038?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover" 
          alt="Background" 
        />
      </div>
      <div className="absolute inset-0 burgundy-gradient opacity-90 z-[1]"></div>
      
      <FloatingParticles />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-accent/10 rounded-full spin-slow z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-accent/5 rounded-full spin-slow z-[1]" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-dark px-6 py-2.5 rounded-full text-accent mb-8">
            <Sparkles size={16} />
            <span className="font-bold text-sm">منذ 2013: عقد من الإلهام الطلابي</span>
          </div>
        </div>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl animate-fade-in-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          نصنع المعرفة... <br />
          <span className="text-accent italic">ونرسم المستقبل</span>
        </h2>
        
        <p className="text-lg md:text-2xl text-white/75 max-w-3xl mx-auto mb-14 font-light leading-relaxed animate-fade-in-up delay-400" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          النادي العلمي الثقافي "آفاق" بجامعة الجلفة: فضاء للإبداع، منبر للتميز، وحاضنة للمواهب الطلابية الشغوفة.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up delay-600" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <button 
            onClick={onJoin}
            className="gold-gradient text-primary font-black py-4 px-12 rounded-full text-lg shadow-2xl hover:scale-105 transition-all active:scale-95 pulse-glow flex items-center justify-center gap-3"
          >
            <UserPlus size={20} />
            انضم للنادي
          </button>
          <a href="#activities" className="border-2 border-white/20 hover:border-accent/50 hover:bg-white/5 text-white font-bold py-4 px-12 rounded-full text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
            اكتشف أنشطتنا <ArrowRight className="rotate-180" size={20} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" className="block animate-bounce">
          <ChevronDown size={36} className="text-accent/70" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
