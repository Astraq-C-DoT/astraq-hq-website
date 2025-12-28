import type { GlobalConfig } from "payload";
import { revalidateFooter } from "../utils/revalidate";

export const Footer: GlobalConfig = {
  slug: "footer",
  hooks: {
    afterChange: [revalidateFooter],
  },
  fields: [
    {
      name: "footerGroups",
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
          name: "urls",
          type: "array",
          required: true,
          maxRows: 8,
          fields: [
            {
              name: "label",
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
  ],
};
