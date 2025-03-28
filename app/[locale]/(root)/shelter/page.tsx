import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { getAllContributors } from "@/core/actions/contributors/get-all-contributors";
import ROLES from "@/lib/constants/roles";
import Image from "next/image";
import Link from "next/link";

export default async function PartnersPage() {
  const partners = await getAllContributors(ROLES.SHELTER);

  return (
    <main className="mx-auto max-w-7xl space-y-16 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-5xl font-extrabold text-purple-700 drop-shadow-sm">
          Aiutaci a sostenere le realtà in difficoltà
        </h1>
        <p className="text-lg text-gray-600">
          Filtra, cerca e trova le realtà che hanno più bisogno.
        </p>
      </div>

      {/* Partner Cards */}
      <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <BrandCard
            key={partner.id}
            className="flex flex-col items-center justify-between space-y-6 rounded-xl bg-white p-6 text-center shadow-lg transition hover:shadow-2xl"
            title={
              <h2 className="text-xl font-bold text-purple-700">
                {partner.name}
              </h2>
            }
            description={
              <p className="text-sm text-gray-600">{partner.description}</p>
            }
          >
            <div className="flex flex-col items-center gap-4">
              <Image
                src={partner.logo || "/images/default-logo.png"}
                alt={partner.name}
                width={100}
                height={100}
                className="rounded-full border p-2 shadow-md"
              />
              <div className="flex gap-2">
                <BrandButton variant="primary">
                  <Link href={`/partners/${partner.slug}`}>
                    Vai alla pagina
                  </Link>
                </BrandButton>
                {partner.products && (
                  <BrandButton variant="confirm">
                    <Link href={`/partners/${partner.slug}/shop`}>
                      Vai lo Shop
                    </Link>
                  </BrandButton>
                )}
              </div>
            </div>
          </BrandCard>
        ))}
      </section>
    </main>
  );
}
