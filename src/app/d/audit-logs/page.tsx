"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ActionType = "create" | "update" | "delete" | "login" | "payment";
type LogStatus = "Success" | "Review";

type Log = {
  id: number;
  name: string;
  email: string;
  action: string;
  actionType: ActionType;
  timestamp: string;
  ip: string;
  resource: string;
  status: LogStatus;
  details: string;
};

type Filters = {
  action: ActionType | "all";
  employee: string;
  date: string;
};

const logs: Log[] = [
  {
    id: 1,
    name: "Beatrice Carrot",
    email: "beatrice@tega.rw",
    action: "Generated a ticket",
    actionType: "create",
    timestamp: "2026-05-05T08:23:00",
    ip: "192.168.1.34",
    resource: "Booking #BK-1028",
    status: "Success",
    details: "Created a passenger ticket for Kigali - Muhanga at 08:00 AM.",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@tega.rw",
    action: "Updated driver profile",
    actionType: "update",
    timestamp: "2026-05-05T09:12:00",
    ip: "192.168.1.42",
    resource: "Driver #DR-204",
    status: "Success",
    details: "Changed driver phone number and availability status.",
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "jane@tega.rw",
    action: "Deleted stale vehicle",
    actionType: "delete",
    timestamp: "2026-05-04T16:45:00",
    ip: "10.12.4.18",
    resource: "Vehicle RAD112A",
    status: "Review",
    details: "Removed a vehicle record marked inactive for more than 90 days.",
  },
  {
    id: 4,
    name: "Alex Mugabe",
    email: "alex@tega.rw",
    action: "Confirmed payment",
    actionType: "payment",
    timestamp: "2026-05-04T13:30:00",
    ip: "172.16.2.91",
    resource: "Receipt #RC-34531",
    status: "Success",
    details: "Confirmed MTN MoMo payment for 3,000 RWF.",
  },
  {
    id: 5,
    name: "Mugisha Rwanda",
    email: "mugisha@tega.rw",
    action: "Signed in",
    actionType: "login",
    timestamp: "2026-05-03T07:10:00",
    ip: "192.168.1.55",
    resource: "Dashboard",
    status: "Success",
    details: "Authenticated successfully from a known office network.",
  },
  {
    id: 6,
    name: "Beatrice Carrot",
    email: "beatrice@tega.rw",
    action: "Updated booking time",
    actionType: "update",
    timestamp: "2026-05-03T11:05:00",
    ip: "192.168.1.34",
    resource: "Booking #BK-1019",
    status: "Success",
    details: "Moved passenger departure from 10:00 AM to 02:30 PM.",
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@tega.rw",
    action: "Created route schedule",
    actionType: "create",
    timestamp: "2026-05-02T15:24:00",
    ip: "192.168.1.42",
    resource: "Route Kigali - Rubavu",
    status: "Success",
    details: "Added a new evening departure schedule for the Rubavu route.",
  },
  {
    id: 8,
    name: "Jane Doe",
    email: "jane@tega.rw",
    action: "Reversed ticket payment",
    actionType: "payment",
    timestamp: "2026-05-02T10:11:00",
    ip: "10.12.4.18",
    resource: "Receipt #RC-34490",
    status: "Review",
    details: "Payment reversal was submitted and needs finance approval.",
  },
  {
    id: 9,
    name: "Alex Mugabe",
    email: "alex@tega.rw",
    action: "Deleted duplicate client",
    actionType: "delete",
    timestamp: "2026-05-01T17:48:00",
    ip: "172.16.2.91",
    resource: "Client #CL-621",
    status: "Success",
    details: "Merged duplicate client account into the primary profile.",
  },
  {
    id: 10,
    name: "Mugisha Rwanda",
    email: "mugisha@tega.rw",
    action: "Updated vehicle status",
    actionType: "update",
    timestamp: "2026-05-01T12:36:00",
    ip: "192.168.1.55",
    resource: "Vehicle RAC502B",
    status: "Success",
    details: "Changed vehicle status from maintenance to active.",
  },
  {
    id: 11,
    name: "Bruno Kabaka",
    email: "bruno@tega.rw",
    action: "Signed in",
    actionType: "login",
    timestamp: "2026-04-30T08:04:00",
    ip: "172.18.6.22",
    resource: "Dashboard",
    status: "Review",
    details: "Login came from a new network and was flagged for review.",
  },
  {
    id: 12,
    name: "Bruno Kabaka",
    email: "bruno@tega.rw",
    action: "Created client account",
    actionType: "create",
    timestamp: "2026-04-30T09:25:00",
    ip: "172.18.6.22",
    resource: "Client #CL-703",
    status: "Success",
    details: "Registered a new client profile from the booking desk.",
  },
];

const emptyFilters: Filters = {
  action: "all",
  employee: "all",
  date: "",
};

const LOGS_PER_PAGE = 6;

const formatTimestamp = (value: string) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const AuditLogsPage = () => {
  const [draftFilters, setDraftFilters] = useState<Filters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const employeeOptions = useMemo(
    () => Array.from(new Set(logs.map((log) => log.name))).sort(),
    [],
  );

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesAction =
        appliedFilters.action === "all" ||
        log.actionType === appliedFilters.action;
      const matchesEmployee =
        appliedFilters.employee === "all" ||
        log.name === appliedFilters.employee;
      const matchesDate =
        !appliedFilters.date ||
        log.timestamp.slice(0, 10) === appliedFilters.date.slice(0, 10);

      return matchesAction && matchesEmployee && matchesDate;
    });
  }, [appliedFilters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / LOGS_PER_PAGE),
  );
  const visibleLogs = filteredLogs.slice(
    (page - 1) * LOGS_PER_PAGE,
    page * LOGS_PER_PAGE,
  );

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const resetFilters = () => {
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="font-semibold text-2xl">Audit logs</h1>
        <p className="text-muted-foreground text-sm">
          Monitor any changes or actions made by employees in the system
        </p>
      </div>

      {/* FILTERS */}
      <Card>
        <CardContent className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-[180px_220px_240px_1fr] xl:items-end">
          <div className="flex flex-col gap-1">
            <label htmlFor="audit-action" className="text-sm">
              Action
            </label>
            <Select
              value={draftFilters.action}
              onValueChange={(action) =>
                setDraftFilters((current) => ({
                  ...current,
                  action: action as Filters["action"],
                }))
              }
            >
              <SelectTrigger id="audit-action" className="w-full">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="audit-employee" className="text-sm">
              Select employee
            </label>
            <Select
              value={draftFilters.employee}
              onValueChange={(employee) =>
                setDraftFilters((current) => ({ ...current, employee }))
              }
            >
              <SelectTrigger id="audit-employee" className="w-full">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All employees</SelectItem>
                {employeeOptions.map((employee) => (
                  <SelectItem key={employee} value={employee}>
                    {employee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="audit-date" className="text-sm">
              Select Date
            </label>
            <Input
              id="audit-date"
              type="date"
              className="w-full"
              value={draftFilters.date}
              onChange={(event) =>
                setDraftFilters((current) => ({
                  ...current,
                  date: event.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row xl:justify-end">
            <Button className="rounded-md" onClick={applyFilters}>
              Apply changes
            </Button>
            <Button
              variant="outline"
              className="rounded-md"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card className="py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[980px]">
              <TableHeader className="bg-base-content">
                <TableRow className="hover:bg-base-content">
                  <TableHead className="text-base-100">Full names</TableHead>
                  <TableHead className="text-base-100">Email address</TableHead>
                  <TableHead className="text-base-100">Action</TableHead>
                  <TableHead className="text-base-100">Timestamp</TableHead>
                  <TableHead className="text-base-100">IP Address</TableHead>
                  <TableHead className="text-base-100">Status</TableHead>
                  <TableHead className="text-right text-base-100">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback>
                            {getInitials(log.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{log.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.email}
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="flex items-center gap-1 text-left hover:text-primary"
                      >
                        {log.ip}
                        <ExternalLink />
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "Success" ? "secondary" : "outline"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLog(log)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {visibleLogs.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No audit logs match the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col gap-3 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              Page <span className="font-semibold">{page}</span> of {totalPages}{" "}
              • {filteredLogs.length} log
              {filteredLogs.length === 1 ? "" : "s"}
            </p>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ),
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(selectedLog)}
        onOpenChange={() => setSelectedLog(null)}
      >
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Audit log details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback>
                    {getInitials(selectedLog.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedLog.name}</p>
                  <p className="text-muted-foreground">{selectedLog.email}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-xs">Action</p>
                  <p className="font-medium">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="font-medium">{selectedLog.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Timestamp</p>
                  <p className="font-medium">
                    {formatTimestamp(selectedLog.timestamp)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">IP Address</p>
                  <p className="font-medium">{selectedLog.ip}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Resource</p>
                <p className="font-medium">{selectedLog.resource}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Details</p>
                <p>{selectedLog.details}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditLogsPage;
