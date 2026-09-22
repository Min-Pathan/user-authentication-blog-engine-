import axiosInstance from "../api/axiosInstance"

export const getBlogLikes = async(blogId)=>{
    const response = await axiosInstance.get(
        `/api/likes/${blogId}`
    )

    return response.data
}

export const toggleBlogLike = async (blogId) => {
  const response = await axiosInstance.post(
    `/api/likes/${blogId}/toggle`,
  );

  return response.data;
};