import { loadEnvConfig } from "@next/env";
import { strict as assert } from "assert";
import { exec } from "child_process";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const SPACE_ID = process.env.SPACE_ID;
const CMA_TOKEN = process.env.CMA_TOKEN;

assert(SPACE_ID);
assert(CMA_TOKEN);

// fetch schema from our space and generate types
const command = `cf-content-types-generator -s ${SPACE_ID} -t ${CMA_TOKEN} -X -g -o types/contentful`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`CLI Error: ${stderr}`);
    return;
  }
  console.log(`CLI Output: ${stdout}`);
});
