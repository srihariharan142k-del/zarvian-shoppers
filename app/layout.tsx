import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {

  title:
    "Zarvian Store 🧸 | Premium Toys & Gifts",

  description:
    "Shop premium toys, diecast cars, kids gifts, teddy bears and more with fast delivery across India.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en" suppressHydrationWarning>

      <body className="transition-colors duration-500">

        <Navbar />

        {children}

      </body>

    </html>
  );
}