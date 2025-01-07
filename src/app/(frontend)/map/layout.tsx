import Image from "next/image";

export const metadata = {
  title: "Map",
  description: "The is the map page of the application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-slate-600 mb-5 p-2 rounded-xl">
        <h1 className="pb-5">Map</h1>
        <p>Mapping Layout</p>
        <p>Option Buttons Etc can be placed here</p>
        <Image
          width={152}
          height={152}
          src="/icons/logo_sqr-152.png"
          alt="This is a example image"
        />
      </div>
      {children}
      <div className="bg-slate-600 mt-5 p-2 rounded-xl">
        <p>Option Buttons Etc can be placed here</p>
      </div>
    </>
  );
}
