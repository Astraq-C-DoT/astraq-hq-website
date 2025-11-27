import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { env } from "@/env";
import { revalidateBlog, revalidateBlogDelete } from "../utils/revalidate";

export const Blog: CollectionConfig = {
  slug: "blog",
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt"],
    livePreview: {
      url: ({ data }) => `${env.APP_URL}/blog/${data.slug}/preview`,
    },
  },
  hooks: {
    afterChange: [revalidateBlog],
    afterDelete: [revalidateBlogDelete],
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
      name: "shortDescription",
      type: "textarea",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
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
      name: "category",
      type: "select",
      options: [
        {
          label: "Blog Post",
          value: "blog-post",
        },
        {
          label: "Case Study",
          value: "case-study",
        },
        {
          label: "Success Story",
          value: "success-story",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
