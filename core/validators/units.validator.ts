import { z } from "zod";

// Schema per validare UnitValue (es. { id: "uuid", value: 15 })
export const unitValueSchema = z.object({
  id: z.string().uuid(),
  value: z
    .number()
    .positive()
    .max(9999999999.99)
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Value must have at most two decimal places",
    }), // Assicura che sia un numero positivo con massimo due decimali
});

// Schema per validare UnitOfMeasure (es. { id: "uuid", abbreviation: "kg" })
export const unitOfMeasureSchema = z.object({
  id: z.string().uuid(),
  abbreviation: z.string().min(1), // Assicura che abbia almeno 1 carattere
});

// Schema per validare ProductUnitFormat
export const productUnitFormatSchema = z.object({
  id: z.string().uuid(),
  unitValueId: z.string().uuid(),
  unitMeasureId: z.string().uuid(),
  unitValue: unitValueSchema, // Include il valore numerico
  unitOfMeasure: unitOfMeasureSchema, // Include l'unità di misura
  products: z
    .array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
      })
    )
    .optional(), // Opzionale, nel caso in cui non ci siano prodotti associati
});

export type IProductUnitFormat = z.infer<typeof productUnitFormatSchema>;
