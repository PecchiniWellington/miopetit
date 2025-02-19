// src/app/reset-password/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import ResetPasswordForm from "./forgot-password-form";

const ResetPasswordPage = () => {
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
            Inserisci la tua email per resettare la password
          </CardDescription>

          <Separator className="my-6 bg-slate-100" />
          <CardContent className="mt-6 space-y-4">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
