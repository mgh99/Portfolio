// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "mgh-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored =
      (typeof window !== "undefined"
        ? (window.localStorage.getItem(THEME_KEY) as "light" | "dark" | null)
        : null) || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, next);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀" : "🌙"}
    </button>
  );
}
