export type PageId = 'overview' | 'works' | 'services' | 'publications' | 'leadership' | 'advisory';

export interface Credential {
  id: string;
  title: string;
  designation: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  description: string;
  highlight?: boolean;
}

export interface CareerMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  highlights: string[];
  scope: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publishedDate: string;
  doi?: string;
  url?: string;
  abstract: string;
  keyThemes: string[];
  keyFindings: string[];
  citation: string;
  type: 'journal' | 'technical_paper' | 'world_congress' | 'national_guidance';
}

export interface LeadershipRole {
  period: string;
  role: string;
  organization: string;
  details: string;
  category: 'governance' | 'institutional' | 'speaking';
  impactSummary: string;
}

export interface AwardItem {
  title: string;
  year: string;
  awardingBody: string;
  category: 'individual' | 'institutional_recognition' | 'team_corporate';
  description: string;
  notes?: string;
}

export interface ThermalCalculationResult {
  wbgt: number;
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  workRestCycle: string;
  waterIntakeLitersPerHour: number;
  recommendedControls: string[];
  physiologicalAlert: string;
}
