import { z } from "zod";

// Schema for updating user profile
export const updateUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character"),
  email: z.string().min(3, "Email must be at least 3 character"),
  image: z.string().optional(),
});

export const updateUserSchema = updateUserProfileSchema.extend({
  id: z.string().min(1, "ID is required"),
  role: z.string().min(1, "Role is required"),
});

/* <FormField
            control={form.control}
            name="image"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "image"
              >;
            }) => (
              <FormItem className="w-full">
                {JSON.stringify(field.value)}
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    value={field.value || "/images/placeholder.jpg"}
                    disabled={true}
                    placeholder="Enter  image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */
