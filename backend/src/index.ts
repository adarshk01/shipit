import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { repoRouter } from "./routes/repos.js";
import { queueRouter } from "./routes/queue.js";
import { projectRouter } from "./routes/projects.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/repos", repoRouter);
app.use("/api/v1/queue", queueRouter);
app.use("/api/v1/projects", projectRouter);
app.listen(3000);
