import { Accordion } from '@/components/ui/Accordion';
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
      </div>
    </section>
  );
}
