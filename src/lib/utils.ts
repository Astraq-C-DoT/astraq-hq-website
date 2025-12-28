import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Media } from "@/payload/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(media: (number | null) | Media | undefined): string | null {
  if (!media) {
    return null;
  }

  if (typeof media !== "number" && media.url) {
    return media.url;
  }

  if (typeof media === "number") {
    return `/api/media/${media}`;
  }

  return null;
}
