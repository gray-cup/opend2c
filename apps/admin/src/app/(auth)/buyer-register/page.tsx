"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ROLE_OPTIONS = [
  "Procurement Manager",
  "Cafe Owner",
  "Restaurant Owner",
  "Hotel & Hospitality",
  "Roaster",
  "Retailer",
  "Distributor",
  "Food & Beverage Consultant",
  "Company Owner",
  "Middleman",
  "Exporter",
  "Importer",
  "Trader",
  "Wholesaler",
  "Brand Owner",
];

const COUNTRY_OPTIONS = [
  "India",
  "China",
  "Kenya",
  "Sri Lanka",
  "Vietnam",
  "Indonesia",
  "Ethiopia",
  "Japan",
  "Taiwan",
  "Nepal",
  "Bangladesh",
  "Uganda",
  "Tanzania",
  "Colombia",
  "Brazil",
  "United States",
  "United Kingdom",
  "Germany",
  "Australia",
  "Canada",
];

function ComboField({
  id,
  label,
  placeholder,
  options,
  isTextarea,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  isTextarea?: boolean;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = value
    ? options.filter((o) => o.toLowerCase().includes(value.toLowerCase()))
    : options;

  useEffect(() => {
    setActiveIndex(0);
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      setValue(filtered[activeIndex]);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="space-y-1.5" ref={containerRef}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={id}
            rows={1}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
        ) : (
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        )}
        {open && filtered.length > 0 && (
          <ul
            ref={listRef}
            className="absolute z-10 mt-1 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-md"
            style={{ maxHeight: "11rem" }}
          >
            {filtered.map((option, i) => (
              <li key={option}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setValue(option);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm text-neutral-700 transition-colors",
                    i === activeIndex
                      ? "bg-neutral-100 font-medium text-neutral-900"
                      : "hover:bg-neutral-50",
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function BuyerRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/onboarding");
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Create a buyer account
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Source tea, coffee, and more on Open D2C.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <ComboField
          id="role"
          label="Your role"
          placeholder="Describe your role..."
          options={ROLE_OPTIONS}
          isTextarea
        />

        <ComboField
          id="country"
          label="Country"
          placeholder="Where are you based?"
          options={COUNTRY_OPTIONS}
        />

        <Button type="submit" className="w-full mt-2" variant="black">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-neutral-400">
        Already have an account?{" "}
        <a href="/login" className="underline text-neutral-600">
          Sign in
        </a>
      </p>
    </div>
  );
}
