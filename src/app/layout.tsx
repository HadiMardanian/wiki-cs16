import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppShell } from "@/components/app-shell/AppShell";

const csMono = JetBrains_Mono({
  variable: "--font-cs-mono",
  subsets: ["latin"],
});

const csPixel = Press_Start_2P({
  variable: "--font-cs-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CS 1.6 Config Wiki",
  description: "A Counter-Strike 1.6-style configuration documentation hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${csMono.variable} ${csPixel.variable} antialiased`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
