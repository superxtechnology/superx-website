import { create } from 'zustand';
import AxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-hot-toast';

const useUserStore = create((set) => ({
  // 1. Initial State: LocalStorage se purana user data uthao (agar hai toh)
  user: JSON.parse(localStorage.getItem('superx_user')) || null,
  isAuthenticated: !!localStorage.getItem('superx_user'),
  loading: false,

  // 2. Action: Set User Data (Login/Verification ke baad state update ke liye)
  setAuth: (userData) => {
    localStorage.setItem('superx_user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  // 3. Action: Check Current User Status from Backend (Optional but powerful)
  // Iska use hum tab karenge jab hume check karna ho ki cookie valid hai ya expire ho gayi
  checkAuth: async () => {
    set({ loading: true });
    try {
      // Ek backend endpoint hum bana sakte hain ya fir token check ke liye
      // Agar cookie invalid hogi toh AxiosInstance ka interceptor 401 throw karega
      const response = await AxiosInstance.get('/auth/me'); 
      if (response.data.success) {
        localStorage.setItem('superx_user', JSON.stringify(response.data.user));
        set({ user: response.data.user, isAuthenticated: true });
      }
    } catch (error) {
      // Session expire hone par local state clear kar do
      localStorage.removeItem('superx_user');
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  // 4. Action: Universal Logout
  logout: async () => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.post('/auth/logout');
      if (response.data.success) {
        localStorage.removeItem('superx_user');
        set({ user: null, isAuthenticated: false });
        toast.success("Logged out successfully! 👋");
        // Page refresh ya redirect jo aap chahein
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Store Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      set({ loading: false });
    }
  }
}));

export default useUserStore;