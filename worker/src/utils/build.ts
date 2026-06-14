import dotenv from "dotenv";
import { copyFromContainer, createContainer } from "./docker";

const LOCAL_OUTPUT_BASE = process.env.LOCAL_OUTPUT_BASE;

export async function runContainer(job: any) {
  const exportsEnv =
    Array.isArray(job.envVar) && job.envVar.length > 0
      ? job.envVar.map((e: any) => `export ${e}`).join(" && ") + " &&"
      : "";
  const container = await createContainer({
    image: "node",
    cmd: [
      "sh",
      "-c",
      `
              git clone ${job.repoUrl} app &&
              cd app &&
              npm install && 
              ${exportsEnv}  
              npm run build
              `,
    ],
    envVar: job.envArr,
    path: job.finalFolder,
  });
  await container.start();
  const result = await container.wait();
  console.log("check for the status of container: ", result);

  if (result.StatusCode == 0) {
    const localOutputPath = `${LOCAL_OUTPUT_BASE}/${job.finalFolder}`;
    await copyFromContainer(container, "/app/dist", localOutputPath);
    console.log("files copied to ", localOutputPath);
  } else {
    console.error("Build failed, check whats wrong");
  }
  await container.remove();
  return result;
}
