import Image from "next/image";
import type React from "react";
import { cn } from "@/lib/utils";

interface YourWorkInSyncProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

export function YourWorkInSync({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}: YourWorkInSyncProps) {
  const themeVars =
    theme === "light"
      ? {
          "--yws-surface": "#ffffff",
          "--yws-text-primary": "#37322f",
          "--yws-text-secondary": "#6b7280",
          "--yws-bubble-light": "#e8e5e3",
          "--yws-bubble-dark": "#37322f",
          "--yws-bubble-white": "#ffffff",
          "--yws-border": "rgba(0,0,0,0.08)",
          "--yws-shadow": "rgba(0,0,0,0.08)",
        }
      : ({
          "--yws-surface": "#1f2937",
          "--yws-text-primary": "#f9fafb",
          "--yws-text-secondary": "#d1d5db",
          "--yws-bubble-light": "#374151",
          "--yws-bubble-dark": "#111827",
          "--yws-bubble-white": "#ffffff",
          "--yws-border": "rgba(255,255,255,0.12)",
          "--yws-shadow": "rgba(0,0,0,0.24)",
        } as React.CSSProperties);

  const imgFrame2147223205 = "/professional-woman-avatar-with-short-brown-hair-an.jpg";
  const imgFrame2147223206 = "/professional-man-avatar-with-beard-and-glasses-loo.jpg";
  const imgFrame2147223207 = "/professional-person-avatar-with-curly-hair-and-war.jpg";
  const imgArrowUp =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m5 12 7-7 7 7'/%3E%3Cpath d='M12 19V5'/%3E%3C/svg%3E";

  return (
    <div
      className={cn("relative bg-transparent", className)}
      style={{
        width,
        height,
        ...(themeVars as React.CSSProperties),
      }}
      role="img"
      aria-label="Chat conversation showing team collaboration sync"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[356px] h-[216px]">
        <div className="relative w-[356px] h-[216px] scale-110">
          <div className="absolute left-0 top-0 flex items-start gap-[10px] w-[356px] h-9">
            <div
              className="w-9 h-9 rounded-full border shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${imgFrame2147223205}')`,
                borderColor: "var(--yws-border)",
              }}
            />
            <div
              className="rounded-full px-3 h-9 flex items-center justify-center"
              style={{
                background: theme === "light" ? "#e8e5e3" : "var(--yws-bubble-light)",
              }}
            >
              <span
                className="font-medium text-[13px] leading-4 tracking-[-0.4px] whitespace-nowrap"
                style={{
                  color: theme === "light" ? "#37322f" : "var(--yws-text-primary)",
                }}
              >
                Team updates flow seamlessly
              </span>
            </div>
          </div>

          <div className="absolute right-0 top-[60px] flex items-start justify-end gap-[10px]">
            <div
              className="rounded-full px-3 h-9 flex items-center justify-center"
              style={{
                background: theme === "light" ? "#37322f" : "var(--yws-bubble-dark)",
              }}
            >
              <span className="font-medium text-[13px] leading-4 tracking-[-0.4px] text-white whitespace-nowrap">
                Hi everyone
              </span>
            </div>
            <div
              className="w-9 h-9 rounded-full border shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${imgFrame2147223206}')`,
                borderColor: "var(--yws-border)",
              }}
            />
          </div>

          <div className="absolute left-0 top-[120px] flex items-start gap-[10px] w-[210px] h-9">
            <div
              className="w-9 h-9 rounded-full border shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${imgFrame2147223207}')`,
                borderColor: "var(--yws-border)",
              }}
            />
            <div
              className="rounded-full px-3 h-9 flex items-center justify-center"
              style={{
                background: theme === "light" ? "#e8e5e3" : "var(--yws-bubble-light)",
              }}
            >
              <span
                className="font-medium text-[13px] leading-4 tracking-[-0.4px] whitespace-nowrap"
                style={{
                  color: theme === "light" ? "#37322f" : "var(--yws-text-primary)",
                }}
              >
                How about this instead?
              </span>
            </div>
          </div>

          <div className="absolute left-[146px] top-[180px] flex items-center gap-[10px] h-9">
            <div
              className="bg-white rounded-[16px] px-3 h-9 flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 1px 2px -0.4px rgba(0,0,0,0.08)",
              }}
            >
              <span className="font-normal text-sm leading-5 text-gray-950 whitespace-nowrap">
                Great work, everyone!
              </span>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shrink-0"
              style={{
                background: theme === "light" ? "#37322f" : "var(--yws-bubble-dark)",
                boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src={imgArrowUp || "/placeholder.svg"}
                alt="Send"
                width={20}
                height={20}
                className="brightness-0 invert(1)"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
