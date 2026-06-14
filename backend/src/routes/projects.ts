import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { checkJwt } from "./middleware.js";
import { prismaClient } from "../db/index.js";
import { deleteProject } from "../utils/delete.js";

const router = Router();

router.get("/", checkJwt, async (req, res) => {
  const id = Number(req.query.id);

  if (!id) {
    return res.status(400).json({ message: "Missing user id" });
  }

  const projectList = await prismaClient.project.findMany({
    where: {
      userId: id,
    },
  });
  if (projectList) {
    return res.json({
      msg: "got some projects",
      projectList: projectList,
    });
  } else {
    res.json({
      msg: "no projects",
    });
  }
});

router.post("/delete", checkJwt, async (req, res) => {
  const id = Number(req.body.id);
  const projectTitle = req.body.projectName?.toString();
  if (!id) {
    return res.status(400).json({ message: "missing user id" });
  }
  if (!projectTitle) {
    return res.status(400).json({ message: "missing project Name" });
  }

  const projectToDel = await prismaClient.project.delete({
    where: {
      userId_projectName: {
        userId: id,
        projectName: projectTitle,
      },
    },
  });
  const user = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
    select: {
      github: true,
    },
  });
  const userName = user?.github;
  console.log(userName);
  const bucketName = process.env.BUCKET_NAME!;

  const r2ProjectName = projectTitle.toLowerCase();
  const r2UserName = userName?.toLowerCase();

  const deleteProj = await deleteProject(
    bucketName,
    `${r2ProjectName}-${r2UserName}`
  );

  if (projectToDel || deleteProj) {
    return res.json({
      msg: "project deleted",
      projectToDel,
    });
  } else {
    return res.json({
      msg: "something failed",
    });
  }
});

export const projectRouter = router;
