import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Navbar from "./Navbar";
import authReducer from "../../features/auth/authSlice";
import { logoutUser } from "../../services/authService";

// No real HTTP in unit tests.
vi.mock("../../services/authService", () => ({
  logoutUser: vi.fn().mockResolvedValue({ success: true }),
}));

const testUser = {
  id: 1,
  username: "minaz",
  email: "minaz@example.com",
};

const renderNavbar = (authenticated) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: authenticated
      ? {
          auth: {
            user: testUser,
            token: "test-token",
            isAuthenticated: true,
          },
        }
      : undefined,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>,
  );
};

// Vitest globals are off, so testing-library cannot
// auto-detect the framework — clean the DOM ourselves.
afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("Navbar - logged out", () => {
  it("shows the public navigation links", () => {
    renderNavbar(false);

    // Desktop + mobile drawer both contain these links.
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Blogs" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
  });

  it("shows Login and Register instead of the avatar", () => {
    renderNavbar(false);

    expect(
      screen.getAllByRole("link", { name: "Login" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "Register" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByRole("button", { name: "Open account menu" }),
    ).not.toBeInTheDocument();
  });
});

describe("Navbar - logged in", () => {
  it("shows the Write button and avatar, but no Register", () => {
    renderNavbar(true);

    expect(screen.getByRole("link", { name: "Write" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open account menu" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Register" })).not.toBeInTheDocument();
  });

  it("opens the account menu with all account items and the user header", () => {
    renderNavbar(true);

    fireEvent.click(screen.getByRole("button", { name: "Open account menu" }));

    expect(screen.getAllByText("minaz").length).toBeGreaterThan(0);
    expect(screen.getByText("minaz@example.com")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "My Blogs" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Create Blog" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Logout" })).toBeInTheDocument();
  });

  it("logs out: calls the API, clears the session and shows Login", async () => {
    renderNavbar(true);

    fireEvent.click(screen.getByRole("button", { name: "Open account menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Logout" }));

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(
        screen.getAllByRole("link", { name: "Login" }).length,
      ).toBeGreaterThan(0);
    });

    expect(
      screen.queryByRole("button", { name: "Open account menu" }),
    ).not.toBeInTheDocument();
  });
});
