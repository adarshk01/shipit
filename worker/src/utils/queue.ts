import dotenv from "dotenv";
import { createClient } from "redis";
import { runContainer } from "./build";
import { execute, screenshotWorker } from "./worker";
import { fetchSS } from "./screenshot";

const WorkerClient = createClient();
const backendClient = createClient();
export async function queue() {
  await WorkerClient.connect();
  await backendClient.connect();
  while (1) {
    const response = await WorkerClient.brPop("payload", 0);
    if (response?.element) {
      const data = JSON.parse(response.element);
      console.log(data);

      const result = await runContainer({
        repoUrl: `https://${data.git}`,
        finalFolder: data.destinationFolder.toLowerCase(),
        envVar: data.envArr,
      });
      if (result.StatusCode == 0) {
        console.log("control over here now to upload files");
        const uploadStatus = await execute(
          `${
            process.env.LOCAL_OUTPUT_BASE
          }${data.destinationFolder.toLowerCase()}`
        );

        if (uploadStatus?.returnQ == 1) {
          const dataToBackend = {
            domainUrl: `https://${uploadStatus.folderName}.shipits.in/`,
            gitUrl: `https://${data.git}`,
            status: "Ready",
            timestamp: Date.now(),
            userId: data.userId,
            name: data.name,
            branch: data.branch,
          };
          await backendClient.lPush("urlStat", JSON.stringify(dataToBackend));

          const result = await fetchSS(
            dataToBackend.domainUrl,
            uploadStatus.folderName
          );
          if (result.success && result.buffer) {
            await screenshotWorker(uploadStatus.folderName, result.buffer);
          }
        }
      }
    }
  }
}
