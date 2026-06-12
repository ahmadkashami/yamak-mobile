import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useAuthenticationStoreAsync = create(
    persist(
        (set, get: any) => ({
            user: null,
            token: null,
            authenticate: (token: string, user: any) =>
                set({ token: token, user }),
            updateUserInfo: (user: any) =>
                set({ token: get().token, user }),
            removeAuthentication: () => {
                set({ token: null, user: null });
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);