import Footer from "@/components/shared/footer/footer";
import HeaderCheckout from "@/components/shared/header/header-checkout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <HeaderCheckout />
      <main className="wrapper flex-1 md:my-12">{children}</main>
      <Footer />
    </div>
  );
}
