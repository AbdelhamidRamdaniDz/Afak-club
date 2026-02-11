import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Users, Award, Calendar, Lightbulb, Globe, Target, Zap,
  Heart, UserPlus, ChevronDown, Sparkles, BookOpen, Handshake, Quote,
  CheckCircle, Mail, GraduationCap, Shield, Building
} from 'lucide-react';

// ─── Animation Helper ─────────────────────────────────────────────
const Reveal: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}> = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up: 'translate-y-12',
    left: '-translate-x-12',
    right: 'translate-x-12',
    scale: 'scale-90',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${transforms[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ─── FAQ Accordion Item ───────────────────────────────────────────
const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
  <div className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg bg-white' : 'bg-warm/50 hover:bg-white hover:shadow-md'}`}>
    <button onClick={onClick} className="w-full flex items-center justify-between p-6 text-right">
      <span className="font-bold text-lg text-primary">{q}</span>
      <ChevronDown size={20} className={`text-accent transition-transform duration-300 flex-shrink-0 mr-4 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
        {a}
      </div>
    </div>
  </div>
);

// ─── Testimonial Carousel ─────────────────────────────────────────
const TestimonialsCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const testimonials = [
    { name: 'أحمد بن عمر', role: 'عضو سابق - دفعة 2019', text: 'نادي آفاق غيّر مسار حياتي الجامعية بالكامل. تعلمت مهارات لا تُدرَّس في القاعات، وبنيت صداقات ستدوم العمر.' },
    { name: 'سارة مقداد', role: 'عضوة نشطة - دفعة 2022', text: 'بيئة محفزة ومليئة بالتحديات الإيجابية. كل فعالية هي فرصة تعلم جديدة، وكل عضو هو مصدر إلهام.' },
    { name: 'ياسين خالدي', role: 'مسؤول الإعلام - دفعة 2021', text: 'اكتشفت شغفي بالتصميم والتواصل من خلال عملي في النادي. المهارات التي اكتسبتها هنا فتحت لي آفاقاً مهنية لم أكن أتخيلها.' },
    { name: 'نور الهدى', role: 'عضوة - دفعة 2023', text: 'أنصح كل طالب جديد بالانضمام. الجو العائلي والاحترافية في التنظيم يجعلان من التجربة شيئاً لا يُنسى.' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx(prev => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-3xl">
        {testimonials.map((t, idx) => (
          <div key={idx} className={`transition-all duration-700 ${idx === activeIdx ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-8'}`} style={{ display: idx === activeIdx ? 'block' : 'none' }}>
            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl text-center relative">
              <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Quote size={24} className="text-primary" />
              </div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium italic">"{t.text}"</p>
              <h4 className="font-black text-primary text-lg">{t.name}</h4>
              <p className="text-gray-400 text-sm">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <button key={idx} onClick={() => setActiveIdx(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIdx ? 'w-8 bg-accent' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`} />
        ))}
      </div>
    </div>
  );
};

// ─── Main JoinClub Component ──────────────────────────────────────
const JoinClub: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [scrollY, setScrollY] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const benefits = [
    { icon: <Users size={28} />, title: 'شبكة علاقات قوية', desc: 'تعرّف على زملاء من مختلف التخصصات وابنِ صداقات مهنية تدوم.' },
    { icon: <Zap size={28} />, title: 'تطوير المهارات', desc: 'ورشات عمل متخصصة في القيادة، التواصل، البرمجة والتصميم.' },
    { icon: <Calendar size={28} />, title: 'فعاليات حصرية', desc: 'شارك في مؤتمرات، هاكاثونات ومسابقات على المستوى الوطني.' },
    { icon: <Handshake size={28} />, title: 'العمل الجماعي', desc: 'تجربة حقيقية في إدارة المشاريع والعمل ضمن فرق متعددة التخصصات.' },
  ];

  const activities = [
    { icon: <Lightbulb size={24} />, title: 'ندوات علمية', desc: 'إثراء المعرفة الأكاديمية' },
    { icon: <Award size={24} />, title: 'مسابقات ثقافية', desc: 'تنافس شريف وإبداع' },
    { icon: <Globe size={24} />, title: 'عمل تطوعي', desc: 'خدمة المجتمع والبيئة' },
    { icon: <BookOpen size={24} />, title: 'معارض كتب', desc: 'تشجيع المطالعة والثقافة' },
    { icon: <Target size={24} />, title: 'تدريب مهني', desc: 'مهارات سوق العمل' },
    { icon: <Sparkles size={24} />, title: 'أنشطة ترفيهية', desc: 'بناء الروح الجماعية' },
  ];

  const steps = [
    { num: '01', title: 'املأ الاستمارة', desc: 'قدّم معلوماتك الأساسية ودافعك للانضمام عبر الاستمارة أدناه.' },
    { num: '02', title: 'المقابلة الشخصية', desc: 'حوار قصير مع أعضاء المكتب للتعرف عليك وعلى اهتماماتك.' },
    { num: '03', title: 'مرحباً بك!', desc: 'تتلقى بطاقة العضوية وتبدأ المشاركة في الأنشطة والفعاليات فوراً.' },
  ];

  const faqs = [
    { q: 'هل العضوية مفتوحة لجميع الطلبة؟', a: 'نعم، العضوية مفتوحة لجميع طلبة جامعة زيان عاشور بالجلفة من مختلف الكليات والتخصصات والمستويات الدراسية.' },
    { q: 'هل هناك رسوم للانضمام؟', a: 'لا، العضوية مجانية تماماً. النادي يعمل بروح التطوع ولا يفرض أي رسوم على أعضائه.' },
    { q: 'ما مدة فترة التسجيل؟', a: 'التسجيل متاح عادةً في بداية كل سنة جامعية (سبتمبر - أكتوبر)، لكن يمكنك التقديم في أي وقت وسندرس طلبك.' },
    { q: 'كم ساعة في الأسبوع يتطلب النشاط؟', a: 'المشاركة مرنة حسب وقتك. عادةً ما نقوم بنشاط أو اجتماع واحد أسبوعياً (2-3 ساعات)، بالإضافة للفعاليات الخاصة.' },
    { q: 'هل يمكن للخريجين المشاركة؟', a: 'نرحب دائماً بالخريجين كمرشدين ومتطوعين في الفعاليات الكبرى، حتى لو لم تكن العضوية الرسمية متاحة لهم.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-warm">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm py-3">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <img src="/image/logo1.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-black text-lg text-primary">انضم إلينا</span>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group text-sm">
            <span className="group-hover:-translate-x-1 transition-transform">الرئيسية</span>
            <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* ═══ 1. Hero ═══ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0 parallax-bg" style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}>
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Students" />
        </div>
        <div className="absolute inset-0 burgundy-gradient opacity-[0.88] z-[1]" />
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full float-animation z-[2]" />
        <div className="absolute bottom-32 right-16 w-16 h-16 gold-gradient opacity-10 rounded-2xl float-slow z-[2] rotate-45" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-dark px-5 py-2 rounded-full text-accent mb-8 text-sm">
              <UserPlus size={16} />
              <span className="font-bold">باب الانضمام مفتوح</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] animate-fade-in-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            كن جزءاً من <br />
            <span className="text-accent">عائلة آفاق</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-400" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            اغتنم فرصتك للانضمام إلى أكثر من 500 طالب وطالبة يصنعون التغيير في الوسط الجامعي.
          </p>
          <div className="animate-fade-in-up delay-600" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <a href="#register" className="gold-gradient text-primary font-black py-4 px-14 rounded-full text-lg shadow-2xl hover:scale-105 transition-all active:scale-95 pulse-glow inline-flex items-center gap-3">
              <UserPlus size={20} />
              سجّل الآن
            </a>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <a href="#benefits" className="block animate-bounce"><ChevronDown size={32} className="text-accent/60" /></a>
        </div>
      </section>

      {/* ═══ 2. Why Join Us ═══ */}
      <section id="benefits" className="py-28 bg-white relative gradient-mesh">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">لماذا آفاق؟</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">ماذا ستكسب من الانضمام؟</h2>
              <div className="h-1 w-24 gold-gradient mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">نوفر بيئة فريدة تجمع بين التعلم والتطوير والترفيه لبناء شخصية الطالب الجامعي.</p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {benefits.map((b, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="perspective-container">
                  <div className="tilt-card glass-card p-8 rounded-3xl border-b-4 border-transparent hover:border-accent group text-center h-full">
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mx-auto mb-6 group-hover:rotate-6 group-hover:scale-110">{b.icon}</div>
                    <h3 className="text-xl font-black text-primary mb-3">{b.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-[15px]">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. Activities ═══ */}
      <section className="py-24 bg-warm/60 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">أنشطتنا</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">نشاطات متنوعة تناسب الجميع</h2>
              <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-400 group flex items-start gap-5 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">{act.icon}</div>
                  <div>
                    <h3 className="font-black text-primary text-lg mb-1">{act.title}</h3>
                    <p className="text-gray-400 text-sm">{act.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. How to Join ═══ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">كيف تنضم؟</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">3 خطوات بسيطة</h2>
              <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-l from-accent/30 via-accent to-accent/30 z-0" />
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 200}>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <span className="text-primary font-black text-2xl">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-black text-primary mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. Testimonials ═══ */}
      <section className="py-28 bg-warm/40 relative gradient-mesh">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">شهادات الأعضاء</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">ماذا يقول أعضاؤنا؟</h2>
              <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
            </Reveal>
          </div>
          <Reveal delay={200}><TestimonialsCarousel /></Reveal>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <Reveal>
              <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">أسئلة شائعة</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">إجابات لتساؤلاتك</h2>
              <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} q={faq.q} a={faq.a} isOpen={openFAQ === idx} onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 7. Registration Form ═══ */}
      <section id="register" className="py-28 bg-warm/30 relative gradient-mesh">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <Reveal>
              <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">التسجيل</div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">استمارة الانضمام</h2>
              <div className="h-1 w-24 gold-gradient mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-500 max-w-xl mx-auto">املأ البيانات التالية وسنتواصل معك في أقرب وقت.</p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              {formSubmitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-green-600" /></div>
                  <h3 className="text-2xl font-black text-primary mb-3">تم إرسال طلبك بنجاح!</h3>
                  <p className="text-gray-500">سنتواصل معك قريباً. شكراً لاهتمامك بنادي آفاق.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-primary font-bold text-sm mb-2 block">الاسم الكامل *</label>
                      <input type="text" required placeholder="مثال: أحمد بن عمر" className="w-full bg-warm/30 border border-gray-200 rounded-xl px-5 py-3.5 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-dark transition-all" />
                    </div>
                    <div>
                      <label className="text-primary font-bold text-sm mb-2 block">البريد الإلكتروني *</label>
                      <input type="email" required placeholder="example@gmail.com" className="w-full bg-warm/30 border border-gray-200 rounded-xl px-5 py-3.5 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-dark transition-all" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-primary font-bold text-sm mb-2 block">رقم الهاتف</label>
                      <input type="tel" placeholder="07XX XXX XXX" className="w-full bg-warm/30 border border-gray-200 rounded-xl px-5 py-3.5 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-dark transition-all" />
                    </div>
                    <div>
                      <label className="text-primary font-bold text-sm mb-2 block">الكلية / التخصص *</label>
                      <input type="text" required placeholder="مثال: كلية العلوم - إعلام آلي" className="w-full bg-warm/30 border border-gray-200 rounded-xl px-5 py-3.5 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-dark transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-primary font-bold text-sm mb-2 block">المستوى الدراسي *</label>
                    <select required className="w-full bg-warm/30 border border-gray-200 rounded-xl px-5 py-3.5 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-dark transition-all">
                      <option value="">اختر المستوى</option>
                      <option>السنة الأولى ليسانس</option>
                      <option>السنة الثانية ليسانس</option>
                      <option>السنة الثالثة ليسانس</option>
                      <option>السنة الأولى ماستر</option>
                      <option>السنة الثانية ماستر</option>
                      <option>دكتوراه</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-primary font-bold text-sm mb-2 block">لماذا تريد الانضمام؟ *</label>
                    <textarea required rows={4} placeholder="حدثنا عن دوافعك وتطلعاتك..." className="w-full bg-warm/30 border border-gray-200 rounded-xl px-5 py-3.5 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-dark transition-all resize-none" />
                  </div>
                  <button type="submit" className="gold-gradient text-primary font-black w-full py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    <UserPlus size={20} />
                    إرسال طلب الانضمام
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 8. Trust Section (NEW) ═══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-4xl mx-auto bg-warm rounded-3xl p-8 md:p-12 border border-accent/10">
              <div className="text-center mb-10">
                <div className="bg-primary/5 text-primary px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">ثقة واعتمادية</div>
                <h3 className="text-2xl md:text-3xl font-black text-primary">نادٍ موثوق ومعتمد رسمياً</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Building size={28} className="text-primary" />
                  </div>
                  <h4 className="font-black text-primary mb-2">جامعة زيان عاشور</h4>
                  <p className="text-gray-400 text-sm">نادي معتمد رسمياً من إدارة الجامعة بالجلفة</p>
                </div>
                <div className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield size={28} className="text-accent" />
                  </div>
                  <h4 className="font-black text-primary mb-2">منذ 2013</h4>
                  <p className="text-gray-400 text-sm">أكثر من عقد من النشاط المتواصل والتأثير الإيجابي</p>
                </div>
                <div className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail size={28} className="text-primary" />
                  </div>
                  <h4 className="font-black text-primary mb-2">تواصل معنا</h4>
                  <p className="text-accent font-bold text-sm">AfakClub17@gmail.com</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 9. Final CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 burgundy-gradient" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        <div className="absolute top-10 right-20 w-24 h-24 border border-accent/20 rounded-full float-animation" />
        <div className="absolute bottom-10 left-16 w-16 h-16 gold-gradient opacity-10 rounded-full float-slow" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              كن جزءًا من مجتمع <span className="text-accent">يصنع الفرق</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              لا تفوّت فرصة أن تكون جزءاً من قصة نجاح تكتبها مع مئات الطلبة الطموحين. انضم اليوم!
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a href="#register" className="gold-gradient text-primary font-black py-4 px-14 rounded-full text-lg shadow-2xl hover:scale-105 transition-all active:scale-95 inline-flex items-center gap-3">
                <UserPlus size={20} />
                سجّل الآن
              </a>
              <button onClick={onBack} className="border-2 border-white/20 hover:border-accent/50 text-white font-bold py-4 px-14 rounded-full text-lg transition-all hover:bg-white/5 backdrop-blur-sm">
                اكتشف المزيد عنا
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default JoinClub;
