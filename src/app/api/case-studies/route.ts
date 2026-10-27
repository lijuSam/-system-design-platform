import { NextRequest, NextResponse } from 'next/server';
import { CASE_STUDIES } from '@/data/caseStudies';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const company = searchParams.get('company');
  const search = searchParams.get('search')?.toLowerCase();

  let results = [...CASE_STUDIES];

  if (company && company !== 'All') {
    results = results.filter((cs) => cs.company.toLowerCase() === company.toLowerCase());
  }

  if (search) {
    results = results.filter(
      (cs) =>
        cs.title.toLowerCase().includes(search) ||
        cs.company.toLowerCase().includes(search) ||
        cs.tagline.toLowerCase().includes(search) ||
        cs.components.some((comp) => comp.name.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results
  });
}
