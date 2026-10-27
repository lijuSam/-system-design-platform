import { CaseStudy } from '@/types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'netflix-streaming',
    slug: 'netflix-streaming',
    title: 'Designing Netflix: Global Video On-Demand & Dynamic Streaming',
    company: 'Netflix',
    tagline: 'Delivering 250M+ concurrent video streams at 15% of global internet downstream bandwidth.',
    difficulty: 'Staff+',
    stats: [
      { label: 'Subscribers', value: '260 Million+' },
      { label: 'Peak Video Traffic', value: '100+ Tbps' },
      { label: 'Global Open Connect CDNs', value: '18,000+ Edge Appliances' },
      { label: 'Microservices Fleet', value: '1,000+ Independent Services' }
    ],
    capacityEstimation: [
      {
        metric: 'Concurrent Active Streamers (Peak)',
        calculation: '260M subscribers * 15% peak concurrency',
        result: '39,000,000 simultaneous streams'
      },
      {
        metric: 'Average Bandwidth per Stream',
        calculation: 'Mix of 1080p (3 Mbps) and 4K HDR (15 Mbps) ~ 5 Mbps avg',
        result: '5 Mbps per stream'
      },
      {
        metric: 'Total Network Throughput',
        calculation: '39,000,000 streams * 5 Mbps',
        result: '195 Terabits / second (Tbps)'
      },
      {
        metric: 'Metadata / Playback Control QPS',
        calculation: '39M users heartbeating playhead position every 10s',
        result: '~3,900,000 QPS to AWS Control Plane'
      }
    ],
    architectureFlow: [
      {
        step: 1,
        title: 'User Authentication & Catalog Discovery',
        description: 'User app connects via Route53 GeoDNS to Zuul API Gateway in nearest AWS Region. Spring Cloud Eureka handles dynamic service discovery.',
        component: 'Zuul API Gateway / Envoy'
      },
      {
        step: 2,
        title: 'Personalized Recommendation Engine',
        description: 'Personalization microservices evaluate user watch history, genre embeddings, and real-time collaborative filtering using Cassandra & EVCache.',
        component: 'ML Inference Microservices'
      },
      {
        step: 3,
        title: 'Playback License & Manifest Negotiation',
        description: 'DRM licensing service verifies active subscription and returns an adaptive bitrate (HLS / DASH) manifest containing cryptographic chunk URLs.',
        component: 'PlayAPI / DRM Service'
      },
      {
        step: 4,
        title: 'Video Streaming from Edge Appliance',
        description: 'Client connects directly to the nearest ISP-embedded Open Connect Appliance (OCA) box inside their regional internet service provider.',
        component: 'Open Connect CDN (OCA)'
      }
    ],
    components: [
      {
        name: 'Open Connect Appliances (OCA)',
        role: 'Custom FreeBSD hardware appliances installed directly inside global ISP data centers, caching 95% of video chunks locally.',
        technologies: ['FreeBSD', 'NGINX optimized', 'BGP Anycast Routing'],
        deepDive: 'By placing custom 100Gbps storage appliances directly inside local ISP exchange points, Netflix video traffic never traverses public internet backbones during playback, eliminating transit latency and ISP peering charges.'
      },
      {
        name: 'Zuul / Mantis Gateway Layer',
        role: 'Dynamic routing, rate limiting, cryptographic authentication, and resilient circuit breaking for 1,000+ internal microservices.',
        technologies: ['Zuul 2 (Netty Async)', 'Spring Boot', 'Envoy'],
        deepDive: 'Zuul handles edge routing with non-blocking I/O, routing incoming requests based on user experiment bucket IDs and regional health metrics.'
      },
      {
        name: 'EVCache & Apache Cassandra',
        role: 'Sub-millisecond global metadata storage for user viewing history, bookmark playheads, and device state.',
        technologies: ['Apache Cassandra', 'Memcached / EVCache', 'Kafka'],
        deepDive: 'Cassandra provides active-active multi-region replication. Even if an entire AWS region experiences a total blackout, DNS traffic is shifted to another region in under 90 seconds without dropping video streams.'
      }
    ],
    failureModes: [
      {
        scenario: 'AWS Region Outage (e.g. us-east-1 fiber cut)',
        impact: 'Control plane and catalog APIs in that region become unreachable.',
        mitigation: 'Automated Chaos Kong drills run quarterly: Route53 shifts 100% of traffic to us-west-2 and eu-west-1. Active streams on OCAs continue playing uninterrupted for up to 30 minutes.'
      },
      {
        scenario: 'ISP Open Connect Box Hardware Failure',
        impact: 'Local cache misses for video chunks.',
        mitigation: 'Adaptive Bitrate client player automatically fails over to secondary IXP edge boxes or regional Amazon CloudFront / Fastly backup CDNs.'
      }
    ],
    keyTakeaways: [
      'Separate control plane (AWS cloud) from data plane (ISP-embedded Open Connect appliances).',
      'Never allow video payload bytes to flow through your microservices application servers.',
      'Employ active-active multi-region replication with automatic regional evacuations tested continuously with Chaos Engineering.'
    ]
  },
  {
    id: 'uber-geospatial',
    slug: 'uber-geospatial',
    title: 'Designing Uber: Real-Time Geospatial Dispatch & Marketplace',
    company: 'Uber',
    tagline: 'Matching millions of dynamic riders and drivers in real time with sub-100ms geospatial indexing.',
    difficulty: 'Staff+',
    stats: [
      { label: 'Daily Completed Trips', value: '28+ Million' },
      { label: 'Active Drivers Online', value: '5+ Million' },
      { label: 'Location Updates / Sec', value: '1,000,000+ GPS Pings' },
      { label: 'Peak Matching Latency', value: '< 80 ms' }
    ],
    capacityEstimation: [
      {
        metric: 'Driver GPS Ingestion Rate',
        calculation: '5M active drivers emitting GPS ping every 4 seconds',
        result: '1,250,000 write QPS to location buffer'
      },
      {
        metric: 'Payload Size per GPS Ping',
        calculation: 'driverId (16B), lat (8B), lng (8B), heading (4B), timestamp (8B) ~ 64 bytes raw',
        result: '80 MB/sec ingestion bandwidth'
      },
      {
        metric: 'Rider Search Query QPS',
        calculation: '20M active app opens polling nearby cars every 5 seconds',
        result: '4,000,000 geospatial read queries / sec'
      }
    ],
    architectureFlow: [
      {
        step: 1,
        title: 'Driver GPS Location Telemetry',
        description: 'Driver mobile app transmits encrypted location pings over persistent gRPC / Netty connections to Location Gateway.',
        component: 'Location Ingestion Gateway'
      },
      {
        step: 2,
        title: 'H3 Hexagonal Spatial Indexing',
        description: 'Coordinates are converted to 64-bit Uber H3 Hexagonal Cell IDs (Resolution 8: ~460m hexagon radius) and stored in in-memory Ringpop clusters.',
        component: 'H3 Geospatial Service'
      },
      {
        step: 3,
        title: 'Dynamic Surge Pricing Evaluation',
        description: 'Streaming Apache Flink jobs aggregate demand-to-supply ratios across adjacent H3 hexagonal neighbors to calculate surge multipliers.',
        component: 'Marketplace Dynamic Pricing'
      },
      {
        step: 4,
        title: 'Dispatch & Supply Matching',
        description: 'Rider ride request triggers k-ring neighbor search to locate top candidate drivers within a 3km hexagonal radius with lowest ETA.',
        component: 'DISPATCH Matching Engine'
      }
    ],
    components: [
      {
        name: 'H3 Spatial Indexing System',
        role: 'Hierarchical hexagonal spatial coordinate grid system open-sourced by Uber.',
        technologies: ['Uber H3 (C / Go)', '64-bit Hex Tokens', 'In-memory Index'],
        deepDive: 'Unlike geohashes or square tiles where diagonal neighbors have varying distances (√2), every hexagon in H3 has 6 identical equidistant neighbors. This drastically simplifies k-ring neighbor lookups for nearby vehicle matching.'
      },
      {
        name: 'Ringpop Distributed Hash Ring',
        role: 'Consistent-hashing based cooperative clustering protocol running across dispatch nodes.',
        technologies: ['Ringpop', 'SWIM Gossip Protocol', 'Node.js / Go'],
        deepDive: 'Ringpop coordinates shard ownership of driver IDs directly in process memory, eliminating external database round trips for instantaneous GPS updates.'
      },
      {
        name: 'Docstore / Schemaless Datastore',
        role: 'Distributed immutable append-only trip ledger built on top of MySQL shards.',
        technologies: ['MySQL Shards', 'Docstore', 'Kafka Pipeline'],
        deepDive: 'Trip states (requested, accepted, arrived, in_transit, completed) are appended as immutable events, ensuring 100% auditability and zero lost trip records.'
      }
    ],
    failureModes: [
      {
        scenario: 'Sudden Demand Surge (e.g. New Year Eve or concert end)',
        impact: 'Millions of riders open app simultaneously in 1 square kilometer.',
        mitigation: 'Dynamic surge pricing dampens demand while attracting drivers; client app polling frequency throttles automatically from 3s to 12s via adaptive server config.'
      },
      {
        scenario: 'Driver Gateway Disconnection / Tunnel Flapping',
        impact: 'Driver appears stale or offline.',
        mitigation: 'Dead reckoning extrapolation estimates vehicle position along road network graphs for up to 15 seconds until next GPS ping succeeds.'
      }
    ],
    keyTakeaways: [
      'Hexagonal spatial partitioning (H3) outperforms rectangular grids for neighbor distance calculations.',
      'In-memory consistent-hash clusters (Ringpop) allow 1M+ GPS updates/sec without drowning persistence databases.',
      'Use append-only immutable event streams for financial and state-machine transitions.'
    ]
  },
  {
    id: 'whatsapp-messaging',
    slug: 'whatsapp-messaging',
    title: 'Designing WhatsApp: Billion-Scale Real-Time Messaging',
    company: 'WhatsApp',
    tagline: 'Supporting 2+ Billion users and 100 Billion messages/day with sub-second delivery.',
    difficulty: 'Intermediate',
    stats: [
      { label: 'Active Users', value: '2.5 Billion' },
      { label: 'Messages / Day', value: '100+ Billion' },
      { label: 'Concurrent Connected Sockets', value: '100+ Million' },
      { label: 'Engineering Team Size', value: '~50 Engineers (Historic)' }
    ],
    capacityEstimation: [
      {
        metric: 'Average Message Throughput',
        calculation: '100B messages / 86,400 seconds',
        result: '1,157,400 messages / second'
      },
      {
        metric: 'Peak Message Throughput (3x avg)',
        calculation: '1.15M * 3',
        result: '~3,500,000 messages / second'
      },
      {
        metric: 'Persistent Socket Memory Footprint',
        calculation: '100M sockets * 2.5 KB per lightweight Erlang process',
        result: '250 GB RAM across cluster (ultra lightweight)'
      }
    ],
    architectureFlow: [
      {
        step: 1,
        title: 'Client Connection & Mutual TLS Handshake',
        description: 'WhatsApp client establishes a long-lived encrypted TCP connection using a customized XMPP/Noise protocol to Chat Connection Gateway.',
        component: 'Erlang BEAM Gateway'
      },
      {
        step: 2,
        title: 'Recipient Session Lookup',
        description: 'Sender sends message packet. Gateway looks up recipient active connection ID in a high-speed distributed distributed in-memory directory.',
        component: 'Session Registry (Mnesia / Redis)'
      },
      {
        step: 3,
        title: 'Instant Push or Offline Spool Queue',
        description: 'If recipient is online: forwarded immediately over open TCP socket. If offline: spooled in temporary distributed storage queue until online.',
        component: 'Delivery Pipeline'
      },
      {
        step: 4,
        title: 'Delivery Receipt & Immediate Message Deletion',
        description: 'Once double-tick (delivered) receipt is received from recipient device, server permanently deletes the message payload.',
        component: 'Storage Pruning Service'
      }
    ],
    components: [
      {
        name: 'Erlang / Elixir BEAM VM',
        role: 'Massively concurrent actor model runtime handling millions of simultaneous green threads per host.',
        technologies: ['Erlang OTP', 'FreeBSD Kernel Tuning', 'Noise Protocol'],
        deepDive: 'Erlang processes take only ~2.5KB RAM, allowing a single commodity server to maintain over 2 million concurrent open connections without thread context-switching overhead.'
      },
      {
        name: 'End-to-End Encryption (Signal Protocol)',
        role: 'Guarantees that message content, images, and audio can only be decrypted by sender and recipient devices.',
        technologies: ['Double Ratchet Algorithm', 'Pre-keys', 'Curve25519'],
        deepDive: 'Because the server acts solely as an encrypted blind relay pipe, servers never need to store or index message plaintext, dramatically reducing storage requirements and legal liability.'
      }
    ],
    failureModes: [
      {
        scenario: 'Global Gateway Disconnection (BGP Routing Flap)',
        impact: 'Millions of phones attempt simultaneous reconnect.',
        mitigation: 'Exponential backoff with randomized jitter algorithm ensures phones do not DDoS the Erlang gateways upon recovery.'
      }
    ],
    keyTakeaways: [
      'Store-and-delete architecture drastically reduces permanent database storage costs.',
      'The Actor Model (Erlang/Elixir) is ideally suited for stateful, persistent WebSocket connections.',
      'Client-side state (Double Ratchet E2EE) shifts computation to the edge and protects user privacy.'
    ]
  },
  {
    id: 'tinyurl-shortener',
    slug: 'tinyurl-shortener',
    title: 'Designing TinyURL: Distributed URL Shortener & Analytics',
    company: 'TinyURL / Bitly',
    tagline: 'Generating unique 7-character URLs handling 100:1 read-to-write ratios at 100k QPS.',
    difficulty: 'Beginner',
    stats: [
      { label: 'New URLs / Month', value: '500 Million' },
      { label: 'Read:Write Ratio', value: '100 : 1' },
      { label: 'Read QPS', value: '200,000 QPS' },
      { label: 'Total Storage (5 Years)', value: '~15 Terabytes' }
    ],
    capacityEstimation: [
      {
        metric: 'Write QPS',
        calculation: '500M URLs / (30 days * 86,400s)',
        result: '~200 write QPS'
      },
      {
        metric: 'Read QPS (100:1 ratio)',
        calculation: '200 writes * 100',
        result: '20,000 QPS (Peak 50,000 QPS)'
      },
      {
        metric: 'Key Length Combinations',
        calculation: 'Base62 (a-z, A-Z, 0-9) with length 7: 62^7',
        result: '3.52 Trillion unique short URLs'
      }
    ],
    architectureFlow: [
      {
        step: 1,
        title: 'URL Creation Request',
        description: 'Client POSTs long URL to API Gateway. Rate limiter verifies quota.',
        component: 'API Gateway & Rate Limiter'
      },
      {
        step: 2,
        title: 'Key Generation Service (KGS)',
        description: 'KGS pre-generates unique 7-character Base62 keys in batches to avoid runtime collision checks.',
        component: 'Key Generation Service (KGS)'
      },
      {
        step: 3,
        title: 'Database Persistence & Cache Population',
        description: 'Mapping (shortKey -> longUrl, userId, createdAt, expiresAt) saved to NoSQL document store and written to Redis cache.',
        component: 'Redis Cluster & DynamoDB'
      },
      {
        step: 4,
        title: 'URL Redirection (HTTP 301 vs 302)',
        description: 'Read requests hit Cloudflare CDN / Redis. If cached, immediately returns HTTP 302 Temporary Redirect to capture click analytics.',
        component: 'Edge Redirect Worker'
      }
    ],
    components: [
      {
        name: 'Key Generation Service (KGS)',
        role: 'Pre-computes random Base62 tokens and stores them in two tables: unused_keys and used_keys.',
        technologies: ['Apache Zookeeper', 'In-memory Key Ring', 'MySQL'],
        deepDive: 'Runtime hashing (e.g. MD5 of long URL) suffers from collision resolution issues. By pre-generating keys in KGS with distributed locks via Zookeeper, write requests run in constant O(1) time without collisions.'
      },
      {
        name: '301 Permanent vs 302 Found Redirects',
        role: 'Architectural trade-off between server load and click tracking telemetry.',
        technologies: ['HTTP Protocol', 'Edge Workers'],
        deepDive: 'HTTP 301 is cached permanently in user browser, reducing server redirect requests to 0 after the first visit, but eliminates analytics tracking! HTTP 302 ensures every click passes through the server for accurate geolocation and referer tracking.'
      }
    ],
    failureModes: [
      {
        scenario: 'Celebrity Viral Link Cache Miss Stampede',
        impact: 'Millions of users click a newly tweeted short URL at once.',
        mitigation: 'Redis Cluster with Master-Replica replication and CDN edge caching with 60s TTL for hot keys absorbs 99.9% of redirect traffic.'
      }
    ],
    keyTakeaways: [
      'Pre-generating keys eliminates the need for expensive collision resolution during user writes.',
      'Use 302 redirects when analytics are critical; use 301 redirects when minimizing server infrastructure costs.',
      'High read-to-write ratio (100:1) makes aggressive distributed caching (Redis / CDN) mandatory.'
    ]
  },
  {
    id: 'stripe-payments',
    slug: 'stripe-payments',
    title: 'Designing Stripe: Distributed Idempotency & Financial Ledgers',
    company: 'Stripe',
    tagline: 'Processing hundreds of billions in financial volume with zero double-charges and strict ACID guarantees.',
    difficulty: 'Staff+',
    stats: [
      { label: 'Payment Volume', value: '$1+ Trillion / yr' },
      { label: 'Availability SLA', value: '99.999%' },
      { label: 'Double Charge Tolerance', value: 'Zero (Strict)' },
      { label: 'Supported Currencies', value: '135+ Currencies' }
    ],
    capacityEstimation: [
      {
        metric: 'Transaction Processing QPS',
        calculation: 'High-volume peak events (Black Friday / Cyber Monday)',
        result: '25,000+ financial transactions / sec'
      },
      {
        metric: 'Multi-Region Replication Latency',
        calculation: 'Synchronous Raft replication across 3 cloud regions',
        result: '< 45 ms latency budget'
      }
    ],
    architectureFlow: [
      {
        step: 1,
        title: 'Payment Request with Idempotency Key',
        description: 'Client sends payment payload with unique UUID header `Idempotency-Key: e82f...`.',
        component: 'Idempotency Layer'
      },
      {
        step: 2,
        title: 'Atomic Lock Acquisition in Distributed Cache',
        description: 'API gateway attempts to atomically acquire a lock for the idempotency key in Redis using `SET key token NX PX 120000`.',
        component: 'Distributed Lock Manager'
      },
      {
        step: 3,
        title: 'Double-Entry Ledger Accounting',
        description: 'Financial ledger records matching debits and credits in immutable distributed SQL ledger before invoking card acquiring bank.',
        component: 'Double-Entry Ledger Service'
      },
      {
        step: 4,
        title: 'Acquiring Bank Gateway & Response Caching',
        description: 'Payment network confirms capture. Resulting charge object is stored against the idempotency key for 24 hours to return on any retry.',
        component: 'Card Network Connector'
      }
    ],
    components: [
      {
        name: 'Idempotency Framework',
        role: 'Guarantees that re-transmitting the exact same request never results in multiple card charges.',
        technologies: ['Redis Distributed Lock', 'PostgreSQL / CockroachDB', 'SHA-256 Payload Hash'],
        deepDive: 'The idempotency key is paired with a SHA-256 hash of the request body. If a second request arrives with the same key but different payload, it is rejected with HTTP 400 Bad Request to prevent spoofing.'
      },
      {
        name: 'Double-Entry Ledger Engine',
        role: 'Enforces fundamental accounting equation: Assets = Liabilities + Equity.',
        technologies: ['Strict Serializability', 'CockroachDB / Raft', 'Audit Trail'],
        deepDive: 'Money cannot simply appear or vanish. Every transaction consists of at least one debit and one credit that must sum to exactly zero, verified atomically within an ACID transaction.'
      }
    ],
    failureModes: [
      {
        scenario: 'Client Timeout During Bank Communication',
        impact: 'User receives HTTP 504 Gateway Timeout while bank actually charged card.',
        mitigation: 'Client SDK automatically retries with identical Idempotency-Key; server detects in-flight or completed transaction and returns cached receipt without charging again.'
      }
    ],
    keyTakeaways: [
      'Idempotency keys are mandatory for any mutating distributed financial API.',
      'Double-entry bookkeeping is the only defensible model for money movement.',
      'Hash the request body alongside the idempotency key to prevent accidental key re-use with different amounts.'
    ]
  }
];
