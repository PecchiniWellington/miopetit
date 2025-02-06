"use client";
import DynamicButton from "@/components/dynamic-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/actions/admin/admin.actions";
import { USER_ROLES } from "@/lib/constants/roles";
import { updateUserSchema } from "@/lib/validators/user.validator";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

const UpdateUserForm = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {}, // TODO: set default values
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({
        ...values,
        id: user.id,
      });

      if (!res.success) {
        toast({
          className: "bg-red-100 text-red-700 px-5 py-2",
          title: "Error",
          description: res.message,
        });
        return;
      }

      toast({
        className: "bg-green-100 text-green-700 px-5 py-2",
        title: "Success",
        description: res.message,
      });

      form.reset();

      router.push("/admin/users");
    } catch (error) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Error",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        method="POST"
      >
        <div>
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "email"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder="Enter product email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Name */}
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "name"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Role */}
        <div>
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
                    <FormControl>
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
        </div>
        <div className="flex-between">
          <DynamicButton isPending={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Update User"}
          </DynamicButton>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
