import { z } from "zod";
import { paymentMethodSchema, paymentResultSchema } from "../validators";

export type IPaymentMethod = z.infer<typeof paymentMethodSchema>;
export type IPaymentResult = z.infer<typeof paymentResultSchema>;
