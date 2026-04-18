"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMoreVertical } from "react-icons/fi";
import {
  LuFilter,
  LuInfo,
  LuLayoutGrid,
  LuList,
  LuPlus,
  LuSearch,
  LuUsers,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const buses = [
  {
    id: 1,
    name: "Toyota v8 2018",
    plate: "RAD342C",
    agency: "Volcano express",
    seats: 7,
    color: "Black",
    status: "Active",
  },
  {
    id: 2,
    name: "Coaster 2020",
    plate: "RAC502B",
    agency: "Horizon",
    seats: 28,
    color: "White",
    status: "In Maintenance",
  },
  {
    id: 3,
    name: "Scania Luxury",
    plate: "RAE112A",
    agency: "Ritco",
    seats: 52,
    color: "Blue",
    status: "Active",
  },
  {
    id: 4,
    name: "Toyota v8 2018",
    plate: "RAD342C",
    agency: "Volcano express",
    seats: 7,
    color: "Black",
    status: "Active",
  },
  {
    id: 5,
    name: "Coaster 2020",
    plate: "RAC502B",
    agency: "Horizon",
    seats: 28,
    color: "White",
    status: "Active",
  },
  {
    id: 6,
    name: "Scania Luxury",
    plate: "RAE112A",
    agency: "Ritco",
    seats: 52,
    color: "Blue",
    status: "Active",
  },
];

export default function AdminBusesPage() {
  const router = useRouter();

  return (
    <div className="">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1F1F24]">
            Bus Fleet Management
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor and manage all vehicles registered under Tega
          </p>
        </div>
        <Button
          className="bg-[#1F1F24] text-white rounded-xl h-12 px-6 font-bold flex gap-2 shadow-lg"
          onClick={() => router.push("/admin/buses/add")}
        >
          <LuPlus className="size-5" /> Add New Bus
        </Button>
      </div>

      {/* 2. Filters and Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            placeholder="Search by plate or agency..."
            className="pl-12 h-12 rounded-xl border-gray-200 focus-visible:ring-[#1F1F24]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-12 px-4 rounded-xl border-gray-200 flex gap-2 font-bold"
          >
            <LuFilter className="size-5" /> Filter
          </Button>
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <Button
              variant="ghost"
              className="h-12 px-4 rounded-none bg-gray-100 text-[#1F1F24]"
            >
              <LuLayoutGrid className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="h-12 px-4 rounded-none text-gray-400"
            >
              <LuList className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Bus Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {buses.map((bus) => (
          <Card key={bus.id} className="pt-0">
            {/* Image Section */}
            <div className="relative w-full h-48">
              <Image
                src="/images/bus.jpg"
                alt={bus.name}
                fill
                priority
                className="object-cover "
              />
              <div className="absolute  right-4 ">
                <button className="size-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50">
                  <FiMoreVertical className="size-4 text-[#1F1F24]" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    bus.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {bus.status}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <CardContent>
              <div className="mb-4">
                <h3 className="text-[18px] font-bold text-[#1F1F24]">
                  {bus.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {bus.agency}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Plate Number
                  </p>
                  <p className="text-[14px] font-bold text-[#1F1F24]">
                    {bus.plate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Capacity
                  </p>
                  <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#1F1F24]">
                    <LuUsers className="size-4" /> {bus.seats} Seats
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#1F1F24] text-[#1F1F24] rounded-xl font-bold flex gap-2 hover:bg-[#1F1F24] hover:text-white transition-all mb-4"
                onClick={() => router.push(`/d/vehicles/${bus.id}`)}
              >
                <LuInfo className="size-4" /> View Full Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
