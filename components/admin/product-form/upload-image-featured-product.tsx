import { OurFileRouter } from "@/app/api/uploadthing/core";
import GenericCard from "@/components/shared/brand-components/brand-card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { IProduct } from "@/core/validators";
import { toast } from "@/hooks/use-toast";

import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface UploadImageFeaturedProductProps {
  isFeatured?: boolean;
  banner?: string;
  form: UseFormReturn<IProduct>;
}

export const UploadImageFeaturedProduct: React.FC<
  UploadImageFeaturedProductProps
> = ({ isFeatured, banner, form }) => {
  return (
    <GenericCard className="flex border-slate-700 ">
      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex  items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Featured Product</FormLabel>
          </FormItem>
        )}
      />
      {isFeatured && banner && (
        <Image
          src={banner}
          alt="Banner Image"
          width={100}
          height={100}
          className="w-full rounded-sm object-cover object-center"
        />
      )}
      {isFeatured && !banner && (
        <UploadButton<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={(res: { url: string }[]) => {
            form.setValue("banner", res[0].url);
          }}
          onUploadError={(err: Error) => {
            toast({
              className: "bg-red-100 text-red-700 px-5 py-2",
              title: "Error",
              description: err.message,
            });
          }}
        />
      )}
    </GenericCard>
  );
};

export default UploadImageFeaturedProduct;
