import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

const Header = ({ title }: { title?: string }) => {
  return (
    <header className=" border-b border-gray-700 bg-gray-800 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-start p-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-4 rounded-2 border-2 border-slate-600 px-2 py-1"
        >
          <ArrowLeftFromLine />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
      </div>
    </header>
  );
};
export default Header;
