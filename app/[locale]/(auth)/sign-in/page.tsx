import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME, SIGN_IN_DEFAULT_VALUES } from "@/lib/constants";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitForm from "../shared/submit-form";

export const metadata: Metadata = {
  title: "Sign In",

  description: "Sign in to your account",
};

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const session = await auth();

  const { callbackUrl } = await props.searchParams;
  if (session) {
    redirect(callbackUrl || "/");
  }
  return (
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
        <CardTitle className="text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
        <CardContent className="space-y-4">
          <SubmitForm
            formType="sign-in"
            defaultValues={SIGN_IN_DEFAULT_VALUES}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
