import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL as string,
  ACCESS_SECRET: process.env.ACCESS_SECRET as string,
};
