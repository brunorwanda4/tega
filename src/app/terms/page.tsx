import {
  ArrowLeft,
  BadgeCheck,
  BusFront,
  CreditCard,
  FileText,
  LockKeyhole,
  MessageSquareText,
  Route,
  ShieldCheck,
  TicketCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const termsSections = [
  {
    title: "1. Acceptance of these terms",
    body: "By accessing or using Tega, you agree to these Terms and Conditions. If you do not agree, please do not use the PWA, USSD service, ticketing flow, or related transport features.",
  },
  {
    title: "2. About Tega",
    body: "Tega is an MVP for Rwanda that helps passengers find buses, choose a destination, book a seat, pay, receive a digital ticket, and view bus status or tracking information through a Progressive Web App or USSD-supported access.",
  },
  {
    title: "3. MVP and testing status",
    body: "Tega is currently built for MVP testing and validation. Some features, routes, operators, payment flows, bus tracking updates, and USSD services may be experimental, incomplete, unavailable, or adjusted as the product improves.",
  },
  {
    title: "4. Passenger responsibilities",
    body: "Passengers are responsible for entering accurate travel details, confirming route and seat information before payment, keeping ticket details secure, arriving on time, and following the instructions of transport operators, agents, and station staff.",
  },
  {
    title: "5. Booking, payments, and tickets",
    body: "A booking is only confirmed when Tega or the relevant transport partner shows a successful confirmation. Digital tickets may include route details, seat information, payment status, QR code information, or other verification details.",
  },
  {
    title: "6. Bus status and tracking",
    body: "Bus status, estimated arrival times, and tracking information are provided to improve passenger confidence. These updates may be delayed, approximate, unavailable, or affected by network issues, operator updates, road conditions, or device limitations.",
  },
  {
    title: "7. USSD and small-phone access",
    body: "Tega may support USSD or similar access channels for passengers without smartphones. USSD menus, session timing, network fees, operator availability, and feature coverage may depend on telecom, transport, and technical partners.",
  },
  {
    title: "8. Operators and agents",
    body: "Transport operators and agents using Tega are responsible for providing accurate route, bus, seat, timing, ticket, and customer-service information. Tega may update workflows to support safer and clearer partner operations.",
  },
  {
    title: "9. Cancellations, changes, and refunds",
    body: "Cancellation, route change, seat change, refund, and missed-trip rules may depend on the transport operator, agent, payment provider, or active pilot agreement. Tega will aim to show available policy details clearly where possible.",
  },
  {
    title: "10. Privacy and data",
    body: "Tega may collect information needed to operate bookings, payments, tickets, user support, route selection, USSD sessions, and bus-status features. The product should only request data that is useful for providing or improving the transport service.",
  },
  {
    title: "11. Service availability",
    body: "Tega may be interrupted by maintenance, connectivity issues, device limits, payment provider outages, operator delays, mapping limitations, or pilot testing. We aim to improve reliability as the MVP moves toward real-world validation.",
  },
  {
    title: "12. Updates to these terms",
    body: "These terms may be updated as Tega develops, adds partners, expands routes, improves payments, launches USSD access, or changes operating processes. Continued use after updates means you accept the revised terms.",
  },
];

const highlights = [
  {
    title: "PWA access",
    description:
      "Use Tega from a mobile browser without installing a native app.",
    icon: BusFront,
  },
  {
    title: "Digital tickets",
    description: "Receive booking confirmation and ticket details digitally.",
    icon: TicketCheck,
  },
  {
    title: "USSD support",
    description: "Small-phone access can support booking and ticket checks.",
    icon: MessageSquareText,
  },
];

const TermsPages = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_50%_0%,var(--accent)_0%,rgba(248,250,252,0.75)_42%,var(--background)_76%)]">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="section-shell relative py-10 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tega
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
                <FileText className="h-4 w-4" />
                Terms and Conditions
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">
                Tega Rwanda Terms
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                These terms explain how passengers, agents, operators, and
                supporters should use the Tega MVP, PWA, digital ticketing, bus
                status, and USSD-supported transport access.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-border bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
          <aside className="h-fit rounded-[2rem] border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold text-foreground">Quick note</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              This page is written for the Tega MVP and should be reviewed by a
              qualified legal professional before production rollout or formal
              transport partnerships.
            </p>
            <div className="mt-6 space-y-3">
              <SideNote
                icon={ShieldCheck}
                text="Use the service responsibly."
              />
              <SideNote
                icon={CreditCard}
                text="Confirm payment before travel."
              />
              <SideNote icon={Route} text="Tracking estimates may vary." />
              <SideNote icon={LockKeyhole} text="Keep ticket details secure." />
            </div>
          </aside>

          <div className="space-y-4">
            {termsSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="section-shell flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Questions about these terms?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Contact the Tega team for MVP, partnership, or testing questions.
            </p>
          </div>
          <a
            href="mailto:contact@tega.rw?subject=Tega%20terms%20question"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            Contact Tega
            <BadgeCheck className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function SideNote({
  icon: Icon,
  text,
}: {
  icon: typeof ShieldCheck;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-background px-4 py-3 text-sm font-medium text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {text}
    </div>
  );
}

export default TermsPages;
