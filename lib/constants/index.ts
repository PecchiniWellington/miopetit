export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "MioPetit";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern E-commerce platform built with Next.js";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
