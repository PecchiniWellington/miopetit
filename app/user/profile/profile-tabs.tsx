"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from "@/core/actions/user";
import { IUser, updateUserProfileSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { undefined, z } from "zod";
import PublicUserAvatar from "./public-user-avatar";

export const ProfileTab = ({ user }: { user: IUser }) => {
  return (
    <div className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      Form Profilo
      <ProfileForm user={user} />
    </div>
  );
};

/** 📌 Form Profili */
const ProfileForm = ({ user }: { user: IUser }) => {
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

    // ✅ Aggiorna la sessione per il nome in tempo reale
    /* await update({
      ...user,
      user: {
        ...user,
        name: values.name,
      },
    }); */

    toast({
      description: res.message,
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-6 flex flex-col space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
          {/* Sezione Avatar */}
          <PublicUserAvatar name="name" control={form.control} user={user} />

          {/* Form Profilo */}

          <div className="flex  gap-5">
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
        </div>

        <Button className="mt-2 inline-block w-full rounded-lg bg-indigo-600 px-5 py-2 text-center text-white shadow-md transition hover:bg-indigo-700">
          {form.formState.isSubmitting ? "Salvando..." : "Salva Modifiche"}
        </Button>
      </form>
    </Form>
  );
};
