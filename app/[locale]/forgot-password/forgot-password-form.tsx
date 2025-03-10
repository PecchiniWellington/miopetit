"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useState } from "react";
import SendRequest from "./send-request-change-btn";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <form className="space-y-4">
      {/* Input Email */}
      <Input
        type="email"
        placeholder="Inserisci la tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Messaggio di errore */}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      {/* Messaggio di successo */}
      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      {/* Integrazione del componente SendRequest */}
      <SendRequest
        email={email}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />

      <Separator className="my-4 bg-slate-100" />

      <Link href="/sign-in" className="text-blue-500 underline" target="_self">
        Torna al login
      </Link>
    </form>
  );
};

export default ResetPasswordForm;
