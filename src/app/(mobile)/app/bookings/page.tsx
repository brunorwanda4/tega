"use client";
import { MapPin, X } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ruraTariffApril2026 } from "@/data/locations";
import AppHeader from "../_components/app-header";

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

const BookingsPage: NextPage = () => {
  const router = useRouter();
  const allStops = useMemo(() => buildUniqueStops(), []);

  const [startingPoint, setStartingPoint] = useState("");
  const [selectedStartingPoint, setSelectedStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

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
            <Button className=" rounded-full">Upcoming</Button>
            <Button
              className="bg-[#E5E7EB] text-[#555555] rounded-full h-[40px] px-[24px] text-[14px] hover:bg-[#E5E7EB]/80"
              variant="secondary"
            >
              Delayed
            </Button>
            <Button
              className="bg-[#E5E7EB] text-[#555555] rounded-full h-[40px] px-[24px] text-[14px] hover:bg-[#E5E7EB]/80"
              variant="secondary"
            >
              Cancelled
            </Button>
          </div>

          <Card className="bg-[#F9FAFB] border-none rounded-[16px] h-60 flex items-center justify-center mb-10">
            <CardContent>
              <p className="text-[#6B7280] text-[16px]">No current bookings</p>
            </CardContent>
          </Card>

          {/* 5. Destination Input Section */}
          <section className="space-y-6">
            {/* Starting Point Group */}
            <div>
              <label
                htmlFor="starting-point"
                className="block text-[16px] font-medium  mb-[12px]"
              >
                Starting point
              </label>
              <div className="flex gap-[12px] relative items-center">
                {/* Dashed line and icon assembly */}
                <div className="absolute top-[48px] -left-[16px] flex flex-col items-center">
                  <div className="w-[8px] h-[8px] bg-black"></div>{" "}
                  {/* Small Black Square */}
                  <div className="w-[1px] h-[36px] border-l-[2px] border-dashed border-[#CCCCCC] my-[6px]"></div>{" "}
                  {/* Dashed line */}
                  <MapPin className="w-[16px] h-[16px] text-black" />{" "}
                  {/* Map Pin Icon */}
                </div>

                <div className="relative flex-grow">
                  <Input
                    id="starting-point"
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
                {/* Current Location Button */}
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

            {/* Destination Input Group */}
            <div className="">
              {" "}
              {/* Match alignment relative to icons */}
              <label
                htmlFor="destination"
                className="block text-[16px] font-medium text-[#1F1F24] mb-[12px]"
              >
                Destination
              </label>
              <div className="relative flex-grow">
                <Input
                  id="destination"
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

            {/* Submit Button */}
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

export default BookingsPage;
