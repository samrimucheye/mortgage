'use client';

import { useState, useRef } from 'react';
import { Plus, Trash2, Save, Download, PieChart as PieChartIcon, User, Building2, Briefcase, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTranslations, useLocale } from 'next-intl';

type TrackType = 'Prime' | 'Fixed Not Indexed' | 'Fixed Indexed' | 'Variable Every 5';

interface LoanTrack {
  id: string;
  type: string;
  amount: number;
  interest: number;
  years: number;
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
const TRACK_TYPES = ['פריים', 'קבועה לא צמודה (קל״צ)', 'קבועה צמודה', 'משתנה כל 5'];

export default function MixBuilderPage() {
  const t = useTranslations('Admin.MixBuilder');
  const locale = useLocale();
  const isRtl = locale === 'he';

  const [tracks, setTracks] = useState<LoanTrack[]>([
    { id: 't1', type: 'פריים', amount: 300000, interest: 5.5, years: 30 }
  ]);
  const [clientName, setClientName] = useState('');
  const [advisorName, setAdvisorName] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const addTrack = () => {
    setTracks([...tracks, { 
      id: Math.random().toString(36).substring(7), 
      type: 'קבועה לא צמודה (קל״צ)', 
      amount: 100000, 
      interest: 4.0, 
      years: 20 
    }]);
  };

  const updateTrack = (id: string, field: keyof LoanTrack, value: any) => {
    setTracks(tracks.map(trk => trk.id === id ? { ...trk, [field]: value } : trk));
  };

  const removeTrack = (id: string) => {
    setTracks(tracks.filter(trk => trk.id !== id));
  };

  const calculateMonthly = (amount: number, interest: number, years: number) => {
    const P = amount;
    const r = (interest / 100) / 12;
    const n = years * 12;
    if (r === 0) return P / n;
    return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const trackData = tracks.map(trk => ({
    ...trk,
    monthlyPayment: calculateMonthly(trk.amount, trk.interest, trk.years)
  }));

  const totalAmount = trackData.reduce((sum, trk) => sum + trk.amount, 0);
  const totalMonthly = trackData.reduce((sum, trk) => sum + trk.monthlyPayment, 0);
  const chartData = trackData.map(trk => ({ name: trk.type, value: trk.amount }));

  const exportToPDF = async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Mortgage_Proposal_${clientName || 'Client'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h1>
          <p className="text-slate-500">{t('subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button 
            disabled={isExporting}
            onClick={exportToPDF}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50"
          >
            <Download size={18} />
            {isExporting ? t('exporting') : t('export_pdf')}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition">
            <Save size={18} />
            {t('save_mix')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Tracks Builder & Client Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <User className="text-blue-600" size={20} />
              {t('client_advisor_details')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">{t('client_name')}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t('client_name_placeholder')} 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 rtl:pr-10 ltr:pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute top-2.5 rtl:right-3 ltr:left-3 text-slate-400">
                    <User size={18} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">{t('advisor_name')}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={advisorName}
                    onChange={(e) => setAdvisorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 rtl:pr-10 ltr:pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute top-2.5 rtl:right-3 ltr:left-3 text-slate-400">
                    <Briefcase size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {trackData.map((trk, i) => (
              <div key={trk.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">{t('track')} {trk.type}</h3>
                  </div>
                  <button onClick={() => removeTrack(trk.id)} className="text-red-400 hover:text-red-600 transition p-2">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{t('track_type')}</label>
                    <select 
                      value={trk.type} 
                      onChange={(e) => updateTrack(trk.id, 'type', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {TRACK_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{t('amount')}</label>
                    <input 
                      type="number" 
                      value={trk.amount} 
                      onChange={(e) => updateTrack(trk.id, 'amount', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{t('interest')}</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={trk.interest} 
                      onChange={(e) => updateTrack(trk.id, 'interest', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{t('years')}</label>
                    <input 
                      type="number" 
                      value={trk.years} 
                      onChange={(e) => updateTrack(trk.id, 'years', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-left"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                  <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-3">
                    <span className="text-sm text-slate-500">{t('est_monthly')}</span>
                    <span className="font-bold text-slate-900 text-lg">₪{Math.round(trk.monthlyPayment).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={addTrack}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-medium hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              <Plus size={20} />
              {t('add_track')}
            </button>
          </div>
        </div>

        {/* Right Side: Visuals & Totals */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
              <PieChartIcon className="text-blue-600" />
              {t('mix_summary')}
            </h3>

            <div className="mb-8 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `₪${Number(value).toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                <span className="text-slate-500">{t('total_loan')}</span>
                <span className="font-bold text-2xl text-slate-900">₪{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end pb-3">
                <span className="text-slate-500">{t('start_monthly')}</span>
                <span className="font-bold text-3xl text-blue-600">₪{Math.round(totalMonthly).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* HIDDEN PRINT TILE TEMPLATE */}
      <div className="absolute top-0 left-[9999px] -z-50 opacity-0 pointer-events-none">
        <div ref={printRef} className="font-sans w-[210mm] min-h-[297mm]" dir={isRtl ? 'rtl' : 'ltr'} style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '3rem' }}>
          <div className="flex justify-between items-center pb-8 mb-10" style={{ borderBottom: '4px solid #2563eb' }}>
            <div>
              <h2 className="text-4xl font-bold mb-2" style={{ color: '#2563eb' }}>MortgagePRO</h2>
              <p className="text-lg" style={{ color: '#64748b' }}>{t('pdf_advisor_title')}</p>
            </div>
            <div className="text-left ltr" dir="ltr">
              <div className="text-2xl font-bold" style={{ color: '#0f172a' }}>{new Date().toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-US')}</div>
              <div className="font-medium" style={{ color: '#64748b' }}>{t('pdf_proposal')}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-12">
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>{t('pdf_client_details')}</h4>
              <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{clientName || t('pdf_not_filled')}</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>{t('pdf_advisor_label')}</h4>
              <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{advisorName || t('pdf_not_filled')}</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 rounded-full" style={{ backgroundColor: '#2563eb' }} />
              {t('pdf_mix_summary_title')}
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl" style={{ backgroundColor: '#2563eb', color: '#ffffff' }}>
                <p className="mb-1 text-sm" style={{ color: '#dbeafe' }}>{t('pdf_total_loan')}</p>
                <p className="text-3xl font-bold">₪{totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                <p className="mb-1 text-sm" style={{ color: '#94a3b8' }}>{t('pdf_start_monthly')}</p>
                <p className="text-3xl font-bold">₪{Math.round(totalMonthly).toLocaleString()}</p>
              </div>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <p className="mb-1 text-sm" style={{ color: '#64748b' }}>{t('pdf_tracks_count')}</p>
                <p className="text-3xl font-bold">{tracks.length}</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 rounded-full" style={{ backgroundColor: '#2563eb' }} />
              {t('pdf_track_details_title')}
            </h3>
            <table className="w-full text-right border-collapse" dir={isRtl ? 'rtl' : 'ltr'} style={{ textAlign: isRtl ? 'right' : 'left' }}>
              <thead>
                <tr className="uppercase text-sm" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                  <th className="p-4">{t('pdf_th_track')}</th>
                  <th className="p-4">{t('pdf_th_amount')}</th>
                  <th className="p-4 text-center">{t('pdf_th_interest')}</th>
                  <th className="p-4 text-center">{t('pdf_th_years')}</th>
                  <th className="p-4">{t('pdf_th_monthly')}</th>
                </tr>
              </thead>
              <tbody>
                {trackData.map((trk) => (
                  <tr key={trk.id} className="text-lg font-medium" style={{ borderBottom: '1px solid #f1f5f9', color: '#0f172a' }}>
                    <td className="p-4 font-bold">{trk.type}</td>
                    <td className="p-4">₪{trk.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">{trk.interest}%</td>
                    <td className="p-4 text-center">{trk.years}</td>
                    <td className="p-4 font-bold" style={{ color: '#2563eb' }}>₪{Math.round(trk.monthlyPayment).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-16 text-center text-sm" style={{ borderTop: '1px solid #f1f5f9', color: '#64748b' }}>
            <p className="mb-2 font-bold" style={{ color: '#0f172a' }}>{t('pdf_notice')}</p>
            <p>© {new Date().getFullYear()} MortgagePro - {t('pdf_copyright')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
