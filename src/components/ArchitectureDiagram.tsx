'use client';

import React, { useState } from 'react';
import { Play, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { CaseStudy } from '@/types';

interface Props {
  caseStudy: CaseStudy;
}

export default function ArchitectureDiagram({ caseStudy }: Props) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentFlow = caseStudy.architectureFlow.find((f) => f.step === activeStep) || caseStudy.architectureFlow[0];

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={20} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
            Interactive End-to-End Request Pipeline
          </h3>
        </div>

        {/* Step buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {caseStudy.architectureFlow.map((flow) => (
            <button
              key={flow.step}
              onClick={() => setActiveStep(flow.step)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: activeStep === flow.step ? '1px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                background: activeStep === flow.step ? 'var(--accent-light)' : 'var(--bg-surface)',
                color: activeStep === flow.step ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Step {flow.step}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Pipeline Sequence */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}
      >
        {caseStudy.architectureFlow.map((flow) => {
          const isActive = flow.step === activeStep;
          const isPassed = flow.step < activeStep;

          return (
            <div
              key={flow.step}
              onClick={() => setActiveStep(flow.step)}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: isActive
                  ? '2px solid var(--accent-primary)'
                  : isPassed
                  ? '1px solid var(--accent-emerald)'
                  : '1px solid var(--border-light)',
                backgroundColor: isActive
                  ? 'var(--bg-secondary)'
                  : isPassed
                  ? 'var(--accent-emerald-light)'
                  : 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent-primary)' : isPassed ? 'var(--accent-emerald)' : 'var(--text-muted)'
                  }}
                >
                  Step {flow.step}
                </span>
                {isPassed && <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)' }} />}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {flow.component}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Explanation Banner */}
      <div
        style={{
          padding: '18px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '4px solid var(--accent-primary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
            Step {currentFlow.step} Execution:
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {currentFlow.title}
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {currentFlow.description}
        </p>
      </div>
    </div>
  );
}
