import React from 'react';
import { UserPlus, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const CTASection: React.FC<{ onJoin: () => void }> = ({ onJoin }) => (
  <section className="relative py-28 overflow-hidden">
    <div className="absolute inset-0 burgundy-gradient" />
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

    {/* Decorative */}
    <div className="absolute top-10 right-20 w-24 h-24 border border-accent/20 rounded-full float-animation" />
    <div className="absolute bottom-10 left-16 w-16 h-16 gold-gradient opacity-10 rounded-full float-slow" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/5 rounded-full spin-slow" />

    <div className="container mx-auto px-6 relative z-10 text-center">
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            المعرفة تبدأ <span className="text-accent">بخطوة</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            لا تفوّت فرصة أن تكون جزءاً من مجتمع يصنع الفرق. انضم إلى أكثر من 500 طالب وطالبة يكتبون قصة نجاح مشتركة.
          </p>
          <button 
            onClick={onJoin}
            className="gold-gradient text-primary font-black py-5 px-16 rounded-full text-xl shadow-2xl hover:scale-110 transition-all active:scale-95 pulse-glow inline-flex items-center gap-3"
          >
            <UserPlus size={24} />
            انضم الآن
          </button>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

export default CTASection;
