"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuCircle, LuMapPin, LuRadio } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BookingCard = () => {
  const router = useRouter();
  return (
    <div className="w-full ">
      {/* Header: Date and Ticket Status */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[16px] font-bold text-[#1F1F24]">
          Feb 24, 2024-10:00 AM
        </span>
        <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-3 py-1 rounded-full text-[#555555] text-[12px] font-medium cursor-pointer">
          <FaCheckCircle className="size-4 text-[#219653]" />
          View ticket
        </div>
      </div>

      <Separator />

      <div className="flex gap-4 items-start mb-6 mt-4">
        {/* Bus Illustration */}
        <div className="w-1/3">
          <Image
            src="/svg/bus.svg"
            alt="Bus"
            width={180}
            height={100}
            className="object-contain"
          />
          <p className="text-[12px] font-bold text-[#1F1F24] mt-2 leading-tight">
            Enjoy the ride till your final stop
          </p>
        </div>

        {/* Vehicle and Route Details */}
        <div className="w-2/3 space-y-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#828282]">Vehicle plate</span>
            <span className="font-bold text-[#1F1F24]">RAC204B</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#828282]">Agency</span>
            <span className="font-bold text-[#1F1F24]">Volcano</span>
          </div>

          {/* Route Visualization */}
          <div className="relative pl-4 space-y-4 mt-2">
            {/* Vertical Dashed Line */}
            <div className="absolute left-[3px] top-2 bottom-2 w-0 border-l border-dashed border-[#1F1F24]"></div>

            <div className="flex flex-col">
              <Separator />
              <div className="flex items-center gap-2 pt-2">
                <LuCircle
                  className="size-2 text-[#1F1F24] fill-white z-10"
                  strokeWidth={4}
                />
                <span className="text-[11px] text-[#828282]">From</span>
              </div>
              <p className="text-[13px] font-bold text-[#1F1F24] pl-4">
                Kigali city, Nyamirambo
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <LuMapPin className="size-3 text-[#1F1F24] z-10" />
                <span className="text-[11px] text-[#828282]">To</span>
              </div>
              <p className="text-[13px] font-bold text-[#1F1F24] pl-4">
                Muhanga, Sothern province
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Monitoring Button */}
      <Button
        onClick={() => router.push("/app/bookings/tracking")}
        className=" w-full"
      >
        <LuRadio className="size-4 animate-pulse" />
        Live monitoring
      </Button>
    </div>
  );
};
