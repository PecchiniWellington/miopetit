export default async function CareersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className=" wrapper my-10 flex-1">{children}</main>;
}
