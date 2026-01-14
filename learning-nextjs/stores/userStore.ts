import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/auth/types/auth";

type UserState = {
    user: User | null;
    isHydrated: boolean;
};

type UserActions = {
    setUser: (user: User) => void;
    clearUser: () => void;
    setHydrated: () => void;
};

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            // State
            user: null,
            isHydrated: false,

            // Actions
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            setHydrated: () => set({ isHydrated: true }),
        }),
        {
            name: "user-storage", // localStorage key
            onRehydrateStorage: () => (state) => {
                // Được gọi sau khi hydrate từ localStorage
                state?.setHydrated();
            },
        }
    )
);

// Hook để check đã hydrate chưa (tránh hydration mismatch)
export const useIsHydrated = () => useUserStore((state) => state.isHydrated);

