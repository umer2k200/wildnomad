import { Accordion } from '@/components/ui/Accordion';
import { PlayStoreButton } from '@/components/ui/PlayStoreButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ_ITEMS } from '@/data/faq';

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

        <div id="faq-access" data-access className="mx-auto mt-14 flex max-w-lg flex-col items-center">
          <p className="type-h3 mb-4 text-center">Get it on your phone.</p>
          <PlayStoreButton />
          <p className="mt-3 text-center type-small text-text-muted">
            Free on Android. iPhone follows.
          </p>
        </div>
      </div>
    </section>
  );
}
