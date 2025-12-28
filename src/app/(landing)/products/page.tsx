import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getPayload } from "payload";
import type { CollectionPage, WithContext } from "schema-dts";
import { env } from "@/env";
import { getImageUrl } from "@/lib/utils";

export const revalidate = 7200;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products",
    description: "Explore our products",
  };
}

export default async function Page() {
  const payload = await getPayload({ config });

  const products = await payload.find({
    collection: "products",
    where: {
      publishedAt: {
        less_than_equal: new Date().toISOString(),
      },
    },
    sort: "-publishedAt",
    limit: 100,
  });

  const collectionPageSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Products",
    description: "Explore our products",
    url: `${env.APP_URL}/products`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.docs.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description ?? undefined,
          url: `${env.APP_URL}/products/${product.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-28">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-[3px] sm:gap-5 md:gap-6 lg:gap-8">
              <div className="flex w-full max-w-[748.71px] flex-col justify-center px-2 text-center font-normal font-serif text-[24px] text-foreground xs:text-[28px] leading-[1.1] sm:px-4 sm:text-[36px] sm:leading-[1.15] md:px-0 md:text-[52px] md:leading-[1.2] lg:w-[748.71px] lg:text-[80px] lg:leading-none">
                Products
              </div>
              <div className="flex w-full max-w-[506.08px] flex-col justify-center px-2 text-center font-medium font-sans text-foreground/80 text-sm leading-[1.4] sm:px-4 sm:text-lg sm:leading-[1.45] md:px-0 md:text-xl md:leading-normal lg:w-[506.08px] lg:text-lg lg:leading-7">
                Explore our products
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 w-full px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.docs.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="flex flex-col gap-4 rounded-lg border border-border p-6 transition-shadow hover:shadow-lg"
              >
                <Image
                  src={getImageUrl(product.thumbnailImage) ?? ""}
                  alt={product.title}
                  width={480}
                  height={192}
                  className="h-48 w-full rounded object-cover"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-2xl text-secondary-foreground">
                    {product.title}
                  </h2>
                  {product.description && (
                    <p className="text-muted-foreground">{product.description}</p>
                  )}
                  {product.client && (
                    <div className="text-foreground/60 text-sm">Client: {product.client}</div>
                  )}
                  {product.publishedAt && (
                    <time dateTime={product.publishedAt} className="text-foreground/60 text-sm">
                      {new Date(product.publishedAt).toLocaleDateString()}
                    </time>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {products.docs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No products yet.</p>
            </div>
          )}
        </div>
      </div>

      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
    </>
  );
}
