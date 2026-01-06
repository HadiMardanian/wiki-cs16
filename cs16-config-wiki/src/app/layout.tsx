import type { Metadata } from "next";
import { Press_Start_2P, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/components/RootProviders";

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CS 1.6 Config Wiki",
  description: "Counter-Strike 1.6 configuration documentation hub (GoldSrc vibe).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixel.variable} ${mono.variable} antialiased cursor-knife`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
