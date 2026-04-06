"use client";

import { useEffect } from "react";

export function ColorInitializer() {
  useEffect(() => {
    // Read user color preference from localStorage
    const color = localStorage.getItem("theme-color") || "blue";
    document.documentElement.setAttribute("data-color", color);
  }, []);

  return null;
}
