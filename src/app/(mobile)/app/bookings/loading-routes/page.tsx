"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LuBus } from "react-icons/lu";

export default function LoadingTravelRoutes() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time (e.g., 3 seconds) before pushing to the tracking page
    const timer = setTimeout(() => {
      router.push("/app/bookings/tracking"); // Adjust this path to your actual tracking page route
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/png/map.png"
          alt="Map Background"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 flex flex-1 h-full items-center justify-center">
        <div className="relative flex flex-col items-center justify-center bg-white rounded-full size-38 shadow-2xl border border-gray-100">
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1F1F24] animate-spin"></div>

          <div className="flex flex-col items-center space-y-2">
            <LuBus className="size-10 text-[#1F1F24]" />
            <p className="text-xs font-medium text-[#1F1F24] text-center px-6 leading-tight">
              Loading travel <br /> routes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
