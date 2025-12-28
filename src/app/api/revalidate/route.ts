import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(request: Request) {
  try {
    const revalidateSecret = request.headers.get("X-Payload-Revalidate-Secret");

    if (revalidateSecret !== env.PAYLOAD_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { paths } = body as { paths: Array<{ path: string; type?: "page" | "layout" }> };

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json(
        { message: "Invalid request body. Expected 'paths' array." },
        { status: 400 },
      );
    }

    const revalidated: string[] = [];

    for (const { path, type = "page" } of paths) {
      revalidatePath(path, type);
      revalidated.push(`${path} (${type})`);
    }

    return NextResponse.json({
      revalidated,
      message: `Successfully revalidated ${revalidated.length} path(s)`,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating paths", error: String(error) },
      { status: 500 },
    );
  }
}
