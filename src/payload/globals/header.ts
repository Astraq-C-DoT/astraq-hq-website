import type { GlobalConfig } from "payload";
import { revalidateHeader } from "../utils/revalidate";

export const Header: GlobalConfig = {
  slug: "header",
  hooks: {
    afterChange: [revalidateHeader],
  },
  fields: [
    {
      name: "links",
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
};
