import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CHECKS = [
  'Spare tube, levers and a pump',
  'Rain shell — Khunjerab can be near freezing in August',
  'Cash. ATMs above Gilgit are unreliable',
  'Printed CNIC copies for the check posts',
];

const SPLITS = [
  { label: 'Fuel', amount: 'Rs 4,200', note: 'You paid' },
  { label: 'Ali owes', amount: 'Rs 1,400', note: 'His share of the fuel' },
  { label: 'Sara owes', amount: 'Rs 1,400', note: 'Her share of the fuel' },
];

export function SharedTrip() {
  return (
    <section
      id="trip"
      aria-labelledby="trip-heading"
      className="section-pad bg-bg scroll-mt-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="flex justify-center lg:order-none">
          <PhoneFrame
            tilt={false}
            size="story"
            src="/screenshots/03-plan.png"
            alt="Saved plan from Islamabad toward the north"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="One trip, shared"
            title={<span id="trip-heading">The plan leaves the WhatsApp group.</span>}
            lead="The route, the packing list, who paid, and a live link — on the trip, not across three chats."
            className="mb-8"
          />

          <ul className="space-y-2">
            {CHECKS.map((item) => (
              <li key={item} className="flex items-start gap-3 type-body text-text-secondary">
                <span
                  className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-primary text-[10px] text-primary"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
            {SPLITS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4 last:border-b-0"
              >
                <div>
                  <p className="type-body">{row.label}</p>
                  <p className="type-small text-text-muted">{row.note}</p>
                </div>
                <p className="type-mono text-primary">{row.amount}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 type-small text-text-muted">
            Invite the group on WhatsApp. The live link opens in a browser — no account required to watch.
          </p>
        </div>
      </div>
    </section>
  );
}
