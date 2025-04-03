"use client";
import DynamicFormField from "@/components/shared/dynamic-form-field";

import { IUser, updateUserSchema } from "@/core/validators/user.validator";
import { useToast } from "@/hooks/use-toast";
import { USER_ROLES } from "@/lib/constants/roles";
import { USER_STATUS } from "@/lib/constants/user-status";
import { zodResolver } from "@hookform/resolvers/zod";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { updateUser } from "@/core/actions/admin/user/update-user.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Control, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import UploadAvatar from "../../configurations/upload-avatar";

const UpdateUserForm = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { update } = useSession();

  const form = useForm<z.infer<typeof updateUserSchema> & { image: string }>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { ...user, image: user.image || "" },
  });

  const { setValue, watch, reset, formState } = form;

  const startUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const image = watch("image");

      const formData = new FormData();
      if (image) {
        formData.append("file", image);
      } else {
        throw new Error("No image selected");
      }

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
      await update({ image: values.image, name });
      reset();
      router.push("/admin/users/all");
    } catch (error) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Error",
        description: (error as Error).message,
      });
    }
  };

  const roles = USER_ROLES.map((role) => {
    return { label: role, value: role };
  });
  const status = USER_STATUS.map((userStatus) => {
    return { label: userStatus, value: userStatus };
  });

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={startUpload} method="POST">
        <div className=" flex flex-col gap-5 md:flex-row">
          <UploadAvatar
            name="image"
            control={
              form.control as unknown as Control<{
                [key: string]: string | File | null;
              }>
            }
          />
        </div>

        {/* Email */}
        <DynamicFormField
          disabled
          control={form.control}
          name="email"
          title="Email"
          placeholder="Enter email"
        />

        {/* Name */}
        <DynamicFormField
          control={form.control}
          name="name"
          title="Name"
          placeholder="Enter name"
        />

        <div className="flex items-start justify-start ">
          {/* Role */}
          <DynamicFormField
            type="select"
            options={roles}
            control={form.control}
            name="role"
            title="Role"
            placeholder="Enter role"
          />

          {/* Status */}
          <DynamicFormField
            type="select"
            options={status}
            control={form.control}
            name="status"
            title="Status"
            placeholder="Enter status"
          />
        </div>

        {/* Submit Button */}
        <div className="flex-between">
          <BrandButton
            type="submit"
            loading={formState.isSubmitting}
            variant="primary"
          >
            Update User
          </BrandButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateUserForm;
