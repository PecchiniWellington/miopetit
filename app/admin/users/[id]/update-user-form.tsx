"use client";
import UploadAvatar from "@/app/admin-test/upload/upload-avatar";
import DynamicButton from "@/components/dynamic-button";
import DynamicFormField from "@/components/shared/dynamic-form-field";

import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/actions/admin/admin.actions";
import { USER_ROLES } from "@/lib/constants/roles";
import { updateUserSchema } from "@/lib/validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { ...user, image: user.image || "" },
  });

  const { setValue, watch, reset, formState } = form;

  const startUpload = async (e: any) => {
    e.preventDefault();

    try {
      const image = watch("image");

      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/avatar/upload-profile-image", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();
      setValue("image", url);

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
        image: values.image,
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

  const roles = USER_ROLES.map((role) => {
    return { label: role, value: role };
  });

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

        <div className="flex justify-start items-start ">
          {/* Role */}
          <DynamicFormField
            type="select"
            options={roles}
            control={form.control}
            name="role"
            schema={updateUserSchema}
            title="Role"
            placeholder="Enter role"
          />

          {/* Role */}
          <DynamicFormField
            type="select"
            options={roles}
            control={form.control}
            name="role"
            schema={updateUserSchema}
            title="Role"
            placeholder="Enter role"
          />
        </div>

        {/* Submit Button */}
        <div className="flex-between">
          <DynamicButton disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" />
                Uploading & Updating...
              </div>
            ) : (
              "Update User"
            )}
          </DynamicButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateUserForm;
