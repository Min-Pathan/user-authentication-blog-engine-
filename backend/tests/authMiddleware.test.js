import { beforeEach, describe, expect, it, vi } from "vitest";

import jwt from "jsonwebtoken";

import authMiddleware from "../src/middlewares/authMiddleware.js";
import { findUserAuthById } from "../src/models/userModel.js";

// The middleware only needs jwt.verify and one model function;
// both are mocked so no real secret or database is involved.
vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn(),
  },
}));

vi.mock("../src/models/userModel.js", () => ({
  findUserAuthById: vi.fn(),
}));

const mockedVerify = jwt.verify;
const mockedFindUserAuthById = findUserAuthById;

const buildReq = (authorization) => ({
  headers: authorization ? { authorization } : {},
});

const buildRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("authMiddleware", () => {
  it("rejects a request without an Authorization header", async () => {
    const req = buildReq(null);
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Please log in.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a non-Bearer Authorization header", async () => {
    const req = buildReq("Basic abc123");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects an expired or malformed token", async () => {
    const error = new Error("jwt expired");
    error.name = "TokenExpiredError";
    mockedVerify.mockImplementation(() => {
      throw error;
    });

    const req = buildReq("Bearer expired-token");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Please log in again.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a token whose payload is missing tokenVersion", async () => {
    mockedVerify.mockReturnValue({ id: 1, role: "user" });

    const req = buildReq("Bearer valid-but-old-token");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a token when the user no longer exists", async () => {
    mockedVerify.mockReturnValue({ id: 1, role: "user", tokenVersion: 3 });
    mockedFindUserAuthById.mockResolvedValue(null);

    const req = buildReq("Bearer token");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a token with a stale tokenVersion (after logout or password reset)", async () => {
    mockedVerify.mockReturnValue({ id: 1, role: "user", tokenVersion: 2 });
    mockedFindUserAuthById.mockResolvedValue({
      id: 1,
      role: "user",
      token_version: 3,
    });

    const req = buildReq("Bearer stale-token");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Please log in again.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches req.user and calls next for a valid current token", async () => {
    mockedVerify.mockReturnValue({ id: 7, role: "user", tokenVersion: 3 });
    mockedFindUserAuthById.mockResolvedValue({
      id: 7,
      role: "user",
      token_version: 3,
    });

    const req = buildReq("Bearer valid-token");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: 7, role: "user" });
    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes database failures to the error handler instead of reporting 401", async () => {
    mockedVerify.mockReturnValue({ id: 7, role: "user", tokenVersion: 3 });
    const dbError = new Error("connection refused");
    mockedFindUserAuthById.mockRejectedValue(dbError);

    const req = buildReq("Bearer valid-token");
    const res = buildRes();
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(dbError);
  });
});
