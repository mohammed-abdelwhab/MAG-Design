"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { dir } = useUIStore();

  // Sync dir attribute to <html> element
  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", dir === "rtl" ? "ar" : "en");
  }, [dir]);

  return <>{children}</>;
}
