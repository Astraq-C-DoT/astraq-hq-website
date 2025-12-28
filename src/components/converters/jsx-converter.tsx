import type { SerializedHeadingNode, SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { JSXConverters } from "@payloadcms/richtext-lexical/react";
import { type JSXConvertersFunction, LinkJSXConverter } from "@payloadcms/richtext-lexical/react";
import slugify from "slugify";

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === "h2") {
      const text = nodesToJSX({ nodes: node.children });

      const id = slugify(text.join(""));

      return <h2 id={id}>{text}</h2>;
    } else {
      const text = nodesToJSX({ nodes: node.children }).join("");
      const Tag = node.tag;
      return <Tag>{text}</Tag>;
    }
  },
};

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  // biome-ignore lint/style/noNonNullAssertion: This is guaranteed to be a document
  const { value, relationTo } = linkNode.fields.doc!;

  const slug = typeof value !== "number" && value.slug;

  // TODO: Add other relations to the converter and check if it us `blogs` or `blog`
  if (relationTo === "blogs") {
    return `/blog/${slug}`;
  } else {
    return `/${slug}`;
  }
};

export const jsxConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
});
