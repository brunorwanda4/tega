'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LuBus } from "react-icons/lu";

export default function LoadingTravelRoutes() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time (e.g., 3 seconds) before pushing to the tracking page
    const timer = setTimeout(() => {
      router.push('/booking/tracking'); // Adjust this path to your actual tracking page route
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background: Map Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/map-bg.png" // Ensure this map image is in your public folder
          alt="Map Background"
          fill
          className="object-cover grayscale"
        />
        {/* Dark Overlay to match the Figma "dimmed" look */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </div>

      {/* Centered Loading Component */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="relative flex flex-col items-center justify-center bg-white rounded-full size-48 shadow-2xl border border-gray-100">
          
          {/* Animated Spinner Border */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1F1F24] animate-spin"></div>
          
          {/* Content inside the circle */}
          <div className="flex flex-col items-center space-y-2">
            <LuBus className="size-10 text-[#1F1F24]" />
            <p className="text-[14px] font-medium text-[#1F1F24] text-center px-6 leading-tight">
              Loading travel <br /> routes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}