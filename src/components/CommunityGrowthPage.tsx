import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Sparkles,
  Globe2,
  Award,
  Zap,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Gift,
  RefreshCw,
  Share2,
  DollarSign,
  Star,
  Lock,
  Plus,
  Volume2,
  ChevronDown
} from 'lucide-react';
import linkedInIcon from '../assets/linkedin-filled.svg';

// ---- Confetti Particle System ----
interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}
const CONFETTI_COLORS = ['#6366f1', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4'];

// ---- Audio Feedback Web Audio Synthesis ----
const playSynthSound = (type: 'share' | 'unlock' | 'claim') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (type === 'share') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.22);
      });
    } else if (type === 'unlock') {
      [659.25, 880, 1318.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.3);
      });
    } else if (type === 'claim') {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.25);
      });
    }
  } catch (e) {
    console.warn('Audio synthesis failed:', e);
  }
};

const playChime = (freq: number) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn('Audio chime failed:', e);
  }
};

// ---- Creator & Community Campaign Presets ----
const CAMPAIGN_PRESETS = [
  {
    id: 'launch',
    label: 'Platform v2.0 Launch',
    tag: '🚀 Product Launch',
    cohort: 'Independent Creators',
    defaultReward: 'Beta Key + Exclusive Swag',
    post: "Paid media channels are getting saturated. Wozku's new Organic Distribution Loop automates creator sharing to boost high-trust social impressions. Highly recommend!",
    hashtag: '#WozkuLaunch',
    baseReach: 24500,
    baseClicks: 780,
    baseValue: 441
  },
  {
    id: 'swag',
    label: 'Exclusive Swag Drop',
    tag: '🎁 Swag Campaign',
    cohort: 'Loyal Customers',
    defaultReward: 'Premium Creator Hoodie',
    post: "Got my hands on the new custom @Wozku creator hoodie. If you want to align your advocate and customer networks into a growth channel, check them out.",
    hashtag: '#WozkuSwag',
    baseReach: 12800,
    baseClicks: 410,
    baseValue: 230
  },
  {
    id: 'partner',
    label: 'Joint Integration Release',
    tag: '🤝 Partner Release',
    cohort: 'Strategic Partners',
    defaultReward: 'VIP Executive Circle dinner',
    post: "Proud to launch our joint partner integration. We're turning success stories into real, measurable organic reach. Read about the new loop below.",
    hashtag: '#WozkuPartners',
    baseReach: 38000,
    baseClicks: 1220,
    baseValue: 684
  }
];

// ---- Funnel Forecast Program Tiers ----
const FUNNEL_TIERS = [
  { id: 'seed', name: 'Seed Cohort', members: 150, followers: 1200 },
  { id: 'scale', name: 'Ambassador Circle', members: 850, followers: 3400 },
  { id: 'global', name: 'Global Network', members: 3600, followers: 5200 }
];

export default function CommunityGrowthPage() {
  // ---- Brand Hub vs. Creator Portal State ----
  const [selectedPreset, setSelectedPreset] = useState(CAMPAIGN_PRESETS[0]);
  const [advocateName, setAdvocateName] = useState('Sarah Jenkins');
  const [selectedReward, setSelectedReward] = useState('Early Access Beta Key');
  const [isShared, setIsShared] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);

  // Ticking stats on the marketer panel
  const [sharesCount, setSharesCount] = useState(0);
  const [impressionsCount, setImpressionsCount] = useState(0);
  const [clicksCount, setClicksCount] = useState(0);
  const [valueCount, setValueCount] = useState(0);

  // Email form input for final CTA
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  // Reset live share metrics when preset changes
  useEffect(() => {
    setIsShared(false);
    setClaimedReward(false);
    setSharesCount(0);
    setImpressionsCount(0);
    setClicksCount(0);
    setValueCount(0);
  }, [selectedPreset]);

  const handleShareAmplify = () => {
    if (isShared) return;
    setIsShared(true);
    playSynthSound('share');
    spawnConfetti();

    // Gradually tick up stats
    const steps = 50;
    const interval = 25;
    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        const progress = i / steps;
        setSharesCount(Math.round(1 * progress));
        setImpressionsCount(Math.round(selectedPreset.baseReach * progress));
        setClicksCount(Math.round(selectedPreset.baseClicks * progress));
        setValueCount(Math.round(selectedPreset.baseValue * progress));
      }, i * interval);
    }

    // Trigger unlock chime later
    setTimeout(() => {
      playSynthSound('unlock');
      spawnConfetti();
    }, 1400);
  };

  const handleClaimReward = () => {
    setClaimedReward(true);
    playSynthSound('claim');
    spawnConfetti();
  };

  // ---- Funnel Forecast State ----
  const [selectedTier, setSelectedTier] = useState(FUNNEL_TIERS[1]);
  const [engagementRate, setEngagementRate] = useState(38); // percentage

  // ---- Particle Confetti Code ----
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.16; // gravity
        p.rotation += p.rotationSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        if (p.y > canvas.height + 25) pts.splice(i, 1);
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const spawnConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = 100;
    const newPts: ConfettiParticle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      newPts.push({
        x: canvas.width / 2,
        y: canvas.height / 2 - 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 5 + Math.random() * 7,
        rotation: Math.random() * 360,
        rotationSpeed: -8 + Math.random() * 16
      });
    }
    particlesRef.current = [...particlesRef.current, ...newPts];
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaEmail.trim()) return;
    setCtaSubmitted(true);
    playSynthSound('unlock');
  };

  // ---- Funnel Mathematical Projections ----
  const activeAdvocates = Math.round(selectedTier.members * (engagementRate / 100));
  const estimatedImpressions = activeAdvocates * selectedTier.followers;
  const estimatedClicks = Math.round(estimatedImpressions * 0.032); // 3.2% Click rate
  const estimatedLeads = Math.round(estimatedClicks * 0.08); // 8% conversion rate
  const estimatedSavings = Math.round((estimatedImpressions / 1000) * 18); // $18 CPM equivalent

  const currentInitials = advocateName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'SJ';

  return (
    <main className="min-h-screen bg-slate-50 text-neutral-900 selection:bg-indigo-500/10 selection:text-indigo-900 font-sans">
      
      {/* ================= 1. REDESIGNED HERO SECTION (Centered with Sandbox Centerpiece) ================= */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-150 pt-16 pb-24 text-center">
        {/* Glow ambient background circles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.1),_transparent_35%)] pointer-events-none" />
        <div className="absolute left-[15%] top-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute right-[15%] top-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-6 max-w-4xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-700 border border-indigo-200/40">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Community Growth Loop
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-neutral-950 leading-[1.08] text-wrap-balance">
              Turn customers into <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-400 bg-clip-text text-transparent">
                your best growth channel.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed text-wrap-pretty">
              Community Growth lets you orchestrate advocate campaigns end-to-end — from incentive design to real-time broadcast — so every satisfied customer becomes a measurable acquisition event.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-7 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/15 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Book a Live Demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#forecast"
                className="flex items-center gap-2 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer shadow-xs"
              >
                Forecast My Growth Loop
              </a>
            </div>
          </div>

          {/* Majestic Centered Sandbox Centerpiece */}
          <div id="sandbox" className="max-w-5xl mx-auto text-left relative">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0c0c0e] border border-fixed-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

              {/* LEFT COLUMN: Marketer Control Panel */}
              <div className="lg:col-span-6 space-y-6 bg-[#141418] border border-fixed-white/10 rounded-[2rem] p-6 sm:p-7 shadow-sm">
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest block mb-0.5">MARKETER CONTROL PANEL</span>
                  <h3 className="text-base font-bold text-neutral-950">Configure Advocate Incentive</h3>
                </div>

                {/* Campaign selector */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Active Campaign Template</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {CAMPAIGN_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset)}
                        className={`p-3 rounded-xl border text-left text-[10px] font-bold transition-all cursor-pointer ${
                          selectedPreset.id === preset.id
                            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 border-transparent text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        <span className="block opacity-90 mb-1">{preset.tag.split(' ')[0]}</span>
                        <span className="block truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reward Selector with FIXED padded chevron positioning */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Assigned Advocate Incentive</span>
                  <div className="relative w-full">
                    <select
                      value={selectedReward}
                      onChange={(e) => setSelectedReward(e.target.value)}
                      className="appearance-none w-full bg-white border border-neutral-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs font-semibold text-neutral-800 cursor-pointer focus:outline-hidden focus:border-indigo-500 transition-colors"
                    >
                      <option value="Early Access Beta Key">Early Access Beta Key</option>
                      <option value="15% Lifetime Affiliate Commission">15% Lifetime Affiliate Commission</option>
                      <option value="VIP Partner Circle Dinner Ticket">VIP Partner Circle Dinner Ticket</option>
                      <option value="Custom Wozku Swag Kit">Custom Wozku Swag Kit</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 w-4 h-4" />
                  </div>
                </div>

                {/* Creator Name input */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Ambassador Name</span>
                  <input
                    type="text"
                    value={advocateName}
                    onChange={(e) => setAdvocateName(e.target.value.slice(0, 24))}
                    placeholder="Sarah Jenkins"
                    className="w-full bg-white border border-neutral-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-neutral-800 transition-all focus:outline-hidden"
                  />
                </div>

                {/* Telemetry output */}
                <div className="border-t border-neutral-200 pt-5 space-y-3">
                  <span className="text-[10px] font-mono font-extrabold text-neutral-600 uppercase tracking-widest block">CAMPAIGN RETURN TELEMETRY</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
                      <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Attributed Shares</span>
                      <span className="text-xl font-mono font-bold block mt-0.5 text-neutral-900">{sharesCount}</span>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
                      <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Impressions Saved</span>
                      <span className="text-xl font-mono font-bold block mt-0.5 text-neutral-900">{impressionsCount.toLocaleString()}</span>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
                      <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Attributed Clicks</span>
                      <span className="text-xl font-mono font-bold block mt-0.5 text-neutral-900">{clicksCount.toLocaleString()}</span>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
                      <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Equivalent Value</span>
                      <span className="text-xl font-mono font-bold text-emerald-600 block mt-0.5">${valueCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Dynamic Creator Portal Preview */}
              <div className="lg:col-span-6 flex flex-col justify-between p-2 sm:p-4">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase tracking-widest block mb-0.5">DYNAMIC ADVOCATE VIEW</span>
                      <h4 className="text-sm font-bold text-neutral-900">Portal Preview: {advocateName}</h4>
                    </div>
                    <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">LIVE PREVIEW</span>
                  </div>

                  {/* Discord/Portal prompt alert mockup */}
                  <div className="bg-[#0d1220] border border-indigo-400/25 rounded-2xl p-4 space-y-3 shadow-inner shadow-black/25">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center text-fixed-white text-[10px] font-bold">W</div>
                      <span className="text-[10px] font-bold text-fixed-white">Wozku Community Bot</span>
                      <span className="text-[8px] text-fixed-muted font-mono ml-auto">#announcements</span>
                    </div>
                    <p className="text-[11px] text-fixed-muted leading-relaxed font-sans">
                      Hey <span className="text-sky-300 font-semibold">@{advocateName}</span>! You have a new campaign reward waiting. Broadcast the release card below and claim: <span className="text-emerald-300 font-semibold">{selectedReward}</span>.
                    </p>
                  </div>

                  {/* Social Card preview */}
                  <div className="border border-neutral-200 rounded-2xl p-4 bg-white space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-xs text-indigo-700 font-mono">{currentInitials}</div>
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block">{advocateName}</span>
                        <span className="text-[9px] text-neutral-400 block font-mono">Sharing to social networks</span>
                      </div>
                    </div>
                    <p className="text-[11.5px] text-neutral-700 leading-relaxed font-sans italic">
                      "{selectedPreset.post}"
                    </p>
                    <span className="text-[10px] text-indigo-600 font-bold block">{selectedPreset.hashtag}</span>
                  </div>
                </div>

                {/* Actions bottom block */}
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  {isShared ? (
                    <div className="space-y-2.5">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-bold text-xs py-3.5 rounded-xl text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Message Broadcasted! Check Marketer Panel.
                      </div>
                      {claimedReward ? (
                        <div className="bg-indigo-600 text-white font-bold text-xs py-3.5 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/15">
                          <Gift className="w-4 h-4" /> Reward claimed and sent to {advocateName}!
                        </div>
                      ) : (
                        <button
                          onClick={handleClaimReward}
                          className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs py-3.5 rounded-xl cursor-pointer transition-all shadow-md shadow-amber-500/10 text-center"
                        >
                          Claim "{selectedReward}"
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleShareAmplify}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/15"
                    >
                      <img src={linkedInIcon} alt="LinkedIn" className="w-4 h-4" /> Approve &amp; Broadcast Social Card
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. QUICK STATS BAR ================= */}
      <section className="bg-slate-100 border-b border-neutral-200/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '3.6×', label: 'Share velocity multiplier' },
              { value: '1,850', label: 'Active ambassadors' },
              { value: '95%', label: 'Attribution accuracy' },
              { value: '32%', label: 'Attributed leads rate' }
            ].map(stat => (
              <div key={stat.label} className="space-y-1">
                <p className="text-2xl font-bold text-neutral-950 font-mono">{stat.value}</p>
                <p className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. FUNNEL CALCULATOR FORECAST ================= */}
      <section id="forecast" className="py-20 bg-white border-b border-neutral-250/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: Controls */}
            <div className="lg:col-span-6 bg-slate-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest block mb-1">GROWTH LOOP FORECAST</span>
                <h3 className="text-xl font-display font-bold text-neutral-950">Visual Funnel Performance Forecast</h3>
                <p className="text-xs text-neutral-500">Select advocate scale presets and slide engagement levels to test organic conversions.</p>
              </div>

              {/* Tier presets */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Ambassador Cohort Size</span>
                <div className="grid grid-cols-3 gap-2">
                  {FUNNEL_TIERS.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-2.5 rounded-xl border text-[10px] font-bold text-center cursor-pointer transition-all ${
                        selectedTier.id === tier.id
                          ? 'bg-[color-mix(in_srgb,var(--indigo-500)_18%,#141418)] border-indigo-400/60 text-indigo-200'
                          : 'bg-[#111216] border-fixed-white/10 text-fixed-muted hover:border-fixed-white/20 hover:text-fixed-white'
                      }`}
                    >
                      <span className="block font-mono font-bold">{tier.members}</span>
                      <span className="block text-[9px] opacity-70 mt-0.5">{tier.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Activity Rate */}
              <div className="space-y-3.5 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-neutral-500">Activity &amp; Engagement Rate</span>
                  <span className="text-indigo-600 font-mono">{engagementRate}% active</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#20232b] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Custom micro-tip */}
              <div className="bg-[#141418] border border-fixed-white/12 rounded-2xl p-4 flex gap-3 text-xs leading-normal shadow-inner shadow-black/20">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                <p className="text-fixed-white font-medium">
                  At <strong className="text-sky-300">3.2%</strong> average click-through rate, your advocates bypass algorithm restrictions to deliver high-quality conversions directly.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Funnel Visualization Output */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-neutral-950 leading-snug text-wrap-balance">
                  Attribution Funnel Projections
                </h3>
              </div>

              {/* Funnel Stage rows */}
              <div className="space-y-3">
                {[
                  { stage: '1. Active Advocates', value: activeAdvocates.toLocaleString(), bar: (activeAdvocates / selectedTier.members) * 100, desc: 'Ambassadors sharing campaign alerts' },
                  { stage: '2. Network Impressions', value: estimatedImpressions.toLocaleString(), bar: 90, desc: 'Potential eyeballs reached' },
                  { stage: '3. Referral Clicks', value: estimatedClicks.toLocaleString(), bar: 65, desc: 'Attributed organic traffic' },
                  { stage: '4. Qualified Leads', value: estimatedLeads.toLocaleString(), bar: 40, desc: 'Attributed signups (at 8% conversion rate)' }
                ].map((item, index) => (
                  <div key={item.stage} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs relative overflow-hidden">
                    <div className="flex justify-between items-center text-xs relative z-10">
                      <div>
                        <span className="font-bold text-neutral-950 block">{item.stage}</span>
                        <span className="text-[10px] text-fixed-muted block mt-0.5">{item.desc}</span>
                      </div>
                      <span className="text-base font-mono font-bold text-neutral-950">{item.value}</span>
                    </div>
                    {/* Visual Funnel Bar indicator */}
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-indigo-600/10 transition-all duration-300"
                      style={{ width: `${item.bar}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Equivalent Media Value savings highlight card */}
              <div className="bg-indigo-600 text-fixed-white rounded-2xl p-4.5 flex justify-between items-center shadow-lg shadow-indigo-600/15">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-200 block">AD BUDGET SAVINGS</span>
                  <span className="text-xs text-indigo-100 block mt-0.5">Equivalent Media Value at $18.00 CPM</span>
                </div>
                <span className="text-2xl font-mono font-bold">${estimatedSavings.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5. CONSOLIDATED CAPABILITIES GRID ================= */}
      <section className="py-20 bg-white border-b border-neutral-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-purple-700 border border-purple-200/50">
              GROWTH CAPABILITIES
            </span>
            <h2 className="text-3xl font-display font-bold text-neutral-950 text-wrap-balance">
              Designed for High-Trust Marketing Teams
            </h2>
            <p className="text-sm text-neutral-600 text-wrap-pretty">
              Bypass ad network costs. Coordinate advocacy alerts, pre-approve messaging variants, verify referrals, and credit commissions automatically.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MessageSquare className="w-5 h-5 text-indigo-700" />,
                title: 'Segmented Webhook Dispatch',
                desc: 'Deliver sharing prompts to Discord, Slack channels, email, or a customized community ambassador portal.'
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-indigo-700" />,
                title: 'Compliance Whitelist Gates',
                desc: 'Verify that advocate variants meet guidelines, legal disclaimers, and brand compliance rules before release.'
              },
              {
                icon: <Award className="w-5 h-5 text-indigo-700" />,
                title: 'Gamified Incentive Sync',
                desc: 'Distribute reward payouts, commission keys, swag milestones, and point leaderboards dynamically without spreadsheets.'
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-indigo-700" />,
                title: 'Conversion Attribution Web',
                desc: 'Track conversions, page click-throughs, and equivalent CPM savings back to specific community advocate channels.'
              }
            ].map(cap => (
              <div
                key={cap.title}
                className="bg-slate-50 hover:bg-slate-100/60 border border-neutral-200/70 rounded-3xl p-6 transition-all hover:-translate-y-1"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 mb-5 border border-indigo-100">
                  {cap.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-950">{cap.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600 text-wrap-pretty">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. ULTRA-PREMIUM FINAL CTA SECTION ================= */}
      <section className="py-24 bg-[#0a0a0d] text-fixed-white relative overflow-hidden">
        {/* Glow ambient background circles with premium mesh effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.12)_0%,_transparent_65%)] pointer-events-none z-0" />
        <div className="absolute -right-24 bottom-0 w-[500px] h-[500px] bg-emerald-500/[0.04] blur-[140px] rounded-full pointer-events-none z-0" />
        <div className="absolute -left-24 top-0 w-[500px] h-[500px] bg-indigo-500/[0.06] blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-10">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-fixed-white/10 px-4 py-2 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-300 border border-fixed-white/5">
              🚀 PARTNERSHIP REQUEST
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-fixed-white leading-tight text-wrap-balance">
              Ready to scale your community reach?
            </h2>
            <p className="text-sm sm:text-base text-fixed-light leading-relaxed text-wrap-pretty max-w-2xl mx-auto">
              Get a customized Wozku rollout plan built specifically for your customer base, creators, and partner channels. Secure 100% compliance out-of-the-box.
            </p>
          </div>

          {/* Premium Email Signup / Request Form */}
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!ctaSubmitted ? (
                <motion.form
                  key="cta-form"
                  onSubmit={handleCtaSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    required
                    value={ctaEmail}
                    onChange={(e) => setCtaEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="flex-1 bg-[#141418] border border-fixed-white/10 focus:border-indigo-500 rounded-2xl px-4 py-3.5 text-sm font-medium text-fixed-white placeholder:text-fixed-muted focus:outline-hidden transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-white/5 cursor-pointer"
                  >
                    Request Invite
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="cta-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-indigo-600/15 border border-indigo-500/30 rounded-2xl py-4 px-6 text-sm text-indigo-300 font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  Thanks! We'll send your community pilot builder guide within 12 hours.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Compliance & Trust Flags */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 border-t border-fixed-white/5 text-fixed-muted text-xs font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-indigo-400/80" /> GDPR &amp; SOC2 Type II Certified</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-indigo-400/80" /> Whitelisted Compliant Gates</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-indigo-400/80" /> Stripe &amp; Reward Payout Ready</span>
          </div>
        </div>
      </section>

    </main>
  );
}
