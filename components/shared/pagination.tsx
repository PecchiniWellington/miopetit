"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BrandButton from "./brand-components/brand-button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({
  page,
  totalPages,
  urlParamName = "page",
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(page);
  const pathname = usePathname();

  // Genera un nuovo URL aggiornando il parametro della pagina
  const updatePageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(urlParamName, newPage.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      {/* Bottone "Indietro" */}
      <BrandButton
        onClick={() => updatePageUrl(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all 
          ${currentPage <= 1 ? "cursor-not-allowed bg-gray-600 text-gray-400" : "bg-purple-600 text-white hover:bg-purple-700"}
        `}
      >
        <ChevronLeft size={18} /> Indietro
      </BrandButton>

      {/* Indicatore pagina */}
      <span className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow">
        Pagina {currentPage} di {totalPages}
      </span>

      {/* Bottone "Avanti" */}
      <BrandButton
        icon={<ChevronRight size={18} />}
        iconPosition="right"
        onClick={() => updatePageUrl(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant={`${currentPage >= totalPages ? "flat" : "primary"}`}
        className={currentPage >= totalPages ? "cursor-not-allowed " : ""}
      >
        Avanti
      </BrandButton>
    </div>
  );
};

export default Pagination;
