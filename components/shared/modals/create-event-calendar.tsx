"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, HandHeart } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FormProvider } from "react-hook-form";
import BrandButton from "../brand-components/brand-button";
import DynamicFormField from "../dynamic-form-field";

const CreateEventOnCalendar = ({
  categoryForm,
  handleCreateCategory,
  editingId,
  handleDelete,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // il componente è ora montato nel client

    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <FormProvider {...categoryForm}>
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <BrandButton
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <X className="size-5" />
              </BrandButton>
              <h2 className="mb-2 text-lg font-bold text-white">
                ➕ Nuova categoria
              </h2>
              <form
                onSubmit={categoryForm.handleSubmit(handleCreateCategory)}
                className="mt-4 space-y-4"
              >
                <DynamicFormField
                  control={categoryForm.control}
                  name="name"
                  title="Nome categoria"
                  placeholder="Es. Riunione"
                />
                <DynamicFormField
                  control={categoryForm.control}
                  name="icon"
                  title="Icona"
                  placeholder="Es. 🧠, 📚, 🧘‍♀️"
                />
                {/* <DynamicFormField
                  control={categoryForm.control}
                  name="color"
                  title="Colore"
                  type="color"
                /> */}
                <BrandButton type="submit">Crea categoria</BrandButton>
                <div className="flex justify-between gap-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex items-center gap-2 rounded-md border border-red-500 px-3 py-2 text-sm text-red-500 hover:bg-red-600/10"
                    >
                      <Trash2 className="size-4" /> Elimina
                    </button>
                  )}
                  <BrandButton type="submit" className="ml-auto">
                    {editingId ? "Salva modifiche" : "Salva evento"}
                  </BrandButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </FormProvider>
      )}
    </AnimatePresence>
  );

  return (
    <span className="flex flex-col items-center gap-2">
      <BrandButton onClick={() => setIsOpen(true)} icon={<HandHeart />}>
        Crea evento
      </BrandButton>
      <div>{mounted && createPortal(modalContent, document.body)}</div>
    </span>
  );
};

export default CreateEventOnCalendar;
