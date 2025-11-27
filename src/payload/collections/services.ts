import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { env } from "@/env";
import { revalidateService, revalidateServiceDelete } from "../utils/revalidate";

export const Services: CollectionConfig = {
  slug: "services",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    livePreview: {
      url: ({ data }) => `${env.APP_URL}/services/${data.slug}/preview`,
    },
  },
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({
      fieldToUse: "title",
      overrides(field) {
        if (field.admin?.position) {
          field.admin.position = undefined;
        }
        return field;
      },
    }),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "illustration",
      type: "upload",
      relationTo: "media",
      hasMany: false,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};
