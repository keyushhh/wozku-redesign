import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, ChevronRight, RefreshCw, Star, X } from 'lucide-react';
import LogoWhiteTransparent from '../assets/Logo_White_Transparent.png';
import { Button, Input, Label } from './FormControls';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<'form' | 'submitting' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [showCalComAlert, setShowCalComAlert] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Keyboard Focus Trap & A11y
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      const focusTimeout = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input');
        if (firstInput) {
          (firstInput as HTMLElement).focus();
        } else {
          modalRef.current?.focus();
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          if (!modalRef.current) return;
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(focusTimeout);
        window.removeEventListener('keydown', handleKeyDown);
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }

    setStep('submitting');
    setTimeout(() => {
      setStep('confirmed');
    }, 1800);
  };

  const handleReset = () => {
    setStep('form');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
    });
    setError('');
    setShowCalComAlert(false);
    onClose();
  };

  const modalAnimation = shouldReduceMotion
    ? { opacity: 1, scale: 1, y: 0 }
    : { opacity: 1, scale: 1, y: 0 };

  const modalTransition = shouldReduceMotion
    ? { duration: 0.05 }
    : { type: 'spring', damping: 25, stiffness: 350 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card Content (Height sizes to content snugly) */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={modalAnimation}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={modalTransition}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh] focus:outline-hidden"
          >
            {/* Top Close button */}
            <button
              onClick={onClose}
              aria-label="Close demo form"
              className="absolute right-4 top-4 z-30 rounded-full p-2 text-white transition-[background-color,color,transform] duration-200 hover:rotate-90 hover:bg-red-500/10 hover:text-red-500 focus-visible:rotate-90 focus-visible:bg-red-50 focus-visible:text-red-600 focus-visible:outline-none md:text-neutral-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex w-full flex-col md:flex-row h-full">
              {/* Left Panel (Branding & Stats) */}
              <aside className="relative flex shrink-0 flex-col overflow-hidden bg-neutral-900 px-7 py-8 text-white md:w-[42%] md:px-9 md:py-9 justify-between">
                <div className="pointer-events-none absolute inset-0 bg-grid-dots-accent opacity-5" />
                <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                
                <div className="relative">
                  <img src={LogoWhiteTransparent} alt="Wozku" className="h-7 w-auto" />
                </div>

                <div className="relative my-6 space-y-4 md:my-auto">
                  <div>
                    <p className="mb-2 text-[10px] font-mono font-bold uppercase tracking-[.18em] text-indigo-300">Your Wozku walkthrough</p>
                    <h2 className="max-w-sm font-display text-2xl font-black leading-tight tracking-tight">See how Wozku turns your advocates into reach</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Map your existing advocate network',
                      'Build an organic reach forecast',
                      'See campaign attribution in action',
                      'Leave with a tailored rollout plan',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[11px] text-neutral-200">
                        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                          {/* Checked indicator */}
                          <svg className="h-3 w-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end gap-3 border-l border-white/15 pl-3 pt-1">
                    <span className="font-display text-2xl font-black text-white">8x</span>
                    <span className="pb-1 text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                      Average ROI<br />multiplier
                    </span>
                  </div>
                </div>

                <div className="relative mt-6 flex items-center gap-2.5 border-t border-white/10 pt-4 shrink-0">
                  <div className="flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-current stroke-none" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-200">Trusted by 50+ Enterprise Teams</span>
                </div>
              </aside>

              {/* Right Panel (Form / Confirmation) */}
              <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-8 sm:px-9 md:py-8 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {step === 'form' && (
                    <motion.div
                      key="form-view"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <div className="pr-7">
                        <h3 id="demo-modal-title" className="font-display text-3xl font-black tracking-tight text-neutral-900">Experience Wozku Live</h3>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500">Book a 15-minute customized product tour. We will map out your company's potential organic reach and design a simulated event advocacy campaign.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {error && (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                            {error}
                          </div>
                        )}

                        <div>
                          <Label>Full Name</Label>
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Alex Mercer *"
                            required
                          />
                        </div>

                        <div>
                          <Label>Company Email</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="alex@company.com *"
                            required
                          />
                        </div>

                        <div>
                          <Label>Phone Number</Label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 000-0000 *"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 uppercase tracking-wider"
                        >
                          Secure 15-min demo slot
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {step === 'submitting' && (
                    <motion.div
                      key="submitting-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[300px] flex-col items-center justify-center space-y-4 text-center"
                    >
                      <div className="rounded-full border border-indigo-100 bg-indigo-50 p-4">
                        <RefreshCw className="h-8 w-8 animate-spin text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-neutral-900">Syncing Calendars...</h4>
                        <p className="mt-1 text-xs text-neutral-500">Allocating your custom slot and preparing strategist briefing.</p>
                      </div>
                    </motion.div>
                  )}

                  {step === 'confirmed' && (
                    <motion.div
                      key="confirmed-view"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-full min-h-[300px] flex-col items-center justify-center space-y-5 text-center py-4"
                    >
                      <div className="rounded-full border border-emerald-100 bg-emerald-50 p-3 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 id="demo-modal-title" className="font-display text-2.5xl font-black text-neutral-900 leading-tight">
                          You're Booked, {formData.fullName}!
                        </h3>
                        <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                          Thank you for booking a demo — <strong>Sarah from Wozku</strong> will reach out to you shortly!
                        </p>
                      </div>

                      <div className="space-y-3 w-full max-w-xs pt-2">
                        <button
                          type="button"
                          onClick={() => setShowCalComAlert(true)}
                          className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer hover:underline"
                        >
                          Want to select a date and time of your choice?
                        </button>

                        <AnimatePresence>
                          {showCalComAlert && (
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                              className="text-[11px] bg-indigo-50 border border-indigo-100 text-indigo-950 px-3.5 py-2.5 rounded-xl font-medium leading-normal"
                            >
                              🗓️ Cal.com integration coming soon! A direct scheduling invitation has been sent to your email.
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Button onClick={handleReset} className="cursor-pointer w-full max-w-xs mt-2">
                        Return To Website
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
