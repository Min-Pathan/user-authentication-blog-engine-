import axiosInstance from "../api/axiosInstance"

export const getAllCategories = async () => {
    const response = await axiosInstance.get(
        "/api/categories"
    );

    return response.data
}