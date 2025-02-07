import { z } from "zod";
import { shippingAddressSchema } from "../validators";

export type IShippingAddress = z.infer<typeof shippingAddressSchema>;
