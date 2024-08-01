import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userRouter";
import projectRouter from "./routes/projectRouter";
import ENV from "./utils/ENV";
import connectDb from "./config/dbConnection";
import CustomError from "./utils/customError";
import { HttpStatus } from "./types/HttpStatus";
import errorHandlingMidleware from "./middlewares/errorHandler";

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: "http://localhost/5173",
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

app.listen(ENV.PORT, () => {
  connectDb();
  console.log(`server running on http://localhost:${ENV.PORT}`);
});
