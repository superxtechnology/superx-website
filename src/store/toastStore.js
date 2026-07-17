import { create } from 'zustand';

const useToastStore = create((set) => ({
  toast: { show: false, type: 'info', title: '', message: '' },
  showToast: (title, message, type = 'success') => set({
    toast: { show: true, type, title, message }
  }),
  hideToast: () => set((state) => ({
    toast: { ...state.toast, show: false }
  })),
}));

export default useToastStore;
