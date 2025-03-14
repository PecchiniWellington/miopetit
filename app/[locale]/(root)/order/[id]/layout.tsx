export default async function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <main className=" wrapper my-10 flex-1">{children}</main>
    </div>
  );
}
