import { create } from 'zustand'

export const useAppReadyStore = create((set) => ({
  isFirstLunch: false,
  appSetting: null,
  setIsFirstLunch: (value: boolean) =>
    set((state) => ({ ...state, isFirstLunch: value })),
  setAppSetting: (value: boolean) =>
    set((state) => ({ ...state, appSetting: value })),
}));