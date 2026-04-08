"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Bus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

// ── Types ────────────────────────────────────────────────────────────────────
interface TravelLog {
  id: number;
  driver: { name: string; avatar?: string };
  dateTime: string;
  from: string;
  to: string;
}

// ── Sample data ──────────────────────────────────────────────────────────────
const ALL_LOGS: TravelLog[] = [
  { id: 1, driver: { name: "Alex Parker" }, dateTime: "04-11-2024, 14:00", from: "Muhanga bus park", to: "Kigali city, Nyabugogo" },
  { id: 2, driver: { name: "Sarah Uwera" }, dateTime: "04-11-2024, 09:30", from: "Kigali city, Nyabugogo", to: "Huye bus park" },
  { id: 3, driver: { name: "James Nkurunziza" }, dateTime: "04-11-2024, 07:15", from: "Rubavu, Gisenyi", to: "Kigali city, Nyabugogo" },
  { id: 4, driver: { name: "Marie Iradukunda" }, dateTime: "04-10-2024, 16:45", from: "Kigali city, Nyabugogo", to: "Musanze bus park" },
  { id: 5, driver: { name: "Emmanuel Habimana" }, dateTime: "04-10-2024, 11:00", from: "Muhanga bus park", to: "Huye bus park" },
  { id: 6, driver: { name: "Alice Mutesi" }, dateTime: "04-09-2024, 08:20", from: "Nyagatare bus park", to: "Kigali city, Nyabugogo" },
];

const LOGS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(ALL_LOGS.length / LOGS_PER_PAGE);

// ── Mini Calendar ─────────────────────────────────────────────────────────────
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun … 6=Sat → convert to Mon-based (0=Mon … 6=Sun)
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

function MiniCalendar() {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selected, setSelected] = useState(today.getDate());

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prev = () =>
    setCurrent(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
  const next = () =>
    setCurrent(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );

  // Build grid: leading week number + 7 day cells per row
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  // Helper: week number (ISO-ish, just sequential from 1)
  const getWeekNum = (rowIdx: number) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setDate(firstDayOfYear.getDate() + ((8 - firstDayOfYear.getDay()) % 7));
    const dayNum = new Date(year, month, (cells[rowIdx * 7] as number) || 1);
    const diff = Math.ceil((dayNum.getTime() - firstMonday.getTime()) / (7 * 86400000));
    return Math.max(1, diff + 1);
  };

  const isWeekend = (colIdx: number) => colIdx === 5 || colIdx === 6;
  const isToday = (d: number | null) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <Card className="border border-zinc-200 shadow-sm">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold tracking-wide">
            {MONTHS[month]}
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={next}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Grid */}
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {/* Week-number header (blank) */}
              <th className="w-6 pb-2 text-zinc-400 font-normal"></th>
              {DAYS.map((d, i) => (
                <th
                  key={d}
                  className={`pb-2 text-center font-medium ${
                    i >= 5 ? "text-black" : "text-zinc-500"
                  }`}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {/* Week number */}
                <td className="text-zinc-400 text-center pr-1 font-normal">
                  {getWeekNum(ri)}
                </td>
                {row.map((d, ci) => (
                  <td key={ci} className="text-center p-0.5">
                    {d ? (
                      <button
                        onClick={() => setSelected(d)}
                        className={`
                          w-7 h-7 rounded-full flex items-center justify-center mx-auto
                          transition-colors duration-150 font-normal
                          ${
                            isToday(d)
                              ? "bg-black text-white font-semibold"
                              : selected === d && month === today.getMonth()
                              ? "bg-zinc-200 text-black font-semibold"
                              : isWeekend(ci)
                              ? "text-black hover:bg-zinc-100"
                              : "text-zinc-700 hover:bg-zinc-100"
                          }
                        `}
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
      </CardContent>
    </Card>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function VehicleLogsPage() {
  const [page, setPage] = useState(1);

  const pageLogs = ALL_LOGS.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Back */}
        <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6">

          {/* LEFT: Vehicle image */}
          <div className="space-y-6">
            <div className="relative  rounded-xl overflow-hidden bg-zinc-200 aspect-[16/9] md:aspect-[4/3] max-h-80 w-140">
              {/* Replace src with your actual bus image */}
              <Image
                src="/images/bus.jpg"
                alt={"Bus image"}
                fill
                priority
                className=" object-cover"
              />
            </div>

            {/* Travel Logs section */}
            <div>
              <h2 className="text-base font-semibold mb-3">Travel logs</h2>
                <Table className=" border">
                  <TableHeader>
                    <TableRow className="bg-black hover:bg-black">
                      <TableHead className="text-white text-xs font-semibold rounded-tl-lg">Driver names</TableHead>
                      <TableHead className="text-white text-xs font-semibold">Date &amp; Time</TableHead>
                      <TableHead className="text-white text-xs font-semibold">From location</TableHead>
                      <TableHead className="text-white text-xs font-semibold rounded-tr-lg">To location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageLogs.map((log, i) => (
                      <TableRow key={log.id} className="hover:bg-zinc-50 border-zinc-100">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className=" border border-zinc-200">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 200}`} />
                              <AvatarFallback className="bg-zinc-100 text-zinc-600 text-xs font-medium">
                                {log.driver.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-black">{log.driver.name}</span>
                            <ExternalLink className="h-3 w-3 text-zinc-400 flex-shrink-0" />
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-zinc-600">{log.dateTime}</TableCell>
                        <TableCell className="text-xs text-zinc-600">{log.from}</TableCell>
                        <TableCell className="text-xs text-zinc-600">{log.to}</TableCell>
                      </TableRow>
                    ))}

                    {/* Empty skeleton rows */}
                    {pageLogs.length < LOGS_PER_PAGE &&
                      Array.from({ length: LOGS_PER_PAGE - pageLogs.length }).map((_, i) => (
                        <TableRow key={`empty-${i}`} className="border-zinc-100">
                          <TableCell colSpan={4}>
                            <div className="h-4 rounded bg-zinc-100 w-3/4" />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-zinc-500">
                  Page <strong className="text-black">{page}</strong> of {TOTAL_PAGES}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 border-zinc-300"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>

                  {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="icon"
                      className={`h-7 w-7 text-xs ${
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
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 border-zinc-300"
                    disabled={page === TOTAL_PAGES}
                    onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Calendar */}
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-semibold mb-3">Vehicle&apos;s logs</h2>
              <MiniCalendar />
            </div>

            {/* Optional quick stats */}
            <Card className="border border-zinc-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">This month</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-600">Total trips</span>
                  <Badge variant="secondary" className="bg-zinc-100 text-black text-xs font-semibold">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-600">Active drivers</span>
                  <Badge variant="secondary" className="bg-zinc-100 text-black text-xs font-semibold">6</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-600">Routes covered</span>
                  <Badge variant="secondary" className="bg-zinc-100 text-black text-xs font-semibold">8</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
