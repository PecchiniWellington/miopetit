"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandInput from "@/components/shared/brand-components/brand-input";
import BrandSelect from "@/components/shared/brand-components/brand-select";
import BrandTextArea from "@/components/shared/brand-components/brand-textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUpdateReview } from "@/core/actions/reviews/review.action";

import { insertReviewSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { REVIEW_FORM_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, StarIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertReviewSchema>>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: REVIEW_FORM_DEFAULT_VALUES,
  });

  console.log("userId", userId);
  /* Open Form Handler */
  /* const handleOpenForm = async () => {
    form.setValue("userId", userId);
    form.setValue("productId", productId);

    const review = await getReviewByProductId({ productId });
    if (review) {
      form.setValue("title", review.title);
      form.setValue("description", review.description);
      form.setValue("rating", review.rating);
    }

   
  }; */

  /* Submit Form Handler */
  const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (
    values
  ) => {
    const res = await createUpdateReview({
      ...values,
      rating: values.rating,
      productId,
    });

    if (!res.success) {
      return toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        variant: "default",
        description: res.message,
      });
    }

    onReviewSubmitted();

    toast({
      className: "bg-green-100 text-green-700 px-5 py-2",
      variant: "default",
      description: res.message,
    });
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <span className="mt-2 text-gray-500 dark:text-gray-400">
          Your email address will not be published. Required fields are marked *
        </span>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <BrandInput {...field} placeholder="Enter Title" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <BrandTextArea {...field} placeholder="Enter Description" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <BrandSelect
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                  placeholder="Select Slug"
                  options={Array.from({ length: 5 }).map((_, index) => ({
                    value: (index + 1).toString(),
                    label: `${index + 1}`,
                    icon: <StarIcon className="inline size-4" />,
                  }))}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <BrandButton
          type="submit"
          loading={form.formState.isSubmitting}
          icon={<Send className="size-6" />}
        >
          Invia
        </BrandButton>
      </form>
    </Form>
  );
};

export default ReviewForm;
