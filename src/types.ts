export interface Advocate {
  id: string;
  name: string;
  email: string;
  role: 'Employee' | 'Customer' | 'Partner' | 'VIP';
  shares: number;
  clicks: number;
  status: 'Active' | 'Invited' | 'Pending';
  rewardTier: 'Gold' | 'Silver' | 'Bronze' | 'None';
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'idle' | 'active' | 'completed';
}

export interface Campaign {
  id: string;
  title: string;
  shares: number;
  reach: number;
  conversions: number;
  roi: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  metrics: { label: string; value: string }[];
  logo: string;
}

export interface UseCase {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
}

export interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  connected: boolean;
}
