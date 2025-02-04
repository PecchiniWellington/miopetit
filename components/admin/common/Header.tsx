import { ArrowLeftFromLine, HomeIcon } from "lucide-react";
import Link from "next/link";

const Header = ({ title }: any) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-start items-center">
        <Link
          href="/"
          className="border-slate-600 border-2 mr-4 rounded-2 px-2 py-1"
        >
          <ArrowLeftFromLine />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
      </div>
    </header>
  );
};
export default Header;
