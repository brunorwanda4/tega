"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AppGoBackButton from "../../app/_components/common/go-back-button";

export default function CancelBookingPage() {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-4">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <AppGoBackButton />
        <h1 className="text-[20px] font-bold  flex-1 text-center mr-11">
          Ride cancellation
        </h1>
      </header>

      {/* Instructions */}
      <p className="text-[15px] text-[#828282] leading-relaxed mb-8">
        Please specify the reason for your ride cancellation request
      </p>

      {/* Form Section */}
      <div className="space-y-6 flex-1">
        <div className="space-y-2 flex flex-col">
          <label className="text-[14px] font-bold ">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason"
            className="w-full h-48 p-4 rounded-[20px] border border-gray-200 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1F1F24]/5 resize-none placeholder:text-[#BDBDBD]"
          />
        </div>

        {/* Upload Section */}
        <div className="space-y-2">
          <div className="relative w-full py-10 rounded-[20px] border-2 border-dashed border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center gap-3 transition-colors hover:bg-gray-50">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".csv,.pdf,.docs,.xlsx,.pptx,.jpg,.jpeg,.png"
            />

            <div className="size-12 rounded-xl bg-[#1F1F24] flex items-center justify-center shadow-lg">
              <LuPlus className="size-6 text-white" />
            </div>

            <div className="text-center">
              <p className="text-[15px] font-bold ">
                {file ? file.name : "Upload a file"}
              </p>
              <p className="text-[12px] text-[#828282] mt-1">
                CSV, PDF, DOCS, XLSX, PPTX, JPG, JPEG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <Button
          className="w-full "
          size="lg"
          onClick={() => setIsRequestOpen(true)}
        >
          Request
        </Button>
      </div>

      <Sheet open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl pb-6">
          <div className=" flex flex-col justify-center items-center p-6 space-y-2 pb-4">
            <div>
              <FaCheckCircle size={52} />
            </div>
            <p>Request cancellation successfully</p>
            <p className=" opacity-60">
              Cancellation request sent. Await confirmation.
            </p>
          </div>
          <Button
            size={"lg"}
            onClick={() => router.push("/admin/cancel-success")}
          >
            Got it
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
