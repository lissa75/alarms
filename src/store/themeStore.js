import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,

      setIsDark: (isDark) => set({ isDark }),

      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    { name: "theme-storage" },
  ),
);
