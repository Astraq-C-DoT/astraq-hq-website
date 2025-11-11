import config from "@payload-config";
import type { Metadata } from "next";
import Script from "next/script";
import { getPayload } from "payload";
import type { Graph, Organization, WebSite } from "schema-dts";
import { env } from "@/env";
import { BackedBySection } from "./_components/sections/backed-by";
import { ContactUsSection } from "./_components/sections/contact-us";
import { FAQSection } from "./_components/sections/faq";
import { HeroSection } from "./_components/sections/hero";
import { ProductsSection } from "./_components/sections/products";
import { ServicesSection } from "./_components/sections/services";
import { TestimonialsSection } from "./_components/sections/testimonials";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const siteInfo = await payload.findGlobal({ slug: "siteInfo" });
  return {
    title: siteInfo.title,
    description: siteInfo.subtitle,
  };
}

export default async function Page() {
  const payload = await getPayload({ config });

  const [company, siteInfo] = await Promise.all([
    payload.findGlobal({ slug: "company" }),
    payload.findGlobal({ slug: "siteInfo" }),
  ]);

  const organizationSchema: Organization = {
    "@type": "Organization",
    name: company.name,
    description: company.description,
    url: company.website ?? env.NEXT_PUBLIC_SITE_URL,
    ...(company.email && {
      email: company.email,
    }),
    ...(company.phone && {
      telephone: company.phone,
    }),
    ...(company.logo &&
      typeof company.logo !== "number" &&
      company.logo.url && {
        logo: company.logo.url,
      }),
    ...(company.address && {
      address: {
        "@type": "PostalAddress",
        ...(company.address.line1 && { streetAddress: company.address.line1 }),
        ...(company.address.line2 && { addressLine2: company.address.line2 }),
        ...(company.address.city && { addressLocality: company.address.city }),
        ...(company.address.state && { addressRegion: company.address.state }),
        ...(company.address.postalCode && {
          postalCode: company.address.postalCode,
        }),
        ...(company.address.country && {
          addressCountry: company.address.country,
        }),
      },
    }),
    ...(company.social && {
      sameAs: [
        company.social.facebook,
        company.social.twitter,
        company.social.linkedin,
        company.social.instagram,
        company.social.github,
        company.social.youtube,
      ].filter((url): url is string => Boolean(url)),
    }),
  };

  const websiteSchema: WebSite = {
    "@type": "WebSite",
    name: siteInfo.title,
    description: siteInfo.subtitle,
    url: env.NEXT_PUBLIC_SITE_URL,
    publisher: {
      "@type": "Organization",
      name: company.name,
    },
  };

  const graphSchema: Graph = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema],
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-28">
        <HeroSection company={company} siteInfo={siteInfo} />
        <ProductsSection />
        <BackedBySection siteInfo={siteInfo} />
        <ServicesSection siteInfo={siteInfo} />
        <TestimonialsSection />
        <FAQSection siteInfo={siteInfo} />
        <ContactUsSection />
      </div>

      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graphSchema),
        }}
      />
    </>
  );
}
