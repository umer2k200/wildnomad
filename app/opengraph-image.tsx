import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from '@/lib/config';

export const runtime = 'nodejs';
export const alt = `Wild Nomad — Ride Pakistan. ${SITE.stopCount} verified stops across Pakistan.`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  let logoSrc: string | null = null;
  try {
    const bytes = await readFile(join(process.cwd(), 'public/logo.png'));
    logoSrc = `data:image/png;base64,${bytes.toString('base64')}`;
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#121212',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 80% 20%, rgba(217,100,44,0.28), transparent 45%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              width={64}
              height={64}
              alt=""
              style={{ borderRadius: 12 }}
            />
          ) : null}
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#F2EFEA',
              textTransform: 'uppercase',
            }}
          >
            Wild Nomad
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F2EFEA',
              maxWidth: 900,
            }}
          >
            Ride Pakistan like you&apos;ve been here before.
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#A8A29B',
              fontFamily: 'monospace',
            }}
          >
            {SITE.stopCount} verified stops across Pakistan
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#D9642C',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#D9642C',
            }}
          />
          Ride Pakistan
        </div>
      </div>
    ),
    { ...size },
  );
}
