import { SimulatorNode, SimulatorConnection } from '@/types';

export interface ArchitecturePreset {
  id: string;
  name: string;
  description: string;
  targetQps: number;
  nodes: SimulatorNode[];
  connections: SimulatorConnection[];
}

export const SIMULATOR_PRESETS: ArchitecturePreset[] = [
  {
    id: 'flash-sale',
    name: 'Flash Sale E-Commerce Architecture',
    description: 'High-burst architecture designed to absorb 100k QPS surges during Black Friday flash sales with queue decoupling and cache shielding.',
    targetQps: 75000,
    nodes: [
      { id: 'client', type: 'client', name: 'Mobile & Web Clients', x: 50, y: 160, capacityQPS: 200000, baseLatencyMs: 15, costPerMonth: 0, redundancy: 1 },
      { id: 'cdn', type: 'cdn', name: 'Cloudflare Edge CDN', technology: 'Anycast DNS + Edge Cache', x: 220, y: 160, capacityQPS: 150000, baseLatencyMs: 10, costPerMonth: 200, redundancy: 3 },
      { id: 'alb', type: 'load_balancer', name: 'Application Load Balancer', technology: 'AWS ALB / Envoy', x: 390, y: 160, capacityQPS: 120000, baseLatencyMs: 4, costPerMonth: 80, redundancy: 2 },
      { id: 'gateway', type: 'api_gateway', name: 'API Gateway & Rate Limiter', technology: 'Kong / Envoy', x: 560, y: 160, capacityQPS: 100000, baseLatencyMs: 5, costPerMonth: 150, redundancy: 2 },
      { id: 'service', type: 'service', name: 'Order & Inventory Service', technology: 'Go / gRPC Pods', x: 740, y: 160, capacityQPS: 80000, baseLatencyMs: 12, costPerMonth: 400, redundancy: 3 },
      { id: 'cache', type: 'cache', name: 'Inventory Redis Cluster', technology: 'Redis Cluster (3 Masters, 3 Replicas)', x: 920, y: 80, capacityQPS: 150000, baseLatencyMs: 1, costPerMonth: 250, redundancy: 2 },
      { id: 'queue', type: 'queue', name: 'Kafka Order Topic', technology: 'Apache Kafka Partitioned', x: 920, y: 240, capacityQPS: 200000, baseLatencyMs: 3, costPerMonth: 300, redundancy: 3 },
      { id: 'worker', type: 'worker', name: 'Order Processing Workers', technology: 'Async Worker Fleet', x: 1090, y: 240, capacityQPS: 50000, baseLatencyMs: 25, costPerMonth: 200, redundancy: 2 },
      { id: 'db', type: 'database', name: 'PostgreSQL Primary + Replica', technology: 'Aurora PostgreSQL Multi-AZ', x: 1260, y: 240, capacityQPS: 25000, baseLatencyMs: 18, costPerMonth: 600, redundancy: 2 }
    ],
    connections: [
      { id: 'c1', from: 'client', to: 'cdn' },
      { id: 'c2', from: 'cdn', to: 'alb', trafficRatio: 0.3 }, // 70% cached at CDN
      { id: 'c3', from: 'alb', to: 'gateway' },
      { id: 'c4', from: 'gateway', to: 'service' },
      { id: 'c5', from: 'service', to: 'cache' },
      { id: 'c6', from: 'service', to: 'queue' },
      { id: 'c7', from: 'queue', to: 'worker' },
      { id: 'c8', from: 'worker', to: 'db' }
    ]
  },
  {
    id: 'video-streaming',
    name: 'Global Video Streaming (Netflix Model)',
    description: 'Decoupled control plane and data plane architecture for low-latency adaptive video playback and personalized metadata.',
    targetQps: 50000,
    nodes: [
      { id: 'client', type: 'client', name: 'Smart TV & Mobile App', x: 50, y: 160, capacityQPS: 100000, baseLatencyMs: 20, costPerMonth: 0, redundancy: 1 },
      { id: 'cdn', type: 'cdn', name: 'ISP Open Connect CDN (OCA)', technology: 'Custom FreeBSD Appliance', x: 260, y: 80, capacityQPS: 500000, baseLatencyMs: 8, costPerMonth: 800, redundancy: 4 },
      { id: 'gateway', type: 'api_gateway', name: 'Zuul Dynamic API Gateway', technology: 'Netty Async Gateway', x: 260, y: 250, capacityQPS: 80000, baseLatencyMs: 6, costPerMonth: 250, redundancy: 3 },
      { id: 'service', type: 'service', name: 'Playback & DRM Auth Service', technology: 'Spring Boot Microservices', x: 540, y: 250, capacityQPS: 60000, baseLatencyMs: 14, costPerMonth: 450, redundancy: 3 },
      { id: 'cache', type: 'cache', name: 'EVCache Global Metadata', technology: 'EVCache Memcached Ring', x: 820, y: 180, capacityQPS: 200000, baseLatencyMs: 1.5, costPerMonth: 350, redundancy: 3 },
      { id: 'db', type: 'database', name: 'Apache Cassandra Cluster', technology: 'Multi-Region Masterless Ring', x: 820, y: 320, capacityQPS: 90000, baseLatencyMs: 12, costPerMonth: 750, redundancy: 3 }
    ],
    connections: [
      { id: 'c1', from: 'client', to: 'cdn' },
      { id: 'c2', from: 'client', to: 'gateway' },
      { id: 'c3', from: 'gateway', to: 'service' },
      { id: 'c4', from: 'service', to: 'cache' },
      { id: 'c5', from: 'service', to: 'db' }
    ]
  },
  {
    id: 'url-shortener',
    name: 'Distributed URL Shortener (TinyURL)',
    description: 'High read-to-write ratio (100:1) with Base62 pre-generated tokens and edge redirect caching.',
    targetQps: 30000,
    nodes: [
      { id: 'client', type: 'client', name: 'Browsers & API Clients', x: 50, y: 160, capacityQPS: 100000, baseLatencyMs: 15, costPerMonth: 0, redundancy: 1 },
      { id: 'cdn', type: 'cdn', name: 'Edge Redirect Cache (Cloudflare)', technology: 'Cloudflare Workers (HTTP 302)', x: 260, y: 160, capacityQPS: 150000, baseLatencyMs: 5, costPerMonth: 150, redundancy: 3 },
      { id: 'alb', type: 'load_balancer', name: 'Envoy L7 Proxy', technology: 'Envoy Proxy', x: 480, y: 160, capacityQPS: 90000, baseLatencyMs: 3, costPerMonth: 80, redundancy: 2 },
      { id: 'service', type: 'service', name: 'Shortener API & KGS', technology: 'Rust / Actix-web', x: 700, y: 160, capacityQPS: 70000, baseLatencyMs: 4, costPerMonth: 180, redundancy: 2 },
      { id: 'cache', type: 'cache', name: 'Redis URL Lookup Cache', technology: 'Redis Cluster', x: 920, y: 80, capacityQPS: 200000, baseLatencyMs: 0.8, costPerMonth: 160, redundancy: 2 },
      { id: 'db', type: 'database', name: 'DynamoDB Document Store', technology: 'Amazon DynamoDB Global Tables', x: 920, y: 240, capacityQPS: 40000, baseLatencyMs: 6, costPerMonth: 220, redundancy: 3 }
    ],
    connections: [
      { id: 'c1', from: 'client', to: 'cdn' },
      { id: 'c2', from: 'cdn', to: 'alb', trafficRatio: 0.15 }, // 85% redirect hits at CDN
      { id: 'c3', from: 'alb', to: 'service' },
      { id: 'c4', from: 'service', to: 'cache' },
      { id: 'c5', from: 'service', to: 'db' }
    ]
  }
];
