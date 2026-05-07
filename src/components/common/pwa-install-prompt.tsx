"use client";

import { Download, EllipsisVertical, Plus, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useInstallPrompt } from "@/lib/pwa/install-prompt";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "tega-pwa-install-dismissed";

function isMobileDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
}

function isIosDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const isTouchMac =
    platform === "MacIntel" && window.navigator.maxTouchPoints > 1;

  return /iPad|iPhone|iPod/.test(userAgent) || isTouchMac;
}

export function PWAInstallPrompt() {
  const { canInstall, isAppInstalled, promptInstall } = useInstallPrompt();
  const [isMobile, setIsMobile] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setIsIos(isIosDevice());
    setIsDismissed(sessionStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  if (isAppInstalled || isDismissed || !isMobile) {
    return null;
  }

  function dismissPrompt() {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setIsDismissed(true);
  }

  async function handleInstall() {
    const outcome = await promptInstall();

    if (outcome !== "unavailable") {
      dismissPrompt();
    }
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] md:hidden">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_80px_rgba(15,23,42,0.22)]">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Download className="size-5" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Install Tega
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  Open bookings faster from your home screen.
                </p>
              </div>

              <button
                type="button"
                onClick={dismissPrompt}
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Dismiss install prompt"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {canInstall ? (
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  onClick={handleInstall}
                  className="h-10 flex-1 rounded-full"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Install
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={dismissPrompt}
                  className={cn("h-10 rounded-full px-4 text-slate-600")}
                >
                  Later
                </Button>
              </div>
            ) : (
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  {isIos ? (
                    <Share2
                      className="size-4 text-slate-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <EllipsisVertical
                      className="size-4 text-slate-500"
                      aria-hidden="true"
                    />
                  )}
                  <span>{isIos ? "Tap Share" : "Open browser menu"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plus className="size-4 text-slate-500" aria-hidden="true" />
                  <span>Add to Home Screen</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
