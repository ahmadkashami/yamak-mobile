import { create } from 'zustand';
import { IServices } from '../constants/data'

export const useServicesStore = create((set) => ({
    services: [],
    setServices: (services: IServices[]) => set((state) => ({ ...state, services: services })),
    selectedServiceId: null,
    setSelectServiceId: (id: String) => set(() => ({ selectedServiceId: id })),
    removeAllServices: () => set({ services: [] }),
}))