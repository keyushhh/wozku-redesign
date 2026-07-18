import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, CheckCircle2, Star } from 'lucide-react';
import LogoWhiteTransparent from '../assets/Logo_White_Transparent.png';
import linkedinIcon from '../assets/linkedin.svg';
import linkedinInvertedIcon from '../assets/linkedin-inverted.svg';
import { Button, Input, Label } from './FormControls';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setError('');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [isOpen]);

  // Keyboard Focus Trap & Accessibility
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      const focusTimeout = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input');
        if (firstInput) {
          (firstInput as HTMLElement).focus({ preventScroll: true });
        } else {
          modalRef.current?.focus({ preventScroll: true });
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
          previouslyFocusedElement.current.focus({ preventScroll: true });
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
    setError('');

    // Basic Validation
    if (mode === 'signup' && !formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.password) {
      setError('Password is required.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Success State
    setStep('confirmed');
  };

  const handleLinkedInLogin = () => {
    setError('');
    setStep('confirmed');
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

          {/* Modal Card Content (Height sizes to content snugly, 2-panel layout) */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={modalAnimation}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={modalTransition}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh] focus:outline-hidden"
          >
            {/* Top Close button */}
            <button
              onClick={onClose}
              aria-label="Close authentication modal"
              className="absolute right-4 top-4 z-30 rounded-full p-2 text-white transition-[background-color,color,transform] duration-200 hover:rotate-90 hover:bg-red-500/10 hover:text-red-500 focus-visible:rotate-90 focus-visible:bg-red-550 focus-visible:text-red-600 focus-visible:outline-none md:text-neutral-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex w-full min-h-0 flex-1 flex-col md:flex-row">
              {/* Left Panel (Branding & Features) */}
              <aside className="relative flex shrink-0 flex-col overflow-hidden bg-neutral-900 px-7 py-8 text-white md:w-[42%] md:px-9 md:py-9 justify-between">
                <div className="pointer-events-none absolute inset-0 bg-grid-dots-accent opacity-5" />
                <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                
                <div className="relative">
                  <img src={LogoWhiteTransparent} alt="Wozku" className="h-7 w-auto" />
                </div>

                <div className="relative my-6 space-y-4 md:my-auto">
                  <div>
                    <p className="mb-2 text-[10px] font-mono font-bold uppercase tracking-[.18em] text-indigo-300">Welcome to Wozku</p>
                    <h2 className="max-w-sm font-display text-2xl font-black leading-tight tracking-tight">Your advocate dashboard is waiting</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Track your shared posts',
                      'See your reach in real time',
                      'Manage your advocate network',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[11px] text-neutral-200">
                        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                          <svg className="h-3 w-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust strip matching DemoModal */}
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
              <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-8 sm:px-9 md:py-8 flex flex-col">
                <AnimatePresence mode="wait">
                  {step === 'form' ? (
                    <motion.div
                      key={mode}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="my-auto space-y-5"
                    >
                      <div className="pr-7">
                        <h3 id="auth-modal-title" className="font-display text-3xl font-black tracking-tight text-neutral-900">
                          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                          {mode === 'signin'
                            ? 'Sign in to access your advocate dashboard.'
                            : 'Start scaling your organic brand reach today.'}
                        </p>
                      </div>

                      {/* Continue with LinkedIn */}
                      <div className="space-y-3.5">
                        <button
                          type="button"
                          onClick={handleLinkedInLogin}
                          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#0A66C2] bg-white hover:bg-[#0A66C2] px-4 text-xs font-bold text-[#0A66C2] hover:text-white transition-all duration-200 cursor-pointer modal-control-height"
                        >
                          <div className="relative h-4.5 w-4.5 flex items-center justify-center">
                            <img
                              src={linkedinIcon}
                              className="absolute h-full w-full object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                              alt=""
                              aria-hidden="true"
                            />
                            <img
                              src={linkedinInvertedIcon}
                              className="absolute h-full w-full object-contain transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                              alt=""
                              aria-hidden="true"
                            />
                          </div>
                          <span>Continue with LinkedIn</span>
                        </button>

                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                          </div>
                          <span className="relative bg-white px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            or continue with email
                          </span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {error && (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                            {error}
                          </div>
                        )}

                        {mode === 'signup' && (
                          <div>
                            <Label required>Full Name</Label>
                            <Input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Alex Mercer"
                              autoComplete="name"
                              required
                            />
                          </div>
                        )}

                        <div>
                          <Label required>Email Address</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="alex@company.com"
                            autoComplete="email"
                            required
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <Label required>Password</Label>
                            {mode === 'signin' && (
                              <button
                                type="button"
                                className="text-[10px] font-mono font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
                                onClick={() => alert('Forgot password helper coming soon!')}
                              >
                                Forgot password?
                              </button>
                            )}
                          </div>
                          <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                            required
                          />
                        </div>

                        {mode === 'signup' && (
                          <div>
                            <Label required>Confirm Password</Label>
                            <Input
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="••••••••"
                              autoComplete="new-password"
                              required
                            />
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full uppercase tracking-wider mt-2 cursor-pointer modal-control-height"
                        >
                          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                        </Button>
                      </form>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setMode(mode === 'signin' ? 'signup' : 'signin');
                            setError('');
                          }}
                          className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                        >
                          {mode === 'signin' ? (
                            <>
                              Don't have an account?{' '}
                              <span className="text-indigo-600 font-bold hover:underline">Sign up</span>
                            </>
                          ) : (
                            <>
                              Already have an account?{' '}
                              <span className="text-indigo-600 font-bold hover:underline">Sign in</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirmed"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="my-auto flex flex-col items-center justify-center text-center py-8 space-y-5"
                    >
                      <div className="rounded-full border border-emerald-100 bg-emerald-50 p-3 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display text-2.5xl font-black text-neutral-900 leading-tight">
                          You're all set!
                        </h3>
                        <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                          Backend integration coming soon. Thank you for testing the Wozku sign-in/up flow!
                        </p>
                      </div>
                      <Button onClick={onClose} className="w-full max-w-xs cursor-pointer">
                        Return to Website
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
