import axios from "axios";

// Create axios instance with custom config
const api = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: import.meta.env.VITE_API_URL,
});



// Request interceptor
// api.interceptors.request.use(
//     (config) => {
//         // Get token from localStorage
//         const token = localStorage.getItem('token');
        
//         // If token exists, add it to headers
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
        
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // Handle 401 (Unauthorized) errors
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Try to refresh token
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 const response = await api.post('/api/refresh-token', {
//                     refreshToken,
//                 });
                
//                 const { token } = response.data;
                
//                 // Save new token
//                 localStorage.setItem('token', token);
                
//                 // Update authorization header
//                 originalRequest.headers.Authorization = `Bearer ${token}`;
                
//                 // Retry original request
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // If refresh fails, redirect to login
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('refreshToken');
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         // Handle 403 (Forbidden) errors
//         if (error.response?.status === 403) {
//             window.location.href = '/forbidden';
//             return Promise.reject(error);
//         }

//         // Handle 404 (Not Found) errors
//         if (error.response?.status === 404) {
//             window.location.href = '/not-found';
//             return Promise.reject(error);
//         }

//         // Handle network errors
//         if (error.message === 'Network Error') {
//             window.location.href = '/network-error';
//             return Promise.reject(error);
//         }

//         // Handle timeout errors
//         if (error.code === 'ECONNABORTED') {
//             window.location.href = '/timeout';
//             return Promise.reject(error);
//         }

//         // For all other errors
//         return Promise.reject(error);
//     }
// );

export default api