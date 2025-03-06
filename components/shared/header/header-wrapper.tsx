"use client";
import { usePathname } from "next/navigation";
import Header from ".";

const HeaderWrapper = () => {
  const pathname = usePathname();
  return <Header key={pathname} />;
};

export default HeaderWrapper;
