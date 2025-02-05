"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { insertProductSchema } from "@/lib/validators";
import { updateProductSchema } from "@/lib/validators/product.validator";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { FormProviderProps } from "react-hook-form";
import { z } from "zod";

export const UploadImage = ({
  form,
  images,
}: {
  form: FormProviderProps<
    z.infer<typeof insertProductSchema | typeof updateProductSchema>
  >;

  images: string[];
}) => {
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Images</FormLabel>
          <Card className="border-slate-700">
            <CardContent className="mt-2 min-h-8 space-y-2 ">
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
                {/* <FormControl>
                  <UploadButton
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
                </FormControl> */}
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
            </CardContent>
          </Card>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadImage;
