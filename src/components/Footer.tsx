'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setEmail('');
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-light)',
        marginTop: '80px',
        padding: '60px 0 32px'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Cpu size={18} />
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                SystemCraft
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
              The interactive, production-grade system design platform for software engineers, tech leads, and distributed systems architects.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--accent-emerald)' }}>
              <span className="status-dot"></span>
              <span style={{ fontWeight: 600 }}>All Architecture Engines Operational</span>
            </div>
          </div>

          {/* Core Curriculum */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Curriculum
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <Link href="/concepts" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                System Design Concepts
              </Link>
              <Link href="/case-studies" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                Real-World Architectures
              </Link>
              <Link href="/simulator" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                Interactive Simulator
              </Link>
              <Link href="/cheat-sheet" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                Latency & Trade-off Tables
              </Link>
              <Link href="/quiz" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
                Interview Readiness Quiz
              </Link>
            </div>
          </div>

          {/* Real-World Systems */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Deep Dives
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <Link href="/case-studies/netflix-streaming" style={{ color: 'var(--text-secondary)' }}>
                Netflix Video Architecture
              </Link>
              <Link href="/case-studies/uber-geospatial" style={{ color: 'var(--text-secondary)' }}>
                Uber H3 Spatial Dispatch
              </Link>
              <Link href="/case-studies/whatsapp-messaging" style={{ color: 'var(--text-secondary)' }}>
                WhatsApp Erlang Messaging
              </Link>
              <Link href="/case-studies/stripe-payments" style={{ color: 'var(--text-secondary)' }}>
                Stripe Idempotent Ledgers
              </Link>
              <Link href="/blogs" style={{ color: 'var(--text-secondary)' }}>
                Staff Engineering Blogs
              </Link>
            </div>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Staff Architect Weekly
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
              Receive distilled real-world incident post-mortems and architecture breakdowns every Tuesday.
            </p>
            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-emerald-light)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.8125rem',
                  fontWeight: 600
                }}
              >
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="engineer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Send size={14} />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} SystemCraft Academy. Built for scale engineers worldwide.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />
              Production Ready • Zero Config Deployment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
