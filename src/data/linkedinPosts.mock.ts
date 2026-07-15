export interface LinkedInPost {
  id: string;
  author: {
    name: string;
    title: string;
    avatarUrl?: string;
    initials: string;
    avatarColor?: string;
    connectionDegree: string; // e.g. "1st", "2nd"
    followers: string; // e.g. "4,210 followers"
  };
  timestamp: string; // e.g. "1d", "3h"
  postText: string;
  attachment?: {
    type: 'link' | 'image';
    title?: string;
    subtitle?: string;
    imageUrl: string;
    url?: string;
  };
  reactions: {
    countText: string; // e.g. "Sarah Jenkins and 12 others"
    repostsCountText?: string; // e.g. "3 reposts"
    types: ('like' | 'celebrate' | 'support' | 'love')[];
  };
}

export const MOCK_LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Sarah Jenkins',
      title: 'VP of Growth at FlowState',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'SJ',
      connectionDegree: '1st',
      followers: '12,450 followers',
    },
    timestamp: '1d',
    postText: 'Just scanned a Wozku QR at their developer conference booth. Insanely fast pipeline setup! Our product team is already onboarded and ready to start sharing company milestones. Advocacy done right.',
    attachment: {
      type: 'link',
      title: 'Join our beta group - Wozku Dev Hub',
      subtitle: 'wozku.com · 2 min read',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=300&q=80',
      url: 'wozku.com/beta',
    },
    reactions: {
      countText: 'Marcus Brody and 42 others',
      repostsCountText: '5 reposts',
      types: ['like', 'celebrate'],
    },
  },
  {
    id: 'post-2',
    author: {
      name: 'David Chen',
      title: 'Founder & CEO, HyperScale',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'DC',
      avatarColor: 'bg-emerald-600 text-white',
      connectionDegree: '2nd',
      followers: '3,890 followers',
    },
    timestamp: '3d',
    postText: 'Employee advocacy always felt like a chore. We deployed Wozku yesterday via their offline-to-online QR code kit. 84% team adoption in under 24 hours. Safe sharing with one-tap attribution is a game changer.',
    reactions: {
      countText: 'Ariel Vance and 18 others',
      repostsCountText: '2 reposts',
      types: ['like', 'support'],
    },
  },
  {
    id: 'post-3',
    author: {
      name: 'Amara Okafor',
      title: 'Head of Brand at VeloPay',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'AO',
      connectionDegree: '1st',
      followers: '24,120 followers',
    },
    timestamp: '5h',
    postText: 'Empowering your remote employees to share safe, on-brand content has always been a legal headache. The compliance verification on Wozku is a masterclass in brand safety.',
    attachment: {
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=300&q=80',
    },
    reactions: {
      countText: 'Jane Doe and 112 others',
      repostsCountText: '14 reposts',
      types: ['like', 'love', 'celebrate'],
    },
  },
  {
    id: 'post-4',
    author: {
      name: 'Bob Loblaw',
      title: 'Senior Partner, L&L Attorneys',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'BL',
      avatarColor: 'bg-purple-700 text-white',
      connectionDegree: '1st',
      followers: '8,400 followers',
    },
    timestamp: '2d',
    postText: 'Wozku makes brand advocacy simple. We set up QR code scanners in our local offices. Our lawyers are sharing industry insights automatically, completely aligned with compliance regulations.',
    reactions: {
      countText: 'Sarah Jenkins and 3 others',
      types: ['like'],
    },
  },
  {
    id: 'post-5',
    author: {
      name: 'Elena Rostova',
      title: 'Chief People Officer, BrightSide',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'ER',
      connectionDegree: '1st',
      followers: '19,340 followers',
    },
    timestamp: '1w',
    postText: 'Authentic voices build better connections. Extremely proud of our team for sharing their daily milestones via Wozku QR codes. Organic recruitment has never been this organic.',
    attachment: {
      type: 'link',
      title: 'Our Journey with Wozku Brand Controls',
      subtitle: 'brightside.com · 4 min read',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&h=300&q=80',
      url: 'brightside.com/wozku',
    },
    reactions: {
      countText: 'You and 204 others',
      repostsCountText: '33 reposts',
      types: ['like', 'celebrate', 'love'],
    },
  },
  {
    id: 'post-6',
    author: {
      name: 'Marcus Brody',
      title: 'Sales Enablement at CloudSpark',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
      initials: 'MB',
      avatarColor: 'bg-blue-600 text-white',
      connectionDegree: '2nd',
      followers: '1,290 followers',
    },
    timestamp: '3d',
    postText: 'Attribution is typically a black box for social media sharing. Being able to trace exact referral conversion paths back to physical QR codes at events gives us actual measurable ROI on our marketing spend.',
    reactions: {
      countText: 'Amara Okafor and 9 others',
      repostsCountText: '1 repost',
      types: ['like', 'support'],
    },
  },
];
