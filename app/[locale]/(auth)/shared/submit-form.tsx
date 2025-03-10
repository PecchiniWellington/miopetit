"use client";

import { Input } from "@/components/ui/input";
import { signUpUser } from "@/core/actions/auth/auth.actions"; // Import SignUp
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChangeForm from "./change-form";
import SubmitButton from "./submit-button";

async function mergeCartOnLogin(
  userId: string,
  setLoadingMessage: (msg: string) => void
) {
  if (typeof window === "undefined") return; // Evita errori in SSR

  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (Array.isArray(localCart) && localCart.length > 0) {
    setLoadingMessage("Sincronizzando il carrello...");
    const response = await fetch("/api/cart/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, localCart }),
    });

    const data = await response.json();
    console.log("Carrello sincronizzato con successo!", data);
    localStorage.removeItem("cart"); // Cancella il carrello locale dopo il merge
    setLoadingMessage("Reindirizzamento in corso...");
  }
}

export default function SubmitForm({
  defaultValues,
  formType,
}: {
  defaultValues: {
    email: string;
    password: string;
  };

  formType: string;
}) {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const handleLogin = async () => {
      if (status === "authenticated") {
        if (session?.user?.id) {
          console.log("User logged in:", session?.user);
          await mergeCartOnLogin(session.user.id, setLoadingMessage);
          setLoading(false);
          window.location.href = callbackUrl;
        }
      }
    };
    handleLogin();
  }, [status, session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMessage("Effettuando l'accesso...");
    setError("");
    setSuccessMessage("");

    const formData = new FormData(e.target as HTMLFormElement);

    if (formType === "sign-in") {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false, // Evita il redirect automatico
      });

      console.log("Risposta login:", response);

      if (response?.error) {
        setError("Credenziali errate. Riprova.");
        setLoading(false);
        setLoadingMessage("");
        return;
      }

      let retries = 0;
      while (status !== "authenticated" && retries < 10) {
        await new Promise((res) => setTimeout(res, 500)); // Attendi 500ms
        retries++;
      }

      setLoadingMessage("Sessione aggiornata, reindirizzamento...");
    } else {
      const response = await signUpUser(null, formData);

      if (!response.success) {
        setError(response.message || "Errore durante la registrazione.");
        setLoading(false);
        setLoadingMessage("");
        return;
      }

      setSuccessMessage("Registrazione completata! Effettua il login.");
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <>
      {/* 🟢 Overlay di caricamento */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="text-lg font-semibold">{loadingMessage}</p>
            <div className="mt-4 flex justify-center">
              <div className="size-10 animate-spin rounded-full border-y-2 border-gray-500"></div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={defaultValues.email}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={defaultValues.password}
            required
          />

          {formType === "sign-up" && (
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Conferma Password"
              required
            />
          )}

          <SubmitButton formType={formType} />

          {error && <div className="text-red-500">{error}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}
          <ChangeForm formType={formType} />
        </div>
      </form>
    </>
  );
}
