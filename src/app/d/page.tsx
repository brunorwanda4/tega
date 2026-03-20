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
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="border-none bg-base-100 shadow-sm rounded-xl"
            >
              <CardContent className="p-5 space-y-2">
                <p className="text-sm text-base-content/70 font-medium">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
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
          ))}
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
              <Button className="bg-neutral text-neutral-content hover:bg-neutral/90 h-12 px-6 rounded-lg gap-2">
                <IoAdd className="text-xl" />
                Add booking
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-base-100 p-8 rounded-3xl">
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
                  className="w-full border-2 border-neutral h-12 font-bold rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  className="w-full bg-neutral text-neutral-content h-12 font-bold rounded-xl"
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
          <Table className="bg-base-100">
            <TableHeader className="bg-neutral">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-neutral-content font-medium h-14">
                  Available bus
                </TableHead>
                <TableHead className="text-neutral-content font-medium">
                  Available tickets
                </TableHead>
                <TableHead className="text-neutral-content font-medium">
                  Departure time
                </TableHead>
                <TableHead className="text-neutral-content font-medium">
                  Bus plate
                </TableHead>
                <TableHead className="text-neutral-content font-medium">
                  Amount
                </TableHead>
                <TableHead className="text-neutral-content font-medium text-right pr-10">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, idx) => (
                <TableRow
                  key={idx}
                  className="border-base-200 hover:bg-base-200/50"
                >
                  <TableCell className="font-medium h-14">
                    {booking.route}
                  </TableCell>
                  <TableCell className="text-success font-medium">
                    {booking.tickets}
                  </TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.plate}</TableCell>
                  <TableCell className="font-bold">{booking.amount}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="outline"
                      className="rounded-full border-neutral px-6 h-8 text-xs font-bold hover:bg-neutral hover:text-neutral-content"
                    >
                      Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                className={`h-8 w-8 rounded-full p-0 ${page === 1 ? "bg-neutral text-neutral-content" : ""}`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 bg-neutral text-neutral-content"
            >
              <IoChevronForward />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
