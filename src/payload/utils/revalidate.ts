import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

export const revalidateBlog: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const slug = doc.slug as string | undefined;
  if (slug) {
    revalidatePath(`/blog/${slug}`);
    req.payload.logger.info(`Revalidated blog post: /blog/${slug}`);
  }

  revalidatePath("/blog");
  req.payload.logger.info("Revalidated blog listing page: /blog");

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    revalidatePath(`/blog/${previousDoc.slug}`);
    req.payload.logger.info(`Revalidated old blog post path: /blog/${previousDoc.slug}`);
  }

  return doc;
};

export const revalidateBlogDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const slug = doc?.slug as string | undefined;
  if (slug) {
    revalidatePath(`/blog/${slug}`);
    req.payload.logger.info(`Revalidated deleted blog post: /blog/${slug}`);
  }

  revalidatePath("/blog");
  req.payload.logger.info("Revalidated blog listing page after delete: /blog");

  return doc;
};

export const revalidateLegalPage: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const slug = doc.slug as string | undefined;
  if (slug) {
    revalidatePath(`/legal/${slug}`);
    req.payload.logger.info(`Revalidated legal page: /legal/${slug}`);
  }

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    revalidatePath(`/legal/${previousDoc.slug}`);
    req.payload.logger.info(`Revalidated old legal page path: /legal/${previousDoc.slug}`);
  }

  return doc;
};

export const revalidateLegalPageDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const slug = doc?.slug as string | undefined;
  if (slug) {
    revalidatePath(`/legal/${slug}`);
    req.payload.logger.info(`Revalidated deleted legal page: /legal/${slug}`);
  }

  return doc;
};

export const revalidateProduct: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const slug = doc.slug as string | undefined;
  if (slug) {
    revalidatePath(`/products/${slug}`);
    req.payload.logger.info(`Revalidated product: /products/${slug}`);
  }

  revalidatePath("/");
  req.payload.logger.info("Revalidated homepage after product change");

  if (previousDoc?.slug && previousDoc.slug !== slug) {
    revalidatePath(`/products/${previousDoc.slug}`);
    req.payload.logger.info(`Revalidated old product path: /products/${previousDoc.slug}`);
  }

  return doc;
};

export const revalidateProductDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  const slug = doc?.slug as string | undefined;
  if (slug) {
    revalidatePath(`/products/${slug}`);
    req.payload.logger.info(`Revalidated deleted product: /products/${slug}`);
  }

  revalidatePath("/");
  req.payload.logger.info("Revalidated homepage after product delete");

  return doc;
};

export const revalidateSiteInfo: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  revalidatePath("/", "page");
  req.payload.logger.info("Revalidated homepage after siteInfo change");

  return doc;
};

export const revalidateHeader: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  revalidatePath("/", "layout");
  req.payload.logger.info("Revalidated layout after header change");

  return doc;
};

export const revalidateFooter: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  revalidatePath("/", "layout");
  req.payload.logger.info("Revalidated layout after footer change");

  return doc;
};

export const revalidateCompany: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) {
    return doc;
  }

  revalidatePath("/", "page");
  revalidatePath("/", "layout");
  req.payload.logger.info("Revalidated homepage and layout after company change");

  return doc;
};
