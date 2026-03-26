"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AppGoBackButton = () => {
  const router = useRouter();
  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ArrowLeft className="size-6 text-base-content" />
      <span className="sr-only">Go back</span>
    </Button>
  );
};

export default AppGoBackButton;
