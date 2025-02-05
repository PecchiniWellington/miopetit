"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";

export default function UploadAvatar({
  name,
  control,
}: {
  name: string;
  control: Control;
}) {
  const { setValue, watch } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const selectedFile = watch(name);

  // ✅ Se c'è un valore iniziale dal database, impostalo come preview
  useEffect(() => {
    if (typeof selectedFile === "string") {
      setPreview(selectedFile);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file); // Genera la preview
    setPreview(fileURL);
    setValue(name, file, { shouldValidate: true });
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue(name, null, { shouldValidate: true });

    if (inputFileRef.current) {
      inputFileRef.current.value = ""; // Reset input file
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
                  <button
                    type="button"
                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    onClick={handleRemoveImage}
                  >
                    <XCircle className="size-5" />
                  </button>
                  <Image
                    height={120}
                    width={120}
                    alt="Preview"
                    src={preview}
                    className="size-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <Input
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
