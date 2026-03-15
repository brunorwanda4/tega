"use client";

import { usePathname } from "next/navigation";
import DashboardNavNotificationSheet from "./dashboard-nav-notfication-sheet";
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
    <header className=" bg-base-100 fixed w-full h-16 pl-8 items-center pr-74 flex justify-between py-4">
      <div>
        <h2 className="font-cal-sans text-xl">{getTitle()}</h2>
      </div>
      <nav className=" flex gap-4 items-center">
        <DashboardSearch />
        <DashboardNavNotificationSheet />
      </nav>
    </header>
  );
};

export default DashboardNavbar;
