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

// Format number with decimal places
export function formatNumberWithDecimal(
  num: number,
  decimalPlaces = 2
): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(decimalPlaces, "0")}` : `${int}.00`;
}

export const removeUnderscore = (text: string) => {
  return text.replace(/_/g, " ");
};
export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
