"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  LuChevronRight,
  LuCreditCard,
  LuLogOut,
  LuMail,
  LuPhone,
  LuSettings,
  LuShieldCheck,
  LuTicket,
  LuUser,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    { icon: LuUser, label: "Edit Profile", link: "/profile/edit" },
    { icon: LuTicket, label: "My Bookings", link: "/app/bookings" },
    { icon: LuCreditCard, label: "Payment Methods", link: "/profile/payments" },
    { icon: LuShieldCheck, label: "Security", link: "/profile/security" },
    { icon: LuSettings, label: "Settings", link: "/profile/settings" },
  ];

  return (
    <div className="min-h-screen -mx-6">
      {/* Header */}
      <div className="bg-[#1F1F24] pt-12 pb-20 rounded-b-[40px] relative ">
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold text-center">
              Profile
            </h1>
          </div>
        </div>

        {/* User Info Card Overlay */}
        <div className="absolute -bottom-16  bg-white rounded-[24px] p-6 border left-4 right-4 border-base-300 flex items-center gap-4 ">
          <div className="flex items-center gap-4">
            <div className="relative size-20 rounded-full overflow-hidden border-4 border-[#F3F4F6]">
              <Image
                src="/images/reponce.jpg"
                alt="Rwanda Mugisha"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#1F1F24]">
                Reponce Mugisha
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[14px] text-[#828282]">
                  Full-stack Developer
                </p>
                <div className="bg-[#219653]/10 px-3 py-1 rounded-full">
                  <span className="text-[12px] font-bold text-[#219653]">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-20 space-y-6 px-6">
        {/* Contact Info Group */}
        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <LuMail className="text-[#1F1F24] size-5" />
            </div>
            <div>
              <p className="text-[12px] text-[#828282]">Email Address</p>
              <p className="text-[15px] font-semibold text-[#1F1F24]">
                Mugisha@tega.rw
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
            <div className="size-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <LuPhone className="text-[#1F1F24] size-5" />
            </div>
            <div>
              <p className="text-[12px] text-[#828282]">Phone Number</p>
              <p className="text-[15px] font-semibold text-[#1F1F24]">
                +250 788 000 000
              </p>
            </div>
          </div>
        </div>

        {/* Action Menu */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100">
          {menuItems.map((item, index) => (
            <button
              type="button"
              key={index}
              // onClick={() => router.push(item.link)}
              className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1
                  ? "border-bottom border-gray-50"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-[#1F1F24]/5 flex items-center justify-center">
                  <item.icon className="text-[#1F1F24] size-5" />
                </div>
                <span className="text-[16px] font-bold text-[#1F1F24]">
                  {item.label}
                </span>
              </div>
              <LuChevronRight className="text-[#828282] size-5" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          onClick={() => router.push("/auth/login")}
          variant="destructive"
          size="lg"
          className=" w-full"
        >
          <LuLogOut className="size-5" />
          Logout Account
        </Button>
      </div>
    </div>
  );
}
