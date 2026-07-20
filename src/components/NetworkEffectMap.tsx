import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Globe, Sparkles, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
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
    chimeFreq: 523.25 // C5
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
    chimeFreq: 587.33 // D5
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
    chimeFreq: 659.25 // E5
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
    chimeFreq: 783.99 // G5
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

export default function NetworkEffectMap() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [reachedNodes, setReachedNodes] = useState<string[]>([]);
  const [totalReachCount, setTotalReachCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(2.8); // Initial rotation (centered on Asia/India)
  const theta = useRef(0.25); // Initial vertical tilt
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const currentPhi = useRef(2.8);

  // Play synthesized retro chimes
  const playAudioChime = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio element muted by browser policy
    }
  };

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(false);
    
    // Auto rotate to center on Asia/India when simulation starts
    phi.current = 2.8; 
    pointerInteractionMovement.current = 0;
    
    setIsSimulating(true);
    setReachedNodes(['hq']);
    setTotalReachCount(0);
    
    // Play initial Kolkata HQ broadcast sound
    playAudioChime(NODES[0].chimeFreq);

    // Staggered node activation simulation
    // 1. Bengaluru lights up
    setTimeout(() => {
      setReachedNodes(prev => [...prev, 'bengaluru']);
      playAudioChime(NODES[1].chimeFreq);
      setTotalReachCount(1200);
    }, 700);

    // 2. London lights up
    setTimeout(() => {
      setReachedNodes(prev => [...prev, 'london']);
      playAudioChime(NODES[2].chimeFreq);
      setTotalReachCount(2000);
      
      // Gradually pan rotation towards Europe/West
      phi.current = 3.5;
    }, 1300);

    // 3. San Francisco lights up
    setTimeout(() => {
      setReachedNodes(prev => [...prev, 'sf']);
      playAudioChime(NODES[3].chimeFreq);
      setTotalReachCount(4500);
      setIsSimulating(false);
      
      // Pan further to center US/West
      phi.current = 4.4;
    }, 1900);
  };

  // Mount 3D WebGL Globe using Cobe
  useEffect(() => {
    if (!canvasRef.current) return;

    // Inject softRipple animation keyframes if not already present
    const styleId = 'cobe-custom-ripples-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes softRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0.7;
          }
          50% {
            opacity: 0.35;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.6);
            opacity: 0;
          }
        }
        .custom-ripple-active {
          animation: softRipple 2.2s infinite cubic-bezier(0.1, 0.8, 0.3, 1) !important;
        }
      `;
      document.head.appendChild(style);
    }

    const config: any = {
      devicePixelRatio: 2,
      width: 480 * 2,
      height: 480 * 2,
      phi: currentPhi.current,
      theta: theta.current,
      dark: 1, // Reverted to Dark Mode
      diffuse: 1.2,
      mapSamples: 15000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // Pure white land dots (original base color)
      markerColor: [1, 1, 1], // Pure white markers
      glowColor: [0, 0, 0], // Reverted atmospheric glow to black (no glow)
      arcWidth: 1.2,
      arcHeight: 0.35,
      markers: [],
      arcs: []
    };

    const globe = createGlobe(canvasRef.current, config);

    // Active animation frame render loop
    let rafId: number;
    const tick = () => {
      if (pointerInteracting.current === null) {
        phi.current += 0.003;
      }
      const targetPhi = phi.current + pointerInteractionMovement.current / 200;
      currentPhi.current = targetPhi;

      const now = Date.now();

      const dynamicMarkers = [
        // Kolkata HQ
        { 
          id: 'hq',
          location: [NODES[0].lat, NODES[0].lon] as [number, number], 
          size: hoveredNode === 'hq' ? 0.13 : (reachedNodes.includes('hq') ? 0.08 + Math.sin(now / 150) * 0.015 : 0.03),
          color: [1, 1, 1] as [number, number, number]
        },
        // Bengaluru
        { 
          id: 'bengaluru',
          location: [NODES[1].lat, NODES[1].lon] as [number, number], 
          size: hoveredNode === 'bengaluru' ? 0.13 : (reachedNodes.includes('bengaluru') ? 0.07 + Math.sin(now / 150 + 1) * 0.015 : 0.03),
          color: [1, 1, 1] as [number, number, number]
        },
        // London
        { 
          id: 'london',
          location: [NODES[2].lat, NODES[2].lon] as [number, number], 
          size: hoveredNode === 'london' ? 0.13 : (reachedNodes.includes('london') ? 0.07 + Math.sin(now / 150 + 2) * 0.015 : 0.03),
          color: [1, 1, 1] as [number, number, number]
        },
        // SF
        { 
          id: 'sf',
          location: [NODES[3].lat, NODES[3].lon] as [number, number], 
          size: hoveredNode === 'sf' ? 0.13 : (reachedNodes.includes('sf') ? 0.07 + Math.sin(now / 150 + 3) * 0.015 : 0.03),
          color: [1, 1, 1] as [number, number, number]
        }
      ];

      const dynamicArcs = [];
      if (reachedNodes.includes('bengaluru')) {
        dynamicArcs.push({
          from: [NODES[0].lat, NODES[0].lon] as [number, number],
          to: [NODES[1].lat, NODES[1].lon] as [number, number],
          color: [0.9, 0.9, 0.9] as [number, number, number] // Solid, steady white
        });
      }
      if (reachedNodes.includes('london')) {
        dynamicArcs.push({
          from: [NODES[0].lat, NODES[0].lon] as [number, number],
          to: [NODES[2].lat, NODES[2].lon] as [number, number],
          color: [0.9, 0.9, 0.9] as [number, number, number] // Solid, steady white
        });
      }
      if (reachedNodes.includes('sf')) {
        dynamicArcs.push({
          from: [NODES[0].lat, NODES[0].lon] as [number, number],
          to: [NODES[3].lat, NODES[3].lon] as [number, number],
          color: [0.9, 0.9, 0.9] as [number, number, number] // Solid, steady white
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
          let ripple = spacer.querySelector('.custom-ripple') as HTMLDivElement;
          if (!ripple) {
            ripple = document.createElement('div');
            ripple.className = 'custom-ripple';
            ripple.style.cssText = `
              position: absolute;
              width: 80px;
              height: 80px;
              border: 1.5px solid rgba(255, 255, 255, 0.3);
              background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 75%);
              border-radius: 50%;
              filter: blur(5px);
              transform: translate(-50%, -50%);
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.3s ease;
            `;
            spacer.appendChild(ripple);
          }

          // Calculate visibility on the front sphere facing camera
          const node = NODES[idx];
          const isVisible = id === 'hq' && isNodeVisible(node.lat, node.lon, targetPhi) && reachedNodes.includes(id);

          if (isVisible) {
            ripple.style.opacity = '1';
            if (!ripple.classList.contains('custom-ripple-active')) {
              ripple.classList.add('custom-ripple-active');
            }
          } else {
            ripple.style.opacity = '0';
            ripple.classList.remove('custom-ripple-active');
          }
        }
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Interaction drag-and-rotate handlers
    canvasRef.current.onpointerdown = (e) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    };

    canvasRef.current.onpointerup = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    };

    canvasRef.current.onpointerout = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    };

    canvasRef.current.onpointermove = (e) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta;
      }
    };

    return () => {
      globe.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [reachedNodes, hoveredNode]);

  // Find the node currently hovered for displaying the detail panel
  const activeNodeData = NODES.find(n => n.id === hoveredNode) || (reachedNodes.length > 0 ? NODES.find(n => n.id === reachedNodes[reachedNodes.length - 1]) : NODES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
          Visualizing the Network Ripple Effect
        </h2>
        
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Corporate announcements usually stop at your official channels. With Wozku, shares ripple instantly from your HQ center node to active employee networks worldwide.
        </p>
      </div>

      {/* Simulator Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Control Dashboard */}
        <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 uppercase">TELEMETRY SYSTEM ONLINE</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-950 font-display">Compounding Reach</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Click <strong>Simulate Share</strong> to trigger a global advocacy campaign. Hover over milestones to view details and watch corresponding coordinates grow on the 3D globe.
              </p>
            </div>

            {/* Total reach count display */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">PROJECTED AUDIENCE</span>
                <span className="text-2xl font-black text-neutral-950 font-display transition-all duration-300">
                  {totalReachCount.toLocaleString()} <span className="text-primary-600 text-xs font-semibold">Professionals</span>
                </span>
              </div>
              <Compass className={`w-8 h-8 text-neutral-350 ${isSimulating ? 'animate-spin' : ''}`} />
            </div>

            {/* Staggered milestones progress list */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">ROUTING SEQUENCE</span>
              <div className="space-y-2.5">
                {[
                  { id: 'hq', name: 'Kolkata Broadcast', step: 'Active' },
                  { id: 'bengaluru', name: 'Bengaluru Relay (+1.2k)', step: '0.7s latency' },
                  { id: 'london', name: 'London Relay (+800)', step: '1.3s latency' },
                  { id: 'sf', name: 'SF Amplification (+2.5k)', step: '1.9s latency' }
                ].map((item, idx) => {
                  const isActive = reachedNodes.includes(item.id);
                  return (
                    <div 
                      key={item.id} 
                      onMouseEnter={() => setHoveredNode(item.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-primary-600 shadow-xs shadow-primary-650' 
                            : 'bg-neutral-200'
                        }`} />
                        <span className={`font-semibold transition-colors ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">{isActive ? 'DELIVERED' : item.step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full relative inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 disabled:bg-neutral-200 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md shadow-primary-600/20 cursor-pointer active:scale-98 disabled:cursor-not-allowed"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Routing Global Nodes...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-primary-200" />
                  Simulate Global Share
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Map Canvas Panel (Dark Mode with 3D Globe) */}
        <div className="lg:col-span-6 bg-[#0a0a0d] border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[420px] shadow-xs">
          
          {/* Subtle network telemetry neutral grid ambient blur */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Header Status inside the map */}
          <div className="flex items-center justify-between relative z-10">
            <div className="text-left">
              <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">TELEMETRY VIEWPORT</span>
              <span className="text-xs font-semibold text-neutral-300">3D Interactive Globe Overlay</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">ACTIVE LINK HOPS</span>
              <span className="text-xs font-semibold text-primary-400 font-mono font-bold">
                {reachedNodes.length} / {NODES.length} Node Hops
              </span>
            </div>
          </div>

          {/* Dynamic 3D WebGL Globe Canvas Panel */}
          <div className="relative flex-1 flex items-center justify-center py-4 select-none overflow-hidden min-h-[300px]">
            <canvas 
              ref={canvasRef} 
              style={{ width: 380, height: 380, cursor: 'grab', maxWidth: '100%', aspectRatio: '1/1', margin: '0 auto', display: 'block' }}
              className="outline-none"
            />

            {/* Float details panel next to the globe */}
            {activeNodeData && (
              <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-auto md:w-64 bg-[#141418]/95 border border-white/10 p-3.5 rounded-2xl shadow-xl backdrop-blur-md z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                  <span className="text-xs font-bold text-white">{activeNodeData.name}</span>
                  <span className="text-[8px] font-mono text-neutral-400 bg-[#0c0c0e] px-1.5 py-0.5 rounded">
                    {activeNodeData.latLong}
                  </span>
                </div>
                
                <div className="space-y-1 text-[10px] text-neutral-350 leading-relaxed font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">Advocate Partner</span>
                    <span className="font-semibold text-neutral-200">{activeNodeData.employee}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">Linked Reach</span>
                    <span className="font-semibold text-primary-400">
                      {reachedNodes.includes(activeNodeData.id) ? activeNodeData.reach : '0'} Professionals
                    </span>
                  </div>
                  
                  <p className="text-[9.5px] text-neutral-450 pt-1.5 border-t border-neutral-800 mt-1 italic leading-relaxed">
                    "{activeNodeData.details}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Coordinates / Status */}
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 relative z-10 border-t border-neutral-900 pt-3">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-primary-500" /> WEBGL VECTOR ENGINE ACTIVE</span>
            <span>SIMULATOR STATUS: {isSimulating ? 'BROADCASTING PARTICLE FLUX' : 'DRAG TO ROTATE GLOBE'}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
