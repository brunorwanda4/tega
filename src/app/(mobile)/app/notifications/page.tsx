import {
  Bell,
  BusFront,
  CheckCircle2,
  Clock3,
  TicketCheck,
} from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import AppGoBackButton from "../_components/common/go-back-button";

const notifications = [
  {
    id: "bus-arriving",
    title: "Bus arriving soon",
    description: "Your Volcano express bus is 8 minutes from the pickup point.",
    time: "Now",
    icon: BusFront,
    isUnread: true,
  },
  {
    id: "ticket-ready",
    title: "Ticket ready",
    description: "Your QR ticket has been generated and is ready to scan.",
    time: "12 min ago",
    icon: TicketCheck,
    isUnread: true,
  },
  {
    id: "payment-confirmed",
    title: "Payment confirmed",
    description: "Your fare payment was received successfully.",
    time: "25 min ago",
    icon: CheckCircle2,
    isUnread: false,
  },
  {
    id: "route-update",
    title: "Route update",
    description: "Your bus remains on schedule for the selected route.",
    time: "1 hr ago",
    icon: Clock3,
    isUnread: false,
  },
];

const NotificationsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tega | Notifications</title>
      </Head>

      <div className="space-y-6 pt-4">
        <header className="flex items-center gap-4">
          <AppGoBackButton />
          <div>
            <h1 className="text-[24px] font-bold text-[#1F1F24]">
              Notifications
            </h1>
            <p className="text-[14px] text-[#828282]">
              Booking and route updates
            </p>
          </div>
        </header>

        <section className="rounded-[16px] bg-[#F9FAFB] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#1F1F24]">
              <Bell className="size-5 text-white" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#1F1F24]">
                2 unread updates
              </p>
              <p className="text-[13px] text-[#828282]">
                We will show important trip changes here.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="flex gap-3 rounded-[12px] border border-[#E5E7EB] bg-white p-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6]">
                <notification.icon className="size-5 text-[#1F1F24]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[15px] font-bold text-[#1F1F24]">
                    {notification.title}
                  </p>
                  {notification.isUnread && (
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-[#1F1F24]" />
                  )}
                </div>
                <p className="mt-1 text-[13px] leading-5 text-[#828282]">
                  {notification.description}
                </p>
                <p className="mt-2 text-[12px] font-medium text-[#9CA3AF]">
                  {notification.time}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};

export default NotificationsPage;
