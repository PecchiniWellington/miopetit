"use client";

import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import BrandButton from "../brand-components/brand-button";

const DeleteDialog = ({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message?: string }>;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleDeleteClick = () => {
    startTransition(async () => {
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
    <>
      <BrandButton onClick={() => setOpen(true)}>
        <Trash2 className="size-4 text-red-500" />
      </BrandButton>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  <X className="size-5" />
                </button>

                {/* Dialog content */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    🗑️ Elimina Ordine
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sei sicuro di voler eliminare questo ordine? L’azione è
                    irreversibile.
                  </p>

                  <div className="flex justify-end gap-2 pt-4">
                    <BrandButton
                      variant="secondary"
                      onClick={() => setOpen(false)}
                    >
                      Annulla
                    </BrandButton>

                    <BrandButton
                      onClick={handleDeleteClick}
                      loading={isPending}
                      variant="flat"
                    >
                      Elimina
                    </BrandButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body // PORTALE a livello globale
      )}
    </>
  );
};

export default DeleteDialog;
