"use client";

import { BiMessageAltError } from "react-icons/bi";
import { useRouter } from "next/navigation";

import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuExternalLink,
  LuHistory,
  LuLoaderCircle,
  LuMessageSquare,
  LuPhone,

} from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock Client Data based on your Dashboard UI
const clientData = {
  name: "John Doe",
  joined: "21/07/2024",
  email: "alexparker@gmail.com",
  phone: "(+250)789-324-56-34",
  country: "Rwanda",
  stats: {
    bookings: 12,
    bookingsIncrease: "2.5%",
    reports: 2,
    reportsDate: "21/07/2021",
  },
};

export default function ClientDetailsPage() {
  const router = useRouter();

  return (
    <div className="">
      {/* 1. Top Action Bar */}
      <div className="flex justify-between items-center mb-10">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search a driver"
            className="w-full h-11 pl-4 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="h-11 px-5 border-gray-900 text-gray-900 font-bold flex gap-2 rounded-xl"
          >
            <LuDownload className="size-5" /> Export CV
          </Button>
          <Button className="h-11 px-5 bg-[#1F1F24] text-white font-bold flex gap-2 rounded-xl">
            All drivers <LuChevronDown className="size-5" />
          </Button>
        </div>
      </div>
      <Card>
        <CardContent>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-900 font-bold mb-8 hover:opacity-70 transition-opacity"
          >
            <LuChevronLeft className="size-5" /> Back
          </button>

          <div className=" flex items-center gap-6">
            <Avatar className="size-32">
              <AvatarImage src={`https://i.pravatar.cc/150?u=45`} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className=" flex flex-col gap-2">
              <div className="flex  gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#1F1F24] mb-1">
                    {clientData.name}
                  </h1>
                  <p className="text-gray-400 text-sm font-medium">
                    Joined {clientData.joined}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost">
                    <LuMessageSquare className="size-5 text-[#1F1F24]" />
                  </Button>
                  <Button variant="ghost">
                    <LuPhone className="size-5 text-[#1F1F24]" />
                  </Button>
                </div>
              </div>
              {/*contacts*/}

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p title={ clientData.email} className="text-[#1F1F24] font-medium line-clamp-1">
                    {clientData.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Telephone
                  </p>
                  <p title={ clientData.phone}  className="text-[#1F1F24] font-medium line-clamp-1">
                    {clientData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Country
                  </p>
                  <p title={ clientData.country}  className="text-[#1F1F24] font-medium">
                    {clientData.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm">
                <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <LuHistory className="size-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1F1F24]">
                    {clientData.stats.bookings}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold">
                    Bookings placed
                  </p>
                  <p className="text-[10px] text-green-500 font-bold">
                    ↑{clientData.stats.bookingsIncrease} increase
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4  shadow-sm">
                <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <BiMessageAltError className="size-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1F1F24]">
                    {clientData.stats.reports}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold">
                    Drivers reported
                  </p>
                  <p className="text-[10px] text-blue-500 font-bold underline cursor-pointer">
                    Last updated {clientData.stats.reportsDate}
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* 4. Travel History Table */}
          <div className="space-y-6 mt-12">
            <h2 className="text-xl font-bold text-[#1F1F24]">Travel history</h2>

            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#1F1F24] text-white text-sm font-medium">
                  <tr>
                    <th className="p-5">Driver names</th>
                    <th className="p-5">Date & Time</th>
                    <th className="p-5">Pickup</th>
                    <th className="p-5">Destination</th>
                    <th className="p-5">Payment</th>
                    <th className="p-5">Receipt</th>
                    <th className="p-5">Details</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[1, 2, 3, 4, 5, 6].map((row, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}
                    >
                      <td className="p-5 flex items-center gap-3"> <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${index + 100}`} />
                          <AvatarFallback>
                            AP
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-gray-900">
                          Alex Parker
                        </span>
                      </td>
                      <td className="p-5 text-gray-500 font-medium">
                        04-11-2024, 14:00
                      </td>
                      <td className=" text-gray-900 font-bold flex items-center gap-1">
                        Mariot Hotel Kigali{" "}
                        <LuExternalLink className="size-4 text-blue-500 cursor-pointer" />
                      </td>
                      <td className=" text-gray-900 font-bold flex-center">
                        Mariot Hotel Kigali{" "}
                      </td>
                      <td className="p-5 font-bold text-gray-900">3000 FRW</td>
                      <td className="p-5 text-gray-500 font-medium flex items-center gap-1">
                        #34531{" "}
                        <LuExternalLink className="size-4 text-blue-500 cursor-pointer" />
                      </td>

                      <td className="p-5">
                        <Button
                          variant="outline"
                          className="rounded-lg h-8 px-4 text-xs font-bold border-gray-900 text-gray-900 hover:bg-gray-50"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 5. Pagination */}
            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-gray-500 font-bold">
                Page <span className="text-gray-900">1</span> of 6
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="size-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <LuChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  className="size-8 rounded-full bg-[#1F1F24] text-white flex items-center justify-center text-xs font-bold"
                >
                  1
                </button>
                <button
                  type="button"
                  className="size-8 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold hover:bg-gray-50"
                >
                  2
                </button>
                <button
                  type="button"
                  className="size-8 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold hover:bg-gray-50"
                >
                  3
                </button>
                <button
                  type="button"
                  className="size-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <LuChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
