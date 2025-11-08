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
      <div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="w-full max-w-[748.71px] lg:w-[748.71px] text-center flex justify-center flex-col text-foreground text-[24px] xs:text-[28px] sm:text-[36px] md:text-[52px] lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-none font-serif px-2 sm:px-4 md:px-0">
            {siteInfo.title}
          </div>
          <div className="w-full max-w-[506.08px] lg:w-[506.08px] text-center flex justify-center flex-col text-foreground/80 sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-normal lg:leading-7 font-sans px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
            {siteInfo.subtitle}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[497px] lg:w-[497px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <div className="backdrop-blur-[8.25px] flex justify-start items-center gap-4">
          <Button
            asChild
            variant="default"
            className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full"
          >
            <Link href={company.contactUsUrl}>
              <div className="w-20 sm:w-24 md:w-28 lg:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-linear-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
              <div className="flex flex-col justify-center text-primary-foreground text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans relative z-10">
                Contact Us
              </div>
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute top-[232px] sm:top-[248px] md:top-[264px] lg:top-[320px] left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
        <Image
          src="/mask-group-pattern.svg"
          alt=""
          width={2808}
          height={2808}
          className="w-[936px] sm:w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-30 sm:opacity-40 md:opacity-50 mix-blend-multiply hue-rotate-15 saturate-70 brightness-120"
        />
      </div>
    </>
  );
}
