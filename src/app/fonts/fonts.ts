import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google";

export const fontBricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const fontGeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const fontGeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
