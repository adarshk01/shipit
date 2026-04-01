import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { checkJwt } from "./middleware.js";
import { prismaClient } from "../db/index.js";

const router = Router();

interface Auth0User {
  email: string;
  name: string;
  nickname?: string;
}

router.get("/", checkJwt, async (req, res) => {
  let body: Auth0User | null = null;

  const userQuery = req.query.User;

  if (typeof userQuery == "string") {
    body = JSON.parse(userQuery);
  }

  if (!body) {
    return res.status(400).json({ message: "Missing user data" });
  }

  let user = await prismaClient.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (user) {
    return res.json({
      message: "you are authenticated",
      auth: req.auth,
      user,
    });
  }
  try {
    user = await prismaClient.user.create({
      data: {
        email: body.email,
        name: body.name,
        github: body.nickname || null,
      },
    });
  } catch (e) {
    console.log(e);
  }

  res.json({
    message: "you are authenticated",
    auth: req.auth,
    user,
  });
});

export const userRouter = router;

// console.log("✅ Authentication successful");
// console.log("User auth data:", req.auth?.sub);
// console.log(req.headers.user);
