"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaCompass,
  FaCrosshairs,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { TbArrowFork } from "react-icons/tb";
import { Button } from "@/components/ui/button";

export default function NavigationPage() {
  const [muted, setMuted] = useState(false);
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-4">
      {/* Phone shell */}
      <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[844px]  flex flex-col">
        {/* ── Direction Banner ── */}
        <div className="mx-4 mt-2 bg-gray-900 text-white rounded-2xl px-5 py-4 z-30 relative ">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* turn right arrow */}
              <IoChevronForward className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-[32px] font-black tracking-tight leading-none">
                120 mi
              </p>
              <p className="text-sm text-gray-400 mt-[2px] font-medium">
                16th Street
              </p>
            </div>
          </div>
        </div>

        {/* ── Map Section ── */}
        <div className="relative flex-1" style={{ minHeight: 420 }}>
          {/* Map background — Next.js Image, place your map image at /public/map.png */}
          <Image
            src="/png/map.png"
            alt="Map background"
            fill
            priority
            className="object-cover grayscale brightness-110 contrast-95"
          />

          {/* ── Route SVG ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 390 440"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Drop shadow */}
            <path
              d="M 88 390 L 88 310 Q 82 270 100 220 Q 120 165 165 120 Q 210 78 260 62 Q 290 54 315 50"
              fill="none"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* White border */}
            <path
              d="M 88 390 L 88 310 Q 82 270 100 220 Q 120 165 165 120 Q 210 78 260 62 Q 290 54 315 50"
              fill="none"
              stroke="white"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dark route */}
            <path
              d="M 88 390 L 88 310 Q 82 270 100 220 Q 120 165 165 120 Q 210 78 260 62 Q 290 54 315 50"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ── Destination Pin ── */}
          <div
            className="absolute z-20 flex flex-col items-center"
            style={{ top: 32, right: 58 }}
          >
            <div
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-xl"
              style={{ border: "2.5px solid white" }}
            >
              <FaMapMarkerAlt className="text-white text-[17px]" />
            </div>
            {/* pin stem */}
            <div className="w-2 h-2 bg-gray-900 rounded-full -mt-1" />
          </div>

          {/* ── Current Location Puck ── */}
          <div className="absolute z-20" style={{ bottom: 56, left: 52 }}>
            <div
              className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl"
              style={{ border: "3px solid white" }}
            >
              <FaLocationArrow className="text-white text-[22px] -rotate-12" />
            </div>
          </div>

          {/* ── Map Controls ── */}
          <div className="absolute right-4 top-40 flex flex-col gap-[10px] z-20">
            {[
              {
                icon: <FaCompass />,
                key: "compass",
              },
              {
                icon: muted ? <FaVolumeMute /> : <FaVolumeUp />,
                key: "sound",
                onClick: () => setMuted((v) => !v),
              },
              {
                icon: <FaCrosshairs />,
                key: "crosshair",
              },
            ].map((btn) => (
              <Button type="button" key={btn.key} onClick={btn.onClick}>
                {btn.icon}
              </Button>
            ))}
          </div>
        </div>

        {/* ── Bottom Panel ── */}
        <div className="bg-white px-5 pt-4 pb-8 z-30 relative">
          {/* drag handle */}
          <div className="w-9 h-[4px] bg-gray-200 rounded-full mx-auto mb-4" />

          {/* ETA row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[26px] font-black text-gray-900 tracking-tight leading-none">
                1hr 30min
              </p>
              <p className="text-sm text-gray-500 mt-[3px] font-medium">
                To your destination
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant={"ghost"}>
                <TbArrowFork className="text-gray-700 text-[20px]" />
              </Button>
              <Button onClick={() => router.push("/admin")}>Back</Button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-4" />

          {/* Trip meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Agency
              </p>
              <p className="text-[14px] font-bold text-gray-900">
                Volcano express
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Plate number
              </p>
              <p className="text-[14px] font-bold text-gray-900">RAC304D</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
