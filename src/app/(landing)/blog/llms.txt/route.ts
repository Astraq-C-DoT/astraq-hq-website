import config from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import { env } from "@/env";

export async function GET() {
  const payload = await getPayload({ config });

  const blogs = await payload.find({
    collection: "blog",
    limit: 1000,
    sort: "-publishedAt",
    select: {
      title: true,
      slug: true,
    },
  });

  const lines = blogs.docs.map((blog) => {
    const url = `${env.APP_URL}/blog/${blog.slug}`;
    return `${blog.title} - ${url}`;
  });

  const content = lines.join("\n");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
