import { BlogPost, BlogComment } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'consistent-hashing-deep-dive',
    slug: 'consistent-hashing-deep-dive',
    title: 'Why Consistent Hashing is the Backbone of Distributed Caching: A Visual Deep Dive',
    tagline: 'How Discord, Amazon Dynamo, and CDNs prevent catastrophic cache stampedes when scaling out.',
    author: {
      name: 'Alexei Romanov',
      role: 'Principal Distributed Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    },
    publishedAt: 'October 15, 2026',
    readTime: '9 min read',
    category: 'Distributed Caching',
    tags: ['Consistent Hashing', 'Redis', 'Cassandra', 'System Design', 'Scalability'],
    likes: 1240,
    keyTakeaways: [
      'Modulo hashing fails at scale because changing node count invalidates nearly 100% of cached keys.',
      'Consistent hashing maps both servers and keys to a continuous circular integer ring.',
      'Virtual nodes (100–250 per physical node) solve the variance problem and enable weighted capacity distribution.'
    ],
    content: `
### The 3 A.M. Cache Stampede Nightmare

Imagine you run an e-commerce platform with 10 Memcached servers. To distribute cache keys, you use the standard textbook formula:

\`\`\`
serverIndex = hash(user_id) % 10
\`\`\`

At 3:00 AM, server #4 experiences a kernel panic and crashes. Your fleet size shrinks from 10 to 9. 

Now, almost every single user ID resolves to \`hash(user_id) % 9\`. Over **90% of your cached data is instantaneously unreachable**. 

Hundreds of thousands of concurrent requests miss the cache in the same millisecond and slam your primary PostgreSQL database. The database connection pool is immediately exhausted, CPU hits 100%, and your entire checkout flow goes down.

This catastrophic phenomenon is known as a **Cache Stampede (or Thundering Herd)**.

---

### The Genius of Consistent Hashing

Consistent Hashing, first introduced in a seminal 1997 paper by Karger et al. at MIT, solves this exact problem:

1. **The Hash Ring:** Picture a circle representing an integer spectrum from $0$ to $2^{32} - 1$.
2. **Server Placement:** Each server’s hostname or IP address is hashed to place it at a coordinate on the ring.
3. **Data Placement:** When a key is queried or written, \`hash(key)\` determines its coordinate on the ring. The system simply travels clockwise until it encounters the first server.

#### What Happens When a Server Dies?
When Server #4 crashes, only the keys that were previously assigned to Server #4 must be re-routed—to the next server clockwise on the ring! 

The other 9 servers keep their keys 100% intact. Instead of a 90% cache miss rate, your cache miss rate is restricted to merely $1/N$ (10%).

---

### The Real-World Catch: Non-Uniform Distribution

In theory, consistent hashing is elegant. In practice with only 5–10 servers, randomness is not your friend. 

By chance, Server A and Server B might end up right next to each other on the ring, while Server C owns half the entire circumference. Server C will overheat and die, shifting its load to Server D, causing a cascading collapse.

\`\`\`
Physical Server A (owns 8% ring)
Physical Server B (owns 12% ring)
Physical Server C (owns 65% ring) <-- HOTSPOT DANGER!
Physical Server D (owns 15% ring)
\`\`\`

#### The Solution: Virtual Nodes (V-Nodes)
Instead of placing each physical server once on the ring, we place it **150 to 250 times** under pseudo-names:
- \`ServerA#vn1\`, \`ServerA#vn2\`, ..., \`ServerA#vn200\`
- \`ServerB#vn1\`, \`ServerB#vn2\`, ..., \`ServerB#vn200\`

By interweaving hundreds of virtual tokens across the ring, key distribution achieves near-perfect mathematical uniformity (standard deviation drops to under 3%).

Furthermore, if Server B has 256GB of RAM while Server A has only 64GB, you can assign Server B 400 virtual nodes and Server A 100 virtual nodes. Heterogeneous hardware scaling becomes trivial!
    `
  },
  {
    id: 'database-sharding-zero-downtime',
    slug: 'database-sharding-zero-downtime',
    title: 'Database Sharding at Scale: Hash vs Range vs Directory with Zero Downtime Migration',
    tagline: 'How to split a terabyte-scale relational database into 64 shards without losing a single transaction.',
    author: {
      name: 'Elena Rostova',
      role: 'Staff Infrastructure Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    publishedAt: 'October 21, 2026',
    readTime: '12 min read',
    category: 'Storage & Databases',
    tags: ['PostgreSQL', 'Sharding', 'Zero Downtime', 'Vitess', 'Distributed DB'],
    likes: 980,
    keyTakeaways: [
      'Choose your shard key based on your primary query path (e.g. tenant_id or user_id) to avoid cross-shard joins.',
      'Directory-based sharding provides the greatest long-term operational flexibility for handling VIP enterprise tenants.',
      'Zero-downtime migration requires a 4-phase protocol: Dual-Write -> Backfill -> Shadow-Read Verification -> Cutover.'
    ],
    content: `
### When Single-Node Scaling Hits the Wall

Every high-growth startup eventually hits the "monolithic database ceiling." You upgraded your RDS instance to \`db.r6i.32xlarge\` (128 vCPUs, 1TB RAM, 64k IOPS). 

It costs $20,000/month, and yet at peak hours, WAL replication lags by 45 seconds, disk queue depth spikes, and write locks freeze your API.

Vertical scaling is finished. You must shard.

---

### Choosing Your Shard Strategy

#### 1. Range-Based Sharding
Data is partitioned by natural ranges (e.g., Dates: 2024, 2025, 2026; or Alphabetical: A-F, G-M, N-Z).
- **Pitfall:** Timestamp or auto-increment ID ranges create massive write hot spots. Today’s shard receives 100% of write traffic, while yesterday’s shard sits idle.

#### 2. Hash-Based Sharding
\`shardId = Murmur3(userId) % numShards\`
- **Pitfall:** Superb even distribution, but re-sharding (e.g., going from 16 to 32 shards) requires moving 50% of your entire database across the network.

#### 3. Directory-Based Sharding (The Enterprise Gold Standard)
A high-speed lookup service (backed by Redis with SQL persistence) maintains a mapping of \`tenantId -> shardId\`.
- **Advantage:** When a Fortune 500 customer signs up and accounts for 40% of all activity, you can assign them their own dedicated physical shard with zero impact on other tenants.

---

### The 4-Phase Zero-Downtime Sharding Migration Playbook

Never attempt a "maintenance window cutover" on a database larger than 100GB. Something will fail, rollbacks will take hours, and management will panic.

Use the battle-tested **Dual-Write Protocol**:

1. **Phase 1: Dual Writing**
   - Application writes to both Old DB and New Shards.
   - Reads continue hitting Old DB only.
   - Writes to New Shards are wrapped in try/catch (non-blocking).

2. **Phase 2: Historical Backfill**
   - Background worker processes stream historical data from Old DB to New Shards.
   - Use idempotency (\`ON CONFLICT DO UPDATE\`) to ensure dual writes aren't overwritten with older data.

3. **Phase 3: Shadow Reads & Discrepancy Auditing**
   - Asynchronous shadow readers compare results returned from Old DB vs New Shards.
   - Any checksum divergence is logged to Kafka and investigated.
   - Run this until 99.9999% consistency is sustained for 7 consecutive days.

4. **Phase 4: Instant Cutover**
   - Flip feature flag to read from New Shards.
   - Keep dual writing to Old DB for 48 hours as a safe fallback parachute.
   - Decommission Old DB. Celebrate with your team!
    `
  },
  {
    id: 'rate-limiter-redis-lua',
    slug: 'rate-limiter-redis-lua',
    title: 'Architecting High-Throughput Rate Limiters in Redis: Lua Scripting vs Token Bucket',
    tagline: 'Prevent race conditions and network round-trips while enforcing millions of rate checks per second.',
    author: {
      name: 'Marcus Vance',
      role: 'Staff Platform Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    publishedAt: 'October 24, 2026',
    readTime: '8 min read',
    category: 'Security & Rate Limiting',
    tags: ['Redis', 'Rate Limiting', 'Lua', 'Concurrency', 'API Gateway'],
    likes: 850,
    keyTakeaways: [
      'Naive Redis GET + INCR patterns introduce race conditions under concurrent requests.',
      'Lua scripts execute atomically in Redis single-threaded event loop with zero client-side locking.',
      'The Sliding Window Counter algorithm strikes the perfect balance between memory efficiency and burst smoothing.'
    ],
    content: `
### The Concurrency Flaw in Naive Rate Limiting

A common rookie mistake in rate limiter implementation looks like this:

\`\`\`ts
// BAD: Prone to Race Conditions!
const current = await redis.get(key);
if (parseInt(current) > 100) {
  throw new TooManyRequests();
}
await redis.incr(key);
\`\`\`

If 50 concurrent requests hit your API in the exact same millisecond when \`current = 99\`, all 50 will read \`99\`, proceed past the \`if\` check, and execute downstream services. Your rate limit of 100 was breached by 49 extra requests!

Furthermore, this requires **two separate network round trips** to Redis per API call.

---

### Atomic Execution with Embedded Redis Lua Scripts

Redis executes Lua scripts atomically in its primary execution thread. No other command or script can run until the Lua script terminates:

\`\`\`lua
-- sliding_window_counter.lua
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local clearBefore = now - window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, math.ceil(window / 1000) + 1)
    return 1 -- Allowed
else
    return 0 -- Rejected (429)
end
\`\`\`

#### Key Benefits:
- **Zero Race Conditions:** The check-and-increment operations are strictly atomic.
- **Single Round Trip:** Sends only one command across the network, reducing rate limiter latency from 4ms to under 0.8ms.
    `
  }
];

export const INITIAL_COMMENTS: BlogComment[] = [
  {
    id: 'comm-1',
    blogSlug: 'consistent-hashing-deep-dive',
    author: 'Siddharth Rao',
    role: 'Senior SRE at CloudScale',
    content: 'The section on virtual nodes is spot on. We had a production issue where 3 out of 12 cache nodes absorbed 70% of write traffic because our initial v-node count was only 10. Bumping to 256 v-nodes leveled the load within minutes.',
    createdAt: '2 days ago',
    upvotes: 34
  },
  {
    id: 'comm-2',
    blogSlug: 'consistent-hashing-deep-dive',
    author: 'Claire Zhao',
    role: 'Staff Infrastructure Engineer',
    content: 'Great writeup! How do you handle ring topology synchronization across distributed API gateways without adding ZooKeeper/etcd read bottlenecks?',
    createdAt: '1 day ago',
    upvotes: 19
  },
  {
    id: 'comm-3',
    blogSlug: 'database-sharding-zero-downtime',
    author: 'David Kim',
    role: 'Data Architect',
    content: 'The dual-write protocol with shadow reads saved our migration last year. One tip: make sure your backfill script chunks by primary key rather than offset/limit, otherwise DB query optimizer slows to a crawl after row 5,000,000.',
    createdAt: '3 days ago',
    upvotes: 42
  }
];
