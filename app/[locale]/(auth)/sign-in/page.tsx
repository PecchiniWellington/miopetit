import { auth } from "@/auth";
import { SIGN_IN_DEFAULT_VALUES } from "@/lib/constants";
import { Metadata } from "next";

import BrandCard from "@/components/shared/brand-components/brand-card";
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
      <BrandCard
        iconSrc="/images/miopetit.svg"
        title="Sign In"
        description="Enter your information below to sign in"
        className="flex w-full flex-col items-center justify-center"
      >
        <SubmitForm formType="sign-in" defaultValues={SIGN_IN_DEFAULT_VALUES} />
      </BrandCard>
    </div>
  );
};

export default SignInPage;
