import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { env } from "@/env";

async function callRevalidateAPI(paths: Array<{ path: string; type?: "page" | "layout" }>) {
  try {
    const response = await fetch(`${env.APP_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Payload-Revalidate-Secret": env.PAYLOAD_REVALIDATE_SECRET,
      },
      body: JSON.stringify({ paths }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Revalidation failed: ${response.status} ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling revalidation API:", error);
    throw error;
  }
}

export const revalidateBlog: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/blog/${slug}` });
  }

  paths.push({ path: "/blog" });

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    paths.push({ path: `/blog/${previousDoc.slug}` });
  }

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(`Revalidated blog paths: ${paths.map((p) => p.path).join(", ")}`);
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate blog paths: ${error}`);
  }

  return doc;
};

export const revalidateBlogDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc?.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/blog/${slug}` });
  }

  paths.push({ path: "/blog" });

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(
      `Revalidated blog paths after delete: ${paths.map((p) => p.path).join(", ")}`,
    );
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate blog paths: ${error}`);
  }

  return doc;
};

export const revalidateLegalPage: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/legal/${slug}` });
  }

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    paths.push({ path: `/legal/${previousDoc.slug}` });
  }

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(`Revalidated legal page paths: ${paths.map((p) => p.path).join(", ")}`);
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate legal page paths: ${error}`);
  }

  return doc;
};

export const revalidateLegalPageDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc?.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/legal/${slug}` });
  }

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(
      `Revalidated legal page paths after delete: ${paths.map((p) => p.path).join(", ")}`,
    );
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate legal page paths: ${error}`);
  }

  return doc;
};

export const revalidateProduct: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/products/${slug}` });
  }

  paths.push({ path: "/products" });
  paths.push({ path: "/" });

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    paths.push({ path: `/products/${previousDoc.slug}` });
  }

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(`Revalidated product paths: ${paths.map((p) => p.path).join(", ")}`);
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate product paths: ${error}`);
  }

  return doc;
};

export const revalidateProductDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc?.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/products/${slug}` });
  }

  paths.push({ path: "/products" });
  paths.push({ path: "/" });

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(
      `Revalidated product paths after delete: ${paths.map((p) => p.path).join(", ")}`,
    );
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate product paths: ${error}`);
  }

  return doc;
};

export const revalidateService: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/services/${slug}` });
  }

  paths.push({ path: "/services" });

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    paths.push({ path: `/services/${previousDoc.slug}` });
  }

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(`Revalidated service paths: ${paths.map((p) => p.path).join(", ")}`);
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate service paths: ${error}`);
  }

  return doc;
};

export const revalidateServiceDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths: Array<{ path: string; type?: "page" | "layout" }> = [];

  const slug = doc?.slug as string | undefined;
  if (slug) {
    paths.push({ path: `/services/${slug}` });
  }

  paths.push({ path: "/services" });

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info(
      `Revalidated service paths after delete: ${paths.map((p) => p.path).join(", ")}`,
    );
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate service paths: ${error}`);
  }

  return doc;
};

export const revalidateSiteInfo: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths = [{ path: "/", type: "page" as const }];

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info("Revalidated homepage after siteInfo change");
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate siteInfo: ${error}`);
  }

  return doc;
};

export const revalidateHeader: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths = [{ path: "/", type: "layout" as const }];

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info("Revalidated layout after header change");
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate header: ${error}`);
  }

  return doc;
};

export const revalidateFooter: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths = [{ path: "/", type: "layout" as const }];

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info("Revalidated layout after footer change");
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate footer: ${error}`);
  }

  return doc;
};

export const revalidateCompany: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const paths = [
    { path: "/", type: "page" as const },
    { path: "/", type: "layout" as const },
  ];

  try {
    await callRevalidateAPI(paths);
    req.payload.logger.info("Revalidated homepage and layout after company change");
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate company: ${error}`);
  }

  return doc;
};
