import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <SessionProvider>
        <Header />
        <main className=" wrapper my-10 flex-1">{children}</main>
        <Footer />
      </SessionProvider>
    </div>
  );
}
