import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getPayload } from "payload";
import type { Product as ProductSchema, WithContext } from "schema-dts";
import { env } from "@/env";
import { getImageUrl } from "@/lib/utils";

export const revalidate = 7200;

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "products",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const product = result.docs[0];

  if (!product) {
    notFound();
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "products",
    limit: 0,
  });

  return result.docs.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const product = result.docs[0];

  if (!product) {
    notFound();
  }

  const productSchema: WithContext<ProductSchema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description ?? undefined,
    url: `${env.APP_URL}/products/${product.slug}`,
    ...(product.thumbnailImage && {
      image: getImageUrl(product.thumbnailImage) ?? "",
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
                    {product.title}
                  </h1>
                  {product.description && (
                    <p className="text-muted-foreground text-xl">{product.description}</p>
                  )}
                  <div className="flex gap-1 text-foreground/60 text-sm">
                    {product.client && <div>Client: {product.client}</div>}
                    {product.publishedAt && (
                      <time dateTime={product.publishedAt}>
                        on {new Date(product.publishedAt).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                </header>

                <Image
                  src={getImageUrl(product.thumbnailImage) ?? ""}
                  alt={product.title}
                  width={1060}
                  height={1060}
                  className="h-auto w-full rounded-lg"
                />

                {product.images && product.images.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {product.images.map((imageItem, index) => {
                      const imageUrl = getImageUrl(imageItem.image);
                      if (!imageUrl) return null;
                      return (
                        <Image
                          // biome-ignore lint/suspicious/noArrayIndexKey: This is a valid use case
                          key={index}
                          src={imageUrl}
                          alt={`${product.title} - Image ${index + 1}`}
                          width={1060}
                          height={1060}
                          className="h-auto w-full rounded-lg"
                        />
                      );
                    })}
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
          __html: JSON.stringify(productSchema),
        }}
      />
    </div>
  );
}
