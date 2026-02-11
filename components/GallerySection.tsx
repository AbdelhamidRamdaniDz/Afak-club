import React, { useState } from 'react';
import { X } from 'lucide-react';
import { RevealOnScroll } from './Helpers';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'فعالية علمية', h: 'h-72' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'ندوة', h: 'h-56' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'نشاط جماعي', h: 'h-64' },
  { src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'ورشة عمل', h: 'h-80' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'حلقة نقاش', h: 'h-60' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'تدريب', h: 'h-72' },
];

const GallerySection: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section className="py-28 md:py-36 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <RevealOnScroll>
            <div className="bg-accent/10 text-accent px-4 py-1 rounded-lg font-bold mb-4 inline-block text-sm">لحظاتنا</div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-5">معرض الصور</h2>
            <div className="h-1 w-24 gold-gradient mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              لقطات من أبرز فعاليات وأنشطة النادي على مدار السنوات.
            </p>
          </RevealOnScroll>
        </div>

        <div className="masonry-grid">
          {galleryImages.map((img, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div 
                className={`${img.h} rounded-2xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-2xl transition-all duration-500`}
                onClick={() => setLightboxImg(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">{img.alt}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button 
            className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10"
            onClick={() => setLightboxImg(null)}
          >
            <X size={24} />
          </button>
          <img src={lightboxImg} alt="صورة مكبرة" className="animate-lightbox-in" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
