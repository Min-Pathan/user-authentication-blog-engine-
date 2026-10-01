import axiosInstance from "../api/axiosInstance.js";

export const getProfile = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};

export const updateProfile = async ({ id, payload }) => {
  const response = await axiosInstance.put(
    `/api/users/${id}`,
    payload,
  );

  return response.data;
};