import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ClientUser } from "@/types";

interface AuthState {
  user: ClientUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: ClientUser) => void;
  loginAdmin: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      login: (user) => set({ user, isAuthenticated: true, isAdmin: false }),
      loginAdmin: () => set({ user: null, isAuthenticated: true, isAdmin: true }),
      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false }),
    }),
    {
      name: "mag-auth",
    }
  )
);
