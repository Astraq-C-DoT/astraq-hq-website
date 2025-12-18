import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getPayload } from "payload";
import type { Blog, WithContext } from "schema-dts";
import { env } from "@/env";
import { getImageUrl } from "@/lib/utils";

export const revalidate = 7200;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description: "Read our latest blog posts",
  };
}

export default async function Page() {
  const payload = await getPayload({ config });

  const blogs = await payload.find({
    collection: "blog",
    where: {
      publishedAt: {
        less_than_equal: new Date().toISOString(),
      },
    },
    sort: "-publishedAt",
    limit: 100,
    depth: 2,
  });

  const blogSchema: WithContext<Blog> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog",
    description: "Read our latest blog posts",
    url: `${env.APP_URL}/blogs`,
    blogPost: blogs.docs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.shortDescription ?? undefined,
      datePublished: blog.publishedAt ?? undefined,
      url: `${env.APP_URL}/blog/${blog.id}`,
    })),
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-28">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <div className="flex flex-col items-center justify-center gap-4 self-stretch rounded-[3px] sm:gap-5 md:gap-6 lg:gap-8">
              <div className="flex w-full max-w-[748.71px] flex-col justify-center px-2 text-center font-normal font-serif text-[24px] text-foreground xs:text-[28px] leading-[1.1] sm:px-4 sm:text-[36px] sm:leading-[1.15] md:px-0 md:text-[52px] md:leading-[1.2] lg:w-[748.71px] lg:text-[80px] lg:leading-none">
                Blog
              </div>
              <div className="flex w-full max-w-[506.08px] flex-col justify-center px-2 text-center font-medium font-sans text-foreground/80 text-sm leading-[1.4] sm:px-4 sm:text-lg sm:leading-[1.45] md:px-0 md:text-xl md:leading-normal lg:w-[506.08px] lg:text-lg lg:leading-7">
                Read our latest blog posts
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 w-full px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.docs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="flex flex-col gap-4 rounded-lg border border-border p-6 transition-shadow hover:shadow-lg"
              >
                {blog.thumbnailImage && (
                  <Image
                    src={getImageUrl(blog.thumbnailImage) ?? ""}
                    alt={blog.title}
                    width={480}
                    height={192}
                    className="h-48 w-full rounded object-cover"
                  />
                )}
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-2xl text-secondary-foreground">{blog.title}</h2>
                  {blog.shortDescription && (
                    <p className="text-muted-foreground">{blog.shortDescription}</p>
                  )}
                  <div className="flex flex-row items-center gap-1">
                    {blog.author && typeof blog.author !== "number" && blog.author.displayName && (
                      <div className="text-foreground/60 text-sm">by {blog.author.displayName}</div>
                    )}
                    {blog.publishedAt && (
                      <time dateTime={blog.publishedAt} className="text-foreground/60 text-sm">
                        on {new Date(blog.publishedAt).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {blogs.docs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No blog posts yet.</p>
            </div>
          )}
        </div>
      </div>

      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
    </>
  );
}
