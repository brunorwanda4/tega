"use client";

import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Bus = {
  id: number;
  route: string;
  driver: string;
  avatar: string;
  passengers: { adults: number; infants: number };
  vehicle: string;
  from: string;
  to: string;
  status: string;
  time: string;
};

const buses: Bus[] = [
  {
    id: 1,
    route: "Kigali - Muhanga",
    driver: "Andy M",
    avatar: "/avatar.png",
    passengers: { adults: 30, infants: 10 },
    vehicle: "Toyota Hiace",
    from: "Muhanga bus park",
    to: "Nyabugogo bus park",
    status: "moving",
    time: "3 min ago",
  },
  {
    id: 2,
    route: "Muhanga - Cyakabiri",
    driver: "John Doe",
    avatar: "/avatar.png",
    passengers: { adults: 18, infants: 5 },
    vehicle: "Coaster",
    from: "Muhanga",
    to: "Cyakabiri",
    status: "moving",
    time: "just now",
  },
  {
    id: 3,
    route: "Kigali - Huye",
    driver: "Jane Doe",
    avatar: "/avatar.png",
    passengers: { adults: 25, infants: 8 },
    vehicle: "Toyota Bus",
    from: "Nyabugogo",
    to: "Huye",
    status: "parked",
    time: "12:47",
  },
];

const BusTrackingPage = () => {
  const [selectedBus, setSelectedBus] = useState<Bus>(buses[0]);

  return (
    <div className="flex gap-4 p-4 h-[calc(100vh-64px)]">
      {/* LEFT SIDE */}
      <div className="w-[320px] flex flex-col gap-3">
        <h2 className="text-lg font-semibold">All buses</h2>

        <Input placeholder="Search buses" />

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {buses.map((bus) => (
            <Card
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className={`cursor-pointer transition ${
                selectedBus.id === bus.id
                  ? "border-black bg-muted"
                  : "hover:bg-muted/50"
              }`}
            >
              <CardContent className="flex items-center gap-3 p-3">
                <Avatar>
                  <AvatarImage src={bus.avatar} />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="text-sm font-medium">{bus.route}</p>
                  <p className="text-xs text-muted-foreground">{bus.driver}</p>
                </div>

                <div className="text-right">
                  <Badge variant="secondary">{bus.status}</Badge>
                  <p className="text-xs text-muted-foreground">{bus.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col gap-4">
        {/* TOP SECTION */}
        <div className="grid grid-cols-3 gap-4">
          {/* DRIVER + ROUTE CARD */}
          <Card className="col-span-2">
            <CardContent className="p-4 flex justify-between">
              <div className="flex gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={selectedBus.avatar} />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-base">
                      {selectedBus.driver}
                    </p>
                    <p className="text-sm text-muted-foreground">Driver</p>
                  </div>

                  {/* ROUTE */}
                  <div className="text-sm space-y-1">
                    <p>📍 {selectedBus.from}</p>
                    <p>📍 {selectedBus.to}</p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 items-start">
                <MessageCircle className="cursor-pointer" />
                <Phone className="cursor-pointer" />
              </div>
            </CardContent>

            {/* EXTRA INFO */}
            <div className="grid grid-cols-3 border-t text-sm">
              <div className="p-3">
                <p className="text-muted-foreground">Passengers</p>
                <p>Adults: {selectedBus.passengers.adults}</p>
                <p>Infants: {selectedBus.passengers.infants}</p>
              </div>

              <div className="p-3 border-l">
                <p className="text-muted-foreground">Vehicle</p>
                <p>{selectedBus.vehicle}</p>
              </div>

              <div className="p-3 border-l">
                <p className="text-muted-foreground">Route</p>
                <p>{selectedBus.route}</p>
              </div>
            </div>
          </Card>

          {/* ACTIVITY */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded text-xs">
                Client raised a dispute: The car doesn't seem clean as expected
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MAP */}
        <Card className="flex-1">
          <CardContent className="p-0 h-full relative">
            <Image
              src="/map.png"
              alt="map"
              fill
              className="object-cover rounded-md"
            />

            {/* Fake dynamic route (changes slightly based on selected bus id) */}
            <div
              className={`absolute bg-black h-[3px] rounded
              ${
                selectedBus.id === 1
                  ? "top-[40%] left-[20%] w-[50%] rotate-12"
                  : selectedBus.id === 2
                    ? "top-[50%] left-[30%] w-[40%] -rotate-6"
                    : "top-[60%] left-[25%] w-[55%] rotate-3"
              }`}
            />

            {/* Start */}
            <div className="absolute top-[45%] left-[25%] w-4 h-4 bg-black rounded-full" />

            {/* End */}
            <div className="absolute bottom-[30%] right-[20%] w-5 h-5 bg-black rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusTrackingPage;
