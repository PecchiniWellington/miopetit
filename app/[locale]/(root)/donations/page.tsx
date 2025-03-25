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
}

const allPartners: Partner[] = [
  {
    id: 1,
    name: "Canile di Roma",
    logo: "/images/petitLogo.png",
    category: "Canile",
    description:
      "Un rifugio per animali che offre amore e cure ai più bisognosi.",
  },
  {
    id: 2,
    name: "Gattile di Alessandria",
    logo: "/images/logo2.png",
    category: "Gattile",
    description: "Un luogo sicuro per gatti in cerca di una nuova casa.",
  },
  {
    id: 3,
    name: "Centro riabilitazione Padova",
    logo: "/images/logo3.png",
    category: "Centro riabilitazione",
    description:
      "Un centro dedicato alla riabilitazione e al benessere degli animali.",
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
        <h1 className="text-5xl font-extrabold text-purple-700 drop-shadow-sm">
          Aiutaci a sostenere le realtà in difficoltà
        </h1>
        <p className="text-lg text-gray-600">
          Filtra, cerca e trova le realtà che hanno più bisogno.
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
              <BrandButton variant="primary">
                <Link href={`/donations/${partner.name}`}>Scopri di più</Link>
              </BrandButton>
            </div>
          </BrandCard>
        ))}
      </section>
    </main>
  );
}
