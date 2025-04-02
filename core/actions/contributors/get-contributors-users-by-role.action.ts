"use server";

import { userSchema } from "@/core/validators/user.validator";
import { PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";
import { z } from "zod";
import { getContributorByUserId } from "./get-contributor-by-user-id";
import { prisma } from "@/core/prisma/prisma";
import { Role } from "@prisma/client";

export async function getContributorUsersByRole({
  userId,
  role,
  query,
  page = 1,
  limit = PAGE_SIZE,
}: {
  userId: string;
  role?: Role;
  query?: string;
  page?: number;
  limit?: number;
}) {
  // Recupera l'utente per controllare se è SUPER_ADMIN
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!currentUser) {
    throw new Error("Utente non trovato");
  }

  let users;

  if (currentUser.role === Role.SUPER_ADMIN) {
    // 🔓 SUPER_ADMIN vede tutti
    users = await prisma.user.findMany();
  } else {
    // 🔐 Altri vedono solo utenti del proprio contributor
    const contributor = await getContributorByUserId(userId);

    if (!contributor || !Array.isArray(contributor.users)) {
      return { data: [], totalPages: 0, totalUsers: 0 };
    }

    users = contributor.users;
  }

  // Filtro per ruolo
  if (role) {
    users = users.filter((user) => user.role === role);
  }

  // Filtro per query (name contiene query, case insensitive)
  if (query && query !== "all") {
    const search = query.toLowerCase();
    users = users.filter((user) => user.name?.toLowerCase().includes(search));
  }

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / limit);

  // Applica paginazione
  const paginatedUsers = users.slice((page - 1) * limit, page * limit);

  // Validazione
  const { success, data, error } = z
    .array(userSchema)
    .safeParse(paginatedUsers);

  if (!success) {
    console.error("❌ Errore nella validazione degli utenti:", error.format());
    throw new Error("Errore nella validazione degli utenti");
  }

  return {
    data: convertToPlainObject(data),
    totalPages,
    totalUsers,
  };
}
