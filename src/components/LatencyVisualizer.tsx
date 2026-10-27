'use client';

import React, { useState } from 'react';
import { Timer, Zap, HardDrive, Wifi, Info } from 'lucide-react';
import { LATENCY_NUMBERS } from '@/data/cheatSheet';
import { LatencyMetric } from '@/types';

export default function LatencyVisualizer() {
  const [selectedMetric, setSelectedMetric] = useState<LatencyMetric>(LATENCY_NUMBERS[4]); // RAM default

  // Maximum scale: Transatlantic packet 150,000,000 ns
  const maxLog = Math.log10(150000000);

  const getCategoryIcon = (cat: LatencyMetric['category']) => {
    switch (cat) {
      case 'CPU/Memory': return Zap;
      case 'Disk/Flash': return HardDrive;
      case 'Network': return Wifi;
    }
  };

  return (
    <div
      className="card"
      style={{
        padding: '24px',
        border: '1px solid var(--border-medium)',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
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
            <Timer size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
              Latency Numbers Every System Architect Must Know
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Logarithmic comparison from CPU L1 cache (0.5ns) to transatlantic network fiber (150ms).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Bar List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {LATENCY_NUMBERS.map((metric) => {
          const isSelected = selectedMetric.name === metric.name;
          const Icon = getCategoryIcon(metric.category);

          // Log scale width calculation (min 4%, max 100%)
          const logVal = Math.log10(Math.max(0.5, metric.nanoseconds));
          const percentage = Math.max(5, (logVal / maxLog) * 100);

          return (
            <div
              key={metric.name}
              onClick={() => setSelectedMetric(metric)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--bg-secondary)' : 'transparent',
                border: isSelected ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontWeight: isSelected ? 700 : 500, color: 'var(--text-primary)' }}>
                    {metric.name}
                  </span>
                  <span className="badge badge-blue" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>
                    {metric.category}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {metric.timeDisplay}
                </span>
              </div>

              {/* Visual Relative Bar */}
              <div
                style={{
                  height: '8px',
                  width: '100%',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: metric.category === 'CPU/Memory' 
                      ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' 
                      : metric.category === 'Disk/Flash' 
                      ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' 
                      : 'linear-gradient(90deg, #ef4444, #f87171)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Human Intuition Analogy Box */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <Info size={24} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Human Scaled Analogy (If 1 CPU Cycle = 1 Second):
          </div>
          <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', marginTop: '2px' }}>
            Accessing <strong>{selectedMetric.name}</strong> ({selectedMetric.timeDisplay}) feels like waiting for{' '}
            <strong style={{ color: 'var(--accent-primary)' }}>{selectedMetric.analogy}</strong> in human time!
          </div>
        </div>
      </div>
    </div>
  );
}
