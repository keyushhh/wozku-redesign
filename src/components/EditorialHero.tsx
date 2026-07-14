import React, { useId } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Megaphone, ShieldCheck, Users } from 'lucide-react';

type ShapeName = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

// A deliberately small silhouette family: same soft 14% outer radius and a subtle 12% tab depth.
// Each outline is one continuous path, so there are no layered or fake tab elements.
const shapes: Record<ShapeName, string> = {
  a: 'M14 12 H47 C54 12 57 9 59 4 C60 1 63 0 67 0 H86 C94 0 100 6 100 14 V86 C100 94 94 100 86 100 H14 C6 100 0 94 0 86 V26 C0 18 6 12 14 12 Z',
  b: 'M14 0 H37 C43 0 46 3 47 8 C48 11 51 12 56 12 H86 C94 12 100 18 100 26 V86 C100 94 94 100 86 100 H14 C6 100 0 94 0 86 V14 C0 6 6 0 14 0 Z',
  c: 'M14 12 H44 C49 12 52 11 53 8 C55 3 59 0 65 0 H86 C94 0 100 6 100 14 V86 C100 94 94 100 86 100 H14 C6 100 0 94 0 86 V26 C0 18 6 12 14 12 Z',
  d: 'M16 0 H84 C93 0 100 7 100 16 V84 C100 93 93 100 84 100 H16 C7 100 0 93 0 84 V16 C0 7 7 0 16 0 Z',
  e: 'M14 0 H40 C46 0 49 3 51 8 C52 11 55 12 60 12 H86 C94 12 100 18 100 26 V86 C100 94 94 100 86 100 H14 C6 100 0 94 0 86 V14 C0 6 6 0 14 0 Z',
  // The compact D keeps D's horizontal radius but increases its vertical curve so short cards retain the same perceived softness.
  f: 'M16 0 H84 C93 0 100 15 100 30 V70 C100 85 93 100 84 100 H16 C7 100 0 85 0 70 V30 C0 15 7 0 16 0 Z',
};

type FolderCardProps = { shape: ShapeName; surface: string; className?: string; children: React.ReactNode };
type FolderVariantProps = Omit<FolderCardProps, 'shape'>;

function FolderCard({ shape, surface, className = '', children }: FolderCardProps) {
  const clipId = `folder-card-${useId().replace(/:/g, '')}`;
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><clipPath id={clipId}><path d={shapes[shape]} /></clipPath></defs>
        <path d={shapes[shape]} fill={surface} />
      </svg>
      {/* Content is deliberately not CSS-clipped: CSS URL clip paths use a different coordinate space
          from the SVG viewBox and were cutting off the lower editorial content. Padding keeps it
          safely inside the visible SVG silhouette. */}
      <div className="absolute inset-0 overflow-hidden">{children}</div>
    </div>
  );
}

// Reusable family members for future editorial layouts.
const FolderCardA = (props: FolderVariantProps) => <FolderCard {...props} shape="a" />;
const FolderCardB = (props: FolderVariantProps) => <FolderCard {...props} shape="b" />;
const FolderCardC = (props: FolderVariantProps) => <FolderCard {...props} shape="c" />;
const FolderCardD = ({ compact = false, ...props }: FolderVariantProps & { compact?: boolean }) => <FolderCard {...props} shape={compact ? 'f' : 'd'} />;
const FolderCardE = (props: FolderVariantProps) => <FolderCard {...props} shape="e" />;

export default function EditorialHero({ onOpenDemo }: { onOpenDemo: () => void }) {
  const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } });

  return (
    <section className="relative z-10 h-[calc(100svh-76px)] min-h-[640px] overflow-hidden pt-9 lg:pt-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[235px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[100px] dark:bg-indigo-500/[0.1]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.p {...rise(0)} className="text-[10px] font-mono font-bold uppercase tracking-[0.17em] text-indigo-650 dark:text-indigo-300">Wozku · Organic distribution</motion.p>
        <motion.h1 {...rise(0.06)} className="mx-auto mt-2 max-w-4xl font-display text-[40px] font-black leading-[0.98] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-[56px] dark:text-white">Your story travels further<br /><span className="text-indigo-650 dark:text-indigo-400">when people share it.</span></motion.h1>
        <motion.p {...rise(0.12)} className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">Help the people closest to your brand share with confidence—and see the impact of every conversation.</motion.p>
        <motion.div {...rise(0.18)} className="mt-3 flex justify-center"><button onClick={onOpenDemo} className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-neutral-950/15 transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-neutral-950">Book a demo <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button></motion.div>
      </div>

      <motion.div {...rise(0.25)} className="relative mx-auto -mt-8 grid h-[384px] max-w-[1280px] grid-cols-[1.02fr_1.12fr_.98fr_1.12fr_1.02fr] items-end gap-3 px-4 sm:gap-4 sm:px-6">
        <div className="flex h-full flex-col gap-3">
          <FolderCardA surface="var(--indigo-900)" className="min-h-0 flex-1">
            <div className="relative flex h-full flex-col justify-between p-4 text-white sm:p-5"><svg className="absolute inset-x-0 top-6 h-20 w-full fill-none stroke-[var(--accent-300)] opacity-20" viewBox="0 0 200 80"><path d="M-6 60 L50 27 L108 50 L206 11" strokeWidth="8" /><path d="M-6 76 L50 43 L108 66 L206 27" strokeWidth="8" /></svg><div className="relative"><p className="pt-5 font-display text-5xl font-black leading-none">8×</p><p className="mt-3 max-w-[130px] text-[10px] leading-snug text-white/75">More trusted than paid ads.</p></div><div className="relative flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2.5 text-[10px] font-bold"><span>Share with trust</span><ArrowUpRight className="h-5 w-5 rounded-full bg-[var(--accent-300)] p-1 text-[var(--indigo-950)]" /></div></div>
          </FolderCardA>
          <FolderCardD compact surface="#1d1d1f" className="h-[110px]"><div className="flex h-full items-center gap-3 p-4 text-white"><Users className="h-7 w-7 shrink-0 text-[var(--accent-300)]" /><div className="min-w-0 flex-1"><p className="font-display text-lg font-black leading-[0.95]">Your people<br />have the reach.</p><p className="mt-1 text-[8px] text-white/55">Employees, partners, customers.</p></div><ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--accent-300)]" /></div></FolderCardD>
        </div>

        <FolderCardB surface="var(--indigo-950)" className="h-[294px]">
          <div className="flex h-full flex-col justify-between p-5 text-white"><span className="text-[10px] font-medium text-white/65"></span><div><div className="flex -space-x-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--indigo-950)] bg-rose-400 text-[8px] font-bold">AM</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--indigo-950)] bg-sky-400 text-[8px] font-bold">RK</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--indigo-950)] bg-amber-400 text-[8px] font-bold">NL</span></div><p className="mt-3 font-display text-2xl font-black leading-[0.95]">Make every share feel personal.</p><p className="mt-2 max-w-[165px] text-[8px] leading-relaxed text-white/60">A clear voice for the networks that trust it.</p></div><button onClick={onOpenDemo} className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[9px] font-bold text-[var(--accent-300)]"><span>Explore advocacy</span><ArrowUpRight className="h-3.5 w-3.5" /></button></div>
        </FolderCardB>

        <FolderCardD surface="#dbe5e5" className="h-[222px]">
          <div className="flex h-full flex-col justify-end p-5 text-left"><div className="mb-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-indigo-650"><Megaphone className="h-4 w-4" /></div><p className="font-display text-xl font-black leading-[0.98] text-neutral-900">Start with<br />one story.</p><p className="mt-1.5 text-[8px] text-neutral-600">Bring your next launch to the people who matter.</p><div className="mt-3 flex items-center gap-2 rounded-xl bg-white/80 p-1.5"><input aria-label="Work email" type="email" placeholder="Enter work email" className="min-w-0 flex-1 bg-transparent px-2 text-[9px] text-neutral-800 outline-none placeholder:text-neutral-500" /><button onClick={onOpenDemo} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-white"><ArrowUpRight className="h-3.5 w-3.5" /></button></div></div>
        </FolderCardD>

        <FolderCardC surface="var(--indigo-950)" className="h-[294px]">
          <div className="flex h-full flex-col justify-between p-5 text-white"><span className="text-[10px] font-medium text-white/65">Partner network</span><div><p className="font-display text-2xl font-black leading-[0.95]">Turn momentum into meaningful reach.</p><p className="mt-2 text-[8px] leading-relaxed text-white/60">Give every advocate a thoughtful place to begin.</p><div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold text-[var(--accent-300)]"><Check className="h-3.5 w-3.5" /> Approved to share</div></div><div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[8px] text-white/55"><span>1,284 advocates ready</span><span>View network →</span></div></div>
        </FolderCardC>

        <div className="flex h-full flex-col gap-3">
          <FolderCardE surface="var(--accent-300)" className="min-h-0 flex-1">
            <div className="relative flex h-full flex-col justify-between p-4 text-[var(--indigo-950)] sm:p-5"><svg className="absolute inset-0 h-full w-full fill-none stroke-[var(--accent-700)] opacity-20" viewBox="0 0 160 160"><path d="M-10 105 C30 58 66 128 170 48" strokeWidth="6" /><path d="M-10 135 C30 88 66 158 170 78" strokeWidth="6" /></svg><div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/65"><Copy className="h-4 w-4 text-[var(--accent-700)]" /></div><div className="relative"><p className="mb-3 text-[10px] font-semibold">Every share, attributed.</p><div className="flex items-center justify-between rounded-2xl bg-white/30 px-3 py-2.5 text-[10px] font-bold"><span>See the impact</span><ArrowUpRight className="h-5 w-5 rounded-full bg-neutral-950 p-1 text-white" /></div></div></div>
          </FolderCardE>
          <FolderCardD compact surface="var(--indigo-950)" className="h-[110px]"><div className="flex h-full items-center gap-3 p-4 text-white"><ShieldCheck className="h-7 w-7 shrink-0 text-[var(--accent-300)]" /><div className="min-w-0 flex-1"><p className="font-display text-lg font-black leading-[0.95]">Built for<br />safe sharing.</p><p className="mt-1 text-[8px] text-white/55">Always on-brand. Always in control.</p></div><button onClick={onOpenDemo} aria-label="Learn about safe sharing" className="flex h-6 w-6 shrink-0 items-center justify-center bg-white/10 text-[var(--accent-300)]"><ArrowUpRight className="h-3.5 w-3.5" /></button></div></FolderCardD>
        </div>
      </motion.div>
    </section>
  );
}
