import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/sidebar/dashboard-sidebar";

const ComponentName = (props: LayoutProps<"/d">) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-base-200 w-full">{props.children}</main>
    </SidebarProvider>
  );
};

export default ComponentName;
