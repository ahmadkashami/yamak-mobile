import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FavoritesState {
  favorites: number[];
  addToFavotires: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  clearFav?: () => void;
}
export const useFavouriteStore = create<FavoritesState>((set) => ({
  favorites: [],
  // fetchFavorite: async () => {
  //   await AsyncStorage.getItem("favorites").then((fav) => {
  //     if (fav) set({ favorites: JSON.parse(fav) });
  //   });
  // },
  addToFavotires: (id: number) =>
    set((state) => ({ favorites: [...state.favorites, id] })),
  removeFromFavorites: (id) =>
    set((state) => ({ favorites: state.favorites.filter((fav) => fav != id) })),
}));

export const useFavouriteStoreAsync = create(
  persist(
    (set, get: any) => ({
      favorites: [],
      addToFavotires: (id: number) =>
        set({ favorites: [...get().favorites, id] }),
      removeFromFavorites: (id: number) => {
        set({ favorites: get().favorites.filter((fav) => fav != id) });
      },
      clearFav: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites",
      // storage: () => AsyncStorage,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
