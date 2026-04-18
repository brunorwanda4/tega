"use client";

import { Clock, MapPin, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ruraTariffApril2026 } from "@/data/locations";
import AppGoBackButton from "../../_components/common/go-back-button";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Location {
  location: string;
  destion: {
    from: string;
    to: string;
    amount: string;
  }[];
}

interface FlatRoute {
  id: string;
  location: string;
  from: string;
  to: string;
  amount: string;
}

interface RecentSearch {
  id: string;
  from: string;
  to: string;
  location: string;
  amount: string;
  timestamp: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "pickup_recent_searches";
const MAX_RECENT = 5;

// ─── Helpers ─────────────────────────────────────────────────────────────────
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

function getRecent(): RecentSearch[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(route: FlatRoute) {
  const prev = getRecent().filter((r) => r.id !== route.id);
  const next: RecentSearch[] = [
    { ...route, timestamp: Date.now() },
    ...prev,
  ].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function removeRecent(id: string) {
  const next = getRecent().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function RouteCard({
  route,
  onClick,
  icon,
}: {
  route: FlatRoute | RecentSearch;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 px-1 py-4 border-b border-gray-100 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {icon ?? <MapPin className="w-5 h-5 text-gray-600" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-gray-900 truncate leading-snug">
          {route.from} <span className="text-gray-400 font-normal">→</span>{" "}
          {route.to}
        </p>
        <p className="text-[13px] text-gray-500 mt-0.5 truncate">
          {route.location}
        </p>
      </div>

      <div className="flex-shrink-0 text-right">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-[13px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
          {route.amount} RWF
        </span>
      </div>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1 mt-5 px-1">
      {children}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PickupLocation() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<RecentSearch[]>([]);
  const allRoutes = flattenLocations(ruraTariffApril2026 as Location[]);

  // Load recent from localStorage on mount (client-only)
  useEffect(() => {
    setRecent(getRecent());
  }, []);

  // Filter routes by query (location, from, to, amount)
  const filtered = query.trim()
    ? allRoutes.filter((r) => {
        const q = query.toLowerCase();
        return (
          r.location.toLowerCase().includes(q) ||
          r.from.toLowerCase().includes(q) ||
          r.to.toLowerCase().includes(q) ||
          r.amount.toLowerCase().includes(q)
        );
      })
    : allRoutes;

  // Group filtered routes by location
  const grouped = filtered.reduce<Record<string, FlatRoute[]>>((acc, r) => {
    if (!acc[r.location]) acc[r.location] = [];
    acc[r.location].push(r);
    return acc;
  }, {});

  const handleSelect = (route: FlatRoute) => {
    saveRecent(route);
    setRecent(getRecent());
    router.push(
      `/app/bookings/available-buses?location=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}&amount=${encodeURIComponent(route.amount)}`,
    );
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleRemoveRecent = (id: string) => {
    removeRecent(id);
    setRecent(getRecent());
  };

  const showRecent = !query.trim() && recent.length > 0;
  const isEmpty = filtered.length === 0 && query.trim().length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white pt-4 pb-3 px-4 border-b border-gray-100 space-y-4">
        <div className="flex items-center gap-3">
          <AppGoBackButton />
          <div>
            <h1 className="text-[19px] font-bold text-gray-900 leading-tight">
              Pickup location
            </h1>
            <p className="text-[12px] text-gray-400 leading-none mt-0.5">
              {allRoutes.length} routes available
            </p>
          </div>
        </div>

        {/* ── Search Bar ─────────────────────────────────── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location, route or fare…"
            className="pl-9 pr-9 h-11 bg-gray-50 border-gray-200 rounded-xl text-[15px] placeholder:text-gray-400 focus-visible:ring-emerald-500"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Scrollable Body ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* Recent searches */}
        {showRecent && (
          <section>
            <SectionLabel>Recent</SectionLabel>
            {recent.map((r) => (
              <div key={r.id} className="relative group">
                <RouteCard
                  route={r}
                  icon={<Clock className="w-4 h-4 text-gray-500" />}
                  onClick={() => handleSelect(r as FlatRoute)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRecent(r.id)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </section>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-[15px] font-semibold text-gray-700">
              No routes found
            </p>
            <p className="text-[13px] text-gray-400 mt-1">
              Try searching by town name or fare amount
            </p>
          </div>
        )}

        {/* Grouped route list */}
        {!isEmpty &&
          Object.entries(grouped).map(([locationName, routes]) => (
            <section key={locationName}>
              <SectionLabel>{locationName}</SectionLabel>
              {routes.map((r) => (
                <RouteCard
                  key={r.id}
                  route={r}
                  onClick={() => handleSelect(r)}
                />
              ))}
            </section>
          ))}
      </div>
    </div>
  );
}
