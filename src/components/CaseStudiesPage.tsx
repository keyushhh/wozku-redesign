import React, { useState, useEffect } from 'react';
import { 
  Sparkles, TrendingUp, Users, ArrowRight, Filter, 
  ArrowUpRight, BarChart2, X, CheckCircle, FileText, Quote,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudy {
  id: string;
  company: string;
  logoText: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  category: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    company: 'VaporSoft',
    logoText: 'VS',
    title: 'How VaporSoft unlocked $1.8M in organic pipeline with employee advocacy',
    metric: '+340%',
    metricLabel: 'Social Reach',
    description: 'VaporSoft transformed their 200+ employee base into active brand ambassadors, expanding organic reach without increasing ad spend.',
    tags: ['B2B SaaS', 'Employee Advocacy'],
    category: 'B2B SaaS',
    duration: '6 Month Study',
    challenge: 'VaporSoft was struggling to lower their rising Customer Acquisition Cost (CAC) through traditional paid LinkedIn ads, while their employees had massive untapped professional networks.',
    solution: 'By deploying Wozku, VaporSoft launched employee advocacy presets that made it seamless for engineering and sales teams to share weekly product updates with two taps from Slack.',
    results: [
      '$1.8M in net-new sourced pipeline',
      '340% increase in organic social reach',
      'Average CAC reduced by 22% in first quarter'
    ],
    testimonial: {
      quote: "Wozku completely changed how our team communicates on social. Organic reach has become our highest-converting acquisition channel.",
      author: "Sarah Jenkins",
      role: "VP of Growth, VaporSoft"
    }
  },
  {
    id: '2',
    company: 'Apex Logistics',
    logoText: 'AL',
    title: 'Driving corporate event registration with community-led sharing',
    metric: '14,000+',
    metricLabel: 'Summit Signups',
    description: 'By incentivizing field agents and logistics partners, Apex Logistics boosted attendance at their annual summit to record numbers.',
    tags: ['Enterprise', 'Event Advocacy'],
    category: 'Enterprise',
    duration: '3 Month Study',
    challenge: 'Apex Logistics needed to drive attendance to their global summit, but email outreach was getting less than 12% open rates, and banner ads yielded low conversions.',
    solution: 'They mobilized their internal team and partner advocate networks with custom registration campaign links and live dashboards displaying registrant count standings.',
    results: [
      '14,230 verified event signups',
      '55% of all signups directly attributed to advocate links',
      '94% advocate participation rate across regional hubs'
    ],
    testimonial: {
      quote: "Wozku gamified the registration campaign so successfully that our own regional managers were competing to drive the most signups.",
      author: "Marcus Vance",
      role: "Global Events Director, Apex Logistics"
    }
  },
  {
    id: '3',
    company: 'Bloom Retail',
    logoText: 'BR',
    title: 'Bloom Retail generates 4.2x ROAS using advocate tracking links',
    metric: '4.2x',
    metricLabel: 'Return on Spend',
    description: 'Bloom Retail deployed trackable campaign presets to micro-influencers and store managers, attributing sales in real-time.',
    tags: ['Retail', 'Social Amplification'],
    category: 'Consumer',
    duration: '9 Month Study',
    challenge: 'Bloom Retail wanted to build local community buzz across 80+ physical stores, but could not accurately track which influencer posts drove in-store conversions.',
    solution: 'They provided managers and partners with localized Wozku campaign presets containing dynamically attributed coupon codes and conversion pixels.',
    results: [
      '4.2x return on advocate investment',
      '35,000+ unique code redemptions tracked',
      'Real-time retail dashboard analytics deployed for store managers'
    ],
    testimonial: {
      quote: "Being able to trace online organic shares straight to store cash registers solved our biggest marketing attribution puzzle.",
      author: "Elena Rostov",
      role: "Chief Marketing Officer, Bloom Retail"
    }
  },
  {
    id: '4',
    company: 'CloudSync',
    logoText: 'CS',
    title: 'Scaling developer relations via community leaderboards',
    metric: '87%',
    metricLabel: 'Dev Engagement',
    description: 'CloudSync used Wozku platform leaderboards to reward external developers, creating a vibrant open-source ecosystem.',
    tags: ['B2B SaaS', 'Community Growth'],
    category: 'B2B SaaS',
    duration: '4 Month Study',
    challenge: 'CloudSync wanted to scale adoption of their open-source database engine, but struggled to keep external developers active and sharing updates.',
    solution: 'They created a Developer Advocacy Circle with public dashboards, rewarding community contributors with exclusive custom merchandise for sharing developer content.',
    results: [
      '87% increase in monthly active community contributors',
      'Over 2,500 github stars sourced from community shares',
      'Doubled monthly technical blog pageviews organically'
    ],
    testimonial: {
      quote: "Wozku helped us turn our passive github watchers into an active, motivated network of developer advocates.",
      author: "Danielle K.",
      role: "Head of Developer Relations, CloudSync"
    }
  },
  {
    id: '5',
    company: 'Nexa Health',
    logoText: 'NH',
    title: 'Secure and compliant advocacy in healthcare networks',
    metric: '100%',
    metricLabel: 'HIPAA Compliant',
    description: 'Nexa Health scaled their doctor-advocate network using Lexical filters to maintain lock-tight compliance guidelines.',
    tags: ['Enterprise', 'Compliance'],
    category: 'Enterprise',
    duration: '12 Month Study',
    challenge: 'Nexa Health needed to encourage medical professionals to share wellness insights, but strict compliance guidelines held them back.',
    solution: 'Wozku’s enterprise Lexical compliance filter was set up to prevent the sharing of any unapproved phrases, validating edits in real-time.',
    results: [
      '100% compliance audit pass rate',
      'Over 400 medical professionals active on the network',
      'Over 2M reach to wellness-seeking patients'
    ],
    testimonial: {
      quote: "Wozku gave our legal team the confidence to open social sharing to our doctors, knowing compliance was guaranteed.",
      author: "Dr. Aris Vance",
      role: "Chief Compliance Officer, Nexa Health"
    }
  },
  {
    id: '6',
    company: 'Zephyr App',
    logoText: 'ZA',
    title: 'Boosting app store downloads through organic sharing circles',
    metric: '250k+',
    metricLabel: 'App Installs',
    description: 'Zephyr built sharing circles inside their mobile app, rewarding users who advocates for features within their networks.',
    tags: ['Consumer', 'Social Amplification'],
    category: 'Consumer',
    duration: '5 Month Study',
    challenge: 'Zephyr App launched a major feature and needed high-velocity downloads, but app store search optimization was overcrowded.',
    solution: 'They integrated a sharing circle using Wozku SDK directly inside the app, encouraging active users to share feature links with friends.',
    results: [
      '250,000+ organic app installs in 5 months',
      '42% viral coefficient achieved',
      'Cost per install dropped to near zero'
    ],
    testimonial: {
      quote: "Our users became our primary sales force. The viral growth we saw surpassed all paid channel metrics combined.",
      author: "Liam Zhao",
      role: "Co-Founder, Zephyr App"
    }
  }
];

const CATEGORIES = ['All', 'B2B SaaS', 'Enterprise', 'Consumer'];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'columns' | 'carousel'>('grid');
  const [activeSlide, setActiveSlide] = useState<CaseStudy>(CASE_STUDIES[0]);

  const filteredStudies = CASE_STUDIES.filter(study => 
    activeCategory === 'All' || study.category === activeCategory
  );

  // Keep carousel active slide in bounds of active category filter
  useEffect(() => {
    if (filteredStudies.length > 0) {
      const exists = filteredStudies.some(s => s.id === activeSlide?.id);
      if (!exists) {
        setActiveSlide(filteredStudies[0]);
      }
    }
  }, [activeCategory, filteredStudies]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 pb-20 selection:bg-indigo-500/10 selection:text-indigo-900 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--indigo-500) 6%, transparent), transparent 60%)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> CUSTOMER RESULTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
            Proven Outcomes, Real Impact
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Discover how leading organizations turn employee advocacy, community engagement, and organic sharing into growth engines.
          </p>
        </div>

        {/* Filter Controls Header Pill Container */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-6xl mx-auto border-b border-slate-200/85 pb-6">
          {/* Category Tabs */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-1 rounded-2xl flex flex-wrap gap-1 shadow-sm">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold font-sans transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-600 text-fixed-white shadow-xs shadow-indigo-500/20' 
                      : 'text-slate-655 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher — Light Mode */}
          <div className="bg-white border border-slate-200 p-1 rounded-2xl flex items-center shadow-sm">
            {[
              {
                mode: 'grid',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                ),
                label: 'Grid'
              },
              {
                mode: 'list',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <circle cx="4" cy="6" r="1" fill="currentColor" />
                    <circle cx="4" cy="12" r="1" fill="currentColor" />
                    <circle cx="4" cy="18" r="1" fill="currentColor" />
                  </svg>
                ),
                label: 'List'
              },
              {
                mode: 'columns',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="4.5" height="18" rx="1" />
                    <rect x="9.75" y="3" width="4.5" height="18" rx="1" />
                    <rect x="16.5" y="3" width="4.5" height="18" rx="1" />
                  </svg>
                ),
                label: 'Columns'
              },
              {
                mode: 'carousel',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="11" rx="1.5" />
                    <rect x="3" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
                    <rect x="7" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
                    <rect x="11" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
                    <rect x="15" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
                    <rect x="19" y="18" width="2" height="2" rx="0.5" fill="currentColor" />
                  </svg>
                ),
                label: 'Carousel'
              }
            ].map((option, idx, arr) => {
              const isActive = viewMode === option.mode;
              return (
                <React.Fragment key={option.mode}>
                  <button
                    onClick={() => setViewMode(option.mode as any)}
                    className={`p-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                    title={option.label}
                  >
                    {option.icon}
                  </button>
                  {idx < arr.length - 1 && (
                    <div className="w-[1px] h-4 bg-slate-200 mx-0.5 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Dynamic Layout Switch */}
        
        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className="bg-white border border-slate-200 hover:border-indigo-500/40 rounded-3rem p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer group relative"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-sm text-slate-800 border border-slate-100 font-mono">
                        {study.logoText}
                      </span>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-450 bg-slate-100/50 px-2.5 py-1 rounded-md">
                        {study.duration}
                      </span>
                    </div>

                    {/* Metric Highlights */}
                    <div className="mb-4">
                      <div className="text-4xl font-display font-black text-indigo-600 tracking-tight flex items-baseline gap-1">
                        {study.metric}
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {study.metricLabel}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-neutral-900 leading-snug group-hover:text-indigo-600 transition-colors mb-2 min-h-[44px]">
                      {study.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans font-medium mb-6 line-clamp-3">
                      {study.description}
                    </p>
                  </div>

                  <div>
                    <hr className="border-slate-100 mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1.5">
                        {study.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-indigo-600 group-hover:text-indigo-500 transition-colors flex items-center gap-1 font-bold text-xs shrink-0 pl-2">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-4 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className="bg-white border border-slate-200 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  {/* Left Column: Company & Title */}
                  <div className="flex items-start gap-4 md:max-w-2xl">
                    <span className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-sm text-slate-800 border border-slate-100 font-mono shrink-0">
                      {study.logoText}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-neutral-900">{study.company}</span>
                        <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">
                          {study.duration}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-800 leading-snug group-hover:text-indigo-600 transition-colors">
                        {study.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {study.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Metric */}
                  <div className="flex items-center gap-4 shrink-0 md:border-l md:border-slate-100 md:pl-8 min-w-[150px]">
                    <div>
                      <div className="text-2xl font-display font-black text-indigo-600 tracking-tight flex items-baseline gap-0.5">
                        {study.metric}
                        <TrendingUp className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-450">
                        {study.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: CTA */}
                  <div className="shrink-0 flex items-center">
                    <span className="text-indigo-600 group-hover:text-indigo-500 transition-colors flex items-center gap-1 font-bold text-xs">
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* COLUMNS VIEW (Grouped by Category) */}
        {viewMode === 'columns' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
            {['B2B SaaS', 'Enterprise', 'Consumer'].map((colCategory) => {
              const categoryStudies = CASE_STUDIES.filter(study => study.category === colCategory);
              return (
                <div key={colCategory} className="bg-slate-100/50 border border-slate-200/60 rounded-3xl p-5 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      <h4 className="text-xs font-bold text-neutral-800 tracking-wide uppercase font-sans">{colCategory}</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                      {categoryStudies.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categoryStudies.map((study) => (
                      <div
                        key={study.id}
                        onClick={() => setSelectedStudy(study)}
                        className="bg-white border border-slate-200/80 hover:border-indigo-500/30 rounded-2xl p-4 space-y-3 shadow-2xs hover:shadow-xs transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-neutral-900 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                            {study.company}
                          </span>
                          <span className="text-[9px] text-slate-400 font-medium">{study.duration}</span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {study.title}
                        </h5>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-display font-black text-indigo-600">{study.metric}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{study.metricLabel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CAROUSEL VIEW (Hero focus slider) */}
        {viewMode === 'carousel' && filteredStudies.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="relative">
              {/* Left Navigation */}
              <button
                onClick={() => {
                  const idx = filteredStudies.findIndex(s => s.id === activeSlide.id);
                  const prevIdx = idx <= 0 ? filteredStudies.length - 1 : idx - 1;
                  setActiveSlide(filteredStudies[prevIdx]);
                }}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 text-slate-650 hover:text-slate-900 hover:scale-105 p-3 rounded-full shadow-md transition-all cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Right Navigation */}
              <button
                onClick={() => {
                  const idx = filteredStudies.findIndex(s => s.id === activeSlide.id);
                  const nextIdx = idx >= filteredStudies.length - 1 ? 0 : idx + 1;
                  setActiveSlide(filteredStudies[nextIdx]);
                }}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 text-slate-650 hover:text-slate-900 hover:scale-105 p-3 rounded-full shadow-md transition-all cursor-pointer hidden md:flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedStudy(activeSlide)}
                  className="bg-white border border-slate-200 hover:border-indigo-500/40 rounded-3rem p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-stretch shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group min-h-[350px]"
                >
                  {/* Left Content */}
                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-sm text-slate-800 border border-slate-100 font-mono">
                          {activeSlide.logoText}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900">{activeSlide.company}</h4>
                          <div className="text-[9px] text-slate-400 font-mono font-medium">{activeSlide.duration}</div>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-neutral-900 leading-tight group-hover:text-indigo-650 transition-colors">
                        {activeSlide.title}
                      </h3>
                      <p className="text-xs text-slate-550 leading-relaxed font-sans font-medium line-clamp-3">
                        {activeSlide.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeSlide.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Metrics Banner */}
                  <div className="w-full md:w-[220px] bg-slate-50/50 rounded-2.5rem border border-slate-100 p-6 flex flex-col justify-between space-y-6 shrink-0 text-center md:text-left">
                    <div>
                      <div className="text-4xl font-display font-black text-indigo-600 tracking-tight flex items-baseline justify-center md:justify-start gap-0.5">
                        {activeSlide.metric}
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-450 mt-1">
                        {activeSlide.metricLabel}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-200/60">
                      <span className="text-indigo-600 group-hover:text-indigo-500 transition-colors flex items-center justify-center md:justify-start gap-1 font-bold text-xs">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail selector */}
            <div className="flex flex-wrap justify-center items-center gap-3">
              {filteredStudies.map((study) => {
                const isActive = study.id === activeSlide.id;
                return (
                  <button
                    key={study.id}
                    onClick={() => setActiveSlide(study)}
                    className={`h-11 px-4 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className={`h-6 w-6 rounded-lg text-[9px] font-bold font-mono flex items-center justify-center shrink-0 border ${
                      isActive ? 'bg-indigo-700 border-indigo-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-700'
                    }`}>
                      {study.logoText}
                    </span>
                    <div className="leading-tight pr-1">
                      <div className={`text-[9px] font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{study.company}</div>
                      <div className={`text-[8px] font-semibold ${isActive ? 'text-indigo-200' : 'text-slate-450'}`}>{study.metric}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Case Study Slide-over Detail Modal */}
        <AnimatePresence>
          {selectedStudy && (
            <div className="fixed inset-0 z-50 flex items-center justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedStudy(null)}
                className="absolute inset-0 bg-[#09090f]/40 backdrop-blur-xs"
              />

              {/* Side Panel Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col justify-between z-10 border-l border-slate-150"
              >
                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto flex-1 space-y-8">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-md text-slate-800 border border-slate-150 font-mono">
                        {selectedStudy.logoText}
                      </span>
                      <div>
                        <h2 className="text-lg font-bold text-neutral-900">{selectedStudy.company}</h2>
                        <p className="text-[10px] text-slate-400 font-mono font-medium">{selectedStudy.duration} Case Study</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedStudy(null)}
                      className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Main Metric Banner */}
                  <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2rem p-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 shrink-0">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-display font-black text-indigo-600 leading-none mb-1">
                        {selectedStudy.metric}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-indigo-750">
                        {selectedStudy.metricLabel} (Verified Result)
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-md sm:text-lg font-bold text-neutral-900 leading-snug">
                    {selectedStudy.title}
                  </h3>

                  {/* Challenge & Solution */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" /> The Challenge
                      </h4>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        {selectedStudy.challenge}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> The Solution
                      </h4>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        {selectedStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results Bullet points */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                      Key Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {selectedStudy.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="bg-slate-50 rounded-2rem p-5 border border-slate-100 relative overflow-hidden">
                    <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-200/50 pointer-events-none" />
                    <div className="space-y-4 relative z-10">
                      <p className="text-xs text-slate-650 leading-relaxed font-serif italic">
                        "{selectedStudy.testimonial.quote}"
                      </p>
                      <div className="text-[10px]">
                        <div className="font-bold text-neutral-900">{selectedStudy.testimonial.author}</div>
                        <div className="text-slate-400 font-medium">{selectedStudy.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedStudy(null)}
                    className="text-xs font-bold text-slate-550 hover:text-slate-800 transition-colors cursor-pointer px-4 py-2"
                  >
                    Close Panel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStudy(null);
                      window.dispatchEvent(new CustomEvent('open-demo-modal'));
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-indigo-600/10"
                  >
                    Schedule Demo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CTA Footer Block */}
        <div className="mt-28 bg-[#09090f] text-fixed-white rounded-[2.5rem] p-8 sm:p-12 border border-fixed-white/10 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-grid-dots-accent opacity-15 pointer-events-none" />
          <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[8.5px] uppercase font-mono tracking-widest text-indigo-400 font-extrabold bg-indigo-950 border border-indigo-900/50 px-3.5 py-1 rounded-full">
              <Users className="w-3.5 h-3.5" /> DRIVE BUSINESS GROWTH
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-fixed-white">
              Ready to write your own success story?
            </h2>
            <p className="text-xs text-fixed-light leading-relaxed font-sans max-w-md mx-auto">
              Configure trackable advocacy channels, unlock community nodes, and attribute real revenue in your CRM platform.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-indigo-500/20"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
