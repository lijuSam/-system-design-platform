'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, Sparkles, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

interface EvaluationResponse {
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  rank: string;
  review: {
    questionId: string;
    title: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    architecturalInsight: string;
    explanation: string;
  }[];
}

export default function QuizRunner() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evalResult, setEvalResult] = useState<EvaluationResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSelect = (questionId: string, optionId: string) => {
    if (evalResult) return; // Locked once submitted
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      if (data.success) {
        setEvalResult(data);
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setEvalResult(null);
  };

  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Quiz Evaluation Banner */}
      {evalResult && (
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Award size={28} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                  Assessed Readiness Level
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {evalResult.rank}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  You scored {evalResult.correctCount} out of {evalResult.totalQuestions} ({evalResult.percentage}%) on senior distributed system trade-offs.
                </p>
              </div>
            </div>

            <button onClick={handleReset} className="btn btn-secondary btn-sm">
              <RotateCcw size={14} />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOptionId = answers[q.id];
          const reviewItem = evalResult?.review.find((r) => r.questionId === q.id);

          return (
            <div
              key={q.id}
              className="card"
              style={{
                padding: '24px',
                border: reviewItem
                  ? reviewItem.isCorrect
                    ? '1.5px solid var(--accent-emerald)'
                    : '1.5px solid var(--accent-rose)'
                  : '1px solid var(--border-medium)'
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-blue">Scenario #{idx + 1}</span>
                  <span className="badge badge-purple">{q.category}</span>
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Difficulty: {q.difficulty}
                </span>
              </div>

              {/* Title & Scenario */}
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {q.title}
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                {q.scenario}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let borderStyle = '1px solid var(--border-medium)';
                  let bgStyle = 'var(--bg-surface)';

                  if (evalResult) {
                    if (opt.isCorrect) {
                      borderStyle = '2px solid var(--accent-emerald)';
                      bgStyle = 'var(--accent-emerald-light)';
                    } else if (isSelected && !opt.isCorrect) {
                      borderStyle = '2px solid var(--accent-rose)';
                      bgStyle = 'var(--accent-rose-light)';
                    }
                  } else if (isSelected) {
                    borderStyle = '2px solid var(--accent-primary)';
                    bgStyle = 'var(--accent-light)';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: borderStyle,
                        backgroundColor: bgStyle,
                        cursor: evalResult ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '6px solid var(--accent-primary)' : '2px solid var(--border-medium)',
                          flexShrink: 0,
                          marginTop: '2px',
                          backgroundColor: '#ffffff'
                        }}
                      />
                      <div style={{ flex: 1, fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        {opt.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation Review (Shown after submit) */}
              {reviewItem && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: reviewItem.isCorrect ? 'var(--accent-emerald-light)' : 'var(--accent-rose-light)',
                    border: `1px solid ${reviewItem.isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {reviewItem.isCorrect ? (
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
                    ) : (
                      <XCircle size={18} style={{ color: 'var(--accent-rose)' }} />
                    )}
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: reviewItem.isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                      {reviewItem.isCorrect ? 'Correct Decision!' : 'Suboptimal Trade-off Selected'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.5 }}>
                    {reviewItem.explanation}
                  </p>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    💡 <strong>Staff Architect Insight:</strong> {reviewItem.architecturalInsight}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!evalResult && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
            className="btn btn-primary btn-lg"
            style={{ opacity: allAnswered ? 1 : 0.6, minWidth: '220px' }}
          >
            <Sparkles size={18} />
            <span>{isSubmitting ? 'Evaluating System Design...' : 'Submit Answers & Get Rank'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
