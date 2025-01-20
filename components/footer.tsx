import { APP_NAME } from "@/lib/constants";
import { getCurrentYear } from "@/lib/utils";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="p-5 flex-center">
        {getCurrentYear()} © {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
