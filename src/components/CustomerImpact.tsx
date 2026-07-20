import React from 'react';
import { motion } from 'motion/react';

export default function CustomerImpact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl mx-auto px-6 py-6 relative z-10">
      
      {/* CARD 1: SALESFORCE */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-between space-y-6 relative group"
      >
        {/* Editorial Divider line */}
        <div className="h-[1px] w-full bg-neutral-200 group-hover:bg-primary-500/50 transition-colors duration-500" />
        
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary-600 uppercase">
            Salesforce
          </span>
          
          {/* Giant elegant display typography */}
          <div className="text-7xl sm:text-8xl font-display font-light text-neutral-900 tracking-tight mt-4 mb-1 flex items-baseline leading-none">
            11<span className="text-primary-650 text-5xl font-normal ml-0.5">x</span>
          </div>
          
          <div className="text-[10px] font-mono font-extrabold text-neutral-450 uppercase tracking-widest mb-4">
            ROI Multiplier
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-[1.5px] w-10 bg-primary-500/60" />
          <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium max-w-sm">
            Bypassed expensive search bidding algorithms by activating cross-departmental employees on LinkedIn, scaling organic revenue attribution in 45 days.
          </p>
        </div>
      </motion.div>

      {/* CARD 2: RED HAT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-between space-y-6 relative group"
      >
        {/* Editorial Divider line */}
        <div className="h-[1px] w-full bg-neutral-200 group-hover:bg-emerald-500/50 transition-colors duration-500" />

        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase">
            Red Hat
          </span>
          
          {/* Giant elegant display typography */}
          <div className="text-7xl sm:text-8xl font-display font-light text-neutral-900 tracking-tight mt-4 mb-1 leading-none">
            987
          </div>
          
          <div className="text-[10px] font-mono font-extrabold text-neutral-450 uppercase tracking-widest mb-4">
            Summit Registrations / $0 Paid
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-[1.5px] w-10 bg-emerald-500/60" />
          <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium max-w-sm">
            Leveraged pre-approved attendee dispatches at scale to amplify their signature summit, driving registration velocity with zero paid agency spend.
          </p>
        </div>
      </motion.div>

      {/* CARD 3: WOMEN IN CLOUD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-between space-y-6 relative group"
      >
        {/* Editorial Divider line */}
        <div className="h-[1px] w-full bg-neutral-200 group-hover:bg-violet-500/50 transition-colors duration-500" />

        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-violet-600 uppercase">
            Women In Cloud
          </span>
          
          {/* Giant elegant display typography */}
          <div className="text-7xl sm:text-8xl font-display font-light text-neutral-900 tracking-tight mt-4 mb-1 flex items-baseline leading-none">
            3.9<span className="text-violet-650 text-5xl font-normal ml-0.5">M</span>
          </div>
          
          <div className="text-[10px] font-mono font-extrabold text-neutral-450 uppercase tracking-widest mb-4">
            Organic Impressions
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-[1.5px] w-10 bg-violet-500/60" />
          <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium max-w-sm">
            Orchestrated coordinated advocate dispatches that triggered the LinkedIn algorithm, driving high-impact reach to millions of buyers.
          </p>
        </div>
      </motion.div>

    </div>
  );
}
