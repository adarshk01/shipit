import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { checkJwt } from "./middleware.js";
import { prismaClient } from "../db/index.js";

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

export const projectRouter = router;
