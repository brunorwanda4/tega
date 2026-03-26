'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaCheck } from "react-icons/fa";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen  items-center justify-center">

      {/* Success Icon Section */}
      <div className="flex flex-col items-center justify-center  space-y-8">
           <div className="size-24 bg-[#1F1F24] rounded-full flex items-center justify-center ">
              <FaCheck className="size-14 text-white" strokeWidth={2.5} />
           </div>

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#1F1F24]">Payment Successful!</h1>
          <p className="text-sm text-[#828282] max-w-[280px] mx-auto leading-relaxed">
            You will receive a confirmation message shortly for your booking details.
          </p>
        </div>
      </div>

      {/* Action Buttons at the Bottom */}
      <div className="w-full space-y-4 mt-8">
        <Button
          size="lg"
          className="w-full "
          onClick={() => router.push('/app/booking/e-receipt')}
        >
          View e-receipt
        </Button>

        <Button
          variant="outline"
          size="lg"

          className="w-full "
          onClick={() => router.push('/app')}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
