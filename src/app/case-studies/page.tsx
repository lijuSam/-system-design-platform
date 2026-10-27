'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, ArrowRight, Search, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { CASE_STUDIES } from '@/data/caseStudies';

export default function CaseStudiesPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const companies = ['All', 'Netflix', 'Uber', 'WhatsApp', 'TinyURL / Bitly', 'Stripe'];

  const filtered = CASE_STUDIES.filter((cs) => {
    const matchesCompany = selectedCompany === 'All' || cs.company === selectedCompany;
    const matchesSearch =
      cs.title.toLowerCase().includes(search.toLowerCase()) ||
      cs.company.toLowerCase().includes(search.toLowerCase()) ||
      cs.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesCompany && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-purple">
            <Building2 size={14} />
            <span>Architecture Blueprints</span>
          </span>
          <span className="badge badge-green">Production Proven</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>
          Real-World System Architecture Case Studies
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.6 }}>
          Explore battle-tested system architectures running behind the world&apos;s highest-volume web applications. Includes capacity estimation equations, component breakdowns, failure mode analyses, and interactive request pipelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '20px',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by company or system (e.g. Netflix video, Uber dispatch, Stripe ledgers)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Company Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Company:
          </span>
          {companies.map((co) => (
            <button
              key={co}
              onClick={() => setSelectedCompany(co)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedCompany === co ? '1px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                backgroundColor: selectedCompany === co ? 'var(--accent-light)' : 'transparent',
                color: selectedCompany === co ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              {co}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}
      >
        {filtered.map((cs) => (
          <Link
            key={cs.id}
            href={`/case-studies/${cs.slug}`}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textDecoration: 'none'
            }}
          >
            <div>
              {/* Top Meta */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="badge badge-blue">{cs.company}</span>
                <span className="badge badge-purple">{cs.difficulty}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {cs.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                {cs.tagline}
              </p>

              {/* Stats Matrix Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  marginBottom: '20px'
                }}
              >
                {cs.stats.map((st, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {st.label}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {cs.components.length} Core Architecture Components
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                <span>Inspect Pipeline</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
