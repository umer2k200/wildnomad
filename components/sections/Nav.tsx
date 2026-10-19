'use client';

import { Button } from '@/components/ui/Button';
import { CTA_LABEL, NAV_LINKS, SITE } from '@/lib/config';
import { scrollToAccess } from '@/lib/scrollToAccess';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-access]'));
    if (nodes.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setShowBar(visible.size === 0 && window.scrollY > 240);
      },
      { threshold: 0.35 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-base ease-out-expo',
        scrolled
          ? 'bg-[rgba(18,18,18,0.8)] backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="Wild Nomad"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
            priority
          />
          <span
            className="font-[family-name:var(--font-sora)] font-bold tracking-[0.08em] text-sm uppercase text-text"
            aria-hidden="true"
          >
            Wild Nomad
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="type-small text-text-muted hover:text-primary transition-colors duration-fast"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button size="md" onClick={scrollToAccess}>
            {CTA_LABEL}
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex size-10 items-center justify-center rounded-md text-text cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-bg lg:hidden flex flex-col"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <ul className="flex flex-col gap-2 px-6 pt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    className="block py-3 type-h3"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto p-6 pb-10">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  scrollToAccess();
                }}
              >
                {CTA_LABEL}
              </Button>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center type-small text-text-secondary hover:text-primary"
              >
                Instagram {SITE.instagram}
              </a>
              <p className="mt-2 type-mono text-text-muted text-center">
                {SITE.tagline}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>

    {showBar && !open ? (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[rgba(18,18,18,0.92)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 lg:px-8">
          <p className="hidden min-w-0 flex-1 type-small text-text-secondary sm:block">
            Android · {SITE.launchWindow}
          </p>
          <Button size="lg" className="w-full sm:w-auto" onClick={scrollToAccess}>
            {CTA_LABEL}
          </Button>
        </div>
      </div>
    ) : null}
    </>
  );
}
