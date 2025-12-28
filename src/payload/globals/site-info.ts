import type { GlobalConfig } from "payload";
import { revalidateSiteInfo } from "../utils/revalidate";

export const SiteInfo: GlobalConfig = {
  slug: "siteInfo",
  hooks: {
    afterChange: [revalidateSiteInfo],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    {
      name: "contactUsUrl",
      type: "text",
      required: true,
    },
    {
      name: "backedBy",
      type: "group",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "backers",
          type: "array",
          required: true,
          minRows: 4,
          maxRows: 8,
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              hasMany: false,
              required: true,
            },
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "services",
      type: "group",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "services",
          type: "array",
          required: true,
          maxRows: 8,
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "text",
              required: true,
            },
            {
              name: "illustration",
              type: "upload",
              relationTo: "media",
              hasMany: false,
            },
          ],
        },
      ],
    },
    {
      name: "faq",
      type: "group",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "faqItems",
          type: "array",
          required: true,
          maxRows: 8,
          fields: [
            {
              name: "question",
              type: "text",
              required: true,
            },
            {
              name: "answer",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
