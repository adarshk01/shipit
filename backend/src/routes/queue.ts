import { Router } from "express";
import { checkJwt } from "./middleware.js";
import { createClient } from "redis";

const router = Router();
const workerClient = createClient();

await workerClient.connect();

router.post("/", async (req, res) => {
  const { userId, name, fullName, destinationFolder, git, branch, id } =
    req.body;
  console.log(userId, name, fullName, destinationFolder, git, branch, id);
  let envArr = [];

  envArr = req.body.envVar.map((e: any) => `${e.key}=${e.value}`);
  if (envArr[0] == "=") {
    envArr = [];
  }
  await workerClient.lPush(
    "payload",
    JSON.stringify({
      id,
      name,
      fullName,
      destinationFolder,
      git,
      branch,
      userId,
      envArr,
    })
  );
  res.json({
    message: "Deployment has started",
  });
});

export const queueRouter = router;
