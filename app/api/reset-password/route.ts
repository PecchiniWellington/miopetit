import { prisma } from "@/core/prisma/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Token e nuova password sono obbligatori" },
        { status: 400 }
      );
    }

    // Verifica l'esistenza del token e dell'utente associato
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Token non valido o scaduto" },
        { status: 400 }
      );
    }

    // Hash della nuova password
    const hashedPassword = await hash(newPassword, 10);

    // Aggiorna la password e resetta il token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null, // Resetta il token dopo l'uso
      },
    });

    return NextResponse.json(
      { success: true, message: "Password aggiornata con successo" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore reset password:", error);
    return NextResponse.json(
      { success: false, message: "Errore interno del server" },
      { status: 500 }
    );
  }
}
