"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FiBell,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSearch,
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

type BusStatus = "moving" | "pending" | "arrived";

interface Bus {
  id: number;
  route: string;
  driver: string;
  status: BusStatus;
  time: string;
  avatar: string;
  driverDetail: Driver;
}

interface Driver {
  name: string;
  role: string;
  avatar: string;
  from: string;
  fromTime: string;
  to: string;
  toTime: string;
  adults: number;
  infants: number;
  vehicle: string;
  plate: string;
}

interface Activity {
  message: string;
  time: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const buses: Bus[] = [
  {
    id: 1,
    route: "Kigali - Muhanga",
    driver: "Niyibizi Emmanuel",
    status: "moving",
    time: "3min ago",
    avatar: "https://i.pravatar.cc/150?u=600",
    driverDetail: {
      name: "Niyibizi E",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=600",
      from: "Muhanga bus park",
      fromTime: "11:00 AM, 20/08/2024",
      to: "Nyabugogo bus park",
      toTime: "12:30 PM, 20/08/2024",
      adults: 30,
      infants: 10,
      vehicle: "Toyota",
      plate: "RAD203C",
    },
  },
  {
    id: 2,
    route: "Muhanga - Cyakabiri",
    driver: "John Due",
    status: "moving",
    time: "just now",
    avatar: "https://i.pravatar.cc/150?u=601",
    driverDetail: {
      name: "John Due",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=601",
      from: "Muhanga bus park",
      fromTime: "10:30 AM, 20/08/2024",
      to: "Cyakabiri park",
      toTime: "11:45 AM, 20/08/2024",
      adults: 22,
      infants: 5,
      vehicle: "Coaster",
      plate: "RAB102A",
    },
  },
  {
    id: 3,
    route: "Rubavu - Cyangugu",
    driver: "Sebagabo",
    status: "moving",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=602",
    driverDetail: {
      name: "Sebagabo J",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=602",
      from: "Rubavu terminal",
      fromTime: "09:00 AM, 20/08/2024",
      to: "Cyangugu park",
      toTime: "12:00 PM, 20/08/2024",
      adults: 40,
      infants: 2,
      vehicle: "Bus",
      plate: "RAC450B",
    },
  },
  {
    id: 4,
    route: "Kigali - Muhanga",
    driver: "Andy Yohana",
    status: "moving",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=603",
    driverDetail: {
      name: "Andy Yohana",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=603",
      from: "Nyabugogo park",
      fromTime: "12:00 PM, 20/08/2024",
      to: "Muhanga bus park",
      toTime: "01:15 PM, 20/08/2024",
      adults: 35,
      infants: 0,
      vehicle: "Toyota",
      plate: "RAE312D",
    },
  },
  {
    id: 5,
    route: "Kigali - Muhanga",
    driver: "Byishimo Jean",
    status: "pending",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=604",
    driverDetail: {
      name: "Byishimo J",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=604",
      from: "Nyabugogo park",
      fromTime: "01:00 PM, 20/08/2024",
      to: "Muhanga bus park",
      toTime: "02:15 PM, 20/08/2024",
      adults: 28,
      infants: 4,
      vehicle: "Hiace",
      plate: "RAF501C",
    },
  },
  {
    id: 6,
    route: "Hannah Taylor",
    driver: "John Due",
    status: "pending",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=605",
    driverDetail: {
      name: "Hannah T",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=605",
      from: "Kicukiro terminal",
      fromTime: "01:30 PM, 20/08/2024",
      to: "Remera park",
      toTime: "02:00 PM, 20/08/2024",
      adults: 15,
      infants: 1,
      vehicle: "Minibus",
      plate: "RAG210E",
    },
  },
  {
    id: 7,
    route: "Kigali - Muhanga",
    driver: "John Due",
    status: "arrived",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=606",
    driverDetail: {
      name: "John Due",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=606",
      from: "Nyabugogo park",
      fromTime: "08:00 AM, 20/08/2024",
      to: "Muhanga bus park",
      toTime: "09:15 AM, 20/08/2024",
      adults: 33,
      infants: 7,
      vehicle: "Toyota",
      plate: "RAH009F",
    },
  },
  {
    id: 8,
    route: "Kigali - Muhanga",
    driver: "John Due",
    status: "arrived",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=608",
    driverDetail: {
      name: "John Due",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=608",
      from: "Nyabugogo park",
      fromTime: "07:30 AM, 20/08/2024",
      to: "Muhanga bus park",
      toTime: "08:45 AM, 20/08/2024",
      adults: 40,
      infants: 3,
      vehicle: "Coaster",
      plate: "RAI770G",
    },
  },
  {
    id: 9,
    route: "Kigali - Muhanga",
    driver: "id: 23FR14",
    status: "arrived",
    time: "12:47",
    avatar: "https://i.pravatar.cc/150?u=608",
    driverDetail: {
      name: "Driver 23FR14",
      role: "Driver",
      avatar: "https://i.pravatar.cc/150?u=608",
      from: "Remera terminal",
      fromTime: "06:00 AM, 20/08/2024",
      to: "Muhanga bus park",
      toTime: "07:30 AM, 20/08/2024",
      adults: 25,
      infants: 0,
      vehicle: "Bus",
      plate: "23FR14",
    },
  },
];

const activity: Activity = {
  message:
    "Client raised a dispute:  The car doesn't seem to be clean as expected",
  time: "just now",
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const statusStyles: Record<BusStatus, string> = {
  moving: "bg-orange-100 text-orange-500",
  pending: "bg-yellow-100 text-yellow-600",
  arrived: "bg-green-100 text-green-600",
};

function StatusBadge({ status }: { status: BusStatus }) {
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Avatar Circle ────────────────────────────────────────────────────────────

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BusDashboard() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [search, setSearch] = useState("");

  const filtered = buses.filter(
    (b) =>
      b.route.toLowerCase().includes(search.toLowerCase()) ||
      b.driver.toLowerCase().includes(search.toLowerCase()),
  );

  const activeBus = buses.find((b) => b.id === selectedId) ?? buses[0];
  const driver = activeBus.driverDetail;

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden -mx-8 -mt-8 -mb-4">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-white flex flex-col border-r border-gray-200 flex-shrink-0">
        <div className="px-4 pt-5 pb-3">
          <p className="font-semibold text-gray-800 text-base mb-3">
            All buses
          </p>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search buses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {filtered.map((bus) => (
            <li
              key={bus.id}
              onClick={() => setSelectedId(bus.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors ${
                selectedId === bus.id
                  ? "bg-gray-900 rounded-lg mx-2"
                  : "hover:bg-gray-50"
              }`}
            >
              <Avatar>
                <AvatarImage src={bus.avatar} alt={driver.name} />
                <AvatarFallback>
                  {bus.driverDetail.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${selectedId === bus.id ? "text-white" : "text-gray-800"}`}
                >
                  {bus.route}
                </p>
                <p
                  className={`text-[11px] truncate ${selectedId === bus.id ? "text-gray-300" : "text-gray-500"}`}
                >
                  {bus.driver}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <StatusBadge status={bus.status} />
                <span
                  className={`text-[10px] ${selectedId === bus.id ? "text-gray-300" : "text-gray-400"}`}
                >
                  {bus.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Center ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Driver header */}
        <div className=" flex">
          <div className="bg-white px-6 py-4 border-b border-gray-200 w-2/3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarImage src={driver.avatar} alt={driver.name} />
                  <AvatarFallback>{driver.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    {driver.name}
                  </p>
                  <p className="text-xs text-gray-500">{driver.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                >
                  <FiMessageSquare size={15} />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                >
                  <FiPhone size={15} />
                </button>
              </div>
            </div>

            {/* Trip info row */}
            <div className="grid grid-cols-3 gap-6">
              {/* Route */}
              <div>
                <p className="text-[11px] text-gray-400 font-medium mb-2 uppercase tracking-wide">
                  Trip route
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {driver.from}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {driver.fromTime}
                      </p>
                    </div>
                  </div>
                  <div className="w-px h-4 bg-gray-300 ml-[5px]" />
                  <div className="flex items-start gap-2">
                    <FiMapPin
                      className="text-gray-500 mt-0.5 flex-shrink-0"
                      size={12}
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {driver.to}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {driver.toTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div>
                <p className="text-[11px] text-gray-400 font-medium mb-2 uppercase tracking-wide">
                  Passengers
                </p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Adults</span>
                    <span className="text-xs font-semibold text-gray-800">
                      {driver.adults}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Infants</span>
                    <span className="text-xs font-semibold text-gray-800">
                      {driver.infants}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle */}
              <div>
                <p className="text-[11px] text-gray-400 font-medium mb-2 uppercase tracking-wide">
                  Vehicle
                </p>
                <p className="text-xs font-semibold text-gray-800">
                  {driver.vehicle}
                </p>
                <p className="text-[11px] text-gray-500">{driver.plate}</p>
              </div>
            </div>
          </div>

          <aside className="w-1/3 bg-white  p-4 shrink-0">
            <p className="font-semibold text-gray-800 text-base mb-4">
              Activity
            </p>

            <div className="bg-gray-900 rounded-xl p-3 relative">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FiBell className="text-white" size={13} />
                </div>
                <p className="text-white text-xs leading-relaxed">
                  {activity.message}
                </p>
              </div>
              <span className=" top-2.5 right-3 text-[10px] text-gray-400 justify-end flex text-end">
                {activity.time}
              </span>
            </div>
          </aside>
        </div>

        {/* Map area */}
        <div className="flex-1 relative overflow-hidden">
          <div className=" relative w-full h-[80vh]">
            <Image
              src={"/png/map-2.png"}
              alt="map image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
