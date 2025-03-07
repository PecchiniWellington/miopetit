"use client";

import { useToast } from "@/hooks/use-toast";

import { Link } from "lucide-react";

/* DA FARE SE IN FUTURO VOGLIAMO METTERE IL CHECKOUT SENZA LOGIN */

const SubscribeToast = () => {
  const { toast } = useToast();
  toast({
    className:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-lg shadow-xl border border-indigo-400 text-lg",

    description: (
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3">
          <svg
            className="size-8 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a10 10 0 1 1-7.07 17.07l-4.2 1.12a1 1 0 0 1-1.22-1.22l1.12-4.2A10 10 0 1 1 12 2zM12 4a8 8 0 1 0 5.66 13.66A8 8 0 0 0 12 4z"></path>
            <path d="M10 8a2 2 0 1 1 4 0v4a2 2 0 1 1-4 0V8z"></path>
            <path d="M10 16h4v2h-4z"></path>
          </svg>
          <span className="text-xl font-bold">Iscriviti subito! 🚀</span>
        </div>
        <p className="text-md mt-2 font-medium">
          Se vuoi maggiori agevolazioni, <br /> iscriviti ora al sito e
          approfitta delle offerte! 🎉
        </p>

        {/* Bottone di iscrizione */}
        <Link
          href="/signup"
          className="mt-4 inline-block w-full rounded-full bg-white px-5 py-3 text-center text-lg font-semibold text-indigo-600 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-100"
        >
          ✨ Registrati Ora!
        </Link>
      </div>
    ),
    duration: 8000,
  });
  return;
};

export default SubscribeToast;
