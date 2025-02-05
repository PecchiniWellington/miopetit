import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { z, ZodError } from "zod";
import { ICategory, IUser, Product } from "@/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

// Format Number
const NUMBER_FORMATTER = new Intl.NumberFormat("it-IT");

export function formatNumber(num: number) {
  return NUMBER_FORMATTER.format(num);
}

export const removeUnderscore = (text: string) => {
  return text.replace(/_/g, " ");
};

export const camelCaseToSpaces = (text: string) => {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatError = ({
  error,
}: {
  error: ZodError | PrismaClientKnownRequestError;
}): string => {
  if (error instanceof ZodError) {
    // `error.errors` è un array, non un oggetto con chiavi
    const fieldErrors = error.errors.map((err) => err.message);
    return fieldErrors.join(",\n");
  } else if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    // Prisma `error.meta?.target` potrebbe essere un array o altro
    const field = Array.isArray(error.meta?.target)
      ? error.meta.target[0]
      : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  return "An unknown error occurred";
};

export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string");
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

// Format currency using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
}

export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// Format date and times
export function formatDateTime(dateString: string) {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", // Abbreviated year  name (e.g., "2024")
    month: "short", // Abbreviated month  name (e.g., "Oct")
    day: "numeric", // day of the month (e.g., "25")
    hour: "numeric", // numeric hour (e.g., "8")
    minute: "numeric", // numeric minute (e.g., "30")
    hour12: true, // use 12-hour clock (true) or 24-hour (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Abbreviated weekday name (e.g., "Mon")
    month: "short", // Abbreviated month  name (e.g., "Oct")
    year: "numeric", // Abbreviated year  name (e.g., "2024")
    day: "numeric", // day of the month (e.g., "25")
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., "8")
    minute: "numeric", // numeric minute (e.g., "30")
    hour12: true, // use 12-hour clock (true) or 24-hour (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "it-IT",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "it-IT",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "it-IT",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
}

// Form Url pagination links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);
  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    { skipNull: true }
  );
}

export const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
    "Price must have exactly two decimal places"
  );

export function mapProductsForDatabase(products: Product[]) {
  return products.map((product) => ({
    name: product.name,
    slug: product.slug,
    images: product.images, // Converte in array
    brand: product.brand,
    description: product.description,
    stock: product.stock,
    price: parseFloat(product.price),
    rating: parseFloat(product.rating),
    numReviews: product.numReviews,
    isFeatured: product.isFeatured,
    banner: product.banner || null,
    categoryId: product.categoryId,
  }));
}

export function mapUsersForDatabase(users: IUser[]) {
  return users.map((user) => ({
    name: user.name || "NO_NAME",
    email: user.email,
    emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
    image: user.image || null,
    password: user.password,
    role: user.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
    address: user.address || {},
    paymentMethod: user.paymentMethod || null,
  }));
}

export function formatCategoriesData(data: ICategory[]) {
  return data.map((item) => ({
    name: item.name?.trim() || "Unnamed Category",
    slug: item.slug?.trim().toLowerCase() || "default-slug",
    description: item.description || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}
