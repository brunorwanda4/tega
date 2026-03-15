"use client";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import { SlLogout } from "react-icons/sl";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { dashboardSidebarContentGroups } from "./dashboard-sidebar-content";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      className={cn(" bg-white px-4", { "px-0": !open })}
    >
      <SidebarHeader className=" bg-white flex flex-row justify-between items-center">
        {open && (
          <Link href="/d" className=" flex gap-2 items-center">
            <Image src={"/light-logo.svg"} alt="Logo" height={36} width={36} />
            <h1 className=" font-cal-sans text-3xl text-primary">Tega</h1>
          </Link>
        )}
        <SidebarTrigger className=" cursor-pointer" />
      </SidebarHeader>
      <SidebarContent className="bg-white pt-6">
        {dashboardSidebarContentGroups.map((group) => (
          <SidebarGroup key={group.index ?? group.label}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem
                    key={item.url}
                    onClick={() => router.push(item.url)}
                    className={cn(
                      " text-neutral",
                      buttonVariants({
                        variant: pathname === item.url ? "default" : "ghost",
                        size: "default",
                        className:
                          !open &&
                          pathname === item.url &&
                          "text-primary bg-white",
                      }),
                      " justify-start rounded-md cursor-pointer",
                    )}
                  >
                    <item.icon size={24} className="size-5" />
                    {open && <span>{item.title}</span>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <Button variant={"ghost"} className=" justify-start cursor-pointer">
          <SlLogout />
          {open && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
