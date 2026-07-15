import React, { useEffect, useState } from 'react';
import india from '@svg-maps/india';
import {
  ArrowRight,
  Sparkles,
  Users,
  Cpu,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  MapPin,
  Building,
  Phone,
  Clock,
  Compass
} from 'lucide-react';
import KamanashishImg from '../assets/kamanashish.webp';
import MithileshImg from '../assets/mithilesh.webp';
import JayantImg from '../assets/jayant.webp';
import VishwanathImg from '../assets/vishwanath.webp';
import linkedinIcon from '../assets/linkedin.svg';

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
  email: string;
  linkedin: string;
  github: string;
}

interface OfficeAddress {
  city: string;
  stateId: string;
  name: string;
  role: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  markerX: number;
  markerY: number;
}

// ─── Team Data (Simplified Copy) ───────────────────────────────
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'roy',
    name: 'Kamanashish Roy',
    shortName: 'K. Roy',
    role: 'Founder & CEO',
    quote: 'Wozku helps you build trust and reach new customers naturally through word-of-mouth. We are building the simplest tools to turn recommendations into a reliable marketing channel.',
    email: 'roy@wozku.com',
    linkedin: 'linkedin.com/in/roy-wozku',
    github: 'github.com/roy-wozku',
    image: KamanashishImg,
    focusModules: [
      { name: 'Growth Strategy', desc: 'Helping brands get recommended by people, not ads.' },
      { name: 'Customer Focus', desc: 'Connecting with users and making their experience outstanding.' },
      { name: 'Execution', desc: 'Ensuring the team ships software that solves real business problems.' }
    ]
  },
  {
    id: 'mithilesh',
    name: 'Mithilesh Das',
    shortName: 'M. Das',
    role: 'Co-founder & CTO',
    quote: 'We build Wozku to run fast, remain secure, and connect easily with the tools your team uses every day.',
    email: 'mithilesh@wozku.com',
    linkedin: 'linkedin.com/in/mithilesh-wozku',
    github: 'github.com/mithilesh-wozku',
    image: MithileshImg,
    focusModules: [
      { name: 'Reliable Systems', desc: 'Designing fast software that keeps running under heavy loads.' },
      { name: 'Intelligent Timing', desc: 'Scheduling posts automatically when people are most active.' },
      { name: 'Low-Latency Delivery', desc: 'Making sure notifications and emails arrive in seconds.' }
    ]
  },
  {
    id: 'jayant',
    name: 'Jayant Kumar Mahto',
    shortName: 'J. Mahto',
    role: 'Co-founder & COO',
    quote: 'Operations should be invisible and efficient. We ensure our team has the support they need to build great tools for you.',
    email: 'jayant@wozku.com',
    linkedin: 'linkedin.com/in/jayant-wozku',
    github: 'github.com/jayant-wozku',
    image: JayantImg,
    focusModules: [
      { name: 'Smooth Operations', desc: 'Designing simple processes that keep the business running.' },
      { name: 'System Efficiency', desc: 'Keeping server costs low and delivery speeds high.' },
      { name: 'Safety & Rules', desc: 'Managing security practices, data privacy, and legal checks.' }
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
    focusModules: [
      { name: 'Revenue Growth', desc: 'Helping customers see the direct value and savings from their sharing programs.' },
      { name: 'Customer Support', desc: 'Working with global clients to ensure their teams succeed.' },
      { name: 'CRM Integrations', desc: 'Linking customer sharing statistics directly into HubSpot or Salesforce.' }
    ]
  }
];

// ─── Office Data ────────────────────────────────────────────────
const OFFICES: Record<string, OfficeAddress> = {
  wb: {
    city: 'Kolkata',
    stateId: 'wb',
    name: 'South Kolkata Office',
    role: 'Core Systems',
    address: 'S-4, 269 Panchanantala Road, Kolkata 700041',
    landmark: 'Near Panchanantala Road',
    phone: '+91 (033) 4066 8200',
    hours: '9:00 AM – 6:00 PM IST, Mon – Fri',
    markerX: 412,
    markerY: 310,
  },
  ka: {
    city: 'Bengaluru',
    stateId: 'ka',
    name: 'BHIVE MG Road Campus',
    role: 'Engineering & Enterprise Support',
    address: '1st Floor, BHIVE Premium Ramanashree, MG Road, Bengaluru - 560025',
    landmark: 'Ramanashree Arcade',
    phone: '+91 (080) 6122 4500',
    hours: '9:30 AM – 6:30 PM IST, Mon – Fri',
    markerX: 171,
    markerY: 519,
  },
};

function getTargetVB(office: OfficeAddress | null): string {
  if (!office) return '0 0 612 696';
  const scale = 2.4;
  const vw = 612 / scale;
  const vh = 696 / scale;
  const x = Math.max(0, Math.min(612 - vw, office.markerX - vw / 2));
  const y = Math.max(0, Math.min(696 - vh, office.markerY - vh / 2));
  return `${x} ${y} ${vw} ${vh}`;
}

export default function CoreTeamPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);

  const activeOffice = selectedOfficeId ? OFFICES[selectedOfficeId] : null;
  const targetVB = activeOffice ? getTargetVB(activeOffice) : '0 0 612 696';

  const getBeforeBorderClass = (idx: number) => {
    const dist = activeIndex - (idx + 1);
    if (dist === 0) return 'dark:border-white/10';
    return 'dark:border-white/5';
  };

  const getAfterBorderClass = (idx: number) => {
    const dist = idx - 1 - activeIndex;
    if (dist === 0) return 'dark:border-white/10';
    return 'dark:border-white/5';
  };

  const activeMember = TEAM_MEMBERS[activeIndex];
  const [selectedModule, setSelectedModule] = useState<FocusModule>(activeMember.focusModules[0]);

  const handleMemberChange = (idx: number) => {
    setActiveIndex(idx);
    setSelectedModule(TEAM_MEMBERS[idx].focusModules[0]);
  };

  const beforeActive = TEAM_MEMBERS.slice(0, activeIndex);
  const afterActive = TEAM_MEMBERS.slice(activeIndex + 1);

  const isDarkMode = false;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* Hero */}
      <section className="relative pt-16 pb-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.07),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 text-[9.5px] uppercase font-mono tracking-widest text-indigo-650 font-extrabold bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5" /> Meet the Authors
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-neutral-950 tracking-tight leading-tight">
            We build tools for<br />
            <span className="text-indigo-600">people-powered growth.</span>
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
            Learn more about the team behind Wozku and explore our office locations across India.
          </p>
        </div>
      </section>

      {/* Team Bios section */}
      <section className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch border border-slate-200/20 dark:border-white/5 rounded-[2rem] overflow-hidden bg-slate-100/50 shadow-inner">
            
            {/* Columns before active */}
            {beforeActive.map((member) => (
              <div key={member.id} className={`flex border-r border-slate-200/10 ${getBeforeBorderClass(TEAM_MEMBERS.indexOf(member))}`}>
                <InactiveCol member={member} idx={TEAM_MEMBERS.indexOf(member)} onClick={() => handleMemberChange(TEAM_MEMBERS.indexOf(member))} />
              </div>
            ))}

            {/* Active member column */}
            <div className="flex-1 bg-white p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10 relative">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shadow-sm shrink-0">
                    <img src={activeMember.image} className="h-full w-full object-cover" alt="" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{activeMember.name}</h3>
                    <p className="text-xs text-indigo-650 font-bold">{activeMember.role}</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 italic leading-relaxed">
                  "{activeMember.quote}"
                </p>

                <div className="h-px bg-slate-100" />

                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">Focus Module</span>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.focusModules.map((m) => (
                      <button
                        key={m.name}
                        onClick={() => setSelectedModule(m)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          selectedModule.name === m.name
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-350 text-neutral-650'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed mt-2 pl-1 font-medium">
                    {selectedModule.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <a href={`mailto:${activeMember.email}`} className="text-xs text-neutral-500 hover:text-neutral-950 font-medium inline-flex items-center gap-1.5 transition-colors">
                  <Mail className="h-4 w-4" /> {activeMember.email}
                </a>
                <div className="flex items-center gap-2">
                  <a href={`https://${activeMember.linkedin}`} target="_blank" rel="noreferrer" className="p-2 border border-slate-200 hover:border-slate-350 rounded-xl transition-all shadow-3xs cursor-pointer flex items-center justify-center">
                    <img src={linkedinIcon} className="h-4 w-4 object-contain opacity-80 hover:opacity-100 transition-opacity" alt="LinkedIn" />
                  </a>
                  <a href={`https://${activeMember.github}`} target="_blank" rel="noreferrer" className="p-2 border border-slate-200 hover:border-slate-350 text-neutral-500 hover:text-neutral-950 rounded-xl transition-all shadow-3xs cursor-pointer"><Github className="h-4 w-4" /></a>
                </div>
              </div>
            </div>

            {/* Columns after active */}
            {afterActive.map((member) => (
              <div key={member.id} className={`flex border-l border-slate-200/10 ${getAfterBorderClass(TEAM_MEMBERS.indexOf(member))}`}>
                <InactiveCol member={member} idx={TEAM_MEMBERS.indexOf(member)} onClick={() => handleMemberChange(TEAM_MEMBERS.indexOf(member))} />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── 3. VALUES SECTION ── */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Core Principle 01</span>
              <h4 className="text-sm font-bold text-slate-800">Trust in People</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe sharing visibility should reflect authentic connections, not paid bidding wars or algorithm traps.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Core Principle 02</span>
              <h4 className="text-sm font-bold text-slate-800">Safety First</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Users never expose accounts or passwords. Feeds connect safely through secure system authorization guidelines.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-indigo-600 uppercase tracking-widest block">Core Principle 03</span>
              <h4 className="text-sm font-bold text-slate-800">Easy to Use</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sharing works when it fits standard habits. Wozku lives inside Slack and email, requiring no new app installations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. OFFICE MAPS (Merged) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[9.5px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold block">OUR LOCATIONS</span>
            <h2 className="text-3xl font-display font-extrabold text-neutral-900 tracking-tight">
              Engineering & Support Hubs
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              We operate out of Kolkata and Bengaluru. Select an office on the map to find contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-slate-50 border border-slate-200/50 rounded-[2.5rem] p-6 sm:p-10 shadow-3xs">
            
            {/* Map panel (Left) */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center">
              <div className="relative w-full max-w-[450px] aspect-[612/696] rounded-2xl bg-white border border-slate-200 p-6 shadow-xs overflow-hidden">
                <svg
                  viewBox={targetVB}
                  className="w-full h-full stroke-indigo-200 fill-slate-100 transition-all duration-700 ease-in-out"
                >
                  {india.locations.map((loc: any) => {
                    const isKa = loc.id === 'ka';
                    const isWb = loc.id === 'wb';
                    const isOffice = isKa || isWb;
                    const isSelected = selectedOfficeId === loc.id;
                    
                    return (
                      <path
                        key={loc.id}
                        d={loc.path}
                        onClick={() => isOffice && setSelectedOfficeId(isSelected ? null : loc.id)}
                        className={`transition-colors duration-300 ${
                          isOffice 
                            ? isSelected
                              ? 'fill-indigo-500 stroke-indigo-650 cursor-pointer'
                              : 'fill-indigo-50 hover:fill-indigo-100 stroke-indigo-300 cursor-pointer'
                            : 'fill-slate-100 stroke-slate-200'
                        }`}
                      />
                    );
                  })}
                  
                  {/* Markers */}
                  {Object.values(OFFICES).map((off) => {
                    const isSelected = selectedOfficeId === off.stateId;
                    return (
                      <g key={off.stateId} onClick={() => setSelectedOfficeId(isSelected ? null : off.stateId)} className="cursor-pointer group">
                        <circle
                          cx={off.markerX}
                          cy={off.markerY}
                          r={isSelected ? 10 : 7}
                          className={`stroke-white stroke-2 transition-all duration-300 ${
                            isSelected ? 'fill-indigo-600' : 'fill-indigo-500 group-hover:fill-indigo-650'
                          }`}
                        />
                        <circle
                          cx={off.markerX}
                          cy={off.markerY}
                          r={isSelected ? 20 : 14}
                          className={`fill-indigo-500/20 stroke-none animate-ping ${isSelected ? 'inline' : 'hidden group-hover:inline'}`}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Redesigned stacked Office Details (Right) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block pl-1">Active Office Hubs</span>
              
              <div className="space-y-4">
                {Object.values(OFFICES).map((off) => {
                  const isSelected = selectedOfficeId === off.stateId;
                  return (
                    <div
                      key={off.stateId}
                      onClick={() => setSelectedOfficeId(isSelected ? null : off.stateId)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-50/70 border-indigo-550 shadow-xs scale-[1.01]'
                          : 'bg-white border-slate-200/80 hover:border-slate-350 hover:bg-slate-50/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className={`h-4.5 w-4.5 shrink-0 ${isSelected ? 'text-indigo-650' : 'text-neutral-400'}`} />
                            <h4 className="text-sm font-extrabold text-neutral-900">{off.city} Office</h4>
                          </div>
                          <p className="text-[9.5px] text-indigo-650 font-bold uppercase tracking-wider pl-6">{off.role}</p>
                        </div>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-mono font-bold ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {off.stateId.toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-3.5 space-y-1 text-xs text-neutral-650 pl-6 leading-relaxed font-medium">
                        <p>{off.address}</p>
                        <p className="text-[10px] text-neutral-400 font-semibold mt-1">Landmark: {off.landmark}</p>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-slate-100/80 grid grid-cols-2 gap-2 text-[10.5px] text-neutral-500 pl-6">
                        <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" /> {off.phone}</div>
                        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-neutral-400 shrink-0" /> {off.hours.split(',')[0]}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-[#09090f] text-fixed-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--indigo-500) 14%, transparent), transparent 65%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-400">
            <Cpu className="w-3.5 h-3.5" /> Technical Support
          </span>
          <h2 className="text-3xl font-display font-extrabold text-fixed-white">Have questions about setting up?</h2>
          <p className="text-xs text-fixed-light max-w-md mx-auto leading-relaxed">
            Reach out to our engineering team to review SSO setups, data security protocols, or compliance checklists.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="support@yourcompany.com"
              className="flex-1 w-full sm:w-auto bg-[#141418] border border-fixed-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-fixed-white placeholder:text-fixed-muted focus:outline-none transition-all"
            />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-650 hover:bg-indigo-550 text-fixed-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

// Inactive member list card component
function InactiveCol({ member, idx, onClick }: { member: TeamMember, idx: number, onClick: () => void }) {


  return (
    <div 
      onClick={onClick}
      className="w-[100px] hidden md:flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-100/80 border-slate-200/10 py-10 px-2 text-center h-full select-none cursor-pointer transition-all duration-200"
    >
      <div className="space-y-4">
        <span className="h-9 w-9 rounded-full overflow-hidden border border-slate-200/30 bg-slate-100/50 inline-block shadow-sm">
          <img src={member.image} className="h-full w-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100" alt="" />
        </span>
        <div className="[writing-mode:vertical-rl] text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 select-none">
          {member.shortName}
        </div>
      </div>
    </div>
  );
}
