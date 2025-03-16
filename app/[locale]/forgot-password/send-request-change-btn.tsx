"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { useLocale, useTranslations } from "next-intl";

const SendRequest = ({
  email,
  setIsLoading,
  setErrorMessage,
  setSuccessMessage,
  isLoading,
}: {
  email: string;
  setIsLoading: (loading: boolean) => void;
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
  isLoading?: boolean;
}) => {
  const locale = useLocale();
  const t = useTranslations("Profile.SecurityTab");
  const handleAction = async (
    e: React.MouseEvent<HTMLButtonElement> | unknown
  ) => {
    if (e && e instanceof MouseEvent) {
      e.preventDefault();
    }
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/request-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, locale }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.message);
      } else {
        setSuccessMessage("Link di reset inviato con successo!");
      }
    } catch (error) {
      setErrorMessage("Errore durante l'invio del link di reset." + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BrandButton loading={isLoading} onClick={() => handleAction}>
      {t("send_reset_link")}
    </BrandButton>
  );
};

export default SendRequest;
