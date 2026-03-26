import { ArrowLeft, ArrowRight, Heart, MapPin, Navigation } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppGoBackButton from "../../_components/common/go-back-button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BusStatusPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tega | Bus Status Tracking</title>
      </Head>

      <div className="flex flex-col relative">
        {/* ================================================================================= */}
        {/* 1. BLACK HEADER SECTION (Fixed) */}
        {/* ================================================================================= */}
        <div className=" bg-primary text-primary-content -mx-6 px-6 py-4">
          <div className="flex items-center gap-4">
            <AppGoBackButton />
            <div>
              <h1 className="text-[20px] font-semibold">Bus status</h1>
              <div className="flex items-center gap-2 text-[13px]">
                <span className=" opacity-80">Kigali, Nyamirambo</span>
                <ArrowRight className="size-3" />
                <span className=" font-medium"> Muhanga, Cyakabiri</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================================= */}
        {/* 2. FLEXIBLE MAP SECTION (Prototype Mock) */}
        {/* ================================================================================= */}
        <main className="flex-1 overflow-hidden relative min-h-[40vh] -mx-6 px-6 ">
          <Image
            src="/png/map.png"
            alt="Real-time map tracking illustration"
            fill
            className="object-cover"
            priority
          />

          {/* Mock-up Overlay: Current User Pickup Location marker */}
          <div className="absolute top-[40%] right-[20%] flex flex-col items-center">
            <MapPin className="w-[24px] h-[24px] text-black" />
            <span className="mt-[2px] bg-black text-white text-[11px] px-[8px] py-[1px] rounded-full">
              Your pickup
            </span>
          </div>

          {/* Mock-up Overlay: Small Vehicle Navigation marker */}
          <div className="absolute top-[65%] left-[25%]">
            <div className="w-[18px] h-[18px] bg-[#1F1F24] rounded-full border border-white flex items-center justify-center">
              <Navigation className="w-[10px] h-[10px] text-white -rotate-45" />
            </div>
          </div>
        </main>

        <section className="bg-base-100  rounded-t-2xl -mx-6 px-6  pt-[20px] relative  space-y-[20px]">
          {/* Header Card: Vehicle and Seats Info */}
          <Card className="rounded-[12px]  bg-base-200 p-[16px] border-none">
            <CardContent className="p-0 flex items-center justify-between gap-[16px]">
              <div>
                <h3 className="text-[15px] text-sm font-semibold text-[#1F1F24]">
                  KI-58-B-0271
                </h3>
                <p className="text-[13px] text-sm text-[#828282]">Horizon express</p>
              </div>

              {/* Specialized image for seats remaining display (red progress bar) */}
              <div className="flex-1 relative flex flex-col items-center justify-center">
                <div className="flex-1 px-8 flex flex-col items-center">
                  <div className="mb-1 text-sm font-semibold ">
                    <span className="text-red-500">10</span>
                    <span className="text-gray-400">/30</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(13 / 30) * 100}%` }}
                    />
                  </div>

                  <span className="mt-2 text-xs text-gray-400 font-medium">
                    Seats remaining
                  </span>
                </div>
              </div>

              <div className="w-[48px] h-[48px] rounded-[10px] bg-[#F3F4F6] flex items-center justify-center">
                <Heart className="w-[20px] h-[20px] text-[#555555]" />
              </div>
            </CardContent>
          </Card>

          {/* Core Info Cards: Arrival Time, Status, Vehicle Plate */}
          <div className="rounded-[12px]  bg-base-200 p-[16px]">
            <div className="grid grid-cols-3 gap-[16px] ">
              {/* Arrival card */}
              <div>
                <p className="text-[20px] font-bold text-[#1F1F24]">22 min</p>
                <p className="text-[12px] text-[#828282] mt-[4px]">
                  To your pickup
                </p>
              </div>
              {/* Status card */}
              <div className=" flex flex-col items-center">
                <p className="text-[20px] font-bold text-[#219653]">On time</p>
                <p className="text-[12px] text-[#828282] mt-[4px]">Status</p>
              </div>
              {/* Arrives At card */}
              <div>
                <p className="text-[20px] font-bold text-[#1F1F24]">09:18 AM</p>
                <p className="text-[12px] text-[#828282] mt-[4px]">Arrives at</p>
              </div>
            </div>
            {/* Vehicle and Agency Details and Fare */}
            <div className="flex flex-row items-center gap-[24px]">
              {/* Image of Bus Only */}
              <div className="flex items-center justify-center p-[8px] h-[120px]">
                <Image
                  src="/svg/bus.svg" // Placeholder image asset of a bus coach
                  alt="Horizon Express bus illustration"
                  width={180}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text details and price */}
              <div className="flex flex-col items-end justify-between py-[12px] w-1/2">
                <div className="space-y-[10px] text-right  ">
                  <div className="text-[12px] text-[#828282] flex items-center gap-4">
                    <span>Vehicle plate</span>
                    <span className="text-[#1F1F24] font-medium">RAC204B</span>
                  </div>
                  <div className="text-[12px] text-[#828282] flex gap-4">
                    <span>Agency</span>
                    <span className="text-[#1F1F24] font-medium">Volcano</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="flex justify-end items-center ">
            <p className="text-lg font-extrabold text-[#1F1F24]">
              1,507 RWF
            </p>
            </div>
          </div>


          <Link href="/app/bookings/passenger-details" className={cn(buttonVariants({variant: "default", size: "lg"}),"w-full rounded-md mt-[24px]")}>
                    Pay the fare
          </Link>
        </section>
      </div>
    </>
  );
};

export default BusStatusPage;
