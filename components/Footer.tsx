import React from 'react';
import { Facebook, Instagram, Globe, Mail, MapPin } from 'lucide-react';

const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <footer className="bg-dark text-white/60 pt-20 pb-10 border-t border-accent/10">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/image/logo.png" alt="Logo" className="h-16 opacity-80" />
            <div>
              <h4 className="text-2xl font-black text-accent leading-none">آفــــــــاق</h4>
              <p className="text-xs text-white/40">النادي العلمي الثقافي</p>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed text-center md:text-right max-w-xs">
            بناء جيل واعٍ، مثقف، وقادر على التغيير الإيجابي في المجتمع.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-right">
          <h5 className="font-black text-white mb-5 text-lg">روابط سريعة</h5>
          <div className="flex flex-col gap-3 text-sm">
            <a href="#home" className="hover:text-accent transition-colors">الرئيسية</a>
            <a href="#about" className="hover:text-accent transition-colors">من نحن</a>
            <a href="#activities" className="hover:text-accent transition-colors">نشاطاتنا</a>
            <button onClick={() => onNavigate('join')} className="hover:text-accent transition-colors text-right">انضم إلينا</button>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <h5 className="font-black text-white mb-5 text-lg">تواصل معنا</h5>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail size={14} className="text-accent" />
              <span>AfakClub17@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin size={14} className="text-accent" />
              <span>جامعة زيان عاشور، الجلفة</span>
            </div>
          </div>
        </div>

        {/* Social + Trust */}
        <div className="text-center md:text-right">
          <h5 className="font-black text-white mb-5 text-lg">تابعنا</h5>
          <div className="flex gap-4 justify-center md:justify-start mb-6">
            <div className="w-10 h-10 bg-white/5 hover:bg-accent/20 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110">
              <Facebook size={18} className="text-white/70 hover:text-accent" />
            </div>
            <div className="w-10 h-10 bg-white/5 hover:bg-accent/20 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110">
              <Instagram size={18} className="text-white/70 hover:text-accent" />
            </div>
            <div className="w-10 h-10 bg-white/5 hover:bg-accent/20 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110">
              <Globe size={18} className="text-white/70 hover:text-accent" />
            </div>
          </div>
          <div className="text-xs text-white/30 space-y-1">
            <p>نادي معتمد رسمياً من جامعة زيان عاشور</p>
            <p>تأسس سنة 2013</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة لنادي آفاق</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white transition-colors">القانون الأساسي</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
