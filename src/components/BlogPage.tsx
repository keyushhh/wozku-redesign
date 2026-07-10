import React, { useState } from 'react';
import {
  Sparkles, ArrowRight, ArrowUpRight, Clock, Calendar,
  Search, X, Tag, TrendingUp, BookOpen, Rss, ChevronRight, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: { name: string; initials: string; role: string };
  date: string;
  readTime: string;
  featured: boolean;
}

const POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'employee-advocacy-guide-2025',
    title: 'The Complete Guide to Employee Advocacy in 2025',
    excerpt: 'Learn how top B2B companies are activating their biggest untapped distribution channel — their own employees — to drive pipeline, cut CAC, and dominate organic reach.',
    category: 'Strategy',
    tags: ['Employee Advocacy', 'Organic Growth', 'B2B'],
    author: { name: 'Sarah Jenkins', initials: 'SJ', role: 'VP of Growth' },
    date: 'Jul 02, 2025',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    slug: 'measuring-eav-organic-social',
    title: 'Measuring Equivalent Advertising Value from Organic Social',
    excerpt: 'EAV is the hidden metric proving that organic sharing outperforms paid ads on LinkedIn. Here is how to calculate, attribute, and report it to your board.',
    category: 'Analytics',
    tags: ['EAV', 'Attribution', 'ROI'],
    author: { name: 'Marcus Vance', initials: 'MV', role: 'Director of Analytics' },
    date: 'Jun 25, 2025',
    readTime: '6 min read',
    featured: false
  },
  {
    id: '3',
    slug: 'slack-advocacy-campaigns',
    title: 'How to Run Advocacy Campaigns Entirely Inside Slack',
    excerpt: 'A step-by-step walkthrough for deploying, reviewing, and tracking social campaigns without your employees ever leaving their Slack workspace.',
    category: 'Guides',
    tags: ['Slack', 'Automation', 'Workflow'],
    author: { name: 'Danielle K.', initials: 'DK', role: 'Head of DevRel' },
    date: 'Jun 18, 2025',
    readTime: '5 min read',
    featured: false
  },
  {
    id: '4',
    slug: 'enterprise-compliance-social',
    title: 'Navigating Enterprise Compliance on Social Media',
    excerpt: 'SOC2, HIPAA, GDPR — compliance need not be a barrier to sharing. How regulated industries unlock advocacy with guard-rail controls built in.',
    category: 'Compliance',
    tags: ['SOC2', 'HIPAA', 'Enterprise'],
    author: { name: 'Dr. Aris Vance', initials: 'AV', role: 'Chief Compliance Officer' },
    date: 'Jun 12, 2025',
    readTime: '7 min read',
    featured: true
  },
  {
    id: '5',
    slug: 'gamification-advocacy-programs',
    title: 'Gamification Done Right: Motivating Advocates Without Toxicity',
    excerpt: 'Leaderboards, badges, and milestone rewards can drive massive participation — or create resentment. Learn the design principles that keep culture healthy.',
    category: 'Strategy',
    tags: ['Gamification', 'Engagement', 'Culture'],
    author: { name: 'Elena Rostov', initials: 'ER', role: 'CMO' },
    date: 'Jun 05, 2025',
    readTime: '6 min read',
    featured: false
  },
  {
    id: '6',
    slug: 'crm-attribution-social-leads',
    title: 'Closing the Loop: CRM Attribution for Social-Sourced Leads',
    excerpt: 'Salesforce and HubSpot integrations let you trace every pipeline dollar back to the exact advocate share that triggered it. Here is the full setup guide.',
    category: 'Analytics',
    tags: ['CRM', 'Salesforce', 'HubSpot', 'Attribution'],
    author: { name: 'Liam Zhao', initials: 'LZ', role: 'Co-Founder' },
    date: 'May 28, 2025',
    readTime: '9 min read',
    featured: false
  },
  {
    id: '7',
    slug: 'event-advocacy-playbook',
    title: 'The Event Advocacy Playbook: From Webinar to Summit',
    excerpt: 'Drive registrations, amplify live-event buzz, and sustain post-event engagement with a structured advocate campaign at every stage.',
    category: 'Guides',
    tags: ['Events', 'Webinars', 'Playbook'],
    author: { name: 'Marcus Vance', initials: 'MV', role: 'Director of Analytics' },
    date: 'May 20, 2025',
    readTime: '10 min read',
    featured: false
  },
  {
    id: '8',
    slug: 'developer-community-growth',
    title: 'Building Developer Communities That Actually Share Your Product',
    excerpt: 'The open-source playbook for converting GitHub watchers into LinkedIn advocates — without bribing them with swag they do not want.',
    category: 'Community',
    tags: ['Developer Relations', 'Community', 'Open Source'],
    author: { name: 'Danielle K.', initials: 'DK', role: 'Head of DevRel' },
    date: 'May 12, 2025',
    readTime: '7 min read',
    featured: false
  }
];

const CATEGORIES = ['All', 'Strategy', 'Analytics', 'Guides', 'Compliance', 'Community'];

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: 'text-violet-600 bg-violet-50 border-violet-100',
  Analytics: 'text-blue-600 bg-blue-50 border-blue-100',
  Guides: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  Compliance: 'text-amber-600 bg-amber-50 border-amber-100',
  Community: 'text-rose-600 bg-rose-50 border-rose-100',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      post.title.toLowerCase().includes(q) || 
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 pb-20 selection:bg-indigo-500/10 selection:text-indigo-900 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--indigo-500) 5%, transparent), transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-indigo-600 font-extrabold bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
            <Rss className="w-3.5 h-3.5 text-indigo-500" /> BLOG & ARTICLES
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight leading-tight">
            Advocacy Strategy &<br className="hidden sm:block" /> Industry Intelligence
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto">
            Tactical guides, analytical frameworks, and industry research to help you build and scale advocacy programs that convert.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 max-w-6xl mx-auto border-b border-slate-200/80 pb-6">

          {/* Category Tabs */}
          <div className="bg-white border border-slate-200 p-1 rounded-2xl flex flex-wrap gap-1 shadow-sm">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-fixed-white shadow-xs shadow-indigo-500/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full sm:w-[220px] bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* No results state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 space-y-3"
          >
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-500">No articles found</p>
            <p className="text-xs text-slate-400">Try a different category or search term.</p>
          </motion.div>
        )}

        {/* Featured Posts — full width horizontal cards */}
        {featuredPosts.length > 0 && (
          <div className="space-y-6 max-w-6xl mx-auto mb-12">
            <AnimatePresence mode="popLayout">
              {featuredPosts.map((post) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white border border-slate-200 hover:border-indigo-500/40 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-start gap-8 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/[0.025] rounded-full blur-3xl pointer-events-none" />

                  {/* Left: Meta Column */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border font-mono ${CATEGORY_COLORS[post.category] ?? 'text-slate-500 bg-slate-50 border-slate-100'}`}>
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full font-mono">
                        ★ Featured
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 leading-tight group-hover:text-indigo-600 transition-colors tracking-tight">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-600 leading-relaxed font-sans font-medium">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Author + CTA */}
                  <div className="w-full lg:w-[200px] shrink-0 flex flex-col justify-between gap-6 lg:border-l lg:border-slate-100 lg:pl-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700 font-mono border border-slate-200 shrink-0">
                          {post.author.initials}
                        </span>
                        <div>
                          <div className="text-[10px] font-bold text-neutral-900">{post.author.name}</div>
                          <div className="text-[9px] text-slate-450 font-medium">{post.author.role}</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-450 font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-450 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <span className="text-indigo-600 group-hover:text-indigo-500 transition-colors flex items-center gap-1 font-bold text-xs">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <div className="max-w-6xl mx-auto space-y-6">
            {featuredPosts.length > 0 && (
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                More Articles
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {regularPosts.map((post, i) => (
                  <motion.article
                    layout
                    key={post.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="group bg-white border border-slate-200 hover:border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.01]"
                  >
                    <div className="space-y-3 mb-6">
                      {/* Category Badge */}
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border font-mono ${CATEGORY_COLORS[post.category] ?? 'text-slate-500 bg-slate-50 border-slate-100'}`}>
                        {post.category}
                      </span>

                      <h3 className="text-sm font-bold text-neutral-900 leading-snug group-hover:text-indigo-600 transition-colors min-h-[40px]">
                        {post.title}
                      </h3>
                      <p className="text-[11px] text-slate-550 leading-relaxed font-medium line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <hr className="border-slate-100 mb-4" />
                      <div className="flex items-center justify-between">
                        {/* Author row */}
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-700 font-mono border border-slate-200 shrink-0">
                            {post.author.initials}
                          </span>
                          <div>
                            <div className="text-[9px] font-bold text-neutral-900 leading-tight">{post.author.name}</div>
                            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-medium">
                              <Clock className="w-2.5 h-2.5" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                        <span className="text-indigo-600 group-hover:text-indigo-500 transition-colors flex items-center gap-0.5 font-bold text-[10px] shrink-0">
                          Read
                          <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-28 max-w-5xl mx-auto bg-[#09090f] text-fixed-white rounded-[2.5rem] p-8 sm:p-12 border border-fixed-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots-accent opacity-15 pointer-events-none" />
          <div className="absolute top-0 right-0 h-48 w-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-violet-500/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-[8.5px] uppercase font-mono tracking-widest text-indigo-400 font-extrabold bg-indigo-950 border border-indigo-900/50 px-3.5 py-1 rounded-full">
                <Rss className="w-3.5 h-3.5" /> WEEKLY DISPATCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-fixed-white leading-tight">
                Advocacy intelligence,<br className="hidden sm:block" /> delivered weekly.
              </h2>
              <p className="text-xs text-fixed-light leading-relaxed font-sans max-w-md">
                Join 4,200+ growth leaders getting tactical breakdowns, case study drops, and platform updates every Tuesday.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0 flex flex-col gap-3 min-w-[280px]">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 bg-[#141418] border border-fixed-white/10 text-fixed-white text-xs placeholder:text-fixed-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-700 transition-all font-medium"
                />
                <button
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-indigo-500/20 shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[9px] text-fixed-muted font-medium text-center lg:text-left">
                No spam. Unsubscribe anytime. Read by teams at Salesforce, Figma, and Notion.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
