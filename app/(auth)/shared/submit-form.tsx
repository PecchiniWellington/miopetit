"use client";
import { Input } from "../../../components/ui/input";
import { useSearchParams } from "next/navigation";
import { capitalizeFirstLetter, removeUnderscore } from "@/lib/utils";
import ChangeForm from "./change-form";
import SubmitButton from "./submit-button";
import { signInWithCredentials, signUpUser } from "@/lib/actions/user.action";
import { useActionState } from "react";

const SubmitForm = ({ defaultValues, formType }: any) => {
  const actionType =
    formType === "sign-in" ? signInWithCredentials : signUpUser;
  const [data, action] = useActionState(actionType, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        {Object.keys(defaultValues).map((key) => (
          <div key={key}>
            <label htmlFor={key}>
              {capitalizeFirstLetter(removeUnderscore(key))}
            </label>
            <Input
              type={key}
              id={key}
              name={key}
              defaultValue={defaultValues[key]}
              autoComplete={key}
            />
          </div>
        ))}

        <div>
          <SubmitButton formType={formType} />
        </div>
        {data && !data.success && (
          <div className="text-sm text-center text-red">{data.message}</div>
        )}
        <ChangeForm formType={formType} />
      </div>
    </form>
  );
};

export default SubmitForm;
