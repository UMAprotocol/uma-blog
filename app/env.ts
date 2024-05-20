import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SPACE_ID: z.string(),
    ACCESS_TOKEN: z.string(),
    PREVIEW_ACCESS_TOKEN: z.string(),
    ENVIRONMENT: z.string(),
    PREVIEW_SECRET: z.string(),
    REVALIDATE_SECRET: z.string(),
    GOOGLE_ANALYTICS_TAG: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    SPACE_ID: process.env.SPACE_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    PREVIEW_ACCESS_TOKEN: process.env.PREVIEW_ACCESS_TOKEN,
    ENVIRONMENT: process.env.ENVIRONMENT,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    GOOGLE_ANALYTICS_TAG: process.env.GOOGLE_ANALYTICS_TAG,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
