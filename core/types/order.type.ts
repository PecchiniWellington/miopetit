import { ILatestSales, IPaymentResult } from "@/types/_index";
import { z } from "zod";
import { insertOrderItemSchema, insertOrderSchema } from "../validators";

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
