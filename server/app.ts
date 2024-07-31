import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/router";
import ENV from "./utils/ENV";
import connectDb from "./config/dbConnection";
const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: "http://localhost/5173",
  })
);
app.use(morgan("dev"));

app.use("/api", router);

app.listen(ENV.PORT, () => {
  connectDb();
  console.log(`server running on http://localhost:${ENV.PORT}`);
});
