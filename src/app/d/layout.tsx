import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardNavbar from "./_components/navbar/dashboard-navbar";
import { DashboardSidebar } from "./_components/sidebar/dashboard-sidebar";

const ComponentName = (props: LayoutProps<"/d">) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-base-200 w-full relative">
        <DashboardNavbar />
        <div className="pt-20 px-8">{props.children}</div>
      </main>
    </SidebarProvider>
  );
};

export default ComponentName;
