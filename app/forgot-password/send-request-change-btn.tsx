// src/components/send-request-change-btn.tsx
"use client";

import DynamicButton from "@/components/dynamic-button";

const SendRequest = ({
  email,
  setIsLoading,
  setErrorMessage,
  setSuccessMessage,
}: {
  email: string;
  setIsLoading: (loading: boolean) => void;
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
}) => {
  const handleAction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/request-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.message);
      } else {
        setSuccessMessage("Link di reset inviato con successo!");
      }
    } catch (error) {
      setErrorMessage("Errore durante l'invio del link di reset.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DynamicButton
      handleAction={handleAction}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
    >
      Invia Link di Reset
    </DynamicButton>
  );
};

export default SendRequest;
