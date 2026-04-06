'use client';

import { useAdminStore } from '@/store/useAdminStore';
import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit } from 'lucide-react';

export default function ClientsCRMPage() {
  const { clients, deleteClient, fetchData, loading } = useAdminStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { 
    setMounted(true);
    if (clients.length === 0) fetchData();
  }, []);

  if (!mounted || loading) return <div className="p-10 text-center animate-pulse text-slate-500">טוען לקוחות...</div>;

  const filteredClients = clients.filter(c => 
    c.name.includes(searchQuery) || c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">ניהול לקוחות</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition">
          <Plus size={20} />
          לקוח חדש
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="חיפוש לפי שם או טלפון..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 text-sm">
              <tr>
                <th className="p-4">שם הלקוח</th>
                <th className="p-4">קשר</th>
                <th className="p-4">הכנסה / הון</th>
                <th className="p-4">שווי נכס</th>
                <th className="p-4">סטטוס</th>
                <th className="p-4 text-center">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-medium text-slate-900">{client.name}</td>
                  <td className="p-4 text-sm text-slate-600">
                    <div>{client.phone}</div>
                    <div className="text-xs text-slate-400">{client.email}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    <div>₪{client.income.toLocaleString()} הכנסה</div>
                    <div>₪{client.equity.toLocaleString()} הון</div>
                  </td>
                  <td className="p-4 font-medium text-slate-900">₪{client.propertyValue.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.status === 'חדש' ? 'bg-amber-100 text-amber-700' :
                      client.status === 'בתהליך' ? 'bg-blue-100 text-blue-700' :
                      client.status === 'אושר' ? 'bg-purple-100 text-purple-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition bg-white border border-slate-200 rounded-lg shadow-sm">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => deleteClient(client._id || client.id || '')} className="p-2 text-slate-400 hover:text-red-600 transition bg-white border border-slate-200 rounded-lg shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    לא נמצאו לקוחות.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
