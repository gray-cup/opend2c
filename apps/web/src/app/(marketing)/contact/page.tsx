"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Tier = {
  name: string;
  description: string;
  cta: string;
  ctaVariant?: "default" | "blue" | "red";
  features: string[];
  flagText?: string;
};

/* ---------- Single borderless plan column ---------- */
function PricingCard({
  tier,
  columnRef,
}: {
  tier: Tier;
  columnRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={columnRef} className="relative">
      <Card className="p-0 shadow-none border-0 rounded-none bg-white">
        <div className="flex flex-col">
          <CardHeader className="pt-4">
            <CardTitle className="text-lg font-semibold">{tier.name}</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex w-full flex-col items-start gap-4 pb-4 px-6">
              <div className="mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral-700">{tier.description}</p>
                </div>
              </div>
              <Button
                className="w-full h-10 rounded-lg"
                variant={tier.ctaVariant ?? "default"}
              >
                {tier.cta}
              </Button>
            </div>

            <Separator className="my-5" />

            <ul className="mt-4 flex flex-col gap-4 px-6 pb-4 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  #<span>{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

// tracking-[-0.15rem] for dollars and money

/* ---------- Example data ---------- */
const tiers: Tier[] = [
  {
    name: "General Enquires",
    description: "We usually respond within 48 hours.",
    cta: "Send Mail",
    ctaVariant: "blue",
    features: ["office@graycup.org"],
  },
  {
    name: "Legal & Compliance",
    description: "We usually respond within 48 hours.",
    cta: "Send Mail",
    ctaVariant: "red",
    features: ["legal@graycup.org"],
  },
  {
    name: "Marketing & PR",
    description: "We usually respond within 48 hours.",
    cta: "Send Mail",
    features: ["marketing@graycup.org"],
  },
  {
    name: "Call Us",
    description: "If we miss your call, we'll call you back.",
    cta: "Call Now",
    ctaVariant: "blue",
    features: ["+91 000-work-in-progress"],
  },
];

/* ---------- Page ---------- */
export default function PricingPage() {
  const frameRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Contact Open D2C
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question or you want to do business with Open D2C? There
            is always a way to reach us.
            <br />
            Your message matters.
          </p>
        </div>

        <div className="max-w-6xl flex flex-col md:flex-row justify-center items-center max-md:gap-5 md:justify-between mx-auto">
          <div className="max-w-sm w-full ">
            <Card className="p-0 border border-gray-200 rounded-2xl bg-white">
              <div className="flex flex-col ">
                <CardHeader className="pt-4">
                  <CardTitle className="text-lg font-semibold">
                    Sales & Purchases
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex w-full flex-col items-start gap-4 px-6 pb-4">
                    <div className="mb-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-700">
                          We usually respond within 48 hours.
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full h-10 rounded-lg"
                      variant="lightgray"
                    >
                      Send Mail
                    </Button>
                  </div>

                  <Separator className="my-5" />

                  <ul className="mt-4 flex flex-col gap-4 px-6 pb-8 text-sm">
                    <li className="flex items-start gap-3">
                      <span>#</span>
                      <span>sales@graycup.org</span>
                    </li>
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="flex-col sm:flex-row flex-wrap hidden lg:flex items-center py-4 gap-4 justify-center">
            <Image
              src="/coffee-beans.webp"
              draggable="false"
              alt="coffee beans"
              width="280"
              height="200"
            />
          </div>

          <div className="max-w-sm w-full ">
            <Card className="p-0 border border-gray-200 rounded-2xl bg-white">
              <div className="flex flex-col ">
                <CardHeader className="pt-4">
                  <CardTitle className="text-lg font-semibold">
                    Schedule Zoom Meeting
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex w-full flex-col items-start gap-4 px-6 pb-4">
                    <div className="mb-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-700">
                          Arjun will be attending this meeting.
                        </p>
                      </div>
                    </div>
                    <Button className="w-full h-10 rounded-lg" variant="gray">
                      Schedule
                    </Button>
                  </div>

                  <Separator className="my-5" />

                  <ul className="mt-4 flex flex-col gap-4 px-6 pb-8 text-sm">
                    <li className="flex items-start gap-3">
                      <span>#</span>
                      <span>arjun@graycup.org</span>
                    </li>
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <div className="flex-col sm:flex-row flex-wrap hidden lg:flex items-center gap-4 justify-start">
            <Image
              src="/tea-leaves.svg"
              draggable="false"
              alt="coffee beans"
              width="160"
              height="160"
            />
          </div>
          <div className="flex-col sm:flex-row flex-wrap hidden lg:flex items-center gap-4 justify-end">
            <Image
              src="/tea-leaves.svg"
              draggable="false"
              alt="coffee beans"
              width="160"
              height="160"
            />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10">
          {/* Wrapper must be relative so overlay positions correctly */}
          <div className="relative">
            {/* Framed container can be overflow-hidden now; corners stay clean */}
            <div
              ref={frameRef}
              className="rounded-2xl max-md:max-w-sm max-md:mx-auto border border-gray-200 bg-white overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x divide-gray-200">
                {tiers.map((t) => {
                  return (
                    <div key={t.name} className="relative">
                      <PricingCard tier={t} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* end wrapper */}
        </div>
      </div>
    </div>
  );
}
