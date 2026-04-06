import {setRequestLocale} from 'next-intl/server';
import MortgageCalculator from '@/components/calculator/MortgageCalculator';

export default async function CalculatorPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <div className="py-20 px-6 min-h-screen bg-background flex items-center justify-center transition-colors">
      <MortgageCalculator />
    </div>
  );
}
