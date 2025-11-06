import Image from "next/image";
import { cn } from "@/lib/utils";

interface EffortlessIntegrationProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function EffortlessIntegration({
  width = 482,
  height = 300,
  className = "",
}: EffortlessIntegrationProps) {
  const centerX = 250;
  const centerY = 179;

  const getPositionOnRing = (ringRadius: number, angle: number) => ({
    x: centerX + ringRadius * Math.cos(angle),
    y: centerY + ringRadius * Math.sin(angle),
  });

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width,
        height,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.1) 100%)",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border opacity-80"
        style={{
          borderColor: "rgba(55, 50, 47, 0.2)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border opacity-70"
        style={{
          borderColor: "rgba(55, 50, 47, 0.25)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border opacity-60"
        style={{
          borderColor: "rgba(55, 50, 47, 0.3)",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "500px",
          height: "358px",
        }}
      >
        <div
          className="absolute flex items-center justify-center rounded-full font-bold text-white shadow-md"
          style={{
            width: "72px",
            height: "72px",
            left: `${centerX - 36}px`,
            top: `${centerY - 36}px`,
            background: "#37322f",
            fontFamily: "'Inter', sans-serif",
            fontSize: "32px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          b
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-black"
          style={{
            left: `${getPositionOnRing(80, Math.PI).x - 16}px`,
            top: `${getPositionOnRing(80, Math.PI).y - 16}px`,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
            alt="GitHub"
            width={18}
            height={18}
            style={{
              filter: "brightness(0) invert(1)",
            }}
            unoptimized
          />
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-white"
          style={{
            left: `${getPositionOnRing(80, 0).x - 16}px`,
            top: `${getPositionOnRing(80, 0).y - 16}px`,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg"
            alt="Slack"
            width={18}
            height={18}
            unoptimized
          />
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md"
          style={{
            left: `${getPositionOnRing(120, -Math.PI / 4).x - 16}px`,
            top: `${getPositionOnRing(120, -Math.PI / 4).y - 16}px`,
            background: "#EEEFE8",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg"
            alt="Figma"
            width={16}
            height={16}
            unoptimized
          />
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md"
          style={{
            left: `${getPositionOnRing(120, (3 * Math.PI) / 4).x - 16}px`,
            top: `${getPositionOnRing(120, (3 * Math.PI) / 4).y - 16}px`,
            background: "#5865F2",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
            alt="Discord"
            width={18}
            height={18}
            style={{
              filter: "brightness(0) invert(1)",
            }}
            unoptimized
          />
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-white"
          style={{
            left: `${getPositionOnRing(120, (5 * Math.PI) / 4).x - 16}px`,
            top: `${getPositionOnRing(120, (5 * Math.PI) / 4).y - 16}px`,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg"
            alt="Notion"
            width={18}
            height={18}
            unoptimized
          />
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md"
          style={{
            left: `${getPositionOnRing(160, Math.PI).x - 16}px`,
            top: `${getPositionOnRing(160, Math.PI).y - 16}px`,
            background: "#635BFF",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg"
            alt="Stripe"
            width={18}
            height={18}
            style={{
              filter: "brightness(0) invert(1)",
            }}
            unoptimized
          />
        </div>

        <div
          className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-black"
          style={{
            left: `${getPositionOnRing(160, 0).x - 16}px`,
            top: `${getPositionOnRing(160, 0).y - 16}px`,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/framer.svg"
            alt="Framer"
            width={16}
            height={16}
            style={{
              filter: "brightness(0) invert(1)",
            }}
            unoptimized
          />
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-label="Connection lines"
        >
          <title>Connection lines</title>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(55, 50, 47, 0.1)" />
              <stop offset="50%" stopColor="rgba(55, 50, 47, 0.05)" />
              <stop offset="100%" stopColor="rgba(55, 50, 47, 0.1)" />
            </linearGradient>
          </defs>

          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(80, 0).x}
            y2={getPositionOnRing(80, 0).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.2"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(80, Math.PI).x}
            y2={getPositionOnRing(80, Math.PI).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.2"
          />

          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(120, -Math.PI / 4).x}
            y2={getPositionOnRing(120, -Math.PI / 4).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.15"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(120, (3 * Math.PI) / 4).x}
            y2={getPositionOnRing(120, (3 * Math.PI) / 4).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.15"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(120, (5 * Math.PI) / 4).x}
            y2={getPositionOnRing(120, (5 * Math.PI) / 4).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.15"
          />

          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(160, 0).x}
            y2={getPositionOnRing(160, 0).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.1"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={getPositionOnRing(160, Math.PI).x}
            y2={getPositionOnRing(160, Math.PI).y}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
}
