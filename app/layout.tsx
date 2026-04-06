import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/bpg_nino_mtavruli_bold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bpg_nino_mtavruli_bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-myfont",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dopamine Energy",
  description: "Georgian Energy Drink Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${myFont.className}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
