"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
/* import { updateUserAvatar } from "@/core/actions/user/update-user-avatar"; */
import { useToast } from "@/hooks/use-toast";
import { Camera, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function PublicUserAvatar({
  name,
  control,
}: {
  name: string;
  control: any;
}) {
  const { setValue, watch } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const [preview, setPreview] = useState<string | null>(
    session?.user?.image || "/images/user-avatar.png"
  );

  const selectedFile = watch(name);

  useEffect(() => {
    if (typeof selectedFile === "string") {
      setPreview(selectedFile);
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

      /*  const res = await updateUserAvatar(url); */
      if (!res.success) {
        throw new Error(res.message);
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          image: url,
        },
      });

      toast({
        description: "Avatar aggiornato con successo!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore durante l'upload dell'immagine!",
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

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <FormItem className="relative flex flex-col items-center space-y-3">
          <FormLabel className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Immagine del Profilo
          </FormLabel>
          <FormControl>
            <div className="relative">
              {preview ? (
                <div className="relative size-32 rounded-full border-4 border-indigo-500 shadow-md">
                  <button
                    type="button"
                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    onClick={handleRemoveImage}
                  >
                    <XCircle className="size-5" />
                  </button>
                  {session?.user?.image ? (
                    <Image
                      alt="User Avatar"
                      src={session?.user?.image || "/images/placeholder.jpg"}
                      height={42}
                      width={42}
                      className="rounded-full border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 object-cover p-[2px] transition-all duration-300 hover:scale-105 hover:border-indigo-400 dark:border-gray-500"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 bg-gray-300 object-cover text-5xl  font-bold text-gray-700 shadow-md dark:border-gray-300 dark:bg-gray-700 dark:text-white">
                      {session?.user?.name?.charAt(0).toUpperCase() ?? ""}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex size-32 items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">
                    Nessuna immagine
                  </span>
                </div>
              )}

              {/* Icona per il caricamento */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
              >
                <Camera className="size-4" />
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
