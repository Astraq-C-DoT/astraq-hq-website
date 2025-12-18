import Image from "next/image";
import { IconBadge } from "@/components/icon-badge";
import { cn, getImageUrl } from "@/lib/utils";
import type { SiteInfo as SiteInfoType } from "@/payload/types";

type BackedBySectionProps = {
  siteInfo: SiteInfoType;
};

export function BackedBySection({ siteInfo }: BackedBySectionProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center border-border border-b">
      <div className="flex items-center justify-center gap-6 self-stretch border-border border-b px-4 py-8 sm:px-6 sm:py-12 md:px-24 md:py-16">
        <div className="flex w-full max-w-[586px] flex-col items-center justify-start gap-3 overflow-hidden rounded-lg px-4 py-4 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] sm:gap-4 sm:px-6 sm:py-5">
          <IconBadge
            icon={
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Social Proof"
                className="text-foreground"
              >
                <rect
                  x="1"
                  y="3"
                  width="4"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <rect
                  x="7"
                  y="1"
                  width="4"
                  height="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <rect x="2" y="4" width="1" height="1" fill="currentColor" />
                <rect x="3.5" y="4" width="1" height="1" fill="currentColor" />
                <rect x="2" y="5.5" width="1" height="1" fill="currentColor" />
                <rect x="3.5" y="5.5" width="1" height="1" fill="currentColor" />
                <rect x="8" y="2" width="1" height="1" fill="currentColor" />
                <rect x="9.5" y="2" width="1" height="1" fill="currentColor" />
                <rect x="8" y="3.5" width="1" height="1" fill="currentColor" />
                <rect x="9.5" y="3.5" width="1" height="1" fill="currentColor" />
                <rect x="8" y="5" width="1" height="1" fill="currentColor" />
                <rect x="9.5" y="5" width="1" height="1" fill="currentColor" />
              </svg>
            }
            text="Backed By"
          />
          <div className="flex w-full max-w-[472.55px] flex-col justify-center text-center font-sans font-semibold text-secondary-foreground text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl md:leading-[60px] lg:text-5xl">
            {siteInfo.backedBy.title}
          </div>
          <div className="self-stretch text-center font-normal font-sans text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
            {siteInfo.backedBy.description}
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center self-stretch border-border border-t border-b-0">
        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="absolute top-[-120px] left-[-40px] flex w-[120px] flex-col items-start justify-start sm:left-[-50px] sm:w-[140px] md:left-[-58px] md:w-[162px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={i}
                className="-rotate-45 h-3 origin-top-left self-stretch outline-[0.5px] outline-foreground/10 outline-offset-[-0.25px] sm:h-4"
              />
            ))}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-0 border-border border-r border-l sm:grid-cols-4 md:grid-cols-4">
          {siteInfo.backedBy.backers.map((backer, index) => {
            const isMobileFirstColumn = index % 2 === 0;
            const isDesktopFirstColumn = index % 4 === 0;
            const isDesktopLastColumn = index % 4 === 3;
            const isDesktopTopRow = index < 4;
            const isDesktopBottomRow = index >= 4;

            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={index}
                className={cn(
                  "flex h-24 xs:h-28 items-center justify-center gap-1 xs:gap-2 sm:h-32 sm:gap-3 md:h-36 lg:h-40",
                  "border-border/60 border-b",
                  index < 6 ? "sm:border-b-[0.5px]" : "sm:border-b",
                  index >= 6 ? "border-b" : "",
                  isMobileFirstColumn ? "border-r-[0.5px]" : "",
                  "sm:border-r-[0.5px] sm:border-l-0",
                  isDesktopFirstColumn ? "md:border-l" : "md:border-l-[0.5px]",
                  isDesktopLastColumn ? "md:border-r" : "md:border-r-[0.5px]",
                  isDesktopTopRow ? "md:border-b-[0.5px]" : "",
                  isDesktopBottomRow ? "md:border-t-[0.5px] md:border-b" : "",
                  "border-border/60",
                )}
              >
                <div className="relative h-6 xs:h-7 w-6 xs:w-7 overflow-hidden rounded-full shadow-[0px_-4px_8px_rgba(255,255,255,0.64)_inset] sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10">
                  <Image
                    src={getImageUrl(backer.logo) ?? ""}
                    alt={backer.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center text-center font-medium font-sans text-foreground text-sm xs:text-base leading-tight sm:text-lg md:text-xl md:leading-9 lg:text-2xl">
                  {backer.name}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="absolute top-[-120px] left-[-40px] flex w-[120px] flex-col items-start justify-start sm:left-[-50px] sm:w-[140px] md:left-[-58px] md:w-[162px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={i}
                className="-rotate-45 h-3 origin-top-left self-stretch outline-[0.5px] outline-foreground/10 outline-offset-[-0.25px] sm:h-4"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
