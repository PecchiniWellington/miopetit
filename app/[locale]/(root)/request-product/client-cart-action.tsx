"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { createRequestedProducts } from "@/core/actions/products/create-requested-product.action";
import { ICartItem } from "@/core/validators";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export default function ClientCartAction({
  contributorId,
  contributorSlug,
  items,
}: {
  contributorId: string;
  contributorSlug?: string;
  items: ICartItem[];
}) {
  const [isPending, startTransition] = useTransition();

  const handleCreateRequestedProduct = () => {
    startTransition(async () => {
      await createRequestedProducts({
        contributorId,
        products: items,
      });
      // Puoi mostrare una notifica, redirect, ecc.
      redirect(`/shelter/${contributorSlug}/shop`);
    });
  };

  return (
    <BrandButton
      onClick={handleCreateRequestedProduct}
      loading={isPending}
      className="w-full"
      variant="primary"
      size="medium"
    >
      Procedi con la richiesta
    </BrandButton>
  );
}
