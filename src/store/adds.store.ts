import { create } from 'zustand';

export const useAddsStore = create((set) => ({
    adds: [],
    setAdds: (adds: []) => set((state) => ({ ...state, adds: adds })),
    removeAllAdds: () => set({ adds: [] }),
}))