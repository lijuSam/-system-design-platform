import React from 'react';
import QuizRunner from '@/components/QuizRunner';
import { CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'System Design Interview Readiness Assessment | SystemCraft Pro',
  description: 'Test your distributed system architecture knowledge against real-world production scenarios. Receive instant feedback and staff engineer trade-off rankings.'
};

export default function QuizPage() {
  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-purple">
            <CheckCircle2 size={14} />
            <span>Interactive Assessment</span>
          </span>
          <span className="badge badge-green">FAANG / Staff+ Scenarios</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>
          System Design Interview Self-Assessment
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Solve realistic distributed systems incidents and architectural bottlenecks. Test your understanding of cache stampedes, financial idempotency keys, and wide-column chat partitioning.
        </p>
      </div>

      {/* Quiz Runner Interactive Component */}
      <QuizRunner />
    </div>
  );
}
