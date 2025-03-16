"use client";
import { signOutUser } from "@/core/actions/auth/auth.actions";
import BrandButton from "../brand-components/brand-button";

const SignOutBtn = () => {
  /*  const [, setValue] = useLocalStorage("cart", []); */
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await signOutUser();
      }}
    >
      <BrandButton type="submit" variant="flat">
        Sign Out
      </BrandButton>
    </form>
  );
};

export default SignOutBtn;
