import { ArrowRight, BusFront, Home, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,var(--accent)_0%,rgba(255,255,255,0)_70%)]" />

      <section className="section-shell relative">
        <Empty className="mx-auto max-w-2xl border border-border bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Image
              src="/light-logo.svg"
              alt=""
              width={36}
              height={36}
              priority
            />
            <span className="text-lg font-semibold tracking-tight">Tega</span>
          </div>

          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX aria-hidden="true" />
            </EmptyMedia>
            <p className="text-5xl font-mono font-semibold text-primary">404</p>
            <EmptyTitle className="text-3xl font-semibold sm:text-4xl">
              Route not found
            </EmptyTitle>
            <EmptyDescription>
              This page is not available. Return home or open the mobile app to
              continue booking and tracking buses.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/">
                  <Home data-icon="inline-start" aria-hidden="true" />
                  Go home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/app">
                  Open app
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
              <BusFront aria-hidden="true" />
              <span>
                Kigali routes, bookings, and tickets stay one tap away.
              </span>
            </div>
          </EmptyContent>
        </Empty>
      </section>
    </main>
  );
}
