import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BlogCard from "./BlogCard.jsx";

const mockBlog = {
  id: 1,
  title: "Building Better React Applications",
  content:
    "Learn how to structure React applications using reusable components.",
  category: "React",
  username: "Minaz",
  created_at: "2026-08-27T10:00:00.000Z",
  media_url: "https://picsum.photos/800/500",
  media_type: "image",
  like_count: 18,
  comment_count: 5,
};

describe("BlogCard", () => {
  it("renders the blog title received through props", () => {
    render(<BlogCard blog={mockBlog} />);

    expect(
      screen.getByRole("heading", {
        name: "Building Better React Applications",
      }),
    ).toBeInTheDocument();
  });
});