import Breadcrumb from "@/components/shared/bread-crumb";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Breadcrumb separator=">" />
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  );
}
