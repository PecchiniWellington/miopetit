export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "MioPetit";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern E-commerce platform built with Next.js";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const BASE_URL_IMAGE =
  process.env.BASE_URL_IMAGE || "https://utfs.io/f/";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const SIGN_IN_DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const SIGN_UP_DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SHIPPING_ADDRESS_DEFAULT_VALUES = {
  fullname: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export const PRODUCT_DEFAULT_VALUES = {
  name: "",
  slug: "",
  category: {},
  categoryId: "",
  images: [],
  brand: "",
  description: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};

export const REVIEW_FORM_DEFAULT_VALUES = {
  title: "",
  comment: "",
  rating: 0,
};

export const STATUS = {
  PRIMARY: "primary",
  PRIMARY_ACTIVE: "primary-active",
  DANGER: "danger",
  WARNING: "warning",
  SUCCESS: "success",
  DEFAULT: "default",
};

export const CATEGORIES_DEFAULT_VALUES = {
  /* Attenzione all'id */
  name: "",
  slug: "",
  description: "",
};
