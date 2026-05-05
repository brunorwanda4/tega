import type { Metadata } from "next";
import "./globals.css";
import {
  fontBricolage,
  fontGeistMono,
  fontGeistSans,
  fontInter,
} from "@/lib/fonts/fonts";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Tega - Bus Booking and Tracking MVP for Rwanda",
    template: "%s | Tega",
  },

  description:
    "Tega helps passengers in Rwanda find buses, book seats, pay, receive digital tickets, and track bus status through a PWA or USSD.",

  applicationName: "Tega",

  keywords: [
    "Tega",
    "Rwanda transport app",
    "bus booking Rwanda",
    "public transport Rwanda",
    "Kigali bus app",
    "pay bus Rwanda",
    "smart transport Rwanda",
  ],

  authors: [{ name: "Bruno Rwanda" }],

  creator: "Bruno Rwanda",
  publisher: "Tega",

  icons: [
    {
      url: "/light-logo.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/dark-logo.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],

  openGraph: {
    title: "Tega - Bus Booking and Tracking MVP for Rwanda",
    description:
      "Find buses, book seats, pay, receive digital tickets, and track bus status through a PWA or USSD.",
    url: "https://tega.app",
    siteName: "Tega",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tega Transport App",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tega - Bus Booking and Tracking MVP for Rwanda",
    description:
      "The easy way to book and track buses in Rwanda through a PWA or USSD.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="white" lang="en" className={cn("", fontInter.variable)}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tega" />
      </head>
      <body
        className={`${fontGeistSans.variable} ${fontGeistMono.variable} ${fontBricolage.variable} ${fontInter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
