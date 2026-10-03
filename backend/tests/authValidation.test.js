import { describe, expect, it } from "vitest";

import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../src/validations/authValidation.js";

describe("registerSchema", () => {
  const validPayload = {
    username: "minaz",
    email: "minaz@example.com",
    phone: "1234567890",
    password: "Test@1234",
  };

  it("accepts a valid payload", () => {
    const result = registerSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
  });

  it("trims and lowercases the email", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      email: "  Minaz@EXAMPLE.com ",
    });

    expect(result.success).toBe(true);
    expect(result.data.email).toBe("minaz@example.com");
  });

  it("rejects a username shorter than 3 characters", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      username: "ab",
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe(
      "Username must be at least 3 characters",
    );
  });

  it("rejects an invalid email", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
    expect(
      result.error.issues.some((issue) =>
        issue.message.includes("valid email"),
      ),
    ).toBe(true);
  });

  it("rejects a phone number shorter than 10 digits", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      phone: "12345",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a password shorter than 6 characters", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: "abc",
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe(
      "Password must be at least 6 characters",
    );
  });
});

describe("loginSchema", () => {
  it("accepts a valid login payload", () => {
    const result = loginSchema.safeParse({
      email: "minaz@example.com",
      password: "Test@1234",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a missing password", () => {
    const result = loginSchema.safeParse({
      email: "minaz@example.com",
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe(
      "Password is required",
    );
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "nope",
      password: "Test@1234",
    });

    expect(result.success).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  const validToken = "a".repeat(64);

  it("accepts a 64-character hex token with a valid password", () => {
    const result = resetPasswordSchema.safeParse({
      token: validToken,
      password: "Test@1234",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a token that is not 64 hex characters", () => {
    const result = resetPasswordSchema.safeParse({
      token: "short-token",
      password: "Test@1234",
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Invalid reset link");
  });

  it("rejects a short password", () => {
    const result = resetPasswordSchema.safeParse({
      token: validToken,
      password: "abc",
    });

    expect(result.success).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("accepts username, email and phone", () => {
    const result = updateProfileSchema.safeParse({
      username: "minaz",
      email: "minaz@example.com",
      phone: "1234567890",
    });

    expect(result.success).toBe(true);
    expect(result.data).not.toHaveProperty("password");
  });

  it("rejects an invalid email", () => {
    const result = updateProfileSchema.safeParse({
      username: "minaz",
      email: "bad",
      phone: "1234567890",
    });

    expect(result.success).toBe(false);
  });
});
