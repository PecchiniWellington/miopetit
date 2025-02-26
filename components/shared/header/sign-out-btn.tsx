"use client";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/core/actions/auth/auth.actions";
import useLocalStorage from "@/hooks/use-local-storage";

const SignOutBtn = () => {
  const [, setValue] = useLocalStorage("cart", []);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setValue([]);
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
