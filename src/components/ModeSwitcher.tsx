"use client";

import { useTheme, Mode } from "@/components/ThemeProvider";
import { Monitor, Sun, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeSwitcher() {
  const { mode, setMode } = useTheme();

  const modes: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: "nikverse", label: "NikVerse", icon: <Monitor className="w-4 h-4" /> },
    { id: "classic", label: "Classic", icon: <Sun className="w-4 h-4" /> },
    { id: "playgrid", label: "PlayGrid", icon: <Gamepad2 className="w-4 h-4" /> },
  ];

  return (
    <div className="flex bg-muted p-1 rounded-full items-center space-x-1 border border-border">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
            mode === m.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {m.icon}
          <span className="hidden lg:inline-block">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
