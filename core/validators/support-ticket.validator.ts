import { z } from "zod";

export const supportTicketSchema = z.object({
  subject: z.string().min(5, "L'oggetto deve avere almeno 5 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  orderId: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9a-fA-F-]{36}$/.test(val), {
      message: "Inserisci un orderId valido",
    }),
  description: z
    .string()
    .min(10, "La descrizione deve avere almeno 10 caratteri"),
});
