"use client";

import { ArrowLeft, ArrowRight, Circle, Settings2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AppGoBackButton from "../../_components/common/go-back-button";

export default function AvailableBuses() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const location = searchParams.get("location") || "Muhanga, Cyakabiri";

  return (
    <div className="flex flex-col ">
      <div className="">
        <div className="flex items-center gap-4">
          <AppGoBackButton />
          <div>
            <h1 className="text-[20px] font-semibold">Available buses</h1>
            <div className="flex items-center gap-2 text-[13px]">
              <span className=" opacity-80">Kigali, Nyamirambo</span>
              <ArrowRight className="size-3" />
              <span className=" font-medium">{location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#F9FAFB] px-6 pt-6 overflow-y-auto pb-10">
        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[#1F1F24]">Sort by</h2>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-lg bg-white border-[#E5E7EB]"
          >
            <Settings2 className="w-5 h-5 text-black" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {["All buses", "Earliest", "Late"].map((label, i) => (
            <Button
              key={label}
              className={`rounded-full px-6 h-10 text-[14px] ${i === 1 ? "bg-[#1F1F24] text-white" : "bg-[#E5E7EB] text-[#828282] hover:bg-gray-300"}`}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Bus Cards List */}
        <div className="space-y-4">
          <BusResultCard
            agency="Volcano express"
            delay="Delayed: 10 min"
            seats="20"
            color="bg-green-500"
          />
          <BusResultCard
            agency="Horizon express"
            delay="On time"
            seats="4"
            color="bg-red-500"
            status="ontime"
          />
          <BusResultCard
            agency="Kivu belt"
            delay="On time"
            seats="15"
            color="bg-yellow-500"
            status="ontime"
          />
        </div>
      </div>
    </div>
  );
}

function BusResultCard({ agency, delay, seats, color, status }: any) {
  return (
    <Card className="p-4 rounded-2xl border-[#E5E7EB] bg-white shadow-none">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-bold text-[15px]">KI-58-B-0271</p>
          <p className="text-[13px] text-[#828282]">{agency}</p>
        </div>
        <p className="font-bold text-[18px]">1,507 RF</p>
      </div>

      {/* Timeline view */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="text-center">
          <p className="font-bold text-[16px]">09:10 AM</p>
          <p className="text-[10px] text-[#828282]">Kigali city</p>
        </div>

        <div className="flex-1 flex items-center">
          <Circle className="w-1.5 h-1.5 fill-black" />
          <div className="flex-1 border-t-2 border-dashed border-gray-200 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-black rounded-full px-2 py-0.5 text-[9px] font-bold">
              2h 15min
            </span>
          </div>
          <Circle className="w-1.5 h-1.5 fill-black" />
        </div>

        <div className="text-center">
          <p className="font-bold text-[16px]">09:10 AM</p>
          <p className="text-[10px] text-[#828282]">Kigali city</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: "40%" }}></div>
          </div>
          <p className="text-[11px] text-[#828282]">
            <span className="font-bold text-black">{seats}/30</span> Remaining
          </p>
        </div>
        <p className="font-bold text-[14px]">15 Km</p>
        <p
          className={`text-[12px] font-bold ${status === "ontime" ? "text-green-500" : "text-red-500"}`}
        >
          {delay}
        </p>
      </div>
    </Card>
  );
}
