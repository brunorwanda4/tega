"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoAdd,
  IoChevronBack,
  IoChevronForward,
  IoSearchOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Types ---
interface StatCard {
  title: string;
  value: string;
  subValue?: string;
  trend?: string;
}

interface BookingData {
  route: string;
  tickets: number;
  time: string;
  plate: string;
  amount: string;
}

// --- Mock Data ---
const stats: StatCard[] = [
  { title: "Live bookings", value: "12", subValue: "Today 12/03/2024" },
  {
    title: "Completed bookings",
    value: "107",
    trend: "2.5% Compared to yesterday",
  },
  {
    title: "Available drivers",
    value: "29/45",
    subValue: "Last updated Today",
  },
  {
    title: "Available vehicles",
    value: "47/50",
    subValue: "Last updated 12/03/2024",
  },
  {
    title: "Total client accounts",
    value: "1300",
    trend: "4.5% Compared to last month",
  },
];

const bookings: BookingData[] = Array(7).fill({
  route: "Kigali - Muhanga",
  tickets: 20,
  time: "10:00 PM",
  plate: "RAC231B",
  amount: "1,500",
});

export default function TegaDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-8 font-sans text-base-content">
      {/* Quick Stats Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Quick stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const hasSlash = stat.value.includes("/");
            const [mainValue, denominator] = stat.value.split("/");
            return (
              <Card
                key={idx}
                className="border-none bg-base-100 shadow-sm rounded-xl py-0"
              >
                <CardContent className="p-5 space-y-2">
                  <p className="text-sm text-base-content/70 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">
                    {mainValue}
                    {hasSlash && (
                      <span className="text-base-content/50 ">
                        /{denominator}
                      </span>
                    )}
                  </p>
                  {stat.subValue && (
                    <p className="text-[10px] text-base-content/50">
                      {stat.subValue}
                    </p>
                  )}
                  {stat.trend && (
                    <div className="flex items-center gap-1 text-[10px] text-success bg-success/10 w-fit px-2 py-0.5 rounded-full">
                      <IoTrendingUpOutline />
                      <span>{stat.trend}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Bookings Section */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Bookings</h2>
          <div className="h-1 w-20 bg-base-content rounded-full" />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-base-300/50 border-none rounded-lg h-12 focus-visible:ring-1 focus-visible:ring-primary"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center text-xs text-base-content/40 border px-1.5 py-0.5 rounded border-base-content/20">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className=" rounded-md">
                <IoAdd className="text-xl" />
                Add booking
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-base-100 max-h-[90vh] overflow-y-scroll ">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  Book a ticket
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Destination</label>
                  <Select>
                    <SelectTrigger className="bg-base-200 border-none h-12">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muhanga">Kigali - Muhanga</SelectItem>
                      <SelectItem value="rubavu">Kigali - Rubavu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Available time</label>
                  <Select>
                    <SelectTrigger className="bg-base-200 border-none h-12">
                      <SelectValue placeholder="Select the available time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10pm">10:00 PM</SelectItem>
                      <SelectItem value="8am">08:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Client names</label>
                  <Input
                    placeholder="Vehicle names"
                    className="bg-base-200 border-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Phone number</label>
                  <Input
                    placeholder="0793080089"
                    className="bg-base-200 border-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">
                    Email adress (Optional )
                  </label>
                  <Input
                    placeholder="johndue56@gmail.com"
                    className="bg-base-200 border-none h-12"
                  />
                </div>
              </div>
              <DialogFooter className="flex flex-col gap-3 sm:flex-col">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className=" rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Shadcn Table */}
        <div className="rounded-xl overflow-hidden shadow-sm">
          <table className="table bg-base-100 table-zebra">
            {/* head */}
            <thead className="bg-primary text-primary-content">
              <tr>
                <th className="font-medium">Available bus</th>
                <th className="font-medium">Available tickets</th>
                <th className="font-medium">Departure time</th>
                <th className="font-medium">Bus plate</th>
                <th className="font-medium">Amount</th>
                <th className="text-right pr-10 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={idx} className="hover:bg-base-200/50 border-base-200">
                  <td className="font-medium">{booking.route}</td>
                  <td className="text-success font-medium">
                    {booking.tickets}
                  </td>
                  <td>{booking.time}</td>
                  <td>{booking.plate}</td>
                  <td className="font-bold">{booking.amount}</td>
                  <th className="text-right pr-6">
                    <Button
                      variant="outline"
                      className="rounded-full border-neutral px-6 h-8 text-xs font-bold hover:bg-neutral hover:text-neutral-content"
                    >
                      Book
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm font-medium">
            Page <span className="font-bold">1</span> of 6
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
            >
              <IoChevronBack />
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                className={`h-8 w-8 rounded-full p-0 ${page === 1 ? "" : ""}`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 "
            >
              <IoChevronForward />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
