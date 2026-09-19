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

export const updateComment = async({ id, comment})=>{
    const response = await axiosInstance.put( `/api/comments/${id}`,
    { comment },
  );

  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axiosInstance.delete(
    `/api/comments/${id}`,
  );

  return response.data;
};