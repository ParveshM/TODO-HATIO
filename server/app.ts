import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes";
import projectRouter from "./routes/project.routes";
import ENV from "./utils/ENV";
import connectDb from "./config/dbConnection";
import CustomError from "./utils/customError";
import { HttpStatus } from "./types/HttpStatus";
import errorHandlingMidleware from "./middlewares/errorHandler";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://twkl2r8g-5173.inc1.devtunnels.ms",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRouter);
app.use("/api/projects", projectRouter);

app.all("*", (req, res, next) =>
  next(new CustomError(`Not found: ${req.url}`, HttpStatus.NOT_FOUND))
);
app.use(errorHandlingMidleware);

if (process.env.NODE_ENV !== "test") {
  app.listen(ENV.PORT, async () => {
    await connectDb();
    console.log(`server running on http://localhost:${ENV.PORT}`);
  });
}

export default app;
