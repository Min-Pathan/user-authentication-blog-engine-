import { describe, expect, it } from "vitest";

import request from "supertest";

import app from "../src/app.js";

// Integration tests run against the real app + local database,
// so every user gets a unique email to avoid collisions.
const uniqueEmail = () =>
  `test-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;

const validUser = () => ({
  username: `testuser${Math.floor(Math.random() * 100000)}`,
  email: uniqueEmail(),
  phone: "1234567890",
  password: "Test@1234",
});

describe("POST /api/users/register", () => {
  it("returns 400 with field errors for an invalid payload", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({
        username: "ab",
        email: "not-an-email",
        phone: "123",
        password: "abc",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "email" }),
      ]),
    );
  });

  it("registers a valid user and never returns the password", async () => {
    const user = validUser();

    const response = await request(app)
      .post("/api/users/register")
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user).not.toHaveProperty("password");
  });

  it("returns 409 when the email already exists", async () => {
    const user = validUser();

    await request(app).post("/api/users/register").send(user);

    const response = await request(app)
      .post("/api/users/register")
      .send({ ...user, username: "anothername" });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email already exists");
  });
});

describe("POST /api/users/login", () => {
  it("returns 401 for a wrong password", async () => {
    const user = validUser();
    await request(app).post("/api/users/register").send(user);

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: "WrongPass1" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("returns a token for correct credentials", async () => {
    const user = validUser();
    await request(app).post("/api/users/register").send(user);

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.token).toBe("string");
    expect(response.body.user.email).toBe(user.email);
  });
});

describe("logout invalidates the JWT server-side", () => {
  it("rejects the old token after logout, but a fresh login works", async () => {
    const user = validUser();
    await request(app).post("/api/users/register").send(user);

    const login = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: user.password });
    const token = login.body.token;

    // The token works before logging out.
    const profileBefore = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(profileBefore.status).toBe(200);
    expect(profileBefore.body.user.email).toBe(user.email);

    // Logging out bumps token_version.
    const logout = await request(app)
      .post("/api/users/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(logout.status).toBe(200);
    expect(logout.body.message).toBe("Logged out successfully");

    // The very same token is now rejected.
    const profileAfter = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(profileAfter.status).toBe(401);
    expect(profileAfter.body.message).toBe("Please log in again.");

    // Logging in again issues a working token.
    const reLogin = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: user.password });
    expect(reLogin.status).toBe(200);

    const profileReLogin = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${reLogin.body.token}`);
    expect(profileReLogin.status).toBe(200);
  });
});
