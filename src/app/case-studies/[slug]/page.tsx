import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/data/caseStudies';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { 
  ArrowLeft, 
  Building2, 
  Calculator, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug
  }));
}

export default async function CaseStudyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((cs) => cs.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '1080px' }}>
      {/* Back button */}
      <Link
        href="/case-studies"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '24px',
          fontWeight: 600
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to All Case Studies</span>
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-blue">{study.company}</span>
          <span className="badge badge-purple">{study.difficulty}</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          {study.title}
        </h1>
        <p style={{ fontSize: '1.1875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {study.tagline}
        </p>
      </div>

      {/* Stats Bar */}
      <div
        className="card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          padding: '24px',
          marginBottom: '36px',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        {study.stats.map((st, i) => (
          <div key={i}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {st.label}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {st.value}
            </div>
          </div>
        ))}
      </div>

      {/* Section 1: Capacity Estimation Table */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Calculator size={20} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
            Back-of-the-Envelope Capacity Estimations
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
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Metric</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>Formula / Assumptions</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--accent-primary)' }}>Estimated Throughput</th>
              </tr>
            </thead>
            <tbody>
              {study.capacityEstimation.map((cap, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {cap.metric}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                    {cap.calculation}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {cap.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Interactive Request Pipeline */}
      <div style={{ marginBottom: '40px' }}>
        <ArchitectureDiagram caseStudy={study} />
      </div>

      {/* Section 3: Deep Dive Components */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Cpu size={20} style={{ color: 'var(--accent-emerald)' }} />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
            Core Component Architecture & Technology Choices
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {study.components.map((comp, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '24px',
                borderLeft: '4px solid var(--accent-emerald)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {comp.name}
                </h3>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {comp.technologies.map((t, i) => (
                    <span key={i} className="badge badge-green" style={{ fontSize: '0.6875rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                {comp.role}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {comp.deepDive}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Failure Modes & Chaos Drills */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ShieldAlert size={20} style={{ color: 'var(--accent-rose)' }} />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800 }}>
            Failure Modes, Partition Scenarios & Mitigations
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {study.failureModes.map((fm, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '20px',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '8px' }}>
                🚨 Failure Scenario: {fm.scenario}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <strong>Impact:</strong> {fm.impact}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--accent-emerald)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-emerald-light)' }}>
                <strong>Staff Mitigation Protocol:</strong> {fm.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Key Takeaways */}
      <div
        className="card"
        style={{
          padding: '28px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)' }}>
          Staff Engineer Architecture Takeaways
        </h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {study.keyTakeaways.map((takeaway, i) => (
            <li key={i}>{takeaway}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
