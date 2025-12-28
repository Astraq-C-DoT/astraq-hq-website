import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import {
  FixedToolbarFeature,
  lexicalEditor,
  EXPERIMENTAL_TableFeature as TableFeature,
} from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { env } from "./env";
import { collections } from "./payload/collections";
import { Users } from "./payload/collections/users";
import { globals } from "./payload/globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature(), TableFeature()],
  }),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload", "types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: env.DATABASE_URL,
      authToken: env.DATABASE_AUTH_TOKEN,
    },
    generateSchemaOutputFile: path.resolve(dirname, "payload", "db-schema.ts"),
    migrationDir: path.resolve(dirname, "payload", "migrations"),
    beforeSchemaInit: [
      ({ schema }) => ({
        ...schema,
        submissions: {},
      }),
    ],
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
