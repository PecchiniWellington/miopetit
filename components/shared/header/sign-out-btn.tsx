"use client";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/core/actions/auth/auth.actions";

const SignOutBtn = () => {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await signOutUser();
      }}
    >
      <Button type="submit" className="btn-ghost">
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutBtn;
