"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandInput from "@/components/shared/brand-components/brand-input";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";

export default function UploadAvatar({
  name,
  control,
}: {
  name: string;
  control: Control<{ [key: string]: File | string | null }>;
}) {
  const { setValue, watch } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const selectedFile = watch(name);

  useEffect(() => {
    if (typeof selectedFile === "string") {
      setPreview(selectedFile);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);
    setValue(name, file, { shouldValidate: true });
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue(name, null, { shouldValidate: true });

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <FormItem className="relative">
          <FormLabel>Upload Avatar</FormLabel>
          <FormControl>
            <div className="relative flex size-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300">
              {preview ? (
                <div className="relative size-full">
                  <BrandButton
                    variant="danger"
                    className="absolute right-0 top-0 "
                    onClick={() => handleRemoveImage()}
                  >
                    <XCircle className="size-5" />
                  </BrandButton>
                  <Image
                    height={120}
                    width={120}
                    alt="Preview"
                    src={preview}
                    className="size-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <BrandInput
                  type="file"
                  accept="image/*"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
