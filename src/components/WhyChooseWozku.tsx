import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  LineChart, 
  Scale, 
  Globe2, 
  HeartHandshake,
  Check,
  RefreshCw,
  MessageSquare,
  Zap,
  Trophy,
  Gift,
  Activity,
  Lock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseWozku() {
  // Card 2: automated loop index
  const [activeStep, setActiveStep] = useState(1);

  // Card 6: Chat messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Wozku Success', text: "Okta directory sync complete. Whitelists active." },
    { id: 2, sender: 'GTM Team', text: "Amazing! Referral loops are tracking in HubSpot now." }
  ]);

  // Card 3: Telemetry dot - DOM-space path-following overlay
  const chartPathRef = useRef<SVGPathElement>(null);
  const dotContainerRef = useRef<HTMLDivElement>(null);
  const [dotPos, setDotPos] = useState<{ x: number; y: number } | null>(null);
  const dotAnimFrameRef = useRef<number>(0);
  const dotStartTimeRef = useRef<number | null>(null);
  const DOT_DURATION_MS = 8000;

  const animateDot = useCallback((ts: number) => {
    if (dotStartTimeRef.current === null) dotStartTimeRef.current = ts;
    const elapsed = (ts - dotStartTimeRef.current) % DOT_DURATION_MS;
    const t = elapsed / DOT_DURATION_MS; // 0..1 along the path

    const pathEl = chartPathRef.current;
    const containerEl = dotContainerRef.current;
    if (pathEl && containerEl) {
      const totalLen = pathEl.getTotalLength();
      const pt = pathEl.getPointAtLength(t * totalLen);
      // pt is in SVG viewBox units; convert to container-relative %
      // The SVG uses viewBox="0 0 100 100" so pt.x/pt.y are 0-100
      // The SVG element itself is w-[85%] h-[60%] of the container, offset by mt-4 ml-4
      const svgEl = pathEl.ownerSVGElement;
      if (svgEl) {
        const svgRect = svgEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        // Map SVG viewBox coords to actual SVG pixel coords, then to container coords
        const svgW = svgRect.width;
        const svgH = svgRect.height;
        const pixX = (pt.x / 100) * svgW + (svgRect.left - containerRect.left);
        const pixY = (pt.y / 100) * svgH + (svgRect.top - containerRect.top);
        setDotPos({ x: pixX, y: pixY });
      }
    }
    dotAnimFrameRef.current = requestAnimationFrame(animateDot);
  }, []);

  useEffect(() => {
    dotAnimFrameRef.current = requestAnimationFrame(animateDot);
    return () => cancelAnimationFrame(dotAnimFrameRef.current);
  }, [animateDot]);

  return (
    <div className="grid grid-cols-12 gap-6 w-full auto-rows-fr text-left">

      {/* CARD 1: ENTERPRISE SECURITY (Row 1, col-span-7, Light) */}
      <div className="col-span-12 md:col-span-7 bg-card-accent/40 border border-neutral-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs min-h-[220px]">
        
        {/* Overlapping Key & Token Cards */}
        <div className="relative h-24 w-full flex items-center justify-center pointer-events-none">
          
          {/* Card A: Background Key card */}
          <div className="absolute top-1 left-4 w-[75%] bg-white border border-neutral-200 rounded-xl px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.02)] translate-x-[-12px] opacity-75">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[8px] font-mono font-bold text-neutral-400 tracking-wider">SSO DIRECTORY SYNC</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="text-[10px] font-bold text-neutral-800 font-sans">Okta Enterprise Integration</div>
            <div className="text-[8px] font-mono text-neutral-400">SHA-256: d8d745c...</div>
          </div>

          {/* Card B: Foreground Role Policy card */}
          <div className="absolute top-7 right-4 w-[75%] bg-white border border-indigo-500/25 rounded-xl px-4 py-2.5 shadow-[0_8px_30px_rgba(99,102,241,0.06)] translate-x-[12px] z-10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[8px] font-mono font-bold text-indigo-600 tracking-wider">POLICY ACCESS CONTROL</span>
              <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">Verified</span>
            </div>
            <div className="text-[11px] font-bold text-neutral-850 font-sans">Role-Based SAML 2.0 Policy</div>
            <div className="text-[8.5px] text-neutral-500 mt-0.5 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-indigo-500" /> Whitelisted IP Access Rules
            </div>
          </div>

        </div>

        {/* Text Area & Badge */}
        <div className="space-y-2 pt-3 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-neutral-900">Enterprise Security</h4>
            <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded">
              SOC2 Ready
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            SOC2 Type II compliant with single sign-on (SSO), role-based access controls, and full data deletion guarantees.
          </p>
        </div>
      </div>

      {/* CARD 2: COGNITIVE AUTOMATION (Row 1, col-span-5, Light) */}
      <div className="col-span-12 md:col-span-5 bg-card-accent/40 border border-neutral-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs min-h-[220px]">
        
        {/* Animated Flow Diagram */}
        <div className="relative h-24 w-full flex items-center justify-center">
          
          {/* Connector Line with animated glow particle */}
          <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-neutral-200 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                left: ["-10%", "110%"]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 w-16 h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            />
          </div>

          <div className="flex items-center justify-between w-full px-4 relative z-10">
            {[
              { id: 1, label: 'Trigger', icon: <Zap className="w-4 h-4" />, bg: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              { id: 2, label: 'Points', icon: <Trophy className="w-4 h-4" />, bg: 'bg-amber-50 text-amber-600 border-amber-100' },
              { id: 3, label: 'Reward', icon: <Gift className="w-4 h-4" />, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
            ].map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-indigo-600 text-white border-indigo-650 shadow-md'
                      : `${step.bg}`
                  }`}
                >
                  {step.icon}
                </button>
                <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-wider">{step.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Text Area & Badge */}
        <div className="space-y-2 pt-3 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-neutral-900">Cognitive Automation</h4>
            <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded">
              Zero-touch
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Automate outreach, points assignment, reward compliance, and Slack leaderboards via custom rules.
          </p>
        </div>
      </div>

      {/* CARD 3: COOKIE-LESS TELEMETRY (Row 2 & 3, col-span-4, row-span-2, Dark) */}
      <div className="col-span-12 md:col-span-4 row-span-1 md:row-span-2 bg-[#0c0c0e] border border-fixed-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-fixed-white/20 transition-all duration-300 shadow-sm min-h-[340px]">
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />

        {/* Telemetry Dashboard with Grid Lines & Axis Labels (Expanded height to fill space) */}
        <div ref={dotContainerRef} className="relative h-56 w-full flex items-center justify-center overflow-hidden bg-[#0a0a0d]/60 rounded-2xl border border-fixed-white/8 p-4">
          
          {/* Top Left Title info */}
          <div className="absolute top-2.5 left-3 z-20 flex flex-col">
            <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-indigo-500 animate-pulse" /> Live Telemetry Clicks
            </span>
            <span className="text-[8px] font-mono text-fixed-light/60 mt-0.5">Organic Click Attribution</span>
          </div>

          {/* Top Right Tracker info */}
          <div className="absolute top-2.5 right-3 z-20 flex flex-col text-right">
            <span className="text-[9px] font-mono font-extrabold text-fixed-light/80">Pings: 1.4k/s</span>
            <span className="text-[8px] font-mono text-emerald-405 font-bold">Safe SSL</span>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-10">
            <div className="h-px w-full bg-fixed-white" />
            <div className="h-px w-full bg-fixed-white" />
            <div className="h-px w-full bg-fixed-white" />
          </div>

          {/* Left Y-axis labels */}
          <div className="absolute left-2.5 top-12 bottom-8 flex flex-col justify-between text-[7.5px] font-mono text-fixed-muted/70 font-bold select-none pointer-events-none">
            <span>120k</span>
            <span>80k</span>
            <span>40k</span>
          </div>

          {/* Bottom X-axis labels */}
          <div className="absolute bottom-2.5 left-8 right-4 flex justify-between text-[7.5px] font-mono text-fixed-muted/70 font-bold select-none pointer-events-none">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>

          {/* Chart SVG Curve - dot lives outside the distorted SVG coordinate system */}
          <svg className="w-[85%] h-[60%] mt-4 ml-4" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="text-indigo-500" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="100%" className="text-indigo-500" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 80 Q 25 30, 50 60 T 100 20 L 100 100 L 0 100 Z" fill="url(#glowGrad)" />

            {/* Glowing line path - also the ref path for getPointAtLength() */}
            <motion.path
              ref={chartPathRef}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d="M0 80 Q 25 30, 50 60 T 100 20"
              className="text-indigo-500"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Tracker dot - absolutely positioned in container space using real pixel coords from getPointAtLength() */}
          {dotPos && (
            <div
              className="absolute h-3 w-3 rounded-full bg-indigo-500 border-2 border-fixed-white shadow-[0_0_12px_var(--indigo-500)] flex items-center justify-center pointer-events-none"
              style={{
                left: dotPos.x,
                top: dotPos.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-fixed-white animate-ping" />
            </div>
          )}
        </div>

        {/* Text Area & Badge */}
        <div className="space-y-2 pt-3.5 border-t border-fixed-white/10">
          <div className="flex items-center justify-between">
          <h4 className="font-display font-bold text-base text-fixed-white/90">Cookie-Less Telemetry</h4>
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              GDPR Compliant
            </span>
          </div>
          <p className="text-xs text-fixed-light/70 leading-relaxed font-sans">
            Track aggregate shares, organic link clicks, and campaign registrations with ultimate compliance. No intrusive tracking pixels required.
          </p>
        </div>
      </div>

      {/* CARD 4: HYPER SCALABILITY (Row 2, col-span-4, Light) */}
      <div className="col-span-12 md:col-span-4 bg-white border border-neutral-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs min-h-[180px]">
        {/* Speedometer visual with Radar waves */}
        <div className="relative h-14 w-full flex flex-col items-center justify-center">
          
          {/* Pulsing server radar wave background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [0.8, 1.6], opacity: [0.15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
                className="absolute h-14 w-14 border border-indigo-500/15 rounded-full"
              />
            ))}
          </div>

          <div className="relative flex items-center justify-center h-12 w-12 bg-neutral-50 rounded-full border border-neutral-100 shadow-2xs z-10">
            {/* Speedometer ring gauge */}
            <div className="absolute inset-0 rounded-full border-[2.5px] border-neutral-100/65 border-t-indigo-500 border-r-indigo-500 border-l-indigo-500/80 rotate-45" />
            
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono font-black text-neutral-800 leading-none">99.9%</span>
              <span className="text-[6.5px] font-mono font-bold text-neutral-400 uppercase tracking-wider leading-none mt-0.5">Uptime</span>
            </div>
            
            {/* Pulsing green pointer node on speed ring */}
            <span className="absolute bottom-0.5 right-1 h-1.5 w-1.5 rounded-full bg-emerald-500 border border-white animate-pulse" />
          </div>
        </div>

        {/* Text Area & Badge */}
        <div className="space-y-2 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-neutral-900">Hyper Scalability</h4>
            <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded">
              SLA Guarantee
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Engineered on high-availability server grids to handle rapid social surges during product keynotes.
          </p>
        </div>
      </div>

      {/* CARD 5: GLOBAL COMPLIANCE (Row 2, col-span-4, Light) */}
      <div className="col-span-12 md:col-span-4 bg-white border border-neutral-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-neutral-350 transition-all duration-300 shadow-xs min-h-[180px]">
        {/* Global pills visual */}
        <div className="relative h-14 w-full flex items-center justify-center overflow-hidden">
          <div className="flex flex-wrap gap-1.5 justify-center py-1">
            {['USD ($)', 'EUR (€)', 'GBP (£)', 'CAD ($)', 'JPY (¥)'].map((curr, idx) => (
              <span 
                key={curr}
                className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300 transition-colors shadow-3xs"
                style={{ transform: `translateY(${idx % 2 === 0 ? '1px' : '-1px'})` }}
              >
                {curr}
              </span>
            ))}
          </div>
        </div>

        {/* Text Area & Badge */}
        <div className="space-y-2 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-neutral-900">Global Compliance</h4>
            <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded">
              150+ Countries
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Fulfill giftcards, custom swag, or points payouts globally with automated local currency conversion.
          </p>
        </div>
      </div>

      {/* CARD 6: CONCIERGE SUCCESS SUPPORT (Row 3, col-span-8, Dark) */}
      <div className="col-span-12 md:col-span-8 bg-[#0c0c0e] border border-fixed-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-fixed-white/20 transition-all duration-300 shadow-sm min-h-[220px]">
        {/* Grid dots */}
        <div className="absolute inset-0 bg-grid-dots-accent opacity-5 pointer-events-none" />

        {/* Chat Console visual */}
        <div className="relative h-32 w-full flex flex-col justify-center gap-3 z-10 px-2">
          
          <div className="flex items-start gap-3 bg-[#141418] border border-fixed-white/10 rounded-xl px-4 py-2.5 max-w-[90%] md:max-w-[75%]">
            <div className="h-6 w-6 bg-indigo-600 text-fixed-white rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 shadow-sm font-mono mt-0.5">
              W
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-fixed-light/70 block leading-none mb-1">Wozku Success</span>
              <span className="text-[11px] text-fixed-white/85 leading-tight font-sans block">{messages[0].text}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#1a1a22] border border-fixed-white/10 rounded-xl px-4 py-2.5 max-w-[90%] md:max-w-[75%] self-end">
            <div className="h-6 w-6 bg-[#F27E31]/10 border border-[#F27E31]/20 text-[#F27E31] rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 shadow-sm font-mono mt-0.5">
              U
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-fixed-light/70 block leading-none mb-1">Growth Operations</span>
              <span className="text-[11px] text-fixed-white/85 leading-tight font-sans block">{messages[1].text}</span>
            </div>
          </div>

        </div>

        {/* Text Area & Badge */}
        <div className="space-y-2 pt-3 border-t border-fixed-white/10 relative z-10">
          <div className="flex items-center justify-between">
          <h4 className="font-display font-bold text-base text-fixed-white/90">Concierge Success Support</h4>
            <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
              24/7 Slack
            </span>
          </div>
          <p className="text-xs text-fixed-light/70 leading-relaxed font-sans">
            Get dedicated program engineers and advocacy strategy consulting to help launch and evaluate campaigns.
          </p>
        </div>
      </div>

    </div>
  );
}
