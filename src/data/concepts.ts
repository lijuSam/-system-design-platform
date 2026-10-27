import { Concept } from '@/types';

export const CONCEPTS: Concept[] = [
  {
    id: 'consistent-hashing',
    slug: 'consistent-hashing',
    title: 'Consistent Hashing & Virtual Nodes',
    tagline: 'Scale distributed caches and storage rings without cascading cache invalidation.',
    category: 'Distributed Caching',
    difficulty: 'Intermediate',
    readTime: '12 min read',
    iconName: 'CircleDot',
    summary: 'Consistent hashing is a distributed hashing technique where hash ring keys are mapped to node positions. When a node is added or removed, only K/N keys are remapped rather than the entire cluster.',
    keyPoints: [
      'Standard modulo hashing (hash(key) % N) causes ~100% cache misses when N changes.',
      'A circular hash ring (0 to 2^32 - 1) maps both server tokens and data keys onto the same space.',
      'Keys are assigned to the first server whose position is greater than or equal to the key token clockwise.',
      'Virtual nodes (v-nodes) prevent hotspotting and non-uniform data distribution by assigning multiple virtual tokens to each physical machine.',
      'Widely used in Amazon Dynamo, Apache Cassandra, Discord gateway routing, and Akamai CDNs.'
    ],
    tradeoffs: {
      pros: [
        'Minimal key redistribution: Only O(K/N) items move on node failure or expansion.',
        'Virtual nodes enable heterogeneous hardware support via proportional v-node weights.',
        'High horizontal elasticity with near zero downtime.'
      ],
      cons: [
        'Non-uniform distribution without high v-node count (requires 100-250 v-nodes per node).',
        'Cascading rebalances during multiple simultaneous node churns.',
        'Client-side or proxy routing ring metadata synchronization overhead.'
      ]
    },
    deepDiveMarkdown: `
### The Problem with Simple Modulo Hashing
In a naive distributed cache cluster of $N$ nodes, an incoming key is assigned using:
\`\`\`
serverIndex = hash(key) % N
\`\`\`
When one node crashes ($N \\rightarrow N-1$) or a new node is added ($N \\rightarrow N+1$), almost every single existing key maps to a completely different server index. This triggers a **cache stampede**, overwhelming backend databases and causing cascading outages.

### The Consistent Hash Ring Mechanics
Consistent hashing maps both servers and keys to a 32-bit or 64-bit integer space $[0, 2^{32}-1]$ arranged as a continuous ring:
1. **Server Placement:** Each server node is hashed (e.g., using Murmur3 or MD5 on its IP/hostname) to find its token position on the ring.
2. **Key Assignment:** To look up or insert a key, compute \`hash(key)\` and walk clockwise along the ring until encountering the first server token.
3. **Handling Server Additions:** When server $S_{new}$ is placed between $S_1$ and $S_2$, it only takes ownership of keys lying between $S_1$ and $S_{new}$. All other keys remain undisturbed!

### Why Virtual Nodes (V-Nodes) are Mandatory in Production
In a raw ring with only 3-5 physical servers, servers will naturally be unevenly spaced. One server might own 60% of the ring circumference (a hot spot), while another owns only 5%.

By assigning **100 to 256 virtual nodes** per physical machine (e.g. \`node1#vn1\`, \`node1#vn2\`, ...), tokens are distributed uniformly across the entire ring. Furthermore, if a server has 64GB RAM and another has 256GB RAM, the larger server can be assigned 4x more virtual nodes.
    `,
    relatedCaseStudies: ['netflix-streaming', 'distributed-cache', 'uber-geospatial']
  },
  {
    id: 'database-sharding',
    slug: 'database-sharding',
    title: 'Database Sharding & Partitioning Strategies',
    tagline: 'Horizontal partitioning patterns, cross-shard joins, and zero-downtime rebalancing.',
    category: 'Storage & Databases',
    difficulty: 'Staff+',
    readTime: '15 min read',
    iconName: 'Database',
    summary: 'Sharding breaks a monolithic database into multiple independent database instances (shards). Choosing the right partition key is the single most critical decision in distributed storage.',
    keyPoints: [
      'Vertical partitioning separates tables or columns by domain, while horizontal sharding partitions rows across multiple databases.',
      'Sharding strategies include Hash-Based, Range-Based, Directory-Based, and Geographical/Tenant-Based.',
      'Cross-shard joins are extremely expensive; data that is queried together should share the shard key (co-location).',
      'Two-Phase Commit (2PC) or Sagas are needed for multi-shard transactions.',
      'Used by Slack, Uber, Instagram, and Discord to scale beyond single-node IOPS and storage ceilings.'
    ],
    tradeoffs: {
      pros: [
        'Infinite horizontal write scalability: Write IOPS scales linearly with added shards.',
        'Smaller index sizes fit into server RAM, drastically speeding up queries.',
        'Failure containment: Outage of one shard affects only 1/Nth of the user base.'
      ],
      cons: [
        'Complex application logic or routing proxy layer (e.g. Vitess, Citus, ProxySQL).',
        'Cross-shard joins, aggregations, and transactions become slow or unsupported.',
        'Re-sharding running production clusters without downtime requires complex dual-writing.'
      ]
    },
    deepDiveMarkdown: `
### Evaluating Sharding Strategies
1. **Hash-Based Sharding:**
   - \`shardId = hash(shardKey) % numShards\`
   - **Pros:** Uniform write and data distribution, prevents hot spots.
   - **Cons:** Range queries require querying every single shard in parallel (scatter-gather). Adding shards requires consistent hashing or full re-sharding.

2. **Range-Based Sharding:**
   - Keys split by range (e.g., User IDs 1-1,000,000 on Shard A, 1,000,001-2,000,000 on Shard B, or by Date).
   - **Pros:** Range queries are localized to a single shard.
   - **Cons:** Severe hot spot vulnerabilities! For auto-incrementing IDs or timestamps, 100% of current writes hit the latest shard.

3. **Directory / Lookup Service:**
   - A centralized mapping table tracks \`key -> shardId\`.
   - **Pros:** Extremely flexible; individual accounts or heavy enterprise tenants can be shifted between shards seamlessly.
   - **Cons:** Lookup service becomes a potential bottleneck and SPOF without distributed caching.
    `,
    relatedCaseStudies: ['stripe-payments', 'tinyurl-shortener', 'whatsapp-messaging']
  },
  {
    id: 'cache-strategies',
    slug: 'cache-strategies',
    title: 'Caching Strategies & Invalidation Patterns',
    tagline: 'Cache-Aside, Read-Through, Write-Through, Write-Back, and stampede prevention.',
    category: 'Distributed Caching',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    iconName: 'Zap',
    summary: 'Caches bridge the microsecond gap between memory and disk. Understanding Cache-Aside vs Write-Through vs Write-Back determines latency, consistency, and fault tolerance.',
    keyPoints: [
      'Cache-Aside (Lazy Loading): Application explicitly queries cache; on miss, queries DB and populates cache.',
      'Write-Through: Application writes to cache; cache synchronously writes to DB before acknowledging.',
      'Write-Back (Write-Behind): Application writes to cache; cache acknowledges immediately and flushes asynchronously to DB in batches.',
      'Write-Around: Data is written directly to DB, bypassing cache until first read.',
      'Stampede prevention: Probabilistic early expiration (XFetch), Mutex locking on cache miss, or background worker refresh.'
    ],
    tradeoffs: {
      pros: [
        'Sub-millisecond read latency for hot data.',
        'Shields primary databases from read overload during traffic spikes.',
        'Reduces infrastructure costs by orders of magnitude compared to scaling DB instances.'
      ],
      cons: [
        'Cache invalidation complexity (Two hardest problems in CS).',
        'Stale read risks when out-of-band updates happen.',
        'Cold start vulnerabilities when deploying fresh clusters.'
      ]
    },
    deepDiveMarkdown: `
### Cache Pattern Matrix

| Strategy | Read Latency | Write Latency | Consistency | Data Loss Risk |
|---|---|---|---|---|
| **Cache-Aside** | Low (on hit) / High (on miss) | Fast (writes to DB) | Eventual (TTL) | None |
| **Read/Write-Through** | Low | Slower (double write) | High | None |
| **Write-Back** | Ultra-Low | Ultra-Fast | Eventual | High (if cache node crashes before flush) |
| **Write-Around** | High initially | Fast | High | None |

### Defeating the Thundering Herd / Cache Stampede
When a cache key for a trending topic or homepage banner expires, thousands of concurrent requests miss simultaneously and flood the database.

**Production Solutions:**
1. **Distributed Mutex (Redis \`SETNX\`):** Only the first worker acquiring the lock is permitted to query the DB and update the cache; all other callers wait or retry with jitter.
2. **Probabilistic Early Refresh (XFetch Algorithm):**
   \`\`\`ts
   const shouldRefresh = -delta * Math.log(Math.random()) > (expiry - now);
   \`\`\`
   Background threads proactively recompute the key *before* it expires based on read frequency and computation time!
    `,
    relatedCaseStudies: ['netflix-streaming', 'distributed-cache', 'tinyurl-shortener']
  },
  {
    id: 'cap-theorem-pacelc',
    slug: 'cap-theorem-pacelc',
    title: 'CAP Theorem & The PACELC Framework',
    tagline: 'Why trade-offs between consistency, availability, and latency govern all distributed systems.',
    category: 'Fundamentals',
    difficulty: 'Intermediate',
    readTime: '11 min read',
    iconName: 'Scale',
    summary: 'The CAP theorem states that in the event of a network partition, a distributed system must choose between Consistency and Availability. PACELC expands this to normal operating conditions.',
    keyPoints: [
      'In any real distributed network, Partition Tolerance (P) is mandatory because network cables, switches, and VMs fail.',
      'CP Systems (MongoDB, CockroachDB, Raft/Paxos): Reject requests or wait during partition to guarantee linearizability.',
      'AP Systems (Cassandra, DynamoDB, CouchDB): Return available local data during partition at the expense of temporary divergence.',
      'PACELC Theorem: If there is a Partition (P), choose Availability (A) or Consistency (C); Else (E), trade off Latency (L) or Consistency (C).',
      'Tunable consistency (e.g. Cassandra QUORUM $R + W > N$) lets architects dynamically adjust CAP parameters per query.'
    ],
    tradeoffs: {
      pros: [
        'Provides an objective mental model for architectural decision making.',
        'Prevents fatal illusions about "zero latency with strong consistency across global regions".',
        'Guides storage engine selection based on business requirements.'
      ],
      cons: [
        'CAP treats consistency and availability as binary, whereas real systems exist on a continuum (e.g., Read Committed vs Snapshot Isolation vs Strict Serializability).'
      ]
    },
    deepDiveMarkdown: `
### What Most Engineers Misunderstand About CAP
Many assume you can choose "CA" (Consistency + Availability without Partition Tolerance). **In the real world, CA does not exist in distributed computing!** 

Networks drop packets, routers reboot, and cloud availability zones experience fiber cuts. A partition **will** happen. Therefore, when a partition occurs, you only have two choices:
1. **Choose CP:** Refuse to serve writes on isolated nodes to prevent split-brain. (Banking, stock exchanges, inventory reservation).
2. **Choose AP:** Allow nodes to accept writes independently. Reconcile differences later using Last-Write-Wins (LWW) or Conflict-Free Replicated Data Types (CRDTs). (Social feeds, shopping carts, metrics collection).

### The PACELC Expansion
While CAP only describes behavior during rare partition events, **PACELC** models what happens during the 99.9% of the time when everything is normal:
- **P / A vs C:** If Partitioned $\\rightarrow$ Trade Availability vs Consistency.
- **E / L vs C:** Else (Normal operation) $\\rightarrow$ Trade Latency vs Consistency.

*Example:* Even with zero partitions, synchronous multi-datacenter replication requires cross-region network round-trips (adds 80ms latency) to achieve strong consistency.
    `,
    relatedCaseStudies: ['stripe-payments', 'distributed-cache', 'whatsapp-messaging']
  },
  {
    id: 'rate-limiting-algorithms',
    slug: 'rate-limiting-algorithms',
    title: 'High-Throughput Rate Limiting Algorithms',
    tagline: 'Token Bucket, Leaky Bucket, Sliding Window Log, and Sliding Window Counter.',
    category: 'Security & Rate Limiting',
    difficulty: 'Intermediate',
    readTime: '14 min read',
    iconName: 'ShieldAlert',
    summary: 'Rate limiters protect API gateways and internal services from denial-of-service attacks, scraping, and downstream resource exhaustion while ensuring fair usage across tenants.',
    keyPoints: [
      'Token Bucket: Tokens added at constant rate up to capacity; requests consume tokens. Supports bursts.',
      'Leaky Bucket: Requests enter FIFO queue and are processed at constant outflow rate. Smooths out traffic spikes.',
      'Fixed Window Counter: Divides timeline into fixed windows. Vulnerable to 2x burst traffic at window boundaries.',
      'Sliding Window Counter: Memory-efficient hybrid weighting current and previous window counts using Redis Lua scripts.',
      'Distributed rate limiting requires atomic incrementing (Redis Lua scripts or Redis cell plugin) to avoid race conditions.'
    ],
    tradeoffs: {
      pros: [
        'Shields critical microservices from cascading overload.',
        'Prevents noisy neighbor tenant starvation in multi-tenant SaaS.',
        'Mitigates brute-force credential stuffing and bot scraping.'
      ],
      cons: [
        'Introduces 1-3ms latency overhead at the API gateway layer.',
        'Distributed state synchronization can fail open or fail closed during cache partitions.'
      ]
    },
    deepDiveMarkdown: `
### Algorithm Comparison Matrix

| Algorithm | Burst Capacity | Memory Footprint | Edge Boundary Bursts? | Implementation Complexity |
|---|---|---|---|---|
| **Token Bucket** | Excellent | Minimal (2 numbers: tokens, lastTimestamp) | No | Low |
| **Leaky Bucket** | Minimal (Smoothed) | Queue dependent | No | Medium |
| **Fixed Window** | High | Ultra-low (1 counter) | **Yes (2x spike risk)** | Low |
| **Sliding Window Log** | Perfect accuracy | High (Stores timestamp per request) | No | High |
| **Sliding Window Counter** | High | Low (2 counters per key) | No | Medium |

### Production Redis Sliding Window Counter Script
\`\`\`lua
-- Key format: rate:user_123:current_minute
local current_time = redis.call('TIME')[1]
local window = 60
local limit = 100

local current_window = math.floor(current_time / window)
local prev_window = current_window - 1

local prev_count = tonumber(redis.call('GET', KEYS[1] .. ':' .. prev_window) or '0')
local curr_count = tonumber(redis.call('GET', KEYS[1] .. ':' .. current_window) or '0')

local time_in_current = current_time % window
local weight = (window - time_in_current) / window
local estimated_requests = (prev_count * weight) + curr_count

if estimated_requests < limit then
    redis.call('INCR', KEYS[1] .. ':' .. current_window)
    redis.call('EXPIRE', KEYS[1] .. ':' .. current_window, window * 2)
    return 1 -- Allowed
else
    return 0 -- Rejected (HTTP 429 Too Many Requests)
end
\`\`\`
    `,
    relatedCaseStudies: ['tinyurl-shortener', 'stripe-payments', 'uber-geospatial']
  },
  {
    id: 'message-queues-streaming',
    slug: 'message-queues-streaming',
    title: 'Event-Driven Architectures: Kafka vs RabbitMQ',
    tagline: 'Log-based streaming vs Smart Broker message queues, backpressure, and exactly-once semantics.',
    category: 'Messaging & Queues',
    difficulty: 'Staff+',
    readTime: '16 min read',
    iconName: 'Radio',
    summary: 'Message brokers decouple producer and consumer execution lifecycles, enabling asynchronous processing, buffering peak traffic spikes, and real-time distributed stream processing.',
    keyPoints: [
      'RabbitMQ: Smart broker / Dumb consumer. Messages routed via exchanges into queues, deleted upon acknowledgement.',
      'Apache Kafka: Dumb broker / Smart consumer. Append-only partitioned commit log with durable storage; consumers track their own offsets.',
      'Kafka provides strict ordering per partition, but no ordering across different partitions.',
      'Delivery guarantees: At-most-once, At-least-once (idempotent consumers required), Exactly-once (Kafka transactional producer & consumer API).',
      'Backpressure prevents fast producers from blowing up slow downstream consumer memory pools.'
    ],
    tradeoffs: {
      pros: [
        'Complete temporal decoupling between upstream microservices and downstream workers.',
        'Peak load levelling: Spikes of 100k QPS are safely buffered and drained at consumer capacity.',
        'Replayability: Kafka allows replaying historical data streams for ML training or disaster recovery.'
      ],
      cons: [
        'Asynchronous flow makes tracing and debugging harder (requires distributed tracing with OpenTelemetry).',
        'Duplicate message delivery handling requires end-to-end idempotency tokens.'
      ]
    },
    deepDiveMarkdown: `
### RabbitMQ vs Apache Kafka Architectural Showdown

\`\`\`
[RabbitMQ]:
Producer --> Exchange [Direct/Topic/Fanout] --> [Queue 1] --> Consumer A (deletes msg)
                                            --> [Queue 2] --> Consumer B (deletes msg)

[Kafka]:
Producer --> Partitioned Topic [Log: 0, 1, 2, 3, 4, 5, 6...]
                                 ^ Consumer Group 1 (Offset: 4)
                                 ^ Consumer Group 2 (Offset: 6)
\`\`\`

- **Use RabbitMQ when:** You need complex routing (wildcard topics, RPC pattern, per-message priority, dead-letter exchanges) and smaller data volumes that don't need persistent replay.
- **Use Kafka when:** You process millions of events per second, require multi-tenant replayability, need log compaction, or are running event sourcing and real-time streaming analytics (Flink, Spark).
    `,
    relatedCaseStudies: ['netflix-streaming', 'uber-geospatial', 'whatsapp-messaging']
  }
];
