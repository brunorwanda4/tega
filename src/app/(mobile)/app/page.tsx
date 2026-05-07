"use client";
import { MapPin, X } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ruraTariffApril2026 } from "@/data/locations";
import { cn } from "@/lib/utils";
import AppHeader from "./_components/app-header";
import { BookingCard } from "./_components/bookings/booking-card";

type BookingFilter = "upcoming" | "delayed" | "cancelled";
type Route = (typeof ruraTariffApril2026)[number]["destion"][number];

const CURRENT_LOCATION = "NYABUGOGO";
const MAX_SUGGESTIONS = 5;

const normalizeLocation = (value: string) =>
  value.trim().replace(/\s+/g, " ").toUpperCase();

const formatLocation = (value: string) =>
  value
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bVia\b/g, "via");

const buildUniqueStops = () => {
  const stops = new Set<string>();

  for (const routeGroup of ruraTariffApril2026) {
    for (const route of routeGroup.destion) {
      stops.add(normalizeLocation(route.from));
      stops.add(normalizeLocation(route.to));
    }
  }

  return Array.from(stops).sort((a, b) => a.localeCompare(b));
};

const getRoutesFrom = (startingPoint: string) =>
  ruraTariffApril2026.flatMap((routeGroup) =>
    routeGroup.destion.filter(
      (route) => normalizeLocation(route.from) === startingPoint,
    ),
  );

const getMatchingSuggestions = (options: string[], query: string) => {
  const normalizedQuery = normalizeLocation(query);

  if (!normalizedQuery) return [];

  return options
    .filter((option) => option.includes(normalizedQuery))
    .slice(0, MAX_SUGGESTIONS);
};

const bookingFilters: { label: string; value: BookingFilter }[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Delayed", value: "delayed" },
  { label: "Cancelled", value: "cancelled" },
];

const bookings = [
  {
    id: "booking-1",
    date: "Feb 24, 2024-10:00 AM",
    plateNumber: "RAC204B",
    agency: "Volcano",
    from: "Kigali city, Nyamirambo",
    to: "Muhanga, Southern province",
    status: "upcoming" as const,
  },
  {
    id: "booking-2",
    date: "Feb 24, 2024-09:10 AM",
    plateNumber: "RW892F",
    agency: "Horizon express",
    from: "Nyabugogo",
    to: "Kayonza",
    status: "delayed" as const,
  },
  {
    id: "booking-3",
    date: "Feb 22, 2024-08:30 AM",
    plateNumber: "RAE774K",
    agency: "Kivu belt",
    from: "Nyabugogo",
    to: "Rubavu",
    status: "cancelled" as const,
  },
];

const AppLication: NextPage = () => {
  const router = useRouter();
  const allStops = useMemo(() => buildUniqueStops(), []);

  const [activeFilter, setActiveFilter] = useState<BookingFilter>("upcoming");
  const [startingPoint, setStartingPoint] = useState("");
  const [selectedStartingPoint, setSelectedStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const filteredBookings = bookings.filter(
    (booking) => booking.status === activeFilter,
  );

  const destinationOptions = useMemo(() => {
    if (!selectedStartingPoint) return [];

    return Array.from(
      new Set(getRoutesFrom(selectedStartingPoint).map((route) => route.to)),
    ).sort((a, b) => a.localeCompare(b));
  }, [selectedStartingPoint]);

  const startingPointSuggestions = getMatchingSuggestions(
    allStops,
    startingPoint,
  );
  const destinationSuggestions = getMatchingSuggestions(
    destinationOptions.map((option) => normalizeLocation(option)),
    destination,
  );

  const handleStartingPointChange = (value: string) => {
    const normalizedValue = normalizeLocation(value);
    const exactMatch = allStops.find((stop) => stop === normalizedValue);

    setStartingPoint(value);
    setSelectedStartingPoint(exactMatch ?? "");
    setDestination("");
    setSelectedRoute(null);
  };

  const handleStartingPointSelect = (value: string) => {
    setStartingPoint(formatLocation(value));
    setSelectedStartingPoint(value);
    setDestination("");
    setSelectedRoute(null);
  };

  const handleDestinationChange = (value: string) => {
    const normalizedValue = normalizeLocation(value);
    const route = getRoutesFrom(selectedStartingPoint).find(
      (route) => normalizeLocation(route.to) === normalizedValue,
    );

    setDestination(value);
    setSelectedRoute(route ?? null);
  };

  const handleDestinationSelect = (value: string) => {
    const route = getRoutesFrom(selectedStartingPoint).find(
      (route) => normalizeLocation(route.to) === value,
    );

    setDestination(formatLocation(value));
    setSelectedRoute(route ?? null);
  };

  const handleCurrentLocation = () => {
    handleStartingPointSelect(CURRENT_LOCATION);
  };

  const handleBrowseDestinations = () => {
    if (selectedStartingPoint && selectedRoute) {
      router.push(
        `/app/bookings/available-buses?location=${encodeURIComponent(
          selectedRoute.from,
        )}&to=${encodeURIComponent(selectedRoute.to)}&amount=${encodeURIComponent(
          selectedRoute.amount,
        )}`,
      );
      return;
    }

    router.push("/app/bookings/browse");
  };

  return (
    <>
      <Head>
        <title>Tega | Bookings Overview</title>
      </Head>
      <AppHeader />
      <div className="flex flex-col relative pt-4">
        <main className="">
          <h2 className="text-[20px] font-semibold text-[#1F1F24] mb-[20px]">
            Bookings
          </h2>

          <div className="flex gap-2 mb-4">
            {bookingFilters.map((filter) => (
              <Button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-full h-[40px] px-[24px] text-[14px]",
                  activeFilter === filter.value
                    ? "bg-[#1F1F24] text-white hover:bg-[#1F1F24]/90"
                    : "bg-[#E5E7EB] text-[#555555] hover:bg-[#E5E7EB]/80",
                )}
                variant={
                  activeFilter === filter.value ? "default" : "secondary"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  date={booking.date}
                  plateNumber={booking.plateNumber}
                  agency={booking.agency}
                  from={booking.from}
                  to={booking.to}
                  status={booking.status}
                />
              ))
            ) : (
              <div className="rounded-[16px] bg-[#F9FAFB] py-12 text-center">
                <p className="text-[15px] font-medium text-[#6B7280]">
                  No {activeFilter} bookings
                </p>
              </div>
            )}
          </div>

          <section className="space-y-6 pt-4">
            <div>
              <label
                htmlFor="home-starting-point"
                className="block text-[16px] font-medium  mb-[12px]"
              >
                Starting point
              </label>
              <div className="flex gap-[12px] relative items-center">
                <div className="absolute top-[48px] -left-[16px] flex flex-col items-center">
                  <div className="w-[8px] h-[8px] bg-black"></div>{" "}
                  <div className="w-[1px] h-[36px] border-l-[2px] border-dashed border-[#CCCCCC] my-[6px]"></div>{" "}
                  <MapPin className="w-[16px] h-[16px] text-black" />{" "}
                </div>

                <div className="relative flex-grow">
                  <Input
                    id="home-starting-point"
                    type="text"
                    value={startingPoint}
                    onChange={(event) =>
                      handleStartingPointChange(event.target.value)
                    }
                    placeholder="Where are you traveling from ?"
                    className="placeholder:text-[#9CA3AF] pr-11"
                  />
                  {startingPoint && (
                    <button
                      type="button"
                      onClick={() => handleStartingPointChange("")}
                      className="absolute right-[16px] top-[14px] text-[#9CA3AF]"
                      aria-label="Clear starting point"
                    >
                      <X className="w-[20px] h-[20px]" />
                    </button>
                  )}
                  {startingPointSuggestions.length > 0 &&
                    normalizeLocation(startingPoint) !==
                      selectedStartingPoint && (
                      <div className="absolute left-0 right-0 top-[54px] z-20 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
                        {startingPointSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() =>
                              handleStartingPointSelect(suggestion)
                            }
                            className="block w-full px-4 py-3 text-left text-[14px] text-[#1F1F24] hover:bg-[#F9FAFB]"
                          >
                            {formatLocation(suggestion)}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
                <Button
                  type="button"
                  onClick={handleCurrentLocation}
                  className="w-[48px] h-[48px] rounded-[10px] bg-[#1F1F24] p-0 flex flex-col items-center justify-center shrink-0"
                >
                  <MapPin className="w-[20px] h-[20px] text-white" />
                  <span className="text-white text-[9px] mt-[1px]">
                    current
                  </span>
                </Button>
              </div>
            </div>

            <div className="">
              {" "}
              <label
                htmlFor="home-destination"
                className="block text-[16px] font-medium text-[#1F1F24] mb-[12px] "
              >
                Destination
              </label>
              <div className="relative flex-grow">
                <Input
                  id="home-destination"
                  type="text"
                  value={destination}
                  onChange={(event) =>
                    handleDestinationChange(event.target.value)
                  }
                  placeholder="Where are you going ?"
                  disabled={!selectedStartingPoint}
                  className=" placeholder:text-[#9CA3AF] pr-11 disabled:opacity-70"
                />
                {destination && (
                  <button
                    type="button"
                    onClick={() => handleDestinationChange("")}
                    className="absolute right-[16px] top-[14px] text-[#9CA3AF]"
                    aria-label="Clear destination"
                  >
                    <X className="w-[20px] h-[20px]" />
                  </button>
                )}
                {destinationSuggestions.length > 0 && !selectedRoute && (
                  <div className="absolute left-0 right-0 top-[54px] z-20 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
                    {destinationSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleDestinationSelect(suggestion)}
                        className="block w-full px-4 py-3 text-left text-[14px] text-[#1F1F24] hover:bg-[#F9FAFB]"
                      >
                        {formatLocation(suggestion)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              onClick={handleBrowseDestinations}
              className="w-full rounded-md"
            >
              Browse destinations
            </Button>
          </section>
        </main>
      </div>
    </>
  );
};

export default AppLication;
