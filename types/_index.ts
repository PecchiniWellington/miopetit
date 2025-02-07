import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  paymentMethodSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from "@/core/validators";
import { categorySchema } from "@/core/validators/category.validator";
import { insertReviewSchema } from "@/core/validators/reviews.validator";
import { Order } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Session } from "inspector";
import { Account } from "next-auth";

import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type IShippingAddress = z.infer<typeof shippingAddressSchema>;

// Payment method type
export type IPaymentMethod = z.infer<typeof paymentMethodSchema>;

// Orders
export type IOrderItem = z.infer<typeof insertOrderItemSchema>;
export type IOrder = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: IOrderItem[];
  paymentResult: IPaymentResult;
  user: { name: string; email: string } | null;
  latestSales?: ILatestSales[];
};

export type ILatestSales = {
  user: { name: string } | null;
  id: string;
  createdAt: Date;
  totalPrice: string;
};

// Payment result
export type IPaymentResult = z.infer<typeof paymentResultSchema>;

export type SalesDataType = {
  month: string;
  totalSales: number;
}[];

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};

export type IStatus = "danger" | "warning" | "success" | "default";

export type ICategory = z.infer<typeof categorySchema> & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IAddress {
  fullname: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
  role: string;
  address?: JsonValue | null; // TODO: Change to IAddress
  paymentMethod?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  accounts?: Account[];
  sessions?: Session[];
  Cart?: Cart[];
  Order?: Order[];
  Review?: Review[];
}
