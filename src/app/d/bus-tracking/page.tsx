"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiMapPin,
  FiMessageSquare,
  FiNavigation,
  FiPhone,
  FiSearch,
} from "react-icons/fi";
import Map, { Layer, type MapRef, Marker, Source } from "react-map-gl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import "mapbox-gl/dist/mapbox-gl.css";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Replace with your actual Mapbox access token
const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN_HERE";

// Types for our data
type TripRoute = {
  pickupName: string;
  pickupTime: string;
  pickupCoords: [number, number]; // [lng, lat]
  destinationName: string;
  destinationTime: string;
  destinationCoords: [number, number]; // [lng, lat]
  // In a real app, this would be a full polyline path
  fullRouteCoords: [number, number][]; // [lng, lat][]
};

type Activity = {
  message: string;
  timestamp: string;
};

type BusData = {
  id: string;
  routeTitle: string;
  driverName: string;
  status: "moving" | "just now" | "pending" | "arrived";
  timeAgo: string;
  driverAvatar: string;
  trip: {
    driver: string;
    route: TripRoute;
    passengers: { adults: number; infants: number };
    vehicle: { makeModel: string; plate: string };
  };
  activity: Activity[];
};

// Mock Data
const MOCK_BUSES: BusData[] = [
  {
    id: "bus1",
    routeTitle: "Kigali - Muhanga",
    driverName: "Niyibizi Emmanuel",
    status: "moving",
    timeAgo: "3min ago",
    driverAvatar: "https://i.pravatar.cc/150?u=niyibizi",
    trip: {
      driver: "Niyibizi Emmanuel",
      route: {
        pickupName: "Muhanga bus park",
        pickupTime: "11:00 AM, 20/08/2024",
        pickupCoords: [29.7433, -2.0833], // Muhanga
        destinationName: "Nyabugogo bus park",
        destinationTime: "12:30 PM, 20/08/2024",
        destinationCoords: [30.043, -1.9422], // Nyabugogo
        fullRouteCoords: [
          [29.7433, -2.0833],
          [29.9, -2.0],
          [30.0, -1.95],
          [30.043, -1.9422],
        ], // Simplified path
      },
      passengers: { adults: 30, infants: 10 },
      vehicle: { makeModel: "Toyota", plate: "RAD203C" },
    },
    activity: [
      {
        message:
          "Client raised a dispute: The car doesn’t seem to be clean as expected",
        timestamp: "just now",
      },
    ],
  },
  {
    id: "bus2",
    routeTitle: "Muhanga - Cyakabiri",
    driverName: "John Due",
    status: "just now",
    timeAgo: "just now",
    driverAvatar: "https://i.pravatar.cc/150?u=john",
    trip: {
      driver: "John Due",
      route: {
        pickupName: "Cyakabiri station",
        pickupTime: "02:15 PM, 20/08/2024",
        pickupCoords: [29.75, -2.07],
        destinationName: "Muhanga bus park",
        destinationTime: "03:00 PM, 20/08/2024",
        destinationCoords: [29.7433, -2.0833],
        fullRouteCoords: [
          [29.75, -2.07],
          [29.7433, -2.0833],
        ],
      },
      passengers: { adults: 25, infants: 5 },
      vehicle: { makeModel: "Toyota Coaster", plate: "RAB111A" },
    },
    activity: [],
  },
  // Add other buses as per image
];

// Helper for status colors
const getStatusClasses = (status: BusData["status"]) => {
  switch (status) {
    case "moving":
      return "bg-primary text-primary-content";
    case "just now":
      return "bg-success text-success-content";
    case "pending":
      return "bg-warning text-warning-content";
    case "arrived":
      return "bg-info text-info-content";
    default:
      return "bg-base-300";
  }
};

const cn = (...inputs: (string | undefined)[]) => {
  return twMerge(clsx(inputs));
};

// --- Sub-components ---

const ActivityLog = ({ activity }: { activity: Activity[] }) => {
  if (activity.length === 0) return null;
  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm col-span-1 lg:col-span-2">
      <h2 className="text-xl font-bold mb-5">Activity</h2>
      <div className="space-y-4">
        {activity.map((act, i) => (
          <motion.div
            key={act.message}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 bg-base-200 p-4 rounded-xl"
          >
            <div className="p-3 bg-neutral text-neutral-content rounded-full">
              <FiBell />
            </div>
            <div className="flex-1 text-sm">{act.message}</div>
            <div className="text-xs text-base-content/60 font-medium whitespace-nowrap">
              {act.timestamp}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DriverInfo = ({ trip }: { trip: BusData["trip"] }) => {
  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${trip.driver}`} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{trip.driver}</h1>
            <p className="text-base-content/60 text-sm font-medium">Driver</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost border-base-300 btn-circle"
          >
            <FiMessageSquare />
          </button>
          <button
            type="button"
            className="btn btn-ghost border-base-300 btn-circle"
          >
            <FiPhone />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm font-medium">
        <div className="col-span-2 md:col-span-1">
          <p className="text-base-content/60 text-xs font-bold tracking-wide">
            Trip route
          </p>
          <div className="relative pl-6 py-2">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-base-content/20"></div>
            <div className="absolute left-[-4px] top-[14px] h-2 w-2 rounded-full border-2 border-primary bg-base-100"></div>
            <div className="absolute left-[-4px] bottom-[14px] h-2 w-2 rounded-full border-2 border-neutral bg-base-100"></div>
            <p className="font-bold">{trip.route.pickupName}</p>
            <p className="text-xs text-base-content/60">
              {trip.route.pickupTime}
            </p>
            <p className="font-bold mt-4">{trip.route.destinationName}</p>
            <p className="text-xs text-base-content/60">
              {trip.route.destinationTime}
            </p>
          </div>
        </div>

        <div>
          <p className="text-base-content/60 text-xs font-bold tracking-wide">
            Passengers
          </p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-2xl font-bold">{trip.passengers.adults}</p>
              <p className="text-xs text-base-content/60">Adults</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{trip.passengers.infants}</p>
              <p className="text-xs text-base-content/60">Infants</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-base-content/60 text-xs font-bold tracking-wide">
            Vehicle
          </p>
          <p className="font-bold text-base mt-2">{trip.vehicle.makeModel}</p>
          <p className="text-base-content/60 text-sm mt-0.5">
            {trip.vehicle.plate}
          </p>
        </div>
      </div>
    </div>
  );
};

const MapComponent = ({ tripRoute }: { tripRoute: TripRoute }) => {
  const mapRef = useRef<MapRef>(null);

  // Focus the map when the trip route changes
  useEffect(() => {
    if (mapRef.current && tripRoute) {
      // Find the center of the route
      const coords = tripRoute.pickupCoords;
      mapRef.current.flyTo({
        center: coords,
        zoom: 13,
        essential: true, // Animation prefered
      });
    }
  }, [tripRoute]);

  // Route GeoJSON
  const routeGeoJSON = useMemo<GeoJSON.FeatureCollection>(
    () => ({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: tripRoute.fullRouteCoords,
          },
        },
      ],
    }),
    [tripRoute],
  );

  return (
    <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm relative h-[400px] lg:h-auto col-span-1 lg:col-span-4 min-h-[400px]">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 30.0605, // near Kigali
          latitude: -1.9441,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Source for the route line */}
        <Source id="my-data" type="geojson" data={routeGeoJSON}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{
              "line-color": "rgba(128, 128, 128, 0.5)",
              "line-width": 3,
              "line-dasharray": [2, 1],
            }}
          />
        </Source>

        {/* Start (Pickup) Marker */}
        <Marker
          longitude={tripRoute.pickupCoords[0]}
          latitude={tripRoute.pickupCoords[1]}
          anchor="center"
        >
          <div className="relative">
            <div className="absolute bottom-[3px] left-[-3px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
            <div className="p-1 rounded-full border border-base-content/20 shadow-xl bg-white scale-75">
              <div className="p-1 rounded-full border border-primary bg-primary text-primary-content text-lg">
                <FiMapPin />
              </div>
            </div>
          </div>
        </Marker>

        {/* End (Destination) Marker */}
        <Marker
          longitude={tripRoute.destinationCoords[0]}
          latitude={tripRoute.destinationCoords[1]}
          anchor="center"
        >
          <div className="relative">
            <div className="absolute bottom-[3px] left-[-3px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
            <div className="p-1 rounded-full border border-base-content/20 shadow-xl bg-white scale-75">
              <div className="p-1 rounded-full border border-neutral bg-neutral text-neutral-content text-lg">
                <FiNavigation />
              </div>
            </div>
          </div>
        </Marker>
      </Map>
    </div>
  );
};

// --- Main Page ---

const BusTrackingPage = () => {
  const [selectedBusId, setSelectedBusId] = useState<string>(MOCK_BUSES[0].id);

  // Find the selected bus from our mock data
  const selectedBus = useMemo(() => {
    return MOCK_BUSES.find((bus) => bus.id === selectedBusId) || MOCK_BUSES[0];
  }, [selectedBusId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 bg-base-100 text-base-content min-h-screen"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm w-full lg:w-[320px] flex-shrink-0">
          <h1 className="text-xl font-bold mb-5">All buses</h1>
          <div className="relative mb-5">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <Input placeholder="Search buses" className="pl-10 bg-base-200" />
          </div>
          <div className="space-y-3">
            {MOCK_BUSES.map((bus) => (
              <motion.button
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
                className={cn(
                  "block w-full text-left p-4 rounded-xl border border-base-200 hover:border-primary/50",
                  "transition-all flex items-center gap-4",
                  selectedBusId === bus.id ? "bg-base-200" : "bg-base-100",
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={bus.driverAvatar} />
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-bold">{bus.routeTitle}</p>
                  <p className="text-xs text-base-content/70">
                    {bus.driverName}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`badge border-none ${getStatusClasses(bus.status)}`}
                  >
                    {bus.status}
                  </span>
                  <p className="text-xs text-primary/80 mt-1 font-medium">
                    {bus.timeAgo}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <AnimatePresence mode="wait">
            {/* These components are inside AnimatePresence so they fade out before the new data fades in */}
            <motion.div
              key={selectedBusId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:col-span-2 lg:col-span-2 space-y-6"
            >
              <DriverInfo trip={selectedBus.trip} />
              <ActivityLog activity={selectedBus.activity} />
            </motion.div>
          </AnimatePresence>

          <MapComponent tripRoute={selectedBus.trip.route} />
        </div>
      </div>
    </motion.div>
  );
};

export default BusTrackingPage;
