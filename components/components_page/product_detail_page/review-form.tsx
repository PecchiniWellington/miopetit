"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { createUpdateReview } from "@/core/actions/reviews/review.action";

import { insertReviewSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { REVIEW_FORM_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send, StarIcon } from "lucide-react";
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
                  <Input {...field} placeholder="Enter Title" />
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
                  <Textarea {...field} placeholder="Enter Description" />
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
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Slug" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>
                        {index + 1} <StarIcon className="inline size-4" />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {false ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <Send className="size-6" />
          )}
          <span>Invia</span>
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
