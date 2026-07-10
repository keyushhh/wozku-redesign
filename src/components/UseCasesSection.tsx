import React, { useState } from 'react';
import { 
  Megaphone, 
  Sparkles, 
  Briefcase, 
  MessagesSquare, 
  Rocket, 
  Calendar,
  Check,
  TrendingUp,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UseCase } from '../types';

const USE_CASES: UseCase[] = [
  {
    id: 'marketing',
    title: 'Marketing Teams',
    icon: 'megaphone',
    subtitle: 'Unlock cost-effective, high-CTR reach',
    description: 'Transform employees and super-customers into an organic content network that beats costly paid social media campaigns.',
    bullets: [
      'Bypass modern social algorithms favoring personal accounts over corporate pages.',
      'Achieve up to 8x higher engagement rate than standardized paid digital advertisements.',
      'Measure exact conversion value and first-touch CTR without third-party pixel tracking.'
    ],
    metrics: [
      { label: 'Avg CTR Multiplier', value: '8.4x' },
      { label: 'Paid Ad Savings', value: '42%' },
      { label: 'Organic Conversion', value: '+310%' }
    ]
  },
  {
    id: 'branding',
    title: 'Employer Branding',
    icon: 'sparkles',
    subtitle: 'Turn company culture into your primary magnet',
    description: 'Empower your current employees to share real, authentic stories about their careers and daily successes inside your organization.',
    bullets: [
      'Enable employees to choose pre-approved social media template drafts with one tap.',
      'Increase organic Glassdoor and LinkedIn corporate sentiment signals.',
      'Establish your brand as a modern, transparent, and employee-first workplace.'
    ],
    metrics: [
      { label: 'LinkedIn Sentiment', value: '+68%' },
      { label: 'Organic Reach Boost', value: '3.5M' },
      { label: 'Brand Trust Score', value: '92/100' }
    ]
  },
  {
    id: 'recruitment',
    title: 'Recruitment',
    icon: 'briefcase',
    subtitle: 'Hire the top 1% passive tech talents',
    description: 'Activate your engineering and product teams to share active job slots into their own high-quality personal developer circles.',
    bullets: [
      'Sashay past passive talent headhunters by leveraging direct peer-to-peer developer trust.',
      'Reduce the overall cost-per-hire by up to 50% via automated employee referral rewards.',
      'Drastically improve application-to-hire ratios through hyper-targeted social circles.'
    ],
    metrics: [
      { label: 'Cost-Per-Hire Reduction', value: '52%' },
      { label: 'Time-To-Hire Loop', value: '-12 days' },
      { label: 'Referral Quality', value: '+74%' }
    ]
  },
  {
    id: 'comms',
    title: 'Internal Communications',
    icon: 'messages',
    subtitle: 'Unify corporate messages across divisions',
    description: 'Break down administrative information silos. Keep internal squads aligned, excited, and sharing unified statements during key updates.',
    bullets: [
      'Drive active alignment across remote and global office hubs with clear campaign boards.',
      'Gamify internal updates and celebrate team milestones on collaborative leaderboards.',
      'Encourage peer recognition with custom point transfers and swappable swag codes.'
    ],
    metrics: [
      { label: 'Employee Engagement', value: '94%' },
      { label: 'Information Alignment', value: '+85%' },
      { label: 'Active Participation', value: '78%' }
    ]
  },
  {
    id: 'launches',
    title: 'Product Launches',
    icon: 'rocket',
    subtitle: 'Make opening day go instantly viral',
    description: 'Coordinate hundreds of employee shares, stakeholder posts, and partner blogs to blast out at the exact same hour of your release.',
    bullets: [
      'Coordinate coordinated social "thunderclaps" to maximize launch day momentum.',
      'Create custom ambassador loops with media packs and custom invite channels.',
      'Trace real-time telemetry from Product Hunt and TechCrunch traffic surges.'
    ],
    metrics: [
      { label: 'First-Day Impressions', value: '1.2M' },
      { label: 'Product Hunt Ranking', value: 'Top 3' },
      { label: 'Referral Signups', value: '12,500' }
    ]
  },
  {
    id: 'events',
    title: 'Events & Webinars',
    icon: 'calendar',
    subtitle: 'Pack digital events & physical keynotes',
    description: 'Rally your speaker lists, marketing managers, and executive advocates to drive webinar reservations and keynote tickets.',
    bullets: [
      'Arm speakers with personalized, single-click invite graphics and registration links.',
      'Monitor referral links to reward speakers who bring in the highest registration counts.',
      'Keep discussions energetic with live-updating custom event landing sheets.'
    ],
    metrics: [
      { label: 'Event Signups', value: '+240%' },
      { label: 'Speaker Referral CTR', value: '18.4%' },
      { label: 'No-Show Rate Cut', value: '28%' }
    ]
  }
];

export default function UseCasesSection() {
  const [activeUseCaseId, setActiveUseCaseId] = useState('marketing');

  const activeUseCase = USE_CASES.find(uc => uc.id === activeUseCaseId) || USE_CASES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'megaphone': return <Megaphone className="h-4 w-4" />;
      case 'sparkles': return <Sparkles className="h-4 w-4" />;
      case 'briefcase': return <Briefcase className="h-4 w-4" />;
      case 'messages': return <MessagesSquare className="h-4 w-4" />;
      case 'rocket': return <Rocket className="h-4 w-4" />;
      case 'calendar': return <Calendar className="h-4 w-4" />;
      default: return <Megaphone className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Tab Switchers Bar */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-neutral-200 mb-8">
        {USE_CASES.map((uc) => (
          <button
            key={uc.id}
            onClick={() => setActiveUseCaseId(uc.id)}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeUseCaseId === uc.id
                ? 'bg-indigo-600 text-fixed-white shadow-sm shadow-indigo-500/20'
                : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900'
            }`}
          >
            {getIcon(uc.icon)}
            {uc.title}
          </button>
        ))}
      </div>

      {/* Main Grid Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeUseCaseId}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Text Content Block - Left */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-700 bg-indigo-50/70 px-2 py-0.5 rounded border border-indigo-100 dark:text-indigo-300 dark:bg-indigo-950/60 dark:border-indigo-900/50">
                {activeUseCase.title} Solution
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-neutral-900 mt-3">
                {activeUseCase.subtitle}
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {activeUseCase.description}
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {activeUseCase.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-neutral-700 leading-relaxed">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics Visualization Panel - Right */}
          <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-mono font-semibold text-neutral-500">Target Business Outcomes</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {activeUseCase.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">{metric.label}</span>
                    <span className="text-xl font-display font-bold text-neutral-900 mt-0.5">{metric.value}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
