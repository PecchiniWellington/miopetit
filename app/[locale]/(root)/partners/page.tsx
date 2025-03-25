"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
  description: string;
  userSlug?: string;
}

const allPartners: Partner[] = [
  {
    id: 1,
    name: "BioFarm Shop",
    logo: "/images/petitLogo.png",
    userSlug: "pet-family",
    category: "Cibo Bio",
    description: "Prodotti biologici e sostenibili dal 2020.",
  },
  {
    id: 2,
    name: "Green Market",
    logo: "/images/logo2.png",
    category: "Supermercato",
    userSlug: "green-market",
    description: "Spesa etica e locale con prodotti certificati.",
  },
  {
    id: 3,
    name: "VeggieStyle",
    logo: "/images/logo3.png",
    category: "Moda",
    userSlug: "veggie-style",
    description: "Abbigliamento vegano ed eco-compatibile.",
  },
];

export default function PartnersPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<Partner[]>(allPartners);

  useEffect(() => {
    let results = allPartners;

    if (search.trim()) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      results = results.filter((p) => p.category === categoryFilter);
    }

    setFiltered(results);
  }, [search, categoryFilter]);

  const uniqueCategories = Array.from(
    new Set(allPartners.map((p) => p.category))
  );

  return (
    <main className="mx-auto max-w-7xl space-y-16 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-gradient-primary text-5xl font-extrabold drop-shadow-xl">
          Scopri i nostri Partner
        </h1>
        <p className="text-lg text-gray-600">
          Filtra, cerca e trova i brand che condividono i tuoi valori.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca partner..."
            className="w-full rounded-full border border-gray-300 px-5 py-3 pl-12 text-sm shadow-md transition focus:border-purple-500 focus:outline-none"
          />
          <Search className="absolute left-4 top-3.5 size-5 text-gray-400" />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <BrandButton
            variant={!categoryFilter ? "primary" : "outline"}
            onClick={() => setCategoryFilter(null)}
          >
            Tutti
          </BrandButton>
          {uniqueCategories.map((cat) => (
            <BrandButton
              key={cat}
              variant={categoryFilter === cat ? "primary" : "outline"}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </BrandButton>
          ))}
        </div>
      </div>

      {/* Partner Cards */}
      <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((partner) => (
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
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={100}
                className="rounded-full border p-2 shadow-md"
              />
              <div className="flex gap-2">
                <BrandButton variant="primary">
                  <Link href={`/partners/${partner.userSlug}`}>
                    Vai alla pagina
                  </Link>
                </BrandButton>
                <BrandButton variant="confirm">
                  <Link href={`/partners/${partner.userSlug}/shop`}>
                    Vai lo Shop
                  </Link>
                </BrandButton>
              </div>
            </div>
          </BrandCard>
        ))}
      </section>
    </main>
  );
}
