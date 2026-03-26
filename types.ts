
export enum CallOutcome {
  LEAD_CAPTURED = 'Lead Captured',
  APPOINTMENT_BOOKED = 'Appointment Booked',
  FAQ_ANSWERED = 'FAQ Answered',
  ESCALATED = 'Escalated',
  VOICEMAIL = 'Voicemail'
}

export type UserRole = 'Owner' | 'Admin' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  pdfUrl: string;
}

export interface Subscription {
  plan: 'Starter' | 'Pro' | 'None';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: string;
  usage: {
    calls: number;
    minutes: number;
    callLimit: number;
    minuteLimit: number;
  };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  reason: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface CallRecord {
  id: string;
  callerName: string;
  callerPhone: string;
  duration: number; // in seconds
  timestamp: string;
  outcome: CallOutcome;
  summary: string;
  transcript: { speaker: 'Agent' | 'Caller'; text: string }[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  direction: 'inbound' | 'outbound';
  twilioPhoneNumber: string;
  twilioPhoneSid: string;
  voice: 'Zephyr' | 'Puck' | 'Charon' | 'Kore' | 'Fenrir';
  language: 'English' | 'Spanish' | 'French' | 'German';
  greeting: string;
  tone: 'Professional' | 'Friendly' | 'Empathetic';
  businessHours: string;
  faqs: FAQ[];
  escalationPhone: string;
  voicemailFallback: boolean;
  dataCaptureFields: string[];
  rules: {
    autoBook: boolean;
    autoEscalate: boolean;
    captureAllLeads: boolean;
  };
}

export interface ChatbotConfig {
  id: string;
  name: string;
  voiceAgentId: string;
  faqs: FAQ[];
  headerTitle: string;
  welcomeMessage: string;
  placeholder: string;
  launcherLabel: string;
  accentColor: string;
  position: 'left' | 'right';
  avatarLabel: string;
  customPrompt: string;
  suggestedPrompts: string[];
  embedScript: string;
  widgetScriptUrl: string;
}

export interface BusinessProfile {
  name: string;
  industry: string;
  website: string;
  location: string;
  onboarded: boolean;
  timezone: string;
}

export interface TwilioSettings {
  accountSid: string;
  authTokenConfigured: boolean;
  authTokenLastFour: string;
  validateRequests: boolean;
  webhookBaseUrl: string;
}

export interface WorkspaceSettings {
  timezone: string;
  phoneNumber: string;
  twilio: TwilioSettings;
}

export interface Organization {
  id: string;
  profile: BusinessProfile;
  activeVoiceAgentId: string;
  voiceAgents: AgentConfig[];
  agent: AgentConfig;
  activeChatbotId: string;
  chatbots: ChatbotConfig[];
  subscription: Subscription;
  phoneNumber: string;
  settings: WorkspaceSettings;
  members: User[];
  invoices: Invoice[];
}

export interface DashboardData {
  stats: {
    totalCalls: number;
    leadsCaptured: number;
    missedCalls: number;
    avgDurationMinutes: number;
  };
  weeklyFlow: {
    name: string;
    calls: number;
    leads: number;
  }[];
  outcomeBreakdown: {
    label: string;
    count: number;
    color: string;
  }[];
  recentCalls: CallRecord[];
  recentLeads: Lead[];
  usage: Subscription['usage'];
  agentStatus: {
    online: boolean;
    agentName: string;
    phoneNumber: string;
    direction: 'inbound' | 'outbound';
  };
}

export interface WorkspaceBootstrap {
  user: User;
  organization: Organization;
  leads: Lead[];
  calls: CallRecord[];
  conversation: ChatMessage[];
  dashboard: DashboardData;
}
