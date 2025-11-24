import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { revalidateLegalPage, revalidateLegalPageDelete } from "../utils/revalidate";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  hooks: {
    afterChange: [revalidateLegalPage],
    afterDelete: [revalidateLegalPageDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({ fieldToUse: "title" }),
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
