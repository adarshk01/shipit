import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { getGithubAccessToken } from "../utils/githubToken.js";
import axios from "axios";
import { checkJwt } from "./middleware.js";

const router = Router();

router.get("/", checkJwt, async (req, res) => {
  try {
    // console.log("AUTH:", req.auth);
    // console.log("AUTH:", req.auth?.sub);
    if (!req.auth?.sub) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.auth.sub;

    // console.log("AUTH:", req.auth);
    // console.log("USER ID:", userId);

    const githubToken = await getGithubAccessToken(userId);

    // console.log("GITHUB TOKEN EXISTS:", !!githubToken);

    const { data } = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({
      error: "Failed to fetch repos",
    });
  }
});

export const repoRouter = router;
