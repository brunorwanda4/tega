"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiChevronDown,
  FiMessageSquare,
  FiPhone,
  FiSearch,
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Driver = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  rating: number;
  status: "Available" | "Busy";
};

const drivers: Driver[] = [
  {
    id: 1,
    name: "Alex Parker",
    email: "alex@gmail.com",
    phone: "+250 784 45 343",
    company: "Volcano Express",
    rating: 5,
    status: "Available",
  },
  {
    id: 2,
    name: "Jean Claude",
    email: "jean@gmail.com",
    phone: "+250 788 123 456",
    company: "Kigali Transit",
    rating: 4,
    status: "Busy",
  },
  {
    id: 3,
    name: "Eric Mutoni",
    email: "eric@gmail.com",
    phone: "+250 789 654 321",
    company: "Rwanda Moves",
    rating: 5,
    status: "Available",
  },
  {
    id: 4,
    name: "Patrick Niyonsaba",
    email: "patrick@gmail.com",
    phone: "+250 783 222 111",
    company: "City Riders",
    rating: 3,
    status: "Available",
  },
];

const DriversPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredDrivers = drivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
          <Input
            placeholder="Search a driver"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-base-100 border-base-300 focus:ring-primary"
          />
        </div>

        <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-black px-4 py-2 text-white sm:w-auto">
          All drivers <FiChevronDown />
        </div>
      </div>

      {/* DRIVERS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver, i) => (
          <Card
            key={driver.id}
            onClick={() => router.push(`/d/drivers/${driver.id}`)}
            className="cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-4 space-y-3">
              {/* TOP */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <Avatar size="lg">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${i + 800}`}
                    />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate font-medium">{driver.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {driver.email}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {driver.phone}
                    </p>
                  </div>
                </div>

                {/* ICONS */}
                <div className="flex shrink-0 gap-2 text-lg">
                  <FiMessageSquare className="cursor-pointer" />
                  <FiPhone className="cursor-pointer" />
                </div>
              </div>

              {/* DETAILS */}
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ratings</span>
                  <span>{"⭐".repeat(driver.rating)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company name</span>
                  <span>{driver.company}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <Badge
                    className={
                      driver.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {driver.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriversPage;
