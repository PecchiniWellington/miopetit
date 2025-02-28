import { APP_NAME } from "@/lib/constants";
import { getCurrentYear } from "@/lib/utils";

const Footer = () => {
  console.log("FOOTER");
  return (
    <footer className="w-full border-t">
      <div className="flex-center p-5">
        {getCurrentYear()} © {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
