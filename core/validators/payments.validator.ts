import { PAYMENT_METHODS } from "@/lib/constants/payment-methods";
import { z } from "zod";

// Schema for the payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS?.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export type IPaymentMethod = z.infer<typeof paymentMethodSchema>;
export type IPaymentResult = z.infer<typeof paymentResultSchema>;
