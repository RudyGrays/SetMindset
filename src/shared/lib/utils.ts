import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getServerTheme() {
  const theme = localStorage.get("theme") || "dark"; // default to 'light'
  return theme;
}
