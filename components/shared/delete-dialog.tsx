"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import DynamicButton from "../dynamic-button";
import { Button } from "../ui/button";

const DeleteDialog = ({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message?: string }>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useTransition();
  const { toast } = useToast();

  const handleDeleteClick = () => {
    setIsPending(async () => {
      const res = await action(id);

      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
      } else {
        setOpen(false);
        toast({ description: res.message });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2
            height={10}
            width={10}
            className="text-red-400 hover:text-red-300"
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-200 dark:bg-slate-900 dark:text-slate-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this order?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-slate-100 bg-slate-700 px-4 py-2">
            Cancel
          </AlertDialogCancel>
          <DynamicButton isPending={isPending} handleAction={handleDeleteClick}>
            {isPending ? "Deleting..." : "Delete"}
          </DynamicButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
