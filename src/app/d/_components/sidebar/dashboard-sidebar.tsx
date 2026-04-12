"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link, { useLinkStatus } from "next/link";
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { dashboardSidebarContentGroups } from "./dashboard-sidebar-content";

function LinkLoadingIndicator({
  icon: Icon,
  title,
  isOpen,
}: {
  icon: React.ComponentType<{ size: number; className: string }>;
  title: string;
  isOpen: boolean;
}) {
  const { pending } = useLinkStatus();

  return (
    <>
      {pending ? (
        <Loader2 size={24} className="size-5 animate-spin" />
      ) : (
        <Icon size={24} className="size-5" />
      )}
      {isOpen && <span>{title}</span>}
    </>
  );
}

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      className={cn(" bg-base-100 px-4", { "px-0": !open })}
    >
      <SidebarHeader className=" bg-base-100 flex flex-row justify-between items-center">
        {open && (
          <Link href="/d" className=" flex gap-2 items-center">
            <Image src={"/light-logo.svg"} alt="Logo" height={36} width={36} />
            <h1 className=" font-cal-sans text-3xl text-primary">Tega</h1>
          </Link>
        )}
        <SidebarTrigger className=" cursor-pointer" />
      </SidebarHeader>
      <SidebarContent className="bg-base-100 pt-6">
        {dashboardSidebarContentGroups.map((group) => (
          <SidebarGroup key={group.index ?? group.label}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      // isActive={pathname === item.url}
                      render={
                        <Link
                          href={item.url}
                          className={cn(
                            " flex items-center gap-4 w-full",
                            pathname === item.url
                              ? "bg-primary text-primary-content hover:bg-primary/80"
                              : "",
                          )}
                        />
                      }
                    >
                      <LinkLoadingIndicator
                        icon={item.icon}
                        title={item.title}
                        isOpen={open}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-base-100">
        <Button
          onClick={() => router.push("/auth/login")}
          variant={"ghost"}
          className=" justify-start cursor-pointer"
        >
          <SlLogout />
          <span className={cn(!open && "sr-only")}>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
