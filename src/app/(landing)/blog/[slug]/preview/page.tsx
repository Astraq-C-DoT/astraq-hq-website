import config from "@payload-config";
import { convertLexicalToMarkdown, editorConfigFactory } from "@payloadcms/richtext-lexical";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { getImageUrl } from "@/lib/utils";
import { RefreshRouteOnSave } from "./_components/refresh-route-on-save";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog Preview",
    description: "Preview blog post",
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]/preview">) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const { user } = await payload.auth({
    headers: await headers(),
  });

  if (!user) {
    notFound();
  }

  const result = await payload.find({
    collection: "blog",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: true,
    trash: true,
  });
  const blog = result.docs[0];

  if (!blog) {
    notFound();
  }

  const editorConfig = await editorConfigFactory.default({
    config: payload.config,
  });

  const markdown = convertLexicalToMarkdown({
    data: blog.content,
    editorConfig,
  });

  return (
    <>
      <RefreshRouteOnSave />
      <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden">
        <div className="relative flex w-full flex-col items-center justify-start">
          <div className="relative flex min-h-screen w-full max-w-none flex-col items-start justify-start px-4 sm:px-6 md:px-8 lg:w-[1060px] lg:max-w-[1060px] lg:px-0">
            <div className="absolute top-0 left-4 z-0 h-full w-px bg-border shadow-[1px_0px_0px_white] sm:left-6 md:left-8 lg:left-0" />
            <div className="absolute top-0 right-4 z-0 h-full w-px bg-border shadow-[1px_0px_0px_white] sm:right-6 md:right-8 lg:right-0" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden border-border/50 border-b pt-[9px] sm:gap-6 md:gap-8 lg:gap-[66px]">
              <div className="flex w-full flex-col items-center justify-start px-2 pt-16 pr-0 pb-8 pl-0 sm:px-4 sm:pt-20 sm:pr-0 sm:pb-12 sm:pl-0 md:px-8 md:pt-24 md:pb-16 lg:px-0 lg:pt-28">
                <article className="flex w-full max-w-3xl flex-col gap-6">
                  <header className="flex flex-col gap-4">
                    <h1 className="font-bold text-4xl text-secondary-foreground md:text-5xl">
                      {blog.title}
                    </h1>
                    {blog.shortDescription && (
                      <p className="text-muted-foreground text-xl">{blog.shortDescription}</p>
                    )}
                    <div className="flex flex-col gap-2 text-foreground/60 text-sm">
                      {blog.publishedAt && (
                        <time dateTime={blog.publishedAt}>
                          Published: {new Date(blog.publishedAt).toLocaleDateString()}
                        </time>
                      )}
                      {blog.author && typeof blog.author !== "number" && blog.author.email && (
                        <div>Author: {blog.author.email}</div>
                      )}
                    </div>
                  </header>

                  {blog.thumbnailImage && (
                    <Image
                      src={getImageUrl(blog.thumbnailImage) ?? ""}
                      alt={blog.title}
                      width={1060}
                      height={1060}
                      className="h-auto w-full rounded-lg"
                    />
                  )}

                  <div className="prose prose-lg max-w-none whitespace-pre-wrap">{markdown}</div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
