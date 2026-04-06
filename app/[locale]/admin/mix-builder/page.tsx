'use client';

import { useState, useRef } from 'react';
import { Plus, Trash2, Save, Download, PieChart as PieChartIcon, User, Building2, Briefcase, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type TrackType = 'פריים' | 'קבועה לא צמודה (קל״צ)' | 'קבועה צמודה' | 'משתנה כל 5';

interface LoanTrack {
  id: string;
  type: TrackType;
  amount: number;
  interest: number;
  years: number;
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
const TRACK_TYPES: TrackType[] = ['פריים', 'קבועה לא צמודה (קל״צ)', 'קבועה צמודה', 'משתנה כל 5'];

export default function MixBuilderPage() {
  const [tracks, setTracks] = useState<LoanTrack[]>([
    { id: 't1', type: 'פריים', amount: 300000, interest: 5.5, years: 30 }
  ]);
  const [clientName, setClientName] = useState('');
  const [advisorName, setAdvisorName] = useState('יועץ מומחה');
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
    setTracks(tracks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const removeTrack = (id: string) => {
    setTracks(tracks.filter(t => t.id !== id));
  };

  const calculateMonthly = (amount: number, interest: number, years: number) => {
    const P = amount;
    const r = (interest / 100) / 12;
    const n = years * 12;
    if (r === 0) return P / n;
    return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const trackData = tracks.map(t => ({
    ...t,
    monthlyPayment: calculateMonthly(t.amount, t.interest, t.years)
  }));

  const totalAmount = trackData.reduce((sum, t) => sum + t.amount, 0);
  const totalMonthly = trackData.reduce((sum, t) => sum + t.monthlyPayment, 0);
  const chartData = trackData.map(t => ({ name: t.type, value: t.amount }));

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">בונה תמהיל</h1>
          <p className="text-slate-500">סימולטור משכנתא מלא עבור בניית המסלולים והריביות ללקוח.</p>
        </div>
        <div className="flex gap-3">
          <button 
            disabled={isExporting}
            onClick={exportToPDF}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50"
          >
            <Download size={18} />
            {isExporting ? 'מייצא...' : 'יצא ל-PDF'}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition">
            <Save size={18} />
            שמור תמהיל
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Tracks Builder & Client Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <User className="text-blue-600" size={20} />
              פרטי הלקוח והיועץ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">שם הלקוח</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="הכנס שם מלא..." 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">שם היועץ</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={advisorName}
                    onChange={(e) => setAdvisorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Briefcase className="absolute left-3 top-2.5 text-slate-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {trackData.map((track, i) => (
              <div key={track.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">מסלול {track.type}</h3>
                  </div>
                  <button onClick={() => removeTrack(track.id)} className="text-red-400 hover:text-red-600 transition p-2">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">סוג מסלול</label>
                    <select 
                      value={track.type} 
                      onChange={(e) => updateTrack(track.id, 'type', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {TRACK_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">סכום (₪)</label>
                    <input 
                      type="number" 
                      value={track.amount} 
                      onChange={(e) => updateTrack(track.id, 'amount', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">ריבית (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={track.interest} 
                      onChange={(e) => updateTrack(track.id, 'interest', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">שנים</label>
                    <input 
                      type="number" 
                      value={track.years} 
                      onChange={(e) => updateTrack(track.id, 'years', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                  <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-3">
                    <span className="text-sm text-slate-500">החזר משוער למסלול זה:</span>
                    <span className="font-bold text-slate-900 text-lg">₪{Math.round(track.monthlyPayment).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={addTrack}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-medium hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              <Plus size={20} />
              הוסף מסלול חדש לתמהיל
            </button>
          </div>
        </div>

        {/* Right Side: Visuals & Totals */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
              <PieChartIcon className="text-blue-600" />
              סיכום התמהיל
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
                <span className="text-slate-500">סך הלוואה מבוקש:</span>
                <span className="font-bold text-2xl text-slate-900">₪{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end pb-3">
                <span className="text-slate-500">החזר חודשי התחלתי:</span>
                <span className="font-bold text-3xl text-blue-600">₪{Math.round(totalMonthly).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* HIDDEN PRINT TILE TEMPLATE */}
      <div className="hidden">
        <div ref={printRef} className="bg-white p-12 text-slate-900 font-sans rtl w-[210mm] min-h-[297mm]">
          <div className="flex justify-between items-center border-b-4 border-blue-600 pb-8 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-blue-600 mb-2">MortgagePRO</h2>
              <p className="text-slate-500 text-lg">תכנון פיננסי ויועץ משכנתאות מומחה</p>
            </div>
            <div className="text-left ltr">
              <div className="text-2xl font-bold text-slate-900">{new Date().toLocaleDateString('he-IL')}</div>
              <div className="text-slate-500 font-medium">הצעה למשכנתא #1024</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-12">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">פרטי לקוח</h4>
              <p className="text-2xl font-bold text-slate-900">{clientName || 'טרם מולא שם'}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">יועץ מלווה</h4>
              <p className="text-2xl font-bold text-slate-900">{advisorName}</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              סיכום התמהיל המוצע
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-600 text-white p-6 rounded-2xl">
                <p className="text-blue-100 mb-1 text-sm">סך ההלוואה</p>
                <p className="text-3xl font-bold">₪{totalAmount.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <p className="text-slate-400 mb-1 text-sm">החזר חודשי התחלתי</p>
                <p className="text-3xl font-bold">₪{Math.round(totalMonthly).toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-500 mb-1 text-sm">מספר מסלולים</p>
                <p className="text-3xl font-bold">{tracks.length}</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              פירוט מסלולים
            </h3>
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-sm">
                  <th className="p-4 rounded-r-xl">מסלול</th>
                  <th className="p-4">סכום</th>
                  <th className="p-4 text-center">ריבית</th>
                  <th className="p-4 text-center">שנים</th>
                  <th className="p-4 rounded-l-xl text-left">החזר חודשי</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trackData.map((t) => (
                  <tr key={t.id} className="text-lg font-medium text-slate-900">
                    <td className="p-4 font-bold">{t.type}</td>
                    <td className="p-4">₪{t.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">{t.interest}%</td>
                    <td className="p-4 text-center">{t.years}</td>
                    <td className="p-4 text-left font-bold text-blue-600">₪{Math.round(t.monthlyPayment).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-16 border-t border-slate-100 text-center text-slate-500 text-sm">
            <p className="mb-2 font-bold text-slate-900">יש לשים לב: הצעה זו הינה סימולציה בלבד ובכפוף לאישור סופי של הבנק המלווה.</p>
            <p>© {new Date().getFullYear()} MortgagePro - ייעוץ משכנתאות מקצועי</p>
          </div>
        </div>
      </div>
    </div>
  );
}
