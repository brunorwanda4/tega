"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useScrollDirection } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const AppHeader = () => {
  // const isVisible = useScrollDirection(8);
  return (
    <header
      className={cn(
        " max-w-md mx-auto top-0 left-0 right-0 h-12 bg-base-100 flex items-center justify-between z-50 transition-transform duration-300 ",

      )}
    >
      <div className="flex items-center gap-2.5">
        <Image height={32} width={32} src="/light-logo.svg" alt="Tega Logo" />
        <h1 className="text-[24px] font-semibold text-base-content font-inter">
          Tega
        </h1>
      </div>

      <Button size={"icon"} variant={"ghost"}>
        <Bell className="size-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    </header>
  );
};

export default AppHeader;
