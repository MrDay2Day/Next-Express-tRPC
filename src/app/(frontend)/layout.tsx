import ResponsiveNav from "@/components/navigation/ResponsiveNav";
import { LoadingComp } from "../loading";
import { nextDynamic } from "@/utils/dynamic";
import Footer from "@/components/navigation/footer";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/navigation/side-bar/sideBar";

const PushComp = nextDynamic(
  // @ts-expect-error: None
  () => import("../utils/PushRegister"),
  {
    loading: () => <LoadingComp />, // Optional custom fallback
    ssr: true, // Optional: Disable server-side rendering for this component
  }
);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="block sm:hidden">MOBILE ONLY</h1>
      <ResponsiveNav />
      {/* <SidebarProvider> */}
      {/* <AppSidebar /> */}
      <div className="min-h-[100vh] w-full p-4">
        {/* <SidebarTrigger className="sticky top-0" /> */}
        <div className="px-10">{children}</div>
        <PushComp />
      </div>
      <Footer />
      <br />
      {/* </SidebarProvider> */}
    </>
  );
}
