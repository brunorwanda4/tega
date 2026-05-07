"use client";

import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projectContacts } from "@/data/contacts";

type DriverStatus = "Available" | "Busy";

type Driver = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  rating: number;
  trips: number;
  status: DriverStatus;
  createdOn: string;
  avatar: string;
  clientsReached: number;
  reports: number;
  distanceKm: number;
};

type Booking = {
  id: number;
  driverId: number;
  client: string;
  dateTime: string;
  pickup: string;
  destination: string;
  payment: number;
  receipt: string;
  status: "Completed" | "Upcoming" | "Cancelled";
};

const drivers: Driver[] = [
  {
    id: 1,
    name: "Alex Parker",
    email: projectContacts[0].email,
    phone: projectContacts[0].phone,
    company: "Volcano Express",
    rating: 5,
    trips: 128,
    status: "Available",
    createdOn: "2024-07-22",
    avatar: "https://i.pravatar.cc/150?u=801",
    clientsReached: 340,
    reports: 1,
    distanceKm: 15000,
  },
  {
    id: 2,
    name: "Jean Claude",
    email: projectContacts[1].email,
    phone: projectContacts[1].phone,
    company: "Kigali Transit",
    rating: 4,
    trips: 92,
    status: "Busy",
    createdOn: "2024-08-03",
    avatar: "https://i.pravatar.cc/150?u=802",
    clientsReached: 216,
    reports: 3,
    distanceKm: 9800,
  },
  {
    id: 3,
    name: "Eric Mutoni",
    email: projectContacts[2].email,
    phone: projectContacts[2].phone,
    company: "Rwanda Moves",
    rating: 5,
    trips: 140,
    status: "Available",
    createdOn: "2024-06-18",
    avatar: "https://i.pravatar.cc/150?u=803",
    clientsReached: 390,
    reports: 0,
    distanceKm: 17240,
  },
  {
    id: 4,
    name: "Patrick Niyonsaba",
    email: projectContacts[0].email,
    phone: projectContacts[0].phone,
    company: "City Riders",
    rating: 3,
    trips: 63,
    status: "Available",
    createdOn: "2024-09-10",
    avatar: "https://i.pravatar.cc/150?u=804",
    clientsReached: 144,
    reports: 2,
    distanceKm: 6400,
  },
  {
    id: 5,
    name: "Marie Uwera",
    email: projectContacts[1].email,
    phone: projectContacts[1].phone,
    company: "Horizon Express",
    rating: 5,
    trips: 156,
    status: "Busy",
    createdOn: "2024-05-04",
    avatar: "https://i.pravatar.cc/150?u=805",
    clientsReached: 420,
    reports: 1,
    distanceKm: 20100,
  },
  {
    id: 6,
    name: "Bruno Kabaka",
    email: projectContacts[2].email,
    phone: projectContacts[2].phone,
    company: "Virunga Coach",
    rating: 4,
    trips: 87,
    status: "Available",
    createdOn: "2024-10-12",
    avatar: "https://i.pravatar.cc/150?u=806",
    clientsReached: 198,
    reports: 1,
    distanceKm: 8700,
  },
];

const bookings: Booking[] = [
  {
    id: 1,
    driverId: 1,
    client: "Andy Melvin",
    dateTime: "2026-05-05T14:00:00",
    pickup: "Kigali International Airport",
    destination: "Marriott Hotel Kigali",
    payment: 3000,
    receipt: "#34531",
    status: "Completed",
  },
  {
    id: 2,
    driverId: 1,
    client: "Beatrice Carrot",
    dateTime: "2026-05-04T09:30:00",
    pickup: "Nyabugogo Bus Park",
    destination: "Muhanga Bus Park",
    payment: 1500,
    receipt: "#34532",
    status: "Completed",
  },
  {
    id: 3,
    driverId: 2,
    client: "John Nathanael",
    dateTime: "2026-05-05T11:15:00",
    pickup: "Kimironko Terminal",
    destination: "Rubavu Station",
    payment: 4500,
    receipt: "#34533",
    status: "Upcoming",
  },
  {
    id: 4,
    driverId: 3,
    client: "Iradukunda Marie",
    dateTime: "2026-05-04T16:45:00",
    pickup: "Huye Bus Park",
    destination: "Kigali City",
    payment: 2800,
    receipt: "#34534",
    status: "Completed",
  },
  {
    id: 5,
    driverId: 4,
    client: "Mugisha Rwanda",
    dateTime: "2026-05-03T07:20:00",
    pickup: "Remera",
    destination: "Rwamagana",
    payment: 1800,
    receipt: "#34535",
    status: "Cancelled",
  },
  {
    id: 6,
    driverId: 5,
    client: "Alex Mugabe",
    dateTime: "2026-05-02T18:10:00",
    pickup: "Musanze Terminal",
    destination: "Rubavu",
    payment: 2200,
    receipt: "#34536",
    status: "Completed",
  },
  {
    id: 7,
    driverId: 6,
    client: "Jean Claude",
    dateTime: "2026-05-01T12:30:00",
    pickup: "Kigali City",
    destination: "Nyagatare",
    payment: 5200,
    receipt: "#34537",
    status: "Completed",
  },
  {
    id: 8,
    driverId: 1,
    client: "Bruno Kabaka",
    dateTime: "2026-04-30T08:00:00",
    pickup: "Muhanga Bus Park",
    destination: "Kigali City",
    payment: 1500,
    receipt: "#34538",
    status: "Completed",
  },
];

const PER_PAGE = 5;
const STAR_KEYS = ["one", "two", "three", "four", "five"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCurrency(value: number) {
  return `${new Intl.NumberFormat("en").format(value)} FRW`;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_KEYS.slice(0, max).map((key, index) => (
        <Star
          key={key}
          className={
            index < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }
        />
      ))}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  sub,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="mt-0.5 text-muted-foreground">{icon}</div>
        <div className="min-w-0">
          <p className="font-bold text-xl leading-tight">{value}</p>
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="mt-1 text-muted-foreground text-xs">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function BookingsCalendar({ activeDays }: { activeDays: number[] }) {
  const today = new Date();
  const [month, setMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const firstDay = (new Date(month.year, month.month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const goPrev = () =>
    setMonth((current) =>
      current.month === 0
        ? { year: current.year - 1, month: 11 }
        : { ...current, month: current.month - 1 },
    );

  const goNext = () =>
    setMonth((current) =>
      current.month === 11
        ? { year: current.year + 1, month: 0 }
        : { ...current, month: current.month + 1 },
    );

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={goPrev}>
            <ChevronLeft />
          </Button>
          <div className="text-center">
            <p className="font-semibold text-sm">
              {new Intl.DateTimeFormat("en", { month: "long" }).format(
                new Date(month.year, month.month),
              )}
            </p>
            <p className="text-muted-foreground text-xs">{month.year}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={goNext}>
            <ChevronRight />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <span key={day} className="text-muted-foreground">
              {day}
            </span>
          ))}
          {cells.map((day, index) => {
            const isActive = Boolean(day && activeDays.includes(day));
            const isToday =
              day === today.getDate() &&
              month.month === today.getMonth() &&
              month.year === today.getFullYear();

            return (
              <span
                key={`${day ?? "empty"}-${index}`}
                className={`flex aspect-square items-center justify-center rounded-full ${
                  isActive
                    ? "bg-base-content text-base-100"
                    : isToday
                      ? "bg-muted font-semibold"
                      : "text-base-content"
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DriverProfilePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const driverId = Number(params.id);
  const driver = drivers.find((item) => item.id === driverId);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const driverBookings = useMemo(() => {
    if (!driver) return [];
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const belongsToDriver = booking.driverId === driver.id;
      const matchesSearch =
        !query ||
        [
          booking.client,
          booking.pickup,
          booking.destination,
          booking.receipt,
          booking.status,
          formatCurrency(booking.payment),
          formatDate(booking.dateTime),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return belongsToDriver && matchesSearch;
    });
  }, [driver, search]);

  const totalPages = Math.max(1, Math.ceil(driverBookings.length / PER_PAGE));
  const pageLogs = driverBookings.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const activeDays = driverBookings.map((booking) =>
    new Date(booking.dateTime).getDate(),
  );

  if (!driver) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <AlertCircle className="text-muted-foreground" />
            <h1 className="font-semibold text-xl">Driver not found</h1>
            <p className="text-muted-foreground text-sm">
              The selected driver does not exist in this MVP dataset.
            </p>
            <Button
              className="rounded-md"
              onClick={() => router.push("/d/drivers")}
            >
              Back to drivers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exportProfile = () => {
    const rows = [
      ["Name", driver.name],
      ["Email", driver.email],
      ["Phone", driver.phone],
      ["Company", driver.company],
      ["Rating", `${driver.rating}/5`],
      ["Trips", `${driver.trips}`],
      ["Status", driver.status],
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${driver.name.toLowerCase().replaceAll(" ", "-")}-profile.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const callDriver = () => {
    window.location.href = `tel:${driver.phone.replaceAll(" ", "")}`;
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      {/* Top bar */}
      <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="relative w-full sm:w-72">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 text-muted-foreground" />
          <Input
            placeholder="Search transport history"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="h-9 pl-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-md"
            onClick={exportProfile}
          >
            <Download /> Export profile
          </Button>
          <Button
            variant="outline"
            className="gap-2 rounded-md"
            onClick={() => router.push(`/d/communications?driver=${driver.id}`)}
          >
            <MessageSquare /> Message
          </Button>
          <Button
            className="gap-2 rounded-md"
            onClick={() => router.push("/d/drivers")}
          >
            All drivers
          </Button>
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <button
          type="button"
          onClick={() => router.push("/d/drivers")}
          className="flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-base-content"
        >
          <ChevronLeft /> Back
        </button>

        {/* Profile + Calendar row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                  <Avatar className="size-24 flex-shrink-0 border">
                    <AvatarImage src={driver.avatar} alt={driver.name} />
                    <AvatarFallback className="text-xl font-semibold">
                      {getInitials(driver.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 space-y-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h1 className="font-bold text-2xl">{driver.name}</h1>
                          <Badge
                            variant={
                              driver.status === "Available"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {driver.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {driver.rating.toFixed(1)}
                          </span>
                          <StarRating rating={driver.rating} />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-md"
                          onClick={() =>
                            router.push(`/d/communications?driver=${driver.id}`)
                          }
                        >
                          <MessageSquare /> Message
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-md"
                          onClick={callDriver}
                        >
                          <Phone /> Call
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">
                          Email
                        </p>
                        <p className="break-all font-medium text-sm">
                          {driver.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">
                          Telephone
                        </p>
                        <p className="font-medium text-sm">{driver.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">
                          Company
                        </p>
                        <p className="font-medium text-sm">{driver.company}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">
                          Created on
                        </p>
                        <p className="font-medium text-sm">
                          {new Intl.DateTimeFormat("en", {
                            dateStyle: "medium",
                          }).format(new Date(driver.createdOn))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard
                icon={<Users />}
                value={driver.clientsReached.toString()}
                label="Clients reached"
                sub={`${driver.trips} completed trips`}
              />
              <StatCard
                icon={<AlertCircle />}
                value={driver.reports.toString()}
                label="Client reports"
                sub={
                  driver.reports === 0 ? "No active reports" : "Needs review"
                }
              />
              <StatCard
                icon={<MapPin />}
                value={`${new Intl.NumberFormat("en").format(driver.distanceKm)} km`}
                label="Distance travelled"
                sub={`${driver.company} fleet record`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays />
              <h2 className="font-semibold text-sm">Driver bookings</h2>
            </div>
            <BookingsCalendar activeDays={activeDays} />
          </div>
        </div>

        {/* Transport history */}
        <div>
          <h2 className="mb-3 font-semibold text-base">Transport history</h2>

          <Card className="overflow-hidden py-0 shadow-sm">
            <div className="overflow-x-auto">
              <Table className="min-w-[980px]">
                <TableHeader>
                  <TableRow className="bg-base-content hover:bg-base-content">
                    {[
                      "Client names",
                      "Date & Time",
                      "Pickup",
                      "Destination",
                      "Payment",
                      "Receipt",
                      "Status",
                      "Details",
                    ].map((heading) => (
                      <TableHead
                        key={heading}
                        className="py-3 font-semibold text-base-100 text-xs"
                      >
                        {heading}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageLogs.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7 border">
                            <AvatarFallback className="text-xs">
                              {getInitials(booking.client)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="whitespace-nowrap font-medium text-xs">
                            {booking.client}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {formatDate(booking.dateTime)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {booking.pickup}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {booking.destination}
                      </TableCell>
                      <TableCell className="font-bold text-xs">
                        {formatCurrency(booking.payment)}
                      </TableCell>
                      <TableCell className="text-xs">
                        {booking.receipt}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "Completed"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {pageLogs.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No transport history matches your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground text-xs">
              Page <strong className="text-base-content">{page}</strong> of{" "}
              {totalPages}
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                <ChevronLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === page ? "default" : "outline"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ),
              )}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={Boolean(selectedBooking)}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Transport details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 text-sm">
              <div className="rounded-lg bg-base-200 p-4">
                <p className="text-muted-foreground text-xs">Receipt</p>
                <p className="font-semibold text-lg">
                  {selectedBooking.receipt}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-xs">Client</p>
                  <p className="font-medium">{selectedBooking.client}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="font-medium">{selectedBooking.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date & Time</p>
                  <p className="font-medium">
                    {formatDate(selectedBooking.dateTime)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Payment</p>
                  <p className="font-medium">
                    {formatCurrency(selectedBooking.payment)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Pickup</p>
                <p className="font-medium">{selectedBooking.pickup}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Destination</p>
                <p className="font-medium">{selectedBooking.destination}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
