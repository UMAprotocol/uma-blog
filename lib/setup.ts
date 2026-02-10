import { env } from "@/app/env";
import { execSync } from "child_process";

const typesDir = "types/contentful";

// fetch schema from our space and generate types
const generateCommand = `cf-content-types-generator -s ${env.SPACE_ID} -t ${env.CMA_TOKEN} -X -g -o ${typesDir}`;

try {
  // build interfaces
  execSync(generateCommand, { encoding: "utf-8" });
  // fix lint issues, convert to types
  execSync(`npx eslint --fix "${typesDir}/**/*.ts"`, { encoding: "utf-8" });
  // format
  execSync(
    `npx prettier --write "${typesDir}/**/*.ts" --config ./prettier.config.mjs`,
    { encoding: "utf-8" },
  );
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  }
  process.exit(1);
}
