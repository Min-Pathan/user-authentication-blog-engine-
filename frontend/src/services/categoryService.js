import axiosInstance from "../api/axiosInstance"

export const getAllCategories = async () => {
    const response = await axiosInstance.get(
        "/api/categories"
    );

    return response.data
}

export const creatCategory = async (formData) => {
    const response = await axiosInstance.post(
        "/api/blogs/createCategory",
        formData,
    )

    return response.data
}