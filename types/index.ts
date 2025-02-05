import { USER_STATUS_ACTIVATION } from "@/lib/constants/user-status";
import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  paymentMethodSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from "@/lib/validators";
import { categorySchema } from "@/lib/validators/category.validator";
import { insertReviewSchema } from "@/lib/validators/reviews.validator";
import { Order } from "@prisma/client";
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
  latestSales?: IOrderItem[];
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
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: USER_STATUS_ACTIVATION;
  address?: IAddress;
  paymentMethod?: string;
  status: USER_STATUS_ACTIVATION;
  createdAt: Date;
  updatedAt: Date;
  accounts: Account[];
  sessions: Session[];
  Cart: Cart[];
  Order: Order[];
  Review: Review[];
}
