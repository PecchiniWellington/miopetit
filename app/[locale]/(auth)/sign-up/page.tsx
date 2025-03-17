import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME, SIGN_UP_DEFAULT_VALUES } from "@/lib/constants";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitForm from "../shared/submit-form";

export const metadata: Metadata = {
  title: "SignUp",
  description: "Sign up to your account",
};

const SignUpPage = async (props: {
  searchParams: Promise<{ callback: string }>;
}) => {
  const session = await auth();

  const { callback } = await props.searchParams;
  if (session) {
    redirect(callback || "/");
  }
  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader title="Sign Un" className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/miopetit.svg"
              width={40}
              height={40}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
        </CardHeader>
        <CardTitle className="text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Enter your information below to sign up
        </CardDescription>
        <CardContent className="space-y-4">
          <SubmitForm
            formType="sign-up"
            defaultValues={SIGN_UP_DEFAULT_VALUES}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
