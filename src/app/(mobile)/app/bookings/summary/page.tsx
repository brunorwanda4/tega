"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LuClock, LuMap, LuMapPin } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import AppGoBackButton from "../../_components/common/go-back-button";
import {
  buildBookingHref,
  formatRwf,
  getBookingDetails,
  parseMoney,
} from "../_lib/booking-query";

export default function ReviewSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking = getBookingDetails(searchParams);
  const passengerCount = Number(booking.passengers);
  const baseFare = parseMoney(booking.price);
  const fareFees = baseFare * passengerCount;
  const transactionCut = 5;
  const total = fareFees + transactionCut;

  const handleProceedPayment = () => {
    router.push(
      buildBookingHref("/app/bookings/payment-success", searchParams, {
        total,
      }),
    );
  };

  return (
    <div className="space-y-8 pt-4">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <AppGoBackButton />
        <h1 className="text-[24px] font-bold text-[#1F1F24] w-full text-center pr-10">
          Review Summary
        </h1>
      </div>

      {/* Summary Card */}
      <div className="border border-[#E5E7EB] rounded-[16px] p-6 bg-white shadow-sm">
        {/* Route Details */}
        <div className="relative space-y-6 mb-6">
          {/* Vertical Dashed Line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-0 border-l-2 border-dashed border-[#1F1F24]"></div>

          <div className="flex items-start gap-4">
            <div className="z-10 bg-white p-0.5">
              <div className="size-3 rounded-full border-2 border-[#1F1F24] bg-white"></div>
            </div>
            <div>
              <p className="text-[14px] text-[#828282]">From</p>
              <p className="text-[17px] font-bold text-[#1F1F24]">
                {booking.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <LuMapPin className="size-4 text-[#1F1F24] z-10 bg-white" />
            <div>
              <p className="text-[14px] text-[#828282]">To</p>
              <p className="text-[17px] font-bold text-[#1F1F24]">
                {booking.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Time and Distance */}
        <div className="flex items-center gap-6 mb-8 text-[#1F1F24]">
          <div className="flex items-center gap-2">
            <LuClock className="size-4" />
            <span className="text-[14px] font-semibold">1hr 30min</span>
          </div>
          <div className="flex items-center gap-2">
            <LuMap className="size-4" />
            <span className="text-[14px] font-semibold">7KM</span>
          </div>
        </div>

        <hr className="border-[#E5E7EB] mb-6" />

        {/* Breakdown Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Passengers</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              {passengerCount}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Adults</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              {booking.adults}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Children</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              {booking.children}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Luggage</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              {booking.suitcases} suitcase, {booking.carryons} carryon
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Fare fees</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              {formatRwf(fareFees)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Transaction cut</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">
              {formatRwf(transactionCut)}
            </p>
          </div>
        </div>

        <hr className="border-[#E5E7EB] my-6" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-bold text-[#1F1F24]">Total:</p>
          <p className="text-[18px] font-bold text-[#1F1F24]">
            {formatRwf(total)}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-8">
        <Button size="lg" className="w-full" onClick={handleProceedPayment}>
          Proceed Payment
        </Button>
      </div>
    </div>
  );
}
