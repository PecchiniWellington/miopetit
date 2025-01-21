"use client";

import { SIGN_IN_DEFAULT_VALUES } from "@/lib/constants";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const AuthForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        variant="default"
        className="w-full primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={SIGN_IN_DEFAULT_VALUES.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="password"
            defaultValue={SIGN_IN_DEFAULT_VALUES.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-sm text-center text-red">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="underline link" target="_self">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
