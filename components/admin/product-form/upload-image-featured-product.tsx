import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { insertProductSchema, updateProductSchema } from "@/core/validators";
import { toast } from "@/hooks/use-toast";

import { UploadButton } from "@uploadthing/react";
import Image from "next/image";

import { Control, UseFormSetValue } from "react-hook-form";
import { z } from "zod";

interface UploadImageFeaturedProductProps {
  isFeatured: boolean | null;
  banner: string | null;
  form: {
    control: Control<
      z.infer<typeof insertProductSchema | typeof updateProductSchema>
    >;
    setValue: UseFormSetValue<
      z.infer<typeof insertProductSchema | typeof updateProductSchema>
    >;
  };
}

export const UploadImageFeaturedProduct: React.FC<
  UploadImageFeaturedProductProps
> = ({ isFeatured, banner, form }) => {
  return (
    <Card className="flex border-slate-700 ">
      <CardContent className="mt-2 space-y-2">
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
      </CardContent>
    </Card>
  );
};

export default UploadImageFeaturedProduct;
