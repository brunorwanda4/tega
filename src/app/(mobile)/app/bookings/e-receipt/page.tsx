'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import AppGoBackButton from '../../_components/common/go-back-button';

export default function BusTicket() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center justify-between py-6 ">
      {/* Header */}
      <div className="w-full max-w-sm">
        <div className="flex items-center mb-6">

          <AppGoBackButton />
          <h1 className="text-base font-semibold text-[#1F1F24] mx-auto pr-9">Bus ticket</h1>
        </div>

        {/* Ticket Card */}
        <div className="w-full bg-white rounded-2xl shadow-md overflow-visible relative">

          {/* Top dark section: route */}
          <div className="bg-[#1F1F24] rounded-t-2xl px-5 py-5 text-white">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs text-gray-400">Kigali, Nyamirambo</p>
                <p className="text-sm font-bold uppercase">buspark</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 mx-2 flex-shrink-0" />
              <div className="text-right">
                <p className="text-xs text-gray-400">Muhanga, Cyakabiri</p>
                <p className="text-sm font-bold uppercase">bus stop</p>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">Fri 18 Sept 2025</p>
          </div>

          {/* Ticket body */}
          <div className="bg-white px-5 pt-5 pb-4">
            {/* Ticket ID */}
            <div className="flex justify-center mb-4">
              <span className="border border-gray-300 rounded-full px-5 py-1 text-xs font-medium text-[#1F1F24] tracking-wide">
                KI-58-B-0271
              </span>
            </div>

            {/* Name & Passengers */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-bold text-[#1F1F24]">John Doe</p>
              <p className="text-sm text-gray-500">2 passengers</p>
            </div>

            {/* Time row */}
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-lg font-bold text-[#1F1F24]">09:10 AM</p>
                <p className="text-xs text-gray-500 leading-tight">Kigali city, Nyamirambo<br />buspark</p>
              </div>
              {/* Duration indicator */}
              <div className="flex flex-col items-center mx-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <div className="border-t border-dashed border-gray-400 w-12"></div>
                  <span className="text-[10px] text-gray-500 border border-gray-300 rounded-full px-1.5 py-0.5 whitespace-nowrap">2h 15min</span>
                  <div className="border-t border-dashed border-gray-400 w-12"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#1F1F24]">09:10 AM</p>
                <p className="text-xs text-gray-500 leading-tight text-right">Muhanga city, Cyakabiri<br />bus stop</p>
              </div>
            </div>

            {/* Booking info row */}
            <div className="flex items-end justify-between mt-5">
              <div>
                <p className="text-sm font-semibold text-[#1F1F24]">Thur</p>
                <p className="text-sm font-semibold text-[#1F1F24]">27/8/2025,</p>
                <p className="text-sm font-semibold text-[#1F1F24]">07:10 PM</p>
                <p className="text-xs text-gray-400 mt-1">Booking time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">1</p>
                <p className="text-xs text-gray-400 mt-1">Scan remaining</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#1F1F24]">1,507 RF</p>
                <p className="text-xs text-gray-400 mt-1">Fare fees</p>
              </div>
            </div>
          </div>

          {/* ── Ticket tear line with notches ── */}
          {/*
            The notches are positioned absolutely outside the card's white bg,
            overlapping its sides. The dashed line sits between them.
          */}
          <div className="relative flex items-center" style={{ height: '24px' }}>
            {/* Left notch — sits flush on the left edge */}
            {/*<div
              className="absolute bg-gray-100 rounded-full z-10 size-12 -left-3 -top-2 "
            />*/}
            {/* Dashed separator */}
            <div className="w-full border-t-2 border-dashed border-gray-200 mx-4" />
            {/* Right notch — sits flush on the right edge */}
            {/*<div
              className="absolute bg-gray-100 rounded-full z-10 size-12 -right-3 -top-2 "
            />*/}
          </div>

          {/* QR Code section */}
          <div className="bg-white rounded-b-2xl px-5 pb-5 pt-3">
            <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Verifier&apos;s QR-code
            </p>
            <div className="flex justify-center mb-5">
              {/* Placeholder QR — replace with real <QRCode /> component */}
              <div className="">
                              <QRCodeSVG value="Tega-Ticket-KI58B0271" size={140} />
                            </div>
            </div>

            {/* Agency policy */}
            <div className="border-t border-dashed border-gray-200 pt-4">
              <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Agency policy
              </p>
              <p className="text-[10px] text-gray-400 leading-relaxed text-center">
                [1] Passengers are not entitled to a refund if they miss the bus due to their own delay. However, a refund will be provided if the delay is caused by the Agency. [2] Passengers are solely responsible for their luggage. The Agency will not be held liable for any lost or missing items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download button */}
      <div className="w-full max-w-sm mt-6">
        <Button
          size="lg"
          className="w-full "
        >
          Download ticket
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full mt-2"
          onClick={() => router.push("/app")}
          >
          Go Home
        </Button>
      </div>
    </div>
  );
}
