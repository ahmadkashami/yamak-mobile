import { create } from 'zustand';

export const useUserLocationStore = create((set) => ({
    userLocation: null,
    updateUserLocation: ({ latitude, longitude }: { latitude: number, longitude: number }) => set((state) => ({ userLocation: { latitude, longitude } })),
}))