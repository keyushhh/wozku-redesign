import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, Sparkles, CheckCircle2, User, Building, Mail, 
  ChevronRight, RefreshCw, Star, Users, ArrowUpRight, ChevronDown
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<'form' | 'submitting' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    size: '100-500 employees',
    objective: 'Event Social Advocacy',
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  // Auto-generate some upcoming business dates for high-fidelity booking
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  
  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    let count = 0;
    while (count < 5) {
      today.setDate(today.getDate() + 1);
      // Skip weekends (0 is Sunday, 6 is Saturday)
      if (today.getDay() !== 0 && today.getDay() !== 6) {
        dates.push(today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        count++;
      }
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
    setSelectedTime('10:00 AM EST');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }
    if (!formData.company.trim()) {
      setError('Please enter your company name.');
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
      name: '',
      email: '',
      company: '',
      size: '100-500 employees',
      objective: 'Event Social Advocacy',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header banner glow */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-600 via-secondary-600 to-accent-600" />
            
            {/* Top Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              
              <AnimatePresence mode="wait">
                {step === 'form' && (
                  <motion.div
                    key="form-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="space-y-2 pr-6">
                      <h3 className="text-2xl font-display font-black text-neutral-900 tracking-tight leading-tight">
                        Experience Wozku Live
                      </h3>
                      <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                        Book a 15-minute customized product tour. We will map out your company's potential organic reach and design a simulated event advocacy campaign.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600 font-medium">
                          {error}
                        </div>
                      )}

                      {/* Name and Company Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Full Name</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Alex Mercer"
                              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Company Name</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                              <Building className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Acme Corp"
                              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Work Email Address</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="alex@company.com"
                            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50"
                          />
                        </div>
                      </div>

                      {/* Company Size & Objective */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Company Size</label>
                          <div className="relative w-full">
                            <select
                              name="size"
                              value={formData.size}
                              onChange={handleInputChange}
                              className="appearance-none w-full text-xs pl-3 pr-8 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50 cursor-pointer"
                            >
                              <option>10-99 employees</option>
                              <option>100-500 employees</option>
                              <option>500-2000 employees</option>
                              <option>2000+ employees</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-500" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Primary Goal</label>
                          <div className="relative w-full">
                            <select
                              name="objective"
                              value={formData.objective}
                              onChange={handleInputChange}
                              className="appearance-none w-full text-xs pl-3 pr-8 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50 cursor-pointer"
                            >
                              <option>Event Social Advocacy</option>
                              <option>Employee Brand Distribution</option>
                              <option>Partner Network Amplification</option>
                              <option>Bypass Paid Social Ad Spend</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-500" />
                          </div>
                        </div>
                      </div>

                      {/* High fidelity interactive calendar date/time slots selector */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                            Preferred Live Date & Slot
                          </label>
                          <span className="text-[9px] font-semibold text-emerald-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Instantly Confirmed
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {/* Dates dropdown */}
                          <div className="relative">
                          <div className="relative w-full">
                            <select
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="appearance-none w-full text-xs pl-3 pr-8 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50 cursor-pointer"
                            >
                              {availableDates.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-500" />
                          </div>
                          </div>

                          {/* Times dropdown */}
                          <div>
                          <div className="relative w-full">
                            <select
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              className="appearance-none w-full text-xs pl-3 pr-8 py-2.5 rounded-xl border border-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-neutral-50/50 cursor-pointer"
                            >
                              <option value="10:00 AM EST">10:00 AM EST</option>
                              <option value="11:30 AM EST">11:30 AM EST</option>
                              <option value="1:00 PM EST">1:00 PM EST</option>
                              <option value="3:30 PM EST">3:30 PM EST</option>
                              <option value="4:45 PM EST">4:45 PM EST</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-500" />
                          </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit CTA button */}
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 mt-4"
                      >
                        Secure 15-Min Demo Slot
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>

                    {/* Trust badges */}
                    <div className="flex items-center justify-around text-center pt-3 border-t border-neutral-100">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-neutral-400 block uppercase">No-pressure tour</span>
                        <div className="flex items-center justify-center gap-0.5 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-2.5 h-2.5 fill-amber-500 stroke-none" />)}
                        </div>
                      </div>
                      <div className="h-6 w-px bg-neutral-100" />
                      <div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 block uppercase">Trusted By</span>
                        <span className="text-[10px] text-neutral-700 font-bold">50+ Enterprise Teams</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'submitting' && (
                  <motion.div
                    key="submitting-step"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="p-4 bg-indigo-50 rounded-full border border-indigo-100 relative">
                      <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-neutral-900 uppercase font-mono tracking-wider">Syncing Calendars...</h4>
                      <p className="text-xs text-neutral-500 max-w-xs">Allocating slot on {selectedDate} at {selectedTime} and assigning dedicated account engineer...</p>
                    </div>
                  </motion.div>
                )}

                {step === 'confirmed' && (
                  <motion.div
                    key="confirmed-step"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-6"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="p-3 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase font-mono tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        DEMO RESERVED
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-black text-neutral-900 tracking-tight leading-none">
                        You're Booked, {formData.name}!
                      </h3>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                        A calendar invitation and direct meeting link has been dispatched to <strong>{formData.email}</strong>.
                      </p>
                    </div>

                    {/* Ticket style confirmation summary */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 max-w-sm mx-auto divide-y divide-neutral-100 text-left">
                      <div className="pb-3 space-y-1.5">
                        <span className="text-[9px] font-mono text-neutral-400 block uppercase">SESSION DETAILS</span>
                        <div className="flex justify-between text-xs text-neutral-800">
                          <span className="font-semibold flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            {selectedDate}
                          </span>
                          <span className="font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            {selectedTime}
                          </span>
                        </div>
                      </div>

                      <div className="py-3 space-y-1.5">
                        <span className="text-[9px] font-mono text-neutral-400 block uppercase">ASSIGNED WOZKU STRATEGIST</span>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">
                            MK
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-900">Marcus Kaelen</p>
                            <p className="text-[9px] text-neutral-400 leading-none">Enterprise Architect, Wozku</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                          <span>Custom reach forecast dashboard prepared</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Return To Website
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
