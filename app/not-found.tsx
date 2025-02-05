import DynamicButton from "@/components/dynamic-button";
import { APP_NAME } from "@/lib/constants";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/images/petitLogo.png"
        alt={`${APP_NAME} logo`}
        priority={true}
        width={100}
        height={100}
      />
      <div className="w-1/3 rounded-lg p-6 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold">Not Found</h1>
        <p className="text-red-500">Could not find requested page</p>

        <DynamicButton>
          <Link href={ROUTES.HOME}>Back To home</Link>
        </DynamicButton>
      </div>
    </div>
  );
};

export default NotFound;
