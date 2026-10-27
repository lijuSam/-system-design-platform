import { LatencyMetric } from '@/types';

export const LATENCY_NUMBERS: LatencyMetric[] = [
  {
    name: 'L1 CPU Cache Reference',
    timeDisplay: '0.5 ns',
    nanoseconds: 0.5,
    category: 'CPU/Memory',
    analogy: '1 heart beat (0.5 sec)'
  },
  {
    name: 'Branch Mispredict',
    timeDisplay: '5 ns',
    nanoseconds: 5,
    category: 'CPU/Memory',
    analogy: '10 heart beats (5 sec)'
  },
  {
    name: 'L2 CPU Cache Reference',
    timeDisplay: '7 ns',
    nanoseconds: 7,
    category: 'CPU/Memory',
    analogy: '14 heart beats'
  },
  {
    name: 'Mutex Lock / Unlock',
    timeDisplay: '25 ns',
    nanoseconds: 25,
    category: 'CPU/Memory',
    analogy: 'Half a minute'
  },
  {
    name: 'Main Memory (RAM) Access',
    timeDisplay: '100 ns',
    nanoseconds: 100,
    category: 'CPU/Memory',
    analogy: '1.5 minutes'
  },
  {
    name: 'Compress 1KB with Snappy',
    timeDisplay: '2,000 ns (2 µs)',
    nanoseconds: 2000,
    category: 'CPU/Memory',
    analogy: '33 minutes'
  },
  {
    name: 'Send 2KB over 1 Gbps Network',
    timeDisplay: '20,000 ns (20 µs)',
    nanoseconds: 20000,
    category: 'Network',
    analogy: '5.5 hours'
  },
  {
    name: 'SSD Random Read',
    timeDisplay: '150,000 ns (150 µs)',
    nanoseconds: 150000,
    category: 'Disk/Flash',
    analogy: '1.7 days'
  },
  {
    name: 'Read 1MB Sequentially from Memory',
    timeDisplay: '250,000 ns (250 µs)',
    nanoseconds: 250000,
    category: 'CPU/Memory',
    analogy: '2.9 days'
  },
  {
    name: 'Round Trip Within Same Datacenter',
    timeDisplay: '500,000 ns (0.5 ms)',
    nanoseconds: 500000,
    category: 'Network',
    analogy: '5.8 days'
  },
  {
    name: 'Read 1MB Sequentially from SSD',
    timeDisplay: '1,000,000 ns (1 ms)',
    nanoseconds: 1000000,
    category: 'Disk/Flash',
    analogy: '11.6 days'
  },
  {
    name: 'Hard Drive Seek (Mechanical HDD)',
    timeDisplay: '10,000,000 ns (10 ms)',
    nanoseconds: 10000000,
    category: 'Disk/Flash',
    analogy: '16 weeks (4 months)'
  },
  {
    name: 'Send Packet CA to Netherlands (Transatlantic)',
    timeDisplay: '150,000,000 ns (150 ms)',
    nanoseconds: 150000000,
    category: 'Network',
    analogy: '4.8 years!'
  }
];

export const AVAILABILITY_SLA = [
  { level: '99% ("Two Nines")', downtimeYear: '3.65 days', downtimeMonth: '7.31 hours', downtimeWeek: '1.68 hours' },
  { level: '99.9% ("Three Nines")', downtimeYear: '8.77 hours', downtimeMonth: '43.83 minutes', downtimeWeek: '10.08 minutes' },
  { level: '99.95% ("High Availability")', downtimeYear: '4.38 hours', downtimeMonth: '21.92 minutes', downtimeWeek: '5.04 minutes' },
  { level: '99.99% ("Four Nines")', downtimeYear: '52.6 minutes', downtimeMonth: '4.38 minutes', downtimeWeek: '1.01 minutes' },
  { level: '99.999% ("Five Nines - Mission Critical")', downtimeYear: '5.26 minutes', downtimeMonth: '26.3 seconds', downtimeWeek: '6.05 seconds' }
];

export const DATABASE_COMPARISON = [
  {
    type: 'Relational (RDBMS)',
    examples: 'PostgreSQL, MySQL, CockroachDB',
    strengths: 'ACID transactions, complex relational joins, data integrity',
    weaknesses: 'Horizontal write scaling is complex (sharding), fixed schemas',
    idealFor: 'Financial ledgers, e-commerce checkout, user auth, complex relational data'
  },
  {
    type: 'Key-Value',
    examples: 'Redis, Amazon DynamoDB, Aerospike',
    strengths: 'Sub-millisecond lookups, massive horizontal scaling, atomic increments',
    weaknesses: 'No complex relational queries or range scans across secondary attributes',
    idealFor: 'Session storage, rate limiting counters, real-time leaderboards, cache layers'
  },
  {
    type: 'Wide-Column / Partitioned',
    examples: 'Apache Cassandra, ScyllaDB, Bigtable',
    strengths: 'Peer-to-peer masterless writes, linear write scalability across multi-DC',
    weaknesses: 'No joins, queries must be designed strictly around partition and cluster keys',
    idealFor: 'Time-series metrics, IoT sensor streams, chat message histories, activity feeds'
  },
  {
    type: 'Document Store',
    examples: 'MongoDB, Couchbase',
    strengths: 'Flexible schema, natural nesting of JSON objects, fast single-document updates',
    weaknesses: 'Multi-document ACID transactions have performance penalties',
    idealFor: 'Product catalogs, user profile preferences, CMS content, dynamic payloads'
  },
  {
    type: 'Search Engine',
    examples: 'Elasticsearch, OpenSearch, Meilisearch',
    strengths: 'Inverted indexes, fuzzy search, full-text tokenization, aggregations',
    weaknesses: 'Not designed as source of truth, high memory overhead for Lucene segments',
    idealFor: 'Log indexing, e-commerce search, autocomplete typeaheads, analytics filters'
  }
];
