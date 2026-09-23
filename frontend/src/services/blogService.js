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

export const getMyBlogs = async ({
  page = 1,
  limit = 6,
} = {}) => {
  const response = await axiosInstance.get(
    "/api/blogs/my-blogs",
    {
      params: { page, limit },
    },
  );

  return response.data;
};

export const createBlog = async (formData) => {
  const response = await axiosInstance.post(
    "/api/blogs/createBlog",
    formData,
  );

  return response.data;
};

export const updateBlog = async({id, formData})=>{
  const response = await axiosInstance.put(
    `/api/blogs/${id}`,
    formData
  )

  return response.data
}

export const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(
    `/api/blogs/${id}`,
  );

  return response.data;
};