import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const UpcomingEvent: React.FC = () => {
  const eventDate = new Date('2026-03-15T09:00:00');

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'يوم', value: timeLeft.days },
    { label: 'ساعة', value: timeLeft.hours },
    { label: 'دقيقة', value: timeLeft.minutes },
    { label: 'ثانية', value: timeLeft.seconds },
  ];

  return (
    <section className="py-28 md:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">قريباً</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">الفعالية القادمة</h2>
            <div className="h-1 w-24 gold-gradient mx-auto rounded-full" />
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={200}>
          <div className="max-w-4xl mx-auto bg-warm rounded-[2rem] overflow-hidden shadow-xl border border-accent/10">
            <div className="grid md:grid-cols-2">
              {/* Event Image */}
              <div className="relative h-72 md:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-cover" 
                  alt="الفعالية القادمة" 
                />
                <div className="absolute inset-0 burgundy-gradient opacity-60" />
                <div className="absolute bottom-6 right-6 left-6 z-10">
                  <span className="gold-gradient px-4 py-1 rounded-full text-primary font-bold text-sm">علمي</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-black text-primary mb-4 leading-tight">
                  الملتقى الوطني للابتكار الطلابي
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  يومان من العروض، الورشات والمسابقات مع نخبة من الخبراء الأكاديميين والمهنيين.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} className="text-accent" />
                    <span className="font-medium">15 مارس 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={18} className="text-accent" />
                    <span className="font-medium">09:00 صباحاً</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={18} className="text-accent" />
                    <span className="font-medium">قاعة المحاضرات الكبرى، جامعة الجلفة</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-3">
                  {units.map((u, idx) => (
                    <div key={idx} className="bg-primary rounded-2xl p-3 text-center">
                      <div className="text-2xl md:text-3xl font-black text-accent leading-none mb-1">
                        {String(u.value).padStart(2, '0')}
                      </div>
                      <div className="text-white/60 text-xs font-medium">{u.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default UpcomingEvent;
