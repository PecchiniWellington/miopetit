import Breadcrumb from "@/components/shared/bread-crumb";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-center flex min-h-screen w-full flex-col">
      <Header />
      <Breadcrumb separator=">" />
      <main className="wrapper my-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
