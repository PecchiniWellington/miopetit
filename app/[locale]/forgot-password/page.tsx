// src/app/reset-password/page.tsx

import BrandCard from "@/components/shared/brand-components/brand-card";
import ResetPasswordForm from "./forgot-password-form";

const ResetPasswordPage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-6">
      <div className="mx-auto w-full max-w-md">
        <BrandCard
          iconSrc="/images/miopetit.svg"
          title="🔑 Reset Password"
          description="Inserisci la tua email per resettare la password"
        >
          <ResetPasswordForm />
        </BrandCard>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
