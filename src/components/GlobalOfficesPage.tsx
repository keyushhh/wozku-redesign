import React, { useEffect, useState } from 'react';
import india from '@svg-maps/india';
import { motion } from 'motion/react';
import {
  MapPin,
  Mail,
  Send,
  Building,
  CheckCircle2,
  RefreshCw,
  Phone,
  Clock,
  ArrowRight,
  Compass,
  Users,
  X,
} from 'lucide-react';

interface OfficeAddress {
  city: string;
  stateId: string;       // matches @svg-maps/india location id
  name: string;
  role: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  // Centred inside the state in viewBox coords (612 x 696)
  markerX: number;
  markerY: number;
}

const OFFICES: Record<string, OfficeAddress> = {
  wb: {
    city: 'Kolkata',
    stateId: 'wb',
    name: 'South Kolkata Office',
    role: 'Core Systems & Cryptography',
    address: 'S-4, 269 Panchanantala Road, Kolkata 700041',
    landmark: 'Near Panchanantala Road',
    phone: '+91 (033) 4066 8200',
    hours: '9:00 AM – 6:00 PM IST, Mon – Fri',
    markerX: 412,
    markerY: 310,
  },
  ka: {
    city: 'Bengaluru',
    stateId: 'ka',
    name: 'BHIVE MG Road Campus',
    role: 'AI Timing & Enterprise Scale',
    address: '1st Floor, BHIVE Premium Ramanashree, MG Road, Bengaluru - 560025',
    landmark: 'Ramanashree Arcade',
    phone: '+91 (080) 6122 4500',
    hours: '9:30 AM – 6:30 PM IST, Mon – Fri',
    markerX: 171,
    markerY: 519,
  },
};

function getTargetVB(office: OfficeAddress | null): string {
  if (!office) return '0 0 612 696';
  const scale = 2.4;
  const vw = 612 / scale;
  const vh = 696 / scale;
  const x = Math.max(0, Math.min(612 - vw, office.markerX - vw / 2));
  const y = Math.max(0, Math.min(696 - vh, office.markerY - vh / 2));
  return `${x} ${y} ${vw} ${vh}`;
}

export default function GlobalOfficesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const activeOffice = selectedId ? OFFICES[selectedId] : null;

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const targetVB = activeOffice ? getTargetVB(activeOffice) : '0 0 612 696';

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDarkMode(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900">

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-14 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--indigo-500) 6%, transparent), transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 mb-8">
            <Building className="w-3.5 h-3.5" /> Contact Wozku
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            Get in touch{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-400 bg-clip-text text-transparent">with our hubs.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Questions about deployments, integrations, or pricing? Drop us a line below, or trace our engineering offices on the map.
          </p>
        </div>
      </section>

      {/* ── 2. CONTACT FORM + SIDEBAR ─────────────────────────────── */}
      <section className="pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Send us a message</h3>
              <p className="text-xs text-slate-450 leading-relaxed mb-6">
                An enterprise systems consultant will respond within 12 business hours.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800">Message sent!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been queued. We will reach out shortly.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="text-xs text-indigo-600 font-bold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5">Full Name</label>
                      <input type="text" required placeholder="Jane Doe"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-850 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5">Work Email</label>
                      <input type="email" required placeholder="jane@company.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-850 focus:outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5">Company Name</label>
                    <input type="text" required placeholder="Acme Corp"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-850 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5">Message</label>
                    <textarea required rows={4} placeholder="How can Wozku assist your advocacy campaigns?"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-850 focus:outline-none transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-mono text-[10px] uppercase font-extrabold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer select-none">
                    {isSubmitting ? (
                      <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Sending…</>
                    ) : (
                      <><Send className="w-3.5 h-3.5" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex-1 space-y-5">
                <h4 className="text-xs font-mono font-extrabold uppercase text-slate-400 tracking-wider border-b border-slate-100 pb-3">Corporate Contacts</h4>
                {[
                  { label: 'General Inquiries', email: 'hello@wozku.com' },
                  { label: 'Security & Abuse Desk', email: 'security@wozku.com' },
                  { label: 'Press & Media', email: 'media@wozku.com' },
                ].map(c => (
                  <div key={c.label} className="flex gap-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 h-fit">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-850">{c.label}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{c.email}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
                <span className="text-[9px] font-mono font-extrabold text-indigo-200 uppercase tracking-widest block">Enterprise SLAs</span>
                <h4 className="text-base font-extrabold leading-snug">Need a custom NDA or SOC 2 audit package?</h4>
                <p className="text-xs text-indigo-100/70 leading-relaxed">Our compliance officer reviews DPAs and integration specs.</p>
                <button onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                  className="text-xs font-bold text-white flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer mt-1">
                  Contact Compliance <ArrowRight className="w-4 h-4 text-indigo-300" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. LOCATE US — Real India SVG Map ─────────────────────── */}
      <section className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block mb-2">Locate Us</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Our engineering campuses</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              Click a highlighted state on the map to zoom in and view campus access details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: India Map */}
            <div className="lg:col-span-6 relative">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative overflow-hidden" style={{ aspectRatio: '612/696' }}>

                {/* Reset button */}
                {selectedId && (
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-mono font-bold uppercase py-1.5 px-3 rounded-lg cursor-pointer transition-all shadow-sm select-none"
                  >
                    <X className="w-3 h-3" /> Reset
                  </button>
                )}

                {/* Dotted grid background */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, #6366f1 10%, transparent 11%)',
                  backgroundSize: '14px 14px',
                }} />

                <motion.svg
                  viewBox={targetVB}
                  animate={{ viewBox: targetVB }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  {india.locations.map((location) => {
                    const isOffice = location.id in OFFICES;
                    const isSelected = location.id === selectedId;
                    return (
                      <path
                        key={location.id}
                        id={location.id}
                        d={location.path}
                        className={[
                          'transition-all duration-300',
                          isOffice ? 'cursor-pointer' : 'cursor-default',
                        ].join(' ')}
                        fill={
                          isSelected
                            ? 'var(--indigo-600)'
                            : isOffice
                            ? isDarkMode ? '#334155' : '#c7d2fe'
                            : isDarkMode ? '#14181f' : '#e2e8f0'
                        }
                        stroke={isDarkMode ? '#2b3240' : '#ffffff'}
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          filter: isOffice && !isSelected ? 'drop-shadow(0 0 6px rgba(99,102,241,0.35))' : 'none',
                        }}
                        onClick={() => isOffice && setSelectedId(location.id === selectedId ? null : location.id)}
                        onMouseEnter={e => {
                          if (isOffice && !isSelected) {
                            (e.target as SVGPathElement).setAttribute('fill', isDarkMode ? '#475569' : '#a5b4fc');
                          }
                        }}
                        onMouseLeave={e => {
                          if (isOffice && !isSelected) {
                            (e.target as SVGPathElement).setAttribute('fill', isDarkMode ? '#334155' : '#c7d2fe');
                          }
                        }}
                      />
                    );
                  })}

                  {/* City marker pins */}
                  {Object.values(OFFICES).map((office) => {
                    const isSelected = selectedId === office.stateId;
                    return (
                      <g
                        key={office.stateId}
                        className="cursor-pointer"
                        onClick={() => setSelectedId(office.stateId === selectedId ? null : office.stateId)}
                      >
                        {/* Pulse ring */}
                        <circle cx={office.markerX} cy={office.markerY} r="14"
                          fill="none" stroke={isSelected ? 'var(--indigo-600)' : 'var(--indigo-400)'} strokeWidth="1.5" opacity="0.5"
                          style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }}
                        />
                        {/* Dot */}
                        <circle cx={office.markerX} cy={office.markerY} r="6"
                          fill={isSelected ? 'var(--indigo-600)' : 'var(--indigo-500)'} stroke="#fff" strokeWidth="2" />
                        {/* City label */}
                        <text x={office.markerX} y={office.markerY - 13}
                          textAnchor="middle"
                          fontSize="9" fontWeight="700" fontFamily="monospace"
                          fill={isSelected ? 'var(--indigo-700)' : 'var(--indigo-600)'} letterSpacing="0.5">
                          {office.city.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </motion.svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-indigo-200 ring-1 ring-indigo-300/60" /> Wozku campus
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-600" /> Office marker
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Address Card */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[360px]">
              {activeOffice ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-600 tracking-wider">Campus Details</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeOffice.city}</h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">{activeOffice.name}</p>
                    </div>
                    <span className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
                      <Building className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="space-y-4 text-xs text-slate-600">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 mb-0.5">{activeOffice.address}</p>
                        <span className="text-slate-400">Landmark: {activeOffice.landmark}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">{activeOffice.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">{activeOffice.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-widest">Office Focus</span>
                    <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {activeOffice.role}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-2xl p-10 text-center space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-slate-100 text-slate-400">
                    <Compass className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800">Select a campus</h4>
                  <p className="text-xs text-slate-450 max-w-xs mx-auto leading-relaxed">
                    Click on <strong>West Bengal</strong> (Kolkata) or <strong>Karnataka</strong> (Bengaluru) on the map to zoom in and view office details.
                  </p>
                  <div className="flex justify-center gap-3 mt-4">
                    <button onClick={() => setSelectedId('wb')}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-mono font-bold uppercase py-2 px-4 rounded-lg cursor-pointer transition-all">
                      Kolkata (WB)
                    </button>
                    <button onClick={() => setSelectedId('ka')}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-mono font-bold uppercase py-2 px-4 rounded-lg cursor-pointer transition-all">
                      Bengaluru (KA)
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. CAREERS CTA ────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#09090f] text-fixed-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--indigo-500) 12%, transparent), transparent 65%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400 mb-6">
            <Users className="w-3.5 h-3.5" /> Careers at Wozku
          </span>
          <h2 className="text-4xl font-display font-extrabold text-fixed-white mb-4">Build the fourth engine of marketing</h2>
          <p className="text-sm text-fixed-light max-w-lg mx-auto mb-8 leading-relaxed">
            Scaling distributed queues or modeling AI timing engagement engines? We are actively hiring at both campuses.
          </p>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
            className="flex items-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/25 hover:scale-[1.02] cursor-pointer">
            Explore Open Positions <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['Kolkata Salt Lake Sector V', 'Bengaluru Outer Ring Road', 'Remote opportunities available'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[10px] text-fixed-muted font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/60" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
