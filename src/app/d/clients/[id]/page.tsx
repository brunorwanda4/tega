"use client";

import { useParams, useRouter } from "next/navigation";
import { BiMessageAltError } from "react-icons/bi";
import {
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuExternalLink,
  LuHistory,
  LuMessageSquare,
  LuPhone,
} from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getClientById, getInitials } from "@/data/clients";

export default function ClientDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const clientData = getClientById(params.id);

  if (!clientData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <h1 className="text-xl font-bold text-[#1F1F24]">
              Client not found
            </h1>
            <p className="text-sm text-gray-500">
              The selected client does not exist in the current client list.
            </p>
            <Button
              className="rounded-xl bg-[#1F1F24] text-white"
              onClick={() => router.push("/d/clients")}
            >
              Back to clients
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search a client"
            className="h-11 w-full rounded-lg border border-gray-200 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="flex h-11 gap-2 rounded-xl border-gray-900 px-5 font-bold text-gray-900"
          >
            <LuDownload className="size-5" /> Export profile
          </Button>
          <Button
            className="h-11 rounded-xl bg-[#1F1F24] px-5 font-bold text-white"
            onClick={() => router.push("/d/clients")}
          >
            All clients
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 font-bold text-gray-900 transition-opacity hover:opacity-70"
          >
            <LuChevronLeft className="size-5" /> Back
          </button>

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
            <Avatar className="size-24 sm:size-32">
              <AvatarImage src={clientData.image} alt={clientData.name} />
              <AvatarFallback>{getInitials(clientData.name)}</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-1 text-2xl font-bold text-[#1F1F24] sm:text-3xl">
                    {clientData.name}
                  </h1>
                  <p className="font-medium text-gray-400 text-sm">
                    Joined {clientData.joined}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost">
                    <LuMessageSquare className="size-5 text-[#1F1F24]" />
                  </Button>
                  <Button variant="ghost">
                    <LuPhone className="size-5 text-[#1F1F24]" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 pt-2 sm:grid-cols-3">
                <div>
                  <p className="mb-1 font-medium text-gray-400 text-sm uppercase tracking-wider">
                    Email
                  </p>
                  <p
                    title={clientData.email}
                    className="line-clamp-1 font-medium text-[#1F1F24]"
                  >
                    {clientData.email}
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-gray-400 text-sm uppercase tracking-wider">
                    Telephone
                  </p>
                  <p
                    title={clientData.phone}
                    className="line-clamp-1 font-medium text-[#1F1F24]"
                  >
                    {clientData.phone}
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-gray-400 text-sm uppercase tracking-wider">
                    Country
                  </p>
                  <p
                    title={clientData.location}
                    className="font-medium text-[#1F1F24]"
                  >
                    {clientData.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 xl:w-auto">
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                  <LuHistory className="size-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1F1F24]">
                    {clientData.stats.bookings}
                  </p>
                  <p className="font-bold text-[10px] text-gray-400">
                    Bookings placed
                  </p>
                  <p className="font-bold text-[10px] text-green-500">
                    +{clientData.stats.bookingsIncrease} increase
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                  <BiMessageAltError className="size-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1F1F24]">
                    {clientData.stats.reports}
                  </p>
                  <p className="font-bold text-[10px] text-gray-400">
                    Drivers reported
                  </p>
                  <p className="cursor-pointer font-bold text-[10px] text-blue-500 underline">
                    Last updated {clientData.stats.reportsDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-bold text-[#1F1F24]">Travel history</h2>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full min-w-[980px] border-collapse text-left">
                <thead className="bg-[#1F1F24] font-medium text-sm text-white">
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
                  {clientData.travelHistory.map((trip, index) => (
                    <tr
                      key={trip.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}
                    >
                      <td className="flex items-center gap-3 p-5">
                        <Avatar>
                          <AvatarImage
                            src={trip.driverAvatar}
                            alt={trip.driverName}
                          />
                          <AvatarFallback>
                            {getInitials(trip.driverName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-gray-900">
                          {trip.driverName}
                        </span>
                      </td>
                      <td className="p-5 font-medium text-gray-500">
                        {trip.dateTime}
                      </td>
                      <td className="p-5 font-bold text-gray-900">
                        <span className="inline-flex items-center gap-1">
                          {trip.pickup}
                          <LuExternalLink className="size-4 cursor-pointer text-blue-500" />
                        </span>
                      </td>
                      <td className="p-5 font-bold text-gray-900">
                        {trip.destination}
                      </td>
                      <td className="p-5 font-bold text-gray-900">
                        {trip.payment}
                      </td>
                      <td className="p-5 font-medium text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          {trip.receipt}
                          <LuExternalLink className="size-4 cursor-pointer text-blue-500" />
                        </span>
                      </td>
                      <td className="p-5">
                        <Button
                          variant="outline"
                          className="h-8 rounded-lg border-gray-900 px-4 font-bold text-gray-900 text-xs hover:bg-gray-50"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {clientData.travelHistory.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">
                        This client has no travel history yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold text-gray-500 text-sm">
                Page <span className="text-gray-900">1</span> of 1
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                >
                  <LuChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full bg-[#1F1F24] font-bold text-white text-xs"
                >
                  1
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
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
