import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full">
        <div className="max-w-7xl mx-auto  ">{children}</div>
      </main>
      <Analytics />
      <Footer />
    </div>
  );
}
