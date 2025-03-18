"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BrandButton from "../brand-components/brand-button";

interface GenericModalProps {
  triggerButton: React.ReactNode;
  btnClassName?: string;
  modalClassName?: string;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: () => Promise<any>;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "confirm"
    | "flat"
    | "warning"
    | "tertiary"
    | "outline"
    | "outline-white"
    | "ghost"
    | "ghost-white";
}

const GenericModal = ({
  triggerButton,
  btnClassName,
  modalClassName,
  title,
  description,
  confirmText,
  cancelText,
  icon,
  onConfirm,
  variant = "primary",
}: GenericModalProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

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

  const handleConfirmClick = async () => {
    setIsPending(true);
    await onConfirm();
    setIsPending(false);
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className={btnClassName}>
        {triggerButton}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className={`relative w-full max-w-md rounded-lg border bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900 ${modalClassName}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    <X className="size-5" />
                  </button>

                  <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                      {icon}
                      {title}
                    </h2>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {description}
                    </p>
                    <div className="flex justify-start gap-4 pt-4">
                      <BrandButton
                        variant="outline"
                        onClick={() => setOpen(false)}
                        icon={<X className="size-5 font-bold text-red-500" />}
                      >
                        <span className="font-bold text-red-500">
                          {cancelText}
                        </span>
                      </BrandButton>
                      <BrandButton
                        onClick={handleConfirmClick}
                        loading={isPending}
                        variant={variant}
                      >
                        {confirmText}
                      </BrandButton>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default GenericModal;
