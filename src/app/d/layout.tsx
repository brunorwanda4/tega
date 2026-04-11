import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardNavbar from "./_components/navbar/dashboard-navbar";
import { DashboardSidebar } from "./_components/sidebar/dashboard-sidebar";

const ComponentName = (props: LayoutProps<"/d">) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-base-200 w-full relative font-inter">
        <DashboardNavbar />
        <div className="pt-20 px-8 font-inter flex-1 min-h-screen">
          <TooltipProvider>{props.children}</TooltipProvider>
        </div>
        <footer className="  bg-base-100  flex justify-between p-4 text-sm opacity-70  w-full mt-8">
          <p><span className="font-medium">Tega company</span>  solution of transport in Rwanda</p>
          <span className=" font-semibold">MVP 1.0</span>
        </footer>
      </main>
    </SidebarProvider>
  );
};

export default ComponentName;
