"use client";

import { Home, User } from "lucide-react";
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaReceipt } from "react-icons/fa6";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavigationBar: NextPage = () => {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", icon: Home, href: "/app" },
    { name: "Bookings", icon: FaReceipt, href: "/app/bookings" },
    { name: "SSD offline", icon: IoCloudOfflineOutline, href: "/app/ssd" },
    // { name: "Movement", icon: FiMove, href: "/app/movement" },
    { name: "Profile", icon: User, href: "/app/profile" },
  ];

  return (
    <footer className="fixed z-50 max-w-md mx-auto bottom-0 left-0 right-0 h-16 pb-4 bg-base-100 border-t border-border flex items-center justify-around px-5">
      {navItems.map((item) => {
        const isActive =
          pathname.startsWith(item.href) &&
          (item.href === "/app" ? pathname === "/app" : true);
        return (
          <Link
            href={item.href}
            key={item.name}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <item.icon
              className={cn(
                "size-6",
                isActive ? "text-base-content" : "text-[#9CA3AF]",
              )}
            />
            <span className={cn("sr-only")}>{item.name}</span>
          </Link>
        );
      })}
    </footer>
  );
};

export default NavigationBar;
