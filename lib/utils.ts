import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { z } from "zod";

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

export const formatError = (error: any) => {
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      return error.errors[field].message;
    });
    return fieldErrors.join(",\n");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }
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
  } else "NaN";
}

export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// Format date and times
export function formatDateTime(dateString: any) {
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

export function mapProductsForDatabase(products: any[]): any[] {
  return products.map((product) => ({
    name: product.name,
    slug: product.slug,
    images: product.images.includes(",")
      ? product.images.split(",")
      : [product.images], // Converte in array
    brand: product.brand,
    description: product.description,
    stock: parseInt(product.stock, 10), // Converte in numero
    price: parseFloat(product.price), // Converte in numero decimale
    rating: parseFloat(product.rating), // Converte in numero decimale
    numReviews: parseInt(product.numReviews, 10), // Converte in numero intero
    isFeatured: product.isFeatured.toLowerCase() === "true", // Converte in booleano
    banner: product.banner || null, // Se vuoto, imposta `null`
    categoryId: product.categoryId, // Deve essere un UUID valido
  }));
}

export function mapUsersForDatabase(users: any[]): any[] {
  return users.map((user) => ({
    name: user.name || "NO_NAME", // Default se manca il nome
    email: user.email,
    emailVerified: user.emailVerified ? new Date(user.emailVerified) : null, // Converte in Date o `null`
    image: user.image || null, // Converte stringhe vuote in `null`
    password: user.password, // Mantiene la password così com'è
    role: user.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER", // Assicura che il ruolo sia valido
    address: user.address ? JSON.parse(user.address) : null, // Se è una stringa JSON, la converte
    paymentMethod: user.paymentMethod || null, // Converte stringhe vuote in `null`
  }));
}
