import { prisma } from "@/core/prisma/prisma";
import { requestedProductArraySchema } from "@/core/validators/request-product.validator";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { IQueryParams } from "./get-all-product-by-slug";

export async function getAllRequestedProduct({
  contributorId,
  query,
  skip = 0,
  take = 20,
}: {
  contributorId: string;
  query: IQueryParams;
  skip?: number;
  take?: number;
}) {
  if (!contributorId) {
    throw new Error("Affiliate ID is required");
  }

  const where: any = {
    contributorId,
  };

  if (query.search) {
    const search = query.search.toLowerCase();
    where.OR = [{ name: { contains: search, mode: "insensitive" } }];
  }

  if (query.price) {
    const [min, max] = query.price.split("-").map(Number);
    where.price = {
      gte: min || 0,
      lte: max || Number.MAX_SAFE_INTEGER,
    };
  }

  let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };
  switch (query.sort) {
    case "lowest":
      orderBy = { price: "asc" };
      break;
    case "highest":
      orderBy = { price: "desc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const data = await prisma.requestedProduct.findMany({
    where,
    orderBy,
    skip,
    take,
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      quantity: true,
      targetAmount: true,
      fundedAmount: true,
      status: true,
      notes: true,
      createdAt: true,
      updatedAt: true,
      baseProduct: {
        select: {
          id: true,
          name: true,
          slug: true,
          images: true,
          price: true,
          productBrand: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      contributor: {
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
        },
      },
      donations: {
        select: {
          id: true,
          amount: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const transformedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image ?? null,
    price: item.price,
    costPrice: item.price,
    quantity: item.quantity,
    targetAmount: item.targetAmount,
    fundedAmount: item.fundedAmount,
    status: item.status,
    notes: item.notes ?? "",
    shortDescription: "",
    contributor: item.contributor,
    baseProduct: item.baseProduct ?? null,
    donations: item.donations ?? [],
    createdAt: formatDateTime(item.createdAt.toString()).dateTime,
    updatedAt: formatDateTime(item.updatedAt.toString()).dateTime,
    isRequestedProduct: true,
    type: "requested",
    progressPercentage: Math.min(
      (item.fundedAmount / item.targetAmount) * 100,
      100
    ),
  }));

  const result = requestedProductArraySchema.safeParse(transformedData);

  if (!result.success) {
    console.error(
      "❌ Errore nella validazione dei prodotti richiesti:",
      result.error.format()
    );
    throw new Error("Errore di validazione dei prodotti richiesti");
  }

  return convertToPlainObject(result.data);
}
