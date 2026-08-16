import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

if(!baseURL){
    throw new Error("VITE_AP_BASE_URL is mising, please add it your local enev file")
}

const axiosInstance = axios.create({
    baseURL
})

export default axiosInstance