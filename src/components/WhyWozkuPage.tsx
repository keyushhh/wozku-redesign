import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, Sparkles, TrendingUp, Shield, Users, Zap,
  Globe, BarChart3, Lock, CheckCircle2, ArrowUpRight, Star
} from 'lucide-react';

const STATS = [
  { value: '4.8×', label: 'Average ROI in 90 days', sublabel: 'Across 200+ deployments' },
  { value: '68%', label: 'Reduction in paid ad spend', sublabel: 'Replaced by organic reach' },
  { value: '3.2M+', label: 'Advocate posts generated', sublabel: 'In the last 12 months' },
  { value: '97%', label: 'Customer retention rate', sublabel: 'Year-over-year' },
];

const PILLARS = [
  {
    icon: <Users className="w-5 h-5" />,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    title: 'Your people are your best channel',
    body: 'Every employee, partner, and customer carries a network that no paid campaign can replicate. Wozku converts those idle connections into measurable pipeline - without asking anyone to change their workflow.'
  },
  {
    icon: <Zap className="w-5 h-5" />,
    color: 'text-secondary-600 bg-secondary-50 border-secondary-100',
    title: 'Activation in 48 hours, not 48 weeks',
    body: 'Legacy advocacy platforms take months of implementation, training, and change management. Wozku plugs directly into Slack, Teams, and your CRM - your first campaign can go live before your next all-hands.'
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    title: 'Attribution your CFO will actually believe',
    body: 'Every share, click, and conversion is traced back to the exact advocate post that triggered it. Wozku closes the attribution loop between social activity and pipeline dollars - visible in Salesforce or HubSpot on day one.'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    title: 'Enterprise-grade from the ground up',
    body: 'SOC2 Type II, GDPR, and HIPAA-ready architecture with role-based permissions, approval workflows, and a full audit trail. Compliance teams sign off in a single review cycle - not a six-month security questionnaire.'
  },
  {
    icon: <Globe className="w-5 h-5" />,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
    title: 'Global reach, local relevance',
    body: 'Multi-language content libraries, regional campaign managers, and timezone-aware scheduling mean your advocacy program works whether your team is in San Francisco, Singapore, or São Paulo.'
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-accent-600 bg-accent-50 border-accent-100',
    title: 'Growth that compounds over time',
    body: 'Unlike paid channels that go dark the moment you stop spending, organic advocacy builds durable brand equity. The more your advocates share, the stronger your search signals, social proof, and inbound pipeline become.'
  },
];

const COMPARISONS = [
  { feature: 'CRM-native attribution', wozku: true, generic: false },
  { feature: 'Slack & Teams native workflow', wozku: true, generic: false },
  { feature: 'Approval & compliance guardrails', wozku: true, generic: 'Partial' },
  { feature: 'Gamification & leaderboards', wozku: true, generic: true },
  { feature: 'AI content recommendations', wozku: true, generic: false },
  { feature: 'Event badge-scan advocacy', wozku: true, generic: false },
  { feature: 'SOC2 Type II certified', wozku: true, generic: 'Partial' },
  { feature: 'Live 48-hour onboarding', wozku: true, generic: false },
];

const TESTIMONIALS = [
  {
    quote: "We replaced three separate tools - advocacy, analytics, and scheduling - with Wozku. The platform paid for itself in the first quarter.",
    name: 'Priya Mehra',
    role: 'CMO, Nexlayer',
    initials: 'PM'
  },
  {
    quote: "Our sales team shares content they're actually proud of. Wozku made advocacy feel natural instead of corporate. Pipeline from organic went up 3× in 60 days.",
    name: 'James Harlow',
    role: 'VP Sales, Forma Cloud',
    initials: 'JH'
  },
  {
    quote: "The attribution data alone was worth the investment. For the first time, our board could see exactly how social activity was driving ARR.",
    name: 'Sofia Ruiz',
    role: 'Head of Growth, TrailPeak',
    initials: 'SR'
  }
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

export default function WhyWozkuPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans overflow-hidden selection:bg-indigo-500/10 selection:text-indigo-900">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.07),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
          <FadeIn>
            <span className="inline-flex items-center gap-1.5 text-[9.5px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Why Wozku
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-neutral-900 tracking-tight leading-[1.08]">
              The advocacy platform<br className="hidden sm:block" />
              <span className="text-indigo-600"> built for revenue.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Most advocacy tools measure likes. Wozku measures pipeline. We built the only platform that connects advocate activity directly to revenue - with the compliance controls, integrations, and activation speed that enterprise teams demand.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-indigo-500/20"
              >
                Request a Live Demo <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { window.location.hash = '#/resources/roi-calculator'; }}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                Calculate Your ROI <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <FadeIn delay={i * 0.06}>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">{s.value}</div>
                  <div className="text-xs font-bold text-neutral-700">{s.label}</div>
                  <div className="text-[10px] text-neutral-400 font-medium">{s.sublabel}</div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6-Pillar Grid ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block text-[9.5px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold">The Wozku Difference</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Why teams choose us<br className="hidden sm:block" /> over everything else
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <div key={p.title}>
                <FadeIn delay={i * 0.05}>
                  <div className="group h-full bg-white border border-slate-200 hover:border-indigo-200 rounded-3xl p-7 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 hover:scale-[1.01]">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl border ${p.color}`}>
                      {p.icon}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 leading-snug">{p.title}</h3>
                    <p className="text-[11.5px] text-neutral-600 leading-relaxed font-medium">{p.body}</p>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-4xl mx-auto space-y-12">
          <FadeIn className="text-center space-y-3">
            <span className="inline-block text-[9.5px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold">Head-to-Head</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
              Wozku vs. generic tools
            </h2>
            <p className="text-sm text-neutral-500 max-w-xl mx-auto font-medium">
              Purpose-built advocacy infrastructure stacks up differently than stitched-together point solutions.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/80 px-6 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">Capability</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 font-mono text-center">Wozku</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono text-center">Generic Tools</span>
              </div>
              {COMPARISONS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 px-6 py-4 items-center ${i < COMPARISONS.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <span className="text-xs font-semibold text-neutral-700">{row.feature}</span>
                  <span className="flex justify-center">
                    {row.wozku === true && <CheckCircle2 className="w-4.5 h-4.5 text-indigo-500" />}
                  </span>
                  <span className="flex justify-center">
                    {row.generic === true
                      ? <CheckCircle2 className="w-4.5 h-4.5 text-slate-300" />
                      : row.generic === 'Partial'
                      ? <span className="text-[9px] font-bold text-amber-500 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">Partial</span>
                      : <span className="text-slate-300 font-bold text-sm leading-none">-</span>
                    }
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn className="text-center space-y-2">
            <span className="inline-block text-[9.5px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold">Customer Stories</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
              Teams that made the switch
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name}>
                <FadeIn delay={i * 0.07}>
                  <div className="group h-full bg-white border border-slate-200 hover:border-indigo-200 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-700 leading-relaxed font-medium italic">"{t.quote}"</p>
                    </div>
                    <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                      <span className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 font-mono shrink-0">
                        {t.initials}
                      </span>
                      <div>
                        <div className="text-[10px] font-bold text-neutral-900">{t.name}</div>
                        <div className="text-[9px] text-slate-400 font-medium">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-5xl mx-auto bg-[#09090f] text-fixed-white rounded-[2.5rem] p-8 sm:p-14 border border-fixed-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots-accent opacity-15 pointer-events-none" />
          <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-secondary-500/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
            <FadeIn>
              <span className="inline-flex items-center gap-1.5 text-[8.5px] uppercase font-mono tracking-widest text-indigo-400 font-extrabold bg-indigo-950 border border-indigo-900/50 px-3.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Ready to see it live?
              </span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-fixed-white tracking-tight leading-tight">
                See Wozku in action<br className="hidden sm:block" /> in 30 minutes.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xs text-fixed-light font-medium leading-relaxed">
                Walk through a live demo tailored to your team size, industry, and advocacy goals. No slide decks. Just product.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                  className="bg-indigo-600 hover:bg-indigo-500 text-fixed-white text-xs font-bold px-7 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  Schedule a Demo <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { window.location.hash = '#/pricing'; }}
                  className="border border-fixed-white/20 hover:border-fixed-white/35 text-fixed-light hover:text-fixed-white text-xs font-bold px-7 py-3 rounded-xl transition-all cursor-pointer"
                >
                  View Pricing
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </main>
  );
}
