// import ResponsiveNav from "@/components/navigation/ResponsiveNav";
import { LoadingComp } from "../loading";
import { nextDynamic } from "@/utils/dynamic";
import Footer from "@/components/navigation/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/side-bar/sideBar";
import MobileNavButtons from "@/components/navigation/MobileNavButtons";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/NextAuthOptions";

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
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="relative">
        {session?.user ? (
          <>
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger className="sticky top-0" />
              <div className="px-10 w-full">{children}</div>
            </SidebarProvider>
            <Footer />
          </>
        ) : (
          <>
            <ResponsiveNav />
            <div>
              <div className="min-h-screen w-full p-4">
                <div className="px-10">{children}</div>
              </div>
              <Footer />
            </div>
          </>
        )}
      </div>
      <MobileNavButtons />
    </>
  );
}
