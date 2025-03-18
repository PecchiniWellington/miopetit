"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { IProduct } from "@/core/validators";
import { toast } from "@/hooks/use-toast";
import { UploadDropzone } from "@uploadthing/react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface UploadImageFeaturedProductProps {
  isFeatured?: boolean;
  banner?: string;
  form: UseFormReturn<IProduct>;
}

export const UploadImageFeaturedProduct: React.FC<
  UploadImageFeaturedProductProps
> = ({ isFeatured, banner, form }) => {
  const [localBanner, setLocalBanner] = useState<string | null>(banner || null);

  return (
    <BrandCard className="flex flex-col gap-6 border border-slate-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 shadow-xl">
      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="size-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-0 focus:ring-offset-0"
            />
            <FormLabel className="text-white">Featured Product</FormLabel>
          </FormItem>
        )}
      />

      {isFeatured && localBanner && (
        <div className="relative w-full overflow-hidden rounded-md border border-slate-600 shadow-lg">
          <Image
            src={localBanner}
            alt="Banner Image"
            width={800}
            height={300}
            className="h-52 w-full object-cover object-center"
          />
        </div>
      )}

      {isFeatured && !localBanner && (
        <UploadDropzone<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={(res: { url: string }[]) => {
            console.log("res", res);
            const url = res[0].url;
            form.setValue("banner", url);
            setLocalBanner(url); // aggiorna localmente la preview
            toast({
              title: "Upload successful!",
              description: "Your image has been uploaded.",
            });
          }}
          onUploadError={(err: Error) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: err.message,
            });
          }}
          className="cursor-pointer rounded-md border border-dashed border-slate-600 bg-slate-800 p-0"
          config={{ mode: "auto" }}
          content={{
            label({ ready }) {
              return (
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-10 text-center transition hover:border-slate-400 hover:bg-slate-700">
                  <UploadCloud className="size-10 text-slate-300" />
                  <p className="mb-2 text-sm text-slate-300">
                    {ready
                      ? "Drag & drop or click to upload an image"
                      : "Preparing uploader..."}
                  </p>
                </div>
              );
            },
          }}
        />
      )}
    </BrandCard>
  );
};

export default UploadImageFeaturedProduct;
