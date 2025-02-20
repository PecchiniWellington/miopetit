import { APP_NAME } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeaderCheckout = () => {
  return (
    <header className="w-full border-b bg-white shadow-md dark:bg-gray-900">
      <div className="wrapper   flex  items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/petitLogo.png"
            alt={APP_NAME}
            height={42}
            width={42}
            priority
          />
          <span className="hidden text-xl font-semibold text-gray-800 dark:text-white lg:block">
            {APP_NAME}
          </span>
        </Link>

        {/* Messaggio di sicurezza */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-800 dark:bg-gray-800 dark:text-white">
          <ShieldCheck className="size-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium">Checkout Sicuro</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderCheckout;
