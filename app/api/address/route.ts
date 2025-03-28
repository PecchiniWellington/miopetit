import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import {
  createAddressSchema,
  updateAddressSchema,
} from "@/core/validators/user-address.validator";
import { NextResponse } from "next/server";

// 📌 GET: Ottieni tutti gli indirizzi dell'utente autenticato
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Non autorizzato" },
      { status: 401 }
    );
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ success: true, addresses }, { status: 200 });
}

// 📌 POST: Aggiungi un nuovo indirizzo per l'utente autenticato
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Non autorizzato" },
      { status: 401 }
    );
  }

  const body: unknown = await req.json();

  if (
    typeof body !== "object" ||
    !body ||
    !("street" in body) ||
    !("city" in body)
  ) {
    return NextResponse.json(
      { success: false, message: "Dati mancanti" },
      { status: 400 }
    );
  }

  const data = createAddressSchema.parse(body);

  const newAddress = await prisma.address.create({
    data: {
      ...data,
      userId: session.user.id, // Associa l'indirizzo all'utente autenticato
    },
  });

  return NextResponse.json(
    { success: true, address: newAddress },
    { status: 201 }
  );
}

// 📌 PUT: Modifica un indirizzo esistente
export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Non autorizzato" },
      { status: 401 }
    );
  }

  // 🔥 Usa una variabile per assegnare `req.json()` e fai console.log del suo contenuto
  const body: unknown = await req.json();
  console.log("BODY PUT:", JSON.stringify(body)); // 🔥 Stampa il body per debugging

  // Verifica che il body contenga effettivamente i dati necessari
  if (
    typeof body !== "object" ||
    !body ||
    !("id" in body) ||
    !("street" in body) ||
    !("city" in body)
  ) {
    return NextResponse.json(
      { success: false, message: "Dati mancanti" },
      { status: 400 }
    );
  }

  // Validazione dei dati con Zod
  const data = updateAddressSchema.parse(body);

  // Modifica l'indirizzo esistente
  const updatedAddress = await prisma.address.update({
    where: {
      id: data.id,
    },
    data: {
      street: data.street,
      city: data.city,
      isDefault: data.isDefault ?? false,
    },
  });

  return NextResponse.json(
    { success: true, address: updatedAddress },
    { status: 200 }
  );
}
