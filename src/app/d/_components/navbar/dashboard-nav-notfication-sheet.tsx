"use client";
import Image from "next/image";
import { BsBell } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DashboardNavNotificationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon"} className=" cursor-pointer">
          <BsBell className="size-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>All Notifications</SheetTitle>
        </SheetHeader>
        <div className=" flex flex-col items-center justify-center gap-4 mt-24">
          <Image
            src="/icons/notification.png"
            width={56}
            height={56}
            alt="Notifications"
          />
          <h3 className="text-lg">You have no notifications</h3>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardNavNotificationSheet;
