'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Search, ArrowRight, Zap, Database, Scale, ShieldAlert, Radio, CircleDot } from 'lucide-react';
import { CONCEPTS } from '@/data/concepts';
import { Category, Difficulty } from '@/types';

export default function ConceptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = [
    'All',
    'Fundamentals',
    'Distributed Caching',
    'Storage & Databases',
    'Messaging & Queues',
    'Security & Rate Limiting'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Staff+'];

  const filteredConcepts = CONCEPTS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getConceptIcon = (name: string) => {
    switch (name) {
      case 'CircleDot': return CircleDot;
      case 'Database': return Database;
      case 'Zap': return Zap;
      case 'Scale': return Scale;
      case 'ShieldAlert': return ShieldAlert;
      case 'Radio': return Radio;
      default: return Layers;
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">
            <Layers size={14} />
            <span>Architecture Curriculum</span>
          </span>
          <span className="badge badge-purple">{CONCEPTS.length} Deep Dives</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>
          System Design Concepts & Distributed Mechanics
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.6 }}>
          Master the fundamental building blocks of planet-scale software systems. Understand the mathematical algorithms, operational failure modes, and trade-off matrices behind each pattern.
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
          gap: '16px'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search concepts (e.g. Consistent Hashing, Sharding, CAP, Redis)..."
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

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedCategory === cat ? '1px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                backgroundColor: selectedCategory === cat ? 'var(--accent-light)' : 'transparent',
                color: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Level:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedDifficulty === diff ? '1px solid var(--accent-purple)' : '1px solid var(--border-medium)',
                backgroundColor: selectedDifficulty === diff ? 'var(--accent-purple-light)' : 'transparent',
                color: selectedDifficulty === diff ? 'var(--accent-purple)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}
      >
        {filteredConcepts.map((concept) => {
          const Icon = getConceptIcon(concept.iconName);

          return (
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
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-light)',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="badge badge-blue" style={{ fontSize: '0.6875rem' }}>
                        {concept.category}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {concept.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {concept.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {concept.tagline}
                </p>

                {/* Key Points Preview */}
                <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Key Architectural Takeaway:
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {concept.keyPoints[0]}
                  </p>
                </div>
              </div>

              {/* Bottom footer link */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.6875rem' }}>
                  {concept.difficulty}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                  <span>Read Deep Dive</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
