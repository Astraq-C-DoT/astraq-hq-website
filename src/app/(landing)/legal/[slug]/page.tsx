import config from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getPayload } from "payload";
import type { WebPage, WithContext } from "schema-dts";
import { RichText } from "@/components/rich-text";
import { env } from "@/env";
import { LegalHeader } from "./_components/header";

export const revalidate = 7200;

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "legal-pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const legalPage = result.docs[0];

  if (!legalPage) {
    notFound();
  }

  return {
    title: legalPage.title,
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "legal-pages",
    limit: 0,
  });
  return result.docs.map((legalPage) => ({ slug: legalPage.slug }));
}

export default async function Page({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "legal-pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const legalPage = result.docs[0];

  if (!legalPage) {
    notFound();
  }

  const webPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: legalPage.title,
    url: `${env.APP_URL}/legal/${legalPage.slug}`,
    datePublished: legalPage.createdAt ?? undefined,
    dateModified: legalPage.updatedAt ?? undefined,
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden">
      <div className="relative flex w-full flex-col items-center justify-start">
        <div className="relative flex min-h-screen w-full max-w-none flex-col items-start justify-start px-4 sm:px-6 md:px-8 lg:w-[1060px] lg:max-w-[1060px] lg:px-0">
          <div className="absolute top-0 left-4 z-0 h-full w-px bg-border shadow-[1px_0px_0px_white] sm:left-6 md:left-8 lg:left-0" />
          <div className="absolute top-0 right-4 z-0 h-full w-px bg-border shadow-[1px_0px_0px_white] sm:right-6 md:right-8 lg:right-0" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden border-border/50 border-b pt-[9px] sm:gap-6 md:gap-8 lg:gap-[66px]">
            <div className="flex w-full flex-col items-center justify-start px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-28">
              <article className="flex w-full max-w-3xl flex-col gap-6">
                <LegalHeader title={legalPage.title} createdAt={legalPage.createdAt} />
                <RichText data={legalPage.content} />
              </article>
            </div>
          </div>
        </div>
      </div>

      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </div>
  );
}
