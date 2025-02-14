import ResponsiveNav from "@/components/navigation/ResponsiveNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Second Layout</h1>
      {children}
    </>
  );
}
