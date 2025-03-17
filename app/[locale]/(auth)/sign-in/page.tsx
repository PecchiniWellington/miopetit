import { auth } from "@/auth";
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
      <div className="relative space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="space-y-4">
          <Link href="/" className="flex justify-center">
            <Image
              src="/images/miopetit.svg"
              width={40}
              height={40}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-900">
          Sign In
        </h1>
        <p className="text-center text-sm text-gray-600">
          Sign in to your account
        </p>

        <div className="space-y-4">
          <SubmitForm
            formType="sign-in"
            defaultValues={SIGN_IN_DEFAULT_VALUES}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
