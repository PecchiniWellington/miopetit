import { ICartItem } from "@/core/validators";
import { clsx, type ClassValue } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any) => {
  if (error.name === "ZodError") {
    console.log("⚠️ [Zod Validation Error] - Dettagli:", error.errors);

    const fieldErrors = error.errors.map((err: z.ZodIssue) => {
      const fieldPath = err.path.join("."); // Se il path è annidato, lo rende più leggibile

      let message = `🔍 Campo: "${fieldPath}"\n`;

      if (err.code === "invalid_type") {
        message += `   ❌ Tipo errato\n`;
        message += `   ➡️  Atteso: "${err.expected}"\n`;
        message += `   ❌ Ricevuto: "${err.received}"\n`;
      } else if (err.code === "invalid_literal") {
        message += `   🚨 Campo obbligatorio mancante\n`;
      } else {
        message += `   📌 Dettaglio: ${err.message}\n`;
      }

      return message;
    });

    return fieldErrors.join("\n");
  } else if (error.name === "TypeError") {
    return error.message;
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
  } else {
    return 0;
  }
}

export function formatId(id: string) {
  return `..${id?.substring(id.length - 6)}`;
}

// Format date and times
export function formatDateTime(dateString?: string) {
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
  if (!dateString) {
    return {
      dateTime: "",
      dateOnly: "",
      timeOnly: "",
    };
  }

  const date = new Date(dateString);
  const formattedDateTime: string = date.toLocaleString(
    "it-IT",
    dateTimeOptions
  );
  const formattedDate: string = date.toLocaleString("it-IT", dateOptions);
  const formattedTime: string = date.toLocaleString("it-IT", timeOptions);

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

export function generateSlug(input: string): string {
  return input
    .toLowerCase() // Converti tutto in minuscolo
    .trim() // Rimuove spazi iniziali e finali
    .normalize("NFD") // Decompone i caratteri accentati
    .replace(/[\u0300-\u036f]/g, "") // Rimuove i segni diacritici (accenti)
    .replace(/[^a-z0-9\s-]/g, "") // Rimuove caratteri speciali
    .replace(/\s+/g, "-") // Sostituisce spazi con trattini
    .replace(/-+/g, "-"); // Evita doppi trattini
}

/* BE VALIDATION */
export function formatValidationError(errorJson: string) {
  try {
    const errors = JSON.parse(errorJson);

    return errors.map(
      (err: {
        path: string[];
        message: string;
        expected: string;
        received: string;
      }) => ({
        field: err.path.join("."), // Nome del campo
        message: err.message, // Messaggio di errore
        expected: err.expected, // Tipo previsto
        received: err.received, // Tipo ricevuto
      })
    );
  } catch {
    return { error: "Errore nel parsing del messaggio di errore." };
  }
}
export function transformKey(key: string): string {
  return key
    .replace(/^Product/, "") // Rimuove "Product" se presente
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Separa camelCase con spazio
}

export const generatePriceRanges = (
  min: number,
  max: number,
  step: number = 10
) => {
  const ranges = [];
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;

  for (let i = start; i < end; i += step) {
    ranges.push({
      label: `${i}-${i + step} €`,
      value: `${i}-${i + step}`,
    });
  }

  return ranges;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const isEqual = (
  value: { [key: string]: unknown },
  other: { [key: string]: unknown }
): boolean => {
  if (value === other) return true;

  if (
    typeof value !== "object" ||
    value === null ||
    typeof other !== "object" ||
    other === null
  ) {
    return false;
  }

  const keysA = Object.keys(value);
  const keysB = Object.keys(other);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (
      !keysB.includes(key) ||
      !isEqual(
        value[key] as { [key: string]: unknown },
        other[key] as { [key: string]: unknown }
      )
    ) {
      return false;
    }
  }

  return true;
};

export const memoize = <T>(value: T): T => {
  let cache: T | null = null;
  if (cache === null) {
    cache = value;
  }
  return cache;
};

export const calcPrice = (items: ICartItem[]) => {
  const itemsPrice = items?.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );
  const totalItems = items?.reduce((acc, item) => acc + item.qty, 0);

  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice?.toFixed(2),
    shippingPrice: shippingPrice?.toFixed(2),
    taxPrice: taxPrice?.toFixed(2),
    totalPrice: totalPrice?.toFixed(2),
    totalItems: totalItems,
  };
};
