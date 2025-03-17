import { auth } from "@/auth";
import { SIGN_UP_DEFAULT_VALUES } from "@/lib/constants";
import { Metadata } from "next";

import BrandCard from "@/components/shared/brand-components/brand-card";
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
      <BrandCard
        iconSrc="/images/miopetit.svg"
        title="Create Account"
        description="Enter your information below to sign up"
      >
        <SubmitForm formType="sign-up" defaultValues={SIGN_UP_DEFAULT_VALUES} />
      </BrandCard>
    </div>
  );
};

export default SignUpPage;
