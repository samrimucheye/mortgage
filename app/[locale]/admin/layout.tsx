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

  // Force RTL for the dashboard regardless of website language
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 flex text-slate-900 transition-none font-hebrew">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 ml-0 md:mr-64 relative overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
