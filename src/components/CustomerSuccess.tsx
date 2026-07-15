import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import elenaRostovaImg from '../assets/elena_rostova.webp';
import johnDoeImg from '../assets/john_doe.webp';
import davidVanceImg from '../assets/david_vance.webp';
import zarahWuImg from '../assets/zarah_wu.webp';

interface CustomTestimonial {
  id: string;
  name: string;
  logo: React.ReactNode;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: React.ReactNode;
  metrics: { label: string; value: string }[];
}

const TESTIMONIALS: CustomTestimonial[] = [
  {
    id: 'capsule',
    name: 'Capsule',
    logo: (
      <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="12" r="6" fill="currentColor" fillOpacity="0.4" />
        <circle cx="15" cy="12" r="6" fill="currentColor" fillOpacity="0.8" />
      </svg>
    ),
    quote: "Wozku completely replaced our reliance on paid social advertising during key product launches. We unlocked the personal networks of our entire base in minutes, reaching 2M+ prospects with organic trust.",
    author: "Elena Rostova",
    title: "VP of Global Communications",
    company: "Capsule",
    avatar: <img src={elenaRostovaImg} alt="Elena Rostova" className="w-full h-full object-cover object-center" />,
    metrics: [
      { label: 'Increase in support capacity', value: '65%' },
      { label: 'Improvement in response time', value: '42%' }
    ]
  },
  {
    id: 'spherule',
    name: 'Spherule',
    logo: (
      <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="3" ry="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    quote: "Wozku has revolutionized our operations. The platform exceeds expectations, enhancing efficiency and satisfaction. A true game-changer, highly recommended for businesses.",
    author: "John Doe",
    title: "Managing Director",
    company: "Spherule",
    avatar: <img src={johnDoeImg} alt="John Doe" className="w-full h-full object-cover object-center" />,
    metrics: [
      { label: 'Increase in customer satisfaction', value: '87%' },
      { label: 'Increase in operational efficiency', value: '38%' }
    ]
  },
  {
    id: 'galileo',
    name: 'Galileo',
    logo: (
      <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3a9 9 0 000 18V3z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    quote: "Our engineering team is passive on social channels, but Wozku's Slack integration and points leaderboards made advocate sharing natural and engaging. We hired three principal developers in our first month.",
    author: "David Vance",
    title: "Director of Talent Acquisition",
    company: "Galileo",
    avatar: <img src={davidVanceImg} alt="David Vance" className="w-full h-full object-cover object-center" />,
    metrics: [
      { label: 'Recruitment cost-per-click reduction', value: '62%' },
      { label: 'Increase in passive referrals', value: '49%' }
    ]
  },
  {
    id: 'segment',
    name: 'Segment',
    logo: (
      <svg className="w-4 h-4 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M22 12a10 10 0 01-10 10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M12 22a10 10 0 01-10-10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>
    ),
    quote: "We use Wozku to reward our power customers. In return, they drove our Product Hunt launch to #1, generating thousands of qualified organic sign-ups in 24 hours. The outcome ROI was undeniable.",
    author: "Zarah Wu",
    title: "Head of Developer Relations",
    company: "Segment",
    avatar: <img src={zarahWuImg} alt="Zarah Wu" className="w-full h-full object-cover object-center" />,
    metrics: [
      { label: 'Product Hunt launch rank', value: '#1' },
      { label: 'Community growth rate', value: '+45%' }
    ]
  }
];

export default function CustomerSuccess() {
  const [activeIdx, setActiveIdx] = useState(1);
  const activeTestimonial = TESTIMONIALS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      <div className="flex flex-wrap justify-center gap-3">
        {TESTIMONIALS.map((tab, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveIdx(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-250 cursor-pointer border border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? 'bg-[#202927] text-white shadow-xs dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/40'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200/85 hover:text-neutral-700'
              }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                {tab.logo}
              </span>
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full bg-neutral-100 border border-neutral-200/40 rounded-[2.5rem] p-5 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden min-h-[360px] flex items-center z-10">
            
            <div className="absolute inset-0 opacity-60 pointer-events-none select-none overflow-hidden z-0">
              <div className="grid grid-cols-3 gap-3.5 -rotate-12 scale-125 origin-center translate-x-[-10px] translate-y-[-10px]">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-16 h-16 sm:w-20 sm:h-20 border border-neutral-200/40 rounded-2xl bg-neutral-50/20 shadow-2xs" 
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-radial-to-r from-transparent via-white/50 to-white pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full z-10">
              
              <div className="md:col-span-4 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white shadow-lg border border-neutral-200 flex items-center justify-center shrink-0"
                  >
                    {activeTestimonial.avatar}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-550/5 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="md:col-span-8 flex flex-col justify-between h-full space-y-3">
                <span className="text-[54px] font-serif text-neutral-300 leading-none select-none block text-left">
                  “
                </span>

                <div className="min-h-[90px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIdx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="text-sm sm:text-base text-neutral-900 font-bold leading-relaxed text-left"
                    >
                      {activeTestimonial.quote}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[12px] text-neutral-400 font-semibold text-left"
                    >
                      {activeTestimonial.author}, {activeTestimonial.company}
                    </motion.p>
                  </AnimatePresence>

                  <div className="flex gap-2 mt-4 select-none">
                    <button
                      onClick={handlePrev}
                      className="w-7 h-7 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-all cursor-pointer shadow-2xs focus:outline-hidden"
                    >
                      <span className="text-neutral-500 text-[10px] font-bold">←</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-7 h-7 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50 active:bg-neutral-100 transition-all cursor-pointer shadow-2xs focus:outline-hidden"
                    >
                      <span className="text-neutral-500 text-[10px] font-bold">→</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-center gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-6"
              >
                {activeTestimonial.metrics.map((metric, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <div className="h-px bg-neutral-100 w-full" />}
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl font-extrabold text-neutral-900 tracking-tight">
                          {metric.value}
                        </span>
                        <span className="text-[#10B981] text-lg font-bold">▲</span>
                      </div>
                      <p className="text-xs text-neutral-500 font-semibold leading-normal">
                        {metric.label}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
