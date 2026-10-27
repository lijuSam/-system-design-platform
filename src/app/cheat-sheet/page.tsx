import React from 'react';
import LatencyVisualizer from '@/components/LatencyVisualizer';
import { AVAILABILITY_SLA, DATABASE_COMPARISON } from '@/data/cheatSheet';
import { TableProperties, ShieldCheck, Database, Timer, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'System Design Cheat Sheets & Latency Numbers | SystemCraft Pro',
  description: 'Quick reference cheat sheets for system architects: Latency numbers every engineer should know, High Availability SLA downtime calculations, and Database selection trade-off matrices.'
};

export default function CheatSheetPage() {
  return (
    <div className="container" style={{ padding: '40px 24px 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">
            <TableProperties size={14} />
            <span>Architect Cheat Sheets</span>
          </span>
          <span className="badge badge-green">Staff Engineer Reference</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>
          Latency Numbers & System Architecture Cheat Sheets
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.6 }}>
          Fast access reference data for capacity planning calculations, SLA design, database technology selection, and memory/disk/network latency scales.
        </p>
      </div>

      {/* Feature 1: Interactive Latency Visualizer */}
      <section>
        <LatencyVisualizer />
      </section>

      {/* Feature 2: High Availability SLA 9s Table */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ShieldCheck size={20} style={{ color: 'var(--accent-emerald)' }} />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
            High Availability SLA & Downtime Calculator
          </h2>
        </div>
        <div
          className="card"
          style={{
            padding: 0,
            overflowX: 'auto',
            border: '1px solid var(--border-medium)'
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-medium)' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Availability Target</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Max Downtime / Year</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Max Downtime / Month</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--accent-primary)' }}>Max Downtime / Week</th>
              </tr>
            </thead>
            <tbody>
              {AVAILABILITY_SLA.map((sla, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {sla.level}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                    {sla.downtimeYear}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                    {sla.downtimeMonth}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--accent-primary)' }}>
                    {sla.downtimeWeek}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature 3: Database Selection Matrix */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Database size={20} style={{ color: 'var(--accent-purple)' }} />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
            Database Selection Decision Matrix
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {DATABASE_COMPARISON.map((db, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '24px',
                borderLeft: '4px solid var(--accent-primary)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {db.type}
                </h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>
                  {db.examples}
                </div>

                <div style={{ fontSize: '0.875rem', marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Key Strengths:</strong>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{db.strengths}</span>
                </div>

                <div style={{ fontSize: '0.875rem', marginBottom: '14px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Bottlenecks:</strong>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{db.weaknesses}</span>
                </div>
              </div>

              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  fontSize: '0.8125rem'
                }}
              >
                <strong style={{ color: 'var(--accent-emerald)' }}>Ideal For:</strong>{' '}
                <span style={{ color: 'var(--text-primary)' }}>{db.idealFor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
