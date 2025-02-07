import { Cart, Order, Review } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Session } from "inspector";
import { Account } from "next-auth";

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
