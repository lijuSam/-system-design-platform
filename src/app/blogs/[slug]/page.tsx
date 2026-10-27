import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import BlogComments from '@/components/BlogComments';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Share2, Tag } from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map((b) => ({
    slug: b.slug
  }));
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = BLOG_POSTS.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '840px' }}>
      {/* Back to blogs */}
      <Link
        href="/blogs"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '28px',
          fontWeight: 600
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Engineering Publications</span>
      </Link>

      {/* Header Meta */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="badge badge-purple">{blog.category}</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> {blog.readTime}
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} /> {blog.publishedAt}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
          {blog.title}
        </h1>

        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          {blog.tagline}
        </p>

        {/* Author Byline Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {blog.author.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {blog.author.role}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {blog.tags.map((t, idx) => (
              <span key={idx} className="badge badge-blue" style={{ fontSize: '0.6875rem' }}>
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Takeaways Box */}
      <div
        className="card"
        style={{
          padding: '24px',
          marginBottom: '40px',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '4px solid var(--accent-purple)'
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-purple)', marginBottom: '10px' }}>
          TL;DR Architectural Takeaways:
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          {blog.keyTakeaways.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Article Markdown Body */}
      <article
        style={{
          fontSize: '1.0625rem',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {blog.content.split('\n\n').map((block, i) => {
          if (block.startsWith('### ')) {
            return (
              <h2
                key={i}
                style={{
                  fontSize: '1.625rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginTop: '28px',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}
              >
                {block.replace('### ', '')}
              </h2>
            );
          }
          if (block.startsWith('#### ')) {
            return (
              <h3
                key={i}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginTop: '16px',
                  marginBottom: '4px'
                }}
              >
                {block.replace('#### ', '')}
              </h3>
            );
          }
          if (block.startsWith('```')) {
            const cleanCode = block.replace(/```[a-z]*\n?/g, '');
            return (
              <div key={i} className="code-block" style={{ margin: '14px 0' }}>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{cleanCode}</pre>
              </div>
            );
          }
          if (block.startsWith('---')) {
            return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '20px 0' }} />;
          }
          return (
            <p key={i} style={{ lineHeight: 1.8 }}>
              {block}
            </p>
          );
        })}
      </article>

      {/* Comments & Interactive Discussion Section */}
      <BlogComments blogSlug={blog.slug} initialLikes={blog.likes} />
    </div>
  );
}
