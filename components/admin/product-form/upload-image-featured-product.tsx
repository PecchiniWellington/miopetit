import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import React from "react";

export const UploadImageFeaturedProduct = ({
  isFeatured,
  banner,
  form,
}: any) => {
  return (
    <Card>
      <CardContent className="space-y-2 mt-2">
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className=" space-x-2 items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
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
            className="w-full object-cover object-center rounded-sm"
          />
        )}
        {isFeatured && !banner && (
          <UploadButton
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
