'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';

export default function MortgageCalculator() {
  const t = useTranslations('Calculator');
  
  const [amount, setAmount] = useState(1000000);
  const [interest, setInterest] = useState(4.5);
  const [years, setYears] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Amortization calculation
    const P = amount;
    const r = (interest / 100) / 12;
    const n = years * 12; // Total number of payments

    if (r === 0) {
      setMonthlyPayment(P / n);
      return;
    }

    const m = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(m || 0);
  }, [amount, interest, years]);

  return (
    <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="bg-card rounded-3xl shadow-2xl p-8 max-w-xl mx-auto w-full border border-border transition-colors text-card-foreground"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground border-b-4 border-primary inline-block mx-auto">{t('title')}</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">{t('amount')} - ₪{amount.toLocaleString()}</label>
          <input 
            type="range" 
            min="100000" 
            max="5000000" 
            step="50000"
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">{t('interest')} - {interest}%</label>
          <input 
            type="range" 
            min="0.1" 
            max="15" 
            step="0.1"
            value={interest} 
            onChange={(e) => setInterest(Number(e.target.value))} 
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">{t('years')} - {years}</label>
          <input 
            type="range" 
            min="5" 
            max="30" 
            step="1"
            value={years} 
            onChange={(e) => setYears(Number(e.target.value))} 
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="mt-12 bg-muted p-6 rounded-2xl text-center border border-border">
        <p className="text-muted-foreground text-lg mb-2">{t('monthly_payment')}</p>
        <p className="text-5xl font-bold text-primary">
          ₪{Math.round(monthlyPayment).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
