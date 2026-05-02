import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="pt-40 flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-semibold mb-5">
        Join the Community of Sellers and Buyers
      </h1>
      <div className="flex flex-row gap-2">
        <Link href="/seller-register">
          <Button variant="redoutline" size="large">
            Become a Seller
          </Button>
        </Link>
        <Link href="/buyer-register">
          <Button variant="whitebggray" size="large">
            Become a Buyer
          </Button>
        </Link>
      </div>
    </div>
  );
}
