import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  QrCode, 
  RefreshCw, 
  Share2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  Zap, 
  ArrowRight,
  ChevronRight,
  Smartphone,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

// ---- Confetti System (ported from InteractiveEventDemo) ----
interface ConfettiParticle {
  x: number; y: number;
  vx: number; vy: number;
  color: string; size: number;
  rotation: number; rotationSpeed: number;
}
const CONFETTI_COLORS = ['#6366f1','#a855f7','#10b981','#f59e0b','#ef4444','#06b6d4'];

// ---- Rich Synth Sound (ported from InteractiveEventDemo) ----
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

// Chime player for audio feedback
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

export default function EventAdvocacyPage() {
  // Broadcaster Simulator State
  const [attendeeName, setAttendeeName] = useState('Alex Mercer');
  const [broadcasterStep, setBroadcasterStep] = useState<1 | 2 | 3 | 4>(1);
  const [userClaimedReward, setUserClaimedReward] = useState(false);
  const [leaderboardFlash, setLeaderboardFlash] = useState(false);
  const [userRank, setUserRank] = useState(4);
  const [userXP, setUserXP] = useState(250);

  // Confetti canvas refs
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
  }, [broadcasterStep]);

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
        size: 5 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: -8 + Math.random() * 16,
      });
    }
    particlesRef.current = [...particlesRef.current, ...newPts];
  };

  // ROI Telemetry State
  const [attendees, setAttendees] = useState(2500);
  const [shareRate, setShareRate] = useState(35);
  const [reach, setReach] = useState(1500);

  // Calculations
  const totalAdvocates = Math.round(attendees * (shareRate / 100));
  const totalImpressions = totalAdvocates * reach;
  const equivalentMediaValue = Math.round((totalImpressions / 1000) * 18); // $18.00 CPM

  const handleSimulateCheckin = () => {
    if (!attendeeName.trim()) return;
    setBroadcasterStep(2);
    setUserClaimedReward(false);
    playChime(440, 'sine');

    // Simulate scanning laser sweep duration
    setTimeout(() => {
      setBroadcasterStep(3);
      playChime(523.25, 'sine'); // C5
      setTimeout(() => playChime(659.25, 'sine'), 100); // E5
    }, 1500);
  };

  const handleSharePost = () => {
    setBroadcasterStep(4);
    setUserRank(4);
    setUserXP(250);
    setLeaderboardFlash(true);
    playSynthSound('share');

    // Fire confetti burst on mount of step 4
    setTimeout(() => spawnConfetti(), 120);

    // Gradually climb the leaderboard: 4 -> 3 -> 2 -> 1, with XP ticking up each step
    const climbSteps = [
      { rank: 3, xp: 620, delay: 950 },
      { rank: 2, xp: 1050, delay: 1900 },
      { rank: 1, xp: 1500, delay: 2850 },
    ];
    climbSteps.forEach(({ rank, xp, delay }) => {
      setTimeout(() => {
        setUserRank(rank);
        setUserXP(xp);
        if (rank === 1) {
          playSynthSound('unlock');
          setTimeout(() => spawnConfetti(), 80);
        }
      }, delay);
    });
  };

  const handleClaimReward = () => {
    setUserClaimedReward(true);
    playSynthSound('claim');
    setTimeout(() => spawnConfetti(), 80);
  };

  const handleResetSimulator = () => {
    setBroadcasterStep(1);
    setUserClaimedReward(false);
    setLeaderboardFlash(false);
    setUserRank(4);
    setUserXP(250);
  };

  // Mock venue leaderboard rankings
  // Full roster with XP values, sorted dynamically when user is in the list
  const rosterLeaderboard = [
    { name: 'David Lee', xp: 1200 },
    { name: 'Elena Rostova', xp: 950 },
    { name: 'Marcus Vance', xp: 780 },
  ];

  // Build the visible leaderboard rows when Step 4 is active
  const buildLeaderboard = () => {
    if (broadcasterStep !== 4) {
      // Pre-share: show base roster starting at rank 1
      return rosterLeaderboard.map((item, idx) => ({ ...item, rank: idx + 1, isUser: false }));
    }
    // Insert user at their current rank position
    const withUser = [
      ...rosterLeaderboard.map(item => ({ ...item, isUser: false })),
      { name: attendeeName, xp: userXP, isUser: true },
    ];
    return withUser
      .sort((a, b) => b.xp - a.xp)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  };

  const leaderboardRows = buildLeaderboard();

  return (
    <main className="min-h-screen bg-slate-50/50 py-16 font-sans text-neutral-900 overflow-hidden relative">
      
      {/* Dynamic Background Glow Halo */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-neutral-950 leading-tight">
            Turn Attendees into<br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Organic Broadcast Channels.
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Connect offline interactions to digital networks. Wozku empowers keynotes, expos, and summits to mobilize attendees and multiply event reach by 10x with zero friction.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a 
              href="#advocacy-simulator" 
              className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-2xl text-xs transition-all shadow-xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Simulate Advocacy Loop
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#roi-calculator" 
              className="inline-flex items-center justify-center gap-1.5 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-850 font-semibold py-3 px-6 rounded-2xl text-xs transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Calculate Event ROI
            </a>
          </div>
        </section>

        {/* ================= INTERACTIVE QR CODE & ADVOCACY SIMULATOR ================= */}
        <section id="advocacy-simulator" className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">
              The Event Advocacy Loop Simulator
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
              Simulate the venue-to-digital attendee flow. Attendees scan the event QR code, preview and share the pre-defined post, and watch the live venue leaderboard update.
            </p>
          </div>

          {/* Confetti canvas - covers the entire simulator area */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-3xl"
            />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Left Card: Skeuomorphic Smartphone / QR Code Scan Display */}
            <div className="lg:col-span-5 bg-white border border-neutral-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[460px]">
              
              <AnimatePresence mode="wait">
                {broadcasterStep !== 3 && broadcasterStep !== 4 ? (
                  // Event QR Code layout for Steps 1 & 2
                  <motion.div 
                    key="badge-ticket"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full min-h-[380px] w-full"
                  >
                    {/* Top Header */}
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                          WOZKU CON 2026
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                        VENUE STATION
                      </span>
                    </div>

                    {/* Central Badge Flow Content */}
                    <div className="py-6 flex flex-col items-center text-center relative">
                      {broadcasterStep === 1 ? (
                        <div className="space-y-4 w-full max-w-xs flex flex-col items-center">
                          {/* QR Code Graphic */}
                          <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                            <QrCode className="w-20 h-20 text-neutral-900" />
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-1.5 select-none">Scan at Venue</span>
                          </div>

                          <div className="space-y-1 w-full">
                            <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase block text-left">
                              Your Name (For Leaderboard)
                            </label>
                            <input 
                              type="text" 
                              value={attendeeName}
                              onChange={(e) => setAttendeeName(e.target.value.slice(0, 24))}
                              placeholder="Enter your name..."
                              className="w-full bg-neutral-50 border border-neutral-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 font-semibold focus:outline-hidden transition-all text-center"
                            />
                          </div>
                          
                          <button
                            onClick={handleSimulateCheckin}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <QrCode className="w-3.5 h-3.5" /> Simulate QR Scan
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-32 h-32 border-2 border-dashed border-indigo-400 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden bg-[#141418]">
                            <QrCode className="w-16 h-16 text-indigo-300 opacity-60 animate-pulse" />
                            <motion.div 
                              initial={{ top: '0%' }}
                              animate={{ top: '100%' }}
                              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                              className="absolute left-0 right-0 h-0.5 bg-indigo-500 shadow-xs shadow-indigo-450"
                            />
                          </div>
                          <p className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest animate-pulse">
                            Scanning Event QR Code...
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[8px] font-mono text-neutral-400 uppercase block">SIMULATOR ACTIVE</span>
                        <span className="text-xs font-bold text-neutral-800">{attendeeName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-mono text-neutral-400 uppercase block">PORTAL ID</span>
                        <span className="text-xs font-mono font-bold text-neutral-800">#W-PORTAL-QR</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Skeuomorphic Smartphone mockup for Steps 3 & 4
                  <motion.div 
                    key="badge-phone"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full min-h-[380px] w-full"
                  >
                    {/* Header Phone Top Bar */}
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-mono font-bold tracking-wider uppercase">Attendee Phone</span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        100% Secure Link
                      </span>
                    </div>

                    {/* Phone Screen Viewport */}
                    {broadcasterStep === 3 ? (
                      // Step 3: Preview and Share pre-approved post
                      <div className="flex-1 flex flex-col justify-between items-stretch space-y-4 py-2">
                        {/* Preview Card */}
                        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-2xl text-left space-y-3">
                          <div className="flex items-center gap-2">
                            {/* Attendee initials profile icon */}
                            <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-mono text-[10px] font-bold text-indigo-700">
                              {attendeeName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AM'}
                            </div>
                            <div className="text-left">
                              <span className="text-xs font-bold text-neutral-900 block">{attendeeName}</span>
                              <span className="text-[9px] text-neutral-400 block font-semibold">LinkedIn Draft</span>
                            </div>
                          </div>
                          
                          <p className="text-[10px] text-neutral-700 leading-relaxed font-sans font-medium bg-white border border-neutral-100 p-2.5 rounded-xl">
                            Honored to attend the Tech Summit 2026! Thrilled to learn how Wozku turns attendees into organic broadcast channels. #WozkuCon #Advocacy
                          </p>
                        </div>

                        <button
                          onClick={handleSharePost}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Authorize & Share Post
                        </button>
                      </div>
                    ) : (
                      // Step 4: Share Complete & Reward
                      <div className="flex-1 flex flex-col justify-center items-stretch space-y-4">
                        <div className="bg-emerald-50 border border-emerald-200/50 p-4 rounded-2xl text-center space-y-1.5">
                          <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500 text-white shadow-xs mb-1">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <h4 className="text-xs font-bold text-emerald-950 font-display">Advocacy Post Shared!</h4>
                          <p className="text-[10px] text-emerald-600 leading-relaxed font-sans">
                            Wozku has successfully shared the pre-approved advocate update to LinkedIn (+1.5k reach!).
                          </p>
                        </div>

                        {/* Reward Card */}
                        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                          <div className="space-y-1 text-left">
                            <span className="text-[8px] font-mono font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 uppercase inline-block">
                              ADVOCACY REWARD
                            </span>
                            <h5 className="text-xs font-bold text-neutral-950 mt-1">Starbucks Coffee Voucher</h5>
                            <p className="text-[10px] text-neutral-400">Claim your free premium latte courtesy of Wozku.</p>
                          </div>

                          {userClaimedReward ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center py-2.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 animate-pulse mt-3">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Voucher Claimed! Check your email.
                            </div>
                          ) : (
                            <button
                              onClick={handleClaimReward}
                              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer mt-3"
                            >
                              Claim Advocate Reward
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Reset button inside the Smartphone view */}
                    <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                      <span className="text-[9px] text-neutral-400">Authenticated via LinkedIn OAuth</span>
                      <button 
                        onClick={handleResetSimulator}
                        className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-600 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Reset
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Right Card: Dynamic Venue Leaderboard Projection */}
            <div className="lg:col-span-7 bg-[#0a0a0d] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[460px]">
              
              {/* Telemetry light grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-indigo-400" />
                  <div className="text-left">
                    <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">VENUE SCREEN PROJECTION</span>
                    <span className="text-xs font-semibold text-fixed-white">Live Advocate Leaderboard</span>
                  </div>
                </div>
                {broadcasterStep === 4 && (
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md animate-pulse">
                    LIVE UPDATE ACTIVE
                  </span>
                )}
              </div>

              {/* Leaderboard Rankings List - wrapped in LayoutGroup for physics-based smooth reordering */}
              <LayoutGroup id="leaderboard">
                <div className="flex-1 flex flex-col justify-center space-y-2.5 my-6 relative z-10">
                  {leaderboardRows.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      layoutId={`lb-row-${item.name}`}
                      transition={{
                        layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 }
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border ${
                        item.isUser
                          ? `bg-white/10 border-white/20 shadow-lg ${
                              leaderboardFlash ? 'ring-2 ring-indigo-500 ring-offset-1 ring-offset-neutral-950' : ''
                            }`
                          : 'bg-[#141418]/60 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-6 w-6 rounded-full font-mono text-[10px] font-bold flex items-center justify-center ${
                            item.isUser
                              ? 'bg-gradient-to-br from-indigo-500 to-secondary-600 text-white shadow-xs'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {item.rank}
                        </span>
                        <div className="text-left">
                          <span className={`text-xs font-bold block ${
                            item.isUser ? 'text-white' : 'text-neutral-300'
                          }`}>
                            {item.name}{item.isUser ? ' (You)' : ''}
                          </span>
                          <span className={`text-[9px] block font-semibold ${
                            item.isUser ? 'text-indigo-300' : 'text-neutral-500 font-mono'
                          }`}>
                            {item.isUser ? 'LinkedIn Advocate' : 'Advocate'}
                          </span>
                        </div>
                      </div>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={`xp-${item.name}-${item.xp}`}
                          initial={{ opacity: 0, y: -8, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className={`text-xs font-mono font-extrabold ${
                            item.isUser ? 'text-indigo-400' : 'text-neutral-400'
                          }`}
                        >
                          +{item.xp.toLocaleString()} XP
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </LayoutGroup>

              {/* Status footer bar */}
              <div className="border-t border-fixed-white/5 pt-4 flex items-center justify-between text-fixed-light font-mono text-[9px] relative z-10">
                <span className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${broadcasterStep === 4 ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
                  {broadcasterStep === 4 
                    ? 'TELEMETRY PULSES BROADCASTED' 
                    : 'AWAITING KEYNOTE PROTOCOL INGEST'}
                </span>
                <span>WOZKU ENGINE ACTIVE</span>
              </div>
            </div>

          </div> {/* end grid */}
          </div> {/* end confetti relative wrapper */}

          {/* Earn More Points Tips Row */}
          {broadcasterStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white border border-neutral-200/70 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-5">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-mono font-extrabold text-neutral-500 uppercase tracking-widest">Boost Your Rank</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: <Share2 className="w-4 h-4" />, label: 'Share on more networks', detail: '+350 XP per platform', color: 'indigo' },
                    { icon: <Users className="w-4 h-4" />, label: 'Get 5+ post reactions', detail: '+200 XP per milestone', color: 'purple' },
                    { icon: <TrendingUp className="w-4 h-4" />, label: 'Post gets 10+ clicks', detail: '+500 XP bonus', color: 'emerald' },
                    { icon: <Award className="w-4 h-4" />, label: 'Refer another attendee', detail: '+800 XP referral bonus', color: 'amber' },
                  ].map(({ icon, label, detail, color }) => (
                    <div
                      key={label}
                      className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-4 flex flex-col gap-2 hover:shadow-sm transition-shadow`}
                    >
                      <div className={`text-${color}-500 w-8 h-8 rounded-xl bg-${color}-100/60 flex items-center justify-center`}>
                        {icon}
                      </div>
                      <span className="text-[11px] font-bold text-neutral-800 leading-snug">{label}</span>
                      <span className={`text-[10px] font-mono font-extrabold text-${color}-600`}>{detail}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-neutral-400 mt-4 font-sans">
                  Higher ranks unlock exclusive rewards - premium event access, sponsor swag, and VIP networking sessions.
                </p>
              </div>
            </motion.div>
          )}
        </section>

        {/* ================= ROI CALCULATOR CARD ================= */}
        <section id="roi-calculator" className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">
              Event ROI Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
              Simulate the amplification telemetry. Move sliders below to calculate projected audience reach and equivalent paid media advertising value.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Left Col: Sliders */}
            <div className="lg:col-span-6 bg-white border border-neutral-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-8">
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase">
                  CALCULATOR CONTROLS
                </span>
                
                {/* Slider 1: Attendees */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-neutral-800">Event Attendees</span>
                    <span className="text-indigo-600 font-mono font-bold">{attendees.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="100" 
                    value={attendees} 
                    onChange={(e) => setAttendees(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1 bg-neutral-100 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                    <span>100</span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Slider 2: Share Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-neutral-800">Advocacy Share Rate</span>
                    <span className="text-indigo-600 font-mono font-bold">{shareRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="90" 
                    step="5" 
                    value={shareRate} 
                    onChange={(e) => setShareRate(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1 bg-neutral-100 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                    <span>5%</span>
                    <span>90%</span>
                  </div>
                </div>

                {/* Slider 3: Average Reach */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-neutral-800">Avg. Connection Reach</span>
                    <span className="text-indigo-600 font-mono font-bold">{reach.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="5000" 
                    step="250" 
                    value={reach} 
                    onChange={(e) => setReach(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1 bg-neutral-100 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                    <span>500 connections</span>
                    <span>5,000 connections</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-150 mt-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-neutral-400">MULTIPLIER ALGORITHM LOCKED</span>
              </div>
            </div>

            {/* Right Col: Live Telemetry Displays */}
            <div className="lg:col-span-6 bg-white dark:bg-[#0a0a0d] border border-neutral-200 dark:border-fixed-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs text-neutral-900 dark:text-fixed-white">
              
              <div className="space-y-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 dark:text-fixed-muted uppercase">
                  PROJECTED VALUE
                </span>

                <div className="grid grid-cols-2 gap-4">
                  {/* Metric 1 */}
                  <div className="bg-slate-50 dark:bg-[#141418] border border-neutral-200 dark:border-fixed-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-neutral-500 dark:text-fixed-light mb-1">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold font-mono tracking-wider uppercase">ADVOCATES</span>
                    </div>
                    <span className="text-2xl font-mono font-extrabold text-neutral-900 dark:text-fixed-white">
                      {totalAdvocates.toLocaleString()}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-slate-50 dark:bg-[#141418] border border-neutral-200 dark:border-fixed-white/10 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-neutral-500 dark:text-fixed-light mb-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold font-mono tracking-wider uppercase">IMPRESSIONS</span>
                    </div>
                    <span className="text-2xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                      {totalImpressions.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Metric 3: Big Value Display */}
                <div className="bg-indigo-50 dark:bg-gradient-to-br dark:from-[#202040] dark:to-[#141418] border border-indigo-200 dark:border-indigo-900/40 p-6 rounded-2xl flex items-center justify-between relative overflow-hidden">
                  <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
                  
                  <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-fixed-light">
                      <DollarSign className="w-4 h-4 text-indigo-500 dark:text-emerald-400" />
                      <span className="text-[10px] font-bold font-mono tracking-wider uppercase">MEDIA VALUE</span>
                    </div>
                    <span className="text-3xl font-mono font-extrabold text-neutral-900 dark:text-fixed-white">
                      ${equivalentMediaValue.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="text-right text-[10px] font-mono text-neutral-500 dark:text-fixed-light relative z-10 space-y-0.5">
                    <span className="block text-indigo-600 dark:text-emerald-400 font-bold">SAVED AD SPEND</span>
                    <span className="block font-bold">CPM base: $18.00</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-fixed-white/10 mt-6 text-[10px] text-neutral-500 dark:text-fixed-light flex items-center justify-between">
                <span>PROJECTED SOCIAL CPM</span>
                <span className="font-mono text-neutral-900 dark:text-fixed-white font-bold">$18.00 USD</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= CORE CAPABILITIES ================= */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">
              Engineered for Live Scale
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
              Everything required to orchestrate corporate organic reach during physical keynotes, expos, and summits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl space-y-4 hover:border-neutral-300 transition-colors shadow-2xs">
              <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-xs shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-neutral-950">NFC & QR Code Portals</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Sync with registration portals (Okta, Cvent, Eventbrite) to automatically distribute advocate links and event-wide QR display points.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl space-y-4 hover:border-neutral-300 transition-colors shadow-2xs">
              <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-xs shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-neutral-950">Sponsor Reach Offsets</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Embed sponsor logos on attendee share cards to subsidize event costs while amplifying mutual organic impressions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-neutral-200/50 p-6 rounded-3xl space-y-4 hover:border-neutral-300 transition-colors shadow-2xs">
              <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-neutral-950">Pre-Approved Brand Content</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Maintain compliance with pre-written post options whitelisted and approved by your communications team.
              </p>
            </div>
          </div>
        </section>

        {/* ================= BOOK A DEMO CTA ================= */}
        <section className="pb-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0d] border border-fixed-white/10 p-10 sm:p-16 text-center">

            {/* Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in srgb,var(--indigo-500)_15%,transparent)_0%,transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,color-mix(in srgb,var(--indigo-500)_8%,transparent)_0%,transparent_55%)] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              
              {/* Tag */}
              <span className="inline-block text-[9px] font-mono font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md uppercase tracking-widest">
                Ready to deploy at your next event?
              </span>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-fixed-white leading-tight tracking-tight">
                Turn your next event into a<br />
                <span className="text-indigo-400">
                  viral distribution engine.
                </span>
              </h2>

              <p className="text-sm text-fixed-light leading-relaxed max-w-lg mx-auto">
                Our team will walk you through a live setup tailored to your event format - keynote, expo, or summit. Get up and running in under 48 hours.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                {[
                  { value: '48h', label: 'Setup time' },
                  { value: '10x', label: 'Reach multiplier' },
                  { value: '$0', label: 'Paid media needed' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <span className="text-sm font-mono font-extrabold text-indigo-300">{value}</span>
                    <span className="text-[10px] text-neutral-500 font-semibold">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-500/25 cursor-pointer group"
                >
                  Book a Live Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="#advocacy-simulator"
                  className="inline-flex items-center justify-center gap-1.5 bg-fixed-white/8 hover:bg-fixed-white/12 border border-fixed-white/10 text-fixed-light hover:text-fixed-white font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer"
                >
                  Replay the Simulator
                </a>
              </div>

              <p className="text-[10px] text-neutral-600 font-mono pt-1">No commitment · Setup in 48 hours · Cancel anytime</p>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

// ================= COMING SOON PLACEHOLDER SECTION =================
export function ProductComingSoonPage({ title, description }: { title: string, description: string }) {
  return (
    <main className="min-h-[70vh] bg-slate-50/50 flex items-center justify-center py-16 font-sans text-neutral-900 relative z-10">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-neutral-950 leading-tight">
          {title}
        </h1>
        
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
          {description} We are building an interactive sandbox experience for this product. Check back in our next system release iteration.
        </p>

        <div className="pt-4">
          <button 
            onClick={() => { window.location.hash = '#/'; }}
            className="inline-flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-5 rounded-xl text-xs transition-all shadow-xs cursor-pointer"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </main>
  );
}
