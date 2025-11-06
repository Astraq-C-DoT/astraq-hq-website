import type { GlobalConfig } from "payload";

export const LegalPages: GlobalConfig = {
  slug: "legal-pages",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
