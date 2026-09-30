import {store} from "../app/store"
import axios from 'axios'
import { clearAuth } from "../features/auth/authStorage"
import { clearCredentials } from "../features/auth/authSlice"

const baseURL = import.meta.env.VITE_API_BASE_URL

if(!baseURL){
    throw new Error("VITE_AP_BASE_URL is mising, please add it your local enev file")
}

const axiosInstance = axios.create({
    baseURL,
    headers:{
        Accept: "application/json"
    }
})
let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const request = error.config;
    const url = request?.url || "";

    // Incorrect login credentials should remain a form error.
    const isAuthRequest =
      /\/users\/(login|register)\/?(?:\?|$)/.test(url);

    const currentToken = localStorage.getItem("accessToken");
    const requestToken = request?.headers?.Authorization;

    // Ignore failures from an older session.
    const isCurrentSession =
      currentToken &&
      requestToken === `Bearer ${currentToken}`;

    if (
      status === 401 &&
      !isAuthRequest &&
      isCurrentSession &&
      !isRedirecting
    ) {
      isRedirecting = true;

      clearAuth();
      store.dispatch(clearCredentials());

      window.location.replace("/login");
    }

    return Promise.reject(error);
  },
);
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("accessToken");
        if(token)
        {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },

    (error)=>{
        return Promise.reject(error)
    }
)

export default axiosInstance