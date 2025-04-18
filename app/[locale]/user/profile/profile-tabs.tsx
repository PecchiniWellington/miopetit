"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandInput from "@/components/shared/brand-components/brand-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateUserProfile } from "@/core/actions/user";
import { IUser, updateUserProfileSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PublicUserAvatar } from "./public-user-avatar";

export const ProfileTab = ({ user }: { user: IUser }) => {
  return (
    <div className="relative rounded-lg bg-white  dark:bg-gray-800">
      <ProfileForm user={user} />
    </div>
  );
};

/** 📌 Form Profili */
const ProfileForm = ({ user }: { user: IUser }) => {
  const { update } = useSession();
  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { toast } = useToast();

  // ✅ Effettua il reset del form quando la sessione viene popolata
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? undefined,
        email: user.email ?? undefined,
      });
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof updateUserProfileSchema>) => {
    const res = await updateUserProfile(values);

    if (!res.success) {
      return toast({
        variant: "destructive",
        description: res.message,
      });
    }
    console.log("SONO QUI????");
    await update({ name: values.name });

    toast({
      description: res.message,
    });
  };

  const t = useTranslations("Profile");
  return (
    <Form {...form}>
      <form
        className="mt-6 flex flex-col space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
          {/* Sezione Avatar */}
          <PublicUserAvatar
            email={user.email}
            userId={user.id}
            role={user.role}
            name={form.watch("name")}
            image={user.image}
          />

          {/* Form Profilo */}

          <div className="flex  gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <BrandInput
                      placeholder="Nome Completo"
                      className=""
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
                    <BrandInput
                      disabled
                      placeholder="Email"
                      className=" cursor-not-allowed opacity-70"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <BrandButton
          type="submit"
          loading={form.formState.isSubmitting}
          variant="flat"
        >
          {t("form.save")}
        </BrandButton>
      </form>
    </Form>
  );
};
