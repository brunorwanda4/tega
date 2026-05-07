"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaFileCsv } from "react-icons/fa";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clients, getInitials } from "@/data/clients";

const ClientsPage = () => {
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return clients;

    return clients.filter((client) =>
      [
        client.name,
        client.email,
        client.gender,
        client.location,
        client.joined,
        client.phone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen space-y-6"
    >
      {/* Header Actions */}
      <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
          <Input
            placeholder="Search a client"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-10 bg-base-100 border-base-300 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* New Client Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn btn-ghost flex gap-2 border-base-300">
                <FiPlus /> New Client
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-2rem)] border-base-300 bg-base-100 sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input placeholder="Full Name" className="bg-base-200" />
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="bg-base-200"
                />
                <select
                  defaultValue=""
                  className="select select-bordered w-full bg-base-200"
                >
                  <option disabled value="">
                    Select Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <DialogFooter>
                <Button className="btn-primary w-full">Save Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="btn btn-neutral flex gap-2">
                <FiDownload /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-base-100 border-base-300"
            >
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <PiMicrosoftExcelLogo className="text-success" /> Microsoft
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <FaFileCsv className="text-info" /> CSV Format
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm">
        <Table className="min-w-[820px]">
          <TableHeader className="bg-primary text-primary-content">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-primary-content">
                Client names
              </TableHead>
              <TableHead className="text-primary-content">
                Email address
              </TableHead>
              <TableHead className="text-primary-content">Gender</TableHead>
              <TableHead className="text-primary-content">Location</TableHead>
              <TableHead className="text-primary-content">
                Joined date
              </TableHead>
              <TableHead className="text-primary-content text-right">
                Activity
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client, i) => (
              <TableRow
                key={client.id}
                className={i % 2 === 0 ? "bg-base-100" : "bg-base-200/50"}
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/d/clients/${client.id}`}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="size-8">
                      <AvatarImage src={client.image} alt={client.name} />
                      <AvatarFallback>
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    {client.name}
                  </Link>
                </TableCell>
                <TableCell className="text-base-content/70">
                  {client.email}
                </TableCell>
                <TableCell>{client.gender}</TableCell>
                <TableCell>{client.location}</TableCell>
                <TableCell>{client.joined}</TableCell>
                <TableCell className="text-right">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full px-6 hover:bg-neutral hover:text-neutral-content"
                  >
                    <Link href={`/d/clients/${client.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredClients.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-base-content/60"
                >
                  No clients match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium">
          Page <span className="text-primary">1</span> of 1
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8"
          >
            <FiChevronLeft />
          </Button>
          {[1, 2, 3, 4, 5].map((p) => (
            <Button
              key={p}
              variant={p === 1 ? "default" : "outline"}
              className={`rounded-full h-8 w-8 p-0 ${p === 1 ? "btn-neutral" : ""}`}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 bg-neutral text-neutral-content"
          >
            <FiChevronRight />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientsPage;
