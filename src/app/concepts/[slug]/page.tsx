import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONCEPTS } from '@/data/concepts';
import { CASE_STUDIES } from '@/data/caseStudies';
import { 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Share2 
} from 'lucide-react';

export async function generateStaticParams() {
  return CONCEPTS.map((c) => ({
    slug: c.slug
  }));
}

export default async function ConceptDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = CONCEPTS.find((c) => c.slug === slug);

  if (!concept) {
    notFound();
  }

  const relatedCases = CASE_STUDIES.filter((cs) =>
    concept.relatedCaseStudies?.includes(cs.slug)
  );

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '960px' }}>
      {/* Back button */}
      <Link
        href="/concepts"
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
        <span>Back to All Concepts</span>
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-blue">{concept.category}</span>
          <span className="badge badge-purple">{concept.difficulty}</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {concept.readTime}
          </span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          {concept.title}
        </h1>
        <p style={{ fontSize: '1.1875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {concept.tagline}
        </p>
      </div>

      {/* Executive Summary Card */}
      <div
        className="card"
        style={{
          padding: '24px',
          marginBottom: '36px',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '4px solid var(--accent-primary)'
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '8px' }}>
          Executive Summary
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          {concept.summary}
        </p>
      </div>

      {/* Key Architectural Points */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '16px' }}>
          Fundamental Mechanics & Principles
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {concept.keyPoints.map((point, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                {idx + 1}
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trade-Off Matrix (Pros vs Cons) */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '16px' }}>
          Architectural Trade-Off Analysis
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {/* Pros */}
          <div
            className="card"
            style={{
              padding: '24px',
              borderTop: '3px solid var(--accent-emerald)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={20} />
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Architectural Advantages
              </h3>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {concept.tradeoffs.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div
            className="card"
            style={{
              padding: '24px',
              borderTop: '3px solid var(--accent-rose)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-rose)' }}>
              <XCircle size={20} />
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Operational Vulnerabilities & Costs
              </h3>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {concept.tradeoffs.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Deep Dive Content */}
      <div className="card" style={{ padding: '32px', marginBottom: '48px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>
          Deep Dive: Internal Mechanics & Production Reality
        </h2>
        <div
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {concept.deepDiveMarkdown.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={i} style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '16px', marginBottom: '4px' }}>
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <div key={i} className="code-block" style={{ margin: '12px 0' }}>
                  {paragraph.replace(/```[a-z]*\n?/g, '')}
                </div>
              );
            }
            return (
              <p key={i} style={{ lineHeight: 1.7 }}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Related Case Studies */}
      {relatedCases.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '16px' }}>
            Where This Pattern is Used at High Scale
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            {relatedCases.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <div>
                  <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
                    {cs.company}
                  </span>
                  <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {cs.title}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {cs.tagline}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)', marginTop: '14px' }}>
                  <span>Inspect Case Study</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
