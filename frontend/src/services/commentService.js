import axiosInstance from "../api/axiosInstance.js";

export const getCommentsByBlogId = async (blogId) => {
  const response = await axiosInstance.get(
    `/api/blogs/${blogId}/comments`,
  );

  return response.data;
};


export const createComment = async(payload)=>{
    const response = await axiosInstance.post(
        "/api/comments/createComment",
        payload
    );

    return response.data
}