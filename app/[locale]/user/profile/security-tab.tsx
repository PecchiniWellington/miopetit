import SendRequest from "@/app/forgot-password/send-request-change-btn";

interface SecurityTabProps {
  email: string;
  setIsLoading: (isLoading: boolean) => void;
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({
  email,
  setIsLoading,
  setErrorMessage,
  setSuccessMessage,
}) => (
  <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
    <h2 className="text-xl font-semibold">🔒 Sicurezza</h2>
    <p className="mt-2 text-gray-600">Gestisci password e autenticazione</p>
    <div className="w-min">
      <SendRequest
        email={email}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  </div>
);
