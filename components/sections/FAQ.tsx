import { Accordion } from '@/components/ui/Accordion';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ_ITEMS } from '@/data/faq';
import { LAUNCH_STATE, SITE } from '@/lib/config';

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-pad bg-bg scroll-mt-20"
    >
      <div className="mx-auto max-w-[800px] px-5 lg:px-8">
        <SectionHeading
          align="center"
          title={<span id="faq-heading">Questions before you ride</span>}
        />
        <Accordion items={FAQ_ITEMS} />

        <div id="faq-access" data-access className="mx-auto mt-14 max-w-lg">
          <p className="type-h3 mb-4 text-center">Get it the day it launches.</p>
          <EmailCapture source="faq" variant="stacked" />
          {LAUNCH_STATE === 'prelaunch' ? (
            <p className="mt-3 text-center type-small text-text-muted">
              Android in {SITE.launchWindow}. iOS follows.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
