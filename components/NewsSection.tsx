import React, { useState } from 'react';
import { Calendar, ArrowRight, X, Heart, Share2, MessageCircle } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const NewsDetailModal: React.FC<{ news: any; onClose: () => void }> = ({ news, onClose }) => {
  if (!news) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 animate-scale-in section-shadow">
        <button className="absolute top-5 left-5 z-20 bg-primary/90 text-white p-2.5 rounded-full hover:bg-accent transition-colors" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-t-3xl">
          <img src={news.img} alt={news.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="gold-gradient px-4 py-1 rounded-full text-primary font-bold text-sm">{news.tag}</span>
            <span className="text-gray-400 flex items-center gap-2 text-sm"><Calendar size={16} /> {news.date}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-8 leading-tight">{news.title}</h2>
          <div className="text-gray-600 leading-relaxed space-y-5 text-lg">
            <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.</p>
            <p>يعد نادي آفاق من النشاطات الطلابية الرائدة التي تسعى دوماً لتقديم كل ما هو جديد ومفيد في الوسط الجامعي.</p>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
            <button onClick={onClose} className="bg-warm text-primary font-bold px-6 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsSection: React.FC<{ onArchiveClick: () => void }> = ({ onArchiveClick }) => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const newsItems = [
    { date: '15 ماي 2024', title: 'انطلاق المسابقة الوطنية للذكاء الاصطناعي برعاية النادي', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', tag: 'علمي' },
    { date: '20 ماي 2024', title: 'ندوة فكرية حول دور الطالب في التنمية المستدامة', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', tag: 'ثقافي' },
    { date: '25 ماي 2024', title: 'ورشة عمل مكثفة حول مهارات القيادة والذكاء العاطفي', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', tag: 'تطويري' }
  ];

  return (
    <section id="news" className="py-28 md:py-36 bg-warm/40 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <RevealOnScroll>
            <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">آخر المستجدات</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary">أخبار النادي وفعالياته</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <button 
              onClick={onArchiveClick}
              className="text-primary font-bold flex items-center gap-2 border-b-2 border-accent hover:text-accent transition-colors group/archive"
            >
              عرض الأرشيف الكامل 
              <ArrowRight className="rotate-180 group-hover/archive:-translate-x-1 transition-transform" size={18} />
            </button>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 150}>
              <div 
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full text-primary font-bold text-xs">
                    {item.tag}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white font-bold flex items-center gap-2 text-sm">
                      اقرأ المزيد <ArrowRight className="rotate-180" size={14} />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-400 font-medium mb-3 flex items-center gap-2 text-sm">
                    <Calendar size={14} /> {item.date}
                  </div>
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
};

export default NewsSection;
