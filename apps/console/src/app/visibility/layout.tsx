import { Sidebar } from "@/components/visibility/sidebar";
import { Topbar } from "@/components/visibility/topbar";
import { getServerSession } from "@/lib/session";
import { listBrandsByUserId } from "@/lib/scraper-store";
import { redirect } from "next/navigation";

export default async function VisibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const brands = await listBrandsByUserId(session.user.id);
  if (brands.length === 0) redirect("/onboarding");

  return (
    <div className="flex h-screen bg-[#f0f4fa] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
