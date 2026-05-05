"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  LuFilter,
  LuInfo,
  LuLayoutGrid,
  LuList,
  LuPlus,
  LuSearch,
  LuUsers,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VehicleStatus = "Active" | "In Maintenance";
type VehicleFilter = "all" | VehicleStatus;
type ViewMode = "grid" | "list";

type Vehicle = {
  id: number;
  name: string;
  plate: string;
  agency: string;
  seats: number;
  color: string;
  status: VehicleStatus;
};

type VehicleForm = {
  name: string;
  plate: string;
  agency: string;
  seats: string;
  color: string;
  status: VehicleStatus;
};

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota V8 2018",
    plate: "RAD342C",
    agency: "Volcano Express",
    seats: 7,
    color: "Black",
    status: "Active",
  },
  {
    id: 2,
    name: "Coaster 2020",
    plate: "RAC502B",
    agency: "Horizon",
    seats: 28,
    color: "White",
    status: "In Maintenance",
  },
  {
    id: 3,
    name: "Scania Luxury",
    plate: "RAE112A",
    agency: "Ritco",
    seats: 52,
    color: "Blue",
    status: "Active",
  },
  {
    id: 4,
    name: "Toyota Hiace 2019",
    plate: "RAB209D",
    agency: "Kigali Transit",
    seats: 18,
    color: "Silver",
    status: "Active",
  },
  {
    id: 5,
    name: "Yutong Coach 2021",
    plate: "RAF781G",
    agency: "Virunga Coach",
    seats: 45,
    color: "Green",
    status: "In Maintenance",
  },
  {
    id: 6,
    name: "Mercedes Sprinter",
    plate: "RAH447K",
    agency: "City Riders",
    seats: 22,
    color: "White",
    status: "Active",
  },
];

const emptyForm: VehicleForm = {
  name: "",
  plate: "",
  agency: "",
  seats: "",
  color: "",
  status: "Active",
};

export default function AdminBusesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VehicleFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState<VehicleForm>(emptyForm);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesStatus =
        statusFilter === "all" || vehicle.status === statusFilter;
      const matchesSearch =
        !query ||
        [
          vehicle.name,
          vehicle.plate,
          vehicle.agency,
          vehicle.color,
          vehicle.status,
          `${vehicle.seats}`,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [vehicles, search, statusFilter]);

  const canSubmit =
    form.name.trim() &&
    form.plate.trim() &&
    form.agency.trim() &&
    Number(form.seats) > 0 &&
    form.color.trim();

  const addVehicle = () => {
    if (!canSubmit) return;

    const newVehicle: Vehicle = {
      id: Date.now(),
      name: form.name.trim(),
      plate: form.plate.trim().toUpperCase(),
      agency: form.agency.trim(),
      seats: Number(form.seats),
      color: form.color.trim(),
      status: form.status,
    };

    setVehicles((current) => [newVehicle, ...current]);
    setForm(emptyForm);
    setIsAddOpen(false);
  };

  const toggleStatus = (vehicleId: number) => {
    setVehicles((current) =>
      current.map((vehicle) =>
        vehicle.id === vehicleId
          ? {
              ...vehicle,
              status: vehicle.status === "Active" ? "In Maintenance" : "Active",
            }
          : vehicle,
      ),
    );
  };

  const removeVehicle = (vehicleId: number) => {
    setVehicles((current) =>
      current.filter((vehicle) => vehicle.id !== vehicleId),
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div>
      {/* 1. Header Section */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-extrabold text-2xl text-[#1F1F24] sm:text-[28px]">
            Bus Fleet Management
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor and manage all vehicles registered under Tega
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="flex h-12 w-full gap-2 rounded-xl bg-[#1F1F24] px-6 font-bold text-white shadow-lg sm:w-auto">
              <LuPlus /> Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add new vehicle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2 sm:grid-cols-2">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label htmlFor="vehicle-name" className="font-medium text-sm">
                  Vehicle name
                </label>
                <Input
                  id="vehicle-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Toyota Coaster 2022"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="vehicle-plate" className="font-medium text-sm">
                  Plate number
                </label>
                <Input
                  id="vehicle-plate"
                  value={form.plate}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      plate: event.target.value,
                    }))
                  }
                  placeholder="RAC123A"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="vehicle-seats" className="font-medium text-sm">
                  Seats
                </label>
                <Input
                  id="vehicle-seats"
                  type="number"
                  min={1}
                  value={form.seats}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      seats: event.target.value,
                    }))
                  }
                  placeholder="28"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="vehicle-agency" className="font-medium text-sm">
                  Agency
                </label>
                <Input
                  id="vehicle-agency"
                  value={form.agency}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      agency: event.target.value,
                    }))
                  }
                  placeholder="Volcano Express"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="vehicle-color" className="font-medium text-sm">
                  Color
                </label>
                <Input
                  id="vehicle-color"
                  value={form.color}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      color: event.target.value,
                    }))
                  }
                  placeholder="White"
                />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label htmlFor="vehicle-status" className="font-medium text-sm">
                  Status
                </label>
                <Select
                  value={form.status}
                  onValueChange={(status) =>
                    setForm((current) => ({
                      ...current,
                      status: status as VehicleStatus,
                    }))
                  }
                >
                  <SelectTrigger id="vehicle-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="In Maintenance">
                      In Maintenance
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                className="rounded-md"
                onClick={() => {
                  setForm(emptyForm);
                  setIsAddOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="rounded-md"
                disabled={!canSubmit}
                onClick={addVehicle}
              >
                Save vehicle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 2. Filters and Search */}
      <div className="mb-8 flex flex-col gap-4 rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full md:w-96">
          <LuSearch className="-translate-y-1/2 absolute top-1/2 left-4 text-gray-400" />
          <Input
            placeholder="Search by plate, agency, color..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-12 rounded-xl border-gray-200 pl-12 focus-visible:ring-[#1F1F24]"
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
          <Select
            value={statusFilter}
            onValueChange={(status) => setStatusFilter(status as VehicleFilter)}
          >
            <SelectTrigger className="h-12 flex-1 rounded-xl border-gray-200 font-bold sm:w-48 sm:flex-none">
              <LuFilter />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All vehicles</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="In Maintenance">In Maintenance</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex overflow-hidden rounded-xl border border-gray-200">
            <Button
              variant="ghost"
              className={`h-12 rounded-none px-4 ${
                viewMode === "grid"
                  ? "bg-gray-100 text-[#1F1F24]"
                  : "text-gray-400"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <LuLayoutGrid />
            </Button>
            <Button
              variant="ghost"
              className={`h-12 rounded-none px-4 ${
                viewMode === "list"
                  ? "bg-gray-100 text-[#1F1F24]"
                  : "text-gray-400"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <LuList />
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Bus Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "flex flex-col gap-4"
        }
      >
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="pt-0">
            <div
              className={
                viewMode === "grid"
                  ? ""
                  : "grid gap-4 md:grid-cols-[240px_minmax(0,1fr)]"
              }
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                <Image
                  src="/images/bus.jpg"
                  alt={vehicle.name}
                  fill
                  priority={vehicle.id === 1}
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white shadow-sm hover:bg-gray-50"
                        aria-label={`Open actions for ${vehicle.name}`}
                      >
                        <LuInfo className="sr-only" />
                        <span className="text-lg leading-none">...</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/d/vehicles/${vehicle.id}`)}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toggleStatus(vehicle.id)}
                      >
                        Mark as{" "}
                        {vehicle.status === "Active" ? "maintenance" : "active"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => removeVehicle(vehicle.id)}
                      >
                        Remove vehicle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={
                      vehicle.status === "Active" ? "secondary" : "outline"
                    }
                    className="uppercase"
                  >
                    {vehicle.status}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="flex flex-col">
                <div className="mb-4">
                  <h3 className="font-bold text-[#1F1F24] text-[18px]">
                    {vehicle.name}
                  </h3>
                  <p className="font-medium text-gray-500 text-sm">
                    {vehicle.agency}
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[11px] text-gray-400 uppercase">
                      Plate Number
                    </p>
                    <p className="font-bold text-[#1F1F24] text-[14px]">
                      {vehicle.plate}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[11px] text-gray-400 uppercase">
                      Capacity
                    </p>
                    <div className="flex items-center gap-1.5 font-bold text-[#1F1F24] text-[14px]">
                      <LuUsers /> {vehicle.seats} Seats
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[11px] text-gray-400 uppercase">
                      Color
                    </p>
                    <p className="font-bold text-[#1F1F24] text-[14px]">
                      {vehicle.color}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[11px] text-gray-400 uppercase">
                      Status
                    </p>
                    <p className="font-bold text-[#1F1F24] text-[14px]">
                      {vehicle.status}
                    </p>
                  </div>
                </div>

                <div className="mt-auto grid gap-2 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    className="flex gap-2 rounded-xl border-[#1F1F24] font-bold text-[#1F1F24] transition-all hover:bg-[#1F1F24] hover:text-white"
                    onClick={() => router.push(`/d/vehicles/${vehicle.id}`)}
                  >
                    <LuInfo /> View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl font-bold"
                    onClick={() => toggleStatus(vehicle.id)}
                  >
                    {vehicle.status === "Active"
                      ? "Set Maintenance"
                      : "Set Active"}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
            <p className="font-semibold">No vehicles found</p>
            <p className="text-gray-500 text-sm">
              Try another search term or clear the selected filter.
            </p>
            <Button variant="outline" className="mt-2" onClick={resetFilters}>
              Reset filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
