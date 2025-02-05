import Link from "next/link";

const ChangeForm = ({ formType = "sign-in" }) => {
  return (
    <div className="text-muted-foreground text-center text-sm">
      {formType === "sign-in"
        ? "Don't have an account? "
        : "Already have an account? "}

      <Link
        href={formType === "sign-in" ? "/sign-up" : "/sign-in"}
        className="link underline"
        target="_self"
      >
        {formType === "sign-in" ? "Sign Up" : "Sign In"}
      </Link>
    </div>
  );
};

export default ChangeForm;
