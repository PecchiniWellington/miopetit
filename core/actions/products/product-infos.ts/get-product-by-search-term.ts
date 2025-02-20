import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

/**
 * 🔍 Ricerca prodotti per nome e brand
 * @param {string} searchTerm - Testo di ricerca inserito dall'utente
 */
export async function getProductsBySearchTerm(searchTerm: string) {
  console.log("ENTRO???");
  try {
    if (!searchTerm.trim()) {
      console.warn("⚠️ Nessun termine di ricerca inserito.");
      return { products: [], brands: [] };
    }

    console.log(`🔎 Ricerca avviata per: "${searchTerm}"`);

    // 🔥 Trova i prodotti corrispondenti nel nome
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { name: { startsWith: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        productCategory: {
          include: { category: true },
        },
        productBrand: true,
        productUnitFormat: {
          include: {
            unitValue: true,
            unitOfMeasure: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10, // Limita a 10 risultati
    });

    console.log("🔍 Prodotti trovati:", products.length ? products : "Nessuno");

    // 🔍 Trova i brand corrispondenti nel nome
    const brands = await prisma.productBrand.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { name: { startsWith: searchTerm, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
      },

      take: 5, // Limita i risultati per performance
    });

    console.log("🔍 Brand trovati:", brands.length ? brands : "Nessuno");

    if (!products.length && !brands.length) {
      console.warn(`⚠️ Nessun prodotto o brand trovato per "${searchTerm}"`);
      return { products: [], brands: [] };
    }

    console.log(
      `✅ Trovati ${products.length} prodotti e ${brands.length} brand per "${searchTerm}"`
    );

    // Formattazione dati prodotti
    const formattedProducts = products.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      image: item.images,
      category:
        item.productCategory?.map((pc) => pc.category.name).join(", ") || "N/A",
      brand: item.productBrand ? item.productBrand.name : null,
      unitFormat: item.productUnitFormat
        ? {
            value: item.productUnitFormat.unitValue.value,
            unit: item.productUnitFormat.unitOfMeasure.code,
          }
        : null,
    }));

    return {
      products: convertToPlainObject(formattedProducts),
      brands: convertToPlainObject(brands),
    };
  } catch (error) {
    console.error("❌ Errore durante la ricerca:", error);
    return { products: [], brands: [] };
  }
}
