"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn, getImageUrl } from "@/lib/utils";
import type { Product } from "@/payload/types";
import { FeatureCard } from "../feature-card";

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);
  const productCount = products.length;

  useEffect(() => {
    if (productCount === 0) return;

    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % productCount);
          }
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      mountedRef.current = false;
    };
  }, [productCount]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return;
    setActiveCard(index);
    setProgress(0);
  };

  if (productCount === 0) {
    return null;
  }

  return (
    <>
      <div className="relative z-5 my-8 mb-0 flex w-full max-w-[960px] flex-col items-center justify-center gap-2 px-2 pt-2 pb-6 sm:my-12 sm:px-4 sm:pt-4 sm:pb-8 md:my-16 md:px-6 md:pb-10 lg:my-16 lg:w-[960px] lg:px-11 lg:pb-0">
        <div className="flex h-[200px] w-full max-w-[960px] flex-col items-start justify-start overflow-hidden rounded-[6px] bg-card shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] sm:h-[280px] sm:rounded-[8px] md:h-[450px] lg:h-[695.55px] lg:w-[960px] lg:rounded-[9.06px]">
          <div className="flex flex-1 items-start justify-start self-stretch">
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-full w-full overflow-hidden">
                {products.map((product, index) => {
                  const firstImage = product.images?.[0]?.image;
                  const imageUrl = getImageUrl(firstImage) ?? getImageUrl(product.thumbnailImage);
                  if (!imageUrl) return null;

                  return (
                    <div
                      key={product.id}
                      className={cn(
                        "absolute inset-0 transition-all duration-500 ease-in-out",
                        activeCard === index
                          ? "scale-100 opacity-100 blur-0"
                          : "scale-95 opacity-0 blur-sm",
                      )}
                    >
                      <Image src={imageUrl} alt={product.title} fill className="object-cover" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center self-stretch border-border/70 border-t border-b">
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

        <div className="flex flex-1 flex-col items-stretch justify-center gap-0 px-0 sm:px-2 md:flex-row md:px-0">
          {products.map((product, index) => (
            <FeatureCard
              key={product.id}
              title={product.title}
              description={product.description || ""}
              isActive={activeCard === index}
              progress={activeCard === index ? progress : 0}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="-left-10 absolute top-[-120px] flex w-[120px] flex-col items-start justify-start sm:left-[-50px] sm:w-[140px] md:left-[-58px] md:w-[162px]">
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
    </>
  );
}
