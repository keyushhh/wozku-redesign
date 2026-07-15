import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import InteractiveHeroCRM from './components/InteractiveHeroCRM';
import EditorialHero from './components/EditorialHero';
import HeroLinkedIn from './components/HeroLinkedIn';
import InteractiveProductGrid from './components/InteractiveProductGrid';
import UseCasesSection from './components/UseCasesSection';
import CustomerImpact from './components/CustomerImpact';
import CustomerSuccess from './components/CustomerSuccess';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import AuthModal from './components/AuthModal';
import { CustomSelect } from './components/FormControls';
import FAQSection from './components/FAQSection';
import NetworkEffectMap from './components/NetworkEffectMap';
import ScrollToTop from './components/ScrollToTop';
const NetworkTeaserGlobe = lazy(() => import('./components/NetworkTeaserGlobe'));

const TeamsEmployeesPage = lazy(() => import('./components/TeamsEmployeesPage'));
const EventsCommunitiesPage = lazy(() => import('./components/EventsCommunitiesPage'));
const CoreTeamPage = lazy(() => import('./components/CoreTeamPage'));
const SecurityCompliancePage = lazy(() => import('./components/SecurityCompliancePage'));
const EcosystemIntegrationsPage = lazy(() => import('./components/EcosystemIntegrationsPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const GlobalReachMapPage = lazy(() => import('./components/GlobalReachMapPage'));
const ROICalculatorPage = lazy(() => import('./components/ROICalculatorPage'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const WhyWozkuPage = lazy(() => import('./components/WhyWozkuPage'));
const BrandGuidelines = lazy(() => import('./components/BrandGuidelines'));
import slackLogo from './assets/slack.svg';
import linkedinLogo from './assets/linkedin.svg';
import hubspotLogo from './assets/hubspot.svg';
import zapierLogo from './assets/zapier.svg';
import notionLogo from './assets/notion.svg';
import stripeLogo from './assets/stripe.svg';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Award,
  Globe2,
  Check,
  ChevronRight,
  TrendingDown,
  Building,
  Target,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

export default function App() {
  // Path routing state
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      // Don't intercept hash changes if it's the modal trigger itself
      if (window.location.hash === '#/book-demo') {
        setIsDemoModalOpen(true);
        window.history.replaceState(null, '', window.location.pathname + '#/');
        setCurrentPath('#/');
        return;
      }
      if (window.location.hash === '#/sign-in') {
        setIsAuthModalOpen(true);
        window.history.replaceState(null, '', window.location.pathname + '#/');
        setCurrentPath('#/');
        return;
      }
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Golden circle progressive stage tracker (Why, How, What)
  const [activeCircleStage, setActiveCircleStage] = useState<'why' | 'how' | 'what'>('why');

  // Interactive Book a Demo modal state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const prevPathRef = useRef({
    pathname: (window.location.pathname === '/book-demo' || window.location.pathname === '/sign-in') ? '/' : window.location.pathname,
    hash: window.location.hash && window.location.hash !== '#/book-demo' && window.location.hash !== '#/sign-in' ? window.location.hash : '#/'
  });

  // Handle direct loads on mount
  useEffect(() => {
    const isBookDemo = window.location.pathname === '/book-demo' || window.location.hash === '#/book-demo';
    if (isBookDemo) {
      setIsDemoModalOpen(true);
      if (window.location.hash === '#/book-demo') {
        window.history.replaceState(null, '', '/book-demo' + '#/');
        setCurrentPath('#/');
      }
    }
    const isSignIn = window.location.pathname === '/sign-in' || window.location.hash === '#/sign-in';
    if (isSignIn) {
      setIsAuthModalOpen(true);
      if (window.location.hash === '#/sign-in') {
        window.history.replaceState(null, '', '/sign-in' + '#/');
        setCurrentPath('#/');
      }
    }
  }, []);

  // Sync state changes with the URL path
  useEffect(() => {
    const currentPathname = window.location.pathname;
    const currentHash = window.location.hash || '#/';

    if (isDemoModalOpen) {
      if (currentPathname !== '/book-demo') {
        prevPathRef.current = { pathname: currentPathname, hash: currentHash };
        const cleanHash = currentHash === '#/book-demo' ? '#/' : currentHash;
        window.history.pushState({ wozkuDemoModal: true }, '', '/book-demo' + cleanHash);
      }
    } else {
      if (currentPathname === '/book-demo') {
        const targetPath = prevPathRef.current.pathname === '/book-demo' ? '/' : prevPathRef.current.pathname;
        const targetHash = prevPathRef.current.hash === '#/book-demo' ? '#/' : prevPathRef.current.hash;
        window.history.pushState(null, '', targetPath + targetHash);
        setCurrentPath(targetHash);
      }
    }
  }, [isDemoModalOpen]);

  useEffect(() => {
    const currentPathname = window.location.pathname;
    const currentHash = window.location.hash || '#/';

    if (isAuthModalOpen) {
      if (currentPathname !== '/sign-in') {
        prevPathRef.current = { pathname: currentPathname, hash: currentHash };
        const cleanHash = currentHash === '#/sign-in' ? '#/' : currentHash;
        window.history.pushState({ wozkuAuthModal: true }, '', '/sign-in' + cleanHash);
      }
    } else {
      if (currentPathname === '/sign-in') {
        const targetPath = prevPathRef.current.pathname === '/sign-in' ? '/' : prevPathRef.current.pathname;
        const targetHash = prevPathRef.current.hash === '#/sign-in' ? '#/' : prevPathRef.current.hash;
        window.history.pushState(null, '', targetPath + targetHash);
        setCurrentPath(targetHash);
      }
    }
  }, [isAuthModalOpen]);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const isBookDemo = window.location.pathname === '/book-demo' || window.location.hash === '#/book-demo';
      if (isBookDemo) {
        setIsDemoModalOpen(true);
      } else {
        setIsDemoModalOpen(false);
      }
      const isSignIn = window.location.pathname === '/sign-in' || window.location.hash === '#/sign-in';
      if (isSignIn) {
        setIsAuthModalOpen(true);
      } else {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [heroVisual, setHeroVisual] = useState<'network' | 'original' | 'linkedin'>(() => {
    const saved = localStorage.getItem('wozku-hero-visual');
    if (saved === 'original') return 'original';
    if (saved === 'linkedin') return 'linkedin';
    if (saved === 'network') return 'network';
    return 'linkedin';
  });

  const [radiusMode, setRadiusMode] = useState<'rounded' | 'sharp'>(() => {
    const saved = localStorage.getItem('wozku-radius-mode');
    if (saved === 'rounded') return 'rounded';
    return 'sharp';
  });

  const [devControlsExpanded, setDevControlsExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem('wozku-hero-visual', heroVisual);
  }, [heroVisual]);

  useEffect(() => {
    const root = document.documentElement;
    if (radiusMode === 'sharp') {
      root.classList.add('corners-sharp');
    } else {
      root.classList.remove('corners-sharp');
    }
    localStorage.setItem('wozku-radius-mode', radiusMode);
  }, [radiusMode]);

  useEffect(() => {
    const handleOpenDemo = () => setIsDemoModalOpen(true);
    window.addEventListener('open-demo-modal', handleOpenDemo);
    return () => window.removeEventListener('open-demo-modal', handleOpenDemo);
  }, []);

  useEffect(() => {
    const handleOpenAuth = () => setIsAuthModalOpen(true);
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  // Parallax / cursor mouse offset state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMoveOffset = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 45; // max 45px shift
      const y = (e.clientY / window.innerHeight - 0.5) * 45;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMoveOffset);
    return () => window.removeEventListener('mousemove', handleMouseMoveOffset);
  }, []);

  const { scrollY } = useScroll();
  const parallax1 = useTransform(scrollY, (value) => value * 0.12);
  const parallax2 = useTransform(scrollY, (value) => value * -0.08);
  const parallax3 = useTransform(scrollY, (value) => value * 0.06);
  const parallax4 = useTransform(scrollY, (value) => value * -0.05);

  // Subtle mouse-following soft blur orb state
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Proposal planner state in Final CTA
  const [proposalInputs, setProposalInputs] = useState({
    scale: 'Mid-Market (100-1000 employees)',
    objective: 'Brand Visibility & Organic Impressions',
    channel: 'LinkedIn Networks'
  });
  const [proposalResult, setProposalResult] = useState<any | null>(null);
  const [generatingProposal, setGeneratingProposal] = useState(false);

  const generateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingProposal(true);
    setProposalResult(null);

    setTimeout(() => {
      let estimatedReach = '50,000+ views / mo';
      let recommendedCampaign = 'Monthly Product Updates';
      let setupDays = '3 days';
      let savings = '$4,650/month';

      if (proposalInputs.scale.includes('Seed')) {
        estimatedReach = '12,000+ views / mo';
        recommendedCampaign = 'Weekly Hiring & Culture Spotlight';
        setupDays = '2 days';
        savings = '$1,240/month';
      } else if (proposalInputs.scale.includes('Enterprise')) {
        estimatedReach = '350,000+ views / mo';
        recommendedCampaign = 'Global Event & Multi-Regional Product Launches';
        setupDays = '5 days';
        savings = '$32,800/month';
      }

      setProposalResult({
        reach: estimatedReach,
        campaign: recommendedCampaign,
        setup: setupDays,
        referralLoop: '1.8x viral coefficient',
        savings: savings,
        steps: [
          { week: 'Week 1', title: 'Active Directory Sync', desc: 'Sync corporate active directory (Okta/Entra ID) and whitelist employee social shares.' },
          { week: 'Week 2', title: 'Launch First Campaign', desc: `Distribute the "${recommendedCampaign}" template via automated Slack/Email alerts.` },
          { week: 'Week 3', title: 'Ignite Points Contest', desc: 'Roll out the automatic points contest leaderboard to spark peer-to-peer sharing.' },
          { week: 'Week 4', title: 'Verify ROI Savings', desc: 'Generate executive charts detailing saved paid search costs in the admin dashboard.' }
        ]
      });
      setGeneratingProposal(false);
    }, 1200);
  };

  const handleStageScroll = (stage: 'why' | 'how' | 'what', id: string) => {
    setActiveCircleStage(stage);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isBrandGuidelines = currentPath === '#/brand-guidelines';

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-indigo-500/10 selection:text-indigo-900">
      {/* 1. TOP NAV BAR */}
      {!isBrandGuidelines && <Navbar />}

      {/* Interactive mouse follow blur orb */}
      {isHovering && !isBrandGuidelines && (
        <motion.div
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{
            type: "spring",
            damping: 45,
            stiffness: 100,
            mass: 0.6,
          }}
className="fixed -left-[175px] -top-[175px] w-[350px] h-[350px] rounded-full bg-indigo-500 opacity-[0.05] blur-[110px] pointer-events-none z-30 hidden md:block"
        />
      )}

      {/* Dynamic Page Router Switcher */}
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8.5 h-8.5 animate-spin text-indigo-650" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Loading Page...</span>
          </div>
        </div>
      }>
        {currentPath.startsWith('#/brand-guidelines') ? (
          <BrandGuidelines radiusMode={radiusMode} />
      ) : currentPath === '#/product/teams-employees' ? (
        <TeamsEmployeesPage />
      ) : currentPath === '#/product/events-communities' ? (
        <EventsCommunitiesPage />
      ) : currentPath === '#/about/core-team' ? (
        <CoreTeamPage />
      ) : currentPath === '#/about/security-compliance' ? (
        <SecurityCompliancePage />
      ) : currentPath === '#/resources/ecosystem-integrations' ? (
        <EcosystemIntegrationsPage />
      ) : currentPath === '#/resources/faq' ? (
        <FAQPage />
      ) : currentPath === '#/resources/global-reach-map' ? (
        <GlobalReachMapPage />
      ) : currentPath === '#/resources/roi-calculator' ? (
        <ROICalculatorPage />
      ) : currentPath === '#/pricing' ? (
        <PricingPage />
      ) : currentPath === '#/insights/case-studies' ? (
        <CaseStudiesPage />
      ) : currentPath === '#/insights/blog' ? (
        <BlogPage />
      ) : currentPath === '#/why-wozku' ? (
        <WhyWozkuPage />
      ) : (
        <>
          {/* 2. MAIN APP CONTAINER */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Background grids and glowing gradients */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-grid-dots-accent mask-linear-gradient-b pointer-events-none opacity-40 z-0" />
        
        {/* Soft Animated Ambient Blur Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Top-Left Soft Drift Orb (Starts right behind the Hero content) */}
          <motion.div
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -40, 40, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[3%] left-[10%] w-[450px] h-[450px] rounded-full bg-indigo-500 opacity-[0.09] blur-[100px]"
          />

          {/* Top-Right Soft Drift Orb (Hero right side) */}
          <motion.div
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 0.95, 1.15, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[8%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-400 opacity-[0.08] blur-[120px]"
          />

          {/* Center Subtle Deep Orb (Behind the CRM dashboard preview) */}
          <motion.div
            style={{
              translateY: parallax1,
              x: mouseOffset.x,
              y: mouseOffset.y,
            }}
            animate={{
              scale: [1, 1.18, 0.88, 1],
            }}
            transition={{
              scale: { duration: 28, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[22%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-600 opacity-[0.07] blur-[130px] pointer-events-none"
          />

          {/* Mid Section Left Warm Pink/Orange Orb */}
          <motion.div
            style={{
              translateY: parallax2,
              x: mouseOffset.x * -0.7,
              y: mouseOffset.y * -0.7,
            }}
            animate={{
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              scale: { duration: 24, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[45%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500 opacity-[0.05] blur-[120px] pointer-events-none"
          />

          {/* Lower Section Warm Orb (Behind Event Loop Simulator) */}
          <motion.div
            style={{
              translateY: parallax3,
              x: mouseOffset.x * 1.2,
              y: mouseOffset.y * 1.2,
            }}
            animate={{
              scale: [1, 0.98, 1.12, 1],
            }}
            transition={{
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[65%] right-[10%] w-[550px] h-[550px] rounded-full bg-indigo-400 opacity-[0.06] blur-[130px] pointer-events-none"
          />

          {/* Bottom Near Footer Deep Blue Orb */}
          <motion.div
            style={{
              translateY: parallax4,
              x: mouseOffset.x * -0.5,
              y: mouseOffset.y * -0.5,
            }}
            animate={{
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              scale: { duration: 26, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-[5%] left-[25%] w-[600px] h-[600px] rounded-full bg-indigo-600 opacity-[0.05] blur-[140px] pointer-events-none"
          />
        </div>

        {/* ================= HERO SECTION ================= */}
        {heroVisual === 'network' ? (
          <EditorialHero onOpenDemo={() => setIsDemoModalOpen(true)} />
        ) : heroVisual === 'linkedin' ? (
          <HeroLinkedIn onOpenDemo={() => setIsDemoModalOpen(true)} radiusMode={radiusMode} />
        ) : (
          <section className="pt-20 pb-20 max-w-7xl mx-auto px-6 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-100px)]">
          {/* Left Column: Copy & CTA & Metrics */}
          <div className="lg:col-span-6 text-left space-y-7 flex flex-col justify-center">
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-extrabold text-neutral-900 dark:text-fixed-white tracking-tight leading-[1.1]"
              >
                Own distribution.<br />
                <span className="text-indigo-650 dark:text-indigo-400">
                  Your community is the antidote.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-neutral-500 dark:text-fixed-light leading-relaxed font-sans max-w-lg"
              >
                Paid ads are losing trust. Your employees, partners, and customers already have the audience. Wozku activates them to share your story at scale while attributing every dollar of organic pipeline.
              </motion.p>
            </div>

            {/* Email Capture CTA capsule form */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[52px] flex items-center bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/40 p-1.5 rounded-xl max-w-md focus-within:border-neutral-350 dark:focus-within:border-neutral-700 transition-all"
            >
              <input
                type="email"
                placeholder="Enter work email"
                className="flex-1 h-full bg-transparent px-3 text-xs focus:outline-none text-neutral-900 dark:text-fixed-white placeholder:text-neutral-400/70"
              />
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="h-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                Book a demo
              </button>
            </motion.div>

            {/* Metrics Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-6 pt-5 border-t border-neutral-100 dark:border-neutral-850 max-w-sm"
            >
              <div>
                <span className="text-3xl font-black font-display text-neutral-900 dark:text-fixed-white">8x</span>
                <span className="text-[10px] font-mono font-bold text-neutral-450 dark:text-fixed-muted uppercase tracking-wider block mt-1">Average ROI Multiplier</span>
              </div>
              <div>
                <span className="text-3xl font-black font-display text-neutral-900 dark:text-fixed-white">2.1M+</span>
                <span className="text-[10px] font-mono font-bold text-neutral-450 dark:text-fixed-muted uppercase tracking-wider block mt-1">Organic reach scaled</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Original visual illustration. */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center lg:items-end">
            <AnimatePresence mode="wait">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="w-full flex justify-center lg:justify-end">
                <InteractiveHeroCRM />
              </motion.div>
            </AnimatePresence>
          </div>
          </section>
        )}



        {/* ================= SOCIAL PROOF LOGO STRIP ================= */}
        <section className="py-10 border-t border-neutral-100 relative">
          <div className="text-center space-y-6">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
              Built to integrate with tools your team already uses
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {[
                { name: 'Slack', logo: slackLogo },
                { name: 'LinkedIn', logo: linkedinLogo },
                { name: 'HubSpot', logo: hubspotLogo },
                { name: 'Zapier', logo: zapierLogo },
                { name: 'Notion', logo: notionLogo },
                { name: 'Stripe', logo: stripeLogo },
              ].map((co) => (
                <div
                  key={co.name}
                  className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-all duration-200 group"
                >
                  <img
                    src={co.logo}
                    alt={co.name}
                    className="h-5 w-auto object-contain opacity-50 group-hover:opacity-80 transition-opacity filter grayscale group-hover:grayscale-0"
                  />
                  <span className="text-xs font-semibold tracking-wide font-sans">{co.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 1. WHY SECTION (Problem) ================= */}
        <section id="why-exists" className="py-24 border-t border-neutral-200 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Context Header - Left */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Why does Wozku exist?
                </h2>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Corporate social channels have lost their distribution power. Algorithms prioritize personal connections over corporate page updates, forcing brands onto expensive search and social ads that yield shrinking returns.
              </p>

              <div className="space-y-3.5 pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <p className="text-xs text-neutral-700">
                    <strong className="text-neutral-900">Social trust is personal:</strong> Buyers are 92% more likely to trust a statement shared by an actual peer over a corporate advertisement page.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <p className="text-xs text-neutral-700">
                    <strong className="text-neutral-900">The organic network advantage:</strong> Your employees, active partners, and loyal customer community hold 10x higher social reach combined than your main brand handle.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics & Problem graphics - Right */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Metric Card 1 */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-red-500/5 blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-mono mb-2">
                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                    <span>ALGORITHMIC DECLINE</span>
                  </div>
                  
                  <div className="text-3xl font-display font-black text-neutral-900">1.1%</div>
                  
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Average organic social reach of a brand post. Social platforms actively downrank and restrict company account visibility.
                  </p>
                </div>

                {/* Metric Card 2 */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/5 blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-mono mb-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    <span>ADVOCATE TRUST BONUS</span>
                  </div>
                  
                  <div className="text-3xl font-display font-black text-neutral-900">92%</div>
                  
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Of buyers trust personal, direct peer recommendations. Authenticity is the single highest-converting asset.
                  </p>
                </div>

              </div>

              {/* Connected Visual Box */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-xs font-mono text-indigo-600">The advocacy loop framework</span>
                </div>
                
                <h4 className="font-display font-semibold text-neutral-900 text-sm">Transform colleagues into organic growth partners</h4>
                
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Instead of paying search networks to force-feed ads to cold markets, Wozku helps you tap the organic circles of your existing squad. By providing pre-approved content, automated point multipliers, and transparent rewards, sharing brand news becomes entirely friction-free.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="py-24 border-t border-neutral-200 dark:border-fixed-white/6 relative overflow-hidden">

          {/* Subtle bg */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-indigo-500 opacity-[0.035] dark:opacity-[0.08] blur-[110px] rounded-full pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-fixed-white tracking-tight leading-tight">
              From zero to viral in<br className="hidden sm:block" /> five steps.
            </h2>
            <p className="text-sm text-neutral-500 dark:text-fixed-light leading-relaxed font-medium">
              Wozku's structured workflow turns a complex distributed-marketing operation into something any team can run in under an hour.
            </p>
          </div>

          {/* Step flow */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Desktop: horizontal connector line */}
            <div className="hidden lg:block relative mb-10">
              <div className="absolute top-7 left-[9%] right-[9%] h-px bg-gradient-to-r from-transparent via-indigo-200 dark:via-fixed-white/15 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 lg:gap-4">
              {[
                {
                  step: '01',
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
                  title: 'Create Campaign',
                  body: 'Build a branded campaign with pre-approved content, hashtags, and sharing targets in minutes.',
                  color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
                  dot: 'bg-indigo-600',
                },
                {
                  step: '02',
                  icon: <Users className="w-5 h-5" />,
                  title: 'Invite Advocates',
                  body: 'Activate employees, customers, or partners directly via Slack, Teams, or email - no new app to download.',
                  color: 'text-secondary-600 bg-secondary-50 border-secondary-100',
                  dot: 'bg-secondary-500',
                },
                {
                  step: '03',
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
                  title: 'Share Content',
                  body: 'Advocates share one-click approved posts to LinkedIn, X, or any channel - tracked automatically.',
                  color: 'text-blue-600 bg-blue-50 border-blue-100',
                  dot: 'bg-blue-500',
                },
                {
                  step: '04',
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
                  title: 'Track Engagement',
                  body: 'Real-time dashboards show impressions, clicks, referral paths, and leaderboard rankings per advocate.',
                  color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                  dot: 'bg-emerald-500',
                },
                {
                  step: '05',
                  icon: <TrendingUp className="w-5 h-5" />,
                  title: 'Measure ROI',
                  body: 'CRM-native attribution closes the loop - see exactly which shares drove leads, demos, and closed deals.',
                  color: 'text-amber-600 bg-amber-50 border-amber-100',
                  dot: 'bg-amber-500',
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step bubble */}
                  <div className="relative mb-5">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 dark:!bg-[#141418] dark:!border-fixed-white/10 dark:shadow-[0_8px_24px_rgba(0,0,0,0.24)] ${s.color}`}>
                      {s.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white dark:bg-[#0f1115] border border-neutral-200 dark:border-fixed-white/10 text-[9px] font-black font-mono text-neutral-500 dark:text-fixed-muted flex items-center justify-center shadow-xs">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-fixed-white mb-1.5 tracking-tight">{s.title}</h3>
                  <p className="text-[11px] text-neutral-500 dark:text-fixed-light leading-relaxed font-medium">{s.body}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-14">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                See the full workflow live <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[10px] text-neutral-400 mt-2.5 font-medium">Personalised 30-min demo - no commitment</p>
            </div>

          </div>
        </section>

        {/* ================= 3. WHAT SECTION (Capabilities Bento Grid) ================= */}
        <section id="platform-ecosystem" className="py-24 border-t border-neutral-200 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              One unified advocacy ecosystem.
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Presenting Wozku's robust modules as a single connected platform, eliminating fragmented spreadsheets and manual referral spreadsheets forever.
            </p>
          </div>

          {/* Interactive Bento Grid */}
          <InteractiveProductGrid />

        </section>

        {/* ================= USE CASES SECTION ================= */}
        <section id="use-cases" className="py-24 border-t border-neutral-200 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Engineered for every team.
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Whether driving product sales, scaling technical recruitment, or keeping internal hybrid offices closely synchronized, discover customized setups.
            </p>
          </div>

          <UseCasesSection />

        </section>

        {/* ================= EVENT ADVOCACY LOOP TEASER ================= */}
        <section className="py-20 border-t border-neutral-200 relative overflow-hidden">
          
          {/* Subtle glow backdrops */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-500 opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-secondary-500 opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0c0c0e] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg shadow-black/15">

              {/* Inner glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, color-mix(in srgb, var(--indigo-500) 10%, transparent) 0%, transparent 60%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, color-mix(in srgb, var(--indigo-500) 7%, transparent) 0%, transparent 60%)' }} />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                
                {/* Left: Copy */}
                <div className="space-y-4 max-w-lg">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-fixed-white leading-tight tracking-tight">
                    Attendees scan a QR.<br />
                    <span className="text-indigo-400">
                      Your brand goes viral.
                    </span>
                  </h2>
                  <p className="text-sm text-fixed-light leading-relaxed">
                    At your venue, attendees scan a Wozku QR code, preview a pre-approved post, and share it to their LinkedIn - instantly climbing the live leaderboard projected on the main stage.
                  </p>

                  {/* Mini step indicators */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {['Scan QR', 'Preview Post', 'Share & Earn', 'Top Leaderboard'].map((step, i) => {
                      const isFirst = i === 0;
                      return (
                        <div key={step} className="flex items-center gap-1.5">
                          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all shrink-0 ${
                            isFirst
                      ? 'bg-indigo-600 border border-indigo-500 text-fixed-white shadow-sm shadow-indigo-500/20'
                              : 'bg-indigo-500/10 border border-indigo-500/25 text-indigo-400'
                          }`}>
                            {i + 1}
                          </span>
                          <span className={`text-[11px] font-semibold transition-colors ${
                            isFirst ? 'text-indigo-300' : 'text-fixed-muted'
                          }`}>{step}</span>
                          {i < 3 && <ChevronRight className="w-3 h-3 text-neutral-700" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
                  <button
                    onClick={() => { window.location.hash = '#/product/events-communities'; }}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-bold py-3.5 px-7 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-500/20 cursor-pointer group"
                  >
                    See How It Works
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-[10px] text-neutral-600 font-mono">Interactive live demo - no sign-up needed</p>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* ================= CUSTOMER IMPACT PROOF ================= */}
        <section id="customer-impact" className="py-16 border-t border-neutral-200 dark:border-neutral-800 relative bg-transparent">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 px-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-fixed-white tracking-tight leading-tight pt-1">
              Proven reach. Quantifiable impact.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-fixed-light leading-relaxed max-w-xl mx-auto font-sans font-medium">
              We replace expensive rented attention with permanent, organic distribution assets built on real advocacy relationships.
            </p>
          </div>

          <CustomerImpact />

        </section>



        {/* ================= CUSTOMER TESTIMONIALS ================= */}
        <section id="customer-success" className="py-24 border-t border-neutral-200 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Endorsed by industry leaders
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Industry leaders trust our commitment to excellence, validating our innovative solutions and fostering partnerships.
            </p>
          </div>

          <CustomerSuccess />

        </section>



        {/* ================= LIVE NETWORK EFFECT MAP SIMULATOR ================= */}
        <section id="network-effect-simulator" className="py-24 border-t border-neutral-200 relative bg-linear-to-b from-neutral-50/30 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              
              {/* Decorative background grid and blurs */}
              <div className="absolute inset-0 bg-grid-dots-accent opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-indigo-500 opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

              {/* Left Column: Text Content */}
              <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                  Visualize Advocacy in<br />Real-Time
                </h2>
                
                <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto md:mx-0">
                  Step into our global connection dispatcher. Simulate geographic post dispatches, analyze multi-touch referral latencies, and preview the organic ripple effect of advocate shares across LinkedIn, Slack, and X.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => window.location.hash = '#/resources/global-reach-map'}
                    className="inline-flex items-center gap-2 bg-[#141418] hover:bg-[#181b22] text-fixed-white text-sm font-bold py-3.5 px-8 rounded-xl border border-fixed-white/10 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Check How It Works</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Teaser (Interactive 3D Globe with auto-rotation) */}
              <div className="w-full md:w-[360px] aspect-square shrink-0 rounded-2xl bg-[#0a0a0d] border border-white/10 relative overflow-hidden shadow-inner">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-400">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                }>
                  <NetworkTeaserGlobe />
                </Suspense>
              </div>

            </div>
          </div>
        </section>


        {/* ================= FINAL CTA & PLANNER PROPOSAL ================= */}
        <section id="cta" className="py-24 border-t border-neutral-200 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Outcome Focus copywriting - Left */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Ready to activate your trusted advocate networks?
                </h2>
              </div>
              
              <p className="text-sm text-neutral-600 leading-relaxed">
                Unlock the ultimate organic distribution loops. Shift your budget from low-ROI search clicks to pre-approved advocate circles. Start measuring actual equivalent marketing value inside Wozku's dashboard within 48 hours.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-700">
                  <div className="h-5 w-5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>Free SOC2 Type II configuration consult.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-700">
                  <div className="h-5 w-5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>No credit cards or legacy setup fees required.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-700">
                  <div className="h-5 w-5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">✓</div>
                  <span>Dedicated support program manager.</span>
                </div>
              </div>
            </div>

            {/* Interactive Proposal Planner Form - Right */}
            <div className="lg:col-span-6 bg-[#0a0a0d] border border-fixed-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-grid-dots-dark">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
              
              <div className="mb-6">
                <h4 className="font-display font-bold text-fixed-white text-base">Generate Program Proposal</h4>
                <p className="text-xs text-fixed-light mt-1">Simulate Wozku's rollout roadmap based on your company size and objective.</p>
              </div>

              <form onSubmit={generateProposal} className="space-y-4">
                
                <CustomSelect
                  tone="dark"
                  label="Company Employee Scale"
                  options={[
                    'Seed Stage (20-100 employees)',
                    'Mid-Market (100-1000 employees)',
                    'Enterprise (1000+ employees)'
                  ]}
                  value={proposalInputs.scale}
                  onChange={(val) => setProposalInputs(prev => ({ ...prev, scale: val }))}
                />

                <CustomSelect
                  tone="dark"
                  label="Primary Advocacy Network"
                  options={[
                    'LinkedIn Networks',
                    'X / Twitter Communities',
                    'Slack & Teams Internals',
                    'Developer Forums & Github'
                  ]}
                  value={proposalInputs.channel}
                  onChange={(val) => setProposalInputs(prev => ({ ...prev, channel: val }))}
                />

                <CustomSelect
                  tone="dark"
                  label="Core Objective"
                  options={[
                    'Brand Visibility & Organic Impressions',
                    'Technical Passive Recruitment',
                    'Lead Generation & Direct Clicks',
                    'Internal Information Unification'
                  ]}
                  value={proposalInputs.objective}
                  onChange={(val) => setProposalInputs(prev => ({ ...prev, objective: val }))}
                />

                <button
                  type="submit"
                  disabled={generatingProposal}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-fixed-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(99,102,241,0.3)]"
                >
                  {generatingProposal ? (
                    <>
                      <div className="h-3 w-3 border-2 border-fixed-white/30 border-t-fixed-white rounded-full animate-spin" />
                      Analyzing data schemas...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate customized proposal
                    </>
                  )}
                </button>

              </form>

              {/* Proposal Results display */}
              <AnimatePresence>
                {proposalResult && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-fixed-white/10 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#141418] p-2.5 rounded-xl border border-fixed-white/10">
                        <span className="text-[10px] text-fixed-muted font-mono block">ESTIMATED REVENUE REACH</span>
                        <span className="text-fixed-white font-bold block mt-0.5">{proposalResult.reach}</span>
                      </div>
                      
                      <div className="bg-[#141418] p-2.5 rounded-xl border border-fixed-white/10">
                        <span className="text-[10px] text-fixed-muted font-mono block">VIRAL COEFFICIENT</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">{proposalResult.referralLoop}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">4-Week Rollout Roadmap</span>
                      <div className="space-y-1.5">
                        {proposalResult.steps.map((st: any, idx: number) => (
                          <div key={idx} className="flex gap-2.5 text-xs text-neutral-300">
                            <span className="font-mono text-indigo-400 font-bold min-w-[45px] shrink-0">{st.week}</span>
                            <div>
                              <strong className="text-fixed-white block">{st.title}</strong>
                              <span className="text-[11px] text-fixed-light block leading-relaxed">{st.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-3 text-[11px] text-indigo-300 leading-normal text-center">
                      🌟 Excellent! This configuration yields an estimated **{proposalResult.savings}** in Equivalent Paid Search Cost Savings.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </section>

        {/* ================= COMPACT PRICING SECTION ================= */}
        <section id="pricing" className="py-24 border-t border-neutral-200 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-500 opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
              Scale-Ready Pricing for Any Brand
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Start for free, sync your advocate workspaces, and activate high-converting organic distribution channels.
            </p>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto px-4">
            
            {/* Lite */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-slate-350 transition-all">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-900">Lite</h3>
                <p className="text-[10px] text-slate-500 min-h-[30px]">For small teams beginning advocate reach.</p>
                <div className="flex items-baseline pt-2">
                  <span className="text-3xl font-display font-black text-neutral-900">$0</span>
                  <span className="text-[10px] font-semibold text-slate-500 ml-1">/ month</span>
                </div>
                <ul className="space-y-2 pt-2 text-[11px] text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Up to 10 advocates</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> 1 workspace channel</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Standard presets</li>
                </ul>
              </div>
              <button 
                onClick={() => window.location.hash = '#/pricing'} 
                className="w-full mt-6 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer block text-center"
              >
                View Details
              </button>
            </div>

            {/* Premium */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-slate-350 transition-all">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-900">Premium</h3>
                <p className="text-[10px] text-slate-500 min-h-[30px]">For scaling networks and advanced tracking.</p>
                <div className="flex items-baseline pt-2">
                  <span className="text-2xl font-display font-black text-neutral-900 tracking-tight">Walkthrough Required</span>
                </div>
                <ul className="space-y-2 pt-2 text-[11px] text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Up to 100 advocates</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Unlimited sync channels</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Leaderboard gamification</li>
                </ul>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => window.location.hash = '#/pricing'} 
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer block text-center"
                >
                  View Details
                </button>
                <span className="text-[10px] text-indigo-600 font-bold block text-center mt-2.5">
                  Live Walkthrough + Best Practice Setup
                </span>
              </div>
            </div>

            {/* Agency */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-slate-350 transition-all">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-900">Agency</h3>
                <p className="text-[10px] text-slate-500 min-h-[30px]">For large brands needing SSO & SOC2.</p>
                <div className="flex items-baseline pt-2">
                  <span className="text-2xl font-display font-black text-neutral-900">Custom</span>
                </div>
                <ul className="space-y-2 pt-2 text-[11px] text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Unlimited advocates</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Custom credentials vault</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3.5]" /> Dedicated SLA manager</li>
                </ul>
              </div>
              <button 
                onClick={() => window.location.hash = '#/pricing'} 
                className="w-full mt-6 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer block text-center"
              >
                View Details
              </button>
            </div>

          </div>

          <div className="text-center pt-10">
            <button 
              onClick={() => window.location.hash = '#/pricing'} 
              className="text-xs font-bold text-indigo-650 hover:text-indigo-500 flex items-center gap-1 mx-auto transition-colors cursor-pointer group"
            >
              View detailed plan comparison matrix
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

      </main>

      {/* 3. FAQ ACCORDION SECTION */}
      <FAQSection />
        </>
      )}
      </Suspense>

      {/* 4. FOOTER */}
      {!isBrandGuidelines && <Footer />}

      {/* 4. STRATEGY DEMO BOOKING MODAL */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* 5. SCROLL TO TOP FLOATER */}
      {!isBrandGuidelines && <ScrollToTop />}

      {/* Global Dev & Design Controls Panel */}
      {(import.meta.env.DEV || import.meta.env.VITE_SHOW_DEV_CONTROLS === 'true') && (
        <div className="fixed bottom-4 left-4 z-[60] flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/95 text-neutral-900 dark:text-neutral-50 w-52 select-none">
          <div 
            onClick={() => setDevControlsExpanded(!devControlsExpanded)}
            className={`flex items-center justify-between cursor-pointer ${devControlsExpanded ? 'border-b border-neutral-100 dark:border-white/5 pb-2' : ''}`}
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Dev Controls</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${devControlsExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
          
          {devControlsExpanded && (
            <>
              <div className="space-y-1.5">
                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">Hero Layout</span>
                <div className="grid grid-cols-3 gap-1 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg">
                  <button 
                    onClick={() => setHeroVisual('network')} 
                    className={`rounded-md py-1 text-[10px] font-semibold transition-all cursor-pointer ${heroVisual === 'network' ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                  >
                    New
                  </button>
                  <button 
                    onClick={() => setHeroVisual('original')} 
                    className={`rounded-md py-1 text-[10px] font-semibold transition-all cursor-pointer ${heroVisual === 'original' ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                  >
                    Original
                  </button>
                  <button 
                    onClick={() => setHeroVisual('linkedin')} 
                    className={`rounded-md py-1 text-[10px] font-semibold transition-all cursor-pointer ${heroVisual === 'linkedin' ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">Corners</span>
                <div className="grid grid-cols-2 gap-1 bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg">
                  <button 
                    onClick={() => setRadiusMode('rounded')} 
                    className={`rounded-md py-1 text-[10px] font-semibold transition-all cursor-pointer ${radiusMode === 'rounded' ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                  >
                    Rounded
                  </button>
                  <button 
                    onClick={() => setRadiusMode('sharp')} 
                    className={`rounded-md py-1 text-[10px] font-semibold transition-all cursor-pointer ${radiusMode === 'sharp' ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                  >
                    Sharp
                  </button>
                </div>
              </div>

              <div className="border-t border-neutral-100 dark:border-white/5 pt-2 mt-1">
                {isBrandGuidelines ? (
                  <button 
                    onClick={() => { window.location.hash = '#/'; }} 
                    className="w-full flex items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 font-bold py-2 rounded-xl text-[10px] transition-all cursor-pointer shadow-xs"
                  >
                    Exit Guidelines
                  </button>
                ) : (
                  <button 
                    onClick={() => { window.location.hash = '#/brand-guidelines'; }} 
                    className="w-full flex items-center justify-center gap-1 bg-indigo-650 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl text-[10px] transition-all cursor-pointer shadow-xs"
                  >
                    Brand Guidelines
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
