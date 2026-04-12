"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Log = {
  id: number;
  name: string;
  email: string;
  action: string;
  timestamp: string;
  ip: string;
};

const logs: Log[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  name: "Beatrice Carrot",
  email: "andymelvin674@gmail.com",
  action: "Generated a ticket",
  timestamp: "21-97-2024 08:23:43",
  ip: "192.168.1.34",
}));

const AuditLogsPage = () => {
  const [action, setAction] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Audit logs</h1>
        <p className="text-muted-foreground text-sm">
          Monitor any changes or actions made by employees in the system
        </p>
      </div>

      {/* FILTERS */}
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="space-y-1">
            <p className="text-sm">Action</p>
            <Select onValueChange={setAction}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-sm">Select employee</p>
            <Select onValueChange={setEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Doe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-sm">Select Date & Time</p>
            <Input
              type="datetime-local"
              className="w-[220px]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button className="ml-auto rounded-md">Apply changes</Button>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card className=" py-0">
        <CardContent className="p-0">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-6 bg-black text-white text-sm px-4 py-3 rounded-t-md">
            <p>Full names</p>
            <p>Email address</p>
            <p>Action</p>
            <p>Timestamp</p>
            <p>IP Address</p>
            <p></p>
          </div>

          {/* TABLE BODY */}
          <div className="divide-y">
            {logs.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-6 items-center px-4 py-3 text-sm hover:bg-muted"
              >
                {/* NAME */}
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                  {log.name}
                </div>

                {/* EMAIL */}
                <p className="truncate">{log.email}</p>

                {/* ACTION */}
                <p>{log.action}</p>

                {/* TIME */}
                <p>{log.timestamp}</p>

                {/* IP */}
                <p className="flex items-center gap-1">
                  {log.ip}
                  <span className="text-blue-500 cursor-pointer">↗</span>
                </p>

                {/* BUTTON */}
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between p-4 text-sm">
            <p>Page 1 of 12</p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((p) => (
                <Button
                  key={p}
                  variant={p === 1 ? "default" : "outline"}
                  size="icon"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogsPage;
