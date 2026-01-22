"use client";

import { createContext, useContext, useState } from "react";

type Lang = "th" | "en";

const AdminLangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
} | null>(null);

export function AdminLangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("th");

  return (
    <AdminLangContext.Provider value={{ lang, setLang }}>
      {children}
    </AdminLangContext.Provider>
  );
}

export function useAdminLang() {
  const ctx = useContext(AdminLangContext);
  if (!ctx) {
    throw new Error("useAdminLang must be used within AdminLangProvider");
  }
  return ctx;
}
