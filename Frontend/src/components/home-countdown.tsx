"use client";

import { usePathname } from "next/navigation";
import CountdownBanner from "@/components/countdown-banner";

export default function HomeCountdown() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return <CountdownBanner />;
}
