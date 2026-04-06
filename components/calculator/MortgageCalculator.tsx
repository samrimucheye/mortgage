'use client';

import {useState, useMemo} from 'react';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

type Track = {
  id: string;
  type: string;
  amount: number;
  interest: number;
  years: number;
};

const TRACK_TYPES = ['פריים', 'קבועה לא צמודה (קל״צ)', 'קבועה צמודה (ק״צ)', 'משתנה צמודה', 'משתנה לא צמודה (מל״צ)'];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function MortgageCalculator() {
  const t = useTranslations('Calculator');

  const [totalLoanAmount, setTotalLoanAmount] = useState(1000000);
  const [monthlyIncome, setMonthlyIncome] = useState(20000);
  const [equity, setEquity] = useState(400000);

  const [tracks, setTracks] = useState<Track[]>([
    { id: '1', type: 'פריים', amount: 330000, interest: 4.5, years: 30 },
    { id: '2', type: 'קבועה לא צמודה (קל״צ)', amount: 330000, interest: 4.8, years: 20 },
    { id: '3', type: 'משתנה לא צמודה (מל״צ)', amount: 340000, interest: 3.5, years: 25 },
  ]);

  const addTrack = () => {
    setTracks([
      ...tracks,
      { id: Date.now().toString(), type: 'פריים', amount: 100000, interest: 4.0, years: 25 }
    ]);
  };

  const removeTrack = (id: string) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter(t => t.id !== id));
    }
  };

  const updateTrack = (id: string, field: keyof Track, value: any) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };


  // Derived computations
  const calculations = useMemo(() => {
    let totalMonthly = 0;
    let totalPayments = 0;
    const tracksTotalAmount = tracks.reduce((sum, t) => sum + t.amount, 0);

    const trackDetails = tracks.map(t => {
      const P = t.amount;
      const r = (t.interest / 100) / 12;
      const n = t.years * 12;
      
      let pmt = 0;
      if (r === 0) {
        pmt = P / n;
      } else {
        pmt = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      
      if (isNaN(pmt) || !isFinite(pmt)) pmt = 0;
      
      totalMonthly += pmt;
      totalPayments += pmt * n;

      return { pmt, totalPaymentForTrack: pmt * n };
    });

    const totalInterest = totalPayments - tracksTotalAmount;
    const pti = monthlyIncome > 0 ? (totalMonthly / monthlyIncome) * 100 : 0;

    return { totalMonthly, totalPayments, totalInterest, pti, tracksTotalAmount };
  }, [tracks, monthlyIncome]);


  // Chart Data preparation
  const pieData = useMemo(() => {
    return tracks.map((t, i) => ({
      name: t.type,
      value: t.amount,
      color: COLORS[i % COLORS.length]
    })).filter(d => d.value > 0);
  }, [tracks]);

  const areaData = useMemo(() => {
    const maxYears = Math.max(0, ...tracks.map(t => t.years));
    const data = [];
    
    for (let y = 0; y <= maxYears; y++) {
      const m = y * 12; // month
      const point: any = { year: y };
      let sumBalance = 0;

      tracks.forEach((t, i) => {
        const P = t.amount;
        const r = (t.interest / 100) / 12;
        const n = t.years * 12;

        let balance = 0;
        if (m < n) {
          if (r === 0) {
            balance = P - (P/n) * m;
          } else {
            balance = P * (Math.pow(1+r, n) - Math.pow(1+r, m)) / (Math.pow(1+r, n) - 1);
          }
        }
        
        balance = Math.max(0, balance);
        point[`track_${i}`] = balance;
        sumBalance += balance;
      });

      point.total = sumBalance;
      data.push(point);
    }
    return data;
  }, [tracks]);

  // Warning if tracks don't add up closely to requested total loan amount
  const isAmountMismatch = Math.abs(calculations.tracksTotalAmount - totalLoanAmount) > 1000;

  return (
    <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto w-full items-start">
      
      {/* LEFT SIDE: Inputs & Tracks */}
      <motion.div 
        initial={{opacity: 0, x: -20}}
        animate={{opacity: 1, x: 0}}
        className="flex-1 w-full flex flex-col gap-6"
      >
        {/* Global Inputs */}
        <div className="bg-card p-6 border border-border rounded-2xl shadow-sm text-card-foreground">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">{t('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">{t('loan_amount')}</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={totalLoanAmount} 
                  onChange={(e) => setTotalLoanAmount(Number(e.target.value))}
                  className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute left-3 top-2.5 text-muted-foreground">₪</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">{t('monthly_income')}</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={monthlyIncome} 
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute left-3 top-2.5 text-muted-foreground">₪</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">{t('equity')}</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={equity} 
                  onChange={(e) => setEquity(Number(e.target.value))}
                  className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute left-3 top-2.5 text-muted-foreground">₪</span>
              </div>
            </div>
          </div>
          
          {isAmountMismatch && (
            <div className="mt-4 flex items-center gap-2 text-amber-600 dark:text-amber-500 text-sm font-medium bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900/50">
              <AlertCircle size={18} />
              <span>שים לב: סך המסלולים (₪{calculations.tracksTotalAmount.toLocaleString()}) אינו תואם לסכום ההלוואה המבוקש.</span>
            </div>
          )}
        </div>

        {/* Tracks Builder */}
        <div className="bg-card p-6 border border-border rounded-2xl shadow-sm text-card-foreground">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold">{t('tracks')}</h3>
            <button 
              onClick={addTrack}
              className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <Plus size={16} /> {t('add_track')}
            </button>
          </div>

          <div className="space-y-6">
            {tracks.map((track, idx) => (
              <div key={track.id} className="relative p-5 bg-background border border-border rounded-xl  transition-all focus-within:ring-1 focus-within:ring-primary">
                
                {tracks.length > 1 && (
                  <button 
                    onClick={() => removeTrack(track.id)}
                    className="absolute top-4 left-4 text-muted-foreground hover:text-destructive transition-colors"
                    title={t('remove_track')}
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">{t('track_type')}</label>
                    <select
                      value={track.type}
                      onChange={(e) => updateTrack(track.id, 'type', e.target.value)}
                      className="w-full bg-transparent border-b border-input py-1 text-sm focus:outline-none focus:border-primary"
                    >
                      {TRACK_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">{t('amount')} (₪{track.amount.toLocaleString()})</label>
                    <input
                      type="number"
                      value={track.amount}
                      onChange={(e) => updateTrack(track.id, 'amount', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-input py-1 text-sm focus:outline-none focus:border-primary font-medium text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">{t('interest')} (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={track.interest}
                      onChange={(e) => updateTrack(track.id, 'interest', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-input py-1 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">{t('years')}</label>
                    <input
                      type="number"
                      value={track.years}
                      onChange={(e) => updateTrack(track.id, 'years', Number(e.target.value))}
                      className="w-full bg-transparent border-b border-input py-1 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </motion.div>


      {/* RIGHT SIDE: Visuals & Outputs */}
      <motion.div 
        initial={{opacity: 0, x: 20}}
        animate={{opacity: 1, x: 0}}
        className="w-full xl:w-[400px] flex flex-col gap-6"
      >
        <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none -translate-y-10 translate-x-10"></div>
          
          <h3 className="text-lg font-medium opacity-90 mb-1">{t('monthly_payment')}</h3>
          <div className="text-5xl font-bold mb-8">
            ₪{Math.round(calculations.totalMonthly).toLocaleString()}
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span className="opacity-80">{t('total_interest')}</span>
              <span className="font-semibold text-lg">₪{Math.round(calculations.totalInterest).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span className="opacity-80">{t('total_payment')}</span>
              <span className="font-semibold text-lg">₪{Math.round(calculations.totalPayments).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="opacity-80">{t('pti')}</span>
              <span className={`font-semibold text-lg ${calculations.pti > 35 ? 'text-red-300' : ''}`}>
                {calculations.pti.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-card p-6 border border-border rounded-2xl shadow-sm h-[300px] flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-muted-foreground self-start w-full mb-2 border-b pb-2">{t('distribution')}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₪${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {pieData.map((d, i) => (
               <div key={i} className="flex items-center gap-1 text-xs">
                 <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                 <span className="text-muted-foreground">{d.name}</span>
               </div>
            ))}
          </div>
        </div>

        {/* AREA CHART */}
        <div className="bg-card p-6 border border-border rounded-2xl shadow-sm h-[300px] flex flex-col">
          <h3 className="text-sm font-bold text-muted-foreground w-full mb-2 border-b pb-2">יתרת קרן לאורך זמן</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {tracks.map((_, i) => (
                  <linearGradient key={`color-${i}`} id={`color-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="year" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} tick={{fontSize: 10}} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => `₪${Math.round(value).toLocaleString()}`} labelFormatter={(label) => `שנה ${label}`} />
              
              {tracks.map((_, i) => (
                 <Area 
                   key={`area-${i}`} 
                   type="monotone" 
                   dataKey={`track_${i}`} 
                   stackId="1" 
                   stroke={COLORS[i % COLORS.length]} 
                   fill={`url(#color-${i})`} 
                 />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </motion.div>

    </div>
  );
}
