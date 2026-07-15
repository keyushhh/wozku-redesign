import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Label({ children, optional, required }: { children: React.ReactNode; optional?: boolean; required?: boolean }) {
  return (
    <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-500 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5 font-sans text-xs">*</span>}
      {optional && <span className="normal-case font-sans font-medium tracking-normal text-neutral-400"> (optional)</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-900 placeholder:text-neutral-450 transition-all focus:border-indigo-505 focus:ring-4 focus:ring-indigo-100/60 focus:outline-hidden modal-control-height ${props.className ?? ''}`} />;
}

export function Button({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center modal-control-height ${className}`} />;
}

export function CustomSelect({ label, options, value, onChange, tone = 'light', open, onOpenChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void; tone?: 'light' | 'dark'; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = open ?? uncontrolledOpen;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setOpen = (nextOpen: boolean) => { if (open === undefined) setUncontrolledOpen(nextOpen); onOpenChange?.(nextOpen); };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      {tone === 'light' ? <Label>{label}</Label> : <label className="mb-1.5 block text-[10px] font-mono uppercase tracking-wider text-fixed-muted">{label}</label>}
      <button type="button" onClick={() => setOpen(!isOpen)} className={`flex w-full items-center justify-between rounded-xl px-3.5 text-xs transition-colors focus:outline-none modal-control-height ${tone === 'light' ? 'border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 focus:border-indigo-500' : 'border border-fixed-white/10 bg-[#141418] text-fixed-white hover:border-fixed-white/20 focus:border-indigo-550'}`}>
        <span className="truncate">{value}</span>
        <ChevronDown className={`ml-3 h-3.5 w-3.5 shrink-0 ${tone === 'light' ? 'text-neutral-400' : 'text-fixed-light'} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }} className={`mt-1.5 overflow-hidden rounded-xl py-1 shadow-xl ${tone === 'light' ? 'border border-neutral-200 bg-white' : 'border border-fixed-white/10 bg-[#141418]'}`}>
            {options.map((option) => <button key={option} type="button" onClick={() => { onChange(option); setOpen(false); }} className={`block w-full px-3.5 py-2.5 text-left text-[11px] transition-colors ${tone === 'light' ? `hover:bg-indigo-50 ${option === value ? 'bg-indigo-50 font-bold text-indigo-700' : 'text-neutral-700'}` : `hover:bg-indigo-600/10 ${option === value ? 'bg-indigo-600/5 font-bold text-indigo-400' : 'text-fixed-white'}`}`}>{option}</button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
