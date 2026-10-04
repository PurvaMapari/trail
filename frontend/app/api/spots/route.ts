import { NextRequest, NextResponse } from 'next/server';
import { curated_spots, Spot } from '@/data/spots';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const quarter = searchParams.get('quarter');
  const highlightedOnly = searchParams.get('highlighted') === 'true';

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

  let spots: Spot[] = curated_spots;
  let source = 'local-curated-dataset';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${backendUrl}/api/spots`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.spots) && data.spots.length > 0) {
        spots = data.spots;
        source = 'backend-scout-api';
      }
    }
  } catch (err) {
    // Fallback gracefully to local curated_spots
  }

  // Filter if query params provided
  let filtered = [...spots];
  if (category && category !== 'all') {
    filtered = filtered.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (quarter) {
    filtered = filtered.filter((s) =>
      s.location.quarter.toLowerCase().includes(quarter.toLowerCase())
    );
  }
  if (highlightedOnly) {
    filtered = filtered.filter((s) => s.highlighted);
  }

  return NextResponse.json({
    status: 'ok',
    source,
    total: spots.length,
    returned: filtered.length,
    spots: filtered,
  });
}
