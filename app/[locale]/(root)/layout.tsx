import Chatbot from "@/components/chatbot/chatbot";
import Breadcrumb from "@/components/shared/bread-crumb";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header";
import { Suspense } from "react";
import Loading from "../loading";
import CartSideMenu from "@/components/shared/cart-side-menu";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Suspense fallback={<Loading />} key="layout">
        <Header />
        <Breadcrumb />
        <main className=" wrapper my-10 flex-1">{children}</main>
        <CartSideMenu />
        <Chatbot />
        <Footer />
      </Suspense>
    </div>
  );
}
