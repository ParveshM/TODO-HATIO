import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { HttpStatus } from "../types/HttpStatus";
import { loginUser, registerUser, user } from "../utils/test.utils";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Test project.routes", () => {
  let mongoServer: MongoMemoryServer;
  let token: string;
  let projectId: string;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);

    await registerUser(user);
    const res = await loginUser(user);
    token = res.body.access_token;
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }

    const projectRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Project" });

    projectId = projectRes.body.newProject._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should create a new project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Another Test Project" });

    expect(res.statusCode).toEqual(HttpStatus.CREATED);
    expect(res.body.message).toBe("Project created successfully");
  });

  it("should return an error if the project title already exists", async () => {
    await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Project Title" });

    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Project Title" });

    expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it("should get all projects", async () => {
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.projects).toBeInstanceOf(Array);
    expect(res.body.projects.length).toBeGreaterThan(0);
  });

  it("should update a project title", async () => {
    const res = await request(app)
      .patch(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Project Title" });

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.message).toBe("Project title updated successfully");
  });

  it("should delete a project", async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.message).toBe("Project deleted successfully");
  });

  it("should create a new todo", async () => {
    const res = await request(app)
      .post(`/api/projects/${projectId}/todos`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Test Todo" });

    expect(res.statusCode).toEqual(HttpStatus.CREATED);
    expect(res.body.message).toBe("Todo created successfully");
  });

  it("should get all todos for a project", async () => {
    await request(app)
      .post(`/api/projects/${projectId}/todos`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Test Todo" });

    const res = await request(app)
      .get(`/api/projects/${projectId}/todos`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.todos).toBeInstanceOf(Array);
    expect(res.body.todos.length).toBeGreaterThan(0);
  });

  it("should update a todo", async () => {
    const todoRes = await request(app)
      .post(`/api/projects/${projectId}/todos`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Test Todo" });

    const todoId = todoRes.body.newTodo._id;

    const res = await request(app)
      .patch(`/api/projects/${projectId}/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Updated Todo" });

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.message).toBe("Todo updated successfully");
  });

  it("should delete a todo", async () => {
    const todoRes = await request(app)
      .post(`/api/projects/${projectId}/todos`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Test Todo" });

    const todoId = todoRes.body.newTodo._id;

    const res = await request(app)
      .delete(`/api/projects/${projectId}/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body.message).toBe("Todo deleted successfully");
  });
});
