import { prisma } from "@/core/prisma/prisma";
import { PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { getAllBrands } from "./product-infos.ts";
import { getAllCategories } from "./product-infos.ts/get-product-category.action";

export async function getAllProducts({
  queries = {},
  query,
  limit = PAGE_SIZE,
  page,
  sort,
}: {
  queries?: { [key: string]: string };
  query?: string;
  limit?: number;
  page: number;
  sort?: string;
}) {
  console.log("QUERIES:", queries);

  // Filtro di ricerca per nome del prodotto
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Ottieni tutte le categorie e i brand
  const categories = await getAllCategories();
  const brands = await getAllBrands();

  // Creazione di una mappa per categorie e brand
  const categoryMap = Object.fromEntries(
    categories?.data?.map((cat) => [cat.slug, cat.id]) || []
  );
  const brandMap = Object.fromEntries(
    brands?.map((brand) => [brand.name, brand.id]) || []
  );

  // Lista di campi validi nella tabella `product`
  const validFields = new Set([
    "name",
    "slug",
    "price",
    "rating",
    "stock",
    "animalAge",
    "productBrandId",
    "productPathologyId",
    "productUnitFormatId",
  ]);

  // Costruzione dinamica dei filtri Prisma basati su queries
  const dynamicFilters: Prisma.ProductWhereInput = {};

  for (const [key, value] of Object.entries(queries)) {
    if (!value || value === "all") continue;

    if (key === "price" && value.includes("-")) {
      // Filtra per range di prezzo
      const [min, max] = value.split("-").map(Number);
      dynamicFilters.price = {
        gte: min || 0,
        lte: max || Infinity,
      };
    } else if (key === "rating") {
      // Filtra per rating minimo
      dynamicFilters.rating = {
        gte: parseInt(value),
      };
    } else if (key === "category" && categoryMap[value]) {
      // Filtra per categoria ID
      dynamicFilters.productCategory = {
        some: {
          category: {
            id: categoryMap[value],
          },
        },
      };
    } else if (key === "brand" && brandMap[value]) {
      // Filtra per brand ID
      dynamicFilters.productBrandId = brandMap[value];
    } else if (validFields.has(key)) {
      // Solo campi validi vengono aggiunti
      (dynamicFilters as Record<string, string | number | Prisma.StringFilter>)[
        key
      ] = value;
    } else {
      console.warn(`⚠️ Il filtro '${key}' non è un campo valido per Prisma.`);
    }
  }

  // Fetch dei prodotti con i filtri applicati
  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...dynamicFilters,
    },
    include: {
      productCategory: {
        include: { category: true },
      },
      productUnitFormat: true,
    },
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort === "highest"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  // Conteggio totale dei prodotti
  const productCount = await prisma.product.count({ where: dynamicFilters });

  // Format dei dati per il frontend
  const updatedData = data.map((item) => ({
    ...item,
    category: item.productCategory?.length
      ? item.productCategory.map((pc) => pc.category.name).join(", ")
      : "N/A",
    productBrand: item.productBrandId
      ? brands?.find((b) => b.id === item.productBrandId)?.name
      : null,
  }));

  return {
    ...convertToPlainObject(updatedData),
    totalPages: Math.ceil(productCount / limit),
    totalProducts: productCount,
  };
}
