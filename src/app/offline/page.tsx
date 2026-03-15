"use client";
import Image from "next/image";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-10 py-10 bg-background">
      <div className="flex flex-col items-center gap-8 max-w-md text-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            priority
            src="/light-logo.svg"
            alt="Tega Logo"
            width={40}
            height={40}
          />
          <h1 className="font-cal-sans text-4xl">Tega</h1>
        </div>

        {/* Offline Icon */}
        <div className="relative">
          <svg
            className="w-24 h-24 text-neutral"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-24 bg-error rotate-45 rounded-full" />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-3xl text-base-content">
            You're Offline
          </h2>
          <p className="text-neutral text-base leading-relaxed">
            Tega requires an internet connection to function. Please check your
            network settings and try again.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-sm text-neutral">No connection</span>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary px-8 py-3 rounded-full font-medium"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
