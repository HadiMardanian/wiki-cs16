"use client";

import React from "react";
import { CursorProvider } from "@/components/CursorProvider";
import { AppShell } from "@/components/AppShell";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <AppShell>{children}</AppShell>
    </CursorProvider>
  );
}

