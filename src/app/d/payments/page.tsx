"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TfiExport } from "react-icons/tfi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PaymentMethod = "MTN" | "AIRTEL" | "CARD" | "CASH";
type PaymentStatus = "Paid" | "Pending" | "Refunded";

type Payment = {
  id: number;
  receipt: string;
  name: string;
  phone: string;
  email: string;
  method: PaymentMethod;
  amount: number;
  date: string;
  route: string;
  status: PaymentStatus;
};

const payments: Payment[] = [
  {
    id: 1,
    receipt: "RC-34531",
    name: "NKURUNZIZA HIRWA Melvin",
    phone: "0788 123 456",
    email: "melvin@example.com",
    method: "MTN",
    amount: 3000,
    date: "2026-05-05T08:30:00",
    route: "Kigali - Muhanga",
    status: "Paid",
  },
  {
    id: 2,
    receipt: "RC-34532",
    name: "Beatrice Carrot",
    phone: "0791 221 908",
    email: "beatrice@tega.rw",
    method: "AIRTEL",
    amount: 4500,
    date: "2026-05-05T09:15:00",
    route: "Kigali - Rubavu",
    status: "Paid",
  },
  {
    id: 3,
    receipt: "RC-34533",
    name: "Andy Melvin",
    phone: "0793 080 089",
    email: "andy@tega.rw",
    method: "CARD",
    amount: 2800,
    date: "2026-05-04T14:00:00",
    route: "Muhanga - Huye",
    status: "Pending",
  },
  {
    id: 4,
    receipt: "RC-34534",
    name: "Mugisha Rwanda",
    phone: "0780 982 111",
    email: "mugisha@tega.rw",
    method: "MTN",
    amount: 3500,
    date: "2026-05-04T18:10:00",
    route: "Kigali - Musanze",
    status: "Paid",
  },
  {
    id: 5,
    receipt: "RC-34535",
    name: "Alex Mugabe",
    phone: "0785 444 912",
    email: "alex@tega.rw",
    method: "CASH",
    amount: 1500,
    date: "2026-05-03T10:45:00",
    route: "Kigali - Muhanga",
    status: "Paid",
  },
  {
    id: 6,
    receipt: "RC-34536",
    name: "Jane Doe",
    phone: "0782 300 777",
    email: "jane@tega.rw",
    method: "AIRTEL",
    amount: 3000,
    date: "2026-05-03T12:20:00",
    route: "Huye - Kigali",
    status: "Refunded",
  },
  {
    id: 7,
    receipt: "RC-34537",
    name: "Bruno Kabaka",
    phone: "0786 982 445",
    email: "bruno@tega.rw",
    method: "MTN",
    amount: 5200,
    date: "2026-05-02T16:30:00",
    route: "Kigali - Nyagatare",
    status: "Paid",
  },
  {
    id: 8,
    receipt: "RC-34538",
    name: "Jean Claude",
    phone: "0782 444 221",
    email: "jean@tega.rw",
    method: "CARD",
    amount: 2200,
    date: "2026-05-02T19:05:00",
    route: "Musanze - Rubavu",
    status: "Pending",
  },
  {
    id: 9,
    receipt: "RC-34539",
    name: "Iradukunda Marie",
    phone: "0789 330 120",
    email: "marie@tega.rw",
    method: "AIRTEL",
    amount: 1800,
    date: "2026-05-01T07:35:00",
    route: "Kigali - Rwamagana",
    status: "Paid",
  },
];

const PAYMENTS_PER_PAGE = 6;

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

const getPaymentMethodLabel = (method: PaymentMethod) => {
  const labels: Record<PaymentMethod, string> = {
    MTN: "MTN MoMo",
    AIRTEL: "Airtel Money",
    CARD: "Card",
    CASH: "Cash",
  };

  return labels[method];
};

const PaymentsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return payments;

    return payments.filter((payment) =>
      [
        payment.receipt,
        payment.name,
        payment.phone,
        payment.email,
        getPaymentMethodLabel(payment.method),
        payment.route,
        payment.status,
        `${payment.amount}`,
        formatDate(payment.date),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / PAYMENTS_PER_PAGE),
  );
  const visiblePayments = filteredPayments.slice(
    (page - 1) * PAYMENTS_PER_PAGE,
    page * PAYMENTS_PER_PAGE,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const exportPayments = () => {
    const rows = [
      [
        "Receipt",
        "Client names",
        "Phone number",
        "Email address",
        "Payment method",
        "Date & Time",
        "Route",
        "Amount",
        "Status",
      ],
      ...filteredPayments.map((payment) => [
        payment.receipt,
        payment.name,
        payment.phone,
        payment.email,
        getPaymentMethodLabel(payment.method),
        formatDate(payment.date),
        payment.route,
        `${formatAmount(payment.amount)} RWF`,
        payment.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tega-payments.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="w-full sm:max-w-xs">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <InputGroupAddon>
            <FiSearch />
          </InputGroupAddon>
        </InputGroup>

        <Button
          className="gap-2 rounded-md"
          onClick={exportPayments}
          disabled={filteredPayments.length === 0}
        >
          <TfiExport /> <span>Export</span>
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[980px] bg-base-100">
          {/* HEADER */}
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="text-white">Client names</TableHead>
              <TableHead className="text-white">Phone number</TableHead>
              <TableHead className="text-white">Email address</TableHead>
              <TableHead className="text-white">Payment Method</TableHead>
              <TableHead className="text-white">Date & Time</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-right text-white">Receipt</TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {visiblePayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.name}</TableCell>

                <TableCell>{payment.phone}</TableCell>

                <TableCell className="text-muted-foreground">
                  {payment.email}
                </TableCell>

                {/* PAYMENT METHOD */}
                <TableCell>
                  <Badge variant="secondary">
                    {getPaymentMethodLabel(payment.method)}
                  </Badge>
                </TableCell>

                <TableCell>{formatDate(payment.date)}</TableCell>

                <TableCell className="font-semibold">
                  {formatAmount(payment.amount)} RWF
                </TableCell>

                <TableCell>
                  <Badge
                    variant={payment.status === "Paid" ? "default" : "outline"}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPayment(payment)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {visiblePayments.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground"
                >
                  No payments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          Page <span className="font-semibold">{page}</span> of {totalPages} •{" "}
          {filteredPayments.length} payment
          {filteredPayments.length === 1 ? "" : "s"}
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                size="icon"
                variant={pageNumber === page ? "default" : "outline"}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ),
          )}
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog
        open={Boolean(selectedPayment)}
        onOpenChange={() => setSelectedPayment(null)}
      >
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Payment receipt</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="flex flex-col gap-4 text-sm">
              <div className="rounded-lg bg-base-200 p-4">
                <p className="text-muted-foreground text-xs">Receipt number</p>
                <p className="font-semibold text-lg">
                  {selectedPayment.receipt}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-xs">Client</p>
                  <p className="font-medium">{selectedPayment.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="font-medium">{selectedPayment.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="font-medium">{selectedPayment.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Method</p>
                  <p className="font-medium">
                    {getPaymentMethodLabel(selectedPayment.method)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date & Time</p>
                  <p className="font-medium">
                    {formatDate(selectedPayment.date)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Amount</p>
                  <p className="font-medium">
                    {formatAmount(selectedPayment.amount)} RWF
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-xs">Email</p>
                <p className="font-medium">{selectedPayment.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Route</p>
                <p className="font-medium">{selectedPayment.route}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsPage;
