'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, Users, UserPlus, Calculator, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('Admin.Sidebar');

  const menuItems = [
    { name: t('dashboard'), href: '/admin', icon: LayoutDashboard },
    { name: t('crm'), href: '/admin/clients', icon: Users },
    { name: t('leads'), href: '/admin/leads', icon: UserPlus },
    { name: t('builder'), href: '/admin/mix-builder', icon: Calculator },
  ];

  return (
    <aside className="fixed top-0 start-0 w-64 h-full bg-white border-e border-slate-200 shadow-sm z-50 flex flex-col hidden md:flex text-slate-900">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 text-white flex justify-center items-center font-bold font-serif">M</div>
        <span className="font-bold text-xl text-slate-900">MortgagePro</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href as any}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 hover:bg-slate-50 transition-all text-start">
          <Settings size={20} className="text-slate-400" />
          <span>{t('settings')}</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-all text-start">
          <LogOut size={20} className="text-red-400" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}
