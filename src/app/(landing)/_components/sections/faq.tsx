"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SiteInfo as SiteInfoType } from "@/payload/types";

type FAQSectionProps = {
  siteInfo: SiteInfoType;
};

export function FAQSection({ siteInfo }: FAQSectionProps) {
  return (
    <div className="flex w-full items-start justify-center">
      <div className="flex flex-1 flex-col items-start justify-start gap-6 px-4 py-16 md:px-12 md:py-20 lg:flex-row lg:gap-12">
        <div className="flex w-full flex-col items-start justify-center gap-4 lg:flex-1 lg:py-5">
          <div className="flex w-full flex-col justify-center font-sans font-semibold text-4xl text-secondary-foreground leading-tight tracking-tight md:leading-[44px]">
            {siteInfo.faq.title}
          </div>
          <div className="w-full font-normal font-sans text-base text-muted-foreground leading-7">
            {siteInfo.faq.description}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:flex-1">
          <Accordion type="multiple" className="w-full">
            {siteInfo.faq.faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-foreground/20 border-b"
              >
                <AccordionTrigger className="px-5 py-[18px] transition-colors duration-200 hover:bg-foreground/5 hover:no-underline [&>svg]:size-6 [&>svg]:text-foreground/60">
                  <div className="flex-1 text-left font-medium font-sans text-base text-secondary-foreground leading-6">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-[18px] font-normal font-sans text-muted-foreground text-sm leading-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
