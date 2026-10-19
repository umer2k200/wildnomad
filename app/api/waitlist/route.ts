import { getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

type Bucket = { count: number; resetAt: number };
const rateLimit = new Map<string, Bucket>();

/** In-memory fallback when Supabase env is not configured (local / pre-wire). */
const localSeen = new Set<string>();

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimit.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (!allowRequest(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      { status: 429 },
    );
  }

  let body: {
    email?: string;
    name?: string;
    city?: string;
    source?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 },
    );
  }

  const source =
    body.source === 'founding' || body.source === 'hero' || body.source === 'faq'
      ? body.source
      : 'hero';
  const name = body.name?.trim() || null;
  const city = body.city?.trim() || null;

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    // Dev / unconfigured: accept without persisting to Supabase
    localSeen.add(email);
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from('waitlist').insert({
    email,
    name,
    city,
    source,
  });

  if (error) {
    // Unique violation — treat as success (never reveal existing signup)
    if (error.code === '23505') {
      return NextResponse.json({ ok: true });
    }
    console.error('[waitlist]', error.message);
    return NextResponse.json(
      { error: 'Something went wrong. Try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
