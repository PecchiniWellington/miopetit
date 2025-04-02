"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { deleteRequestedProduct } from "@/core/actions/products/requested-products/delete-requested-product";
import { updateRequestedProduct } from "@/core/actions/products/requested-products/update-requested-product";

import { IRequestedProduct } from "@/core/validators/request-product.validator";
import { debounce } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const requestedProductSchema = z.object({
  notes: z.string().optional(),
  quantity: z.number().min(1),
});

export default function RequestedProductActions({
  requestedProduct,
}: {
  requestedProduct: IRequestedProduct;
}) {
  const form = useForm<z.infer<typeof requestedProductSchema>>({
    resolver: zodResolver(requestedProductSchema),
    defaultValues: {
      notes: requestedProduct.notes || "",
      quantity: requestedProduct.quantity,
    },
  });

  const { control, setValue, register } = form;

  const watchedNotes = useWatch({ control, name: "notes" });
  const watchedQuantity = useWatch({ control, name: "quantity" });

  const debouncedSave = debounce(
    async (values: z.infer<typeof requestedProductSchema>) => {
      try {
        await updateRequestedProduct({
          id: requestedProduct.id,
          notes: values.notes ?? "",
          quantity: values.quantity,
        });
        toast.success("Modifiche salvate automaticamente");
      } catch (error) {
        toast.error("Errore durante il salvataggio");
      }
    },
    1000
  );

  useEffect(() => {
    debouncedSave({
      notes: watchedNotes,
      quantity: watchedQuantity,
    });

    return () => debouncedSave.cancel();
  }, [watchedNotes, watchedQuantity]);

  const handleDelete = async () => {
    try {
      await deleteRequestedProduct(requestedProduct.id);
      toast.success("Prodotto eliminato");
    } catch (error) {
      toast.error("Errore durante l'eliminazione");
    }
  };

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Note:</label>
          <textarea
            {...register("notes")}
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Quantità:</span>
          <BrandButton
            variant="outline"
            onClick={() =>
              setValue("quantity", Math.max(1, watchedQuantity - 1))
            }
          >
            -
          </BrandButton>
          <span className="text-lg font-bold">{watchedQuantity}</span>
          <BrandButton
            variant="outline"
            onClick={() => setValue("quantity", watchedQuantity + 1)}
          >
            +
          </BrandButton>
        </div>

        <div className="flex justify-end pt-4">
          <BrandButton variant="danger" onClick={handleDelete}>
            <Trash2 className="mr-1" size={16} /> Elimina
          </BrandButton>
        </div>
      </div>
    </FormProvider>
  );
}
