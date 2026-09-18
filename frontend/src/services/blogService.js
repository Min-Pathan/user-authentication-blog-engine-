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

export const getBlogById =
  async (id) => {
    const response =
      await axiosInstance.get(
        `/api/blogs/${id}`,
      );

    return response.data;
  };