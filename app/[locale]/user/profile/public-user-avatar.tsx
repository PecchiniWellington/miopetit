/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, FormControl, FormItem } from "@/components/ui/form";
import { updateUser } from "@/core/actions/admin/admin.actions";
import { IUser, updateUserProfileSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const PublicUserAvatar = ({ user }: { user: IUser }) => {
  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image || "",
    },
  });

  const { toast } = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(user.image ?? null);
  const { setValue, watch, reset } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? "",
      });
    }
  }, [user, reset]);

  const selectedFile = watch("image");

  useEffect(() => {
    if (selectedFile && (selectedFile as any) instanceof File) {
      const fileURL = URL.createObjectURL(selectedFile as any);
      setPreview(fileURL);
    } else if (
      typeof selectedFile === "string" &&
      selectedFile.startsWith("http")
    ) {
      setPreview(selectedFile);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);

    setValue("image", file as any, { shouldValidate: true });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/avatar/upload-profile-image", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();

      console.log("✅ URL immagine ricevuto:", url);

      if (!url) {
        throw new Error("URL immagine non valido");
      }

      // Imposta il valore e aggiorna immediatamente il profilo
      setValue("image", url, { shouldValidate: true });

      await updateUser({
        ...form.getValues(),
        id: user.id,
        role: user.role,
        image: url,
      });

      toast({
        description: "Avatar aggiornato con successo!",
      });
    } catch (error) {
      console.error("❌ Errore durante l'upload:", error);
      toast({
        variant: "destructive",
        description: "Errore durante l'upload dell'immagine! " + error,
      });
    }
  };

  const handleRemoveImage = async () => {
    setPreview(null);
    setValue("image", "", { shouldValidate: true });
    if (inputFileRef.current) inputFileRef.current.value = "";

    try {
      await updateUser({
        ...form.getValues(),
        id: user.id,
        role: user.role,
        image: "",
      });
      toast({ description: "Avatar rimosso con successo!" });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore durante la rimozione dell'avatar! " + error,
      });
    }
  };

  const firstInitial = user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <Form {...form}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
        <FormItem className="relative flex flex-col items-center space-y-3">
          <FormControl>
            <div className="relative flex items-center justify-center">
              <div className="relative flex size-40 items-center justify-center rounded-full border-4 border-indigo-500 bg-white shadow-md">
                {preview ? (
                  <Image
                    alt="User Avatar"
                    src={preview || user?.image || "/images/user-avatar.png"}
                    fill
                    objectFit="cover"
                    className="rounded-full border-2 border-transparent transition-all duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center rounded-full border-2 border-gray-500 bg-gray-300 text-5xl font-bold text-gray-700 shadow-md">
                    {firstInitial}
                  </div>
                )}

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
      </div>
    </Form>
  );
};
