import React, { useState } from 'react';
import { HelpCircle, Search, ArrowRight, Sparkles, MessageSquare, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  // Security & Compliance
  {
    category: 'Security & Compliance',
    question: 'Is Wozku compliant with enterprise security standards and social platform policies?',
    answer: 'Absolutely. Wozku is fully SOC 2 Type II compliant and respects all platform Terms of Service. We utilize official developer APIs for LinkedIn, X (Twitter), and other social networks. All shared content is strictly user-initiated, preventing automatic or bot-like behavior and ensuring that your employees and partners remain safe and authentic.'
  },
  {
    category: 'Security & Compliance',
    question: 'How is credentials and access tokens secured for user social accounts?',
    answer: 'Wozku uses a scoped OAuth 2.0 protocol which never exposes or stores employee login passwords. We only secure temporary, limited-access tokens. These are stored inside a hardware-isolated KMS environment using AES-256 GCM encryption. Advocates can revoke permissions instantly with one click from their dashboard.'
  },
  {
    category: 'Security & Compliance',
    question: 'Does Wozku comply with GDPR, CCPA, and data privacy frameworks?',
    answer: 'Yes. We are completely GDPR and CCPA ready. We design our systems with a Privacy-by-Design approach. No personal tracking telemetry is collected on external clicks, and advocates have full access to view, download, or delete their profile data at any time.'
  },

  // Tracking & Attribution
  {
    category: 'Tracking & Attribution',
    question: 'How does Wozku accurately attribute leads and revenue back to specific advocates?',
    answer: 'Every shared update is automatically enriched with custom, dynamically generated tracking tokens and localized UTM parameters. When a customer or prospect clicks a link and converts, our tracking pixel maps the referral ID directly back to the advocating teammate, logging the exact source, impressions, clicks, and sourced pipeline inside your integrated CRM.'
  },
  {
    category: 'Tracking & Attribution',
    question: 'What happens if a referral link is shared multiple times or reshared by third parties?',
    answer: 'Our multi-touch attribution engine maps the parent advocate ID even if a referral link is copy-pasted and shared by other networks. We use a combination of secure cryptographic hashes and session tracking to ensure original advocates retain complete attribution credit for the downstream traffic.'
  },

  // Integrations
  {
    category: 'Integrations',
    question: 'Can we sync Wozku with Salesforce, HubSpot, and our SSO systems?',
    answer: 'Yes. Wozku supports native integrations with major CRM systems like Salesforce and HubSpot to pass attribution metadata directly. We also offer standard SAML 2.0 and OIDC integrations (Okta, Microsoft Entra ID, Google Workspace) to make employee onboarding seamless and secure.'
  },
  {
    category: 'Integrations',
    question: 'Does Wozku integrate with team collaboration apps like Slack and Teams?',
    answer: 'Yes, this is core to our low-friction experience. Wozku has native Slack and Microsoft Teams apps that automatically deliver campaign alerts, post drafts, and leaderboard updates directly to advocates inside the workspaces they already use daily.'
  },

  // Engagement & Adoption
  {
    category: 'Engagement & Adoption',
    question: 'What level of effort is required from our busy employees to share content?',
    answer: 'Minimal. Wozku is designed with a "two-tap" sharing flow. Teammates receive curated, personalized post drafts via Slack, Microsoft Teams, or email. They can quickly preview, make brief personal edits, and post directly to their networks in seconds-requiring no tedious drafting or platform switching.'
  },
  {
    category: 'Engagement & Adoption',
    question: 'How do you incentivize advocates without creating a toxic competitive culture?',
    answer: 'Wozku features a friendly, custom gamification layer. Advocates earn badges, climb points leaderboards, and unlock milestone rewards. Admins can configure rewards to be non-monetary (e.g. executive mentorship sessions, charity donations, or company recognition) to ensure participation feels inclusive, collaborative, and rewarding.'
  },

  // Customization
  {
    category: 'Customization',
    question: 'Can we fully white-label the advocate dashboard and curated content hub?',
    answer: 'Yes, our Enterprise tier includes complete white-label capabilities. You can configure custom domain routing, brand color schemas, email notifications, and tailored onboarding templates so the entire experience feels like a fully integrated, proprietary internal tool.'
  },

  // Content Control
  {
    category: 'Content Control',
    question: 'How do we ensure that advocates do not accidentally post off-brand content?',
    answer: 'Wozku features robust administrative controls. Your marketing or communication teams pre-approve all shared assets, templates, and suggested commentary. While advocates are encouraged to customize messages to match their unique voice, you can set lock-tight guardrails that restrict edits to specific variable fields or require post-approvals for highly sensitive campaigns.'
  },
  {
    category: 'Content Control',
    question: 'Does Wozku support scheduling posts or automatic queued publishing?',
    answer: 'We support scheduled posts, but in accordance with social platform compliance guidelines, all shares require manual advocate initiation. Advocates can select a recommended time slot to queue a post, and they will receive a quick prompt to confirm the dispatch with a single tap at the scheduled time.'
  }
];

const CATEGORIES = [
  'All',
  'Security & Compliance',
  'Tracking & Attribution',
  'Integrations',
  'Engagement & Adoption',
  'Customization',
  'Content Control'
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openQuestion, setOpenQuestion] = useState<string | null>(FAQ_ITEMS[0].question);
  
  // Custom Ask Form State
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askQuestionText, setAskQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFAQ = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const filteredFAQs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return FAQ_ITEMS.length;
    return FAQ_ITEMS.filter(item => item.category === cat).length;
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuestionText || !askEmail) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setAskQuestionText('');
      setAskName('');
      setAskEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-500/10 selection:text-primary-900 pb-20">
      
      {/* ── 1. HERO HEADER ───────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-14 text-center">
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--primary-500) 6%, transparent), transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.3) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest text-primary-600 mb-8">
            <HelpCircle className="w-3.5 h-3.5" /> Support Center
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
            Frequently Asked<br />Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the Wozku brand advocacy platform, tracking mechanisms, security standards, and enterprise onboarding.
          </p>
        </div>
      </section>

      {/* ── 2. INTERACTIVE BROWSER ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        
        {/* Search bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs (e.g., KMS, UTM, Okta, platform policies...)"
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-transparent transition-all shadow-xs text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Sidebar & Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Categories Sidebar */}
          <aside className="w-full lg:w-[260px] shrink-0 space-y-2">
            <h3 className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-4">
              Categories
            </h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-1.5 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={[
                      'flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all',
                      isActive 
                        ? 'bg-primary-50 border border-primary-100 text-primary-600 font-bold' 
                        : 'border border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
                    ].join(' ')}
                  >
                    <span>{cat}</span>
                    <span className={[
                      'text-[9px] font-mono px-2 py-0.5 rounded-full ml-3',
                      isActive ? 'bg-primary-100 text-primary-700' : 'bg-slate-200/60 text-slate-500'
                    ].join(' ')}>
                      {getCategoryCount(cat)}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* FAQ Accordion List */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => {
                  const isOpen = openQuestion === faq.question;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      key={faq.question}
                      className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.question)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-primary-500 block">
                            {faq.category}
                          </span>
                          <span className="text-sm font-bold text-slate-950 leading-snug block">
                            {faq.question}
                          </span>
                        </div>
                        <div className={[
                          'p-1.5 rounded-xl border border-slate-100 text-slate-400 shrink-0 transition-transform duration-300',
                          isOpen ? 'rotate-180 bg-slate-50 text-primary-600' : 'bg-white'
                        ].join(' ')}>
                          <HelpCircle className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center space-y-4"
                >
                  <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">No matching FAQs found</h4>
                    <p className="text-xs text-slate-500">Try checking your spelling or selecting a different category.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </section>

      {/* ── 3. ASK A QUESTION CTA FORM (DARK MODE) ────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#09090f] text-fixed-white rounded-[32px] border border-fixed-white/[0.08] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Background Gradient Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
            
            {/* Left side info */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 text-[8px] uppercase font-mono tracking-widest text-primary-300 font-extrabold bg-primary-500/10 px-3.5 py-1 rounded-full border border-primary-500/20">
                <Sparkles className="w-3 h-3 animate-pulse" /> Custom Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
                Can’t find what you’re looking for?
              </h2>
              <p className="text-sm text-fixed-light leading-relaxed">
                Our solutions and legal compliance teams routinely collaborate with enterprise customers on security audits, specific platform APIs, and custom workflow triggers.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 border border-primary-500/20">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Dedicated Legal & Tech Support</h4>
                    <p className="text-[10px] text-slate-400">Response within 24 hours under SLA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="bg-fixed-white/[0.02] border border-fixed-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-md">
              <h3 className="text-sm font-bold mb-6 text-fixed-white flex items-center gap-2">
                Submit a Question
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-fixed-white">Question Submitted Successfully</h4>
                    <p className="text-xs text-fixed-muted mt-1">Our solutions engineering team will get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAskSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-wider text-fixed-muted block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={askName}
                        onChange={(e) => setAskName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-[#141418] border border-fixed-white/[0.1] rounded-xl text-xs text-fixed-white placeholder:text-fixed-muted focus:outline-hidden focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-wider text-fixed-muted block mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={askEmail}
                        onChange={(e) => setAskEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 bg-[#141418] border border-fixed-white/[0.1] rounded-xl text-xs text-fixed-white placeholder:text-fixed-muted focus:outline-hidden focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wider text-fixed-muted block mb-1.5">
                      Your Question
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={askQuestionText}
                      onChange={(e) => setAskQuestionText(e.target.value)}
                      placeholder="Ask about custom platform permissions, SSO options, etc."
                      className="w-full px-3.5 py-2.5 bg-[#141418] border border-fixed-white/[0.1] rounded-xl text-xs text-fixed-white placeholder:text-fixed-muted focus:outline-hidden focus:ring-1 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-slate-100 disabled:bg-slate-300 text-slate-950 font-mono text-[9px] uppercase font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Question'}</span>
                    <Send className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
