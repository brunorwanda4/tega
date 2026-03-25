"use client";

import { ArrowLeft, Circle, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const locations = [
  { id: 1, name: "Muhanga bus park", road: "Kigali Road" },
  { id: 2, name: "Muhanga, Cyakabiri stop", road: "Kigali Road" },
  { id: 3, name: "Muhanga, Pretrol station stop", road: "Kigali Road, Rwanda" },
  { id: 4, name: "Muhan", road: "Kabgayi Road, Rwanda" },
];

export default function PickupLocation() {
  const router = useRouter();

  const handleSelect = (name: string) => {
    // Navigate to available buses and pass the location as a query param
    router.push(
      `/booking/available-buses?location=${encodeURIComponent(name)}`,
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Header */}
      <div className="px-6 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </Button>
        <h1 className="text-[20px] font-semibold">Pickup location</h1>
      </div>

      {/* Search Input Area */}
      <div className="px-6 mb-8 flex items-center gap-3">
        {/* The square icon from design */}
        <div className="relative w-full">
          <Input placeholder="e.g, Muhanga bus park" className="pl-4 pr-10 " />
          <X className="absolute right-3 top-3.5 w-5 h-5 text-[#9CA3AF]" />
        </div>
      </div>

      {/* Location List */}
      <div className="flex-1 overflow-y-auto px-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="flex items-start gap-4 py-5 border-b border-[#F3F4F6] cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
            onClick={() => handleSelect(loc.name)}
          >
            <MapPin className="w-6 h-6 text-black mt-1 shrink-0" />
            <div>
              <p className="text-[17px] font-bold text-[#1F1F24] leading-tight">
                {loc.name}
              </p>
              <p className="text-[14px] text-[#828282] mt-1">{loc.road}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
