import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const env = createEnv({
  server: {
    CMA_TOKEN: z.string(),
    SPACE_ID: z.string(),
    ACCESS_TOKEN: z.string(),
    PREVIEW_ACCESS_TOKEN: z.string(),
    ENVIRONMENT: z.string(),
    PREVIEW_SECRET: z.string(),
    REVALIDATE_SECRET: z.string(),
    MAILCHIMP_API_KEY: z.string(),
    MAILCHIMP_SERVER_PREFIX: z.string(),
    MAILCHIMP_LIST_ID: z.string(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    CMA_TOKEN: process.env.CMA_TOKEN,
    SPACE_ID: process.env.SPACE_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    PREVIEW_ACCESS_TOKEN: process.env.PREVIEW_ACCESS_TOKEN,
    ENVIRONMENT: process.env.ENVIRONMENT,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
