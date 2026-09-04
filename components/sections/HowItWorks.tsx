import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  {
    n: '01',
    title: 'Plan',
    copy: 'Pick start and destination. Bike or car routing, fuel cost, packing checklist, and the weather waiting for you.',
  },
  {
    n: '02',
    title: 'Ride',
    copy: 'Live GPS in the background. Road alerts ahead of you. Share your location — and SOS if you need it.',
  },
  {
    n: '03',
    title: 'Pin',
    copy: "Found a stop that isn't on the map? Pin it, review it. Once it's verified, every rider behind you gets it.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="section-pad bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          title={<span id="how-heading">How it works</span>}
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <article className="relative text-center md:text-left pt-6">
                <span
                  className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 md:left-0 md:translate-x-0 type-stat text-primary/55 select-none"
                  aria-hidden
                >
                  {step.n}
                </span>
                <div className="relative pt-10 md:pt-12">
                  <h3 className="type-h3 mb-3">{step.title}</h3>
                  <p className="type-body text-text-secondary max-w-prose-narrow mx-auto md:mx-0">
                    {step.copy}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
