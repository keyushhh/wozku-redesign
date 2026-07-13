import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Cpu,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
} from 'lucide-react';
import KamanashishImg from '../assets/kamanashish.png';
import KamanashishDarkImg from '../assets/kamanashish-darkmode.png';
import MithileshImg from '../assets/mithilesh.png';
import MithileshDarkImg from '../assets/mithilesh-darkmode.png';
import JayantImg from '../assets/jayant.png';
import JayantDarkImg from '../assets/jayant-darkmode.png';
import VishwanathImg from '../assets/vishwanath.png';
import VishwanathDarkImg from '../assets/vishwanath-darkmode.png';

interface FocusModule {
  name: string;
  desc: string;
}

interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  role: string;
  quote: string;
  focusModules: FocusModule[];
  image: string;
  darkImage: string;
  email: string;
  linkedin: string;
  github: string;
}



// ─── Team Data ────────────────────────────────────────────────
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'roy',
    name: 'Kamanashish Roy',
    shortName: 'K. Roy',
    role: 'Founder & CEO',
    quote: 'Advocacy-Led Growth is the fourth engine of B2B marketing. We build audacious categories, bringing peers together to drive true organic distribution.',
    email: 'roy@wozku.com',
    linkedin: 'linkedin.com/in/roy-wozku',
    github: 'github.com/roy-wozku',
    image: KamanashishImg,
    darkImage: KamanashishDarkImg,
    focusModules: [
      { name: 'Advocacy Growth', desc: 'Shape advocacy as a dependable and measurable growth channel.' },
      { name: 'Enterprise GTM', desc: 'Bringing together the right strategies to construct new categories.' },
      { name: 'Execution', desc: 'Work across strategy, customers, and category definition.' }
    ]
  },
  {
    id: 'mithilesh',
    name: 'Mithilesh Das',
    shortName: 'M. Das',
    role: 'Co-founder & CTO',
    quote: 'Wozku drives product and technology by bringing together AI, engineering discipline, and massive scale to turn advocacy into a dependable growth channel.',
    email: 'mithilesh@wozku.com',
    linkedin: 'linkedin.com/in/mithilesh-wozku',
    github: 'github.com/mithilesh-wozku',
    image: MithileshImg,
    darkImage: MithileshDarkImg,
    focusModules: [
      { name: 'Scale Engineering', desc: 'Designing systems that are scalable, resilient, and future-ready.' },
      { name: 'AI Routing', desc: 'Integrating intelligent timing and auto-scheduling algorithms.' },
      { name: 'Event Queues', desc: 'Handling massive requests/sec concurrently with low-latency.' }
    ]
  },
  {
    id: 'jayant',
    name: 'Jayant Kumar Mahto',
    shortName: 'J. Mahto',
    role: 'Co-founder & COO',
    quote: 'Sustainable startup growth requires operational frameworks that are built to last. We ensure Wozku\'s advocacy engine is highly efficient and resilient.',
    email: 'jayant@wozku.com',
    linkedin: 'linkedin.com/in/jayant-wozku',
    github: 'github.com/jayant-wozku',
    image: JayantImg,
    darkImage: JayantDarkImg,
    focusModules: [
      { name: 'Operations Scale', desc: 'Startup operational scale and frameworks from the ground up.' },
      { name: 'Engine Efficiency', desc: 'Resource utilization, dispatch schedules and loop constraints.' },
      { name: 'Compliance', desc: 'Overseeing SOC2 data flows, GDPR compliance, and legal audits.' }
    ]
  },
  {
    id: 'vishwanath',
    name: 'Vishwanath Harpanahalli',
    shortName: 'V. Harpanahalli',
    role: 'Co-founder & CBO',
    quote: 'We transform products into revenue engines through category-defining go-to-market strategies, making advocacy a core global sales channel.',
    email: 'vishwanath@wozku.com',
    linkedin: 'linkedin.com/in/vishwanath-wozku',
    github: 'github.com/vishwanath-wozku',
    image: VishwanathImg,
    darkImage: VishwanathDarkImg,
    focusModules: [
      { name: 'Revenue Engines', desc: 'Transforming product value into scalable enterprise revenue loops.' },
      { name: 'Global Scale', desc: 'Scaling client adoption and GTM motions across global markets.' },
      { name: 'Sales CRM', desc: 'Integrating peer advocacy and referral loops into modern CRMs.' }
    ]
  }
];

export default function CoreTeamPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  // Helpers for dynamic border opacities based on distance from active card
  const getBeforeBorderClass = (idx: number) => {
    const dist = activeIndex - (idx + 1);
    if (dist === 0) return 'dark:border-white/25';
    if (dist === 1) return 'dark:border-white/12';
    if (dist === 2) return 'dark:border-white/5';
    return 'dark:border-white/5';
  };

  const getAfterBorderClass = (idx: number) => {
    const dist = idx - 1 - activeIndex;
    if (dist === 0) return 'dark:border-white/25';
    if (dist === 1) return 'dark:border-white/12';
    if (dist === 2) return 'dark:border-white/5';
    return 'dark:border-white/5';
  };

  const getInactiveColFooterBorderClass = (idx: number) => {
    const dist = Math.abs(idx - activeIndex);
    if (dist === 1) return 'dark:border-white/12';
    if (dist === 2) return 'dark:border-white/8';
    return 'dark:border-white/5';
  };
  const activeMember = TEAM_MEMBERS[activeIndex];
  const [selectedModule, setSelectedModule] = useState<FocusModule>(activeMember.focusModules[0]);

  const handleMemberChange = (idx: number) => {
    setActiveIndex(idx);
    setSelectedModule(TEAM_MEMBERS[idx].focusModules[0]);
  };

  // Split members into before/after the active one (Attio pattern)
  const beforeActive = TEAM_MEMBERS.slice(0, activeIndex);
  const afterActive  = TEAM_MEMBERS.slice(activeIndex + 1);

  // Inactive column width - each column is fixed
  const INACTIVE_W = 130;
  // Active portrait column width
  const PORTRAIT_W = 240;

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDarkMode(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getPortraitSrc = (member: TeamMember) => (isDarkMode ? member.darkImage : member.image);

  // Reusable inactive column
  const InactiveCol = ({ member, idx }: { member: typeof TEAM_MEMBERS[0]; idx: number }) => (
    <button
      key={member.id}
      onClick={() => handleMemberChange(idx)}
      title={`View ${member.name}`}
      className="relative shrink-0 cursor-pointer focus:outline-none group transition-colors duration-200 flex flex-col overflow-hidden bg-slate-100 dark:bg-[#0a0a0d]"
      style={{ width: `${INACTIVE_W}px` }}
    >
      {/* Portrait - scales to fill height, bottom-anchored */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 group-hover:opacity-50 transition-opacity duration-300"
          style={{ opacity: 0.35, transform: 'translateX(-50%) scale(2.0)', transformOrigin: 'bottom center' }}
        >
          <img src={getPortraitSrc(member)} alt={member.name} className="w-full h-full object-cover object-center rounded-sm" />
        </div>
      </div>
      {/* Name footer */}
      <div className={`shrink-0 border-t border-slate-200 px-4 py-3 ${getInactiveColFooterBorderClass(idx)}`}>
        <span className="text-[10px] font-mono text-slate-400 font-semibold whitespace-nowrap">{member.name}</span>
      </div>
    </button>
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0c0c0e] text-slate-900 dark:text-fixed-white font-sans selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* ── 1. HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-14 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--indigo-500) 6%, transparent), transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 mb-8">
            <Users className="w-3.5 h-3.5" />
            Core Team &amp; Authors
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            Meet Wozku's{' '}
            <span className="text-indigo-600 dark:text-indigo-400">engine authors.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Wozku was founded by distributed systems engineers and product builders focused on resolving modern marketing's distribution challenge. Meet the creators behind our advocacy engine.
          </p>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CAROUSEL - exact Attio layout ─────────────── */}
      <section className="pb-24 relative">
        <div className="px-4 sm:px-8 lg:px-12">

          {/* Fixed height, no shadow, thin border */}
          <div
            className="flex border border-slate-200 dark:border-white/15 rounded-2xl overflow-hidden bg-white dark:bg-black"
            style={{ height: '460px' }}
          >

            {/* ── COLUMNS BEFORE active (grey bg, left side) ── */}
            {beforeActive.map((member) => (
              <div key={member.id} className={`flex border-r border-slate-200 ${getBeforeBorderClass(TEAM_MEMBERS.indexOf(member))}`}>
                <InactiveCol member={member} idx={TEAM_MEMBERS.indexOf(member)} />
              </div>
            ))}

            {/* ── ACTIVE PORTRAIT COLUMN (white bg) ── */}
            <div
              className="relative shrink-0 flex flex-col border-r border-slate-200 dark:border-white/25 bg-white dark:bg-black overflow-hidden"
              style={{ width: `${PORTRAIT_W}px` }}
            >
              {/* Portrait - fills height, bottom-anchored */}
              <div className="flex-1 relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-1/2"
                  style={{ transform: 'translateX(-50%) scale(2.2)', transformOrigin: 'bottom center' }}
                >
                  <img src={getPortraitSrc(activeMember)} alt={activeMember.name} className="w-full h-full object-cover object-center" />
                </div>
              </div>
              {/* Name footer - divider + name */}
              <div className="shrink-0 border-t border-slate-200 dark:border-white/25 px-5 py-3">
                <span className="text-[10px] font-mono text-slate-500 dark:text-fixed-muted font-semibold">{activeMember.name}</span>
              </div>
            </div>

            {/* ── CONTENT PANEL (white bg, flex-1) ── */}
            <div className="flex-1 flex flex-col justify-between p-10 sm:p-12 min-w-0 bg-white dark:bg-black">

              {/* Quote block */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">Author statement</span>
                </div>
                <p className="text-xl sm:text-2xl font-serif italic text-slate-800 dark:text-fixed-white leading-snug font-medium">
                  "{activeMember.quote}"
                </p>
                <p className="text-sm text-slate-700 dark:text-fixed-light">
                  <strong>{activeMember.name}</strong>
                  <span className="text-slate-400">, {activeMember.role}</span>
                </p>
              </div>

              {/* Module tabs - pinned to bottom, matches Attio tab row */}
              <div className="border-t border-slate-100 dark:border-white/15 pt-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {activeMember.focusModules.map((mod) => {
                    const isModActive = selectedModule.name === mod.name;
                    return (
                      <button
                        key={mod.name}
                        onClick={() => setSelectedModule(mod)}
                        className={`flex items-center gap-1.5 text-[11px] font-medium transition-all cursor-pointer pb-1 border-b-2 ${
                          isModActive
                            ? 'border-indigo-500 text-slate-800 dark:text-fixed-white'
                            : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-fixed-light hover:border-slate-300'
                        }`}
                      >
                        {mod.name}
                      </button>
                    );
                  })}
                </div>
                {/* Module description */}
                <p className="text-xs text-slate-400 dark:text-fixed-muted mt-3 leading-relaxed">{selectedModule.desc}</p>
              </div>

            </div>

            {/* ── COLUMNS AFTER active (grey bg, right side) ── */}
            {afterActive.map((member) => (
              <div key={member.id} className={`flex border-l border-slate-200 ${getAfterBorderClass(TEAM_MEMBERS.indexOf(member))}`}>
                <InactiveCol member={member} idx={TEAM_MEMBERS.indexOf(member)} />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── 3. VALUES SECTION ───────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Core Principle 01</span>
              <h4 className="text-base font-extrabold text-slate-800">Decentralized Trust</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe social visibility should reflect authentic peer connections, not paid algorithm bidding wars.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Core Principle 02</span>
              <h4 className="text-base font-extrabold text-slate-800">Zero-Trust Identity</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Advocates never expose passwords or logins. System trust is delegated safely through scoped OAuth models.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Core Principle 03</span>
              <h4 className="text-base font-extrabold text-slate-800">Frictionless Staging</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Advocacy succeeds when it fits inside existing habits. Wozku lives inside Slack &amp; email, require no new installations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA SECTION (Dark Theme) ────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#09090f] text-fixed-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--indigo-500) 14%, transparent), transparent 65%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400 mb-6">
            <Cpu className="w-3.5 h-3.5" /> Core Team
          </span>
          <h2 className="text-4xl font-display font-extrabold text-fixed-white mb-4">Want to talk to our system designers?</h2>
          <p className="text-sm text-fixed-light max-w-lg mx-auto mb-8 leading-relaxed">
            Interested in the technical engineering behind Wozku's dispatch queues? Set up a technical review call.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="engineer@yourcompany.com"
              className="flex-1 w-full sm:w-auto bg-[#141418] border border-fixed-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-fixed-white placeholder:text-fixed-muted focus:outline-none transition-all"
            />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Request Tech Session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['SSO integrations setup', 'SLA contracts review', 'SOC2 data flow sheets'].map(t => (
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
