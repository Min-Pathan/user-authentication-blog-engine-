import axiosInstance from "../api/axiosInstance.js";

export const getDashboard = async () => {
  const response = await axiosInstance.get("/api/blogs/dashboard");

  return response.data;
};