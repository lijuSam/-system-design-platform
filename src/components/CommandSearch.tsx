'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Layers, Building2, BookOpen, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CONCEPTS } from '@/data/concepts';
import { CASE_STUDIES } from '@/data/caseStudies';
import { BLOG_POSTS } from '@/data/blogs';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandSearch({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingConcepts = CONCEPTS.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingCaseStudies = CASE_STUDIES.filter(
    (cs) =>
      cs.title.toLowerCase().includes(q) ||
      cs.company.toLowerCase().includes(q) ||
      cs.tagline.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingBlogs = BLOG_POSTS.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.tagline.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
  ).slice(0, 3);

  const navigateTo = (url: string) => {
    router.push(url);
    onClose();
    setQuery('');
  };

  const totalResults = matchingConcepts.length + matchingCaseStudies.length + matchingBlogs.length;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-light)',
            gap: '12px'
          }}
        >
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Search concepts, case studies (Netflix, Uber), blogs, cheat sheets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '12px' }}>
          {totalResults === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No results found for &ldquo;{query}&rdquo;.</p>
              <p style={{ fontSize: '0.875rem', marginTop: '6px' }}>Try searching for &quot;Consistent Hashing&quot;, &quot;Netflix&quot;, &quot;Redis&quot;, or &quot;Rate Limiting&quot;.</p>
            </div>
          ) : (
            <>
              {matchingConcepts.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '6px 10px', letterSpacing: '0.05em' }}>
                    Concepts & Architecture Patterns
                  </div>
                  {matchingConcepts.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => navigateTo(`/concepts/${c.slug}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Layers size={16} style={{ color: 'var(--accent-primary)' }} />
                        <div>
                          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{c.tagline}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              )}

              {matchingCaseStudies.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '6px 10px', letterSpacing: '0.05em' }}>
                    Real-World System Architectures
                  </div>
                  {matchingCaseStudies.map((cs) => (
                    <div
                      key={cs.id}
                      onClick={() => navigateTo(`/case-studies/${cs.slug}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Building2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                        <div>
                          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cs.title}</div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{cs.tagline}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              )}

              {matchingBlogs.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '6px 10px', letterSpacing: '0.05em' }}>
                    Technical Engineering Blogs
                  </div>
                  {matchingBlogs.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => navigateTo(`/blogs/${b.slug}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={16} style={{ color: 'var(--accent-purple)' }} />
                        <div>
                          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{b.title}</div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{b.tagline}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span><kbd style={{ background: 'var(--bg-surface)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-medium)' }}>ESC</kbd> to close</span>
            <span><kbd style={{ background: 'var(--bg-surface)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-medium)' }}>↵</kbd> to select</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Powered by SystemCraft Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
