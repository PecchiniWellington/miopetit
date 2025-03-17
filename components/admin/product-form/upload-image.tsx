"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import BrandCard from "@/components/shared/brand-components/brand-card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IProduct } from "@/core/validators";
import { toast } from "@/hooks/use-toast";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

export const UploadImage = ({
  form,
  images,
}: {
  form: UseFormReturn<IProduct>;
  images: string[];
}) => {
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Images</FormLabel>
          <BrandCard className="mt-2 min-h-8 space-y-2 border-slate-700">
            <div className="flex-start space-x-2">
              {Array.isArray(images) ? (
                images.map((image: string) => (
                  <Image
                    key={image}
                    src={image || "/images/placeholder.jpg"}
                    alt="Product Image"
                    width={100}
                    height={100}
                    className="size-20 rounded-sm object-cover object-center"
                  />
                ))
              ) : (
                <Image
                  key={images}
                  src={images || "/images/placeholder.jpg"}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="size-20 rounded-sm object-cover object-center"
                />
              )}

              <FormControl>
                <UploadButton<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue("images", [...images, res[0].url]);
                  }}
                  onUploadError={(err: Error) => {
                    toast({
                      className: "bg-red-100 text-red-700 px-5 py-2",
                      title: "Error",
                      description: err.message,
                    });
                  }}
                />
              </FormControl>
            </div>
          </BrandCard>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadImage;
