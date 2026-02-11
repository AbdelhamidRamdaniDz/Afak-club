import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

// ─── Knowledge Base ──────────────────────────────────────────
interface KBEntry {
  keywords: string[];
  answer: string;
}

const knowledgeBase: KBEntry[] = [
  {
    keywords: ['ما هو', 'ما هي', 'تعريف', 'عن النادي', 'النادي', 'آفاق', 'afak'],
    answer: 'نادي آفاق العلمي الثقافي هو أقدم نادٍ علمي ثقافي نشط في جامعة زيان عاشور بالجلفة. تأسس سنة 2013 ويهدف إلى توفير فضاء علمي وثقافي للطلبة الجامعيين يجمع بين المعرفة والإبداع والتطوير الشخصي.'
  },
  {
    keywords: ['تأسيس', 'متى', 'سنة', 'تاريخ', 'أسس', 'founded', 'عمر'],
    answer: 'تأسس نادي آفاق العلمي الثقافي سنة 2013، مما يجعله أقدم نادٍ علمي ثقافي نشط في جامعة زيان عاشور بالجلفة. مر عليه أكثر من عقد من العطاء والتميز! 🎉'
  },
  {
    keywords: ['انضم', 'انضمام', 'عضوية', 'تسجيل', 'اشتراك', 'كيف أنضم', 'join', 'اشترك'],
    answer: 'يمكنك الانضمام إلى نادي آفاق بكل سهولة! 🚀\n\n1️⃣ قم بزيارة صفحة "انضم إلينا" على موقعنا\n2️⃣ أكمل نموذج التسجيل بمعلوماتك\n3️⃣ سيتواصل معك فريقنا للمقابلة\n\nنرحب بجميع طلبة جامعة الجلفة من كل التخصصات!'
  },
  {
    keywords: ['نشاط', 'أنشطة', 'فعالية', 'فعاليات', 'ماذا تقدم', 'برامج', 'activities'],
    answer: 'ينظم نادي آفاق مجموعة متنوعة من الأنشطة تشمل:\n\n📚 فعاليات علمية — ندوات ومؤتمرات أكاديمية\n🎭 فعاليات ثقافية — أمسيات أدبية ومعارض فنية\n💻 ورشات عمل — تطوير المهارات التقنية والشخصية\n🏆 مسابقات — في الأدب والفن والبرمجة والمعرفة\n🤝 عمل تطوعي — مبادرات اجتماعية وبيئية'
  },
  {
    keywords: ['أين', 'موقع', 'مكان', 'عنوان', 'جامعة', 'الجلفة', 'location', 'where'],
    answer: 'يقع نادي آفاق في جامعة زيان عاشور بولاية الجلفة، الجزائر 📍\n\nالنادي معتمد رسمياً من الجامعة ويعمل ضمن هياكلها.'
  },
  {
    keywords: ['تواصل', 'اتصال', 'ايميل', 'بريد', 'contact', 'email', 'رقم'],
    answer: 'يمكنك التواصل معنا عبر:\n\n📧 البريد الإلكتروني: AfakClub17@gmail.com\n📱 صفحاتنا على مواقع التواصل الاجتماعي (فيسبوك وإنستغرام)\n\nنحن دائماً سعداء بالرد على استفساراتك! 😊'
  },
  {
    keywords: ['فوائد', 'مميزات', 'لماذا', 'فائدة', 'benefit', 'مزايا', 'أسباب'],
    answer: 'الانضمام إلى نادي آفاق يمنحك:\n\n⚡ تطوير مهاراتك — ورشات في القيادة والبرمجة والتصميم\n👥 شبكة علاقات — زملاء من مختلف التخصصات\n🏅 فرص قيادية — تولّي مسؤوليات حقيقية في التنظيم\n✨ بيئة محفّزة — أجواء مليئة بالحماس والإبداع\n📜 شهادات — اعتراف رسمي بمشاركتك ومساهماتك'
  },
  {
    keywords: ['رؤية', 'vision', 'هدف'],
    answer: 'رؤيتنا هي بناء جيل جامعي واعٍ ومثقف، يمتلك آفاقاً واسعة للمعرفة والإبداع، وقادر على إحداث التغيير الإيجابي في المجتمع. نؤمن بأن المعرفة هي مفتاح التقدم! 🌟'
  },
  {
    keywords: ['رسالة', 'mission', 'مهمة'],
    answer: 'رسالتنا هي توفير فضاء علمي وثقافي محفّز يواكب تطلعات الطلبة الجامعيين، ويغرس فيهم قيم المسؤولية والإبداع والانفتاح على مجالات المعرفة المتعددة. 🎯'
  },
  {
    keywords: ['قيم', 'مبادئ', 'values'],
    answer: 'قيمنا الأساسية في نادي آفاق:\n\n📖 المعرفة — أساس كل تقدم\n💡 الإبداع — نحتضن الأفكار الجديدة\n👑 القيادة — نبني قادة المستقبل\n🤝 التعاون — قوتنا في تكاتفنا\n⭐ التميّز — نسعى لأعلى المعايير'
  },
  {
    keywords: ['شكرا', 'شكر', 'مع السلامة', 'وداع', 'bye', 'thanks'],
    answer: 'عفواً! سعيد بمساعدتك 😊\nإذا كانت لديك أي أسئلة أخرى، لا تتردد في طرحها.\n\nنتمنى رؤيتك قريباً في نادي آفاق! 🌟'
  },
  {
    keywords: ['مرحبا', 'سلام', 'أهلا', 'hello', 'hi', 'هاي'],
    answer: 'أهلاً وسهلاً بك! 👋\n\nأنا المساعد الذكي لنادي آفاق العلمي الثقافي. يمكنني مساعدتك في:\n\n• معرفة المزيد عن النادي\n• كيفية الانضمام\n• أنشطتنا وفعالياتنا\n• معلومات التواصل\n\nكيف يمكنني مساعدتك اليوم؟'
  },
];

const defaultAnswer = 'شكراً لسؤالك! 🤔\n\nللأسف لم أستطع فهم سؤالك بشكل دقيق. يمكنك سؤالي عن:\n\n• ما هو نادي آفاق؟\n• كيف يمكنني الانضمام؟\n• ما هي الأنشطة المتاحة؟\n• أين يقع النادي؟\n• كيف أتواصل معكم؟\n\nأو يمكنك التواصل مباشرة عبر: AfakClub17@gmail.com 📧';

function findAnswer(query: string): string {
  const normalizedQuery = query.toLowerCase().trim();
  
  let bestMatch: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.answer : defaultAnswer;
}

// ─── Typing Animation Component ─────────────────────────────
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map(i => (
      <div
        key={i}
        className="w-2 h-2 bg-accent rounded-full"
        style={{
          animation: 'typing-dot 1.4s infinite',
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

// ─── Message Component ───────────────────────────────────────
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isBot = message.sender === 'bot';
  return (
    <div className={`flex gap-2.5 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-primary text-accent' : 'gold-gradient text-primary'
      }`}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
        isBot 
          ? 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tr-sm' 
          : 'bg-primary text-white rounded-tl-sm'
      }`}>
        {message.text}
      </div>
    </div>
  );
};

// ─── Main Chatbot Component ─────────────────────────────────
const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: 'أهلاً بك في نادي آفاق! 👋\nأنا المساعد الذكي، كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const answer = findAnswer(trimmed);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: answer,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'ما هو نادي آفاق؟',
    'كيف أنضم؟',
    'ما هي الأنشطة؟',
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-[90] w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen 
            ? 'bg-primary text-white rotate-0' 
            : 'gold-gradient text-primary pulse-glow'
        }`}
        aria-label="فتح المحادثة"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-28 left-4 sm:left-6 z-[90] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] sm:max-h-[520px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-accent/20 animate-chat-in"
          style={{ background: 'rgba(248, 245, 240, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          {/* Header */}
          <div className="burgundy-gradient px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-black text-sm">مساعد آفاق الذكي</h4>
              <p className="text-white/50 text-xs">متواجد دائماً للمساعدة</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/60 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0" style={{ maxHeight: 'calc(70vh - 180px)' }}>
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && (
              <div className="flex gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-accent flex items-center justify-center flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white rounded-2xl rounded-tr-sm shadow-sm border border-gray-100">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions (show only when few messages) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => {
                      setInput('');
                      const userMsg: Message = { id: Date.now(), text: q, sender: 'user', timestamp: new Date() };
                      setMessages(prev => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const answer = findAnswer(q);
                        setMessages(prev => [...prev, { id: Date.now() + 1, text: answer, sender: 'bot', timestamp: new Date() }]);
                        setIsTyping(false);
                      }, 600 + Math.random() * 800);
                    }, 50);
                  }}
                  className="bg-accent/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200/50 flex-shrink-0 bg-white/60">
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 px-4 py-2 shadow-sm focus-within:border-accent/40 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 min-h-[36px]"
                dir="rtl"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  input.trim() 
                    ? 'gold-gradient text-primary hover:scale-105 active:scale-95 shadow-md' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="إرسال"
              >
                <Send size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
