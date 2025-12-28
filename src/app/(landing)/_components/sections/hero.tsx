import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Company as CompanyType, SiteInfo as SiteInfoType } from "@/payload/types";

type HeroSectionProps = {
  company: CompanyType;
  siteInfo: SiteInfoType;
};

export function HeroSection({ company, siteInfo }: HeroSectionProps) {
  return (
    <>
      <div className="flex w-full max-w-[937px] flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:w-[937px] lg:gap-6">
        <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-[3px] sm:gap-5 md:gap-6 lg:gap-8">
          <div className="flex w-full max-w-[748.71px] flex-col justify-center px-2 text-center font-normal font-serif text-[24px] text-foreground xs:text-[28px] leading-[1.1] sm:px-4 sm:text-[36px] sm:leading-[1.15] md:px-0 md:text-[52px] md:leading-[1.2] lg:w-[748.71px] lg:text-[80px] lg:leading-none">
            {siteInfo.title}
          </div>
          <div className="flex w-full max-w-[506.08px] flex-col justify-center px-2 text-center font-medium font-sans text-foreground/80 text-sm leading-[1.4] sm:px-4 sm:text-lg sm:leading-[1.45] md:px-0 md:text-xl md:leading-normal lg:w-[506.08px] lg:text-lg lg:leading-7">
            {siteInfo.subtitle}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex w-full max-w-[497px] flex-col items-center justify-center gap-6 sm:mt-8 sm:gap-8 md:mt-10 md:gap-10 lg:mt-12 lg:w-[497px] lg:gap-12">
        <div className="flex items-center justify-start gap-4 backdrop-blur-[8.25px]">
          <Button
            asChild
            variant="default"
            className="relative h-10 overflow-hidden rounded-full px-6 py-2 shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] sm:h-11 sm:px-8 sm:py-[6px] md:h-12 md:px-10 lg:px-12"
          >
            <Link href={company.contactUsUrl}>
              <div className="absolute top-[-0.5px] left-0 h-[41px] w-20 bg-linear-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply sm:w-24 md:w-28 lg:w-44" />
              <div className="relative z-10 flex flex-col justify-center font-medium font-sans text-primary-foreground text-sm leading-5 sm:text-base md:text-[15px]">
                Contact Us
              </div>
            </Link>
          </Button>
        </div>
      </div>

      <div className="-translate-x-1/2 pointer-events-none absolute top-[232px] left-1/2 z-0 transform sm:top-[248px] md:top-[264px] lg:top-[320px]">
        <Image
          src="/mask-group-pattern.svg"
          alt=""
          width={2808}
          height={2808}
          className="h-auto w-[936px] opacity-30 mix-blend-multiply brightness-120 hue-rotate-15 saturate-70 sm:w-[1404px] sm:opacity-40 md:w-[2106px] md:opacity-50 lg:w-[2808px]"
        />
      </div>
    </>
  );
}
