import React from 'react';
import ArchitectureSimulator from '@/components/ArchitectureSimulator';
import { Compass, Sparkles, ShieldCheck, Gauge, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Interactive System Architecture Simulator | SystemCraft Pro',
  description: 'Design and simulate high-scale system topologies in real-time. Calculate QPS capacity, end-to-end latency, single points of failure (SPOFs), and monthly infrastructure cloud costs.'
};

export default function SimulatorPage() {
  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">
            <Compass size={14} />
            <span>Interactive Simulator</span>
          </span>
          <span className="badge badge-green">Real-Time Engine</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>
          System Architecture Simulation & Stress-Test Canvas
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>
          Model distributed systems under varying load. Drag node connections, adjust simulated QPS from 1,000 to 180,000+, scale replica fleets (+/-), uncover Single Points of Failure (SPOFs), and evaluate cloud infrastructure cost estimates.
        </p>
      </div>

      {/* Simulator Core Component */}
      <ArchitectureSimulator />

      {/* Architecture Design Guidelines */}
      <div
        className="card"
        style={{
          marginTop: '40px',
          padding: '28px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <ShieldCheck size={22} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
            Rules of Thumb for High-Scale System Architects
          </h3>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}
        >
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              1. Never Expose Storage to Unbounded Reads
            </strong>
            Deploy an edge CDN or Redis cluster in front of primary relational databases. At 50k+ QPS, relational disk IOPS will saturate, cascading into thread pool exhaustion.
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              2. Eliminate Single Points of Failure (SPOF)
            </strong>
            Every component in your data path must have a minimum redundancy of 2 across distinct availability zones (AZs) with health-checked failover routing.
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              3. Decouple Bursty Writes with Queues
            </strong>
            When write traffic experiences spiky 10x surges (e.g. flash sales or checkouts), buffer incoming payloads in a partitioned message queue (Kafka/RabbitMQ) and drain asynchronously.
          </div>
        </div>
      </div>
    </div>
  );
}
