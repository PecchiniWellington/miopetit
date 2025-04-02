import BrandProductCard from "@/components/product/brand-product-card";
import { getAllProductsByBrandSlug } from "@/core/actions/products/get-all-product-by-brand-slug";
import { IProduct } from "@/core/validators";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { products, brand } = await getAllProductsByBrandSlug({
    brandSlug: slug,
  });

  if (!products || products.length === 0) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero brand */}

      <section className="relative mx-auto mb-10 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 via-white to-purple-100 p-10 text-center shadow-lg">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative mb-5 rounded-full border-2 border-purple-300 bg-white p-4 shadow-md">
            {brand.image && (
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={60}
                className="h-16 w-auto object-contain"
              />
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-purple-700 md:text-5xl">
            {brand.name}
          </h1>
          <p className="mt-2 max-w-md text-center text-base text-gray-500">
            Scopri la nostra selezione di prodotti firmati{" "}
            <strong>{brand.name}</strong>
          </p>
        </div>
        <div className="absolute left-[-30px] top-[-30px] z-0 size-40 rounded-full bg-green-200 opacity-20 blur-3xl" />
        <div className="absolute bottom-[-30px] right-[-30px] z-0 size-40 rounded-full bg-purple-300 opacity-20 blur-3xl" />
      </section>

      {/* Lista prodotti */}
      <section className="p-6 sm:p-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: IProduct) => (
              <div key={product.id} className="animate-fade-in">
                <BrandProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
