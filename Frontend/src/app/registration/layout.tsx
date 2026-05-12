import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register for The Great Muranga Community Run. Choose your race category and complete your participant details online.",
  alternates: {
    canonical: "/registration",
  },
  openGraph: {
    title: "Registration | The Great Muranga Community Run",
    description:
      "Register for The Great Muranga Community Run. Choose your race category and complete your participant details online.",
    url: "/registration",
  },
  twitter: {
    title: "Registration | The Great Muranga Community Run",
    description:
      "Register for The Great Muranga Community Run. Choose your race category and complete your participant details online.",
  },
  keywords: [
    "Muranga run registration",
    "register Muranga community run",
    "community race Kenya",
  ],
};

export default function RegistrationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
