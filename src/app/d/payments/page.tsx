"use client";

import { FiSearch } from "react-icons/fi";
import { TfiExport } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Payment = {
  id: number;
  name: string;
  phone: string;
  email: string;
  method: "MTN" | "AIRTEL";
  amount: string;
  date: string;
};

const payments: Payment[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: "NKURUNZIZA HIRWA Melvin",
  phone: "0788 123 456",
  email: "melvin@example.com",
  method: i % 2 === 0 ? "MTN" : "AIRTEL",
  amount: "3000 RWF",
  date: "04-11-2024, 14:00",
}));

const PaymentsPage = () => {
  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <FiSearch />
          </InputGroupAddon>
        </InputGroup>

        <Button className="rounded-md gap-2">
          <TfiExport /> <span>Export</span>
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-md border overflow-hidden">
        <Table className="bg-base-100">
          {/* HEADER */}
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="text-white">Client names</TableHead>
              <TableHead className="text-white">Phone number</TableHead>
              <TableHead className="text-white">Email address</TableHead>
              <TableHead className="text-white">Payment Method</TableHead>
              <TableHead className="text-white">Date & Time</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white text-right">Receipt</TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.name}</TableCell>

                <TableCell>{payment.phone}</TableCell>

                <TableCell>{payment.email}</TableCell>

                {/* PAYMENT METHOD */}
                <TableCell>
                  <span
                    className={`font-semibold ${
                      payment.method === "MTN"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {payment.method === "MTN" ? "MTN MoMo" : "Airtel Money"}
                  </span>
                </TableCell>

                <TableCell>{payment.date}</TableCell>

                <TableCell className="font-semibold">
                  {payment.amount}
                </TableCell>

                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between text-sm">
        <p>Page 1 of 12</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((p) => (
            <Button
              key={p}
              size="icon"
              variant={p === 1 ? "default" : "outline"}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
