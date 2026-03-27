"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { LuCheck } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export default function CancellationSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      {/* Success Icon Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-sm text-center">
        <div className="size-20 rounded-full bg-[#1F1F24] flex items-center justify-center mb-10 shadow-2xl">
          <LuCheck className="size-12 text-white stroke-[3px]" />
        </div>

        {/* Success Message */}
        <h1 className="text-[24px] font-bold text-[#1F1F24] mb-4">
          Cancellation successful!
        </h1>
        <p className="text-[15px] text-[#828282] leading-relaxed px-4">
          Your ride has been cancelled successfully. You will receive a
          notification regarding your refund status shortly.
        </p>
      </div>

      {/* Action Button */}
      <div className="w-full mt-12 mb-4">
        <Button
          className="w-full"
          size={"lg"}
          onClick={() => router.push("/admin")}
        >
          Back to bookings
        </Button>
      </div>
    </div>
  );
}
