import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuth = create()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAccessToken: (token) =>
        set((state) => ({ ...state, accessToken: token })),
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
