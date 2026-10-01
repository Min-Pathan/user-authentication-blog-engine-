import axiosInstance from "../api/axiosInstance.js";

export const sendContactMessage = async (payload) => {
  const response = await axiosInstance.post("/api/contact", payload);

  return response.data;
};