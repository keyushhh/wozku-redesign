import React from 'react';
import { motion } from 'motion/react';
import { Check, Flame, LineChart } from 'lucide-react';
import linkedinLogo from '../assets/linkedin.svg';

export default function InteractiveHeroCRM() {
  // Configured default 3D plane angles for the isometric look
  const isoAngles = {
    rotateX: 30,
    rotateY: -25,
    rotateZ: 15
  };

  // Smooth hover straightening properties (almost front-facing to preserve depth)
  const hoverState = {
    rotateX: 8,
    rotateY: 0,
    rotateZ: 0,
    scale: 1.05,
    z: 75,
    zIndex: 50,
    filter: "brightness(1.04)"
  };

  // Premium spring transition matching user specification
  const springTransition = {
    type: "spring",
    stiffness: 180,
    damping: 22,
    mass: 0.8
  };

  return (
    <div 
      className="relative w-full max-w-[440px] aspect-square flex items-center justify-center p-4 select-none"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Soft Ambient Glow (Behind the isometric visual) */}
      <div className="absolute w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* LAYER 1: Background/Phone Stacking Context */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          zIndex: 10
        }}
      >
        {/* 1. Central Mobile Device (The Hero) */}
        <motion.div
          style={{
            rotateX: 30,
            rotateY: -25,
            rotateZ: 15,
            z: 0,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -4, 0]
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-48 aspect-[9/18] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] relative flex flex-col justify-between"
        >
          {/* Phone Ear Piece Notch */}
          <div className="h-3 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-full mx-auto" />
          
          {/* Simulated Screen Interface Elements */}
          <div className="flex-1 my-4 space-y-3.5 text-left">
            <div className="space-y-1.5">
              <div className="h-2 w-1/3 bg-neutral-100 dark:bg-neutral-800 rounded" />
              <div className="h-2 w-5/6 bg-neutral-100 dark:bg-neutral-800 rounded" />
            </div>
            
            {/* Screen central card slot */}
            <div className="h-32 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-xl p-2.5 flex flex-col justify-between items-center text-center">
              <div className="h-1 w-10 bg-neutral-200 dark:bg-neutral-855 rounded-full" />
              
              {/* Crisp SVG QR Code */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-855 p-1.5 rounded-lg shadow-3xs my-0.5 shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 text-neutral-900 dark:text-fixed-white" viewBox="0 0 29 29" fill="currentColor">
                  {/* Standard QR code alignment patterns */}
                  <path d="M0 0h7v7H0zm2 2h3v3H2zm7 0h1v1H9zm1 2h1v1h-1zm-1 2h2v1H9z" />
                  <path d="M22 0h7v7h-7zm2 2h3v3h-3zm-13 0h1v1h-1zm1 3h2v1h-2z" />
                  <path d="M0 22h7v7H0zm2 2h3v3H2zm11-16h2v1h-2zm1 2h1v1h-1zm-1 2h2v1h-2z" />
                  {/* Abstract QR code data patterns */}
                  <path d="M9 9h2v1H9zm3 0h1v2h-1zm2 0h2v1h-2zm3 0h1v1h-1zm1 1h2v1h-2zm-3 2h1v1h-1zm2 0h2v1h-2zm-8 2h1v2h-1zm3 0h2v1h-2zm3 0h1v1h-1zm2 1h1v1h-1zm-6 2h1v1h-1zm3 0h2v1h-2zm2 1h1v1h-1zm-7 2h2v1H9zm3 0h1v1h-1zm2 0h2v1h-2z" />
                </svg>
              </div>

              <div className="h-3 w-14 bg-indigo-600 rounded-md" />
            </div>
          </div>

          {/* Home swipe indicator */}
          <div className="h-1 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-full mx-auto" />
        </motion.div>
      </div>

      {/* LAYER 2: Foreground Floating Cards Stacking Context */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          zIndex: 20
        }}
      >
        {/* 2. Floating Card: Guided UGC Copy (Emerging from top-left, raised z-depth) */}
        <motion.div
          style={{
            rotateX: 30,
            rotateY: -25,
            rotateZ: 15,
            z: 35,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -6, 0]
          }}
          whileHover={hoverState}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            default: springTransition
          }}
          className="absolute -left-12 top-14 z-20 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-855 p-4 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)] w-48 text-left space-y-2 cursor-pointer transition-shadow hover:shadow-[0_20px_45px_color-mix(in_srgb,var(--indigo-500)_18%,transparent)]"
        >
          <div className="flex items-center gap-2 pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
            <img src={linkedinLogo} className="w-4.5 h-auto object-contain opacity-95" alt="LinkedIn" />
            <span className="text-[9px] font-bold text-neutral-850 dark:text-fixed-white">LinkedIn UGC</span>
          </div>
          <p className="text-[8.5px] text-neutral-455 dark:text-fixed-light leading-relaxed font-sans font-medium">
            "Sharing our next product launch with our networks..."
          </p>
        </motion.div>


        {/* 3. Floating Card: Compliance Approval (Emerging from center-right) */}
        <motion.div
          style={{
            rotateX: 30,
            rotateY: -25,
            rotateZ: 15,
            z: 20,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -3, 0]
          }}
          whileHover={hoverState}
          transition={{
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            default: springTransition
          }}
          className="absolute -right-16 top-1/3 z-20 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-855 p-3.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)] w-44 text-left flex items-center gap-2.5 cursor-pointer transition-shadow hover:shadow-[0_20px_45px_color-mix(in_srgb,var(--indigo-500)_18%,transparent)]"
        >
          <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-emerald-650 dark:text-emerald-400 shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-neutral-800 dark:text-fixed-white block">Compliance Safe</span>
            <span className="text-[8px] text-neutral-450 font-mono">LEXICAL CHECK PASSED</span>
          </div>
        </motion.div>


        {/* 4. Floating Card: Analytics Snippet (Emerging from bottom-right, shallow z-depth) */}
        <motion.div
          style={{
            rotateX: 30,
            rotateY: -25,
            rotateZ: 15,
            z: 10,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -4, 0]
          }}
          whileHover={hoverState}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            default: springTransition
          }}
          className="absolute -right-8 bottom-16 z-20 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-855 p-4 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)] w-44 text-left space-y-1.5 cursor-pointer transition-shadow hover:shadow-[0_20px_45px_color-mix(in_srgb,var(--indigo-500)_18%,transparent)]"
        >
          <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400 uppercase">
            <span>Reach Growth</span>
            <LineChart className="w-3 h-3 text-indigo-500" />
          </div>
          <div>
            <span className="text-lg font-black font-display text-neutral-900 dark:text-fixed-white leading-none">85.3%</span>
            <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">↑ +24.1k Organic Views</span>
          </div>
        </motion.div>


        {/* 5. Floating Card: Hold & Fire Status (Emerging from bottom-left) */}
        <motion.div
          style={{
            rotateX: 30,
            rotateY: -25,
            rotateZ: 15,
            z: 25,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -5, 0]
          }}
          whileHover={hoverState}
          transition={{
            y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            default: springTransition
          }}
          className="absolute -left-16 bottom-20 z-20 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-855 p-4 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)] w-48 text-left space-y-2 cursor-pointer transition-shadow hover:shadow-[0_20px_45px_color-mix(in_srgb,var(--indigo-500)_18%,transparent)]"
        >
          <div className="flex items-center gap-1.5 text-[8.5px] font-mono font-bold text-indigo-650 dark:text-indigo-400 uppercase">
            <Flame className="w-3.5 h-3.5 text-indigo-500" /> Hold & Fire
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-neutral-600 dark:text-fixed-light font-medium">Coordinated release</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 font-mono text-[8px] font-bold">
              FIRED ✓
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
