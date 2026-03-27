"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";
import { LuBell, LuBus, LuPlay, LuUsers } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import AppHeader from "../app/_components/app-header";

// Define the Travel type based on your UI requirements
type TravelStatus = "Upcoming" | "Completed" | "Cancelled";

interface TravelRecord {
  id: string;
  date: string;
  from: string;
  to: string;
  plate: string;
  agency: string;
  passengers: number;
  status: TravelStatus;
}

export default function AdminTravelsDashboard() {
  const [activeTab, setActiveTab] = useState<TravelStatus>("Upcoming");
  const router = useRouter();
  // Mock data representing the records for the admin
  const allRecords: TravelRecord[] = [
    {
      id: "1",
      date: "Feb 24, 2024-10:00 AM",
      from: "Kigali city, Nyamirambo",
      to: "Muhanga, Southern province",
      plate: "RAC204B",
      agency: "Volcano",
      passengers: 2,
      status: "Upcoming",
    },
    {
      id: "2",
      date: "Feb 23, 2024-08:00 AM",
      from: "Kigali city, Nyabugogo",
      to: "Musanze, Northern province",
      plate: "RAE502C",
      agency: "Horizon",
      passengers: 28,
      status: "Completed",
    },
    {
      id: "3",
      date: "Feb 22, 2024-02:00 PM",
      from: "Huye, Southern province",
      to: "Kigali city",
      plate: "RAD112A",
      agency: "Ritco",
      passengers: 0,
      status: "Cancelled",
    },
  ];

  const filteredTravels = allRecords.filter((t) => t.status === activeTab);

  const pushPage = () => {
    if (activeTab === "Upcoming") {
      router.push("/admin/tracking");
    } else if (activeTab === "Completed") {
      router.push("/admin/tracking");
    } else if (activeTab === "Cancelled") {
      router.push("/admin/cancel");
    }
  };

  return (
    <div className="min-h-screen pt-4">
      {/* Header Section */}
      <AppHeader />

      {/* Tabs / Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 mt-4">
        {(["Upcoming", "Completed", "Cancelled"] as TravelStatus[]).map(
          (tab) => (
            <Button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` ${
                activeTab === tab
                  ? "bg-[#1F1F24] text-white shadow-lg"
                  : "bg-[#E5E7EB] text-[#828282] hover:bg-gray-300"
              }`}
            >
              {tab}
            </Button>
          ),
        )}
      </div>

      <div className="space-y-6 mt-4">
        {filteredTravels.length > 0 ? (
          filteredTravels.map((travel) => (
            <div
              key={travel.id}
              className="bg-base-200 rounded-[24px] p-6  shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[16px] font-bold text-[#1F1F24]">
                  {travel.date}
                </span>
                <div
                  className={`px-3 py-1 rounded-full flex items-center gap-1 ${
                    travel.status === "Upcoming"
                      ? "bg-blue-50 text-blue-600"
                      : travel.status === "Completed"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  <span className="text-[12px] font-bold uppercase">
                    {travel.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-6 items-center mb-6">
                <div className="relative w-32 h-20">
                  <Image
                    src="/svg/bus.svg" // Use your bus image asset
                    alt="Bus"
                    fill
                    className="object-contain cursor-pointer"
                    onClick={() => router.push("/admin/vehicle-details")}
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[12px] text-[#828282]">
                        Vehicle plate
                      </p>
                      <p className="font-bold text-[#1F1F24]">{travel.plate}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#828282]">Agency</p>
                      <p className="font-bold text-[#1F1F24]">
                        {travel.agency}
                      </p>
                    </div>
                  </div>

                  {/* Route Indicator */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full border-2 border-[#1F1F24]"></div>
                      <p className="text-[13px] font-medium text-[#1F1F24]">
                        {travel.from}
                      </p>
                    </div>
                    <div className="ml-[3px] h-4 border-l-2 border-dashed border-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-[#1F1F24] rounded-full"></div>
                      <p className="text-[13px] font-medium text-[#1F1F24]">
                        {travel.to}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mb-6">
                <div className="flex items-center gap-2 text-[#828282]">
                  <LuBus className="size-4" />
                  <span className="text-[13px]">Vehicle details</span>
                </div>
                <div className="flex items-center gap-2 text-[#828282]">
                  <LuUsers className="size-4" />
                  <span className="text-[13px]">
                    {travel.passengers} Passengers
                  </span>
                </div>
              </div>

              {/* Action Button based on Status */}
              <Button
                type="button"
                onClick={() => pushPage()}
                className="w-full "
                size={"lg"}
              >
                {activeTab === "Upcoming" && (
                  <>
                    <LuPlay className="size-4" /> Start journey
                  </>
                )}
                {activeTab === "Completed" && (
                  <>
                    <FaCheckCircle className="size-4" /> View Report
                  </>
                )}
                {activeTab === "Cancelled" && (
                  <>
                    <GoXCircleFill className="size-4" /> View Reason
                  </>
                )}
              </Button>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 rounded-[24px] h-64 flex flex-col items-center justify-center text-[#828282] border-2 border-dashed border-gray-200">
            <LuBus className="size-12 mb-2 opacity-20" />
            <p className="font-medium text-[16px]">
              No {activeTab.toLowerCase()} travels found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
