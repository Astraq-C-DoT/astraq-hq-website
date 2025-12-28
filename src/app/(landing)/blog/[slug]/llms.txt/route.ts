import config from "@payload-config";
import { convertLexicalToMarkdown, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

export async function GET(_request: Request, { params }: RouteContext<"/blog/[slug]/llms.txt">) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const blogs = await payload.find({
    collection: "blog",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  if (blogs.docs.length === 0) {
    return new NextResponse("Blog post not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // biome-ignore lint/style/noNonNullAssertion: Blog is guaranteed to be found
  const blog = blogs.docs[0]!;

  try {
    const editorConfig = await editorConfigFactory.default({
      config: payload.config,
    });

    const markdown = convertLexicalToMarkdown({
      data: blog.content,
      editorConfig,
    });

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error converting Lexical to Markdown:", error);
    return new NextResponse("Error converting content to markdown", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
