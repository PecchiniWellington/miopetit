"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateUserProfile } from "@/core/actions/user";
import { updateUserProfileSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileForm = () => {
  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: /* session?.user?.name ?? */ "",
      email: /*  session?.user?.email ?? */ "",
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
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <BrandInput
                    disabled
                    placeholder="Email"
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <BrandInput
                    placeholder="Nome"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <BrandButton
          type="submit"
          loading={form.formState.isSubmitting}
          variant="flat"
        >
          Salva
        </BrandButton>
      </form>
    </Form>
  );
};

export default ProfileForm;
