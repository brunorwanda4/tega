"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaFileCsv } from "react-icons/fa";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiExternalLink,
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
import Link from "next/link";

// Types
interface Client {
  id: string;
  name: string;
  email: string;
  gender: "Male" | "Female";
  location: string;
  date: string;
  image: string;
}

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Beatrice Carrot",
      email: "andy@gmail.com",
      gender: "Male",
      location: "Rwanda",
      date: "04-11-2024",
      image: "https://i.pravatar.cc/150?u=1",
    },
    // Repeat or map for more rows as per image...
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6 min-h-screen"
    >
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
          <Input
            placeholder="Search a client"
            className="pl-10 bg-base-100 border-base-300 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* New Client Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn btn-ghost border-base-300 flex gap-2">
                <FiPlus /> New Client
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-base-100 border-base-300">
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
                <select className="select select-bordered w-full bg-base-200">
                  <option disabled selected>
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
      <div className="rounded-xl border border-base-300 overflow-hidden shadow-sm">
        <Table>
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
              <TableHead className="text-primary-content">04-11-2024</TableHead>
              <TableHead className="text-primary-content text-right">
                Activity
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow
                key={`${i}-123${i + 9}`}
                className={i % 2 === 0 ? "bg-base-100" : "bg-base-200/50"}
              >
                <TableCell className="font-medium">
                  <Link href={`/d/clients/${i + 1}`} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                      <AvatarFallback>BC</AvatarFallback>
                    </Avatar>
                    Beatrice Carrot
                  </Link>
                </TableCell>
                <TableCell className="text-base-content/70">
                  andy@gmail.com
                </TableCell>
                <TableCell>Male</TableCell>
                <TableCell>Rwanda</TableCell>
                <TableCell>04-11-2024</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-6 hover:bg-neutral hover:text-neutral-content"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm font-medium">
          Page <span className="text-primary">1</span> of 12
        </p>
        <div className="flex items-center gap-2">
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
