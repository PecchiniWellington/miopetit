"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { IUser } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { Camera, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";

export default function PublicUserAvatar({
  name,
  control,
  user,
}: {
  name: "name" | "email" | "image";
  control: Control<
    {
      name: string;
      email: string;
      image?: string | undefined;
    },
    unknown
  >;
  user: IUser;
}) {
  const { setValue, watch } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [preview, setPreview] = useState<string | null>(
    user?.image || "/images/placeholder.jpg"
  );
  console.log("user", user);

  const selectedFile = watch(name);

  useEffect(() => {
    if (selectedFile instanceof File) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreview(fileURL);
    } else if (
      typeof selectedFile === "string" &&
      selectedFile.startsWith("http")
    ) {
      setPreview(selectedFile);
    } else {
      setPreview(user?.image || "/images/user-avatar.png");
    }
  }, [selectedFile]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);
    setValue(name, file, { shouldValidate: true });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/avatar/upload-profile-image", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();
      setValue(name, url);

      toast({
        description: "Avatar aggiornato con successo!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore durante l'upload dell'immagine!" + error,
      });
    }
  };

  const handleRemoveImage = () => {
    setPreview("/images/user-avatar.png");
    setValue(name, null, { shouldValidate: true });

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const t = useTranslations("Profile.profile_image");
  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <FormItem className="relative flex flex-col items-center space-y-3">
          <FormLabel className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            {t("title")}
          </FormLabel>
          <FormControl>
            <div className="relative flex items-center justify-center">
              {/* Cerchio con l'immagine */}
              <div className="relative flex size-40 items-center justify-center rounded-full border-4 border-indigo-500 bg-white shadow-md">
                {preview ? (
                  <Image
                    alt="User Avatar"
                    src={preview || user?.image || "/images/user-avatar.png"}
                    fill
                    objectFit="cover"
                    className="rounded-full border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 hover:scale-105 hover:border-indigo-400 dark:border-gray-500"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center rounded-full border-2 border-gray-500 bg-gray-300 text-5xl font-bold text-gray-700 shadow-md dark:border-gray-300 dark:bg-gray-700 dark:text-white">
                    {user?.name?.charAt(0).toUpperCase() ?? ""}
                  </div>
                )}

                {/* Bottone di rimozione immagine */}
                {preview && preview !== "/images/user-avatar.png" && (
                  <button
                    type="button"
                    className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-red-500 p-1 text-white shadow-md transition-all hover:scale-110 hover:bg-red-600"
                    onClick={handleRemoveImage}
                  >
                    <XCircle className="size-5" />
                  </button>
                )}
              </div>

              {/* Icona per il caricamento */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 flex size-10 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-indigo-700"
              >
                <Camera className="size-5" />
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
