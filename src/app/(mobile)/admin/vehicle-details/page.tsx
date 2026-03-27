"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import AppGoBackButton from "../../app/_components/common/go-back-button";

// Mock vehicle data structure
const vehicleData = {
  name: "Toyota v8 2018",
  plate: "RAD342C",
  color: "Black",
  seats: "7 seats",
  transmission: "Manual",
  condition: "Well-maintained",
  fuel: "Petrol",
  owner: "Volcano express",
  instructions:
    "Some cars may have specific instructions or quirks that drivers need to be aware",
  // Array of images for the carousel (stored in /public/vehicles/)
  images: ["/png/toyota.png", "/png/toyota.png"],
};

const VehicleDetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="space-y-1">
    <p className="text-[17px] font-bold text-[#1F1F24] tracking-tight">
      {label}
    </p>
    <p className="text-[15px] text-[#828282]">{value}</p>
  </div>
);

export default function VehicleDetailsPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Logic to handle carousel navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === vehicleData.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? vehicleData.images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* 1. Header with Circular Back Button */}
      <header className="flex items-center justify-between mb-8">
        <AppGoBackButton />
        <h1 className="text-[18px] font-bold text-[#1F1F24] flex-1 text-center mr-11">
          Vehicle details
        </h1>
      </header>

      {/* 2. Interactive Vehicle Image Carousel */}
      <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden mb-5 group">
        <Image
          src={vehicleData.images[currentImageIndex]}
          alt={`${vehicleData.name} - Photo ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />

        {/* Navigation Arrows (visible on hover) */}
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <LuChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <LuChevronRight className="size-6" />
        </button>
      </div>

      {/* 3. Carousel Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mb-8">
        {vehicleData.images.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 rounded-full ${
              currentImageIndex === index
                ? "size-2.5 bg-[#1F1F24]"
                : "size-2 bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* 4. Details Info Panel */}
      <section className="flex-1 bg-[#F9FAFB] rounded-[24px] p-6 border border-gray-100 shadow-inner">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <VehicleDetailRow label="Vehicle name" value={vehicleData.name} />
          <VehicleDetailRow label="Plate number" value={vehicleData.plate} />

          <VehicleDetailRow label="Vehicle color" value={vehicleData.color} />
          <VehicleDetailRow label="Vehicle seats" value={vehicleData.seats} />

          <VehicleDetailRow
            label="Transmission type"
            value={vehicleData.transmission}
          />
          <VehicleDetailRow label="Condition" value={vehicleData.condition} />

          <VehicleDetailRow label="Fuel type" value={vehicleData.fuel} />
          <VehicleDetailRow label="Owner" value={vehicleData.owner} />
        </div>

        {/* Special Instructions */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-[17px] font-bold text-[#1F1F24] mb-3">
            Special instructions
          </p>
          <p className="text-[15px] text-[#828282] leading-relaxed">
            {vehicleData.instructions}
          </p>
        </div>
      </section>
    </div>
  );
}
