import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { repoRouter } from "./routes/repos.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/repos", repoRouter);
app.listen(3000);
