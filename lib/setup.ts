import { env } from "@/app/env";
import { exec } from "child_process";

// fetch schema from our space and generate types
const command = `cf-content-types-generator -s ${env.SPACE_ID} -t ${env.CMA_TOKEN} -X -g -o types/contentful`;

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
