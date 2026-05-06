"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Location, ruraTariffApril2026 } from "@/data/locations";
import { cn } from "@/lib/utils";
import AppGoBackButton from "../_components/common/go-back-button";

interface FlatRoute {
  id: string;
  code: string;
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
  status: "ontime" | "delayed";
  delayMinutes?: number;
}

interface AgencyOption {
  code: string;
  agency: string;
  buses: BusOption[];
}

type Step = "dial" | "route" | "agency" | "time" | "payment" | "success";

const USSD_CODE = "*786#";
const ROUTES_PER_PAGE = 6;

const BUS_OPTIONS: BusOption[] = [
  {
    id: 1,
    plateNumber: "RAC 892 F",
    agency: "Volcano Express",
    seats: 20,
    departureTime: "09:10 AM",
    status: "ontime",
  },
  {
    id: 2,
    plateNumber: "RAE 284 P",
    agency: "Volcano Express",
    seats: 12,
    departureTime: "11:30 AM",
    status: "ontime",
  },
  {
    id: 3,
    plateNumber: "RAD 341 B",
    agency: "Horizon Express",
    seats: 4,
    departureTime: "08:30 AM",
    status: "delayed",
    delayMinutes: 10,
  },
  {
    id: 4,
    plateNumber: "RAB 632 K",
    agency: "Horizon Express",
    seats: 16,
    departureTime: "02:00 PM",
    status: "ontime",
  },
  {
    id: 5,
    plateNumber: "RAF 217 C",
    agency: "Kivu Belt",
    seats: 15,
    departureTime: "07:45 AM",
    status: "ontime",
  },
  {
    id: 6,
    plateNumber: "RAG 503 D",
    agency: "Express Rwanda",
    seats: 8,
    departureTime: "10:00 AM",
    status: "delayed",
    delayMinutes: 25,
  },
  {
    id: 7,
    plateNumber: "RAH 774 E",
    agency: "Swift Transport",
    seats: 12,
    departureTime: "06:20 AM",
    status: "ontime",
  },
  {
    id: 8,
    plateNumber: "RAJ 105 Q",
    agency: "Swift Transport",
    seats: 18,
    departureTime: "04:15 PM",
    status: "ontime",
  },
];

const KEYPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

function flattenLocations(data: Location[]): FlatRoute[] {
  return data.flatMap((loc) =>
    loc.destion.map((destination) => ({
      id: destination.code,
      code: destination.code,
      location: loc.location,
      from: destination.from,
      to: destination.to,
      amount: destination.amount,
    })),
  );
}

function getAgencyOptions(): AgencyOption[] {
  const agencies = Array.from(new Set(BUS_OPTIONS.map((bus) => bus.agency)));

  return agencies.map((agency, index) => ({
    code: String(index + 1),
    agency,
    buses: BUS_OPTIONS.filter((bus) => bus.agency === agency).sort(
      compareDepartureTime,
    ),
  }));
}

function compareDepartureTime(a: BusOption, b: BusOption) {
  return timeValue(a.departureTime) - timeValue(b.departureTime);
}

function timeValue(time: string) {
  return new Date(`2000-01-01 ${time}`).getTime();
}

function fareValue(amount: string) {
  return Number.parseInt(amount.replace(/\D/g, ""), 10) || 0;
}

function formatFare(amount: string) {
  return `${fareValue(amount).toLocaleString()} RWF`;
}

function shortText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}.`;
}

function routeLabel(route: FlatRoute) {
  return `${route.from} - ${route.to}`;
}

function normalizeCode(value: string) {
  const numeric = Number.parseInt(value, 10);
  return Number.isNaN(numeric) ? "" : String(numeric);
}

function buildBookingRef(route: FlatRoute, bus: BusOption) {
  const routeCode = route.code.padStart(3, "0");
  const busCode = String(bus.id).padStart(2, "0");
  const timeCode = Date.now().toString().slice(-4);

  return `TG${routeCode}${busCode}${timeCode}`;
}

function buildStepLabel(step: Step) {
  if (step === "route") return "Step 1/4";
  if (step === "agency") return "Step 2/4";
  if (step === "time") return "Step 3/4";
  if (step === "payment") return "Step 4/4";
  if (step === "success") return "Done";
  return "Dial";
}

function UssdScreen({
  lines,
  input,
  error,
  step,
  disabled,
  onInputChange,
}: {
  lines: string[];
  input: string;
  error: string;
  step: Step;
  disabled?: boolean;
  onInputChange: (value: string) => void;
}) {
  return (
    <div className="flex h-[360px] flex-col gap-3 rounded-lg border border-base-300 bg-base-100 p-3 text-base-content shadow-inner">
      <div className="flex items-center justify-between border-b border-base-300 pb-2 font-mono text-[11px] font-semibold uppercase">
        <span>TEGA</span>
        <span>{buildStepLabel(step)}</span>
      </div>

      <pre className="min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words font-mono text-[12px] leading-5">
        {lines.join("\n")}
      </pre>

      {error ? (
        <p className="rounded-md bg-destructive/10 px-2 py-1 font-mono text-[11px] text-destructive">
          {error}
        </p>
      ) : null}

      <Input
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        disabled={disabled}
        inputMode={step === "dial" ? "text" : "numeric"}
        aria-label="USSD input"
        className="h-10 rounded-md border-base-300 bg-base-200 px-3 font-mono text-[15px] tracking-wider"
      />
    </div>
  );
}

function PhoneKeypad({
  step,
  onPress,
}: {
  step: Step;
  onPress: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {KEYPAD.map((key) => {
        const disabled = step !== "dial" && (key === "*" || key === "#");

        return (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onPress(key)}
            className={cn(
              "h-11 rounded-lg border border-base-300 bg-base-100 font-mono text-[16px] font-bold text-base-content shadow-sm transition active:translate-y-px disabled:opacity-30",
              key === "0" && "text-primary",
            )}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default function SSDOffline() {
  const routes = useMemo(() => flattenLocations(ruraTariffApril2026), []);
  const agencies = useMemo(() => getAgencyOptions(), []);

  const [step, setStep] = useState<Step>("dial");
  const [input, setInput] = useState(USSD_CODE);
  const [error, setError] = useState("");
  const [routePage, setRoutePage] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState<FlatRoute | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<AgencyOption | null>(
    null,
  );
  const [selectedBus, setSelectedBus] = useState<BusOption | null>(null);
  const [bookingRef, setBookingRef] = useState("");

  const routePageCount = Math.ceil(routes.length / ROUTES_PER_PAGE);
  const routeStart = routePage * ROUTES_PER_PAGE;
  const visibleRoutes = routes.slice(routeStart, routeStart + ROUTES_PER_PAGE);

  const resetSession = () => {
    setStep("dial");
    setInput(USSD_CODE);
    setError("");
    setRoutePage(0);
    setSelectedRoute(null);
    setSelectedAgency(null);
    setSelectedBus(null);
    setBookingRef("");
  };

  const openRouteStep = () => {
    setStep("route");
    setInput("");
    setError("");
    setRoutePage(0);
    setSelectedRoute(null);
    setSelectedAgency(null);
    setSelectedBus(null);
    setBookingRef("");
  };

  const handleInputChange = (value: string) => {
    setError("");

    if (step === "dial") {
      setInput(value.replace(/[^0-9*#]/g, "").slice(0, 8));
      return;
    }

    setInput(value.replace(/\D/g, "").slice(0, step === "payment" ? 10 : 4));
  };

  const handleKeyPress = (key: string) => {
    if (step === "success") return;
    setError("");

    if (step !== "dial" && (key === "*" || key === "#")) return;

    setInput((current) => {
      const next = `${current}${key}`;
      if (step === "dial") return next.replace(/[^0-9*#]/g, "").slice(0, 8);
      return next.replace(/\D/g, "").slice(0, step === "payment" ? 10 : 4);
    });
  };

  const handleClear = () => {
    if (step === "success") {
      resetSession();
      return;
    }

    setInput((current) => current.slice(0, -1));
    setError("");
  };

  const handleCancel = () => {
    setError("");

    if (step === "dial") {
      setInput("");
      return;
    }

    if (step === "route") {
      if (routePage > 0) {
        setRoutePage((page) => page - 1);
        setInput("");
        return;
      }
      resetSession();
      return;
    }

    if (step === "agency") {
      setStep("route");
      setSelectedAgency(null);
      setInput("");
      return;
    }

    if (step === "time") {
      setStep("agency");
      setSelectedBus(null);
      setInput("");
      return;
    }

    if (step === "payment") {
      setStep("time");
      setInput("");
      return;
    }

    resetSession();
  };

  const handleDialSubmit = () => {
    if (input === USSD_CODE || input === "*786*" || input === "*786") {
      openRouteStep();
      return;
    }

    setError("Dial *786# to start.");
  };

  const handleRouteSubmit = () => {
    if (input === "00") {
      if (routePage < routePageCount - 1) {
        setRoutePage((page) => page + 1);
        setInput("");
        return;
      }

      setError("No more destinations.");
      return;
    }

    if (input === "0") {
      handleCancel();
      return;
    }

    const route = routes.find((item) => item.code === normalizeCode(input));

    if (!route) {
      setError("Invalid destination number.");
      return;
    }

    setSelectedRoute(route);
    setStep("agency");
    setInput("");
  };

  const handleAgencySubmit = () => {
    if (input === "0") {
      handleCancel();
      return;
    }

    const agency = agencies.find((item) => item.code === normalizeCode(input));

    if (!agency) {
      setError("Invalid agency number.");
      return;
    }

    setSelectedAgency(agency);
    setStep("time");
    setInput("");
  };

  const handleTimeSubmit = () => {
    if (input === "0") {
      handleCancel();
      return;
    }

    const buses = selectedAgency?.buses ?? [];
    const busIndex = Number.parseInt(input, 10) - 1;
    const bus = buses[busIndex];

    if (!bus) {
      setError("Invalid time number.");
      return;
    }

    setSelectedBus(bus);
    setStep("payment");
    setInput("");
  };

  const handlePaymentSubmit = () => {
    if (input === "0") {
      handleCancel();
      return;
    }

    if (!/^07[2389]\d{7}$/.test(input)) {
      setError("Enter valid MTN phone: 07XXXXXXXX.");
      return;
    }

    if (!selectedRoute || !selectedBus) return;

    setBookingRef(buildBookingRef(selectedRoute, selectedBus));
    setStep("success");
    setInput("");
  };

  const handleSubmit = () => {
    setError("");

    if (step === "dial") handleDialSubmit();
    if (step === "route") handleRouteSubmit();
    if (step === "agency") handleAgencySubmit();
    if (step === "time") handleTimeSubmit();
    if (step === "payment") handlePaymentSubmit();
    if (step === "success") resetSession();
  };

  const screenLines = (() => {
    if (step === "dial") {
      return [
        "TEGA USSD",
        "",
        "Enter service code",
        "",
        `${USSD_CODE}`,
        "",
        "Press Call to continue.",
      ];
    }

    if (step === "route") {
      return [
        "TEGA Transport",
        "Select destination",
        `Page ${routePage + 1}/${routePageCount}`,
        "",
        ...visibleRoutes.flatMap((route) => [
          `${route.code}. ${shortText(route.from, 11)}-${shortText(
            route.to,
            14,
          )}`,
          `   ${formatFare(route.amount)}`,
        ]),
        "",
        routePage < routePageCount - 1 ? "00. More" : "",
        routePage > 0 ? "0. Previous" : "0. Exit",
      ].filter(Boolean);
    }

    if (step === "agency" && selectedRoute) {
      return [
        "TEGA Transport",
        `Route ${selectedRoute.code}`,
        shortText(routeLabel(selectedRoute), 30),
        `Fare: ${formatFare(selectedRoute.amount)}`,
        "",
        "Select agency",
        ...agencies.map(
          (agency) =>
            `${agency.code}. ${agency.agency} (${agency.buses.length})`,
        ),
        "",
        "0. Back",
      ];
    }

    if (step === "time" && selectedRoute && selectedAgency) {
      return [
        "TEGA Transport",
        selectedAgency.agency,
        shortText(routeLabel(selectedRoute), 30),
        "",
        "Select time",
        ...selectedAgency.buses.flatMap((bus, index) => [
          `${index + 1}. ${bus.departureTime} ${bus.plateNumber}`,
          `   ${bus.seats} seats ${
            bus.status === "delayed" ? `delay ${bus.delayMinutes}m` : "on time"
          }`,
        ]),
        "",
        "0. Back",
      ];
    }

    if (step === "payment" && selectedRoute && selectedAgency && selectedBus) {
      return [
        "TEGA Transport",
        "Pay ticket",
        "",
        shortText(routeLabel(selectedRoute), 30),
        `Agency: ${selectedAgency.agency}`,
        `Time: ${selectedBus.departureTime}`,
        `Car: ${selectedBus.plateNumber}`,
        `Amount: ${formatFare(selectedRoute.amount)}`,
        "",
        "Enter MTN MoMo phone",
        "0. Back",
      ];
    }

    if (step === "success" && selectedRoute && selectedAgency && selectedBus) {
      return [
        "TEGA Transport",
        "Payment request sent.",
        "",
        `Ref: ${bookingRef}`,
        shortText(routeLabel(selectedRoute), 30),
        `${selectedAgency.agency}`,
        `${selectedBus.departureTime} ${selectedBus.plateNumber}`,
        `Paid: ${formatFare(selectedRoute.amount)}`,
        "",
        "Ticket reserved.",
        "Press OK for new booking.",
      ];
    }

    return ["Session ended."];
  })();

  return (
    <div className="-mx-6 flex min-h-screen flex-col bg-base-200 px-6 pb-8 text-base-content">
      <div className="flex items-center gap-3 py-4">
        <AppGoBackButton />
        <div className="min-w-0">
          <h1 className="text-[20px] font-semibold">USSD booking</h1>
          <p className="truncate text-[13px] text-base-content/60">
            Small phone flow with destination codes
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[330px] flex-1 flex-col rounded-[2rem] bg-neutral p-3 text-neutral-content shadow-xl">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-neutral-content/25" />

        <UssdScreen
          lines={screenLines}
          input={input}
          error={error}
          step={step}
          disabled={step === "success"}
          onInputChange={handleInputChange}
        />

        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-10 flex-1 rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content/15 hover:text-neutral-content"
            onClick={handleCancel}
          >
            {step === "route" && routePage > 0 ? "Prev" : "Cancel"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 flex-1 rounded-lg border-neutral-content/20 bg-neutral-content/10 text-neutral-content hover:bg-neutral-content/15 hover:text-neutral-content"
            onClick={handleClear}
          >
            {step === "success" ? "New" : "Clear"}
          </Button>
          <Button
            type="button"
            className="h-10 flex-1 rounded-lg bg-primary text-primary-content hover:bg-primary/90"
            onClick={handleSubmit}
          >
            {step === "dial" ? "Call" : step === "success" ? "OK" : "Send"}
          </Button>
        </div>

        <div className="mt-3">
          <PhoneKeypad step={step} onPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
}
