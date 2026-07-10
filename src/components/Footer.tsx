import React from 'react';
import { ShieldCheck, Mail, MapPin } from 'lucide-react';
import LogoWhiteTransparent from '../assets/Logo_White_Transparent.png';
import instagramIcon from '../assets/instagram.svg';
import twitterFilledIcon from '../assets/twitter-filled.svg';
import linkedinIcon from '../assets/linkedin.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050506] border-t border-fixed-white/5 py-16 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-fixed-white/5">
          
          {/* Logo block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img src={LogoWhiteTransparent} className="h-9 w-auto object-contain" alt="Wozku Logo" />
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Wozku is a next-generation advocacy marketing platform that helps enterprise organizations transform organic employee, community, and partner advocates into measurable social reach.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                SOC2 Ready
              </span>
              <span className="h-1 w-1 bg-neutral-800 rounded-full" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-4 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" aria-label="Instagram">
                <img src={instagramIcon} className="h-4 w-4 opacity-70 hover:opacity-100 transition-opacity object-contain" alt="Instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" aria-label="Twitter">
                <img src={twitterFilledIcon} className="h-4 w-4 opacity-70 hover:opacity-100 transition-opacity object-contain" alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <img src={linkedinIcon} className="h-4 w-4 opacity-70 hover:opacity-100 transition-opacity object-contain" alt="LinkedIn" />
              </a>
            </div>
          </div>

          {/* Links 1: Platform */}
          <div className="md:col-span-2 space-y-3.5">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Platform</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">Event Activation</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">Community Growth</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">Partner Portal</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">Analytics</a></li>
            </ul>
          </div>

          {/* Links 2: Company */}
          <div className="md:col-span-2 space-y-3.5">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Company</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">About Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">Careers</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider whitespace-nowrap">Contact</a></li>
            </ul>
          </div>

          {/* Links 3 - Contact */}
          <div className="md:col-span-4 space-y-3.5">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Global Offices</h5>
            <ul className="space-y-2 text-xs text-neutral-400 font-mono">
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>S-4, 269 Panchanantala Road, Kolkata 700041</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>contact@wozku.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal disclosures */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Wozku AS. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Security Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
