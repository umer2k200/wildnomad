'use client';

import { Button } from '@/components/ui/Button';
import { CTA_LABEL, LAUNCH_STATE, PLAY_STORE_URL } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailCaptureProps = {
  source: 'hero' | 'founding';
  variant?: 'pill' | 'stacked';
  showName?: boolean;
  showCity?: boolean;
  buttonLabel?: string;
  className?: string;
};

export function EmailCapture({
  source,
  variant = 'pill',
  showName = false,
  showCity = false,
  buttonLabel,
  className,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const reduceMotion = useReducedMotion();

  const label =
    buttonLabel ??
    (source === 'founding' ? 'Claim a spot' : CTA_LABEL);

  if (LAUNCH_STATE === 'live') {
    return (
      <div className={className}>
        <Button
          size="pill"
          className="w-full sm:w-auto"
          onClick={() => {
            if (PLAY_STORE_URL) {
              window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          Download on Google Play
        </Button>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          city: city.trim() || undefined,
          source,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? 'Something went wrong. Try again.');
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-pill border border-border bg-surface px-5 py-4"
            role="status"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
              <Check className="size-4" aria-hidden />
            </span>
            <p className="type-small text-text">
              You&apos;re on the list. Check your inbox before launch.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            className={cn(
              variant === 'pill' &&
                'flex flex-col gap-3 rounded-2xl border border-border-strong bg-[rgba(18,18,18,0.72)] p-2 backdrop-blur-md sm:flex-row sm:items-stretch sm:rounded-pill sm:border-border sm:bg-surface sm:p-1.5 sm:backdrop-blur-none',
              variant === 'stacked' && 'flex flex-col gap-3',
            )}
          >
            {showName ? (
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  'h-12 w-full rounded-md border border-border bg-surface px-4 text-text type-body',
                  'placeholder:text-text-muted focus:outline-none focus:border-primary',
                  'transition-colors duration-fast',
                )}
              />
            ) : null}
            {showCity ? (
              <input
                type="text"
                name="city"
                autoComplete="address-level2"
                placeholder="City (optional)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(
                  'h-12 w-full rounded-md border border-border bg-surface px-4 text-text type-body',
                  'placeholder:text-text-muted focus:outline-none focus:border-primary',
                  'transition-colors duration-fast',
                )}
              />
            ) : null}

            <div
              className={cn(
                variant === 'pill' &&
                  'flex flex-1 flex-col gap-2 sm:flex-row sm:gap-0',
                variant === 'stacked' && 'contents',
              )}
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${source}-email-error` : undefined}
                className={cn(
                  'h-12 w-full flex-1 px-4 text-text type-body',
                  'placeholder:text-text-muted focus:outline-none',
                  'transition-colors duration-fast',
                  variant === 'pill' &&
                    'rounded-xl border border-border-strong bg-surface sm:rounded-pill sm:border-0 sm:bg-transparent',
                  variant === 'stacked' &&
                    'rounded-md border border-border bg-surface focus:border-primary',
                  error && 'border-danger',
                )}
              />
              <Button
                type="submit"
                size="pill"
                loading={loading}
                className={cn(
                  'shrink-0',
                  variant === 'pill' && 'w-full sm:w-auto sm:min-w-[160px]',
                  variant === 'stacked' && 'w-full',
                )}
              >
                {label}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {error && !success ? (
        <p
          id={`${source}-email-error`}
          className="mt-2 type-small text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
