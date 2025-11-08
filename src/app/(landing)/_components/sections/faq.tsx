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
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-secondary-foreground font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            {siteInfo.faq.title}
          </div>
          <div className="w-full text-muted-foreground text-base font-normal leading-7 font-sans">
            {siteInfo.faq.description}
          </div>
        </div>

        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <Accordion type="multiple" className="w-full">
            {siteInfo.faq.faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-b border-foreground/20"
              >
                <AccordionTrigger className="px-5 py-[18px] hover:bg-foreground/5 transition-colors duration-200 hover:no-underline [&>svg]:size-6 [&>svg]:text-foreground/60">
                  <div className="flex-1 text-secondary-foreground text-base font-medium leading-6 font-sans text-left">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-[18px] text-muted-foreground text-sm font-normal leading-6 font-sans">
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
