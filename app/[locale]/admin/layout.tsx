import { setRequestLocale } from "next-intl/server";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  // The root layout handles the HTML dir attribute (ltr/rtl).
  // We use Tailwind logical properties (e.g. md:ms-64) for dynamic margins.
  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 transition-none font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 ms-0 md:ms-64 relative overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
