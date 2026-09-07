import axiosInstance from "../api/axiosInstance"

export const registerUser = async (data) => {
    const response = await axiosInstance.post(
        "/api/users/register",
        data
    );

    return response.data
}

export const loginUser = async (data) => {
  const response = await axiosInstance.post(
    "/api/users/login",
    data,
  );

  return response.data;
};