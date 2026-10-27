import { NextRequest, NextResponse } from 'next/server';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: QUIZ_QUESTIONS.length,
    data: QUIZ_QUESTIONS
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers: Record<string, string> = body.answers || {};

    let correctCount = 0;
    const review = QUIZ_QUESTIONS.map((q) => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find((opt) => opt.id === selectedOptionId);
      const correctOption = q.options.find((opt) => opt.isCorrect);

      const isCorrect = selectedOption?.isCorrect ?? false;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        title: q.title,
        selectedOptionId,
        correctOptionId: correctOption?.id,
        isCorrect,
        architecturalInsight: q.architecturalInsight,
        explanation: selectedOption?.explanation || correctOption?.explanation
      };
    });

    const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    let rank = 'Junior Systems Engineer';
    if (percentage === 100) {
      rank = 'Principal / Staff System Architect (L6+)';
    } else if (percentage >= 66) {
      rank = 'Senior Distributed Systems Engineer (L5)';
    } else if (percentage >= 33) {
      rank = 'Mid-Level Systems Engineer (L4)';
    }

    return NextResponse.json({
      success: true,
      totalQuestions: QUIZ_QUESTIONS.length,
      correctCount,
      percentage,
      rank,
      review
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to evaluate quiz' },
      { status: 500 }
    );
  }
}
