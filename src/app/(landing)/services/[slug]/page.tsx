import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getPayload } from "payload";
import type { Service as ServiceSchema, WithContext } from "schema-dts";
import { env } from "@/env";
import { getImageUrl } from "@/lib/utils";
import type { Product as ProductType } from "@/payload/types";

export const revalidate = 7200;

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "services",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const service = result.docs[0];

  if (!service) {
    notFound();
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "services",
    limit: 0,
  });

  return result.docs.map((service) => ({ slug: service.slug }));
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "services",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  });
  const service = result.docs[0];

  if (!service) {
    notFound();
  }

  const relatedProducts = Array.isArray(service.products)
    ? service.products.filter((product): product is ProductType => {
        return typeof product === "object" && product !== null;
      })
    : [];

  const serviceSchema: WithContext<ServiceSchema> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description ?? undefined,
    url: `${env.APP_URL}/services/${service.slug}`,
    ...(service.illustration && {
      image: getImageUrl(service.illustration) ?? "",
    }),
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
                <header className="flex flex-col gap-4">
                  <h1 className="font-bold font-serif text-4xl text-secondary-foreground md:text-5xl">
                    {service.title}
                  </h1>
                  {service.description && (
                    <p className="text-muted-foreground text-xl">{service.description}</p>
                  )}
                </header>

                {service.illustration && (
                  <Image
                    src={getImageUrl(service.illustration) ?? ""}
                    alt={service.title}
                    width={1060}
                    height={1060}
                    className="h-auto w-full rounded-lg"
                  />
                )}

                {relatedProducts.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="font-semibold text-2xl text-secondary-foreground">
                      Related Products
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {relatedProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="flex flex-col gap-2 rounded-lg border border-border p-4 transition-shadow hover:shadow-lg"
                        >
                          {product.thumbnailImage && (
                            <Image
                              src={getImageUrl(product.thumbnailImage) ?? ""}
                              alt={product.title}
                              width={400}
                              height={200}
                              className="h-32 w-full rounded object-cover"
                            />
                          )}
                          <h3 className="font-semibold text-lg text-secondary-foreground">
                            {product.title}
                          </h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>

      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </div>
  );
}
