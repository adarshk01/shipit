import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { checkJwt } from "./middleware.js";
import { PrismaClient } from "@prisma/client/extension";

const router = Router();

router.get("/", checkJwt, async (req, res) => {
  // console.log("✅ Authentication successful");
  // console.log("User auth data:", req.auth?.sub);
  // console.log(req.headers.user);

  const body = req.body;

  // const userExist = await PrismaClient.user.findFirst({
  //   where: {
  //     email: body.User.email,
  //   },
  // });
  // if (userExist) {
  //   return res.json({
  //     message: "you are authenticated",
  //     user: req.auth,
  //   });
  // }

  res.json({
    message: "you are authenticated",
    user: req.auth,
  });
});

export const userRouter = router;
