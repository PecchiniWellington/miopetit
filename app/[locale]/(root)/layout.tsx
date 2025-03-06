import CartSideMenu from "@/components/cart-side-menu";
import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { Suspense } from "react";
import Loading from "./loading";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Suspense fallback={<Loading />} key="layout">
        <Header />
        <main className=" wrapper my-10 flex-1">{children}</main>
        <CartSideMenu />
        <Footer />
      </Suspense>
    </div>
  );
}
