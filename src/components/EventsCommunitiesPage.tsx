import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  QrCode, 
  RefreshCw, 
  Share2, 
  TrendingUp, 
  Users, 
  Award, 
  Zap, 
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Tv,
  Gift,
  Star,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ---- Confetti System ----
interface ConfettiParticle {
  x: number; y: number;
  vx: number; vy: number;
  color: string; size: number;
  rotation: number; rotationSpeed: number;
}
const CONFETTI_COLORS = ['#6366f1','#a855f7','#10b981','#f59e0b','#ef4444','#06b6d4'];

const playSynthSound = (type: 'share' | 'unlock' | 'claim') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (type === 'share') {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.08);
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

const playChime = (freq: number, type: 'sine' | 'square' = 'sine') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (type === 'sine') {
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);
    }
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.warn('Audio chime failed:', e);
  }
};

const LEADERBOARD_INITIAL = [
  { name: 'David Lee', xp: 1200, avatar: 'DL' },
  { name: 'Elena Rostova', xp: 950, avatar: 'ER' },
  { name: 'Marcus Vance', xp: 780, avatar: 'MV' },
];

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EventsCommunitiesPage() {
  const [attendeeName, setAttendeeName] = useState('Alex Mercer');
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4>(1);
  const [userClaimedReward, setUserClaimedReward] = useState(false);
  const [leaderboardFlash, setLeaderboardFlash] = useState(false);
  const [userRank, setUserRank] = useState(4);
  const [userXP, setUserXP] = useState(250);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);

  // Confetti animation loop
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
    const x = canvas.width / 2;
    const y = canvas.height / 2 - 60;
    const newPts: ConfettiParticle[] = [];
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 9;
      newPts.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
        rotationSpeed: -6 + Math.random() * 12,
      });
    }
    particlesRef.current = [...particlesRef.current, ...newPts];
  };

  const handleSimulateScan = () => {
    if (!attendeeName.trim()) return;
    setSimStep(2);
    playChime(587.33); // D5 chime
  };

  const handleSimulateShare = () => {
    setSimStep(3);
    playSynthSound('share');
    setTimeout(() => {
      setSimStep(4);
      setUserXP(1450);
      setLeaderboardFlash(true);
      playSynthSound('unlock');
      setTimeout(() => {
        setLeaderboardFlash(false);
        spawnConfetti();
      }, 1500);
    }, 2000);
  };

  const handleClaimReward = () => {
    setUserClaimedReward(true);
    playSynthSound('claim');
  };

  const handleReset = () => {
    setSimStep(1);
    setUserXP(250);
    setUserRank(4);
    setUserClaimedReward(false);
  };

  const getLeaderboardRows = () => {
    const base = LEADERBOARD_INITIAL.map(item => ({ ...item, isUser: false }));
    if (simStep < 4) {
      return [...base, { name: attendeeName, xp: userXP, isUser: true, avatar: attendeeName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) }].sort((a,b)=>b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));
    }
    return [...base, { name: attendeeName, xp: userXP, isUser: true, avatar: attendeeName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) }].sort((a,b)=>b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));
  };
  const leaderboardRows = getLeaderboardRows();

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-hidden selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.07),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <FadeIn>
            <span className="inline-flex items-center gap-1.5 text-[9.5px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" /> For Events & Communities
            </span>
          </FadeIn>
          
          <FadeIn delay={0.05}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-neutral-950 tracking-tight leading-tight">
              Turn event attendees and fans<br />
              <span className="text-indigo-600">into active recommenders.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Give your audience a fun way to share your story. Wozku allows event attendees, clients, and community members to scan a QR code, preview a ready-made post, share it on LinkedIn, and climb a live screen leaderboard on stage.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-7 py-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-indigo-500/20"
              >
                Schedule a Demo <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#event-simulator"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold px-7 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              >
                Try the Simulator
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 1: Phone & Leaderboard Simulator ── */}
      <section id="event-simulator" className="py-20 bg-slate-50/60 border-y border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[9.5px] uppercase font-mono tracking-widest text-indigo-650 font-extrabold block">TRY IT YOURSELF</span>
            <h2 className="text-3xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Experience the sharing loop live
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              See what an attendee experiences on their phone, and how the results update the event leaderboard in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Guide Instructions (Left) */}
            <div className="lg:col-span-3 flex flex-col justify-between py-2">
              <div className="space-y-5">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">HOW IT WORKS</span>
                <div className="space-y-4">
                  {[
                    { step: 1, label: 'Scan QR Code', desc: 'Attendees scan a QR code at your booth, opening the sharing portal on their phones.' },
                    { step: 2, label: 'Preview & Share', desc: 'They view a pre-approved post template and click share to publish to LinkedIn.' },
                    { step: 3, label: 'Earn Points', desc: 'Points unlock automatically on their phone as engagement metrics roll in.' },
                    { step: 4, label: 'Leaderboard Climb', desc: 'Watch their name climb the live projection leaderboard on stage.' }
                  ].map((s) => (
                    <div key={s.step} className="flex gap-3">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 ${
                        simStep === s.step ? 'bg-indigo-650 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {s.step}
                      </span>
                      <div>
                        <h4 className="text-[11.5px] font-bold text-neutral-850">{s.label}</h4>
                        <p className="text-[10.5px] text-neutral-500 mt-1 leading-normal">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-slate-200 hover:bg-white text-neutral-600 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Reset Simulator
                </button>
              </div>
            </div>

            {/* Mobile Mockup Phone (Center) */}
            <div className="lg:col-span-4 flex justify-center relative items-center">
              <canvas ref={canvasRef} className="absolute inset-0 z-35 pointer-events-none w-full h-full" />
              
              <div className="w-[280px] h-[550px] bg-neutral-950 rounded-[2.2rem] p-2 border-4 border-neutral-855 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-950 rounded-full z-30" />
                
                {/* Mobile screen */}
                <div className="w-full h-full bg-slate-50 rounded-[1.8rem] overflow-hidden flex flex-col justify-between pt-7 pb-3 px-3 relative z-10">
                  
                  <AnimatePresence mode="wait">
                    
                    {simStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col justify-between"
                      >
                        <div className="space-y-4 pt-1">
                          <div className="flex items-center gap-1.5 justify-center">
                            <QrCode className="w-4 h-4 text-indigo-650" />
                            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest font-mono">Scan Booth QR</span>
                          </div>
                          
                          <div className="bg-white border border-neutral-200 rounded-2xl p-3.5 text-center space-y-3">
                            <span className="text-[9px] font-mono text-neutral-400">BOOTH WEB PORTAL</span>
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-center aspect-square w-24 mx-auto shadow-inner">
                              <QrCode className="w-16 h-16 text-neutral-850" />
                            </div>
                            <p className="text-[10px] text-neutral-500 font-medium">
                              Enter your name below to simulate scanning this code on your phone.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={attendeeName}
                            onChange={(e) => setAttendeeName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-800 focus:outline-hidden focus:border-indigo-500 text-center"
                          />
                          <button
                            onClick={handleSimulateScan}
                            disabled={!attendeeName.trim()}
                            className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                          >
                            Simulate Scan
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {simStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col justify-between"
                      >
                        <div className="space-y-3 pt-1">
                          <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase">PREVIEW POST TEMPLATE</span>
                          
                          <div className="bg-white border border-neutral-200 rounded-xl p-3 space-y-3 shadow-3xs">
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-[9px] text-indigo-700">
                                {attendeeName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}
                              </span>
                              <div>
                                <div className="text-[10px] font-bold text-neutral-900 leading-tight">{attendeeName}</div>
                                <div className="text-[7.5px] text-neutral-400">At Wozku Summit</div>
                              </div>
                            </div>
                            <p className="text-[9.5px] text-neutral-600 leading-relaxed font-medium">
                              Had an amazing time learning about organic sharing tools at the Wozku Live Summit today! Check them out if you want to grow your brand. #WozkuSummit
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleSimulateShare}
                          className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                        >
                          Share on LinkedIn
                        </button>
                      </motion.div>
                    )}

                    {simStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center space-y-3"
                      >
                        <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center animate-spin">
                          <RefreshCw className="h-4.5 w-4.5 text-indigo-650" />
                        </div>
                        <h4 className="text-xs font-bold text-neutral-800">Delivering share...</h4>
                        <p className="text-[9px] text-neutral-400 text-center">
                          Registering post on LinkedIn servers.
                        </p>
                      </motion.div>
                    )}

                    {simStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col justify-between"
                      >
                        <div className="space-y-4 pt-1 text-center">
                          <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900">Share Approved!</h4>
                            <p className="text-[9px] text-neutral-400 mt-1">XP points successfully unlocked</p>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-3xs">
                            <span className="text-[8px] font-mono font-bold text-indigo-600 block uppercase">YOUR SCORE</span>
                            <div className="text-2xl font-mono font-bold text-indigo-950">1,450 XP</div>
                            <div className="text-[8px] text-neutral-400 font-sans">Wait a few seconds for leaderboard sync...</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-amber-500 shrink-0" />
                              <span className="text-[9.5px] font-bold text-neutral-700">Get Free Sticker</span>
                            </div>
                            <button
                              onClick={handleClaimReward}
                              disabled={userClaimedReward}
                              className={`text-[8.5px] font-bold px-2 py-0.5 rounded border transition-all cursor-pointer ${
                                userClaimedReward
                                  ? 'bg-slate-50 border-slate-200 text-neutral-400 cursor-not-allowed'
                                  : 'bg-indigo-50 border-indigo-200 text-indigo-750 hover:bg-indigo-100'
                              }`}
                            >
                              {userClaimedReward ? 'Claimed' : 'Claim'}
                            </button>
                          </div>
                          <button
                            onClick={handleReset}
                            className="w-full py-2 border border-slate-200 hover:bg-slate-100 text-neutral-600 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>
              </div>
            </div>

            {/* Live Stage Leaderboard Screen (Right) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-grid-dots-dark opacity-10 pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Tv className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h4 className="text-xs font-bold font-display text-white">Event Leaderboard</h4>
                      <p className="text-[9px] text-neutral-400">Live Stage Screen View</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase animate-pulse">
                    Live Sync
                  </span>
                </div>

                <div className="space-y-2">
                  {leaderboardRows.map((row) => (
                    <motion.div
                      key={row.name}
                      layoutId={`lead-${row.name}`}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        row.isUser
                          ? leaderboardFlash
                            ? 'bg-emerald-500/30 border-emerald-500 text-white scale-[1.03] shadow-md shadow-emerald-500/10'
                            : 'bg-indigo-500/20 border-indigo-500 text-indigo-100 scale-[1.01] shadow-md'
                          : 'bg-white/5 border-white/5 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-neutral-500">#{row.rank}</span>
                        <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                          row.isUser ? 'bg-indigo-650 text-white' : 'bg-white/10 text-white'
                        }`}>
                          {row.avatar}
                        </div>
                        <span className="text-xs font-bold">{row.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {row.xp} XP
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center relative z-10">
                <p className="text-[10px] text-neutral-500 font-mono">
                  Leaderboard auto-ranks by XP earned from post impressions and clicks.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Key Capabilities ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Powerful tools for event organizers
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              Everything you need to turn static event spaces into active brand amplification hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6.5 space-y-3 shadow-3xs">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">QR Code Portals</h3>
              <p className="text-[11.5px] text-neutral-550 leading-relaxed font-medium">
                Print QR codes on session screens, badge lanyards, or check-in counters. Attendees scan to load post suggestions instantly.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6.5 space-y-3 shadow-3xs">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Sponsor Visibility Boost</h3>
              <p className="text-[11.5px] text-neutral-550 leading-relaxed font-medium">
                Deliver massive reach. Connect sponsor branding directly into templates, showcasing partner visibility on the live stage leaderboard.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6.5 space-y-3 shadow-3xs">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Pre-Approved Post Catalog</h3>
              <p className="text-[11.5px] text-neutral-550 leading-relaxed font-medium">
                Keep shares compliant. Pre-write text alternatives with specific event hashtags so shares remain professional.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
