import BrandButton from "@/components/shared/brand-components/brand-button";
import { FormControl, FormItem } from "@/components/ui/form";
import { updateUser } from "@/core/actions/admin/admin.actions";
import { useToast } from "@/hooks/use-toast";
import { Camera, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PublicUserAvatarProps {
  userId: string;
  role: string;
  name: string;
  email: string;
  image?: string | null;
}

export const PublicUserAvatar: React.FC<PublicUserAvatarProps> = ({
  userId,
  role,
  name,
  email,
  image,
}) => {
  const { toast } = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(image ?? null);
  const { update } = useSession();

  useEffect(() => {
    setPreview(image ?? null);
  }, [image]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/avatar/upload-profile-image", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();
      if (!url) throw new Error("URL immagine non valido");

      if (
        ![
          "RETAILER",
          "SUPER_ADMIN",
          "ADMIN",
          "VETERINARIAN",
          "VOLUNTEER",
          "USER",
        ].includes(role)
      ) {
        throw new Error("Invalid role provided");
      }
      await updateUser({
        id: userId,
        role: role as
          | "RETAILER"
          | "SUPER_ADMIN"
          | "ADMIN"
          | "VETERINARIAN"
          | "VOLUNTEER"
          | "USER",
        image: url,
        name,
        email,
      });
      await update({ image: url, name });
      toast({ description: "Avatar aggiornato con successo!" });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Errore durante l'upload: ${error}`,
      });
    }
  };

  const handleRemoveImage = async (): Promise<void> => {
    setPreview(null);
    if (inputFileRef.current) inputFileRef.current.value = "";

    try {
      await updateUser({
        id: userId,
        role: role as
          | "RETAILER"
          | "SUPER_ADMIN"
          | "ADMIN"
          | "VETERINARIAN"
          | "VOLUNTEER"
          | "USER",
        image: "",
        name,
        email,
      });
      await update({ image: "", name });
      toast({ description: "Avatar rimosso con successo!" });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Errore durante la rimozione: ${error}`,
      });
    }
  };

  const firstInitial = name?.charAt(0).toUpperCase() ?? "";

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
      <FormItem className="relative flex flex-col items-center space-y-3">
        <FormControl>
          <div className="relative flex items-center justify-center">
            <div className="relative flex size-40 items-center justify-center rounded-full border-4 border-indigo-500 bg-white shadow-md">
              {preview ? (
                <Image
                  alt="User Avatar"
                  src={preview || "/images/user-avatar.png"}
                  fill
                  objectFit=""
                  className="rounded-full border-2 border-transparent transition-all duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center rounded-full border-2 border-gray-500 bg-gray-300 text-5xl font-bold text-gray-700 shadow-md">
                  {firstInitial}
                </div>
              )}

              {preview && preview !== "/images/user-avatar.png" && (
                <BrandButton
                  className="absolute right-0 top-0 rounded-full bg-white shadow-md"
                  variant="ghost"
                  onClick={() => handleRemoveImage()}
                >
                  <XCircle className="size-8 font-extrabold text-red-700" />
                </BrandButton>
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
  );
};
