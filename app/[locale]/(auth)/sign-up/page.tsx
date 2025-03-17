import { auth } from "@/auth";
import { SIGN_UP_DEFAULT_VALUES } from "@/lib/constants";
import { Metadata } from "next";

import { redirect } from "next/navigation";
import SubmitForm from "../shared/submit-form";
import GenericCard from "@/components/shared/brand-components/brand-card";

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
      <GenericCard
        iconSrc="/images/miopetit.svg"
        title="Create Account"
        description="Enter your information below to sign up"
      >
        <SubmitForm formType="sign-up" defaultValues={SIGN_UP_DEFAULT_VALUES} />
      </GenericCard>
    </div>
  );
};

export default SignUpPage;
