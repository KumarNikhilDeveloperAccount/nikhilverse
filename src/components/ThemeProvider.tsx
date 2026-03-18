"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Mode = "nikverse" | "classic" | "playgrid";

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("nikverse");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("nk-theme") as Mode;
    if (stored && ["nikverse", "classic", "playgrid"].includes(stored)) {
      setModeState(stored);
      document.documentElement.className = stored;
    } else {
      document.documentElement.className = "nikverse";
      setModeState("nikverse");
    }
  }, []);

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem("nk-theme", newMode);
    document.documentElement.className = newMode;
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
