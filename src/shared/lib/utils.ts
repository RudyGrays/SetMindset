import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getServerTheme() {
  const theme = localStorage.get("theme") || "dark"; // default to 'light'
  return theme;
}

export function formatDate(date: Date) {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, "0"); // добавляем ведущие нули
  const minutes = String(date.getMinutes()).padStart(2, "0"); // добавляем ведущие нули

  return `${day} ${month}, ${hours}:${minutes}`;
}
