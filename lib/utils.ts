import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
