// import ResponsiveNav from "@/components/navigation/ResponsiveNav";
import { LoadingComp } from "../loading";
import { nextDynamic } from "@/utils/dynamic";
import Footer from "@/components/navigation/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/side-bar/sideBar";
import { Button } from "@/components/ui/button";

const PushComp = nextDynamic(
  // @ts-expect-error: None
  () => import("../utils/PushRegister"),
  {
    loading: () => <LoadingComp />, // Optional custom fallback
    ssr: true, // Optional: Disable server-side rendering for this component
  }
);

const ResponsiveNav = nextDynamic(
  // @ts-expect-error: None
  () => import("@/components/navigation/ResponsiveNav"),
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
      <ResponsiveNav />
      <div className="relative">
        {/* <SidebarProvider> */}
        {/* <AppSidebar /> */}
        {/* <SidebarTrigger className="sticky top-0" /> */}
        <div>
          <div className="min-h-screen w-full p-4">
            <div className="px-10">{children}</div>
            <PushComp />
          </div>
          <Footer />
        </div>
        {/* </SidebarProvider> */}
      </div>
      <MobileNavButtons />
    </>
  );
}

function MobileNavButtons() {
  return (
    <div className="md:hidden sticky bottom-0 bg-[--background] h-20 border-t-[1px] border-t-slate-300 shadow-top flex items-center justify-evenly ">
      {Array(5)
        .fill(null)
        .map((_, i) => {
          return (
            <Button
              key={i}
              className=" border-[1px] border-slate-300 shadow-lg min-h-14 min-w-14 rounded-full"
            ></Button>
          );
        })}
    </div>
  );
}
