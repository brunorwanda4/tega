"use client";

import { useMemo, useState } from "react";
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
  id: number;
  route: string;
  clientName: string;
  phone: string;
  email?: string;
  tickets: number;
  time: string;
  plate: string;
  amount: string;
  status: "Available" | "Booked";
}

type BookingForm = {
  route: string;
  time: string;
  clientName: string;
  phone: string;
  email: string;
};

const routeOptions = [
  {
    value: "Kigali - Muhanga",
    label: "Kigali - Muhanga",
    plate: "RAC231B",
    amount: "1,500",
    tickets: 20,
  },
  {
    value: "Kigali - Rubavu",
    label: "Kigali - Rubavu",
    plate: "RAE502C",
    amount: "4,500",
    tickets: 14,
  },
  {
    value: "Muhanga - Huye",
    label: "Muhanga - Huye",
    plate: "RAB771F",
    amount: "2,800",
    tickets: 18,
  },
  {
    value: "Kigali - Musanze",
    label: "Kigali - Musanze",
    plate: "RAD903H",
    amount: "3,500",
    tickets: 9,
  },
];

const timeOptions = ["08:00 AM", "10:00 AM", "02:30 PM", "06:00 PM"];

const initialBookings: BookingData[] = [
  {
    id: 1,
    route: "Kigali - Muhanga",
    clientName: "Beatrice Carrot",
    phone: "0788 123 456",
    email: "beatrice@example.com",
    tickets: 20,
    time: "08:00 AM",
    plate: "RAC231B",
    amount: "1,500",
    status: "Available",
  },
  {
    id: 2,
    route: "Kigali - Rubavu",
    clientName: "Andy Melvin",
    phone: "0793 080 089",
    email: "andy@example.com",
    tickets: 14,
    time: "10:00 AM",
    plate: "RAE502C",
    amount: "4,500",
    status: "Booked",
  },
  {
    id: 3,
    route: "Muhanga - Huye",
    clientName: "Jean Claude",
    phone: "0782 444 221",
    tickets: 18,
    time: "02:30 PM",
    plate: "RAB771F",
    amount: "2,800",
    status: "Available",
  },
  {
    id: 4,
    route: "Kigali - Musanze",
    clientName: "Mugisha Rwanda",
    phone: "0780 982 111",
    email: "mugisha@example.com",
    tickets: 9,
    time: "06:00 PM",
    plate: "RAD903H",
    amount: "3,500",
    status: "Available",
  },
];

const emptyForm: BookingForm = {
  route: "",
  time: "",
  clientName: "",
  phone: "",
  email: "",
};

const BOOKINGS_PER_PAGE = 5;

export default function TegaDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<BookingForm>(emptyForm);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;

    return bookings.filter((booking) =>
      [
        booking.route,
        booking.clientName,
        booking.phone,
        booking.email ?? "",
        booking.time,
        booking.plate,
        booking.amount,
        booking.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [bookings, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE),
  );
  const visibleBookings = filteredBookings.slice(
    (page - 1) * BOOKINGS_PER_PAGE,
    page * BOOKINGS_PER_PAGE,
  );

  const stats: StatCard[] = [
    {
      title: "Live bookings",
      value: bookings.length.toString(),
      subValue: "Updated now",
    },
    {
      title: "Completed bookings",
      value: bookings
        .filter((booking) => booking.status === "Booked")
        .length.toString(),
      trend: "Working MVP data",
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
      value: new Set(bookings.map((booking) => booking.phone)).size.toString(),
      trend: "Based on bookings",
    },
  ];

  const handleAddBooking = () => {
    if (
      !form.route ||
      !form.time ||
      !form.clientName.trim() ||
      !form.phone.trim()
    ) {
      return;
    }

    const route = routeOptions.find((option) => option.value === form.route);
    const newBooking: BookingData = {
      id: Date.now(),
      route: form.route,
      clientName: form.clientName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      tickets: route?.tickets ?? 1,
      time: form.time,
      plate: route?.plate ?? "N/A",
      amount: route?.amount ?? "0",
      status: "Booked",
    };

    setBookings((current) => [newBooking, ...current]);
    setForm(emptyForm);
    setSearch("");
    setPage(1);
    setIsOpen(false);
  };

  const handleBook = (bookingId: number) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              tickets: Math.max(booking.tickets - 1, 0),
              status: "Booked",
            }
          : booking,
      ),
    );
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const canSubmit =
    form.route && form.time && form.clientName.trim() && form.phone.trim();

  return (
    <div className="min-h-screen space-y-8 font-sans text-base-content">
      {/* Quick Stats Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Quick stats</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => {
            const hasSlash = stat.value.includes("/");
            const [mainValue, denominator] = stat.value.split("/");
            return (
              <Card
                key={stat.title}
                className="rounded-xl border-none bg-base-100 py-0 shadow-sm"
              >
                <CardContent className="space-y-2 p-5">
                  <p className="text-sm text-base-content/70 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold sm:text-3xl">
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
                    <div className="flex w-fit items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success">
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              className="pl-10 bg-base-300/50 border-none rounded-lg h-12 focus-visible:ring-1 focus-visible:ring-primary"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center text-xs text-base-content/40 border px-1.5 py-0.5 rounded border-base-content/20">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full rounded-md sm:w-auto">
                <IoAdd className="text-xl" />
                Add booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto bg-base-100 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  Book a ticket
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label htmlFor="booking-route" className="text-sm font-bold">
                    Destination
                  </label>
                  <Select
                    value={form.route}
                    onValueChange={(route) =>
                      setForm((current) => ({ ...current, route }))
                    }
                  >
                    <SelectTrigger
                      id="booking-route"
                      className="bg-base-200 border-none h-12"
                    >
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {routeOptions.map((route) => (
                        <SelectItem key={route.value} value={route.value}>
                          {route.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-time" className="text-sm font-bold">
                    Available time
                  </label>
                  <Select
                    value={form.time}
                    onValueChange={(time) =>
                      setForm((current) => ({ ...current, time }))
                    }
                  >
                    <SelectTrigger
                      id="booking-time"
                      className="bg-base-200 border-none h-12"
                    >
                      <SelectValue placeholder="Select the available time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-client" className="text-sm font-bold">
                    Client names
                  </label>
                  <Input
                    id="booking-client"
                    placeholder="Client names"
                    value={form.clientName}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        clientName: event.target.value,
                      }))
                    }
                    className="bg-base-200 border-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-phone" className="text-sm font-bold">
                    Phone number
                  </label>
                  <Input
                    id="booking-phone"
                    placeholder="0793080089"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    className="bg-base-200 border-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-email" className="text-sm font-bold">
                    Email address (Optional)
                  </label>
                  <Input
                    id="booking-email"
                    placeholder="johndue56@gmail.com"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="bg-base-200 border-none h-12"
                  />
                </div>
              </div>
              <DialogFooter className="flex flex-col gap-3 sm:flex-col">
                <Button
                  variant="outline"
                  onClick={() => {
                    setForm(emptyForm);
                    setIsOpen(false);
                  }}
                  className=" rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-md"
                  disabled={!canSubmit}
                  onClick={handleAddBooking}
                >
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>{" "}
        </div>

        {/* Shadcn Table */}
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-[980px] bg-base-100">
            <TableHeader className="bg-primary">
              <TableRow className="hover:bg-primary">
                <TableHead className="text-primary-content">Route</TableHead>
                <TableHead className="text-primary-content">Client</TableHead>
                <TableHead className="text-primary-content">Tickets</TableHead>
                <TableHead className="text-primary-content">
                  Departure
                </TableHead>
                <TableHead className="text-primary-content">
                  Bus plate
                </TableHead>
                <TableHead className="text-primary-content">Amount</TableHead>
                <TableHead className="text-primary-content">Status</TableHead>
                <TableHead className="text-right text-primary-content">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleBookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="border-base-200 hover:bg-base-200/50"
                >
                  <TableCell className="font-medium">{booking.route}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{booking.clientName}</span>
                      <span className="text-xs text-base-content/50">
                        {booking.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-success">
                    {booking.tickets}
                  </TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.plate}</TableCell>
                  <TableCell className="font-bold">{booking.amount}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-base-200 px-2 py-1 text-xs font-medium">
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      disabled={
                        booking.status === "Booked" || booking.tickets === 0
                      }
                      onClick={() => handleBook(booking.id)}
                      className="h-8 rounded-full border-neutral px-6 text-xs font-bold hover:bg-neutral hover:text-neutral-content"
                    >
                      {booking.status === "Booked" ? "Booked" : "Book"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {visibleBookings.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-8 text-center text-base-content/60"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">
            Page <span className="font-bold">{page}</span> of {totalPages}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <IoChevronBack />
            </Button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={pageNumber === page ? "default" : "outline"}
                  onClick={() => setPage(pageNumber)}
                  className="h-8 w-8 rounded-full p-0"
                >
                  {pageNumber}
                </Button>
              ),
            )}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 "
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
            >
              <IoChevronForward />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
