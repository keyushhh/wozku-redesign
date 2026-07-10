import React, { useState, useEffect } from 'react';
import { 
  Coins, Sparkles, TrendingUp, Users, Target, Eye, 
  HelpCircle, Info, ArrowRight, Download, Check, 
  RefreshCw, DollarSign, Award, ChevronRight, Calculator, PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InteractiveROIBuilder from './InteractiveROIBuilder';

// Animated Counter Component for premium numbers transitions
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 500; // smooth fast ease transitions
    const startTime = performance.now();
    
    let animationFrameId: number;
    
    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);
  
  const formatted = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return <span>{prefix}{formatted}{suffix}</span>;
}

// Preset configurations for industries
const INDUSTRY_PRESETS = [
  {
    name: 'B2B Enterprise SaaS',
    advocates: 250,
    followers: 1200,
    shares: 3,
    ctr: 2.8,
    cpc: 6.50,
    acv: 45000,
    leadConv: 1.5
  },
  {
    name: 'Tech & Recruitment',
    advocates: 150,
    followers: 950,
    shares: 4,
    ctr: 3.2,
    cpc: 4.80,
    acv: 25000,
    leadConv: 2.0
  },
  {
    name: 'Professional Services',
    advocates: 500,
    followers: 750,
    shares: 2,
    ctr: 2.2,
    cpc: 3.50,
    acv: 60000,
    leadConv: 1.0
  },
  {
    name: 'Finance & Banking',
    advocates: 350,
    followers: 1100,
    shares: 2,
    ctr: 2.5,
    cpc: 8.50,
    acv: 85000,
    leadConv: 1.2
  }
];

export default function ROICalculatorPage() {
  const [activePreset, setActivePreset] = useState<string>('B2B Enterprise SaaS');
  
  // Slide state variables
  const [advocates, setAdvocates] = useState<number>(250);
  const [followers, setFollowers] = useState<number>(1200);
  const [shares, setShares] = useState<number>(3);
  const [ctr, setCtr] = useState<number>(2.8);
  const [cpc, setCpc] = useState<number>(6.50);
  const [acv, setAcv] = useState<number>(45000);
  const [leadConv, setLeadConv] = useState<number>(1.5);

  // Business report generation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // Load preset values
  const applyPreset = (presetName: string) => {
    const p = INDUSTRY_PRESETS.find(item => item.name === presetName);
    if (!p) return;
    setActivePreset(presetName);
    setAdvocates(p.advocates);
    setFollowers(p.followers);
    setShares(p.shares);
    setCtr(p.ctr);
    setCpc(p.cpc);
    setAcv(p.acv);
    setLeadConv(p.leadConv);
  };

  // Calculations
  const monthlyImpressions = advocates * followers * shares;
  const yearlyImpressions = monthlyImpressions * 12;
  
  const monthlyClicks = Math.round(monthlyImpressions * (ctr / 100));
  const yearlyClicks = monthlyClicks * 12;
  
  const monthlyEAV = monthlyClicks * cpc;
  const yearlyEAV = monthlyEAV * 12;

  const yearlyLeads = Math.round(yearlyClicks * (leadConv / 100));
  const influencedPipeline = yearlyLeads * acv;

  // Let's estimate license price: standard scale tiering
  // e.g. base of $2,400 + $60 per advocate / year
  const wozkuAnnualLicense = 2400 + (advocates * 48); 
  const netSavings = Math.max(0, yearlyEAV - wozkuAnnualLicense);
  const returnMultiplier = wozkuAnnualLicense > 0 ? (yearlyEAV / wozkuAnnualLicense) : 0;
  const roiPercentage = wozkuAnnualLicense > 0 ? Math.round((netSavings / wozkuAnnualLicense) * 100) : 0;

  // Handle PDF report generation trigger
  const triggerReportDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setTimeout(() => setIsGenerated(false), 5000);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 pb-20 selection:bg-indigo-500/10 selection:text-indigo-900 relative overflow-hidden">
      
      {/* Background gradients and meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-indigo-650 font-extrabold bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
            <Calculator className="w-3.5 h-3.5 text-indigo-500" /> B2B financial impact modeling
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
            Advocacy ROI Calculator
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Model the potential advertising value and customer acquisition pipeline sourced directly from employee, customer, and partner social shares.
          </p>
        </div>

        {/* Industry Presets Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {INDUSTRY_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p.name)}
              className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                activePreset === p.name
                  ? 'bg-[#141418] border-fixed-white/10 text-fixed-white shadow-xs shadow-black/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* 3-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Input Parameters (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-fixed-white/8 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-fixed-white">Input Parameters</h3>
                <p className="text-[10px] text-neutral-400 dark:text-fixed-muted">Tweak inputs to match your target brand size.</p>
              </div>

              <hr className="border-slate-100 dark:border-fixed-white/6" />

              {/* Slider 1: Advocates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-fixed-light flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400 dark:text-fixed-muted" /> Advocates</span>
                  <span className="text-indigo-650 bg-indigo-50 px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono">{advocates.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="10" max="2500" step="10" 
                  value={advocates} 
                  onChange={(e) => {
                    setAdvocates(Number(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full accent-indigo-650 h-1.5 bg-slate-100 dark:bg-[#20232b] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 dark:text-fixed-muted">
                  <span>10</span>
                  <span>2,500</span>
                </div>
              </div>

              {/* Slider 2: Average Followers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-fixed-light flex items-center gap-1.5"><Eye className="w-4 h-4 text-slate-400 dark:text-fixed-muted" /> Avg. Followers</span>
                  <span className="text-indigo-650 bg-indigo-50 px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono">{followers.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="100" max="5000" step="50" 
                  value={followers} 
                  onChange={(e) => {
                    setFollowers(Number(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full accent-indigo-650 h-1.5 bg-slate-100 dark:bg-[#20232b] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 dark:text-fixed-muted">
                  <span>100</span>
                  <span>5,000</span>
                </div>
              </div>

              {/* Slider 3: Share Frequency */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-fixed-light flex items-center gap-1.5"><RefreshCw className="w-4 h-4 text-slate-400 dark:text-fixed-muted" /> Share Frequency</span>
                  <span className="text-indigo-650 bg-indigo-50 px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono">{shares} / mo</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="1" 
                  value={shares} 
                  onChange={(e) => {
                    setShares(Number(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full accent-indigo-650 h-1.5 bg-slate-100 dark:bg-[#20232b] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 dark:text-fixed-muted">
                  <span>1 / mo</span>
                  <span>10 / mo</span>
                </div>
              </div>

              {/* Slider 4: Click-Through Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-fixed-light flex items-center gap-1.5"><Target className="w-4 h-4 text-slate-400 dark:text-fixed-muted" /> Advocate CTR</span>
                  <span className="text-indigo-650 bg-indigo-50 px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono">{ctr.toFixed(1)}%</span>
                </div>
                <input 
                  type="range" min="0.5" max="10.0" step="0.1" 
                  value={ctr} 
                  onChange={(e) => {
                    setCtr(Number(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full accent-indigo-650 h-1.5 bg-slate-100 dark:bg-[#20232b] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 dark:text-fixed-muted">
                  <span>0.5%</span>
                  <span>10.0%</span>
                </div>
              </div>

              {/* Slider 5: Click Value CPC */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-fixed-light flex items-center gap-1.5"><Coins className="w-4 h-4 text-slate-400 dark:text-fixed-muted" /> CPC Click Value</span>
                  <span className="text-indigo-650 bg-indigo-50 px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono">${cpc.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="1.00" max="15.00" step="0.25" 
                  value={cpc} 
                  onChange={(e) => {
                    setCpc(Number(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full accent-indigo-650 h-1.5 bg-slate-100 dark:bg-[#20232b] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 dark:text-fixed-muted">
                  <span>$1.00</span>
                  <span>$15.00</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#141418] border border-slate-150 dark:border-fixed-white/8 p-4.5 rounded-2xl text-[10px] text-slate-500 dark:text-fixed-muted leading-relaxed font-sans mt-4 flex gap-2">
              <Info className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
              <p>
                Calculations are modeled based on transparent industrial B2B referral equations. Equivalent Media Value represents the budget offset savings if purchasing equal traffic volume on LinkedIn/Google ads.
              </p>
            </div>
          </div>

          {/* Column 2: Dashboard & Comparisons (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-fixed-white/8 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-fixed-white">Financial Impact Dashboard</h3>
                <p className="text-[10px] text-neutral-400 dark:text-fixed-muted">Real-time aggregate return projections from your advocacy network.</p>
              </div>

              <hr className="border-slate-100 dark:border-fixed-white/6" />

              {/* Metric 1: Yearly EAV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-[#141418] border border-slate-150 dark:border-fixed-white/6 p-4.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Yearly Ad Spend Offset</span>
                  <div className="text-2xl font-display font-extrabold text-indigo-950">
                    <AnimatedNumber value={yearlyEAV} prefix="$" />
                  </div>
                  <span className="text-[9.5px] text-emerald-600 font-semibold block font-mono">
                    +<AnimatedNumber value={monthlyEAV} prefix="$" /> / month
                  </span>
                </div>

                {/* Metric 2: Net ROI */}
                <div className="bg-slate-50 dark:bg-[#141418] border border-slate-150 dark:border-fixed-white/6 p-4.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Net ROI % Sourced</span>
                  <div className="text-2xl font-display font-extrabold text-indigo-950">
                    <AnimatedNumber value={roiPercentage} suffix="%" />
                  </div>
                  <span className="text-[9.5px] text-slate-500 font-semibold block font-mono">
                    <AnimatedNumber value={returnMultiplier} suffix="x" decimals={1} /> cost recovery
                  </span>
                </div>
              </div>

              {/* Metric 3: Reach & Clicks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-[#141418] border border-slate-150 dark:border-fixed-white/6 p-4.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Yearly Impressions Sourced</span>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    <AnimatedNumber value={yearlyImpressions} />
                  </div>
                  <span className="text-[9px] text-slate-400 block">
                    <AnimatedNumber value={monthlyImpressions} /> / month
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-[#141418] border border-slate-150 dark:border-fixed-white/6 p-4.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Yearly Sourced Clicks</span>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    <AnimatedNumber value={yearlyClicks} />
                  </div>
                  <span className="text-[9px] text-slate-400 block">
                    <AnimatedNumber value={monthlyClicks} /> / month
                  </span>
                </div>
              </div>

              {/* Cost bar-chart comparison container */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Annual Cost vs. Saving Offset</h4>
                  <p className="text-[9.5px] text-slate-500">Comparing traditional paid CPC spend versus equivalent Wozku licensing.</p>
                </div>

                <div className="space-y-3.5">
                  
                  {/* Bar 1: Paid Ad Spend */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-600">Paid Search CPC Ad Spend</span>
                      <span className="text-slate-900"><AnimatedNumber value={yearlyEAV} prefix="$" /></span>
                    </div>
                    <div className="h-5 bg-slate-100 rounded-lg overflow-hidden flex">
                      <div className="bg-slate-400/35 h-full rounded-lg" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Bar 2: Wozku Cost */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-indigo-650">Wozku Annual License Cost</span>
                      <span className="text-indigo-900"><AnimatedNumber value={wozkuAnnualLicense} prefix="$" /></span>
                    </div>
                    <div className="h-5 bg-slate-100 rounded-lg overflow-hidden flex">
                      <div 
                        className="bg-indigo-600 h-full rounded-lg transition-all duration-500 ease-out" 
                        style={{ width: `${Math.max(2, Math.min(100, (wozkuAnnualLicense / yearlyEAV) * 100))}%` }} 
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div className="text-[9.5px] text-slate-400 font-mono text-center flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4">
              <PieChart className="w-3.5 h-3.5 text-indigo-500" /> MODEL UPDATES DYNAMICALLY ON SLIDER MOVEMENT
            </div>
          </div>

          {/* Column 3: Lead Multiplier & Business Case Report (3 cols) */}
          <div className="lg:col-span-3 bg-[#0a0a0d] text-white border border-white/10 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  <Award className="w-3.5 h-3.5 text-indigo-500" /> PIPELINE CAPABILITIES
                </div>
                <h3 className="text-sm font-bold text-white">Revenue Multiplier</h3>
                <p className="text-[10px] text-neutral-400 leading-relaxed">Model conversions of advocate-sourced clicks into sales pipeline deals.</p>
              </div>

              <hr className="border-white/10" />

              {/* Slide parameters for pipeline conversion */}
              <div className="space-y-4 text-xs font-sans">
                
                {/* ACV Slide */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-neutral-350 text-[11px]">Avg. Deal Size (ACV)</span>
                    <span className="text-indigo-400 font-mono">${acv.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="5000" max="150000" step="5000"
                    value={acv} 
                    onChange={(e) => setAcv(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-[#141418] rounded-lg cursor-pointer"
                  />
                </div>

                {/* Lead Conv Slide */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-neutral-350 text-[11px]">Click-to-Lead Conv %</span>
                    <span className="text-indigo-400 font-mono">{leadConv.toFixed(1)}%</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="5.0" step="0.1"
                    value={leadConv} 
                    onChange={(e) => setLeadConv(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-[#141418] rounded-lg cursor-pointer"
                  />
                </div>

                {/* Outcome Sourced Pipeline */}
                <div className="bg-[#141418] border border-white/10 p-4.5 rounded-2xl text-center space-y-2 mt-4">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">Influenced Annual Pipeline</span>
                  <div className="text-2xl font-mono font-extrabold text-indigo-400">
                    <AnimatedNumber value={influencedPipeline} prefix="$" />
                  </div>
                  <span className="text-[8.5px] text-neutral-400 block font-sans">
                    Based on sourcing <AnimatedNumber value={yearlyLeads} /> qualified leads / year
                  </span>
                </div>

              </div>

            </div>

            {/* Simulated business report download card */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {isGenerated ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 p-3 rounded-xl text-center text-[10px] font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    <span>ROI business report downloaded!</span>
                  </motion.div>
                ) : (
                  <button
                    onClick={triggerReportDownload}
                    disabled={isGenerating}
                    className="w-full bg-white hover:bg-neutral-100 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-900 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs shadow-xs"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-neutral-500" />
                        <span>Compiling report...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-neutral-600" />
                        <span>Export business case PDF</span>
                      </>
                    )}
                  </button>
                )}
              </AnimatePresence>

              <div className="text-center text-[8px] text-neutral-500 font-mono tracking-widest">
                INCLUDES CUSTOM INTEGRATION SPECS // SYSTEM SLA
              </div>
            </div>

          </div>

        </div>

        {/* ================= ADVOCACY STRATEGY WORKSPACE ROW ================= */}
        <section className="mt-24 border-t border-slate-200 pt-20 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Design Your Custom Advocacy Strategy
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Simulate your growth outcomes live. Connect trigger events, advocate networks, distribution channels, and desired actions to project impressions, clicks, MQLs, and equivalent ad spend savings instantly.
            </p>
          </div>

          <InteractiveROIBuilder />
        </section>

      </div>
    </main>
  );
}
