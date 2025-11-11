import config from "@payload-config";
import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import { getPayload } from "payload";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "./_components/layout/footer";
import { Header } from "./_components/layout/header";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Brillance - Effortless Custom Contract Billing",
  description:
    "Streamline your billing process with seamless automation for every custom contract, tailored by Brillance.",
};

export default async function Layout({ children }: LayoutProps<"/">) {
  const payload = await getPayload({ config });

  const [company, footer, header] = await Promise.all([
    payload.findGlobal({ slug: "company" }),
    payload.findGlobal({ slug: "footer" }),
    payload.findGlobal({ slug: "header" }),
  ]);

  return (
    <html
      lang="en"
      className={cn(
        nunitoSans.variable,
        playfairDisplay.variable,
        "scroll-smooth font-sans antialiased",
      )}
    >
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden">
          <div className="relative flex w-full flex-col items-center justify-start">
            <div className="relative flex min-h-screen w-full max-w-none flex-col items-start justify-start px-4 sm:px-6 md:px-8 lg:w-[1060px] lg:max-w-[1060px] lg:px-0">
              <div className="absolute top-0 left-4 z-0 h-full w-px bg-border shadow-[1px_0px_0px_white] sm:left-6 md:left-8 lg:left-0" />
              <div className="absolute top-0 right-4 z-0 h-full w-px bg-border shadow-[1px_0px_0px_white] sm:right-6 md:right-8 lg:right-0" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden border-border/50 border-b pt-[9px] sm:gap-6 md:gap-8 lg:gap-[66px]">
                <Header header={header} company={company} />

                {children}

                <Footer footer={footer} company={company} />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
