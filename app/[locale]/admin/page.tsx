'use client';

import { useAdminStore } from '@/store/useAdminStore';
import { useEffect, useState } from 'react';
import { Users, FileText, CheckCircle, TrendingUp, Calculator } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function AdminDashboardPage() {
  const { clients, leads, fetchData, loading } = useAdminStore();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Admin.Dashboard');

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  if (!mounted || loading) return <div className="p-10 text-center animate-pulse text-slate-500">טוען נתונים...</div>;

  const closedDeals = clients.filter(c => c.status === 'נסגר').length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  const getStatusTranslation = (status: string) => {
    if (status === 'חדש') return t('status_new');
    if (status === 'בתהליך') return t('status_in_progress');
    if (status === 'אושר') return t('status_approved');
    if (status === 'נסגר') return t('status_completed');
    return status;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">{t('title')}</h1>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
          {t('connected_as')} <span className="font-bold text-slate-900">{t('role_admin')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{t('active_clients')}</p>
            <p className="text-2xl font-bold text-slate-900">{clients.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{t('closed_deals')}</p>
            <p className="text-2xl font-bold text-slate-900">{closedDeals}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{t('new_leads')}</p>
            <p className="text-2xl font-bold text-slate-900">{newLeads}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{t('revenue')}</p>
            <p className="text-2xl font-bold text-slate-900">₪{(closedDeals * 7500).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Links / Actions */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-900">{t('fast_actions')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/mix-builder" className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 border border-blue-100">
              <Calculator size={32} />
              <span className="font-bold text-lg">{t('new_builder')}</span>
            </Link>
            <Link href="/admin/clients" className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 border border-slate-200">
              <Users size={32} />
              <span className="font-bold text-lg">{t('manage_clients')}</span>
            </Link>
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">{t('recent_clients')}</h2>
            <Link href="/admin/clients" className="text-blue-600 text-sm hover:underline">{t('all_clients')}</Link>
          </div>
          <div className="space-y-4">
            {clients.slice(0, 3).map(client => (
              <div key={client.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
                <div>
                  <p className="font-bold text-slate-900">{client.name}</p>
                  <p className="text-sm text-slate-500">{client.phone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  client.status === 'חדש' ? 'bg-amber-100 text-amber-700' :
                  client.status === 'בתהליך' ? 'bg-blue-100 text-blue-700' :
                  client.status === 'אושר' ? 'bg-purple-100 text-purple-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {getStatusTranslation(client.status)}
                </span>
              </div>
            ))}
            {clients.length === 0 && <p className="text-slate-500 text-center py-4">{t('no_clients')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
