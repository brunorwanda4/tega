"use client";

import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Download, ChevronDown,
  Search, ExternalLink, MessageSquare, Phone, MapPin,
  Users, AlertCircle, Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Booking {
  id: number;
  client: string;
  dateTime: string;
  pickup: string;
  destination: string;
  payment: string;
  receipt: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const ALL_BOOKINGS: Booking[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  client: i === 0 ? "Andy Melvin" : "John Nathanael Donath",
  dateTime: "04-11-2024, 14:00",
  pickup: "Kigali International Airport",
  destination: "Mariot Hotel Kigali",
  payment: "3000 FRW",
  receipt: `#3453${i + 1}`,
}));

const PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(ALL_BOOKINGS.length / PER_PAGE);

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200"}`}
        />
      ))}
    </div>
  );
}

// ── Mini Calendar ─────────────────────────────────────────────────────────────
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { return (new Date(y, m, 1).getDay() + 6) % 7; }

function MiniCalendar() {
  const today = new Date();
  const [cur, setCur] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [sel, setSel] = useState<number[]>([11, 12, 14, 21]);

  const { y, m } = cur;
  const dim = getDaysInMonth(y, m);
  const fd = getFirstDay(y, m);

  const cells: (number | null)[] = [...Array(fd).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const getWeekNum = (ri: number) => {
    const first = new Date(y, 0, 1);
    const mon = new Date(first); mon.setDate(first.getDate() + ((8 - first.getDay()) % 7));
    const d = new Date(y, m, (rows[ri].find(Boolean) as number) || 1);
    return Math.max(1, Math.ceil((d.getTime() - mon.getTime()) / (7 * 86400000)) + 1);
  };

  const isToday = (d: number | null) => d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
  const isSelected = (d: number | null) => d !== null && sel.includes(d);
  const isWeekend = (ci: number) => ci >= 5;

  const toggle = (d: number | null) => {
    if (!d) return;
    setSel(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCur(({ y, m }) => m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 })}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold">{MONTHS[m]}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCur(({ y, m }) => m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 })}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="w-5 pb-2 text-zinc-400 font-normal" />
            {DAYS.map((d, i) => (
              <th key={d} className={`pb-2 text-center font-medium ${isWeekend(i) ? "text-black" : "text-zinc-500"}`}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              <td className="text-zinc-400 text-center pr-1 text-[10px]">{getWeekNum(ri)}</td>
              {row.map((d, ci) => (
                <td key={ci} className="text-center p-0.5">
                  {d ? (
                    <button
                      onClick={() => toggle(d)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors font-normal
                        ${isToday(d) && !isSelected(d) ? "bg-black text-white font-semibold" :
                          isSelected(d) ? "bg-black text-white font-semibold" :
                          isWeekend(ci) ? "text-black hover:bg-zinc-100" :
                          "text-zinc-700 hover:bg-zinc-100"}`}
                    >
                      {d}
                    </button>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, sub, subColor = "text-emerald-600" }: {
  icon: React.ReactNode; value: string; label: string; sub: string; subColor?: string;
}) {
  return (
    <Card className="border border-zinc-200 shadow-none flex-1">
      <CardContent className="p-4 flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-zinc-400">{icon}</div>
          <div>
            <p className="text-xl font-bold text-black leading-tight">{value}</p>
            <p className="text-[11px] text-zinc-500">{label}</p>
            <p className={`text-[10px] font-medium mt-0.5 ${subColor}`}>{sub}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DriverProfilePage() {
  const [page, setPage] = useState(1);
  const pageLogs = ALL_BOOKINGS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <div className="border-b border-zinc-100 px-6 py-3 flex items-center justify-between">
        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <Input placeholder="Search a driver" className="pl-9 h-9 text-sm border-zinc-200 bg-zinc-50 focus-visible:ring-0" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-sm border-zinc-300 gap-2">
            <Download className="h-4 w-4" /> Export CV
          </Button>
          <Button className="h-9 text-sm bg-black hover:bg-zinc-800 text-white gap-1">
            All drivers <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

        {/* Back */}
        <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        {/* Profile + Calendar row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* Profile card */}
          <div className="space-y-5">
            {/* Driver info */}
            <div className="flex gap-5 items-start">
              <Avatar className="h-20 w-20 border-2 border-zinc-100 flex-shrink-0">
                <AvatarImage src="/driver.jpg" alt="Victor Hugo" />
                <AvatarFallback className="bg-zinc-200 text-zinc-600 text-xl font-semibold">VH</AvatarFallback>
              </Avatar>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {/* Name + actions */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-black">Victor Hugo</h1>
                    <button className="text-zinc-400 hover:text-black transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="text-zinc-400 hover:text-black transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-black">3.0</span>
                    <StarRating rating={3} />
                  </div>
                  <div className="mt-3 space-y-0.5">
                    <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wide">Email</p>
                    <p className="text-sm text-zinc-700">alexparker@gmail.com</p>
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wide">Telephone</p>
                    <p className="text-sm text-zinc-700">(+250)789-324-56-34</p>
                  </div>
                </div>

                {/* Company + created */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wide">Company</p>
                    <p className="text-sm text-zinc-800 font-medium">Move Volkswagen</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wide">Created on</p>
                    <p className="text-sm text-zinc-800">22-07-2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-3">
              <StatCard
                icon={<Users className="h-4 w-4" />}
                value="34"
                label="Clients reached"
                sub="↑ 2.5% increase"
              />
              <StatCard
                icon={<AlertCircle className="h-4 w-4" />}
                value="2"
                label="Client reports"
                sub="last updated 23/07/2021"
                subColor="text-zinc-400"
              />
              <StatCard
                icon={<MapPin className="h-4 w-4" />}
                value="15,000 km"
                label="Total distances travelled"
                sub="↑ 8% increase"
              />
            </div>
          </div>

          {/* Calendar */}
          <Card className="border border-zinc-200 shadow-sm">
            <CardContent className="p-4">
              <h2 className="text-sm font-semibold mb-3 text-center">Driver&apos;s bookings</h2>
              <MiniCalendar />
            </CardContent>
          </Card>
        </div>

        {/* Transport history */}
        <div>
          <h2 className="text-base font-semibold mb-3">Transport history</h2>

          <Card className="border border-zinc-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black">
                  {["Client names","Date & Time","Pickup","Destination","Payment","Receipt","Details"].map((h) => (
                    <TableHead key={h} className="text-white text-xs font-semibold py-3">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageLogs.map((b) => (
                  <TableRow key={b.id} className="hover:bg-zinc-50 border-zinc-100">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border border-zinc-200">
                          <AvatarFallback className="bg-zinc-100 text-zinc-600 text-xs font-medium">
                            {b.client.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-black whitespace-nowrap">{b.client}</span>
                        <ExternalLink className="h-3 w-3 text-zinc-400 flex-shrink-0" />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-600 whitespace-nowrap">{b.dateTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-zinc-600 whitespace-nowrap">
                        {b.pickup}
                        <ExternalLink className="h-3 w-3 text-zinc-400 flex-shrink-0" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-zinc-600 whitespace-nowrap">
                        {b.destination}
                        <ExternalLink className="h-3 w-3 text-zinc-400 flex-shrink-0" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-black">{b.payment}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-zinc-600">
                        {b.receipt}
                        <ExternalLink className="h-3 w-3 text-zinc-400" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-7 text-xs border-zinc-300 px-3 rounded-full hover:bg-zinc-50">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-zinc-500">
              Page <strong className="text-black">{page}</strong> of {TOTAL_PAGES}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline" size="icon"
                className="h-7 w-7 border-zinc-300 rounded-full"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              {Array.from({ length: Math.min(TOTAL_PAGES, 5) }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="icon"
                  className={`h-7 w-7 text-xs rounded-full ${
                    p === page
                      ? "bg-black text-white border-black hover:bg-zinc-800"
                      : "border-zinc-300 text-zinc-600 hover:bg-zinc-100"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline" size="icon"
                className="h-7 w-7 border-zinc-300 rounded-full"
                disabled={page === TOTAL_PAGES}
                onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
