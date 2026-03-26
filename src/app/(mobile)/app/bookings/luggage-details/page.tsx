'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AppGoBackButton from "../../_components/common/go-back-button";
import { LuMinus, LuPlus, LuBackpack } from "react-icons/lu";
import { BsSuitcase2 } from "react-icons/bs";

export default function LuggageDetails() {
  const router = useRouter();

  // State for luggage counters
  const [suitcases, setSuitcases] = useState(2);
  const [carryons, setCarryons] = useState(0);

  return (
    <div className="space-y-8 pt-4">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <AppGoBackButton />
        <div>
          <h1 className="text-[28px] font-bold text-[#1F1F24] leading-tight">Luggage details</h1>
          <p className="text-[16px] text-[#828282] mt-[8px]">Do you have any luggages, if no proceed</p>
        </div>
      </div>

      {/* Luggage Selectors */}
      <div className="space-y-[40px] flex-1">

        {/* Suitcase Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <BsSuitcase2 className="size-6 text-[#1F1F24] mt-1" />
            <div>
              <p className="text-[18px] font-bold text-[#1F1F24]">Suitcase</p>
              <p className="text-[14px] text-[#828282]">Big luggage</p>
            </div>
          </div>
          <div className="flex items-center gap-[24px]">
            <Button
              variant="outline"
              size="icon"
              className='rounded-md'
              onClick={() => suitcases > 0 && setSuitcases(suitcases - 1)}
            >
              <LuMinus className="size-5" />
            </Button>
            <span className="text-[20px] font-bold w-[20px] text-center">{suitcases}</span>
            <Button
              variant="default"
              size="icon"
              className='rounded-md '
              onClick={() => setSuitcases(suitcases + 1)}
            >
              <LuPlus className="size-5" />
            </Button>
          </div>
        </div>

        {/* Carryon Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <LuBackpack className="size-6 text-[#1F1F24] mt-1" />
            <div>
              <p className="text-[18px] font-bold text-[#1F1F24]">Carryon</p>
              <p className="text-[14px] text-[#828282]">Small luggage</p>
            </div>
          </div>
          <div className="flex items-center gap-[24px]">
            <Button
              variant="outline"
              size="icon"
              className='rounded-md'
              onClick={() => carryons > 0 && setCarryons(carryons - 1)}
            >
              <LuMinus className="size-5" />
            </Button>
            <span className="text-[20px] font-bold w-[20px] text-center">{carryons}</span>
            <Button
              variant="default"
              size="icon"
              className='rounded-md '
              onClick={() => setCarryons(carryons + 1)}
            >
              <LuPlus className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-[16px] flex flex-col mt-12">
        <Button
          size="lg"
          onClick={() => router.push('/app/bookings/summary')}
        >
          View summary
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
