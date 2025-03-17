"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@radix-ui/react-separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPasswordForm = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log("Token:", token);
    if (!token) {
      toast({
        variant: "destructive",
        description: "Token mancante o non valido",
      });
      router.push("/");
    } else {
      setIsTokenValid(true);
    }
  }, [token, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast({
        variant: "destructive",
        description: "Le password non coincidono",
      });
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        return toast({
          variant: "destructive",
          description: data.message,
        });
      }

      toast({
        description: data.message,
      });

      router.push("/sign-in");
    } catch (error) {
      console.error("Errore nel reset della password:", error);
      toast({
        variant: "destructive",
        description: "Errore durante il reset della password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) return null;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-6">
      <div className="mx-auto w-full max-w-md">
        <BrandCard
          iconSrc="/images/miopetit.svg"
          title="🔑 Reset Password"
          description=" Inserisci la nuova password"
        >
          <Separator className="my-6 bg-slate-100" />
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-sm flex-col items-center space-y-4"
          >
            <Input
              type="password"
              placeholder="Nuova Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Conferma Nuova Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <BrandButton type="submit" loading={isLoading} variant="flat">
              Reset Password
            </BrandButton>
          </form>
        </BrandCard>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
