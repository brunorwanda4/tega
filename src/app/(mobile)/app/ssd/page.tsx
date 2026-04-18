"use client";

import {
  ArrowRight,
  Bus,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Loader2,
  MapPin,
  Minus,
  Plus,
  Search,
  Smartphone,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ruraTariffApril2026 } from "@/data/locations";
import { cn } from "@/lib/utils";
import AppGoBackButton from "../_components/common/go-back-button";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Location {
  location: string;
  destion: { from: string; to: string; amount: string }[];
}

interface FlatRoute {
  id: string;
  location: string;
  from: string;
  to: string;
  amount: string;
}

interface BusOption {
  id: number;
  plateNumber: string;
  agency: string;
  seats: number;
  departureTime: string;
  color: string;
  status: "ontime" | "delayed";
  delayMinutes?: number;
}

type Step = "route" | "buses" | "seats" | "payment" | "success";

// ─── Static bus data ──────────────────────────────────────────────────────────
const MOCK_BUSES: BusOption[] = [
  {
    id: 1,
    plateNumber: "RAC 892 F",
    agency: "Volcano Express",
    seats: 20,
    departureTime: "09:10 AM",
    color: "bg-green-500",
    status: "ontime",
  },
  {
    id: 2,
    plateNumber: "RAD 341 B",
    agency: "Horizon Express",
    seats: 4,
    departureTime: "08:30 AM",
    color: "bg-red-500",
    status: "delayed",
    delayMinutes: 10,
  },
  {
    id: 3,
    plateNumber: "RAF 217 C",
    agency: "Kivu Belt",
    seats: 15,
    departureTime: "07:45 AM",
    color: "bg-yellow-500",
    status: "ontime",
  },
  {
    id: 4,
    plateNumber: "RAG 503 D",
    agency: "Express Rwanda",
    seats: 8,
    departureTime: "10:00 AM",
    color: "bg-green-500",
    status: "delayed",
    delayMinutes: 25,
  },
  {
    id: 5,
    plateNumber: "RAH 774 E",
    agency: "Swift Transport",
    seats: 12,
    departureTime: "11:30 AM",
    color: "bg-yellow-500",
    status: "ontime",
  },
];

// ─── Search helpers (reused from PickupLocation) ──────────────────────────────
function flattenLocations(data: Location[]): FlatRoute[] {
  return data.flatMap((loc) =>
    loc.destion.map((d, i) => ({
      id: `${loc.location}-${i}`,
      location: loc.location,
      from: d.from,
      to: d.to,
      amount: d.amount,
    })),
  );
}

function searchRoutes(routes: FlatRoute[], raw: string): FlatRoute[] {
  const q = raw.trim().toLowerCase();
  if (!q) return routes;

  const sepMatch = q.match(/^(.+?)\s*(?:\bto\b|[-→>/])\s*(.+)$/i);
  if (sepMatch) {
    const [, left, right] = sepMatch;
    return routes
      .filter(
        (r) =>
          (r.from.toLowerCase().includes(left) &&
            r.to.toLowerCase().includes(right)) ||
          (r.from.toLowerCase().includes(right) &&
            r.to.toLowerCase().includes(left)) ||
          r.from.toLowerCase().includes(left) ||
          r.to.toLowerCase().includes(right),
      )
      .sort((a) =>
        a.from.toLowerCase().includes(left) &&
        a.to.toLowerCase().includes(right)
          ? -1
          : 1,
      );
  }

  return routes.filter(
    (r) =>
      r.from.toLowerCase().includes(q) ||
      r.to.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.amount.toLowerCase().includes(q),
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
const STEPS: { key: Step; label: string }[] = [
  { key: "route", label: "Route" },
  { key: "buses", label: "Buses" },
  { key: "seats", label: "Seats" },
  { key: "payment", label: "Pay" },
];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  if (current === "success") return null;
  return (
    <div className="flex items-center gap-0 px-4 py-3 bg-white border-b border-gray-100">
      {STEPS.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-all",
                  done && "bg-emerald-500 text-white",
                  active && "bg-gray-900 text-white ring-4 ring-gray-900/10",
                  !done && !active && "bg-gray-100 text-gray-400",
                )}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  active ? "text-gray-900" : "text-gray-400",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-1 mb-4",
                  i < idx ? "bg-emerald-400" : "bg-gray-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Route selector ───────────────────────────────────────────────────
function RouteStep({ onSelect }: { onSelect: (r: FlatRoute) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const allRoutes = flattenLocations(ruraTariffApril2026 as Location[]);
  const results = searchRoutes(allRoutes, query);

  const grouped = results.reduce<Record<string, FlatRoute[]>>((acc, r) => {
    if (!acc[r.location]) acc[r.location] = [];
    acc[r.location].push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div>
          <p className="text-[17px] font-bold text-gray-900">
            Where are you going?
          </p>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Select your departure → destination
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "Nyabungogo to Muhanga"'
            className="pl-9 pr-9 h-11 bg-gray-50 border-gray-200 rounded-xl text-[15px]"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {query && (
          <p className="text-[12px] text-gray-400 px-1">
            {results.length} route{results.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {Object.entries(grouped).map(([zone, routes]) => (
          <div key={zone}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mt-4 mb-1">
              {zone}
            </p>
            {routes.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelect(r)}
                className="w-full flex items-center gap-3 py-3.5 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-900">
                    {r.from}{" "}
                    <span className="text-gray-400 font-normal">→</span> {r.to}
                  </p>
                </div>
                <span className="text-[13px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                  {r.amount} RWF
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Available buses ──────────────────────────────────────────────────
function BusesStep({
  route,
  onSelect,
}: {
  route: FlatRoute;
  onSelect: (bus: BusOption) => void;
}) {
  const sorted = [...MOCK_BUSES].sort((a, b) => {
    const tA = new Date(`2000-01-01 ${a.departureTime}`).getTime();
    const tB = new Date(`2000-01-01 ${b.departureTime}`).getTime();
    return tA - tB;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Route summary */}
      <div className="mx-4 mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-2 border border-gray-100">
        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
        <p className="text-[14px] font-semibold text-gray-800 truncate">
          {route.from} <span className="text-gray-400 font-normal">→</span>{" "}
          {route.to}
        </p>
        <span className="ml-auto text-[13px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
          {route.amount} RWF
        </span>
      </div>

      <p className="text-[13px] text-gray-400 px-4 mt-3 mb-2">
        {sorted.length} buses available · tap to select
      </p>

      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">
        {sorted.map((bus) => (
          <button
            key={bus.id}
            type="button"
            onClick={() => onSelect(bus)}
            className="w-full text-left"
          >
            <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md active:bg-gray-50 transition-all">
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-bold text-gray-900">
                    {bus.agency}
                  </p>
                  <p className="text-[12px] text-gray-400 font-mono">
                    {bus.plateNumber}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-[11px] font-bold px-2 py-0.5 rounded-full",
                    bus.status === "ontime"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600",
                  )}
                >
                  {bus.status === "ontime"
                    ? "On time"
                    : `Delayed ${bus.delayMinutes}min`}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 mb-3">
                <div className="text-center">
                  <p className="text-[15px] font-bold text-gray-900">
                    {bus.departureTime}
                  </p>
                  <p className="text-[10px] text-gray-400">Departure</p>
                </div>
                <div className="flex-1 flex items-center gap-1">
                  <Circle className="w-1.5 h-1.5 fill-gray-400 text-gray-400 shrink-0" />
                  <div className="flex-1 border-t-2 border-dashed border-gray-200 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full px-2 py-0.5 text-[9px] font-bold text-gray-500 whitespace-nowrap">
                      ~2h 15min
                    </span>
                  </div>
                  <Circle className="w-1.5 h-1.5 fill-gray-400 text-gray-400 shrink-0" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-bold text-gray-900">
                    {route.to}
                  </p>
                  <p className="text-[10px] text-gray-400">Arrival</p>
                </div>
              </div>

              {/* Seats bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", bus.color)}
                    style={{ width: `${(bus.seats / 30) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-500 shrink-0">
                  <span className="font-bold text-gray-800">{bus.seats}</span>
                  /30 seats
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 3: Seat & agency confirm ────────────────────────────────────────────
function SeatsStep({
  route,
  bus,
  seats,
  onSeatsChange,
  onConfirm,
}: {
  route: FlatRoute;
  bus: BusOption;
  seats: number;
  onSeatsChange: (n: number) => void;
  onConfirm: () => void;
}) {
  // Parse amount for multiplication (remove non-numeric)
  const unitAmount = parseInt(route.amount.replace(/\D/g, ""), 10) || 0;
  const total = unitAmount * seats;

  return (
    <div className="flex flex-col flex-1 px-4 py-4 overflow-y-auto">
      {/* Bus summary card */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Bus className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-gray-900">{bus.agency}</p>
            <p className="text-[12px] text-gray-400 font-mono">
              {bus.plateNumber}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[13px] font-semibold">
              {bus.departureTime}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-gray-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="font-medium text-gray-800">{route.from}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="font-medium text-gray-800">{route.to}</span>
        </div>
      </div>

      {/* Seat selector */}
      <p className="text-[16px] font-bold text-gray-900 mb-1">
        How many seats?
      </p>
      <p className="text-[13px] text-gray-400 mb-5">
        {bus.seats} seats available on this bus
      </p>

      <div className="flex items-center justify-center gap-8 mb-8">
        <button
          type="button"
          onClick={() => onSeatsChange(Math.max(1, seats - 1))}
          className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-400 active:bg-gray-100 transition-all"
        >
          <Minus className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-[48px] font-bold text-gray-900 leading-none">
            {seats}
          </span>
          <p className="text-[12px] text-gray-400 mt-1">
            seat{seats !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSeatsChange(Math.min(bus.seats, seats + 1))}
          className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 active:bg-gray-600 transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Price breakdown */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50">
          <span className="text-[13px] text-gray-500">Fare per seat</span>
          <span className="text-[13px] font-semibold text-gray-800">
            {route.amount}
          </span>
        </div>
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50">
          <span className="text-[13px] text-gray-500">Seats</span>
          <span className="text-[13px] font-semibold text-gray-800">
            × {seats}
          </span>
        </div>
        <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
          <span className="text-[14px] font-bold text-gray-900">Total</span>
          <span className="text-[16px] font-bold text-emerald-700">
            {total.toLocaleString()} RWF
          </span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full rounded-xl text-[15px] font-bold"
        onClick={onConfirm}
      >
        Continue to Payment
      </Button>
    </div>
  );
}

// ─── Step 4: MTN MoMo payment ─────────────────────────────────────────────────
type PayState = "idle" | "processing" | "confirming";

function PaymentStep({
  route,
  bus,
  seats,
  onSuccess,
}: {
  route: FlatRoute;
  bus: BusOption;
  seats: number;
  onSuccess: (ref: string) => void;
}) {
  const [phone, setPhone] = useState("07");
  const [payState, setPayState] = useState<PayState>("idle");
  const unitAmount = parseInt(route.amount.replace(/\D/g, ""), 10) || 0;
  const total = unitAmount * seats;

  const isPhoneValid = /^07[2389]\d{7}$/.test(phone);

  const handlePay = () => {
    if (!isPhoneValid) return;
    setPayState("processing");
    // Simulate MoMo push notification → user confirms on phone
    setTimeout(() => setPayState("confirming"), 2200);
    // Simulate auto-success after confirm screen
    setTimeout(() => {
      const ref = `BK${Date.now().toString().slice(-8)}`;
      onSuccess(ref);
    }, 6000);
  };

  return (
    <div className="flex flex-col flex-1 px-4 py-4 overflow-y-auto">
      {/* Order summary */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gray-900 text-white px-4 py-3 flex items-center gap-2">
          <Bus className="w-4 h-4 opacity-70" />
          <span className="text-[13px] font-semibold">
            {bus.agency} · {bus.plateNumber}
          </span>
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Route</span>
            <span className="font-semibold text-gray-800">
              {route.from} → {route.to}
            </span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Departure</span>
            <span className="font-semibold text-gray-800">
              {bus.departureTime}
            </span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Seats</span>
            <span className="font-semibold text-gray-800">{seats}</span>
          </div>
          <div className="flex justify-between text-[14px] pt-2 border-t border-gray-100">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-emerald-700">
              {total.toLocaleString()} RWF
            </span>
          </div>
        </div>
      </div>

      {/* MTN MoMo card */}
      <div className="rounded-2xl border-2 border-[#FFCC00] overflow-hidden mb-6 shadow-sm">
        {/* MTN header */}
        <div className="bg-[#FFCC00] px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-[#FFCC00]" />
          </div>
          <div>
            <p className="text-[14px] font-black text-black leading-tight">
              MTN Mobile Money
            </p>
            <p className="text-[11px] text-black/60 font-medium">MoMo Pay</p>
          </div>
          <span className="ml-auto text-[11px] font-bold text-black/50 bg-black/10 px-2 py-0.5 rounded-full">
            RWF
          </span>
        </div>

        <div className="bg-white px-4 py-4 space-y-4">
          <div>
            <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              MoMo Phone Number
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 h-11 flex items-center shrink-0">
                +250
              </span>
              <Input
                value={phone}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  if (v.length <= 10) setPhone(v);
                }}
                placeholder="0788 000 000"
                inputMode="tel"
                className="h-11 text-[15px] font-mono tracking-widest border-gray-200"
                disabled={payState !== "idle"}
              />
            </div>
            {phone.length >= 10 && !isPhoneValid && (
              <p className="text-[12px] text-red-500 mt-1">
                Enter a valid MTN number (072, 073, 078, 079)
              </p>
            )}
          </div>

          <div className="bg-[#FFCC00]/10 rounded-xl p-3 border border-[#FFCC00]/30">
            <p className="text-[12px] text-gray-500 mb-0.5">Amount to pay</p>
            <p className="text-[24px] font-black text-gray-900">
              {total.toLocaleString()}
              <span className="text-[14px] font-semibold text-gray-500 ml-1">
                RWF
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Pay button / states */}
      {payState === "idle" && (
        <Button
          size="lg"
          className={cn(
            "w-full rounded-xl text-[15px] font-bold transition-all",
            isPhoneValid
              ? "bg-[#FFCC00] hover:bg-[#f0c000] text-black"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          )}
          onClick={handlePay}
          disabled={!isPhoneValid}
        >
          Pay {total.toLocaleString()} RWF with MoMo
        </Button>
      )}

      {payState === "processing" && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-14 h-14 rounded-full bg-[#FFCC00]/20 border-2 border-[#FFCC00] flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-[#FFCC00] animate-spin" />
          </div>
          <p className="text-[15px] font-semibold text-gray-800">
            Sending request…
          </p>
          <p className="text-[13px] text-gray-400 text-center">
            A push notification is being sent to <br />
            <span className="font-mono font-bold text-gray-700">
              +250 {phone}
            </span>
          </p>
        </div>
      )}

      {payState === "confirming" && (
        <div className="rounded-2xl border-2 border-[#FFCC00] bg-[#FFCC00]/5 p-5 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#FFCC00] flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-black" />
          </div>
          <p className="text-[16px] font-bold text-gray-900 text-center">
            Check your phone!
          </p>
          <p className="text-[13px] text-gray-500 text-center leading-relaxed">
            MTN has sent a payment prompt to your phone.
            <br />
            Enter your <span className="font-bold text-gray-800">MoMo PIN</span>{" "}
            to confirm.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            <span className="text-[12px] text-gray-400">
              Waiting for confirmation…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 5: Success ──────────────────────────────────────────────────────────
function SuccessStep({
  route,
  bus,
  seats,
  ref: bookingRef,
}: {
  route: FlatRoute;
  bus: BusOption;
  seats: number;
  ref: string;
}) {
  const unitAmount = parseInt(route.amount.replace(/\D/g, ""), 10) || 0;
  const total = unitAmount * seats;

  return (
    <div className="flex flex-col items-center px-4 py-8 flex-1 overflow-y-auto">
      {/* Success icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2
            className="w-12 h-12 text-emerald-500"
            strokeWidth={1.5}
          />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center shadow">
          <Smartphone className="w-4 h-4 text-black" />
        </div>
      </div>

      <p className="text-[22px] font-black text-gray-900 text-center mb-1">
        Booking Confirmed!
      </p>
      <p className="text-[14px] text-gray-400 text-center mb-6">
        Your seats have been reserved. Safe journey!
      </p>

      {/* Ticket card */}
      <div className="w-full border border-gray-100 rounded-3xl overflow-hidden shadow-sm mb-6">
        {/* Ticket header */}
        <div className="bg-gray-900 text-white px-5 py-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                Booking ref
              </p>
              <p className="text-[18px] font-black font-mono tracking-widest text-[#FFCC00]">
                {bookingRef}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                Seats
              </p>
              <p className="text-[18px] font-black">{seats}</p>
            </div>
          </div>
        </div>

        {/* Dotted divider */}
        <div className="flex items-center">
          <div className="w-4 h-4 -ml-2 rounded-full bg-gray-50 border border-gray-100" />
          <div className="flex-1 border-t-2 border-dashed border-gray-200" />
          <div className="w-4 h-4 -mr-2 rounded-full bg-gray-50 border border-gray-100" />
        </div>

        {/* Ticket body */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <Circle className="w-2 h-2 fill-gray-400 shrink-0" />
            <div className="flex-1 border-t border-dashed border-gray-200" />
            <Circle className="w-2 h-2 fill-gray-400 shrink-0" />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[11px] text-gray-400">From</p>
              <p className="text-[15px] font-bold text-gray-900">
                {route.from}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 mt-4" />
            <div className="text-right">
              <p className="text-[11px] text-gray-400">To</p>
              <p className="text-[15px] font-bold text-gray-900">{route.to}</p>
            </div>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-50">
            <div>
              <p className="text-[11px] text-gray-400">Agency</p>
              <p className="text-[13px] font-semibold text-gray-800">
                {bus.agency}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-gray-400">Departure</p>
              <p className="text-[13px] font-semibold text-gray-800">
                {bus.departureTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400">Paid</p>
              <p className="text-[13px] font-bold text-emerald-700">
                {total.toLocaleString()} RWF
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[12px] text-gray-400 text-center leading-relaxed">
        A confirmation SMS has been sent to your MTN number.
        <br />
        Show this reference at the bus park.
      </p>
    </div>
  );
}

// ─── Root page ────────────────────────────────────────────────────────────────
export default function SSDOffline() {
  const [step, setStep] = useState<Step>("route");
  const [selectedRoute, setRoute] = useState<FlatRoute | null>(null);
  const [selectedBus, setBus] = useState<BusOption | null>(null);
  const [seats, setSeats] = useState(1);
  const [bookingRef, setBookingRef] = useState("");

  const handleRouteSelect = (r: FlatRoute) => {
    setRoute(r);
    setStep("buses");
  };

  const handleBusSelect = (b: BusOption) => {
    setBus(b);
    setStep("seats");
  };

  const handleSeatsConfirm = () => {
    setStep("payment");
  };

  const handlePaySuccess = (ref: string) => {
    setBookingRef(ref);
    setStep("success");
  };

  const handleBack = () => {
    if (step === "buses") {
      setStep("route");
      setRoute(null);
    }
    if (step === "seats") {
      setStep("buses");
      setBus(null);
    }
    if (step === "payment") {
      setStep("seats");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────── */}
      <div className="bg-primary text-primary-content -mx-6 px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          {step !== "success" && step !== "route" ? (
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          ) : (
            <AppGoBackButton />
          )}
          <div>
            <h1 className="text-[20px] font-semibold">Offline Booking</h1>
            <p className="text-[13px] opacity-70">
              {step === "route" && "Choose your route"}
              {step === "buses" &&
                `${selectedRoute?.from} → ${selectedRoute?.to}`}
              {step === "seats" && `${selectedBus?.agency}`}
              {step === "payment" && "MTN Mobile Money"}
              {step === "success" && "Booking complete"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Step bar ───────────────────────────────── */}
      <StepBar current={step} />

      {/* ── Step content ───────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {step === "route" && <RouteStep onSelect={handleRouteSelect} />}

        {step === "buses" && selectedRoute && (
          <BusesStep route={selectedRoute} onSelect={handleBusSelect} />
        )}

        {step === "seats" && selectedRoute && selectedBus && (
          <SeatsStep
            route={selectedRoute}
            bus={selectedBus}
            seats={seats}
            onSeatsChange={setSeats}
            onConfirm={handleSeatsConfirm}
          />
        )}

        {step === "payment" && selectedRoute && selectedBus && (
          <PaymentStep
            route={selectedRoute}
            bus={selectedBus}
            seats={seats}
            onSuccess={handlePaySuccess}
          />
        )}

        {step === "success" && selectedRoute && selectedBus && (
          <SuccessStep
            route={selectedRoute}
            bus={selectedBus}
            seats={seats}
            ref={bookingRef}
          />
        )}
      </div>
    </div>
  );
}
