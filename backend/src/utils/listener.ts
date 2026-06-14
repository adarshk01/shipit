import { createClient } from "redis";
import { prismaClient } from "../db/index.js";
import { getIcon } from "./icon.js";

const backendClient = createClient();

await backendClient.connect();
while (true) {
  const response = await backendClient.brPop("urlStat", 0);

  if (response?.element) {
    const data = JSON.parse(response.element);
    console.log(data);
    const icon = await getIcon(data.domainUrl);
    try {
      await prismaClient.project.create({
        data: {
          projectName: data.name,
          userId: data.userId,
          deploymentStatus: data.status,
          domainUrl: data.domainUrl,
          githubUrl: data.gitUrl,
          createdAt: new Date(data.timestamp),
          icon: icon,
          branch: data.branch,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
