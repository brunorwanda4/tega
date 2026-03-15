"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import type { RegisterType } from "@/app/(mobile)/auth/register/_schema/register-schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const DashboardNavProfile = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const storedData = localStorage.getItem("tega_register_data");

    if (storedData) {
      const parsedData = JSON.parse(storedData) as RegisterType;
      setEmail(parsedData.email);
      setName(parsedData.name);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src="/images/profile.jpg" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className=" flex gap-2">
          <Avatar size="lg">
            <AvatarImage src="/images/profile.jpg" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <div className=" flex flex-col">
            <span>{name}</span>
            <span>{email}</span>
          </div>
        </div>
        <Separator />
        <Button
          variant={"ghost"}
          className=" justify-start cursor-pointer rounded-md"
          onClick={() => router.push("/auth/login")}
        >
          <SlLogout />
          <span>Logout</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default DashboardNavProfile;
