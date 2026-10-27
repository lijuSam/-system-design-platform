export type Difficulty = 'Beginner' | 'Intermediate' | 'Staff+';

export type Category = 
  | 'Fundamentals' 
  | 'Storage & Databases' 
  | 'Distributed Caching' 
  | 'Messaging & Queues' 
  | 'High Availability & Resiliency' 
  | 'Consensus & Coordination' 
  | 'Networking & CDNs' 
  | 'Security & Rate Limiting';

export interface Concept {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  difficulty: Difficulty;
  readTime: string;
  iconName: string;
  summary: string;
  keyPoints: string[];
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
  deepDiveMarkdown: string;
  architectureDiagram?: string;
  relatedCaseStudies?: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  company: string;
  tagline: string;
  difficulty: Difficulty;
  stats: {
    label: string;
    value: string;
  }[];
  capacityEstimation: {
    metric: string;
    calculation: string;
    result: string;
  }[];
  architectureFlow: {
    step: number;
    title: string;
    description: string;
    component: string;
  }[];
  components: {
    name: string;
    role: string;
    technologies: string[];
    deepDive: string;
  }[];
  failureModes: {
    scenario: string;
    impact: string;
    mitigation: string;
  }[];
  keyTakeaways: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  category: Category;
  tags: string[];
  likes: number;
  content: string;
  keyTakeaways: string[];
}

export interface BlogComment {
  id: string;
  blogSlug: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface SimulatorNode {
  id: string;
  type: 'client' | 'cdn' | 'load_balancer' | 'api_gateway' | 'service' | 'cache' | 'queue' | 'database' | 'worker';
  name: string;
  technology?: string;
  x: number;
  y: number;
  capacityQPS: number;
  baseLatencyMs: number;
  costPerMonth: number;
  redundancy: number; // 1 = SPOF, 2+ = replicated
}

export interface SimulatorConnection {
  id: string;
  from: string;
  to: string;
  trafficRatio?: number; // e.g. 0.8 for 80% cache hit
}

export interface SimulationResult {
  totalQps: number;
  estimatedLatencyMs: number;
  estimatedCostPerMonth: number;
  bottlenecks: string[];
  spofWarnings: string[];
  recommendations: string[];
  status: 'optimal' | 'warning' | 'critical';
}

export interface QuizQuestion {
  id: string;
  title: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: Category;
  difficulty: Difficulty;
  architecturalInsight: string;
}

export interface LatencyMetric {
  name: string;
  timeDisplay: string;
  nanoseconds: number;
  category: 'CPU/Memory' | 'Disk/Flash' | 'Network';
  analogy: string;
}
