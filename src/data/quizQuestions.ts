import { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    title: 'Cache Stampede Under Breaking News Spike',
    scenario: 'Your news website features a homepage top banner article. During a breaking news event, traffic spikes by 20x. The Redis cache key for this banner has a 5-minute TTL. When the key expires, hundreds of concurrent backend threads miss the cache simultaneously and issue heavy queries to the primary database, crashing it. What is the most resilient architectural fix?',
    options: [
      {
        id: 'opt-a',
        text: 'Increase the TTL from 5 minutes to 24 hours so it expires less often.',
        isCorrect: false,
        explanation: 'Increasing TTL delays the problem but does not prevent the stampede when it inevitably expires or is invalidated when editors update the story.'
      },
      {
        id: 'opt-b',
        text: 'Implement a distributed mutex lock (e.g. Redis SETNX) so only the first request re-queries the database while other requests wait or return stale cached data.',
        isCorrect: true,
        explanation: 'A distributed mutex (or probabilistic early refresh like XFetch) guarantees that exactly one worker regenerates the cached payload, completely protecting the database.'
      },
      {
        id: 'opt-c',
        text: 'Deploy 5 more read-replica database instances to absorb the thundering herd.',
        isCorrect: false,
        explanation: 'Adding replicas increases cost without addressing the root inefficiency of recomputing identical data hundreds of times in parallel.'
      },
      {
        id: 'opt-d',
        text: 'Switch from Redis to Memcached.',
        isCorrect: false,
        explanation: 'Memcached suffers from identical cache stampede dynamics when keys expire.'
      }
    ],
    category: 'Distributed Caching',
    difficulty: 'Intermediate',
    architecturalInsight: 'In production systems, combine Mutex locking with "Serve Stale while Revalidating" to maintain sub-10ms response times even during background cache recomputations.'
  },
  {
    id: 'quiz-2',
    title: 'Financial Transaction Double-Charge Prevention',
    scenario: 'A mobile user on a spotty cellular connection taps "Pay $250". The payment service processes the charge with Visa, but before the HTTP 200 response reaches the phone, the cellular connection drops. The phone SDK automatically retries the payment request 3 seconds later. How do you prevent charging the card twice?',
    options: [
      {
        id: 'opt-a',
        text: 'Check if the user made a charge for the same dollar amount in the last 60 seconds.',
        isCorrect: false,
        explanation: 'Amount checking is brittle and fails if the user legitimately buys two identical items back-to-back.'
      },
      {
        id: 'opt-b',
        text: 'Require the client to generate a unique UUID Idempotency-Key header; store the request hash and state atomically in distributed storage before invoking the payment gateway.',
        isCorrect: true,
        explanation: 'Idempotency keys paired with payload hashes ensure identical requests return the cached result of the original transaction without re-executing charges.'
      },
      {
        id: 'opt-c',
        text: 'Disable automatic retries in the mobile app SDK.',
        isCorrect: false,
        explanation: 'Disabling retries causes poor UX and abandoned orders; network dropped packets are standard on mobile networks and must be gracefully handled.'
      },
      {
        id: 'opt-d',
        text: 'Wrap the payment gateway HTTP call in a local database transaction.',
        isCorrect: false,
        explanation: 'Local database transactions cannot roll back external third-party API calls made to bank acquiring networks.'
      }
    ],
    category: 'High Availability & Resiliency',
    difficulty: 'Staff+',
    architecturalInsight: 'Stripe and Adyen enforce idempotency keys for all mutating endpoints. The key must expire after 24–48 hours and reject mismatched payload hashes with HTTP 400.'
  },
  {
    id: 'quiz-3',
    title: 'Designing Real-Time Chat Storage at Scale',
    scenario: 'You are designing the storage layer for a real-time 1-on-1 and group chat application like Discord or WhatsApp with 500M active users. Users frequently read recent messages (paginated chronologically backwards), and message write volume is 1M writes/sec. Which database and partitioning strategy is best suited?',
    options: [
      {
        id: 'opt-a',
        text: 'PostgreSQL with a single messages table indexed on (conversation_id, created_at).',
        isCorrect: false,
        explanation: 'Single-node PostgreSQL will bottleneck on write IOPS long before 1M writes/sec.'
      },
      {
        id: 'opt-b',
        text: 'Apache Cassandra / ScyllaDB with partition key (channel_id, bucket_month) and clustering key (message_id DESC).',
        isCorrect: true,
        explanation: 'Partitioning by channel and bucketing by time creates bounded row sizes, while clustering key provides O(1) sequential reverse-chronological range scans without joins.'
      },
      {
        id: 'opt-c',
        text: 'Redis Hashes storing messages indefinitely.',
        isCorrect: false,
        explanation: 'Storing petabytes of historical chat messages in RAM is prohibitively expensive.'
      },
      {
        id: 'opt-d',
        text: 'Amazon S3 storing each message as an individual JSON object.',
        isCorrect: false,
        explanation: 'Individual S3 PUT requests per message introduce high latency (50-100ms) and high per-request API costs.'
      }
    ],
    category: 'Storage & Databases',
    difficulty: 'Intermediate',
    architecturalInsight: 'Discord famously migrated from MongoDB to Cassandra, and later to ScyllaDB, using this exact composite key schema to support trillions of messages.'
  }
];
