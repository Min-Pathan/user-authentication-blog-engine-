import { describe, expect, it, vi } from "vitest";

import roleMiddleware from "../src/middlewares/roleMiddleware.js";

const buildRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("roleMiddleware", () => {
  it("allows a request when the user's role is in the allowed list", () => {
    const middleware = roleMiddleware("admin", "editor");
    const req = { user: { id: 1, role: "admin" } };
    const res = buildRes();
    const next = vi.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("blocks a request with 403 when the role is not allowed", () => {
    const middleware = roleMiddleware("admin");
    const req = { user: { id: 1, role: "user" } };
    const res = buildRes();
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Access denied",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("blocks with 403 when the user has no role at all", () => {
    const middleware = roleMiddleware("admin");
    const req = { user: { id: 1 } };
    const res = buildRes();
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
