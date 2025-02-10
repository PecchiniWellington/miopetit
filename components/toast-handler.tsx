"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ToastHandlerProps {
  res?: { success: boolean; error?: string; message?: string };
  error?: Error | string;
  successMessage?: string;
  data?: { name?: string };
}

const ToastHandler = ({
  res,
  error,
  successMessage,
  data,
}: ToastHandlerProps) => {
  const router = useRouter();
  const { toast } = useToast();

  console.log("SUCA", error, res, !res?.success);
  if (error) {
    toast({
      className: "bg-red-100 text-red-700 px-5 py-2",
      title: "Error",
      description: typeof error === "string" ? error : error.message,
    });
  } else if (res && !res.success) {
    toast({
      className: "bg-red-100 text-red-700 px-5 py-2",
      title: "Error",
      description: res.error || res.message || "Something went wrong.",
    });
  } else if (res && res.success) {
    toast({
      className: "bg-green-100 text-green-700 px-5 py-2",
      title: successMessage || "Success",
      description: `Product ${data?.name ?? ""} has been ${successMessage?.toLowerCase()} successfully`,
    });
    router.push("/admin/products");
  }

  return null; // Il componente non renderizza nulla, esegue solo l'azione
};

export default ToastHandler;
