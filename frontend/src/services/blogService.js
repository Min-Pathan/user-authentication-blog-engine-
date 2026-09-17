import axiosInstance from "../api/axiosInstance.js";

export const getAllBlogs = async ({
  page,
  limit,
  keyword,
  categoryId,
}) => {
  const response =
    await axiosInstance.get(
      "/api/blogs",
      {
        params: {
          page,
          limit,
          keyword,

          ...(categoryId && {
            categoryId,
          }),
        },
      },
    );

  return response.data;
};