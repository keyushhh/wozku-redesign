import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  Zap,
  Radio,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Check,
} from 'lucide-react';

import linkedinIcon from '../assets/linkedin.svg';
import twitterIcon from '../assets/twitter.svg';
import facebookIcon from '../assets/facebook.svg';
import slackLogo from '../assets/slack.svg';

// ─── Types ─────────────────────────────────────────────────────
interface Platform {
  id: string;
  name: string;
  color: string;
  reach: number;
  avgEng: number;
  delay: number;
  asset: string;
}

// ─── Constants ─────────────────────────────────────────────────
const PLATFORMS: Platform[] = [
  { id: 'linkedin',  name: 'LinkedIn',    color: '#0077B5', reach: 28, avgEng: 4.2, delay: 0,   asset: linkedinIcon },
  { id: 'twitter',   name: 'X / Twitter', color: '#000000', reach: 44, avgEng: 2.8, delay: 120, asset: twitterIcon },
  { id: 'facebook',  name: 'Facebook',    color: '#1877F2', reach: 37, avgEng: 1.9, delay: 360, asset: facebookIcon },
  { id: 'slack',     name: 'Slack/Teams', color: '#4A154B', reach: 12, avgEng: 18.4, delay: 480, asset: slackLogo },
];

const CONTENT_TYPES = [
  { id: 'product',   label: 'Product Launch',   emoji: '🚀', template: `We just shipped something huge. The new Wozku Signal Console lets your team broadcast across every platform in one click - with zero coordination overhead. Thread below.` },
  { id: 'milestone', label: 'Growth Milestone',  emoji: '📈', template: `1,000 active advocates later, and our organic reach has grown 4× without a single paid impression. This is what decentralized distribution looks like at scale.` },
  { id: 'insight',   label: 'Industry Insight',  emoji: '💡', template: `Paid CPM is up 31% YoY. Meanwhile brands using advocate-led amplification are seeing 6× higher click-through at 1/8th the cost. The math doesn't lie.` },
];

const STATS = [
  { value: '5.1×',        label: 'Avg organic amplification' },
  { value: '47s',         label: 'Time to broadcast live' },
  { value: '98%',         label: 'On-brand score accuracy' },
  { value: '12 channels', label: 'Native integrations' },
];

const CAPABILITIES = [
  { title: 'One-Click Signal Dispatch',   desc: 'Stage your content once, then fire it across every connected channel simultaneously. No copy-paste, no duplicate browser tabs.' },
  { title: 'Intelligent Timing Engine',   desc: 'Our ML engine reads historical engagement windows per platform and auto-schedules each post for maximum first-hour reach.' },
  { title: 'Brand Signal Compliance',     desc: 'Every broadcast passes automated tone, hashtag, and legal compliance checks before it touches any public feed.' },
  { title: 'Unified Attribution Layer',   desc: 'Track impressions, clicks, saves, and pipeline influence across all 12 platforms in a single real-time dashboard.' },
];

// ─── Wave Canvas ───────────────────────────────────────────────
function WaveCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rings = useRef<{ r: number; o: number }[]>([]);
  const tick = useRef(0);
  const anim = useRef(0);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      c.width = c.parentElement?.clientWidth || 300;
      c.height = c.parentElement?.clientHeight || 300;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const cx = c.width / 2, cy = c.height / 2;
      if (active) {
        tick.current++;
        if (tick.current % 55 === 0) rings.current.push({ r: 0, o: 0.55 });
      }
      rings.current = rings.current.filter(x => x.o > 0.01);
      for (const ring of rings.current) {
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = '#4f46e5';
        ctx.globalAlpha = ring.o;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ring.r += 1.6;
        ring.o *= 0.983;
      }
      anim.current = requestAnimationFrame(draw);
    };
    anim.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(anim.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Main Page ─────────────────────────────────────────────────
export default function SocialAmplificationPage() {
  const [selectedContent, setSelectedContent] = useState(CONTENT_TYPES[0]);
  const [postText, setPostText] = useState(CONTENT_TYPES[0].template);
  const [activePlatforms, setActivePlatforms] = useState<Set<string>>(new Set(PLATFORMS.map(p => p.id)));
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastedPlatforms, setBroadcastedPlatforms] = useState<Set<string>>(new Set());
  const [broadcastComplete, setBroadcastComplete] = useState(false);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [signalActive, setSignalActive] = useState(false);

  const togglePlatform = (id: string) => {
    if (isBroadcasting) return;
    setActivePlatforms(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleContentSwitch = (ct: typeof CONTENT_TYPES[0]) => {
    if (isBroadcasting) return;
    setSelectedContent(ct);
    setPostText(ct.template);
  };

  const handleBroadcast = useCallback(() => {
    if (isBroadcasting || activePlatforms.size === 0) return;
    setIsBroadcasting(true);
    setBroadcastedPlatforms(new Set());
    setBroadcastComplete(false);
    setTotalImpressions(0);
    setSignalActive(true);

    const sorted = PLATFORMS.filter(p => activePlatforms.has(p.id)).sort((a, b) => a.delay - b.delay);
    let imp = 0;
    sorted.forEach((p, i) => {
      setTimeout(() => {
        setBroadcastedPlatforms(prev => new Set([...prev, p.id]));
        imp += Math.round(p.reach * 1000 * (p.avgEng / 100) * (0.85 + Math.random() * 0.3));
        setTotalImpressions(imp);
        if (i === sorted.length - 1) {
          setTimeout(() => {
            setIsBroadcasting(false);
            setBroadcastComplete(true);
            setSignalActive(false);
          }, 600);
        }
      }, 300 + i * 500);
    });
  }, [isBroadcasting, activePlatforms]);

  const handleReset = () => {
    setIsBroadcasting(false);
    setBroadcastedPlatforms(new Set());
    setBroadcastComplete(false);
    setTotalImpressions(0);
    setSignalActive(false);
  };

  const selPlats = PLATFORMS.filter(p => activePlatforms.has(p.id));
  const projReach = selPlats.reduce((a, p) => a + p.reach, 0);
  const projEng = selPlats.length ? selPlats.reduce((a, p) => a + p.avgEng, 0) / selPlats.length : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* Dynamic inline styles for marquee loops */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          gap: 1.5rem;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-14 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 mb-8">
            <Radio className="w-3 h-3 animate-pulse" />
            Social Amplification Engine
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            One signal.{' '}
            <span className="text-indigo-600 dark:text-indigo-400">Every channel.</span>
            <br />
            <span className="text-slate-400 text-4xl sm:text-5xl font-bold">Simultaneously.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Stop copy-pasting content across dashboards. Wozku's Signal Console fires brand-approved posts across every connected platform in a single dispatch - timed to each channel's peak engagement window.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-7 rounded-2xl text-sm transition-all shadow-xl shadow-indigo-600/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Try Signal Console <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#signal-demo" className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-sm cursor-pointer">
              See live demo <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Infinite Looping Marquee for Social Channels (No Box, clean text + icon spacing) */}
          <div className="relative w-full overflow-hidden py-4 my-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-slate-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-slate-50 after:to-transparent">
            <div className="flex w-max animate-marquee items-center">
              {/* Loop 1 */}
              {PLATFORMS.map((p, idx) => (
                <div key={`m1-${p.id}-${idx}`} className="flex items-center gap-2.5 mx-5 shrink-0">
                  <img src={p.asset} alt={p.name} className="h-5 w-5 object-contain shrink-0" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">{p.name}</span>
                </div>
              ))}
              {/* Loop 2 */}
              {PLATFORMS.map((p, idx) => (
                <div key={`m2-${p.id}-${idx}`} className="flex items-center gap-2.5 mx-5 shrink-0">
                  <img src={p.asset} alt={p.name} className="h-5 w-5 object-contain shrink-0" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SIGNAL CONSOLE ──────────────────────────────── */}
      <section id="signal-demo" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Live Demo</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900">Signal Console</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">Compose your content, pick your channels, fire. Watch the signal propagate in real time.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT: Compose Panel */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 shadow-sm rounded-3xl p-6 space-y-6">
              <div>
                <span className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-3">Content Type</span>
                <div className="grid grid-cols-3 gap-2">
                  {CONTENT_TYPES.map(ct => (
                    <button
                      key={ct.id}
                      onClick={() => handleContentSwitch(ct)}
                      className={`p-3 rounded-xl border text-left text-[9px] font-extrabold transition-all cursor-pointer ${
                        selectedContent.id === ct.id
                          ? 'bg-indigo-600 border-transparent text-white shadow-md shadow-indigo-600/10'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                      }`}
                    >
                      <span className="block text-base mb-1.5">{ct.emoji}</span>
                      <span className="block leading-tight">{ct.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Post Content</span>
                <textarea
                  value={postText}
                  onChange={e => setPostText(e.target.value.slice(0, 280))}
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500/50 focus:bg-white rounded-xl px-4 py-3.5 text-xs text-slate-800 resize-none focus:outline-none placeholder:text-slate-400 leading-relaxed transition-all"
                  placeholder="Compose your broadcast…"
                />
                <span className="text-[9px] text-slate-400 font-mono float-right mt-1">{postText.length}/280</span>
              </div>

              <div>
                <span className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Target Channels</span>
                <div className="space-y-2">
                  {PLATFORMS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        activePlatforms.has(p.id)
                          ? 'bg-indigo-50 dark:bg-[color-mix(in_srgb,var(--indigo-500)_18%,#141418)] border-indigo-400/60 text-neutral-900 dark:text-fixed-white shadow-xs'
                          : 'bg-white dark:bg-fixed-white/5 border-slate-200 dark:border-fixed-white/10 text-slate-600 dark:text-fixed-light hover:border-indigo-300 dark:hover:border-fixed-white/20 hover:text-slate-900 dark:hover:text-fixed-white'
                      }`}
                    >
                      <img src={p.asset} alt={p.name} className="h-6.5 w-6.5 object-contain shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className={`text-[11px] font-bold block ${activePlatforms.has(p.id) ? 'text-neutral-900 dark:text-fixed-white' : 'text-slate-700 dark:text-fixed-light'}`}>{p.name}</span>
                        <span className="text-[9px] font-mono text-slate-400 dark:text-fixed-muted">{p.reach}K reach · {p.avgEng}% eng</span>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded border shrink-0 flex items-center justify-center transition-all ${
                        activePlatforms.has(p.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                      }`}>
                        {activePlatforms.has(p.id) && <Check className="w-3.5 h-3.5 text-fixed-white stroke-[3.5]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER: Visualizer */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="relative flex-1 bg-slate-100/40 border border-slate-200/60 shadow-inner rounded-3xl overflow-hidden min-h-[260px] flex items-center justify-center">
                <WaveCanvas active={signalActive} />

                {/* Center interactive orb button */}
                <button
                  onClick={broadcastComplete ? handleReset : handleBroadcast}
                  disabled={isBroadcasting || activePlatforms.size === 0}
                  className={`relative z-10 h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none ${
                    isBroadcasting
                      ? 'bg-gradient-to-br from-indigo-500 to-secondary-600 shadow-xl shadow-indigo-500/30 scale-110 cursor-wait'
                      : broadcastComplete
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/20 text-white hover:scale-105 active:scale-95 cursor-pointer'
                      : activePlatforms.size === 0
                      ? 'bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed'
                      : 'bg-white border border-slate-200 text-slate-600 shadow-md hover:border-indigo-400 hover:text-indigo-600 hover:scale-105 active:scale-95 cursor-pointer'
                  }`}
                  title={broadcastComplete ? 'Reset Console' : 'Click to Broadcast'}
                >
                  {broadcastComplete ? (
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  ) : (
                    <Radio className={`w-7 h-7 ${isBroadcasting ? 'text-white animate-pulse' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                  )}
                </button>

                {/* Platform dots orbiting */}
                {PLATFORMS.filter(p => activePlatforms.has(p.id)).map((p, i, arr) => {
                  const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                  const r = 36; 
                  const x = 50 + r * Math.cos(angle);
                  const y = 50 + r * Math.sin(angle);
                  const done = broadcastedPlatforms.has(p.id);
                  return (
                    <div
                      key={p.id}
                      className={`absolute h-8.5 w-8.5 rounded-full bg-white border border-slate-200/80 flex items-center justify-center transition-all duration-500 ${
                        done ? 'scale-110 opacity-100 shadow-md ring-2 ring-emerald-400' : isBroadcasting ? 'opacity-40 scale-95' : 'opacity-85 shadow-sm'
                      }`}
                      style={{ left: `calc(${x}% - 17px)`, top: `calc(${y}% - 17px)` }}
                    >
                      <img src={p.asset} alt={p.name} className="h-5 w-5 object-contain" />
                      {done && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-100" />}
                    </div>
                  );
                })}

                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-wider block">
                    {broadcastComplete ? 'Click center to reset'
                      : isBroadcasting ? `Transmitting… ${broadcastedPlatforms.size}/${activePlatforms.size}`
                      : activePlatforms.size === 0 ? 'Select channels'
                      : 'Click center to broadcast'}
                  </span>
                </div>
              </div>

              {/* Projection card */}
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-5 space-y-3.5">
                <span className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Signal Forecast</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[9px] font-mono text-slate-400 block">Est. Reach</span>
                    <span className="text-lg font-mono font-bold text-slate-800">{projReach}K</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[9px] font-mono text-slate-400 block">Avg Eng Rate</span>
                    <span className="text-lg font-mono font-bold text-slate-800">{projEng.toFixed(1)}%</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 col-span-2">
                    <span className="text-[9px] font-mono text-slate-400 block">Projected Impressions</span>
                    <span className="text-xl font-mono font-bold text-emerald-600">
                      {(broadcastComplete ? totalImpressions : Math.round(projReach * 1000 * projEng / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Dispatch Schedule */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="flex-1 bg-white border border-slate-200/80 shadow-sm rounded-3xl p-5 space-y-4">
                <span className="text-[9px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Dispatch Schedule</span>
                <div className="space-y-3">
                  {PLATFORMS.filter(p => activePlatforms.has(p.id))
                    .sort((a, b) => a.delay - b.delay)
                    .map(p => {
                      const done = broadcastedPlatforms.has(p.id);
                      const mins = Math.floor(p.delay / 60);
                      return (
                        <div key={p.id} className="flex items-center gap-2.5">
                          <div className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all ${done ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <img src={p.asset} alt={p.name} className="w-5.5 h-5.5 object-contain shrink-0" />
                          <span className={`text-[11px] font-bold flex-1 transition-colors ${done ? 'text-slate-800' : 'text-slate-400'}`}>{p.name}</span>
                          <span className={`text-[9px] font-mono font-extrabold ${done ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {done ? '✓' : mins === 0 ? 'Instant' : `+${mins}m`}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="bg-slate-100/50 border border-slate-200/60 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  Ready to amplify your message? Select channels and trigger the broadcast at the console center.
                </p>
                <div className="mt-2 text-[9px] font-mono text-slate-400">
                  {activePlatforms.size} channel{activePlatforms.size !== 1 ? 's' : ''} active
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. STATS BAR ───────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-100/20 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(s => (
              <div key={s.label} className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">{s.value}</p>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CAPABILITIES GRID ───────────────────────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Platform Capabilities</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900">Everything your broadcast ops team needs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CAPABILITIES.map(cap => (
              <div key={cap.title} className="group bg-white border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md rounded-2xl p-6 transition-all duration-300">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Zap className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-800 mb-2">{cap.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CHANNEL INTELLIGENCE ────────────────────────── */}
      <section className="py-20 border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-3">Channel Intelligence</span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">Each platform gets its own signal timing.</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Wozku's ML timing engine analyzes 18 months of your audience's engagement history per channel and selects the precise dispatch window for each post - not a generic "best time to post" guess.
              </p>
              <div className="space-y-3">
                {[
                  'Per-channel engagement window detection',
                  'A/B caption variant testing across platforms',
                  'Auto-resizing media for each aspect ratio',
                  'Cross-channel deduplication to avoid spamming followers',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-600 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3.5 bg-white border border-slate-200/80 shadow-xs rounded-2xl p-6">
              {PLATFORMS.map(p => {
                const maxR = Math.max(...PLATFORMS.map(x => x.reach));
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <img src={p.asset} alt={p.name} className="h-7 w-7 object-contain shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] font-extrabold text-slate-700 font-mono">{p.name}</span>
                        <span className="text-[9px] font-mono text-slate-400 font-semibold">{p.reach}K reach · {p.avgEng}% eng</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(p.reach / maxR) * 100}%`, backgroundColor: p.color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA (Kept strictly in Dark Mode, Untouched) ────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#09090f] text-fixed-white border-t border-fixed-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,color-mix(in srgb,var(--indigo-500)_14%,transparent),transparent_65%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400 mb-6">
            <Sparkles className="w-3 h-3" /> Get Early Access
          </span>
          <h2 className="text-4xl font-display font-extrabold text-fixed-white mb-4">Stop publishing one post at a time.</h2>
          <p className="text-sm text-fixed-light max-w-lg mx-auto mb-8 leading-relaxed">
            Join 340 marketing teams already using Wozku's Signal Console to reduce broadcast ops from 3 hours to 47 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@company.com"
              className="flex-1 w-full sm:w-auto bg-[#141418] border border-fixed-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-fixed-white placeholder:text-fixed-muted focus:outline-none transition-all"
            />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['No credit card', 'SOC2 Ready', '14-day free trial'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[10px] text-fixed-muted font-semibold">
                <CheckCircle2 className="w-3 h-3 text-indigo-400/60" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
