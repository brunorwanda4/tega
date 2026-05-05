"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardNavNotificationSheet from "./dashboard-nav-notfication-sheet";
import DashboardNavProfile from "./dashboard-nav-profile";
import DashboardSearch from "./dashboard-seach";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const getTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Dashboard";
    const section = segments[1];
    return section
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className="sticky top-0 z-50 flex min-h-16 w-full items-center justify-between gap-3 border-b bg-base-100 px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h2 className="truncate font-cal-sans text-lg sm:text-xl">
          {getTitle()}
        </h2>
      </div>
      <nav className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-4">
        <DashboardSearch />
        <DashboardNavNotificationSheet />
        <DashboardNavProfile />
      </nav>
    </header>
  );
};

export default DashboardNavbar;
