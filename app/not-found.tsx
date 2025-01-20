import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import ROUTES from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/petitLogo.png"
        alt={`${APP_NAME} logo`}
        priority={true}
        width={100}
        height={100}
      />
      <div className="p-6 rounded-lg shadow-md text-center w-1/3">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button variant="outline" className="mt-4 ml-2">
          <Link href={ROUTES.HOME}>Back To home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
