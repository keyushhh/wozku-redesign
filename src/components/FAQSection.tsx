import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, MessageSquare, ArrowRight, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Security & Compliance',
    question: 'Is Wozku compliant with enterprise security standards and social platform policies?',
    answer: 'Absolutely. Wozku is fully SOC 2 Type II compliant and respects all platform Terms of Service. We utilize official developer APIs for LinkedIn, X (Twitter), and other social networks. All shared content is strictly user-initiated, preventing automatic or bot-like behavior and ensuring that your employees and partners remain safe and authentic.'
  },
  {
    category: 'Tracking & Attribution',
    question: 'How does Wozku accurately attribute leads and revenue back to specific advocates?',
    answer: 'Every shared update is automatically enriched with custom, dynamically generated tracking tokens and localized UTM parameters. When a customer or prospect clicks a link and converts, our tracking pixel maps the referral ID directly back to the advocating teammate, logging the exact source, impressions, clicks, and sourced pipeline inside your integrated CRM.'
  },
  {
    category: 'Integrations',
    question: 'Can we sync Wozku with Salesforce, HubSpot, and our SSO systems?',
    answer: 'Yes. Wozku supports native integrations with major CRM systems like Salesforce and HubSpot to pass attribution metadata directly. We also offer standard SAML 2.0 and OIDC integrations (Okta, Microsoft Entra ID, Google Workspace) to make employee onboarding seamless and secure.'
  },
  {
    category: 'Engagement & Adoption',
    question: 'What level of effort is required from our busy employees to share content?',
    answer: 'Minimal. Wozku is designed with a "two-tap" sharing flow. Teammates receive curated, personalized post drafts via Slack, Microsoft Teams, or email. They can quickly preview, make brief personal edits, and post directly to their networks in seconds-requiring no tedious drafting or platform switching.'
  },
  {
    category: 'Customization',
    question: 'Can we fully white-label the advocate dashboard and curated content hub?',
    answer: 'Yes, our Enterprise tier includes complete white-label capabilities. You can configure custom domain routing, brand color schemas, email notifications, and tailored onboarding templates so the entire experience feels like a fully integrated, proprietary internal tool.'
  },
  {
    category: 'Content Control',
    question: 'How do we ensure that advocates do not accidentally post off-brand content?',
    answer: 'Wozku features robust administrative controls. Your marketing or communication teams pre-approve all shared assets, templates, and suggested commentary. While advocates are encouraged to customize messages to match their unique voice, you can set lock-tight guardrails that restrict edits to specific variable fields or require post-approvals for highly sensitive campaigns.'
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

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openQuestion, setOpenQuestion] = useState<string | null>(FAQ_ITEMS[0].question);

  const toggleFAQ = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const filteredFAQs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="pt-24 pb-8 border-t border-neutral-200 relative bg-linear-to-b from-neutral-50/20 to-white">
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
            Got Questions? We’ve Got Answers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about setting up a high-impact, compliant, and automated organic brand advocacy program for your enterprise.
          </p>
        </div>

        {/* Search bar & Category filter pills */}
        <div className="space-y-6 mb-10 max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs (e.g., security, tracking, Slack...)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent transition-all shadow-3xs text-neutral-900 placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-600 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? 'bg-indigo-600 text-fixed-white shadow-sm shadow-indigo-500/20 border border-transparent'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-200/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, idx) => {
              const isOpen = openQuestion === item.question;
              return (
                <div 
                  key={idx}
                  className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-indigo-200 shadow-xs shadow-indigo-100/30' 
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.question)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                        {item.category}
                      </span>
                      <h3 className={`text-sm sm:text-sm font-display font-bold transition-colors leading-snug ${
                        isOpen ? 'text-indigo-600' : 'text-neutral-900'
                      }`}>
                        {item.question}
                      </h3>
                    </div>
                    
                    <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                      isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-neutral-50 text-neutral-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-neutral-500 leading-relaxed font-sans border-t border-neutral-100/50">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-6 bg-neutral-50/50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center space-y-3"
            >
              <div className="p-3 bg-neutral-100 rounded-xl text-neutral-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-900">No matching FAQs found</h4>
                <p className="text-xs text-neutral-500">Try checking your spelling or selecting a different category.</p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Reset Search
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* View More FAQs CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.hash = '#/resources/faq'}
            className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-6 py-3.5 rounded-full cursor-pointer transition-all border border-neutral-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs"
          >
            <span>View More FAQs</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
          </button>
        </div>

        {/* Call to action card inside FAQ */}
        <div className="mt-16 bg-[#0c0c0e] text-fixed-white rounded-3xl p-6 md:p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-fixed-white/10">
          <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 blur-2xl pointer-events-none" />
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <span className="inline-flex items-center gap-1 text-[8px] uppercase font-mono tracking-widest text-indigo-300 font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              <Sparkles className="w-2.5 h-2.5" />
              STILL WONDERFUL?
            </span>
            <h4 className="text-base font-display font-bold leading-tight">
              Have a specific integration or custom compliance request?
            </h4>
            <p className="text-[11px] text-fixed-light max-w-md">
              Speak with a solutions architect today. We routinely work with global legal, compliance, and marketing teams.
            </p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
            className="group relative inline-flex items-center gap-1.5 bg-[#141418] hover:bg-[#181b22] text-fixed-white px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer overflow-hidden shrink-0 border border-fixed-white/10 shadow-md shadow-black/20"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Talk to an Architect
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 text-fixed-muted group-hover:text-indigo-300" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
