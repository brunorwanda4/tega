'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AppGoBackButton from "../../_components/common/go-back-button";
import { LuClock, LuMapPin, LuMap } from "react-icons/lu";

export default function ReviewSummary() {
  const router = useRouter();

  return (
    <div className="space-y-8 pt-4">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <AppGoBackButton />
        <h1 className="text-[24px] font-bold text-[#1F1F24] w-full text-center pr-10">Review Summary</h1>
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
              <p className="text-[17px] font-bold text-[#1F1F24]">Muhanga bus park</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <LuMapPin className="size-4 text-[#1F1F24] z-10 bg-white" />
            <div>
              <p className="text-[14px] text-[#828282]">To</p>
              <p className="text-[17px] font-bold text-[#1F1F24]">Kigali, Nyabugogo bus park</p>
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
            <p className="text-[15px] font-bold text-[#1F1F24]">2</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Fare fees</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">3,807 RF</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px] text-[#828282]">Transaction cut</p>
            <p className="text-[15px] font-bold text-[#1F1F24]">5 RF</p>
          </div>
        </div>

        <hr className="border-[#E5E7EB] my-6" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-bold text-[#1F1F24]">Total:</p>
          <p className="text-[18px] font-bold text-[#1F1F24]">3,812 RF</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-8">
        <Button
          size="lg"
          className="w-full"
          onClick={() => router.push('/app/bookings/payment-success')}
        >
          Proceed Payment
        </Button>
      </div>
    </div>
  );
}
