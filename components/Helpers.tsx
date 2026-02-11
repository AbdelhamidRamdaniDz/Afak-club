import React, { useState, useEffect, useRef } from 'react';

// ─── Scroll Reveal ───────────────────────────────────────────
export const RevealOnScroll: React.FC<{ 
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

// ─── Parallax Hook ───────────────────────────────────────────
export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
};

// ─── Floating Particles ──────────────────────────────────────
export const FloatingParticles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full morph opacity-10"
        style={{
          width: `${60 + i * 40}px`,
          height: `${60 + i * 40}px`,
          top: `${10 + i * 15}%`,
          left: `${5 + i * 16}%`,
          background: i % 2 === 0 
            ? 'linear-gradient(135deg, #d4af37, #f1d592)' 
            : 'linear-gradient(135deg, #581717, #8f111d)',
          animationDelay: `${i * 1.2}s`,
          animationDuration: `${6 + i * 2}s`,
        }}
      />
    ))}
  </div>
);

// ─── Stat Counter ────────────────────────────────────────────
export const StatCounter: React.FC<{ end: number; label: string; suffix?: string }> = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let current = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(current);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, started]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-accent mb-2">{count}{suffix}</div>
      <div className="text-white/70 font-medium text-sm">{label}</div>
    </div>
  );
};
