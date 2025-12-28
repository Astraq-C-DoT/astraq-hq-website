"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconBadge } from "@/components/icon-badge";
import { cn, getImageUrl } from "@/lib/utils";
import type { SiteInfo as SiteInfoType } from "@/payload/types";

type ServicesSectionProps = {
  siteInfo: SiteInfoType;
};

export function ServicesSection({ siteInfo }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % siteInfo.services.services.length);
      setAnimationKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [siteInfo.services.services]);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center border-border border-b">
      <div className="flex items-center justify-center gap-6 self-stretch border-border border-b px-6 py-12 md:px-24 md:py-16">
        <div className="flex w-full max-w-[586px] flex-col items-center justify-start gap-4 overflow-hidden rounded-lg px-6 py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)]">
          <IconBadge
            icon={
              <div className="h-[10.50px] w-[10.50px] rounded-full outline-[1.17px] outline-foreground outline-offset-[-0.58px]" />
            }
            text="Platform Features"
          />
          <div className="flex flex-col justify-center self-stretch text-center font-sans font-semibold text-3xl text-secondary-foreground leading-tight tracking-tight md:text-5xl md:leading-[60px]">
            {siteInfo.services.title}
          </div>
          <div className="self-stretch text-center font-normal font-sans text-base text-muted-foreground leading-7">
            {siteInfo.services.description}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start self-stretch overflow-hidden px-4 md:px-9">
        <div className="flex flex-1 flex-col items-center justify-start gap-6 py-8 md:flex-row md:gap-12 md:py-11">
          <div className="order-2 flex w-full flex-col items-center justify-center gap-4 md:order-1 md:w-auto md:max-w-[400px]">
            {siteInfo.services.services.map((service, index) => {
              const isActive = index === activeCard;

              return (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "flex w-full cursor-pointer flex-col items-start justify-start overflow-hidden text-left transition-all duration-300",
                    isActive
                      ? "bg-card shadow-[0px_0px_0px_0.75px_var(--border)_inset]"
                      : "border border-foreground/10",
                  )}
                >
                  <div
                    className={cn(
                      "h-0.5 w-full overflow-hidden bg-foreground/10",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 animate-progress-bar bg-primary/90 will-change-transform"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2 px-6 py-5">
                    <div className="flex flex-col justify-center self-stretch font-sans font-semibold text-secondary-foreground text-sm leading-6">
                      {service.title}
                    </div>
                    <div className="self-stretch whitespace-pre-line font-normal font-sans text-[13px] text-muted-foreground leading-[22px]">
                      {service.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="order-1 flex w-full flex-col items-center justify-center gap-2 rounded-lg px-0 md:order-2 md:w-auto md:px-0">
            <div className="flex h-[250px] w-full flex-col items-start justify-start overflow-hidden rounded-lg bg-card shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] md:h-[420px] md:w-[580px]">
              <div
                className={cn(
                  "relative h-full w-full transition-all duration-300",
                  activeCard === 0
                    ? "bg-linear-to-br from-blue-50 to-blue-100"
                    : activeCard === 1
                      ? "bg-linear-to-br from-purple-50 to-purple-100"
                      : "bg-linear-to-br from-green-50 to-green-100",
                )}
              >
                <Image
                  src={getImageUrl(siteInfo.services.services[activeCard]?.illustration) ?? ""}
                  alt={siteInfo.services.services[activeCard]?.title ?? ""}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
