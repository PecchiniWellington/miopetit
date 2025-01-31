"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import DynamicButton from "../dynamic-button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (btnType: string) => {
    const pageValue = btnType === "prev" ? Number(page) - 1 : Number(page) + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="flex gap-2">
      <DynamicButton
        className="w-28"
        disabled={Number(page) <= 1}
        handleAction={() => handleClick("prev")}
      >
        Previous
      </DynamicButton>
      <DynamicButton
        className="w-28"
        disabled={Number(page) >= totalPages}
        handleAction={() => handleClick("next")}
      >
        Next
      </DynamicButton>
    </div>
  );
};

export default Pagination;
