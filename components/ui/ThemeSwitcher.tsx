"use client";

import * as React from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Moon, Sun, Palette } from "lucide-react";

const colors = [
  { name: "blue", class: "bg-blue-600" },
  { name: "green", class: "bg-emerald-600" },
  { name: "purple", class: "bg-purple-600" },
  { name: "ruby", class: "bg-rose-600" },
];

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeColor, setActiveColor] = React.useState("blue");

  React.useEffect(() => {
    setMounted(true);
    const color = document.documentElement.getAttribute("data-color") || "blue";
    setActiveColor(color);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const changeColor = (color: string) => {
    document.documentElement.setAttribute("data-color", color);
    localStorage.setItem("theme-color", color);
    setActiveColor(color);
    setIsOpen(false);
  };

  return (
    <div className="relative isolate z-50 flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-muted text-foreground transition"
        aria-label="Toggle Dark Mode"
      >
        {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-muted text-foreground transition"
          aria-label="Change Theme Color"
        >
          <Palette size={20} />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <div className="absolute end-0 mt-2 p-2 bg-card border border-border shadow-2xl rounded-xl z-50 flex flex-col gap-2 w-32 animate-in fade-in zoom-in-95">
              <span className="text-xs font-semibold px-2 text-muted-foreground mb-1">Select Color</span>
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => changeColor(c.name)}
                  className={`flex items-center gap-3 px-2 py-1.5 w-full rounded-md hover:bg-muted transition text-sm ${activeColor === c.name ? "bg-muted font-bold" : ""}`}
                >
                  <div className={`w-4 h-4 rounded-full ${c.class}`} />
                  <span className="capitalize">{c.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
