import axios from 'axios';

const AxiosInstance = axios.create({
  // Agar local server chal raha hai toh http://localhost:5000/api, live hone par env file se uthayega
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://superx-backend.vercel.app/api',
  timeout: 15000, // 15 seconds ka timeout agar server slow ho
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // ⚠️ CRITICAL: Iske bina HttpOnly Cookies browser se backend nahi jayengi!
});

// Response Interceptor (Optional par useful): Global error handling ke liye
AxiosInstance.interceptors.response.use(
  (response) => {
    // Agar sab sahi chal raha hai, toh direct data return kar do
    return response;
  },
  (error) => {
    // Agar kisi API mein 401 (Unauthorized) error aaye, toh samajh jao token expire ho gaya hai
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or Unauthorized. Redirecting to login...");
      // Yahan aap user ko logout karwa ke login screen par bhej sakte ho
      // localStorage.removeItem('user'); // Agar user state wahan save hai toh
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;