"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  FiMessageSquare,
  FiPhone,
  FiSearch,
  FiUserCheck,
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projectContacts } from "@/data/contacts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DriverStatus = "Available" | "Busy";
type DriverFilter = "all" | DriverStatus;

type Driver = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  rating: number;
  trips: number;
  status: DriverStatus;
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
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const DriversPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverFilter>("all");

  const filteredDrivers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return drivers.filter((driver) => {
      const matchesStatus =
        statusFilter === "all" || driver.status === statusFilter;
      const matchesSearch =
        !query ||
        [
          driver.name,
          driver.email,
          driver.phone,
          driver.company,
          driver.status,
          `${driver.rating}`,
          `${driver.trips}`,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replaceAll(" ", "")}`;
  };

  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <FiSearch className="-translate-y-1/2 absolute top-1/2 left-3 text-base-content/50" />
          <Input
            placeholder="Search by name, company, phone..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border-base-300 bg-base-100 pl-10 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as DriverFilter)}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Filter drivers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All drivers</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Busy">Busy</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-center gap-2 rounded-md bg-base-content px-4 py-2 text-base-100 text-sm">
            <FiUserCheck />
            {filteredDrivers.length} driver
            {filteredDrivers.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      {/* DRIVERS LIST */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="transition hover:shadow-md">
            <CardContent className="flex h-full flex-col gap-4 p-4">
              {/* TOP */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <Avatar size="lg">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${driver.id + 800}`}
                      alt={driver.name}
                    />
                    <AvatarFallback>{getInitials(driver.name)}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate font-medium">{driver.name}</p>
                    <p className="truncate text-muted-foreground text-xs">
                      {driver.email}
                    </p>
                    <p className="truncate text-muted-foreground text-xs">
                      {driver.phone}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    driver.status === "Available" ? "secondary" : "outline"
                  }
                >
                  {driver.status}
                </Badge>
              </div>

              {/* DETAILS */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Ratings</span>
                  <span className="font-medium">{driver.rating}/5</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Trips completed</span>
                  <span className="font-medium">{driver.trips}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Company name</span>
                  <span className="truncate font-medium">{driver.company}</span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-auto grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md"
                  onClick={() =>
                    router.push(`/d/communications?driver=${driver.id}`)
                  }
                >
                  <FiMessageSquare />
                  <span className="sr-only sm:not-sr-only">Message</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md"
                  onClick={() => handleCall(driver.phone)}
                >
                  <FiPhone />
                  <span className="sr-only sm:not-sr-only">Call</span>
                </Button>
                <Button
                  size="sm"
                  className="rounded-md"
                  onClick={() => router.push(`/d/drivers/${driver.id}`)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
            <p className="font-medium">No drivers found</p>
            <p className="text-muted-foreground text-sm">
              Try another search term or change the driver filter.
            </p>
            <Button
              variant="outline"
              className="mt-2 rounded-md"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
            >
              Reset filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DriversPage;
