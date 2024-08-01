import app from "../app";
import request, { Response } from "supertest";
import mongoose from "mongoose";
import Users from "../models/Users";
import Projects from "../models/Projects";
import Todos from "../models/Todos";
import { HttpStatus } from "../types/HttpStatus";
import { loginUser, registerUser, user } from "../utils/test.utils";

describe("Test user.routes", () => {
  beforeEach(async () => {
    await Users.deleteMany({});
    await Projects.deleteMany({});
    await Todos.deleteMany({});
  });

  afterAll((done) => {
    app.close(done);
    mongoose.connection.close();
  });

  it("should create a new user", async () => {
    const res: any = await registerUser(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should return an error message if the email is used", async () => {
    await registerUser(user);

    const res: Response = await registerUser(user);
    expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(res.body.message).toBe("Email already exists");
  });

  it("should login a user and return a access_token", async () => {
    await registerUser(user);

    const res = await loginUser(user);
    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.access_token).toBeTruthy();
    expect(res.body.message).toBe("Login success");
  });

  it("should return an error message if the credentials are invalid", async () => {
    const res = await loginUser({
      email: "invalid@example.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("should access a protected route with a valid token", async () => {
    await registerUser(user);
    const { body } = await loginUser(user);

    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${body.access_token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Projects fetched successfully");
    expect(res.body.projects).toBeInstanceOf(Array);
  });
});
