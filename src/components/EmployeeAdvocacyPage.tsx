import React, { useState, useEffect, useRef } from 'react';
import {
  Bell, BookOpen, ShieldCheck, Trophy,
  ArrowRight, RefreshCw, Share2, CheckCircle2,
  TrendingUp, Users, DollarSign, Zap,
  Award, BarChart2, ChevronDown,
  Sparkles, Send, Gift, Star
} from 'lucide-react';
import linkedInIcon from '../assets/linkedin-filled.svg';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

// ---- Confetti System ----
interface ConfettiParticle {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; rotation: number; rotationSpeed: number;
}
const CONFETTI_COLORS = ['#4f46e5','#6366f1','#10b981','#f59e0b','#06b6d4','#a3e635'];

const playSynthSound = (type: 'share' | 'unlock' | 'claim') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (type === 'share') {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08); osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    } else if (type === 'unlock') {
      [880, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'triangle'; osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.35);
      });
    } else if (type === 'claim') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.3);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06); osc.stop(ctx.currentTime + i * 0.06 + 0.3);
      });
    }
  } catch (e) { console.warn('Audio synthesis failed:', e); }
};

const CAMPAIGN_PRESETS = [
  { id: 'product', label: 'Product Launch', tag: '🚀 Launch', hashtag: '#WozkuLaunch', post: "Thrilled to share: Wozku just shipped our most powerful advocacy engine yet. Organic reach, fully automated. The future of brand distribution is here. #WozkuLaunch" },
  { id: 'hiring', label: 'Job Opening', tag: '💼 Hiring', hashtag: '#WozkuHiring', post: "We're growing! Wozku is hiring across Product, Engineering & Sales. If you want to build something that changes how brands grow — let's talk. #WozkuHiring" },
  { id: 'thought', label: 'Thought Leadership', tag: '💡 Insight', hashtag: '#WozkuInsights', post: "Wozku's latest research: employee-shared content gets 8× more engagement than brand posts. The trust economy is real. #WozkuInsights #EmployeeAdvocacy" },
  { id: 'event', label: 'Event Announcement', tag: '📅 Event', hashtag: '#WozkuEvent', post: "Representing Wozku at the Global SaaS Summit next week! Come find us — we'll be demoing how companies 10× their organic reach with zero paid media. #WozkuEvent" },
];

const LEADERBOARD_BASE = [
  { name: 'Priya Sharma', dept: 'Marketing', xp: 3200, avatar: 'PS' },
  { name: 'James Holloway', dept: 'Product', xp: 2750, avatar: 'JH' },
  { name: 'Sofia Andersson', dept: 'Engineering', xp: 1900, avatar: 'SA' },
];

const AVATAR_COLORS = ['bg-secondary-100 text-secondary-700', 'bg-sky-100 text-sky-700', 'bg-rose-100 text-rose-700', 'bg-yellow-100 text-yellow-700'];

export default function EmployeeAdvocacyPage() {
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4>(1);
  const [employeeName, setEmployeeName] = useState('Alex Mercer');
  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGN_PRESETS[0]);
  const [userClaimedReward, setUserClaimedReward] = useState(false);
  const [liveShares, setLiveShares] = useState(0);
  const [liveImpressions, setLiveImpressions] = useState(0);
  const [liveAdValue, setLiveAdValue] = useState(0);
  const [userXP, setUserXP] = useState(0);
  const [employees, setEmployees] = useState(500);
  const [avgConnections, setAvgConnections] = useState(1200);
  const [participationRate, setParticipationRate] = useState(40);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);
    const tick = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.rotation += p.rotationSpeed;
        ctx2d.save(); ctx2d.translate(p.x, p.y); ctx2d.rotate((p.rotation * Math.PI) / 180);
        ctx2d.fillStyle = p.color; ctx2d.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx2d.restore();
        if (p.y > canvas.height + 20) pts.splice(i, 1);
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [simStep]);

  const spawnConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newPts: ConfettiParticle[] = [];
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 9;
      newPts.push({
        x: canvas.width / 2, y: canvas.height / 2 - 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 5 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: -8 + Math.random() * 16,
      });
    }
    particlesRef.current = [...particlesRef.current, ...newPts];
  };

  const totalAdvocates = Math.round(employees * (participationRate / 100));
  const totalImpressions = totalAdvocates * avgConnections;
  const equivalentAdValue = Math.round((totalImpressions / 1000) * 18);

  const buildLeaderboard = () => {
    if (simStep !== 4) return LEADERBOARD_BASE.map((item, idx) => ({ ...item, rank: idx + 1, isUser: false }));
    const roster = [...LEADERBOARD_BASE.map(item => ({ ...item, isUser: false })), { name: employeeName, dept: 'You', xp: userXP, avatar: employeeName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2), isUser: true }];
    return roster.sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));
  };
  const leaderboardRows = buildLeaderboard();

  const handleSendCampaign = () => {
    if (!employeeName.trim()) return;
    setSimStep(2);
    playSynthSound('share');
    setTimeout(() => setSimStep(3), 2200);
  };

  const handleSharePost = () => {
    setSimStep(4);
    setUserXP(0); setLiveShares(0); setLiveImpressions(0); setLiveAdValue(0);
    playSynthSound('share');
    setTimeout(() => spawnConfetti(), 120);

    for (let i = 1; i <= 70; i++) {
      setTimeout(() => {
        const p = i / 70;
        setLiveShares(Math.round(847 * p));
        setLiveImpressions(Math.round(24600 * p));
        setLiveAdValue(Math.round(443 * p));
      }, i * 30);
    }

    [{ xp: 800, delay: 700 }, { xp: 1600, delay: 1500 }, { xp: 2400, delay: 2300 }, { xp: 3400, delay: 3100 }].forEach(({ xp, delay }, idx) => {
      setTimeout(() => {
        setUserXP(xp);
        if (idx === 3) { playSynthSound('unlock'); setTimeout(() => spawnConfetti(), 80); }
      }, delay);
    });
  };

  const handleClaimReward = () => {
    setUserClaimedReward(true);
    playSynthSound('claim');
    setTimeout(() => spawnConfetti(), 80);
  };

  const handleReset = () => {
    setSimStep(1); setUserClaimedReward(false); setUserXP(0);
    setLiveShares(0); setLiveImpressions(0); setLiveAdValue(0);
    particlesRef.current = [];
  };

  const STEPS = [
    { n: 1, label: 'Setup Campaign', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { n: 2, label: 'Notify Employee', icon: <Bell className="w-3.5 h-3.5" /> },
    { n: 3, label: 'Review & Share', icon: <Share2 className="w-3.5 h-3.5" /> },
    { n: 4, label: 'Live Results', icon: <BarChart2 className="w-3.5 h-3.5" /> },
  ];

  const initials = employeeName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'AM';

  return (
    <main className="min-h-screen bg-white font-sans text-neutral-900 overflow-hidden">

      {/* ============================================================
          HERO — TWO COLUMN SPLIT
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-[#05070b] dark:via-[#090b10] dark:to-[#0f1724] border-b border-neutral-200/60 dark:border-fixed-white/5">

        {/* Background halos */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-400/[0.06] dark:bg-indigo-500/[0.12] rounded-full blur-[160px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.04] dark:bg-cyan-500/[0.08] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT: Copy */}
            <div className="space-y-7">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-[color-mix(in_srgb,var(--indigo-500)_12%,#141418)] border border-indigo-200 dark:border-indigo-400/30 px-3 py-1.5 rounded-full uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  Employee Advocacy
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-fixed-white leading-[1.08]">
                Your employees are your most trusted<br />
                <span className="relative">
                  <span className="text-indigo-600">
                    distribution network.
                  </span>
                </span>
              </h1>

              <p className="text-base text-neutral-600 dark:text-fixed-light leading-relaxed max-w-lg">
                Wozku automates employee advocacy at scale. Pre-approved campaigns land in Slack or email — employees share in one tap, and your brand multiplies across thousands of trusted personal networks.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-5 text-xs font-semibold text-neutral-500 dark:text-fixed-muted">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />Works inside Slack & Email</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />Legal pre-approves every post</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />No new app for employees</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a href="#simulator" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3.5 px-7 rounded-2xl text-sm transition-all shadow-md shadow-indigo-600/20 cursor-pointer">
                  Try the Simulator <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#roi-calculator" className="inline-flex items-center gap-2 bg-white dark:bg-[#141418] border border-neutral-200 dark:border-fixed-white/10 hover:border-neutral-300 dark:hover:border-fixed-white/20 text-neutral-700 dark:text-fixed-white font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer">
                  Calculate My Reach
                </a>
              </div>
            </div>

            {/* RIGHT: Floating UI Mockups */}
            <div className="relative h-[440px] hidden lg:block">

              {/* Slack notification card */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 left-0 w-[300px] bg-white dark:bg-[#0e1014] border border-neutral-200 dark:border-fixed-white/10 rounded-2xl p-4 shadow-xl shadow-neutral-200/60 dark:shadow-black/30 z-10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                    <span className="text-fixed-white text-[9px] font-black">W</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-900 block">Wozku Bot</span>
                    <span className="text-[9px] text-neutral-400 font-mono">via Slack · just now</span>
                  </div>
                  <span className="ml-auto text-[8px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">NEW</span>
                </div>
                <p className="text-[10px] text-neutral-700 leading-relaxed border-t border-neutral-100 pt-2 font-sans">
                  Hey <span className="font-bold text-indigo-700">@Alex</span> — a new campaign is ready for your network: <span className="font-semibold">Product Launch 🚀</span>. Share in 1 tap.
                </p>
                <div className="mt-2 bg-indigo-600 text-fixed-white text-[9px] font-bold text-center py-1.5 rounded-lg cursor-pointer">
                  View &amp; Share →
                </div>
              </motion.div>

              {/* LinkedIn post card */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-16 right-0 w-[280px] bg-white border border-neutral-200 rounded-2xl p-4 shadow-xl shadow-neutral-200/60 z-20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700">AM</div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-900 block">Alex Mercer</span>
                    <div className="flex items-center gap-1"><img src={linkedInIcon} alt="LinkedIn" className="w-2.5 h-2.5" /><span className="text-[9px] text-neutral-400">LinkedIn · 1st</span></div>
                  </div>
                </div>
                <p className="text-[9px] text-neutral-700 leading-relaxed line-clamp-3 font-sans">
                  Thrilled to share: Wozku just shipped our most powerful advocacy engine yet. Organic reach, fully automated. The future of brand distribution is here...
                </p>
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-neutral-100">
                  <span className="text-[9px] text-neutral-400">👍 47 · 💬 12 · ↗ 8 shares</span>
                </div>
              </motion.div>

              {/* Metric pill */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 right-8 -translate-y-1/2 bg-indigo-600 text-fixed-white rounded-2xl px-5 py-3 shadow-lg shadow-indigo-600/30 z-30 text-center"
              >
                <span className="text-2xl font-mono font-extrabold block">8×</span>
                <span className="text-[9px] font-semibold opacity-80 block mt-0.5">More Engagement</span>
                <span className="text-[8px] opacity-60 font-mono">vs brand posts</span>
              </motion.div>

              {/* Subtle grid dots */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,#0d948820_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SIMULATOR — FULL-WIDTH STEPPER LAYOUT
          ============================================================ */}
      <section id="simulator" className="py-20 bg-slate-50/60 border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">
              The Employee Advocacy Loop
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
              From comms team to viral post in under 60 seconds. Step through the full campaign flow below.
            </p>
          </div>

          {/* Step Tab Navigator */}
          <div className="flex items-stretch bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs mb-8">
            {STEPS.map(({ n, label, icon }) => (
              <button
                key={n}
                onClick={() => { if (n <= simStep || n === 1) { handleReset(); if (n !== 1) {} } }}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 px-2 text-center transition-all relative cursor-default ${
                  simStep === n
                    ? 'bg-indigo-600 text-fixed-white'
                    : simStep > n
                    ? 'bg-[color-mix(in_srgb,var(--indigo-500)_18%,#141418)] text-indigo-300'
                    : 'text-neutral-400'
                }`}
              >
                {/* Connector line */}
                {n > 1 && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-px w-px ${simStep >= n ? 'bg-indigo-400' : 'bg-neutral-200'}`} />
                )}
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-mono font-extrabold border ${
                    simStep === n ? 'border-fixed-white/30 bg-fixed-white/20' : simStep > n ? 'border-indigo-400/40 bg-[color-mix(in_srgb,var(--indigo-500)_20%,#141418)]' : 'border-neutral-200 bg-neutral-100'
                }`}>
                  {simStep > n ? <CheckCircle2 className="w-3.5 h-3.5" /> : n}
                </span>
                <div className="flex items-center gap-1">
                  {icon}
                  <span className="text-[10px] font-bold hidden sm:inline">{label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Confetti canvas */}
          <div className="relative">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-3xl" />

            <AnimatePresence mode="wait">

              {/* ---- STEP 1: Campaign Setup ---- */}
              {simStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Campaign form */}
                    <div className="bg-white border border-neutral-200/70 rounded-3xl p-8 shadow-xs space-y-5">
                      <div>
                        <span className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest block mb-1">COMMS DASHBOARD</span>
                        <h3 className="text-base font-bold text-neutral-950">Create New Campaign</h3>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Choose a campaign type and assign it to your team.</p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Employee Name</label>
                        <input
                          type="text" value={employeeName}
                          onChange={(e) => setEmployeeName(e.target.value.slice(0, 24))}
                          placeholder="Your name..."
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-hidden transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Campaign Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {CAMPAIGN_PRESETS.map(c => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedCampaign(c)}
                              className={`p-3 rounded-xl border text-left text-[10px] font-bold transition-all cursor-pointer ${
                                selectedCampaign.id === c.id
                                  ? 'bg-[color-mix(in_srgb,var(--indigo-500)_18%,#141418)] border-indigo-400/60 text-indigo-200'
                                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                              }`}
                            >
                              <span className="block mb-0.5">{c.tag}</span>
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleSendCampaign}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20"
                      >
                        <Send className="w-4 h-4" /> Send to Employee
                      </button>
                    </div>

                    {/* Campaign library preview */}
                    <div className="bg-white border border-neutral-200/70 rounded-3xl p-8 shadow-xs space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block mb-1">CONTENT LIBRARY</span>
                        <h3 className="text-base font-bold text-neutral-950">"{selectedCampaign.label}" Draft</h3>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Pre-approved by Legal &amp; Comms</p>
                      </div>

                      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                            {initials}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-neutral-900 block">{employeeName}</span>
                            <div className="flex items-center gap-1"><img src={linkedInIcon} alt="LinkedIn" className="w-2.5 h-2.5" /><span className="text-[9px] text-neutral-400">LinkedIn</span></div>
                          </div>
                          <span className="ml-auto text-[8px] font-mono font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">APPROVED</span>
                        </div>
                        <p className="text-[10px] text-neutral-700 leading-relaxed font-sans">{selectedCampaign.post}</p>
                        <span className="text-[9px] font-mono font-semibold text-yellow-600">{selectedCampaign.hashtag}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center">
                        {[{ label: 'Est. Reach', value: '1,200–2,400' }, { label: 'Ad Value', value: '$22–$43' }].map(({ label, value }) => (
                          <div key={label} className="bg-[color-mix(in_srgb,var(--indigo-500)_14%,#141418)] border border-indigo-400/35 rounded-xl p-3">
                            <span className="text-[10px] font-mono font-extrabold text-indigo-700 block">{value}</span>
                            <span className="text-[9px] text-indigo-600">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ---- STEP 2: Slack Notification ---- */}
              {simStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
                  className="flex items-center justify-center py-8"
                >
                  <div className="max-w-sm w-full space-y-5 text-center">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest">NOTIFICATION DISPATCHED</p>
                      <h3 className="text-lg font-bold text-neutral-950">Campaign sent to {employeeName}</h3>
                    </div>

                    {/* Animated Slack card */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xl text-left space-y-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                          <span className="text-fixed-white text-[10px] font-black">W</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-neutral-900 block">Wozku Bot</span>
                          <span className="text-[9px] text-neutral-400 font-mono">#employee-advocacy · just now</span>
                        </div>
                        <motion.span
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                        />
                      </div>
                      <div className="bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl pl-3 pr-3 py-2.5 text-[10px] text-neutral-700 leading-relaxed">
                        Hey <span className="font-bold text-indigo-700">@{employeeName}</span> 👋<br />
                        A new campaign is ready for your network:<br />
                        <span className="font-semibold">{selectedCampaign.tag} {selectedCampaign.label}</span><br />
                        Share it on LinkedIn — takes 10 seconds.
                      </div>
                      <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="bg-indigo-600 text-fixed-white text-[10px] font-bold text-center py-2 rounded-xl"
                      >
                        View &amp; Share Campaign →
                      </motion.div>
                    </motion.div>

                    <p className="text-[10px] text-neutral-400 font-mono animate-pulse">Opening post preview for {employeeName}...</p>
                  </div>
                </motion.div>
              )}

              {/* ---- STEP 3: Post Preview & Share ---- */}
              {simStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                    {/* Post preview */}
                    <div className="md:col-span-3 bg-white border border-neutral-200/70 rounded-3xl p-8 shadow-xs space-y-5">
                      <div>
                        <span className="text-[10px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block mb-1">EMPLOYEE VIEW · LinkedIn</span>
                        <h3 className="text-base font-bold text-neutral-950">Your Post is Ready</h3>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Pre-approved by your comms team. Review before sharing.</p>
                      </div>

                      {/* LinkedIn-style preview */}
                      <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center font-mono text-xs font-bold text-indigo-700">{initials}</div>
                            <div>
                              <span className="text-sm font-bold text-neutral-900 block">{employeeName}</span>
                              <span className="text-[10px] text-neutral-500">LinkedIn · Sharing to your network · 🌐</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-800 leading-relaxed font-sans">{selectedCampaign.post}</p>
                          <span className="text-[10px] font-semibold text-[#0077B5]">{selectedCampaign.hashtag}</span>
                        </div>
                        {/* Engagement bar */}
                        <div className="border-t border-neutral-100 px-4 py-2.5 flex items-center gap-4 text-[10px] text-neutral-400">
                          <span>👍 Like</span><span>💬 Comment</span><span>↗ Repost</span><span>📤 Send</span>
                        </div>
                      </div>

                      <button
                        onClick={handleSharePost}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3.5 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      >
                        <img src={linkedInIcon} alt="LinkedIn" className="w-4 h-4" /> Approve &amp; Share to LinkedIn
                      </button>
                    </div>

                    {/* Compliance + estimated reach sidebar */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-700">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="text-xs font-bold">Compliance Verified</span>
                        </div>
                        <p className="text-[10px] text-emerald-600 leading-relaxed">This post was reviewed and approved by your Legal and Communications team.</p>
                        <div className="space-y-1 pt-1">
                          {['On-brand language ✓', 'Legal disclaimers ✓', 'No sensitive claims ✓'].map(item => (
                            <div key={item} className="text-[10px] font-mono font-semibold text-emerald-700">{item}</div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 space-y-3">
                        <span className="text-[10px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block">ESTIMATED IMPACT</span>
                        {[
                          { label: 'Your reach', value: '~1,200', color: 'text-indigo-600' },
                          { label: 'Est. impressions', value: '~3,600', color: 'text-indigo-600' },
                          { label: 'Ad value equiv.', value: '$64', color: 'text-emerald-600' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="flex items-center justify-between">
                            <span className="text-[10px] text-neutral-500">{label}</span>
                            <span className={`text-xs font-mono font-extrabold ${color}`}>{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 space-y-1.5">
                        <div className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-amber-600" /><span className="text-[10px] font-bold text-amber-800">Reward Waiting</span></div>
                        <p className="text-[10px] text-amber-700">Share this post to earn <span className="font-bold">+800 XP</span> and unlock an Amazon $25 Gift Card reward milestone.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ---- STEP 4: Live Results Dashboard ---- */}
              {simStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <div className="space-y-5">

                    {/* Success + reset bar */}
                    <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-900">Post shared by {employeeName} — campaign is live!</span>
                      </div>
                      <button onClick={handleReset} className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 hover:text-neutral-700 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg cursor-pointer transition-all">
                        <RefreshCw className="w-3 h-3" /> Reset
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                      {/* Live Metrics */}
                      <div className="md:col-span-4 space-y-3">
                        <span className="text-[9px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block">LIVE METRICS</span>
                        {[
                          { icon: <Share2 className="w-4 h-4" />, label: 'Network Shares', value: liveShares.toLocaleString(), bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-700', val: 'text-indigo-700' },
                          { icon: <Users className="w-4 h-4" />, label: 'Total Impressions', value: liveImpressions.toLocaleString(), bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-600', val: 'text-indigo-700' },
                          { icon: <DollarSign className="w-4 h-4" />, label: 'Ad Value Saved', value: `$${liveAdValue.toLocaleString()}`, bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-600', val: 'text-emerald-700' },
                        ].map(({ icon, label, value, bg, text, val }) => (
                          <div key={label} className={`${bg} border rounded-2xl p-4 flex items-center gap-3`}>
                            <div className={`${text} shrink-0`}>{icon}</div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-semibold text-neutral-500 block">{label}</span>
                              <motion.span key={value} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className={`text-lg font-mono font-extrabold ${val} block`}>{value}</motion.span>
                            </div>
                          </div>
                        ))}

                        {/* Reward */}
                        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 space-y-2">
                          <div className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-amber-600" /><span className="text-[10px] font-bold text-amber-800">Amazon Gift Card — $25</span></div>
                          {userClaimedReward ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 py-2 rounded-xl text-[10px] font-bold text-center flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Reward Claimed!
                            </div>
                          ) : (
                            <button onClick={handleClaimReward} className="w-full bg-amber-500 hover:bg-amber-400 text-fixed-white text-[10px] font-bold py-2 rounded-xl cursor-pointer transition-all">Claim Reward</button>
                          )}
                        </div>
                      </div>

                      {/* Company Leaderboard */}
                      <div className="md:col-span-4 bg-white border border-neutral-200/70 rounded-3xl p-6 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest">COMPANY LEADERBOARD</span>
                          <span className="text-[8px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">LIVE</span>
                        </div>
                        <LayoutGroup id="emp-leaderboard">
                          <div className="space-y-2">
                            {leaderboardRows.map((item, i) => (
                              <motion.div
                                key={item.name} layout layoutId={`emp-lb-${item.name}`}
                                transition={{ layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } }}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl border ${item.isUser ? 'bg-[color-mix(in_srgb,var(--indigo-500)_16%,#141418)] border-indigo-400/45' : 'bg-neutral-50 border-neutral-100'}`}
                              >
                                <span className={`text-[10px] font-mono font-extrabold w-4 text-center ${item.isUser ? 'text-indigo-600' : 'text-neutral-400'}`}>{item.rank}</span>
                                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{item.avatar}</div>
                                <div className="flex-1 min-w-0">
                                  <span className={`text-[10px] font-bold block truncate ${item.isUser ? 'text-indigo-900' : 'text-neutral-800'}`}>{item.name}{item.isUser ? ' (You)' : ''}</span>
                                  <span className={`text-[9px] block truncate ${item.isUser ? 'text-indigo-600' : 'text-neutral-400'}`}>{item.dept}</span>
                                </div>
                                <AnimatePresence mode="popLayout">
                                  <motion.span
                                    key={`xp-${item.name}-${item.xp}`}
                                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className={`text-[10px] font-mono font-extrabold shrink-0 ${item.isUser ? 'text-indigo-600' : 'text-neutral-400'}`}
                                  >
                                    {item.xp.toLocaleString()}
                                  </motion.span>
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </div>
                        </LayoutGroup>
                      </div>

                      {/* Boost XP tips */}
                      <div className="md:col-span-4 bg-white border border-neutral-200/70 rounded-3xl p-6 shadow-xs space-y-3">
                        <span className="text-[9px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block">EARN MORE XP</span>
                        {[
                          { icon: <Share2 className="w-3.5 h-3.5" />, label: 'Share on Twitter too', val: '+250 XP', color: 'text-indigo-600 bg-indigo-50' },
                          { icon: <Star className="w-3.5 h-3.5" />, label: '10+ post reactions', val: '+300 XP', color: 'text-amber-600 bg-amber-50' },
                          { icon: <TrendingUp className="w-3.5 h-3.5" />, label: '3-month streak', val: '+500 XP', color: 'text-indigo-600 bg-indigo-50' },
                          { icon: <Users className="w-3.5 h-3.5" />, label: 'Refer a colleague', val: '+800 XP', color: 'text-secondary-600 bg-secondary-50' },
                        ].map(({ icon, label, val, color }) => (
                          <div key={label} className="flex items-center gap-2.5 p-2.5 bg-neutral-50 border border-neutral-100 rounded-xl">
                            <div className={`${color} rounded-lg p-1.5 shrink-0`}>{icon}</div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-semibold text-neutral-700 block">{label}</span>
                            </div>
                            <span className="text-[10px] font-mono font-extrabold text-indigo-600 shrink-0">{val}</span>
                          </div>
                        ))}
                        <p className="text-[9px] text-neutral-400 leading-relaxed pt-1">Top advocates unlock swag, exec spotlights, and event access.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS — NUMBERED PIPELINE
          ============================================================ */}
      <section className="py-20 bg-white border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">Built for Corporate Scale</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
              Everything your comms team needs to run a compliant, measurable programme. Zero friction for employees.
            </p>
          </div>

          {/* Asymmetric feature layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Big feature card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-fixed-white rounded-3xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden shadow-lg shadow-indigo-600/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
              <div className="h-12 w-12 bg-fixed-white/15 rounded-2xl flex items-center justify-center mb-4 border border-fixed-white/20">
                <BookOpen className="w-6 h-6 text-fixed-white" />
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-bold font-display">Smart Campaign Library</h3>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  Pre-written, brand-approved posts auto-served to the right employees by role, team, seniority, or location. Your comms team creates once — the system delivers to thousands.
                </p>
              </div>
            </div>

            {/* 3 smaller cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Bell className="w-5 h-5" />, title: 'Slack & Email Integration', desc: "Push campaigns into Slack or inboxes. Employees share in one tap — no new app, no new login." },
                { icon: <ShieldCheck className="w-5 h-5" />, title: 'Compliance Controls', desc: 'Legal pre-approves every post variant before it reaches employees — zero rogue shares.' },
                { icon: <Trophy className="w-5 h-5" />, title: 'Leaderboard & Rewards', desc: 'Automated XP, monthly rankings, and redeemable rewards drive sustained participation.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white border border-neutral-200/60 rounded-2xl p-5 space-y-3 hover:border-indigo-200 hover:shadow-sm transition-all shadow-2xs">
                  <div className="h-9 w-9 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">{icon}</div>
                  <h3 className="text-xs font-bold text-neutral-950 font-display leading-snug">{title}</h3>
                  <p className="text-[10px] text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ROI CALCULATOR
          ============================================================ */}
      <section id="roi-calculator" className="py-20 bg-slate-50/60 border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">Employee Network Amplifier</h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
              Calculate the organic reach your team can generate — and the paid media budget you eliminate entirely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
            <div className="lg:col-span-6 bg-white border border-neutral-200/60 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase">CALCULATOR CONTROLS</span>
                {[
                  { label: 'Total Employees', value: employees, min: 50, max: 10000, step: 50, set: setEmployees, fmt: (v: number) => v.toLocaleString() },
                  { label: 'Avg. LinkedIn Connections', value: avgConnections, min: 200, max: 5000, step: 100, set: setAvgConnections, fmt: (v: number) => v.toLocaleString() },
                  { label: 'Participation Rate', value: participationRate, min: 5, max: 90, step: 5, set: setParticipationRate, fmt: (v: number) => `${v}%` },
                ].map(({ label, value, min, max, step, set, fmt }) => (
                  <div key={label} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-neutral-700">{label}</span>
                      <span className="text-indigo-600 font-mono font-bold">{fmt(value)}</span>
                    </div>
                    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(parseInt(e.target.value))} className="w-full accent-indigo-600 h-1 bg-neutral-100 rounded-lg cursor-pointer appearance-none" />
                    <div className="flex justify-between text-[9px] text-neutral-400 font-mono"><span>{fmt(min)}</span><span>{fmt(max)}</span></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[9px] font-mono text-neutral-400">MULTIPLIER ALGORITHM LOCKED</span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0a0a0d] border border-fixed-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-xs text-fixed-white">
              <div className="space-y-5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-fixed-muted uppercase">PROJECTED VALUE</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#141418] border border-fixed-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-fixed-light mb-1"><Users className="w-3.5 h-3.5" /><span className="text-[10px] font-bold font-mono uppercase">ADVOCATES</span></div>
                    <span className="text-2xl font-mono font-extrabold">{totalAdvocates.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#141418] border border-fixed-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-fixed-light mb-1"><TrendingUp className="w-3.5 h-3.5" /><span className="text-[10px] font-bold font-mono uppercase">IMPRESSIONS</span></div>
                    <span className="text-2xl font-mono font-extrabold text-teal-400">{totalImpressions.toLocaleString()}</span>
                  </div>
                </div>
                  <div className="bg-gradient-to-br from-[#202040] to-[#141418] border border-indigo-900/40 p-6 rounded-2xl flex items-center justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.12)_0%,transparent_60%)]" />
                  <div className="space-y-1 relative z-10">
                    <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-indigo-400" /><span className="text-[10px] font-bold font-mono uppercase text-fixed-light">MEDIA VALUE</span></div>
                    <span className="text-3xl font-mono font-extrabold">${equivalentAdValue.toLocaleString()}</span>
                  </div>
                  <div className="text-right text-[10px] font-mono text-fixed-light relative z-10 space-y-0.5">
                    <span className="block text-indigo-400 font-bold">SAVED AD SPEND</span>
                    <span className="block font-bold">CPM base: $18.00</span>
                  </div>
                </div>
              </div>
              <div className="pt-5 border-t border-fixed-white/10 mt-5 text-[10px] text-fixed-light flex items-center justify-between">
                <span>PROJECTED SOCIAL CPM</span>
                <span className="font-mono text-fixed-white font-bold">$18.00 USD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BOOK A DEMO CTA
          ============================================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0d] border border-fixed-white/10 p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(79,70,229,0.15)_0%,transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.10)_0%,transparent_55%)] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-block text-[9px] font-mono font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md uppercase tracking-widest">
                Ready to mobilize your team?
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-fixed-white leading-tight tracking-tight">
                Turn every employee post into<br />
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
                  compounding brand reach.
                </span>
              </h2>
              <p className="text-sm text-fixed-light max-w-lg mx-auto leading-relaxed">
                Our team will walk you through a live setup tailored to your company size and content strategy. Get your first campaign live in under 48 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-1">
                {[{ value: '48h', label: 'First campaign live' }, { value: '8×', label: 'More engagement' }, { value: '$0', label: 'Paid media needed' }].map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <span className="text-sm font-mono font-extrabold text-indigo-300">{value}</span>
                    <span className="text-[10px] text-neutral-500 font-semibold">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3.5 px-8 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/25 cursor-pointer group"
                >
                  Book a Live Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a href="#simulator" className="inline-flex items-center gap-1.5 bg-fixed-white/8 hover:bg-fixed-white/12 border border-fixed-white/10 text-fixed-light hover:text-fixed-white font-semibold py-3.5 px-6 rounded-2xl text-sm cursor-pointer transition-all">
                  Replay the Simulator
                </a>
              </div>
              <p className="text-[10px] text-neutral-600 font-mono">No commitment · Setup in 48 hours · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
