import request from "supertest";
import app from "../app";

export const user = {
  email: "test@example.com",
  password: "Test@123",
};
type User = {
  email: string;
  password: string;
};
export const registerUser = async (user: User) => {
  const res = await request(app).post("/api/signup").send(user);
  return res;
};

export const loginUser = async (user: User) => {
  const res = await request(app).post("/api/login").send(user);
  return res;
};
