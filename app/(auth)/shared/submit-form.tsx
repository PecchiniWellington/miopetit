"use client";
import { camelCaseToSpaces, capitalizeFirstLetter } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Input } from "../../../components/ui/input";
import ChangeForm from "./change-form";
import SubmitButton from "./submit-button";

import {
  signInWithCredentials,
  signUpUser,
} from "@/lib/actions/auth/auth.actions";
import { useActionState } from "react";

const SubmitForm = ({
  defaultValues,
  formType,
}: {
  defaultValues: {
    email: string;
    password: string;
  };

  formType: string;
}) => {
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
        {(Object.keys(defaultValues) as (keyof typeof defaultValues)[]).map(
          (key) => (
            <div key={key}>
              <label htmlFor={key}>
                {capitalizeFirstLetter(camelCaseToSpaces(key))}
              </label>
              <Input
                type={key}
                id={key}
                name={key}
                defaultValue={defaultValues[key]}
                autoComplete={key}
              />
            </div>
          )
        )}

        <div>
          <SubmitButton formType={formType} />
        </div>
        {data && !data.success && (
          <div className="text-center text-sm text-red-500">{data.message}</div>
        )}
        <ChangeForm formType={formType} />
      </div>
    </form>
  );
};

export default SubmitForm;
