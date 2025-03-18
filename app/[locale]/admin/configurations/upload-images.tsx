"use client";

import BrandCard from "@/components/shared/brand-components/brand-card";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { IProduct } from "@/core/validators";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface UploadImagesProps {
  isFeatured?: boolean;
  banner?: string;
  form: UseFormReturn<IProduct>;
}

export const UploadImages: React.FC<UploadImagesProps> = ({
  isFeatured,
  banner,
  form,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      form.setValue("banner", objectUrl);
    }
  };

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

      {isFeatured && (preview || banner) && (
        <div className="relative w-full overflow-hidden rounded-md border border-slate-600 shadow-lg">
          <Image
            src={preview || banner!}
            alt="Banner Image"
            width={800}
            height={300}
            className="h-52 w-full object-cover object-center"
          />
        </div>
      )}

      {isFeatured && !preview && (
        <div
          onClick={() => inputFileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border border-dashed border-slate-600 bg-slate-800 px-8 py-10 text-center transition hover:border-slate-400 hover:bg-slate-700"
        >
          <UploadCloud className="size-10 text-slate-300" />
          <p className="mb-2 text-sm text-slate-300">
            Drag & drop or click to upload an image
          </p>
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      )}
    </BrandCard>
  );
};

export default UploadImages;
