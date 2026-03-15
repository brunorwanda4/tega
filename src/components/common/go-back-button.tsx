"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface GoBackButtonProps {
  className?: string;
}

const GoBackButton = ({ className }: GoBackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className={cn("size-12 cursor-pointer", className)}
    >
      <FaArrowLeft size={24} />
      <span className=" sr-only">Go back</span>
    </Button>
  );
};

export default GoBackButton;
