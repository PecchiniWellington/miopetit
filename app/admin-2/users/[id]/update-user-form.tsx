"use client";

import UploadAvatar from "@/app/admin/upload/upload-avatar";
import DynamicButton from "@/components/dynamic-button";
import { ControllerRenderProps, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/lib/actions/admin/admin.actions";
import { updateUserSchema } from "@/lib/validators/user.validator";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { USER_ROLES } from "@/lib/constants/roles";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { ...user, image: user.image || undefined },
  });

  const { handleSubmit, setValue, watch, reset, formState } = form;

  useEffect(() => {
    console.log("Form Updated:", watch("image"));
  });

  const startUpload = (e: any) => {
    e.preventDefaul();
    console.log("Start Upload", watch("image"));
  };

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    console.log("SUCA", values);
    console.log("SUBMIT DATA", values);
    const selectedFile = watch("image");

    try {
      let avatarUrl = values.image;

      // **Se è stato selezionato un nuovo avatar, caricalo su Vercel**
      if (selectedFile instanceof File) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const responseImage = await fetch(
          `/api/avatar/upload?filename=${selectedFile.name}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!responseImage.ok)
          throw new Error("Errore durante l'upload dell'avatar.");

        const uploadedImage = await responseImage.json();
        avatarUrl = uploadedImage.url; // Aggiorna l'URL dell'avatar
      }

      // **Esegui l'update dell'utente con l'avatar caricato**
      const res = await updateUser({
        ...values,
        id: user.id,
        image: avatarUrl,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      toast({
        className: "bg-green-100 text-green-700 px-5 py-2",
        title: "Success",
        description: "Utente aggiornato con successo!",
      });

      reset();
      router.push("/admin/users");
    } catch (error: any) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => console.log("Submitted:", data))}
        /*    onSubmit={handleSubmit(onSubmit)} */
        method="POST"
      >
        <div className="upload-field flex flex-col md:flex-row gap-5">
          <UploadAvatar name="image" />
        </div>

        {/* Email */}
        <DynamicFormField
          disabled
          control={form.control}
          name="email"
          schema={updateUserSchema}
          title="Email"
          placeholder="Enter email"
        />

        {/* Name */}
        <DynamicFormField
          control={form.control}
          name="name"
          schema={updateUserSchema}
          title="Name"
          placeholder="Enter name"
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof updateUserSchema>,
              "role"
            >;
          }) => (
            <FormItem className="w-full">
              <FormLabel>Role</FormLabel>
              <FormControl className="border-slate-700 w-full min-w-[300px]">
                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <FormControl className="border-slate-700 w-full min-w-[300px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex-between">
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" />
                Uploading & Updating...
              </div>
            ) : (
              "Update User"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateUserForm;
