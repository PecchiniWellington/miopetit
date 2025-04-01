"use server";

import { prisma } from "@/core/prisma/prisma";
import { DefaultSession, User } from "next-auth";

const ALLOWED_STATUSES = ["PENDING", "APPROVED", "REJECTED", "FUNDED"];

export async function getRequestedProductsByContributor({
  user,
  contributorId,
  query,
  page = 1,
  limit = 10,
}: {
  user?: (User & DefaultSession["user"]) | null;
  contributorId?: string;
  query?: string;
  page?: number;
  limit?: number;
}) {
  // Trova contributor associato all'utente (se necessario)
  if (user && !contributorId) {
    const contributor = await prisma.contributor.findFirst({
      where: {
        users: {
          some: { id: user.id },
        },
      },
      select: { id: true },
    });

    if (!contributor) {
      console.warn("⛔ Nessun contributor associato all'utente");
      return {
        data: [],
        totalPages: 0,
        totalRequestedProducts: 0,
      };
    }

    contributorId = contributor.id;
  }

  if (!contributorId) {
    console.warn("⛔ contributorId mancante");
    return {
      data: [],
      totalPages: 0,
      totalRequestedProducts: 0,
    };
  }

  // Verifica accesso ADMIN
  if (user?.role === "ADMIN") {
    const isAssociated = await prisma.contributor.findFirst({
      where: {
        id: contributorId,
        users: {
          some: { id: user.id },
        },
      },
    });

    if (!isAssociated) {
      console.warn("⛔ ADMIN non associato al contributor richiesto");
      return {
        data: [],
        totalPages: 0,
        totalRequestedProducts: 0,
      };
    }
  }

  const isUuidQuery =
    query &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      query
    );

  // Costruzione filtro dinamico
  const where: any = {
    AND: [
      { contributorId },
      query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { notes: { contains: query, mode: "insensitive" } },
              ...(isUuidQuery ? [{ id: query }] : []),
            ],
          }
        : {},
    ],
  };

  const totalCount = await prisma.requestedProduct.count({ where });

  const requestedProducts = await prisma.requestedProduct.findMany({
    where,
    include: {
      contributor: {
        select: { id: true, name: true, type: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const normalized = requestedProducts.map((product) => ({
    ...product,
    status: ALLOWED_STATUSES.includes(product.status)
      ? product.status
      : "PENDING", // fallback
  }));

  return {
    data: normalized,
    totalPages: Math.ceil(totalCount / limit),
    totalRequestedProducts: totalCount,
  };
}
