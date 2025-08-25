"use client";
import { createContext, useContext } from "react";

const DarkModeContext = createContext(null);

export function DarkModeProvider({ value, children }) {
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkModeCtx() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error("useDarkModeCtx must be used within DarkModeProvider");
  return ctx;
}
export default DarkModeContext;
