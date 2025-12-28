import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { revalidateProduct, revalidateProductDelete } from "../utils/revalidate";

export const Products: CollectionConfig = {
  slug: "products",
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({ fieldToUse: "title" }),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "thumbnailImage",
      type: "upload",
      relationTo: "media",
      hasMany: false,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          hasMany: false,
        },
      ],
    },
  ],
};
