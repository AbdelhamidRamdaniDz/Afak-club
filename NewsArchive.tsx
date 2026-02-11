import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Heart, 
  Share2, 
  MessageCircle, 
  Search,
  Filter,
  X,
  ChevronRight
} from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  likes: number;
  comments: number;
  description: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'انطلاق المسابقة الوطنية للذكاء الاصطناعي برعاية النادي',
    date: '15 ماي 2024',
    category: 'علمي',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 124,
    comments: 45,
    description: 'شهدت الجامعة انطلاق فعاليات المسابقة الوطنية الأولى من نوعها في مجال الذكاء الاصطناعي...'
  },
  {
    id: 2,
    title: 'ندوة فكرية حول دور الطالب في التنمية المستدامة',
    date: '20 ماي 2024',
    category: 'ثقافي',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 89,
    comments: 23,
    description: 'نظم النادي ندوة حوارية استضاف فيها نخبة من الأساتذة لمناقشة دور الطالب الجامعي...'
  },
  {
    id: 3,
    title: 'ورشة عمل مكثفة حول مهارات القيادة',
    date: '25 ماي 2024',
    category: 'تطويري',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 156,
    comments: 67,
    description: 'ورشة تفاعلية تهدف لصقل المهارات القيادية لدى أعضاء النادي والطلبة المشاركين...'
  },
  {
    id: 4,
    title: 'حملة تشجير واسعة في الحرم الجامعي',
    date: '02 جوان 2024',
    category: 'تطوعي',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 210,
    comments: 88,
    description: 'مبادرة بيئية ضخمة شارك فيها مئات الطلبة لتزيين المحيط الجامعي...'
  },
  {
    id: 5,
    title: 'معرض الكتاب الجامعي السنوي',
    date: '10 جوان 2024',
    category: 'ثقافي',
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 145,
    comments: 34,
    description: 'أجنحة متنوعة وعناوين حصرية في الطبعة الخامسة من معرض الكتاب...'
  },
  {
    id: 6,
    title: 'هاكاثون البرمجة والابتكار',
    date: '18 جوان 2024',
    category: 'تكنولوجي',
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 198,
    comments: 56,
    description: '48 ساعة من البرمجة المتواصلة للخروج بحلول تقنية مبتكرة لمشاكل واقعية...'
  }
];

const NewsArchive: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [scrollY, setScrollY] = useState(0);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const categories = ['الكل', 'علمي', 'ثقافي', 'تطويري', 'تطوعي', 'تكنولوجي'];
  
  const filteredNews = newsData.filter(item => {
    const matchesSearch = item.title.includes(searchTerm) || item.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-right dir-rtl" ref={containerRef}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <img src="/image/logo1.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-primary">أرشيف الأخبار</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">رجوع للرئيسية</span>
            <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1503428593586-e225b476d0cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="News Archive Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 mt-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in-up">سجل إنجازاتنا</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light animate-fade-in-up delay-100">
            توثيق لمسيرة النادي الحافلة بالنشاطات والفعاليات التي صنعت الفارق.
          </p>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="container mx-auto px-6 -mt-10 relative z-20 mb-16">
        <div className="bg-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto min-w-[300px]">
            <input
              type="text"
              placeholder="ابحث في الأخبار..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <div 
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-md">
                  {item.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                   <button className="text-white text-sm font-bold flex items-center gap-2 hover:text-accent">
                     قراءة التفاصيل <ChevronRight size={16} className="rotate-180" />
                   </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                        likedPosts.includes(item.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart 
                        size={18} 
                        className={`transition-transform ${likedPosts.includes(item.id) ? 'fill-current scale-110' : ''}`} 
                      />
                      <span>{item.likes + (likedPosts.includes(item.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle size={18} />
                      <span>{item.comments}</span>
                    </button>
                  </div>
                  
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">لا توجد أخبار مطابقة لبحثك.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('الكل');}}
              className="mt-4 text-accent font-bold hover:underline"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsArchive;
