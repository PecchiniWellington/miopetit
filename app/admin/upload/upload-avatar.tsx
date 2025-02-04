"use client";

import { useState, useRef } from "react";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { XCircle } from "lucide-react";
import Image from "next/image";

export default function UploadAvatar({ name }: { name: string }) {
  const { setValue, watch } = useFormContext(); // Usa il context del form
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const selectedFile = watch(name); // Ottieni il valore aggiornato

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue(name, file.name, { shouldValidate: true }); // ✅ Aggiorna manualmente il form
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setValue(name, null, { shouldValidate: true }); // ✅ Resetta manualmente il valore nel form
    setPreview(null);
    if (inputFileRef.current) inputFileRef.current.value = ""; // Reset input file
  };

  return (
    <FormItem className="relative">
      <FormLabel>Upload Avatar</FormLabel>
      <FormControl>
        <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
          {preview ? (
            <div className="relative w-full h-full">
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                <XCircle className="w-5 h-5" />
              </button>
              <Image
                height={120}
                width={120}
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <Input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>
      </FormControl>
    </FormItem>
  );
}
