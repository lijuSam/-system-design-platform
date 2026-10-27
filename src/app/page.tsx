import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Building2, 
  Compass, 
  FileText, 
  TableProperties, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Database, 
  Zap, 
  TrendingUp, 
  Server, 
  Lock 
} from 'lucide-react';
import { CONCEPTS } from '@/data/concepts';
import { CASE_STUDIES } from '@/data/caseStudies';
import { BLOG_POSTS } from '@/data/blogs';

export default function HomePage() {
  const featuredConcepts = CONCEPTS.slice(0, 3);
  const featuredCaseStudies = CASE_STUDIES.slice(0, 3);
  const featuredBlogs = BLOG_POSTS.slice(0, 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '40px' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '80px 0 60px',
          borderBottom: '1px solid var(--border-light)',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.12), transparent)'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
          {/* Version badge */}
          <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="badge badge-blue" style={{ fontSize: '0.8125rem', padding: '6px 14px' }}>
              <Sparkles size={14} />
              <span>Version 2.5 • Interactive Architecture Engine</span>
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              marginBottom: '20px',
              color: 'var(--text-primary)'
            }}
          >
            Master High-Scale <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              System Design & Architecture
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.1875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '720px',
              margin: '0 auto 36px'
            }}
          >
            The interactive academy for senior engineers, tech leads, and software architects. Simulate production traffic, inspect real-world architectures (Netflix, Uber, WhatsApp, Stripe), and master distributed trade-offs.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '48px'
            }}
          >
            <Link href="/simulator" className="btn btn-primary btn-lg">
              <Compass size={18} />
              <span>Launch Architecture Simulator</span>
            </Link>
            <Link href="/concepts" className="btn btn-secondary btn-lg">
              <span>Explore Concepts Library</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              padding: '24px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>150k+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Engineers Trained</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>99.999%</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>High Availability Patterns</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-purple)' }}>40+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Production Architectures</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b' }}>Sub-10ms</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Latency Benchmarks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Feature: Interactive Simulator Spotlight */}
      <section className="container">
        <div
          className="card"
          style={{
            padding: '36px',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-secondary) 100%)',
            border: '1.5px solid var(--accent-border)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-blue">Interactive Playground</span>
                <span className="badge badge-green">Zero Setup</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                Interactive System Architecture Simulator
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '650px', marginTop: '4px' }}>
                Design custom topologies or load production presets. Adjust simulated traffic from 1,000 to 250,000 QPS, scale replica fleets, detect single points of failure (SPOFs), and diagnose capacity bottlenecks in real time.
              </p>
            </div>
            <Link href="/simulator" className="btn btn-primary">
              <Compass size={16} />
              <span>Open Full Simulator</span>
            </Link>
          </div>

          {/* Interactive Mini Preview Widget */}
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="status-dot"></span>
                <strong>Live Simulation Pipeline:</strong> Flash Sale E-Commerce Model
              </span>
              <span>Throughput: <strong style={{ color: 'var(--accent-primary)' }}>75,000 QPS</strong></span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px'
              }}
            >
              {[
                { name: 'Clients', type: 'Global Edge', lat: '15ms', icon: Cpu },
                { name: 'Cloudflare CDN', type: 'Anycast Cache', lat: '10ms', icon: Server },
                { name: 'AWS ALB', type: 'Load Balancer', lat: '4ms', icon: Activity },
                { name: 'Order Service', type: 'Go Pods x3', lat: '12ms', icon: Zap },
                { name: 'Redis Cluster', type: 'Memory Ring x2', lat: '1ms', icon: Database },
                { name: 'PostgreSQL', type: 'Aurora Multi-AZ', lat: '18ms', icon: Lock }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)' }}>
                      <Icon size={14} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.type}</span>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>{item.lat}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Real-World Case Studies */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span className="badge badge-purple">Production Architectures</span>
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
              Real-World System Case Studies
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Step-by-step architectural breakdowns of the world&apos;s most demanding web scale platforms.
            </p>
          </div>
          <Link href="/case-studies" className="btn btn-secondary btn-sm">
            <span>View All Case Studies</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {featuredCaseStudies.map((cs) => (
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge badge-blue">{cs.company}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {cs.difficulty}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {cs.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {cs.tagline}
                </p>

                {/* Key stats pill grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    marginBottom: '16px'
                  }}
                >
                  {cs.stats.slice(0, 2).map((st, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {st.label}
                      </div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                <span>Read Full Architecture Breakdown</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: System Design Concepts */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span className="badge badge-blue">Foundations & Scale</span>
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
              Essential Distributed System Concepts
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Deep mathematical and operational understanding of consistency, partitioning, caching, and consensus.
            </p>
          </div>
          <Link href="/concepts" className="btn btn-secondary btn-sm">
            <span>Explore All Concepts</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {featuredConcepts.map((concept) => (
            <Link
              key={concept.id}
              href={`/concepts/${concept.slug}`}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge badge-green">{concept.category}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {concept.readTime}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {concept.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {concept.summary}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                <span>Inspect Mechanics & Trade-offs</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 4: Technical Blogs */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span className="badge badge-amber">Engineering Publications</span>
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
              Staff Engineering Deep Dives & Blogs
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Field-tested insights, zero-downtime database sharding guides, and high-throughput concurrency patterns.
            </p>
          </div>
          <Link href="/blogs" className="btn btn-secondary btn-sm">
            <span>Read All Articles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px'
          }}
        >
          {featuredBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge badge-purple">{blog.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{blog.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {blog.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {blog.tagline}
                </p>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {blog.author.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {blog.author.role}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                <span>Read Article</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interview Assessment CTA */}
      <section className="container">
        <div
          className="card"
          style={{
            padding: '40px',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span className="badge badge-green" style={{ marginBottom: '12px' }}>
              Self-Assessment
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Test Your Real-World System Design Interview Readiness
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Take scenario-based architecture questions on cache stampedes, financial idempotency, and partition tolerance. Receive immediate staff engineer trade-off rankings.
            </p>
          </div>
          <Link href="/quiz" className="btn btn-primary btn-lg">
            <CheckCircle2 size={18} />
            <span>Start Assessment Quiz</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
