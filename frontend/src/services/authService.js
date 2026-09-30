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

export const forgotPassword = async(payload) => {
  const response = await axiosInstance.post(
     "/api/users/forgot-password",
    payload
  )

  return response.data
}

export const resetPassword = async (payload) => {
  const response = await axiosInstance.post(
    "/api/users/reset-password",
    payload,
  );

  return response.data;
};