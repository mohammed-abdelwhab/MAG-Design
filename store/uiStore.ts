import { create } from "zustand";
import type { Locale } from "@/types";

interface UIState {
  locale: Locale;
  dir: "ltr" | "rtl";
  mobileMenuOpen: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  locale: "en",
  dir: "ltr",
  mobileMenuOpen: false,
  setLocale: (locale) =>
    set({ locale, dir: locale === "ar" ? "rtl" : "ltr" }),
  toggleLocale: () => {
    const next = get().locale === "en" ? "ar" : "en";
    set({ locale: next, dir: next === "ar" ? "rtl" : "ltr" });
  },
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
