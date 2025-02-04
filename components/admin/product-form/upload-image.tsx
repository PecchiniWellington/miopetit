"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { UploadButton } from "@uploadthing/react";
import image from "next/image";
import Image from "next/image";

export const UploadImage = ({ form, images }: any) => {
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Images</FormLabel>
          <Card className="border-slate-700">
            <CardContent className="space-y-2 mt-2 min-h-8 ">
              <div className="flex-start space-x-2">
                {Array.isArray(images) ? (
                  images.map((image: string) => (
                    <Image
                      key={image}
                      src={image || "/images/placeholder.jpg"}
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover object-center rounded-sm"
                    />
                  ))
                ) : (
                  <Image
                    key={images}
                    src={images || "/images/placeholder.jpg"}
                    alt="Product Image"
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover object-center rounded-sm"
                  />
                )}
                <FormControl>
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
