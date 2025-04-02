import { getAllBrands } from "@/core/actions/products/product-infos.ts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function groupBrandsByFirstLetter(
  brands: Array<{
    id: string;
    name: string;
    slug: string;
    image?: string | null;
  }>
) {
  return brands.reduce((acc: Record<string, typeof brands>, brand) => {
    const firstLetter = brand.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push({ ...brand, image: brand.image ?? undefined });
    return acc;
  }, {});
}

export default async function BrandGridPage() {
  const brands = await getAllBrands();
  if (!brands) return notFound();

  const groupedBrands = groupBrandsByFirstLetter(brands);
  const sortedGroups = Object.entries(groupedBrands).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <div className="p-6 sm:p-10 md:p-16">
      <div className="space-y-2 text-center">
        <h1 className="text-gradient-primary text-5xl font-extrabold drop-shadow-xl">
          Scopri i nostri Brand
        </h1>
      </div>
      {sortedGroups.map(([letter, brands]) => (
        <div key={letter} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-700">{letter}</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                {brand.image ? (
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={100}
                    height={60}
                    className="mb-3 h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                  />
                ) : (
                  <div className="mb-3 flex h-16 items-center justify-center text-sm text-gray-400">
                    No Logo
                  </div>
                )}
                <span className="group-hover:text-primary text-sm font-medium text-gray-700">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
