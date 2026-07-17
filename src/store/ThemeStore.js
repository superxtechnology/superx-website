import { create } from 'zustand';

const useThemeStore = create((set) => ({
  // LocalStorage se default theme check karega
  theme: localStorage.getItem('superx_theme') || 'light',
  
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('superx_theme', nextTheme);
    return { theme: nextTheme };
  }),
}));

export default useThemeStore;