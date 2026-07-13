import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe2, Sparkles, RefreshCw, Compass, ShieldCheck, 
  ArrowRight, Volume2, VolumeX, Terminal, Users, Radio, Activity 
} from 'lucide-react';
import createGlobe from 'cobe';

interface NetworkNode {
  id: string;
  name: string;
  lat: number;
  lon: number;
  reach: string;
  employee: string;
  details: string;
  latLong: string;
  chimeFreq: number;
  phiTarget: number; // custom camera angle to center node
}

const NODES: NetworkNode[] = [
  { 
    id: 'hq', 
    name: 'Kolkata Hub (HQ)', 
    lat: 22.5726,
    lon: 88.3639,
    reach: '9.2k', 
    employee: 'System Broadcast', 
    details: 'Initial corporate campaign broadcast ignited from primary database.', 
    latLong: '22.5726° N, 88.3639° E',
    chimeFreq: 523.25, // C5
    phiTarget: 2.8
  },
  { 
    id: 'bengaluru', 
    name: 'Bengaluru Office', 
    lat: 12.9716,
    lon: 77.5946,
    reach: '1.2k', 
    employee: 'Alex Mercer', 
    details: 'Reached 1.2k tech professionals in Bengaluru tech parks.', 
    latLong: '12.9716° N, 77.5946° E',
    chimeFreq: 587.33, // D5
    phiTarget: 3.1
  },
  { 
    id: 'london', 
    name: 'London Hub', 
    lat: 51.5074,
    lon: -0.1278,
    reach: '800', 
    employee: 'Elena Rostova', 
    details: 'Reached 800 finance & product leaders in City of London.', 
    latLong: '51.5074° N, 0.1278° W',
    chimeFreq: 659.25, // E5
    phiTarget: 3.8
  },
  { 
    id: 'sf', 
    name: 'San Francisco Office', 
    lat: 37.7749,
    lon: -122.4194,
    reach: '2.5k', 
    employee: 'Liam Vance', 
    details: 'Reached 2.5k SaaS developers in Silicon Valley.', 
    latLong: '37.7749° N, 122.4194° W',
    chimeFreq: 783.99, // G5
    phiTarget: 4.6
  }
];

// Helper functions for 3D marker visibility tracking
const convertLatLngTo3D = (lat: number, lon: number) => {
  const radLat = (lat * Math.PI) / 180;
  const radLon = (lon * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(radLat);
  return [
    -cosLat * Math.cos(radLon),
    Math.sin(radLat),
    cosLat * Math.sin(radLon)
  ];
};

const isNodeVisible = (lat: number, lon: number, phi: number) => {
  const [x, y, z] = convertLatLngTo3D(lat, lon);
  const rotatedZ = -x * Math.sin(phi) + z * Math.cos(phi);
  return rotatedZ > 0;
};

export default function GlobalReachMapPage() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [reachedNodes, setReachedNodes] = useState<string[]>(['hq']);
  const [totalReachCount, setTotalReachCount] = useState(9200);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentStepText, setCurrentStepText] = useState('Idle. Ready to run propagation simulation.');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'SYSTEM: Initialize Wozku Global Core network.',
    'SYSTEM: KMS Scoped Auth Vault initialized.',
    'SYSTEM: Advocate node connection pools are active.'
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(2.8); // Initial rotation (centered on India)
  const theta = useRef(0.25);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const currentPhi = useRef(2.8);

  // Theme-reactive color ref: stores the current --indigo-500 as fractional [R,G,B]
  const themeColorRef = useRef<[number, number, number]>([0.38, 0.4, 0.95]);
  const themeColorValueRef = useRef('');
  const themeColorFrameRef = useRef<number | null>(null);

  // Parse hex color string like "#6366f1" or "rgb(99,102,241)" to fractional [R,G,B]
  const readThemeColor = () => {
    try {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--indigo-500')
        .trim();
      if (!raw) return;
      if (raw === themeColorValueRef.current) return;
      themeColorValueRef.current = raw;
      let r = 0.38, g = 0.4, b = 0.95; // safe fallback
      if (raw.startsWith('#')) {
        const hex = raw.replace('#', '');
        const full = hex.length === 3
          ? hex.split('').map(c => c + c).join('')
          : hex;
        r = parseInt(full.slice(0, 2), 16) / 255;
        g = parseInt(full.slice(2, 4), 16) / 255;
        b = parseInt(full.slice(4, 6), 16) / 255;
      } else if (raw.startsWith('rgb')) {
        const parts = raw.match(/\d+/g);
        if (parts && parts.length >= 3) {
          r = parseInt(parts[0]) / 255;
          g = parseInt(parts[1]) / 255;
          b = parseInt(parts[2]) / 255;
        }
      }
      themeColorRef.current = [r, g, b];
    } catch (_) {
      // Keep existing value on parse error
    }
  };

  // Watch preset class and custom inline-variable changes without re-parsing unchanged colors.
  useEffect(() => {
    readThemeColor(); // seed initial value
    const observer = new MutationObserver(() => {
      if (themeColorFrameRef.current !== null) return;
      themeColorFrameRef.current = requestAnimationFrame(() => {
        themeColorFrameRef.current = null;
        readThemeColor();
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => {
      observer.disconnect();
      if (themeColorFrameRef.current !== null) cancelAnimationFrame(themeColorFrameRef.current);
    };
  }, []);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  // Play synthesized retro chimes
  const playAudioChime = (freq: number) => {
    if (!isAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio block muted by browser policy
    }
  };

  const handleSimulate = () => {
    if (isSimulating) return;
    
    // Auto rotate to center on Asia/India when simulation starts
    phi.current = 2.8; 
    pointerInteractionMovement.current = 0;
    
    setIsSimulating(true);
    setReachedNodes(['hq']);
    setTotalReachCount(9200);
    setCurrentStepText('System Broadcast: Launching campaign dispatch from Kolkata HQ...');
    setConsoleLogs([]);
    addLog('SYSTEM: Starting wave dispatch propagation sequence...');
    addLog('INIT: Campaign launched from Kolkata HQ (System Broadcast). Sourced Reach: 9.2k');
    
    // Play initial Kolkata HQ broadcast sound
    playAudioChime(NODES[0].chimeFreq);

    // Staggered node activation simulation
    // 1. Bengaluru lights up
    setTimeout(() => {
      setReachedNodes(prev => [...prev, 'bengaluru']);
      playAudioChime(NODES[1].chimeFreq);
      setTotalReachCount(10400);
      setCurrentStepText('Advocate Node Synced: Bengaluru Office online.');
      addLog('SYNC: Node matched in Bengaluru Campus (Alex Mercer). Reach: +1.2k (Current Total: 10.4k)');
    }, 1000);

    // 2. London lights up
    setTimeout(() => {
      setReachedNodes(prev => [...prev, 'london']);
      playAudioChime(NODES[2].chimeFreq);
      setTotalReachCount(11200);
      // Gradually pan rotation towards Europe/West
      phi.current = 3.8;
      setCurrentStepText('Advocate Node Synced: London Office online.');
      addLog('SYNC: Node matched in London Hub (Elena Rostova). Reach: +800 (Current Total: 11.2k)');
    }, 2200);

    // 3. San Francisco lights up
    setTimeout(() => {
      setReachedNodes(prev => [...prev, 'sf']);
      playAudioChime(NODES[3].chimeFreq);
      setTotalReachCount(13700);
      setIsSimulating(false);
      // Pan further to center US/West
      phi.current = 4.6;
      setCurrentStepText('Propagation Resolved: Global amplification sequence completed.');
      addLog('SYNC: Node matched in San Francisco Hub (Liam Vance). Reach: +2.5k (Current Total: 13.7k)');
      addLog('SUCCESS: Wave propagation completed. Total Amplified Reach: 13.7k accounts.');
    }, 3500);
  };

  // Focus camera on node on hover
  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    if (nodeId) {
      const node = NODES.find(n => n.id === nodeId);
      if (node) {
        phi.current = node.phiTarget;
        pointerInteractionMovement.current = 0;
      }
    }
  };

  // Mount 3D WebGL Globe using Cobe
  useEffect(() => {
    if (!canvasRef.current) return;

    // Inject custom CSS styling for HTML nodes overlaying canvas if needed
    const styleId = 'cobe-reach-page-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes customPulse {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .reach-ripple-active {
          animation: customPulse 2s infinite cubic-bezier(0.1, 0.8, 0.3, 1) !important;
        }
      `;
      document.head.appendChild(style);
    }

    const config: any = {
      devicePixelRatio: 2,
      width: 540 * 2,
      height: 540 * 2,
      phi: currentPhi.current,
      theta: theta.current,
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5.5,
      baseColor: [1, 1, 1], // White dot points
      markerColor: themeColorRef.current, // Theme-reactive marker color (updated per frame via RAF)
      glowColor: [0, 0, 0], // Reverted atmospheric glow to black
      arcWidth: 1.5,
      arcHeight: 0.4,
      markers: [],
      arcs: []
    };

    const globe = createGlobe(canvasRef.current, config);

    // Active animation frame render loop
    let rafId: number;
    const tick = () => {
      if (pointerInteracting.current === null && !isSimulating) {
        phi.current += 0.0018; // Slow natural drift rotation
      }
      const targetPhi = phi.current + pointerInteractionMovement.current / 200;
      currentPhi.current = targetPhi;

      const now = Date.now();

      const dynamicMarkers = [
        // Kolkata HQ
        { 
          id: 'hq',
          location: [NODES[0].lat, NODES[0].lon] as [number, number], 
          size: hoveredNode === 'hq' ? 0.15 : (reachedNodes.includes('hq') ? 0.09 + Math.sin(now / 150) * 0.015 : 0.045),
          color: themeColorRef.current
        },
        // Bengaluru
        { 
          id: 'bengaluru',
          location: [NODES[1].lat, NODES[1].lon] as [number, number], 
          size: hoveredNode === 'bengaluru' ? 0.15 : (reachedNodes.includes('bengaluru') ? 0.08 + Math.sin(now / 150 + 1) * 0.015 : 0.045),
          color: themeColorRef.current
        },
        // London
        { 
          id: 'london',
          location: [NODES[2].lat, NODES[2].lon] as [number, number], 
          size: hoveredNode === 'london' ? 0.15 : (reachedNodes.includes('london') ? 0.08 + Math.sin(now / 150 + 2) * 0.015 : 0.045),
          color: themeColorRef.current
        },
        // SF
        { 
          id: 'sf',
          location: [NODES[3].lat, NODES[3].lon] as [number, number], 
          size: hoveredNode === 'sf' ? 0.15 : (reachedNodes.includes('sf') ? 0.08 + Math.sin(now / 150 + 3) * 0.015 : 0.045),
          color: themeColorRef.current
        }
      ];

      const dynamicArcs = [];
      if (reachedNodes.includes('bengaluru')) {
        dynamicArcs.push({
          from: [NODES[0].lat, NODES[0].lon] as [number, number],
          to: [NODES[1].lat, NODES[1].lon] as [number, number],
          color: themeColorRef.current // Theme-reactive arc line
        });
      }
      if (reachedNodes.includes('london')) {
        dynamicArcs.push({
          from: [NODES[0].lat, NODES[0].lon] as [number, number],
          to: [NODES[2].lat, NODES[2].lon] as [number, number],
          color: themeColorRef.current // Theme-reactive arc line
        });
      }
      if (reachedNodes.includes('sf')) {
        dynamicArcs.push({
          from: [NODES[0].lat, NODES[0].lon] as [number, number],
          to: [NODES[3].lat, NODES[3].lon] as [number, number],
          color: themeColorRef.current // Theme-reactive arc line
        });
      }

      globe.update({
        phi: targetPhi,
        theta: theta.current,
        markers: dynamicMarkers,
        arcs: dynamicArcs
      });

      // Update HTML soft blurred ripples positioning/visibility
      const ids = ['hq', 'bengaluru', 'london', 'sf'];
      ids.forEach((id, idx) => {
        const spacer = canvasRef.current?.parentElement?.querySelector(`div[style*="--cobe-${id}"]`);
        if (spacer) {
          let ripple = spacer.querySelector('.reach-ripple') as HTMLDivElement;
          if (!ripple) {
            ripple = document.createElement('div');
            ripple.className = 'reach-ripple';
            ripple.style.cssText = `
              position: absolute;
              width: 90px;
              height: 90px;
              border: 1.5px solid color-mix(in srgb, var(--indigo-500) 40%, transparent);
              background: radial-gradient(circle, color-mix(in srgb, var(--indigo-500) 10%, transparent) 0%, transparent 75%);
              border-radius: 50%;
              filter: blur(4px);
              transform: translate(-50%, -50%);
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.3s ease;
            `;
            spacer.appendChild(ripple);
          }

          // Calculate visibility on front sphere facing camera
          const node = NODES[idx];
          const isVisible = isNodeVisible(node.lat, node.lon, targetPhi) && reachedNodes.includes(id);

          if (isVisible) {
            ripple.style.opacity = '1';
            if (!ripple.classList.contains('reach-ripple-active')) {
              ripple.classList.add('reach-ripple-active');
            }
          } else {
            ripple.style.opacity = '0';
            ripple.classList.remove('reach-ripple-active');
          }
        }
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, [reachedNodes, hoveredNode, isSimulating]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900 pb-20">
      
      {/* ── 1. HERO HEADER ───────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-10 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--indigo-500) 6%, transparent), transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 mb-8">
            <Globe2 className="w-3.5 h-3.5" /> Network Simulation
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            Global Reach Map
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Visualize the network ripple effect and latency-free amplification patterns when corporate campaigns disperse across decentralized advocate nodes.
          </p>
        </div>
      </section>

      {/* ── 2. DASHBOARD & 3D CANVASES GRID ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left panel: Control Dashboard (5 columns) */}
          <div className="lg:col-span-5 border-r border-slate-100 p-8 flex flex-col justify-between space-y-8 bg-slate-50/50">
            
            <div className="space-y-6">
              {/* Header stats block */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Simulation Status</span>
                </div>
                
                {/* Audio Toggler */}
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                  title={isAudioEnabled ? 'Mute Chimes' : 'Enable Chimes'}
                >
                  {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Real-time telemetry metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Amplified Reach
                  </div>
                  <div className="text-2xl font-display font-extrabold text-slate-950">
                    {totalReachCount.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    Active Nodes
                  </div>
                  <div className="text-2xl font-display font-extrabold text-emerald-600">
                    {reachedNodes.length} <span className="text-[10px] font-sans font-bold text-slate-400">/ {NODES.length}</span>
                  </div>
                </div>
              </div>

              {/* Nodes Selection Cards List */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400">
                  Advocate Cluster Nodes
                </h4>
                
                <div className="space-y-2">
                  {NODES.map((node) => {
                    const isReached = reachedNodes.includes(node.id);
                    const isHovered = hoveredNode === node.id;
                    return (
                      <div
                        key={node.id}
                        onMouseEnter={() => handleNodeHover(node.id)}
                        onMouseLeave={() => handleNodeHover(null)}
                        className={[
                          'p-3.5 rounded-xl border transition-all text-left shadow-3xs cursor-pointer',
                          isReached 
                            ? 'bg-white border-slate-200' 
                            : 'bg-white/40 border-slate-100 opacity-60',
                          isHovered ? 'ring-2 ring-indigo-500/10 border-indigo-200' : ''
                        ].join(' ')}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{node.name}</span>
                          <span className="text-[9px] font-mono text-slate-400">{node.latLong}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-slate-500 italic">Owner: {node.employee}</span>
                          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            Reach: {node.reach}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Run Simulation Buttons */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="bg-slate-100 rounded-xl p-3.5 text-xs text-slate-600 leading-snug border border-slate-200/50">
                <span className="font-bold text-slate-900 block mb-1">Simulator Telemetry:</span>
                {currentStepText}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-350 text-white font-mono text-[10px] uppercase font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <RefreshCw className={[
                    'w-3.5 h-3.5 text-indigo-400',
                    isSimulating ? 'animate-spin' : ''
                  ].join(' ')} />
                  <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsSimulating(false);
                    setReachedNodes(['hq']);
                    setTotalReachCount(9200);
                    setCurrentStepText('Reset complete. Ready to run propagation.');
                    addLog('SYSTEM: Simulation states reset to Kolkata HQ root node.');
                    playAudioChime(NODES[0].chimeFreq);
                  }}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-mono text-[10px] uppercase font-extrabold py-3.5 px-5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

          </div>

          {/* Right panel: 3D Interactive Canvas Map (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#0a0a0d] p-8 relative min-h-[500px] lg:min-h-auto border-t lg:border-t-0 lg:border-l border-white/5">
            {/* Dark grid background pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            
            {/* Top info badge */}
            <div className="flex items-center justify-between relative z-10 text-white/60">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                <span className="text-[9px] font-mono tracking-wider uppercase font-bold text-white/50">
                  Interactive 3D WebGL Globe
                </span>
              </div>
              
              <span className="inline-flex items-center gap-1 text-[8px] uppercase font-mono tracking-widest text-indigo-300 font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                <ShieldCheck className="w-2.5 h-2.5" /> SOC2 Verified Linkages
              </span>
            </div>

            {/* Canvas Container */}
            <div className="relative w-full aspect-square max-w-[480px] mx-auto my-auto flex items-center justify-center">
              <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                  pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                  pointerInteracting.current = null;
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                  pointerInteracting.current = null;
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                }}
                onPointerMove={(e) => {
                  if (pointerInteracting.current !== null) {
                    const delta = e.clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta;
                  }
                }}
                className="w-full h-full cursor-grab"
                style={{ outline: 'none' }}
              />

              {/* Absolute positioned markers mapped underneath for DOM overlay effects (ripples) */}
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
                <div style={{ transform: 'translate3d(-102px, 20px, 0)', content: '""' }} style-cobe-hq="1" />
                <div style={{ transform: 'translate3d(-128px, 60px, 0)', content: '""' }} style-cobe-bengaluru="1" />
                <div style={{ transform: 'translate3d(-40px, -112px, 0)', content: '""' }} style-cobe-london="1" />
                <div style={{ transform: 'translate3d(120px, -65px, 0)', content: '""' }} style-cobe-sf="1" />
              </div>
            </div>

            {/* Bottom Panel Console Logs Terminal */}
            <div className="relative z-10 border border-white/[0.06] bg-black/40 rounded-2xl p-4 font-mono text-[9px] text-slate-400 space-y-1 max-h-[110px] overflow-y-auto scrollbar-none shadow-inner">
              <div className="flex items-center gap-1.5 border-b border-white/[0.04] pb-1.5 mb-1.5 text-white/60">
                <Terminal className="w-3 h-3 text-indigo-400" />
                <span>PROPAGATION NETWORK FEED</span>
              </div>
              {consoleLogs.map((log, index) => (
                <div key={index} className="truncate">
                  {log}
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. BOTTOM INFO FOOTER CTA ────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="bg-[#09090f] text-fixed-white rounded-[32px] border border-fixed-white/[0.08] p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-[8px] uppercase font-mono tracking-widest text-indigo-300 font-extrabold bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/20">
              <Sparkles className="w-3 h-3" /> Zero-Trust Transit
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight leading-tight">
              Ready to map your company’s reach?
            </h2>
            <p className="text-xs sm:text-sm text-fixed-light leading-relaxed max-w-lg mx-auto">
              Simulate employee location density, platform linkage configurations, and custom dispersion rules with our solutions engineering team.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="bg-white hover:bg-slate-100 text-slate-950 font-mono text-[9px] uppercase font-extrabold py-3 px-8 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer mx-auto shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
