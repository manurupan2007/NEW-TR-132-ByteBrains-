export interface AnalysisResult {
  riskLevel: 'None' | 'Mild' | 'Moderate' | 'Crisis' | string;
  confidence: number;
  intensity: number;
  keyThemes: string[];
  summary: string;
  clinicalIndicators: string[];
  timestamp: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Crisis' | 'Support' | 'Self-Help' | string;
  region: string;
  contact?: string;
  url: string;
}
