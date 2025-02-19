"use client";

import DynamicButton from "@/components/dynamic-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { APP_NAME } from "@/lib/constants";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";
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
        <Card>
          <CardHeader title="Sign In" className="space-y-4">
            <Link href="/" className="flex-center">
              <Image
                src="/images/miopetit.svg"
                width={100}
                height={100}
                alt={`${APP_NAME} logo`}
                priority={true}
              />
            </Link>
          </CardHeader>
          <CardTitle className="text-center"> 🔑 Reset Password</CardTitle>
          <CardDescription className="text-center">
            Inserisci la nuova password
          </CardDescription>

          <Separator className="my-6 bg-slate-100" />
          <CardContent className="mt-6 space-y-4">
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
              <DynamicButton
                isPending={isLoading}
                className="flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
              >
                {isLoading ? "Resettando..." : "Reset Password"}
              </DynamicButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
