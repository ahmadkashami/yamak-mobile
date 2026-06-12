import { create } from 'zustand';

export const useErrorStore = create()((set, get) => ({
    error: "",
    errorCode: null,
    setError: (error: string, errorCode = 400) => set((state) => ({ ...state, error, errorCode })),
    removeError: () => set({ error: "", errorCode: null }),
}))