import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject } from "@/lib/utils";
import { z } from "zod";

// Tipizzazione dei query params
export type IQueryParams = {
  [key: string]: string;
};

// Funzione ricorsiva per ottenere tutte le sottocategorie di una categoria
async function getAllSubCategoryIds(parentId: string): Promise<string[]> {
  const subCategories = await prisma.category.findMany({
    where: { parentId },
    select: { id: true },
  });

  if (subCategories.length === 0) return []; // Nessuna sottocategoria

  const subCategoryIds = subCategories.map((c) => c.id);
  const deepSubCategoryIds = await Promise.all(
    subCategoryIds.map((id) => getAllSubCategoryIds(id))
  );

  return subCategoryIds.concat(deepSubCategoryIds.flat());
}

// Trova la categoria principale associata a categoryType
async function getMainCategory(categorySlug: string) {
  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
    },
    select: { id: true, parentId: true },
  });

  console.log(
    `🔍 Categoria principale trovata per slug "${categorySlug}":`,
    category
  );

  return convertToPlainObject(category);
}

// Ottieni tutti i prodotti per categoryType e sottocategorie
export async function getAllProductsBySlug({
  query,
  slug,
}: {
  query: IQueryParams;
  slug: string;
}) {
  try {
    console.log(`🔎 Ricerca prodotti per categoryType: ${slug}`);

    // Trova la categoria principale associata al categoryType
    const mainCategory = await getMainCategory(slug);

    console.log("🔍 Query params:", mainCategory);

    if (!mainCategory) {
      console.warn(`⚠️ Nessuna categoria trovata per slug: ${slug}`);
      return { data: [], totalPages: 0, totalProducts: 0 };
    }

    const subCategoryIds = await getAllSubCategoryIds(mainCategory.id);
    const categoryIds = [mainCategory.id, ...subCategoryIds];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      OR: [
        { categoryType: slug },
        {
          productCategory: {
            some: {
              categoryId: { in: categoryIds },
            },
          },
        },
      ],
    };

    if (query.animalAge) {
      where.animalAge = query.animalAge;
    }

    if (query.productBrand) {
      const productBrand = await prisma.productBrand.findFirst({
        where: { slug: query.productBrand },
        select: { id: true },
      });

      if (productBrand) {
        where.productBrandId = productBrand.id;
      } else {
        console.warn(`⚠️ Nessun brand trovato per slug: ${query.productBrand}`);
      }
    }

    if (query.productFormats) {
      const productFormat = await prisma.productUnitFormat.findFirst({
        where: { slug: query.productFormats },
        select: { id: true },
      });

      if (productFormat) {
        where.productUnitFormatId = productFormat.id;
      } else {
        console.warn(
          `⚠️ Nessun formato trovato per slug: ${query.productFormats}`
        );
      }
    }

    if (query.productPathologies) {
      const productPathology = await prisma.productPathology.findUnique({
        where: { slug: query.productPathologies },
        select: { id: true },
      });

      if (productPathology?.id) {
        where.productPathologyOnProduct = {
          some: {
            pathologyId: productPathology.id,
          },
        };
      } else {
        console.warn(
          `⚠️ Nessuna patologia trovata per slug: ${query.productPathologies}`
        );
      }
    }

    if (query.productProteins) {
      const productProteins = await prisma.productProtein.findUnique({
        where: { slug: query.productProteins },
        select: { id: true },
      });

      if (productProteins?.id) {
        where.productProteinOnProduct = {
          some: {
            productProteinId: productProteins.id,
          },
        };
      } else {
        console.warn(
          `⚠️ Nessuna proteina trovata per slug: ${query.productProteins}`
        );
      }
    }

    if (query.price) {
      const [min, max] = query.price.split("-").map(Number);
      where.price = {
        gte: min || 0,
        lte: max || Number.MAX_SAFE_INTEGER,
      };
    }

    // Trova i prodotti filtrati
    const data = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        description: true,
        images: true,
        stock: true,
        rating: true,
        numReviews: true,
        isFeatured: true,
        createdAt: true,
        updatedAt: true,
        animalAge: true,
        categoryType: true,
        percentageDiscount: true,

        productCategory: {
          select: {
            category: true,
          },
        },

        productBrand: {
          select: {
            id: true,
            name: true,
          },
        },

        productUnitFormat: {
          select: {
            id: true,
            slug: true,
            unitValue: { select: { value: true } },
            unitOfMeasure: { select: { code: true } },
          },
        },

        productPathologyOnProduct: {
          select: {
            pathology: { select: { id: true, name: true } },
          },
        },

        productsFeatureOnProduct: {
          select: {
            productFeature: { select: { id: true, name: true } },
          },
        },

        productProteinOnProduct: {
          select: {
            productProtein: { select: { id: true, name: true } },
          },
        },
      },
      orderBy:
        query.sort === "lowest"
          ? { price: "asc" }
          : query.sort === "highest"
            ? { price: "desc" }
            : query.sort === "rating"
              ? { rating: "desc" }
              : { createdAt: "desc" },
    });

    /* OUTPUT */
    const transformedData = data.map(
      ({
        productPathologyOnProduct,
        productProteinOnProduct,
        productCategory,
        productsFeatureOnProduct,
        ...rest
      }) => ({
        ...rest,
        productPathologies: productPathologyOnProduct.map((p) => p.pathology),
        productProteins: productProteinOnProduct.map((p) => p.productProtein),
        productCategories: productCategory.map((c) => c.category),
        productUnitFormat: rest.productUnitFormat
          ? {
              id: rest.productUnitFormat.id,
              unitValue: rest.productUnitFormat.unitValue.value,
              unitOfMeasure: rest.productUnitFormat.unitOfMeasure.code,
              slug: rest.productUnitFormat.slug,
            }
          : null,
        productFeature: productsFeatureOnProduct.map((f) => f.productFeature),
      })
    );

    const result = z.array(productSchema).safeParse(transformedData);

    if (!result.success) {
      console.error(
        "❌ Errore nella validazione dei prodotti:",
        result.error.format()
      );
      throw new Error("Errore di validazione dei prodotti");
    }
  } catch (error) {
    console.error("❌ Errore durante il fetch dei prodotti:", error);
    return { data: [], totalPages: 0, totalProducts: 0 };
  }
}
