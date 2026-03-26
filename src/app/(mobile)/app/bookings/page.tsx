"use client";
import { MapPin, X } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AppHeader from "../_components/app-header";

const BookingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tega | Bookings Overview</title>
      </Head>
      <AppHeader />
      <div className="flex flex-col relative pt-4">
        <main className="">
          <h2 className="text-[20px] font-semibold text-[#1F1F24] mb-[20px]">
            Bookings
          </h2>

          <div className="flex gap-2 mb-4">
            <Button  className=" rounded-full">
              Upcoming
            </Button>
            <Button
              className="bg-[#E5E7EB] text-[#555555] rounded-full h-[40px] px-[24px] text-[14px] hover:bg-[#E5E7EB]/80"
              variant="secondary"
            >
              Delayed
            </Button>
            <Button
              className="bg-[#E5E7EB] text-[#555555] rounded-full h-[40px] px-[24px] text-[14px] hover:bg-[#E5E7EB]/80"
              variant="secondary"
            >
              Cancelled
            </Button>
          </div>

          <Card className="bg-[#F9FAFB] border-none rounded-[16px] h-60 flex items-center justify-center mb-10">
            <CardContent>
              <p className="text-[#6B7280] text-[16px]">No current bookings</p>
            </CardContent>
          </Card>

          {/* 5. Destination Input Section */}
          <section className="space-y-6">
            {/* Starting Point Group */}
            <div>
              <label className="block text-[16px] font-medium  mb-[12px]">
                Starting point
              </label>
              <div className="flex gap-[12px] relative items-center">
                {/* Dashed line and icon assembly */}
                <div className="absolute top-[48px] -left-[16px] flex flex-col items-center">
                  <div className="w-[8px] h-[8px] bg-black"></div>{" "}
                  {/* Small Black Square */}
                  <div className="w-[1px] h-[36px] border-l-[2px] border-dashed border-[#CCCCCC] my-[6px]"></div>{" "}
                  {/* Dashed line */}
                  <MapPin className="w-[16px] h-[16px] text-black" />{" "}
                  {/* Map Pin Icon */}
                </div>

                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Where are you traveling from ?"
                    className="placeholder:text-[#9CA3AF]"
                  />
                  <X className="absolute right-[16px] top-[14px] w-[20px] h-[20px] text-[#9CA3AF] cursor-pointer" />
                </div>
                {/* Current Location Button */}
                <Button className="w-[48px] h-[48px] rounded-[10px] bg-[#1F1F24] p-0 flex flex-col items-center justify-center shrink-0">
                  <MapPin className="w-[20px] h-[20px] text-white" />
                  <span className="text-white text-[9px] mt-[1px]">
                    current
                  </span>
                </Button>
              </div>
            </div>

            {/* Destination Input Group */}
            <div className="">
              {" "}
              {/* Match alignment relative to icons */}
              <label className="block text-[16px] font-medium text-[#1F1F24] mb-[12px]">
                Destination
              </label>
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Where are you going ?"
                  className=" placeholder:text-[#9CA3AF]"
                />
                <X className="absolute right-[16px] top-[14px] w-[20px] h-[20px] text-[#9CA3AF] cursor-pointer" />
              </div>
            </div>

            {/* Submit Button */}
            <Link
              href={"/app/bookings/browse"}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full rounded-md",
              )}
            >
              Browse destinations
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default BookingsPage;
