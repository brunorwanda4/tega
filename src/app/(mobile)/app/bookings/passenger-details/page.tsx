'use client';

import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AppGoBackButton from "../../_components/common/go-back-button";


export default function PassengerDetails() {
  const router = useRouter();

  // State for counters
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <div className=" space-y-8 pt-4">
      {/* Header with Circular Back Button */}
        <div className="flex items-center gap-4">
        <AppGoBackButton />
        <div>
          <h1 className="text-[28px] font-bold text-[#1F1F24] leading-tight">Passenger details</h1>
          <p className="text-[16px] text-[#828282] mt-[8px]">Are you travelling with others</p>
        </div>
        </div>


      {/* Passenger Selectors */}
      <div className="space-y-[40px] flex-1">

        {/* Adults Row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[18px] font-bold text-[#1F1F24]">Adults</p>
            <p className="text-[14px] text-[#828282]">Older 8 years</p>
          </div>
          <div className="flex items-center gap-[24px]">
            <Button
              variant="outline"
              size="icon"
              className='rounded-md'
              onClick={() => adults > 1 && setAdults(adults - 1)}
            >
              <Minus className="size-5" />
            </Button>
            <span className="text-[20px] font-bold w-[20px] text-center">{adults}</span>
            <Button
              variant="default"
              size="icon"
              className='rounded-md'
              onClick={() => setAdults(adults + 1)}
            >
              <Plus className="size-5" />
            </Button>
          </div>
        </div>

        {/* Children Row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[18px] font-bold text-[#1F1F24]">Children</p>
            <p className="text-[14px] text-[#828282]">0 to 8 years</p>
          </div>
          <div className="flex items-center gap-[24px]">
            <Button
              variant="outline"
              size="icon"
              className='rounded-md'
              onClick={() => children > 0 && setChildren(children - 1)}
            >
              <Minus className="size-5" />
            </Button>
            <span className="text-[20px] font-bold w-[20px] text-center">{children}</span>
            <Button
              variant="default"
              size="icon"
                           className='rounded-md'
              onClick={() => setChildren(children + 1)}
            >
              <Plus className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className=" space-y-[16px] flex flex-col mt-12">
        <Button size="lg"
          onClick={() => router.push("/app/bookings/luggage-details")}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
