import { useTranslations } from "next-intl";
import SendRequest from "../../forgot-password/send-request-change-btn";

interface SecurityTabProps {
  email: string;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({
  email,
  setIsLoading,
  isLoading = false,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const t = useTranslations("Profile.SecurityTab");
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white  dark:bg-gray-800">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <p className="mt-2 text-gray-600">{t("handle_your_your_password")}</p>
      <div className="w-min">
        <SendRequest
          isLoading={isLoading}
          email={email}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </div>
  );
};
