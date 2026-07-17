import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AxiosInstance from '../api/AxiosInstance';

const useAdminAuthStore = create(
  persist(
    (set) => ({
      isAdminLoggedIn: false,
      adminToken: null,

      adminLogin: async (email, password) => {
        const response = await AxiosInstance.post('/auth/admin-login', { email, password });
        if (response.data.success) {
          set({
            isAdminLoggedIn: true,
            adminToken: response.data.token,
          });
          return { success: true };
        }
        return { success: false, message: response.data.message };
      },

      adminLogout: async () => {
        try {
          await AxiosInstance.post('/auth/admin-logout');
        } catch (e) {
          // ignore logout errors
        }
        set({ isAdminLoggedIn: false, adminToken: null });
      },
    }),
    {
      name: 'superx-admin-auth', // localStorage key
      partialize: (state) => ({
        isAdminLoggedIn: state.isAdminLoggedIn,
        adminToken: state.adminToken,
      }),
    }
  )
);

export default useAdminAuthStore;
