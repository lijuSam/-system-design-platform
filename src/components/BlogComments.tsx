'use client';

import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';
import { BlogComment } from '@/types';

interface Props {
  blogSlug: string;
  initialLikes: number;
}

export default function BlogComments({ blogSlug, initialLikes }: Props) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${blogSlug}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [blogSlug]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, role, content })
      });
      const data = await res.json();
      if (data.success) {
        setComments((prev) => [data.data, ...prev]);
        setContent('');
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-light)' }}>
      {/* Claps / Like Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
        <button
          onClick={handleLike}
          className="btn btn-secondary"
          style={{
            borderColor: hasLiked ? 'var(--accent-primary)' : 'var(--border-medium)',
            backgroundColor: hasLiked ? 'var(--accent-light)' : 'var(--bg-surface)',
            color: hasLiked ? 'var(--accent-primary)' : 'var(--text-primary)'
          }}
        >
          <ThumbsUp size={18} fill={hasLiked ? 'currentColor' : 'none'} />
          <span>{likes.toLocaleString()} Engineers Found This Useful</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <MessageSquare size={16} />
          <span>{comments.length} Engineering Insights</span>
        </div>
      </div>

      {/* Comment Form */}
      <div
        className="card"
        style={{
          padding: '24px',
          marginBottom: '32px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
          Join the Staff Engineering Discussion
        </h4>
        <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <input
              type="text"
              required
              placeholder="Your Name (e.g. Maya Chen)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Your Role / Company (e.g. Senior SRE @ Stripe)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>

          <textarea
            required
            rows={3}
            placeholder="Share your production experience, trade-off analysis, or edge cases encountered..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'vertical'
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {successMsg ? (
              <span style={{ fontSize: '0.8125rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> Comment published!
              </span>
            ) : <span />}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-sm"
              style={{ alignSelf: 'flex-end' }}
            >
              <Send size={14} />
              <span>{submitting ? 'Posting...' : 'Post Insight'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading discussion...</p>
        ) : comments.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Be the first engineer to leave an insight!</p>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              className="card"
              style={{
                padding: '18px 20px',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8125rem'
                    }}
                  >
                    {comm.author.charAt(0)}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {comm.author}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                      {comm.role}
                    </span>
                  </div>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {comm.createdAt}
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {comm.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
