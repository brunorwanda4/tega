import type { Metadata } from "next";
import "./globals.css";
import { fontBiryani, fontCalSans, fontInter } from "@/lib/fonts/fonts";

export const metadata: Metadata = {
  title: {
    default: "Tega – Smart Bus Transport in Rwanda",
    template: "%s | Tega",
  },

  description:
    "Tega is a smart transport app in Rwanda that helps you find available buses, request pickups, track routes, and pay for your ride directly from your phone.",

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
    title: "Tega – Smart Bus Transport in Rwanda",
    description:
      "Find buses, request pickup, track routes, and pay for transport easily using Tega.",
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
    title: "Tega – Smart Bus Transport in Rwanda",
    description:
      "The easy way to find buses, request rides, and pay for transport in Rwanda.",
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
    <html lang="en">
      <body
        className={`${fontBiryani.variable} ${fontInter.variable} ${fontCalSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
