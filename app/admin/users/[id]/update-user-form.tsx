"use client";
import UploadAvatar from "@/app/admin-test/upload/upload-avatar";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/actions/admin/admin.actions";
import { USER_ROLES } from "@/lib/constants/roles";
import { updateUserSchema } from "@/lib/validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  // ✅ Imposta il valore di default dall'utente del database
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { ...user, image: user.image || "" }, // Usa l'avatar dal database
  });

  const { handleSubmit, setValue, watch, reset, formState } = form;

  const startUpload = async (e: any) => {
    e.preventDefault();

    try {
      const image = watch("image");

      if (!(image instanceof File)) {
        throw new Error("Nessun file selezionato.");
      }

      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/avatar/upload-profile-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const { url } = await response.json();
      setValue("image", url); // ✅ Salva l'URL nel form

      // ✅ Aggiorna il form con il nuovo valore e invialo
      const formValues = form.getValues();
      onSubmit({ ...formValues, image: url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({
        ...values,
        id: user.id,
        image: values.image, // ✅ Ora è un URL, non un File
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
      <form className="space-y-4" onSubmit={startUpload} method="POST">
        <div className="upload-field flex flex-col md:flex-row gap-5">
          <UploadAvatar name="image" control={form.control} />
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
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
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
