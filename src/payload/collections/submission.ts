import type { CollectionConfig } from "payload";

export const Submission: CollectionConfig = {
  slug: "submissions",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: false,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "createdAt",
      type: "date",
      required: true,
      defaultValue: new Date().toISOString(),
    },
  ],
};
