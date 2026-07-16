import React, { useState } from 'react';
import { m } from 'motion/react';
import {
  ArrowUpRight,
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  MoreHorizontal,
  X,
  Globe2,
  Heart,
  Award
} from 'lucide-react';
import { MOCK_LINKEDIN_POSTS, LinkedInPost } from '../data/linkedinPosts.mock';

interface HeroLinkedInProps {
  onOpenDemo: () => void;
  radiusMode?: 'rounded' | 'sharp';
}

export default function HeroLinkedIn({ onOpenDemo, radiusMode }: HeroLinkedInProps) {
  // Track failed avatar image loads to fall back dynamically to initials
  const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const cardRadiusStyle = {
    borderRadius: radiusMode === 'sharp' ? '0px' : '10px',
  };

  const renderReactionIcons = (types: LinkedInPost['reactions']['types']) => {
    return (
      <div className="flex -space-x-1 items-center mr-1.5 shrink-0">
        {types.map((type, idx) => {
          if (type === 'like') {
            return (
              <div key={idx} className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center border border-white dark:border-neutral-900 z-30">
                <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            );
          }
          if (type === 'celebrate') {
            return (
              <div key={idx} className="w-3.5 h-3.5 rounded-full bg-emerald-600 flex items-center justify-center border border-white dark:border-neutral-900 z-20">
                <Award className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            );
          }
          if (type === 'love') {
            return (
              <div key={idx} className="w-3.5 h-3.5 rounded-full bg-rose-600 flex items-center justify-center border border-white dark:border-neutral-900 z-10">
                <Heart className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            );
          }
          return (
            <div key={idx} className="w-3.5 h-3.5 rounded-full bg-purple-600 flex items-center justify-center border border-white dark:border-neutral-900 z-10">
              <Heart className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          );
        })}
      </div>
    );
  };

  const renderPostCard = (post: LinkedInPost, isClone = false) => {
    const hasPhoto = post.author.avatarUrl && !failedAvatars[post.id];
    const isLcpPost = post.id === 'post-1' && !isClone;

    return (
      <div
        key={isClone ? `${post.id}-clone` : post.id}
        style={{
          ...cardRadiusStyle,
          height: 'auto',
          alignSelf: 'flex-end',
        }}
        className="w-[300px] sm:w-[330px] shrink-0 border border-neutral-200/80 bg-white p-3.5 shadow-xs transition-colors dark:border-neutral-855 dark:bg-neutral-900 text-left flex flex-col relative select-none"
        aria-hidden={isClone ? "true" : undefined}
      >

        {/* 1. Header Row */}
        <div className="flex gap-2.5 items-start pr-10">
          {hasPhoto ? (
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              onError={() => setFailedAvatars(prev => ({ ...prev, [post.id]: true }))}
              className="h-9 w-9 rounded-full object-cover border border-neutral-100 dark:border-neutral-800 shrink-0"
              draggable="false"
              fetchPriority={isLcpPost ? "high" : undefined}
              loading={isLcpPost ? "eager" : "lazy"}
            />
          ) : (
            <div className={`h-9 w-9 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 border border-neutral-100 dark:border-neutral-800 ${post.author.avatarColor || 'bg-indigo-650 text-white'}`}>
              {post.author.initials}
            </div>
          )}
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <h3 className="font-sans text-[11.5px] font-bold text-neutral-950 dark:text-white truncate">
                {post.author.name}
              </h3>
              <span className="text-[9px] text-neutral-400 font-medium shrink-0">
                · {post.author.connectionDegree}
              </span>
            </div>
            <p className="font-sans text-[9.5px] text-neutral-500 dark:text-neutral-455 truncate">
              {post.author.title}
            </p>
            <p className="font-sans text-[9px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
              {post.author.followers}
            </p>
            <div className="flex items-center gap-1 mt-0.5 text-[9px] text-neutral-400 dark:text-neutral-500">
              <span>{post.timestamp}</span>
              <span>•</span>
              <Globe2 className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>

        {/* 2. Post Text (with truncation see more) */}
        <div className="mt-2.5">
          <p className="text-[11px] leading-normal text-neutral-800 dark:text-neutral-250 pr-1">
            {post.postText.length > 105 ? (
              <>
                {post.postText.slice(0, 100)}
                <span className="text-neutral-400 dark:text-neutral-500 font-semibold cursor-default hover:underline ml-1">
                  ...see more
                </span>
              </>
            ) : (
              post.postText
            )}
          </p>

          {/* 3. Attachment Area */}
          {post.attachment && (
            <div className="mt-2.5 overflow-hidden border border-neutral-150 dark:border-neutral-800 rounded-lg flex flex-col bg-neutral-50 dark:bg-neutral-955/40 shrink-0">
              <img
                src={post.attachment.imageUrl}
                alt="Attachment Preview"
                className="w-full h-[70px] object-cover"
                draggable="false"
                fetchPriority={isLcpPost ? "high" : undefined}
                loading={isLcpPost ? "eager" : "lazy"}
              />
              {post.attachment.type === 'link' ? (
                <div className="p-1.5 border-t border-neutral-150 dark:border-neutral-800 leading-tight">
                  <span className="block text-[8px] text-neutral-400 uppercase tracking-wide truncate">
                    {post.attachment.subtitle}
                  </span>
                  <h4 className="text-[9.5px] font-bold text-neutral-850 dark:text-neutral-200 truncate mt-0.5">
                    {post.attachment.title}
                  </h4>
                </div>
              ) : (
                <div className="px-2 py-1 flex items-center justify-between text-[8px] text-neutral-455 dark:text-neutral-500 bg-neutral-100/50 dark:bg-neutral-900/50 border-t border-neutral-150 dark:border-neutral-800">
                  <span>Image Attachment</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-650 dark:bg-indigo-955/50 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-150/40 dark:border-indigo-900/20">
                    Wozku Certified
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Social Status / Reaction Row */}
        <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-850 flex items-center justify-between text-[9.5px] text-neutral-450 dark:text-neutral-500 shrink-0">
          <div className="flex items-center min-w-0">
            {renderReactionIcons(post.reactions.types)}
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-default truncate">
              {post.reactions.countText}
            </span>
          </div>
          {post.reactions.repostsCountText && (
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-default shrink-0 ml-2">
              {post.reactions.repostsCountText}
            </span>
          )}
        </div>

        {/* 5. LinkedIn Action Bar */}
        <div className="mt-2 pt-1.5 border-t border-neutral-100 dark:border-neutral-850 grid grid-cols-4 gap-0.5 text-center shrink-0">
          <button className="flex items-center justify-center gap-1 py-1.5 text-[9.5px] font-semibold text-neutral-550 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 rounded-sm cursor-default transition-all">
            <ThumbsUp className="w-3 h-3" />
            <span>Like</span>
          </button>
          <button className="flex items-center justify-center gap-1 py-1.5 text-[9.5px] font-semibold text-neutral-550 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 rounded-sm cursor-default transition-all">
            <MessageSquare className="w-3 h-3" />
            <span>Comment</span>
          </button>
          <button className="flex items-center justify-center gap-1 py-1.5 text-[9.5px] font-semibold text-neutral-550 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 rounded-sm cursor-default transition-all">
            <Share2 className="w-3 h-3" />
            <span>Repost</span>
          </button>
          <button className="flex items-center justify-center gap-1 py-1.5 text-[9.5px] font-semibold text-neutral-550 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 rounded-sm cursor-default transition-all">
            <Send className="w-3 h-3" />
            <span>Send</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative z-10 min-h-[640px] overflow-hidden pt-9 lg:pt-10 flex flex-col justify-start gap-12 lg:gap-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[235px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[100px] dark:bg-indigo-500/[0.1] z-0" />

      {/* Hero Header Area */}
      <div className="relative mx-auto max-w-8xl px-6 text-center z-10 flex-shrink-0">
        <m.h1
          {...rise(0.06)}
          className="mx-auto mt-2 max-w-4xl font-display text-[40px] font-black leading-[0.98] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-[56px] dark:text-white"
        >
          Your story travels further<br />
          <span className="text-indigo-650 dark:text-indigo-400">when people share it.</span>
        </m.h1>

        <m.p
          {...rise(0.12)}
          className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-450"
        >
          Help the people closest to your brand share with confidence—and see the impact of every conversation.
        </m.p>

        <m.div {...rise(0.18)} className="mt-3 flex justify-center">
          <button
            onClick={onOpenDemo}
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-neutral-950/15 transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-neutral-950 cursor-pointer"
          >
            Book a demo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </m.div>
      </div>

      {/* LinkedIn Post Carousel Section (breaks out of max-w constraints to achieve genuine edge-to-edge scrolling) */}
      <div
          className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-x-hidden overflow-y-visible mt-auto h-[360px] flex items-end z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, red 30%, red 70%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, red 30%, red 70%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%'
          }}
          role="region"
          aria-label="LinkedIn advocacy posts loop"
      >
        {/* Infinite Scrolling Marquee Wrapper */}
        <div
          className="flex w-max gap-6 px-4 pt-8 pb-4 animate-marquee hover:[animation-play-state:paused]"
          style={{
            animation: 'marquee-linkedin 35s linear infinite',
            alignItems: 'flex-end',
          }}
        >
          {/* First set of posts */}
          {MOCK_LINKEDIN_POSTS.map((post) => renderPostCard(post, false))}

          {/* Duplicated set for seamless loop (hidden from screen readers) */}
          {MOCK_LINKEDIN_POSTS.map((post) => renderPostCard(post, true))}
        </div>
      </div>

      {/* Bottom Fade Mask Gradient relative to the section root (taller h-44 for extra soft layout blend) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-950 z-20" />

      {/* CSS Styles for Marquee Animations */}
      <style>{`
        @keyframes marquee-linkedin {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Handles responsive design & prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
            overflow-x: auto;
            flex-wrap: nowrap;
            width: 100%;
            justify-content: flex-start;
            padding-bottom: 12px;
          }
          .animate-marquee > [aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
