import { z } from "zod";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum AnimalStatus {
  ADOPTABLE = "ADOPTABLE",
  IN_CARE = "IN_CARE",
  ADOPTED = "ADOPTED",
  DECEASED = "DECEASED",
}

// Schema condiviso per i campi comuni
const baseAnimalSchema = z.object({
  name: z.string(),
  microchipCode: z.string(),
  breed: z.string(),
  gender: z.nativeEnum(Gender),
  age: z.number().int().nonnegative(),
  intakeDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data non valida",
  }),
  origin: z.string(),
  description: z.string().optional().nullable(),
  status: z.nativeEnum(AnimalStatus),
  photoUrl: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),
  animalType: z.string(),
  contributorId: z.string().uuid(),
});

// ✅ Per la creazione — niente ID
export const createAnimalSchema = baseAnimalSchema;

// ✅ Per l'aggiornamento — richiede anche l'ID
export const updateAnimalSchema = baseAnimalSchema.extend({
  id: z.string().uuid(),
});

export type ICreateAnimal = z.infer<typeof createAnimalSchema>;
export type IUpdateAnimal = z.infer<typeof updateAnimalSchema>;
