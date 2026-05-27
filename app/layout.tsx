import "./globals.css";

import type { Metadata } from "next";

import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Zarvian Shoppers",
  description: "Premium Shopping Website",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <CartProvider>

          {children}

        </CartProvider>

      </body>
    </html>
  );
}