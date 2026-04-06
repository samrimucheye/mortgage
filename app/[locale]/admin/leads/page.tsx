'use client';

import { useAdminStore } from '@/store/useAdminStore';
import { useState, useEffect } from 'react';
import { UserPlus, UserCheck, MessageSquare } from 'lucide-react';

export default function LeadsPage() {
  const { leads, updateLeadStatus, convertLeadToClient, fetchData, loading } = useAdminStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
    if (leads.length === 0) fetchData();
  }, []);

  if (!mounted || loading) return <div className="p-10 text-center animate-pulse text-slate-500">טוען פניות נכנסות...</div>;

  const handleConvert = (leadId: string) => {
    if (confirm('האם להמיר ליד זה ללקוח חדש (CRM)?')) {
      convertLeadToClient(leadId, { income: 0, equity: 0, propertyValue: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">לידים נכנסים</h1>
        <p className="text-slate-500">ניהול פניות מהאתר והמרתן ללקוחות פעילים.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {leads.filter(l => l.status !== 'converted').map(lead => (
          <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{lead.name}</h3>
                <p className="text-slate-500 text-sm" dir="ltr">
                  {lead.createdAt ? `${new Date(lead.createdAt).toLocaleDateString('he-IL')} ${new Date(lead.createdAt).toLocaleTimeString('he-IL', {hour: '2-digit', minute:'2-digit'})}` : 'תאריך חסר'}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.status === 'new' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                {lead.status === 'new' ? 'חדש' : 'נוצר קשר'}
              </span>
            </div>

            <div className="space-y-2 mb-6 flex-grow">
              <p className="text-slate-700 font-medium">{lead.phone}</p>
              {lead.email && <p className="text-slate-600 text-sm">{lead.email}</p>}
              {lead.message && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 border border-slate-100 flex gap-2">
                  <MessageSquare size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p>{lead.message}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-slate-100 pt-4 mt-auto">
              {lead.status === 'new' && (
                <button 
                  onClick={() => updateLeadStatus(lead._id || lead.id || '', 'contacted')}
                  className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium py-2 rounded-lg transition text-sm flex items-center justify-center gap-2"
                >
                  <UserCheck size={16} />
                  סמן כטופל
                </button>
              )}
              <button 
                onClick={() => handleConvert(lead._id || lead.id || '')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <UserPlus size={16} />
                המר ללקוח
              </button>
            </div>
          </div>
        ))}

        {leads.filter(l => l.status !== 'converted').length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
            אין לידים חדשים הממתינים לטיפול.
          </div>
        )}
      </div>
    </div>
  );
}
