import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, RefreshCw, X, Link } from 'lucide-react';

// Import actual brand SVGs from the asset folder
import slackIcon from '../assets/slack.svg';
import hubspotIcon from '../assets/hubspot.svg';
import zapierIcon from '../assets/zapier.svg';
import notionIcon from '../assets/notion.svg';
import gmailIcon from '../assets/gmail.svg';
import outlookIcon from '../assets/outlook.svg';
import stripeIcon from '../assets/stripe.svg';
import twitterIcon from '../assets/twitter.svg';
import logoMarkWhite from '../assets/logo-mark-white.png';

interface IntegrationItem {
  id: string;
  name: string;
  category: 'crm' | 'chat' | 'automation' | 'email';
  categoryLabel: string;
  description: string;
  icon: string;
  status: 'disconnected' | 'connecting' | 'connected';
  badgeBg: string;
}

const INTEGRATIONS_DATA: IntegrationItem[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'chat',
    categoryLabel: 'Chat & Collaboration',
    description: 'Instantly notify internal advocate channels, share pre-approved social copy, and trigger organic amplification in one click.',
    icon: slackIcon,
    status: 'disconnected',
    badgeBg: 'bg-rose-500',
  },
  {
    id: 'hubspot',
    name: 'Hubspot',
    category: 'crm',
    categoryLabel: 'CRM & Sales Integration',
    description: 'Sync your customer advocate contacts directly from pipeline stages and map down-funnel referral attribution.',
    icon: hubspotIcon,
    status: 'disconnected',
    badgeBg: 'bg-[#FF7A59]',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    categoryLabel: 'Workflow Automation',
    description: 'Connect Wozku to 5,000+ apps. Trigger automatic campaign shares and enroll advocates upon list signups.',
    icon: zapierIcon,
    status: 'disconnected',
    badgeBg: 'bg-[#FF4A00]',
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'chat',
    categoryLabel: 'Chat & Collaboration',
    description: 'Sync campaign playbooks, brand documentation guidelines, and pre-approved advocacy media lists directly to your workspaces.',
    icon: notionIcon,
    status: 'disconnected',
    badgeBg: 'bg-black',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'email',
    categoryLabel: 'Email & Delivery',
    description: 'Deliver automated advocate invitation sequences, campaign briefs, and custom performance updates via G Suite.',
    icon: gmailIcon,
    status: 'disconnected',
    badgeBg: 'bg-[#EA4335]',
  },
  {
    id: 'outlook',
    name: 'Outlook Exchange',
    category: 'email',
    categoryLabel: 'Email & Delivery',
    description: 'Integrate advocate communication modules securely with enterprise Microsoft 365 Exchange servers.',
    icon: outlookIcon,
    status: 'disconnected',
    badgeBg: 'bg-[#0078D4]',
  },
];

const ARCH_ITEMS = [
  { name: 'Slack', icon: slackIcon, bg: 'bg-[#FFE5EE]', color: '#E01E5A' },
  { name: 'Hubspot', icon: hubspotIcon, bg: 'bg-[#FFEAE0]', color: '#FF7A59' },
  { name: 'Zapier', icon: zapierIcon, bg: 'bg-[#FFEBE0]', color: '#FF4A00' },
  { name: 'Notion', icon: notionIcon, bg: 'bg-[#F0F0F0]', color: '#000000' },
  { name: 'Gmail', icon: gmailIcon, bg: 'bg-[#FFEBEB]', color: '#EA4335' },
  { name: 'Outlook', icon: outlookIcon, bg: 'bg-[#E5F5FF]', color: '#0078D4' },
  { name: 'Stripe', icon: stripeIcon, bg: 'bg-[#ECE9FF]', color: '#635BFF' },
  { name: 'Twitter', icon: twitterIcon, bg: 'bg-[#E5F7FF]', color: '#1DA1F2' }
];

export default function EcosystemIntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(INTEGRATIONS_DATA);
  const [activeCategory, setActiveCategory] = useState<'all' | 'crm' | 'chat' | 'automation' | 'email'>('all');

  // Connection states
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [clientKey, setClientKey] = useState('');

  // Rotation states for the arch icons
  const [tOffset, setTOffset] = useState(0);
  const [hoveredArchIndex, setHoveredArchIndex] = useState<number | null>(null);
  const requestRef = useRef<number | null>(null);

  // Smooth rotation animation loop
  useEffect(() => {
    const animate = () => {
      // Pause rotation if user is hovering over any arch icon
      if (hoveredArchIndex === null) {
        setTOffset((prev) => (prev + 0.0006) % 1);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoveredArchIndex]);

  const handleConnectClick = (id: string) => {
    setConnectingId(id);
    setClientKey('');
  };

  const handleStartConnection = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setIntegrations(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'connecting' } : item
    ));
    setConnectingId(null);

    setTimeout(() => {
      setIntegrations(prev => prev.map(item =>
        item.id === id ? { ...item, status: 'connected' } : item
      ));
    }, 1800);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'disconnected' } : item
    ));
  };

  const filtered = integrations.filter(item =>
    activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900 pb-20">

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-0 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 mb-8">
            <Link className="w-3.5 h-3.5" /> Integration Hub
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            All Your Tools. One<br />Powerful Hub.
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
            From CRM platforms to messaging channels, bring everything together with Wozku integrations and manage advocate reach in one place.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
            className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] uppercase font-extrabold py-3 px-8 rounded-full shadow-lg hover:scale-[1.02] cursor-pointer transition-all active:scale-[0.98]"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* ── 2. ROTATING ARCHED VISUAL ─────────────────────────────── */}
      {/* TWEAKABLE: Increase the marginTop value below to push the curve animation (and the "All Tools" section) further down. */}
      <section
        className="relative h-[170px] max-w-4xl mx-auto px-4 overflow-hidden mb-12 flex justify-center items-start"
        style={{ marginTop: '2px' }}
      >
        {/* The arched gray baseline path rendered responsively inside SVG */}
        {/* TWEAKABLE: Adjust the opacity value below (e.g., 0.35 = 35% opacity) to change the line visibility. */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.35 }}
        >
          <svg viewBox="0 0 800 150" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="archLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0" />
                <stop offset="15%" stopColor="#cbd5e1" stopOpacity="1" />
                <stop offset="85%" stopColor="#cbd5e1" stopOpacity="1" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 40,140 Q 400,10 760,140" fill="none" stroke="url(#archLineGradient)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Arched icons container */}
        <div className="relative w-full h-full">
          {/* Rotating items along the exact Bezier path */}
          {ARCH_ITEMS.map((item, index) => {
            const baseT = index / ARCH_ITEMS.length;
            const t = (baseT + tOffset) % 1;

            // Calculate exact Bezier point coordinates
            const x = (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 400 + t * t * 760;
            const y = (1 - t) * (1 - t) * 140 + 2 * (1 - t) * t * 10 + t * t * 140;

            const leftPct = (x / 800) * 100;
            const topPct = (y / 150) * 100;
            const scale = 0.85 + 0.3 * Math.sin(t * Math.PI);
            const opacity = Math.sin(t * Math.PI);

            return (
              <div
                key={item.name}
                className="absolute z-10 transition-shadow"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  opacity: opacity,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                }}
                onMouseEnter={() => setHoveredArchIndex(index)}
                onMouseLeave={() => setHoveredArchIndex(null)}
              >
                <div
                  className={[
                    'rounded-full flex items-center justify-center shadow-md border border-white cursor-pointer transition-all duration-300 w-11 h-11',
                    item.bg,
                    hoveredArchIndex === index ? 'scale-115 ring-4 ring-indigo-500/10' : ''
                  ].join(' ')}
                  style={{
                    backgroundColor: item.bg === 'bg-black' ? '#000' : undefined,
                  }}
                >
                  <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" />
                </div>

                {/* Tooltip on Hover showing name */}
                {hoveredArchIndex === index && (
                  <div
                    className="absolute z-20 bg-[#0c0c0e] border border-white/10 text-white text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
                    style={{
                      bottom: '-45px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. TOOLS LIST & FILTER ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">All Tools</h2>
        </div>

        {/* Categories filters */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-12">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'crm', label: 'CRMs & Sales' },
            { id: 'chat', label: 'Chat & Collaboration' },
            { id: 'automation', label: 'Workflow Automation' },
            { id: 'email', label: 'Email & Delivery' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={[
                'px-5 py-2.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest border transition-all cursor-pointer select-none',
                activeCategory === cat.id
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                  : 'border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of integration cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* Logo Icon */}
                      <div className={['w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 bg-slate-50 p-2'].join(' ')}>
                        <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                      </div>

                      {/* Status Checkmark */}
                      {item.status === 'connected' && (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected
                        </span>
                      )}
                      {item.status === 'connecting' && (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                          <RefreshCw className="h-2.5 w-2.5 animate-spin" /> Handshake
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight font-sans">{item.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{item.categoryLabel}</span>
                      <p className="text-xs text-slate-500 leading-relaxed mt-2.5">{item.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                    {item.status === 'connected' ? (
                      <button
                        onClick={() => handleDisconnect(item.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-mono font-extrabold uppercase py-1.5 px-4 rounded-full border border-red-100 cursor-pointer transition-all select-none"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnectClick(item.id)}
                        disabled={item.status === 'connecting'}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-mono font-extrabold uppercase py-1.5 px-4 rounded-full cursor-pointer transition-all select-none disabled:opacity-50"
                      >
                        + Connect
                      </button>
                    )}

                    <a href="#/resources/ecosystem-integrations" onClick={e => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-demo-modal')); }}
                      className="text-xs text-slate-405 hover:text-indigo-600 font-bold transition-colors flex items-center gap-1">
                      Documentation <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Config Overlay inside the Card */}
                  <AnimatePresence>
                    {connectingId === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-between z-10 border border-indigo-200"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 tracking-wider">Setup connection</span>
                            <button onClick={() => setConnectingId(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-800">Verify authorization</h4>
                            <p className="text-[11px] text-slate-450 mt-0.5">Please provide API Client Key or Secret token to enable automatic sync.</p>
                          </div>

                          <form onSubmit={(e) => handleStartConnection(e, item.id)} className="space-y-3">
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-400 mb-1">API Token Key</label>
                              <input
                                type="text"
                                required
                                value={clientKey}
                                onChange={e => setClientKey(e.target.value)}
                                placeholder="api_key_wozku_..."
                                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none transition-all placeholder:text-slate-350"
                              />
                            </div>

                            <div className="pt-2 flex gap-2">
                              <button
                                type="button"
                                onClick={() => setConnectingId(null)}
                                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 text-[10px] font-mono font-bold uppercase py-2.5 rounded-xl border border-slate-200 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono font-bold uppercase py-2.5 rounded-xl cursor-pointer"
                              >
                                Connect
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </section>

    </main>
  );
}
