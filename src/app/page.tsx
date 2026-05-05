"use client";

import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  BusFront,
  Check,
  CheckCircle2,
  CircleDot,
  CreditCard,
  HandCoins,
  HelpCircle,
  MapPin,
  MessageSquareText,
  Navigation,
  Phone,
  QrCode,
  RadioTower,
  Search,
  ShieldCheck,
  Smartphone,
  TicketCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const brand = {
  name: "Tega",
  logo: "/light-logo.svg",
  tagline: "Bus booking and tracking MVP for Rwanda",
};

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Flow", href: "#flow" },
  { label: "Access", href: "#access" },
  { label: "Tracking", href: "#tracking" },
  { label: "Support", href: "#support" },
];

const floatingBadges = [
  {
    label: "Seat reserved",
    detail: "12A locked",
    icon: TicketCheck,
    className: "lg:left-[4%] lg:top-[20%]",
  },
  {
    label: "Bus arriving",
    detail: "8 min",
    icon: BusFront,
    className: "lg:right-[8%] lg:top-[18%]",
  },
  {
    label: "USSD supported",
    detail: "*727# path",
    icon: Phone,
    className: "lg:bottom-[18%] lg:left-[10%]",
  },
  {
    label: "Digital ticket ready",
    detail: "QR confirmed",
    icon: QrCode,
    className: "lg:bottom-[16%] lg:right-[5%]",
  },
];

const flowSteps = [
  {
    title: "Choose route",
    label: "Kigali -> Musanze",
    meta: "Today, 10:40",
    icon: Search,
  },
  {
    title: "Select operator",
    label: "Volcano Express",
    meta: "Verified route",
    icon: Building2,
  },
  {
    title: "Pay",
    label: "Mobile payment",
    meta: "Secure checkout",
    icon: CreditCard,
  },
  {
    title: "Get ticket",
    label: "Seat 12A",
    meta: "QR confirmed",
    icon: TicketCheck,
  },
  {
    title: "Track bus",
    label: "Near Rulindo",
    meta: "28 min ETA",
    icon: Navigation,
  },
];

const mvpCards = [
  {
    title: "PWA ready",
    description: "The browser-based MVP already exists for mobile testing.",
    icon: Smartphone,
    accent: "bg-accent text-primary",
  },
  {
    title: "USSD planned",
    description: "The same service can extend to passengers with small phones.",
    icon: MessageSquareText,
    accent: "bg-[#EEF2FF] text-primary",
  },
  {
    title: "Partner testing needed",
    description: "The next milestone is testing with real transport workflows.",
    icon: HandCoins,
    accent: "bg-[#F0FDF4] text-[#15803D]",
  },
];

const supportCards = [
  {
    title: "Transport operators",
    description: "Validate booking, route, and bus-status workflows.",
    icon: BusFront,
  },
  {
    title: "Bus agents",
    description: "Test how seat requests and ticket checks work on the ground.",
    icon: BadgeCheck,
  },
  {
    title: "Test users",
    description: "Try the MVP and report what feels unclear or missing.",
    icon: UsersRound,
  },
  {
    title: "Technical mentors",
    description: "Support PWA, USSD, payments, and tracking decisions.",
    icon: ShieldCheck,
  },
  {
    title: "Investors/supporters",
    description: "Help fund field testing and early transport partnerships.",
    icon: HandCoins,
  },
];

const qrCells = [
  { id: "qr-01", filled: true },
  { id: "qr-02", filled: true },
  { id: "qr-03", filled: true },
  { id: "qr-04", filled: false },
  { id: "qr-05", filled: true },
  { id: "qr-06", filled: false },
  { id: "qr-07", filled: true },
  { id: "qr-08", filled: false },
  { id: "qr-09", filled: true },
  { id: "qr-10", filled: true },
  { id: "qr-11", filled: false },
  { id: "qr-12", filled: true },
  { id: "qr-13", filled: false },
  { id: "qr-14", filled: false },
  { id: "qr-15", filled: true },
  { id: "qr-16", filled: false },
  { id: "qr-17", filled: true },
  { id: "qr-18", filled: true },
  { id: "qr-19", filled: true },
  { id: "qr-20", filled: false },
  { id: "qr-21", filled: true },
  { id: "qr-22", filled: false },
  { id: "qr-23", filled: true },
  { id: "qr-24", filled: true },
  { id: "qr-25", filled: false },
  { id: "qr-26", filled: true },
  { id: "qr-27", filled: false },
  { id: "qr-28", filled: false },
  { id: "qr-29", filled: true },
  { id: "qr-30", filled: true },
  { id: "qr-31", filled: true },
  { id: "qr-32", filled: false },
  { id: "qr-33", filled: true },
  { id: "qr-34", filled: false },
  { id: "qr-35", filled: true },
  { id: "qr-36", filled: true },
];

const seats = [
  { id: "seat-01", state: "booked" },
  { id: "seat-02", state: "unknown" },
  { id: "seat-03", state: "free" },
  { id: "seat-04", state: "booked" },
  { id: "seat-05", state: "free" },
  { id: "seat-06", state: "unknown" },
  { id: "seat-07", state: "free" },
  { id: "seat-08", state: "booked" },
  { id: "seat-09", state: "unknown" },
  { id: "seat-10", state: "free" },
  { id: "seat-11", state: "booked" },
  { id: "seat-12", state: "unknown" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

type IconContent = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function Home() {
  const [spotlightSection, setSpotlightSection] = useState<string | null>(null);
  const spotlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (spotlightTimer.current) {
        clearTimeout(spotlightTimer.current);
      }
    };
  }, []);

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setSpotlightSection(sectionId);

    if (spotlightTimer.current) {
      clearTimeout(spotlightTimer.current);
    }

    spotlightTimer.current = setTimeout(() => {
      setSpotlightSection((currentSection) =>
        currentSection === sectionId ? null : currentSection,
      );
    }, 1600);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background pt-16 text-foreground">
      <Header onNavigate={handleNavigate} />
      <HeroSection />
      <ProblemStorySection spotlight={spotlightSection === "problem"} />
      <ProductFlowSection spotlight={spotlightSection === "flow"} />
      <AccessSection spotlight={spotlightSection === "access"} />
      <TrackingSection spotlight={spotlightSection === "tracking"} />
      <MVPSection spotlight={spotlightSection === "mvp"} />
      <SupportSection spotlight={spotlightSection === "support"} />
      <Footer />
    </main>
  );
}

function Header({
  onNavigate,
}: {
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-white/70 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/60">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-3" aria-label="Tega home">
          <Image src={brand.logo} alt="" width={34} height={34} priority />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {brand.name}
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => onNavigate(event, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ButtonLink
          href="#support"
          onClick={(event) => onNavigate(event, "#support")}
        >
          Support Tega
        </ButtonLink>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative border-b border-border bg-[radial-gradient(circle_at_50%_0%,var(--accent)_0%,rgba(224,247,255,0.5)_30%,var(--background)_68%)] pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="absolute inset-0 grid-bg opacity-80" />
      <div className="section-shell relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Built for Rwanda's bus booking reality
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            Know your bus before you reach the station.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
          >
            Tega helps passengers find buses, book seats, pay, and receive
            tickets through a PWA or USSD.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <ButtonLink href="/app">Try MVP</ButtonLink>
            <ButtonLink href="#support" variant="secondary">
              Support Tega
            </ButtonLink>
          </motion.div>
        </motion.div>

        <HeroProductStage />
      </div>
    </section>
  );
}

function HeroProductStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative mx-auto mt-14 max-w-6xl rounded-[2rem] border border-white/80 bg-white/50 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8 lg:p-12"
    >
      <div className="absolute inset-x-10 top-10 h-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        <StatusPanel />
        <div className="relative mx-auto">
          <PhoneMockup />
          {floatingBadges.map((badge) => (
            <FloatingBadge key={badge.label} {...badge} />
          ))}
        </div>
        <RoutePreview />
      </div>

      <div className="relative mt-7 grid gap-3 sm:grid-cols-2 lg:hidden">
        {floatingBadges.map((badge) => (
          <FloatingBadge key={`mobile-${badge.label}`} {...badge} mobile />
        ))}
      </div>
    </motion.div>
  );
}

function StatusPanel() {
  return (
    <div className="glass-card hidden rounded-3xl p-5 lg:block">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Before Tega</p>
        <HelpCircle className="h-5 w-5 text-[#94A3B8]" />
      </div>
      <div className="space-y-3">
        <MiniSignal label="Bus time" value="Unknown" tone="muted" />
        <MiniSignal label="Seat" value="Not clear" tone="muted" />
        <MiniSignal label="Ticket" value="Manual" tone="muted" />
      </div>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        The landing page shows the problem fast: passengers need confidence
        before they spend time at the station.
      </p>
    </div>
  );
}

function RoutePreview() {
  return (
    <div className="glass-card hidden rounded-3xl p-5 lg:block">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">After Tega</p>
        <CheckCircle2 className="h-5 w-5 text-primary" />
      </div>
      <div className="rounded-2xl bg-background p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Kigali</span>
          <span>Rulindo</span>
          <span>Musanze</span>
        </div>
        <div className="relative mt-4 h-2 rounded-full bg-border">
          <motion.div
            initial={{ width: "18%" }}
            animate={{ width: "74%" }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.35 }}
            className="h-2 rounded-full bg-primary"
          />
          <motion.span
            initial={{ left: "18%" }}
            animate={{ left: "74%" }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.35 }}
            className="absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-lg"
          >
            <BusFront className="h-4 w-4" />
          </motion.span>
        </div>
      </div>
      <MiniSignal label="Status" value="Arriving in 8 min" tone="active" />
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="blue-glow relative mx-auto w-[285px] rounded-[2.7rem] border-[10px] border-foreground bg-foreground p-2 shadow-2xl sm:w-[330px]">
      <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground" />
      <div className="min-h-[610px] overflow-hidden rounded-[2rem] bg-background">
        <div className="bg-[linear-gradient(135deg,var(--primary),var(--primary))] px-5 pb-6 pt-10 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={brand.logo} alt="" width={28} height={28} />
              <span className="font-semibold">{brand.name}</span>
            </div>
            <RadioTower className="h-5 w-5 text-white/80" />
          </div>
          <p className="mt-8 text-sm text-white/75">Current trip</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Kigali to Musanze
          </h2>
        </div>

        <div className="-mt-4 space-y-4 px-4 pb-5">
          <div className="rounded-3xl border border-border bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <PhoneInfo label="From" value="Kigali" />
              <PhoneInfo label="To" value="Musanze" />
              <PhoneInfo label="Bus" value="Volcano Express" wide />
              <PhoneInfo label="Seat" value="12A" />
              <PhoneInfo label="Ticket" value="Confirmed" />
            </div>
          </div>

          <div className="grid grid-cols-[0.85fr_1fr] gap-3">
            <div className="rounded-3xl border border-border bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  QR ticket
                </span>
                <QrCode className="h-4 w-4 text-primary" />
              </div>
              <QrGrid />
            </div>

            <div className="rounded-3xl border border-[#CFF4FF] bg-accent p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-primary">
                  <BusFront className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Bus status
                  </p>
                  <p className="text-sm font-bold text-primary">
                    Arriving in 8 min
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white">
                <motion.div
                  initial={{ width: "30%" }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.45 }}
                  className="h-2 rounded-full bg-primary"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Choose access</p>
              <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-muted-foreground">
                PWA + USSD
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <AccessChip icon={Smartphone} label="Open PWA" active />
              <AccessChip icon={Phone} label="Use USSD" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemStorySection({ spotlight = false }: { spotlight?: boolean }) {
  return (
    <VisualSection
      id="problem"
      eyebrow="The transport problem"
      title="Today, booking a bus still feels uncertain."
      description="Passengers often make decisions with missing information: bus status, seat availability, and access options are not clear enough."
      spotlight={spotlight}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 lg:grid-cols-3"
      >
        <ProblemCard
          title="Where is the bus?"
          text="Passengers often wait without knowing when the bus is coming."
        >
          <WaitingVisual />
        </ProblemCard>
        <ProblemCard
          title="Is there a seat?"
          text="Seat availability is not always clear before reaching the station."
        >
          <SeatVisual />
        </ProblemCard>
        <ProblemCard
          title="Who can book?"
          text="Many digital tools forget people with small phones."
        >
          <AccessVisual />
        </ProblemCard>
      </motion.div>
    </VisualSection>
  );
}

function ProductFlowSection({ spotlight = false }: { spotlight?: boolean }) {
  return (
    <VisualSection
      id="flow"
      eyebrow="Product flow"
      title="From search to ticket in minutes."
      description="Tega turns a scattered transport process into one connected passenger journey."
      surface
      spotlight={spotlight}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="relative"
      >
        <div className="absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-[#BFEFFF] lg:block" />
        <div className="grid gap-4 lg:grid-cols-5">
          {flowSteps.map((step, index) => (
            <FlowCard
              key={step.title}
              {...step}
              showArrow={index < flowSteps.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </VisualSection>
  );
}

function AccessSection({ spotlight = false }: { spotlight?: boolean }) {
  return (
    <VisualSection
      id="access"
      eyebrow="Inclusive access"
      title="One transport system. Two ways to access it."
      description="Passengers with smartphones can use the PWA. Passengers with small phones can use USSD to book, check tickets, or get bus status."
      spotlight={spotlight}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="glass-card grid overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:grid-cols-2 lg:p-10"
      >
        <div className="rounded-[1.7rem] bg-background p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">
                Smartphone PWA
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Tap, book, track.</h3>
            </div>
            <Smartphone className="h-7 w-7 text-primary" />
          </div>
          <PwaMiniMockup />
        </div>

        <div className="mt-5 rounded-[1.7rem] bg-foreground p-5 text-white sm:p-7 lg:ml-5 lg:mt-0">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#9BE8FF]">
                Small-phone USSD
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Dial, choose, go.</h3>
            </div>
            <Phone className="h-7 w-7 text-[#9BE8FF]" />
          </div>
          <UssdMockup />
        </div>
      </motion.div>
    </VisualSection>
  );
}

function TrackingSection({ spotlight = false }: { spotlight?: boolean }) {
  return (
    <VisualSection
      id="tracking"
      eyebrow="Live status"
      title="See the route before the wait feels long."
      description="A simple status layer can help passengers know whether to hurry, wait, or adjust plans."
      surface
      spotlight={spotlight}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        variants={fadeUp}
        className="glass-card grid gap-6 rounded-[2rem] p-5 lg:grid-cols-[1.35fr_0.65fr] lg:p-8"
      >
        <RouteMap />
        <div className="rounded-[1.7rem] border border-border bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
              Live trip
            </span>
            <Navigation className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">
            Bus is near Rulindo
          </h3>
          <div className="mt-6 space-y-3">
            <MiniSignal
              label="Estimated arrival"
              value="28 min"
              tone="active"
            />
            <MiniSignal label="Seats left" value="6" tone="active" />
            <MiniSignal label="Route" value="Kigali -> Musanze" tone="active" />
          </div>
        </div>
      </motion.div>
    </VisualSection>
  );
}

function MVPSection({ spotlight = false }: { spotlight?: boolean }) {
  return (
    <VisualSection
      id="mvp"
      eyebrow="MVP status"
      title="Built as an MVP. Ready for real-world testing."
      description="Tega is already built as a Progressive Web App. The next step is testing with passengers, agents, and transport operators."
      spotlight={spotlight}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {mvpCards.map((card) => (
          <MvpCard key={card.title} {...card} />
        ))}
      </motion.div>
    </VisualSection>
  );
}

function SupportSection({ spotlight = false }: { spotlight?: boolean }) {
  return (
    <section
      id="support"
      className="relative scroll-mt-24 overflow-hidden bg-primary py-20 text-white sm:py-28"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      <motion.div
        animate={
          spotlight
            ? {
                scale: [1, 1.01, 1],
                boxShadow: [
                  "0 0 0 color-mix(in srgb, var(--primary) 0%, transparent)",
                  "0 0 0 10px color-mix(in srgb, var(--primary) 18%, transparent)",
                  "0 0 0 color-mix(in srgb, var(--primary) 0%, transparent)",
                ],
              }
            : undefined
        }
        transition={{ duration: 1.15, ease: "easeOut" }}
        className="section-shell relative rounded-[2rem]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-[#9BE8FF]"
          >
            Build with us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            Help us make public transport easier to use.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75"
          >
            We are looking for transport partners, agents, testers, mentors, and
            supporters who can help us validate Tega in Rwanda.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {supportCards.map((card) => (
            <SupportCard key={card.title} {...card} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <ButtonLink
            href="mailto:contact@tega.rw?subject=Tega%20partnership"
            variant="light"
          >
            Contact us
          </ButtonLink>
          <ButtonLink href="/app" variant="secondary">
            Request demo
          </ButtonLink>
          <ButtonLink
            href="mailto:contact@tega.rw?subject=Tega%20MVP%20feedback"
            variant="secondary"
          >
            Give feedback
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="section-shell py-10 sm:py-12">
        <div className="grid gap-8 rounded-[2rem] border border-border bg-background/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Tega home"
            >
              <Image src={brand.logo} alt="" width={38} height={38} />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                {brand.name}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              {brand.name} helps passengers book seats, receive digital tickets,
              and track buses through a PWA or USSD.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              MVP ready for real-world testing
            </div>
          </div>

          <FooterLinkGroup
            title="Website"
            links={[
              { label: "Problem", href: "#problem" },
              { label: "Product flow", href: "#flow" },
              { label: "Access", href: "#access" },
              { label: "Tracking", href: "#tracking" },
            ]}
          />

          <FooterLinkGroup
            title="Project"
            links={[
              { label: "Try MVP", href: "/app" },
              { label: "USSD concept", href: "/app/ssd" },
              { label: "MVP status", href: "#mvp" },
              { label: "Support", href: "#support" },
            ]}
          />

          <div className="rounded-[1.5rem] border border-border bg-white p-5">
            <p className="text-sm font-semibold text-foreground">
              Build with Tega
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Looking for transport partners, agents, testers, mentors, and
              supporters in Rwanda.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href="mailto:contact@tega.rw?subject=Tega%20partnership"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/app"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-border bg-background px-4 text-sm font-bold text-foreground transition-colors hover:border-primary/50"
              >
                Request demo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {brand.name} — {brand.tagline}.
          </p>
          <p>Built for Rwanda transport testing.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function VisualSection({
  id,
  eyebrow,
  title,
  description,
  children,
  surface = false,
  spotlight = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  surface?: boolean;
  spotlight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b border-border py-20 sm:py-28 ${
        surface ? "bg-white" : "bg-background"
      }`}
    >
      <motion.div
        animate={
          spotlight
            ? {
                y: [0, -8, 0],
                boxShadow: [
                  "0 0 0 color-mix(in srgb, var(--primary) 0%, transparent)",
                  "0 0 0 10px color-mix(in srgb, var(--primary) 20%, transparent)",
                  "0 0 0 color-mix(in srgb, var(--primary) 0%, transparent)",
                ],
              }
            : undefined
        }
        transition={{ duration: 1.15, ease: "easeOut" }}
        className="section-shell rounded-[2rem]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </motion.div>
        {children}
      </motion.div>
    </section>
  );
}

function FloatingBadge({
  label,
  detail,
  icon: Icon,
  className,
  mobile = false,
}: {
  label: string;
  detail: string;
  icon: LucideIcon;
  className: string;
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={mobile ? false : { opacity: 0, y: 18, scale: 0.94 }}
      animate={mobile ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.35 }}
      whileHover={{ y: -4 }}
      className={
        mobile
          ? "glass-card rounded-2xl p-4"
          : `glass-card absolute hidden min-w-48 rounded-2xl p-4 lg:block ${className}`
      }
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">{label}</p>
          <p className="text-xs font-medium text-muted-foreground">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneInfo({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-background px-3 py-2 ${wide ? "col-span-2" : ""}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}

function AccessChip({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border px-3 py-3 text-xs font-bold ${
        active
          ? "border-primary bg-accent text-primary"
          : "border-border bg-white text-muted-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

function QrGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid aspect-square grid-cols-6 gap-1 rounded-2xl bg-white p-2 ${
        compact ? "max-w-24" : ""
      }`}
    >
      {qrCells.map((cell) => (
        <span
          key={cell.id}
          className={
            cell.filled
              ? "rounded-[4px] bg-foreground"
              : "rounded-[4px] bg-border"
          }
        />
      ))}
    </div>
  );
}

function MiniSignal({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "active" | "muted";
}) {
  return (
    <div className="mt-3 flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span
        className={
          tone === "active"
            ? "text-sm font-bold text-primary"
            : "text-sm font-bold text-[#94A3B8]"
        }
      >
        {value}
      </span>
    </div>
  );
}

function ProblemCard({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="glass-card overflow-hidden rounded-[2rem] p-5 transition-shadow hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-5 min-h-64 rounded-[1.5rem] bg-background p-5">
        {children}
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{text}</p>
    </motion.article>
  );
}

function WaitingVisual() {
  return (
    <div className="relative h-56 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,var(--accent),var(--card))]">
      <div className="absolute bottom-8 left-5 right-5 h-3 rounded-full bg-[#CBD5E1]" />
      <div className="absolute bottom-11 left-8 flex flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
          <UserRound className="h-7 w-7" />
        </span>
        <span className="mt-2 h-16 w-8 rounded-t-full bg-primary" />
      </div>
      <div className="absolute bottom-16 right-7 rounded-[1.2rem] border border-border bg-white p-4 shadow-xl">
        <BusFront className="h-12 w-12 text-[#CBD5E1]" />
        <div className="mt-3 flex items-center gap-2 text-sm font-bold text-[#94A3B8]">
          <HelpCircle className="h-4 w-4" />
          Unknown
        </div>
      </div>
      <div className="absolute left-6 top-6 rounded-full bg-white px-3 py-2 text-xs font-bold text-muted-foreground shadow-sm">
        Waiting at station
      </div>
    </div>
  );
}

function SeatVisual() {
  return (
    <div className="rounded-[1.25rem] border border-border bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">Seat map</span>
        <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-bold text-[#C2410C]">
          unclear
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {seats.map((seat) => (
          <span
            key={seat.id}
            className={`h-11 rounded-xl border ${
              seat.state === "booked"
                ? "border-[#CBD5E1] bg-border"
                : seat.state === "free"
                  ? "border-[#BAE6FD] bg-accent"
                  : "border-dashed border-[#CBD5E1] bg-white"
            }`}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>Available?</span>
        <span>Reserved?</span>
        <span>Unknown?</span>
      </div>
    </div>
  );
}

function AccessVisual() {
  return (
    <div className="flex h-56 items-end justify-center gap-5 rounded-[1.25rem] bg-[linear-gradient(180deg,var(--background),var(--accent))] p-5">
      <div className="w-24 rounded-[2rem] border-[7px] border-foreground bg-white p-3 shadow-xl">
        <div className="mb-3 h-2 rounded-full bg-[#CBD5E1]" />
        <div className="space-y-2">
          <div className="h-8 rounded-xl bg-accent" />
          <div className="h-8 rounded-xl bg-[#F1F5F9]" />
          <div className="h-8 rounded-xl bg-primary" />
        </div>
      </div>
      <div className="w-20 rounded-[1.4rem] border-[6px] border-[#334155] bg-foreground p-3 text-white shadow-xl">
        <div className="mb-3 text-center text-xs font-bold">USSD</div>
        <div className="space-y-2">
          <div className="h-2 rounded bg-white/70" />
          <div className="h-2 rounded bg-white/50" />
          <div className="h-2 rounded bg-white/50" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-1">
          {["1", "2", "3", "4", "5", "6"].map((key) => (
            <span
              key={key}
              className="flex h-4 items-center justify-center rounded bg-white/10 text-[8px]"
            >
              {key}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowCard({
  title,
  label,
  meta,
  icon: Icon,
  showArrow,
}: {
  title: string;
  label: string;
  meta: string;
  icon: LucideIcon;
  showArrow: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="relative rounded-[1.5rem] border border-border bg-background p-4 shadow-sm"
    >
      <div className="mb-5 flex h-16 items-center justify-between rounded-[1.15rem] bg-white px-4 shadow-sm">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {showArrow ? (
          <span className="hidden h-8 w-8 translate-x-8 items-center justify-center rounded-full border border-[#BFEFFF] bg-white text-primary shadow-sm lg:flex">
            <ArrowRight className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-4 rounded-[1.1rem] border border-border bg-white p-4">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="mt-1 text-xs font-medium text-muted-foreground">{meta}</p>
      </div>
    </motion.article>
  );
}

function PwaMiniMockup() {
  return (
    <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold">Search route</span>
        </div>
        <PhoneInfo label="From" value="Kigali" />
        <div className="mt-3">
          <PhoneInfo label="To" value="Musanze" />
        </div>
        <div className="mt-4 rounded-2xl bg-accent px-4 py-3 text-sm font-bold text-primary">
          Choose seat 12A
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold">Ticket QR</span>
          <BadgeCheck className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-4">
          <QrGrid compact />
          <div>
            <p className="text-sm font-bold text-foreground">Confirmed</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Volcano Express, seat 12A, Kigali to Musanze.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UssdMockup() {
  return (
    <div className="mx-auto max-w-sm rounded-[2rem] border border-white/20 bg-[#020617] p-5 shadow-2xl">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-sm font-bold text-white/70">Feature phone</span>
        <span className="flex items-center gap-1 text-xs font-semibold text-[#9BE8FF]">
          <CircleDot className="h-3 w-3 fill-[#9BE8FF]" />
          USSD
        </span>
      </div>
      <div className="rounded-2xl bg-[#D9F99D] p-5 font-mono text-sm leading-7 text-foreground">
        <p>*Tega*</p>
        <p>1. Book bus</p>
        <p>2. Check ticket</p>
        <p>3. Bus status</p>
        <p className="mt-4">Reply: _</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
          <span
            key={key}
            className="flex h-9 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white"
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  );
}

function RouteMap() {
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-[1.7rem] border border-[#D7F4FF] bg-accent p-5">
      <div className="absolute inset-0 grid-bg opacity-80" />
      <svg
        role="img"
        aria-labelledby="route-map-title"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 820 420"
      >
        <title id="route-map-title">
          Route from Kigali to Rulindo to Musanze
        </title>
        <path
          d="M110 310 C250 220 330 330 430 210 C520 100 640 150 720 82"
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M110 310 C250 220 330 330 430 210 C520 100 640 150 720 82"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.circle
          r="17"
          fill="var(--primary)"
          initial={{ cx: 110, cy: 310 }}
          whileInView={{ cx: 430, cy: 210 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.25 }}
        />
      </svg>
      <MapLabel className="left-[8%] top-[70%]" label="Kigali" />
      <MapLabel className="left-[47%] top-[46%]" label="Rulindo" active />
      <MapLabel className="right-[8%] top-[16%]" label="Musanze" />
      <div className="absolute bottom-5 left-5 rounded-2xl bg-white/85 px-4 py-3 text-sm font-bold text-primary shadow-sm backdrop-blur">
        Kigali {">"} Rulindo {">"} Musanze
      </div>
    </div>
  );
}

function MapLabel({
  label,
  className,
  active = false,
}: {
  label: string;
  className: string;
  active?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border bg-white px-4 py-3 text-sm font-bold shadow-sm ${className} ${
        active
          ? "border-primary text-primary"
          : "border-border text-muted-foreground"
      }`}
    >
      <MapPin className="mr-2 inline h-4 w-4" />
      {label}
    </div>
  );
}

function MvpCard({
  title,
  description,
  icon: Icon,
  accent,
}: IconContent & { accent: string }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="glass-card rounded-[2rem] p-6"
    >
      <div
        className={`mb-8 flex h-16 w-16 items-center justify-center rounded-3xl ${accent}`}
      >
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {description}
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary">
        <Check className="h-4 w-4" />
        Ready for validation
      </div>
    </motion.article>
  );
}

function SupportCard({ title, description, icon: Icon }: IconContent) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur transition-colors hover:bg-white/15"
    >
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/70">{description}</p>
    </motion.article>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
  onClick,
}: ButtonLinkProps) {
  const styles = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 ",
    secondary:
      "border border-border bg-white text-foreground shadow-sm hover:border-primary/60 hover:bg-background",
    light: "bg-white text-primary shadow-lg shadow-black/10 hover:bg-accent",
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-sm px-6 text-sm font-bold transition-colors ${styles[variant]}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </motion.a>
  );
}
