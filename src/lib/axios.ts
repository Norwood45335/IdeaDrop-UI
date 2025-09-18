import axios from 'axios';
import { getStoredAccessToken, setStoredAccessToken } from './authToken';
import { refreshAccessToken } from '@/api/auth';

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
    // In production (Vercel), use VITE_PRODUCTION_API_URL
    if (import.meta.env.PROD && import.meta.env.VITE_PRODUCTION_API_URL) {
        return import.meta.env.VITE_PRODUCTION_API_URL;
    }
    // In development, use VITE_API_URL or fallback to localhost
    return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

const api = axios.create({
    baseURL: `${getApiBaseUrl()}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Attach token on refresh
api.interceptors.request.use((config: any) => {
    const token = getStoredAccessToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//Refresh token after expire
api.interceptors.response.use((res: any) => res, async (error: any) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes('/auth/refresh')
    ){
        originalRequest._retry = true;

        //gets new token
        try{
            const {accessToken:newToken } = await refreshAccessToken()
            setStoredAccessToken(newToken)
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest)
        }catch(err){
            console.error('Refresh token failed', err)
        }
    }
    return Promise.reject(error)
})

export default api;