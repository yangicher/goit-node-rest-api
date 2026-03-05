import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import bcrypt from "bcrypt";
import app from "../app.js"; 
import User from "../db/models/Users.js";

describe("Login test", () => {
  const testUser = {
    email: "test@login.com",
    password: "testpassword",
  };

  beforeAll(async () => {
    await User.destroy({ where: { email: testUser.email } });

    const hashPassword = await bcrypt.hash(testUser.password, 10);
    
    await User.create({ 
      email: testUser.email, 
      password: hashPassword,
      subscription: "starter" 
    });
  });

  afterAll(async () => {
    await User.destroy({ where: { email: testUser.email } });
  });

  test("Login answer 200, token, user object", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(testUser);

    expect(response.status).toBe(200);

    const { result } = response.body;

    expect(result.token).toBeDefined();
    expect(typeof result.token).toBe("string");

    expect(result.user).toBeDefined();
    expect(result.user.email).toBe(testUser.email);
    expect(typeof result.user.email).toBe("string");
    expect(typeof result.user.subscription).toBe("string");
  });
});