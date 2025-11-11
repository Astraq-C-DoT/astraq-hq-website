import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-start px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-28">
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-[3px] sm:gap-5 md:gap-6 lg:gap-8">
          <div className="flex w-full max-w-[748.71px] flex-col justify-center px-2 text-center font-normal font-serif text-[24px] text-foreground xs:text-[28px] leading-[1.1] sm:px-4 sm:text-[36px] sm:leading-[1.15] md:px-0 md:text-[52px] md:leading-[1.2] lg:w-[748.71px] lg:text-[80px] lg:leading-none">
            404
          </div>
          <div className="flex w-full max-w-[506.08px] flex-col justify-center px-2 text-center font-medium font-sans text-foreground/80 text-sm leading-[1.4] sm:px-4 sm:text-lg sm:leading-[1.45] md:px-0 md:text-xl md:leading-normal lg:w-[506.08px] lg:text-lg lg:leading-7">
            Page not found
          </div>
          <div className="flex w-full max-w-[506.08px] flex-col justify-center px-2 text-center font-normal font-sans text-foreground/60 text-sm leading-[1.4] sm:px-4 sm:text-base sm:leading-[1.45] md:px-0 md:text-lg md:leading-normal lg:w-[506.08px] lg:text-base lg:leading-7">
            The page you're looking for doesn't exist or has been moved.
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center sm:mt-10 md:mt-12 lg:mt-16">
        <Button asChild variant="default" size="lg">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
