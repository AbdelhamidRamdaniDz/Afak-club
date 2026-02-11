import React, { useState, useEffect } from 'react';
import { Menu, X, UserPlus } from 'lucide-react';

const Navbar: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'من نحن', href: '#about' },
    { name: 'لماذا آفاق', href: '#why-afak' },
    { name: 'نشاطاتنا', href: '#activities' },
    { name: 'الأخبار', href: '#news' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(88,23,23,0.08)] py-2' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <img src="/image/logo1.png" alt="Afak Logo" className="h-11 md:h-14 w-auto drop-shadow-md group-hover:scale-105 transition-transform" />
          <div className="hidden lg:block">
            <h1 className={`font-black text-lg leading-none transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>آفــــــــاق</h1>
            <p className={`text-[10px] transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/60'}`}>النادي العلمي الثقافي</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-7 font-bold text-[15px]">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`relative hover:text-accent transition-colors group/link ${isScrolled ? 'text-dark' : 'text-white'}`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover/link:scale-x-100 transition-transform origin-right" />
            </a>
          ))}
          <button 
            onClick={() => onNavigate('join')}
            className="gold-gradient text-primary px-7 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 font-black text-sm flex items-center gap-2"
          >
            <UserPlus size={16} />
            انضم إلينا
          </button>
        </div>

        <button className="lg:hidden relative z-[120]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="text-primary" size={28} /> : <Menu className={`${isScrolled ? 'text-primary' : 'text-white'}`} size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 w-screen h-screen bg-white/98 backdrop-blur-xl z-[110] transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-6 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}>
          <X size={36} className="text-primary" />
        </button>
        <img src="/image/logo1.png" alt="Logo" className="h-20 mb-4 opacity-20" />
        {navItems.map((item, idx) => (
          <a 
            key={item.name} 
            href={item.href} 
            onClick={() => setIsMenuOpen(false)} 
            className="text-2xl font-black text-primary hover:text-accent transition-colors"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {item.name}
          </a>
        ))}
        <button 
          onClick={() => { setIsMenuOpen(false); onNavigate('join'); }}
          className="gold-gradient text-primary px-10 py-3 rounded-full font-black text-lg mt-4 shadow-xl"
        >
          انضم إلينا
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
