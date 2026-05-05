import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardNavbar from "./_components/navbar/dashboard-navbar";
import { DashboardSidebar } from "./_components/sidebar/dashboard-sidebar";

const ComponentName = (props: LayoutProps<"/d">) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-base-200 relative flex min-w-0 flex-1 flex-col font-inter">
        <DashboardNavbar />
        <div className="min-h-screen min-w-0 flex-1 px-4 py-4 font-inter sm:px-6 lg:px-8">
          <TooltipProvider>{props.children}</TooltipProvider>
        </div>
        <footer className="mt-8 flex w-full flex-col gap-2 bg-base-100 p-4 text-sm opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium">Tega company</span> solution of
            transport in Rwanda
          </p>
          <span className="font-semibold">MVP 1.0</span>
        </footer>
      </main>
    </SidebarProvider>
  );
};

export default ComponentName;
