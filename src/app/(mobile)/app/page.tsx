"use client";
import { MapPin, X } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AppHeader from "./_components/app-header";
import { BookingCard } from "./_components/bookings/booking-card";

type BookingFilter = "upcoming" | "delayed" | "cancelled";

const bookingFilters: { label: string; value: BookingFilter }[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Delayed", value: "delayed" },
  { label: "Cancelled", value: "cancelled" },
];

const bookings = [
  {
    id: "booking-1",
    date: "Feb 24, 2024-10:00 AM",
    plateNumber: "RAC204B",
    agency: "Volcano",
    from: "Kigali city, Nyamirambo",
    to: "Muhanga, Southern province",
    status: "upcoming" as const,
  },
  {
    id: "booking-2",
    date: "Feb 24, 2024-09:10 AM",
    plateNumber: "RW892F",
    agency: "Horizon express",
    from: "Nyabugogo",
    to: "Kayonza",
    status: "delayed" as const,
  },
  {
    id: "booking-3",
    date: "Feb 22, 2024-08:30 AM",
    plateNumber: "RAE774K",
    agency: "Kivu belt",
    from: "Nyabugogo",
    to: "Rubavu",
    status: "cancelled" as const,
  },
];

const AppLication: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState<BookingFilter>("upcoming");
  const filteredBookings = bookings.filter(
    (booking) => booking.status === activeFilter,
  );

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
            {bookingFilters.map((filter) => (
              <Button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-full h-[40px] px-[24px] text-[14px]",
                  activeFilter === filter.value
                    ? "bg-[#1F1F24] text-white hover:bg-[#1F1F24]/90"
                    : "bg-[#E5E7EB] text-[#555555] hover:bg-[#E5E7EB]/80",
                )}
                variant={
                  activeFilter === filter.value ? "default" : "secondary"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  date={booking.date}
                  plateNumber={booking.plateNumber}
                  agency={booking.agency}
                  from={booking.from}
                  to={booking.to}
                  status={booking.status}
                />
              ))
            ) : (
              <div className="rounded-[16px] bg-[#F9FAFB] py-12 text-center">
                <p className="text-[15px] font-medium text-[#6B7280]">
                  No {activeFilter} bookings
                </p>
              </div>
            )}
          </div>

          {/* 5. Destination Input Section */}
          <section className="space-y-6 pt-4">
            {/* Starting Point Group */}
            <div>
              <label
                htmlFor="home-starting-point"
                className="block text-[16px] font-medium  mb-[12px]"
              >
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
                    id="home-starting-point"
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
              <label
                htmlFor="home-destination"
                className="block text-[16px] font-medium text-[#1F1F24] mb-[12px] "
              >
                Destination
              </label>
              <div className="relative flex-grow">
                <Input
                  id="home-destination"
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

export default AppLication;
