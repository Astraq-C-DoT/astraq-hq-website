import Image from "next/image";
import type React from "react";
import { cn } from "@/lib/utils";

interface SmartSimpleBrilliantProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  theme?: "light" | "dark";
}

export function SmartSimpleBrilliant({
  width = 482,
  height = 300,
  className = "",
  theme = "dark",
}: SmartSimpleBrilliantProps) {
  const themeVars =
    theme === "light"
      ? {
          "--ssb-surface": "#ffffff",
          "--ssb-text": "#1b1919",
          "--ssb-border": "rgba(0,0,0,0.08)",
          "--ssb-inner-border": "rgba(0,0,0,0.12)",
          "--ssb-shadow": "rgba(0,0,0,0.12)",
        }
      : ({
          "--ssb-surface": "#333937",
          "--ssb-text": "#f8f8f8",
          "--ssb-border": "rgba(255,255,255,0.16)",
          "--ssb-inner-border": "rgba(255,255,255,0.12)",
          "--ssb-shadow": "rgba(0,0,0,0.28)",
        } as React.CSSProperties);

  const img = "http://localhost:3845/assets/1b1e60b441119fb176db990a3c7fe2670a764855.svg";
  const img1 = "http://localhost:3845/assets/a502f04ccfc3811f304b58a3a982a5b6fa070e91.svg";
  const img2 = "http://localhost:3845/assets/9c07375bf3b9f1f1d8a0a24447829eb6f54fa928.svg";
  const img3 = "http://localhost:3845/assets/19500d66798ef5ea9dc9d5f971cd0e9c29674bd3.svg";

  return (
    <div
      className={cn("relative bg-transparent flex items-center justify-center", className)}
      style={{
        width,
        height,
        ...(themeVars as React.CSSProperties),
      }}
      role="img"
      aria-label="Two calendar cards with colored event rows"
    >
      <div className="relative w-[295.297px] h-[212.272px] scale-[1.2]">
        <div className="absolute left-[123.248px] top-0 w-0 h-0">
          <div className="rotate-[5deg] origin-center">
            <div
              className="w-[155.25px] bg-white rounded-[9px] p-1.5"
              style={{
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.07)",
              }}
            >
              <div
                className="w-full h-[51px] rounded-[4px] overflow-hidden flex"
                style={{
                  background: "rgba(245,158,11,0.1)",
                }}
              >
                <div className="w-[2.25px] bg-[#F59E0B]" />
                <div className="p-[4.5px] w-full">
                  <div className="flex gap-[3px] items-center">
                    <span className="font-medium text-[9px] text-[#92400E]">2:00</span>
                    <span className="font-medium text-[9px] text-[#92400E]">PM</span>
                    <div className="bg-[#92400E] p-[1.5px] rounded-full">
                      <div className="w-2 h-2 overflow-hidden relative">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt="video"
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-[9px] text-[#92400E]">1:1 with Heather</div>
                </div>
              </div>

              <div
                className="w-full h-[79.5px] rounded-[4px] overflow-hidden mt-[3px] flex"
                style={{
                  background: "rgba(14,165,233,0.1)",
                }}
              >
                <div className="w-[2.25px] bg-[#0EA5E9]" />
                <div className="p-[4.5px] w-full">
                  <div className="flex gap-[3px] items-center">
                    <span className="font-medium text-[9px] text-[#0C4A6E]">2:00</span>
                    <span className="font-medium text-[9px] text-[#0C4A6E]">PM</span>
                    <div className="bg-[#0C4A6E] p-[1.5px] rounded-full">
                      <div className="w-2 h-2 overflow-hidden relative">
                        <Image
                          src={img1 || "/placeholder.svg"}
                          alt="video"
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-[9px] text-[#0C4A6E]">
                    Concept Design Review II
                  </div>
                </div>
              </div>

              <div
                className="w-full h-[51px] rounded-[4px] overflow-hidden mt-[3px] flex"
                style={{
                  background: "rgba(16,185,129,0.1)",
                }}
              >
                <div className="w-[2.25px] bg-[#10B981]" />
                <div className="p-[4.5px] w-full">
                  <div className="flex gap-[3px] items-center">
                    <span className="font-medium text-[9px] text-[#064E3B]">9:00</span>
                    <span className="font-medium text-[9px] text-[#064E3B]">AM</span>
                  </div>
                  <div className="font-semibold text-[9px] text-[#064E3B]">Webinar: Figma ...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-[6.075px] w-[155.25px]">
          <div className="-rotate-[5deg] origin-center">
            <div
              className="w-[155.25px] bg-white rounded-[9px] p-1.5"
              style={{
                boxShadow:
                  "-8px 6px 11.3px rgba(0,0,0,0.12), 0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-full h-[51px] rounded-[4px] overflow-hidden flex"
                style={{
                  background: "rgba(139,92,246,0.1)",
                }}
              >
                <div className="w-[2.25px] bg-[#8B5CF6]" />
                <div className="p-[4.5px] w-full">
                  <div className="flex gap-[3px] items-center">
                    <span className="font-medium text-[9px] text-[#581C87]">11:00</span>
                    <span className="font-medium text-[9px] text-[#581C87]">AM</span>
                    <div className="bg-[#581C87] p-[1.5px] rounded-full">
                      <div className="w-2 h-2 overflow-hidden relative">
                        <Image
                          src={img2 || "/placeholder.svg"}
                          alt="video"
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-[9px] text-[#581C87]">
                    Onboarding Presentation
                  </div>
                </div>
              </div>

              <div className="w-full h-[51px] rounded-[4px] overflow-hidden mt-[3px] flex bg-[#FFE4E6]">
                <div className="w-[2.25px] bg-[#F43F5E]" />
                <div className="p-[4.5px] w-full">
                  <div className="flex gap-[3px] items-center">
                    <span className="font-medium text-[9px] text-[#BE123C]">4:00</span>
                    <span className="font-medium text-[9px] text-[#BE123C]">PM</span>
                    <div className="bg-[#BE123C] p-[1.5px] rounded-full">
                      <div className="w-2 h-2 overflow-hidden relative">
                        <Image
                          src={img3 || "/placeholder.svg"}
                          alt="video"
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-[9px] text-[#BE123C]">🍷 Happy Hour</div>
                </div>
              </div>

              <div
                className="w-full h-[79.5px] rounded-[4px] overflow-hidden mt-[3px] flex"
                style={{
                  background: "rgba(139,92,246,0.1)",
                }}
              >
                <div className="w-[2.25px] bg-[#8B5CF6]" />
                <div className="p-[4.5px] w-full">
                  <div className="flex gap-[3px] items-center">
                    <span className="font-medium text-[9px] text-[#581C87]">11:00</span>
                    <span className="font-medium text-[9px] text-[#581C87]">AM</span>
                  </div>
                  <div className="font-semibold text-[9px] text-[#581C87]">
                    🍔 New Employee Welcome Lunch!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
