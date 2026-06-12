import { create } from 'zustand';

export const useVehicleStore = create((set) => ({
    vehicles: [],
    // allVehicles: [],
    // setAllVehicles: (vehicles: any[]) => set((state) => ({ ...state, allVehicles: vehicles })),
    setVehicles: (vehicles: any[]) => set((state) => ({ ...state, vehicles: vehicles })),
    removeAllVehicles: () => set({ vehicles: [] }),
}))