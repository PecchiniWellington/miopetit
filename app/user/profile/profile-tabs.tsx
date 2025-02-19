"use client";

import DynamicButton from "@/components/dynamic-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from "@/core/actions/user";
import { updateUserProfileSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ProfileTab = ({ user }: { user: any }) => {
  const [profileImage, setProfileImage] = useState("/images/user-avatar.png");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Sezione Avatar */}
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <Image
            src={user.image || profileImage}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-indigo-500 shadow-md"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-1 right-1 flex size-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
          >
            <Camera className="size-4" />
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Il tuo profilo
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aggiorna le tue informazioni personali
        </p>
      </div>

      {/* Form Profilo */}
      <ProfileForm />
    </div>
  );
};

/** 📌 Form Profili */
const ProfileForm = () => {
  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof updateUserProfileSchema>) => {
    const res = await updateUserProfile(values);

    if (!res.success) {
      return toast({
        variant: "destructive",
        description: res.message,
      });
    }

    toast({
      description: res.message,
      icon: <CheckCircle className="size-4 text-green-500" />,
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-6 flex flex-col space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Nome Completo"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled
                    placeholder="Email"
                    className="input-field cursor-not-allowed opacity-70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DynamicButton
          isPending={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? "Salvando..." : "Salva Modifiche"}
        </DynamicButton>
      </form>
    </Form>
  );
};
