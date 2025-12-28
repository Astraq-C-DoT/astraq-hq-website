import type { GlobalConfig } from "payload";
import { revalidateCompany } from "../utils/revalidate";

export const Company: GlobalConfig = {
  slug: "company",
  hooks: {
    afterChange: [revalidateCompany],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      hasMany: false,
    },
    {
      name: "email",
      type: "email",
      required: false,
    },
    {
      name: "phone",
      type: "text",
      required: false,
    },
    {
      name: "website",
      type: "text",
      required: false,
    },
    {
      name: "contactUsUrl",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "group",
      fields: [
        {
          name: "line1",
          type: "text",
          required: false,
        },
        {
          name: "line2",
          type: "text",
          required: false,
        },
        {
          name: "city",
          type: "text",
          required: false,
        },
        {
          name: "state",
          type: "text",
          required: false,
        },
        {
          name: "postalCode",
          type: "text",
          required: false,
        },
        {
          name: "country",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "facebook", type: "text" },
        { name: "twitter", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "instagram", type: "text" },
        { name: "github", type: "text" },
        { name: "youtube", type: "text" },
      ],
    },
  ],
};
