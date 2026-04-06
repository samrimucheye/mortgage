import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import LeadForm from '@/components/forms/LeadForm';
import { ShieldCheck, Clock, Layers, Star, CheckCircle2 } from 'lucide-react';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const tHero = await getTranslations('Hero');
  const tBen = await getTranslations('Benefits');
  const tServ = await getTranslations('Services');
  const tRev = await getTranslations('Reviews');
  const tProc = await getTranslations('Process');
  const tFaq = await getTranslations('FAQ');
  const tFinal = await getTranslations('FinalCTA');

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full bg-card text-card-foreground py-20 md:py-32 px-6 flex flex-col items-center text-center border-b border-border transition-colors relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
            <ShieldCheck size={18} />
            <span>{tHero('trust')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-foreground tracking-tight leading-tight">
            {tHero('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            {tHero('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#lead-form-section" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-4 px-8 rounded-full transition shadow-lg hover:-translate-y-1 text-lg"
            >
              {tHero('cta_consult')}
            </a>
            <a 
              href="https://wa.me/972500000000" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full transition shadow-lg hover:-translate-y-1 text-lg"
            >
              {tHero('cta_whatsapp')}
            </a>
          </div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="w-full bg-background py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">💰</div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBen('save_money')}</h3>
            <p className="text-muted-foreground">{tBen('save_money_desc')}</p>
          </div>
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBen('simple_process')}</h3>
            <p className="text-muted-foreground">{tBen('simple_process_desc')}</p>
          </div>
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">🤝</div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBen('personal_care')}</h3>
            <p className="text-muted-foreground">{tBen('personal_care_desc')}</p>
          </div>
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBen('custom_solutions')}</h3>
            <p className="text-muted-foreground">{tBen('custom_solutions_desc')}</p>
          </div>
        </div>
      </section>

      {/* 3. MID-PAGE LEAD FORM */}
      <section id="lead-form-section" className="w-full bg-muted/30 py-20 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">בואו נבדוק כמה אתם יכולים לחסוך</h2>
            <p className="text-muted-foreground">השאירו פרטים לבדיקת זכאות ראשונית - ללא עלות וללא התחייבות.</p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="w-full bg-background py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tServ('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServ('new_mortgage')}</h3>
                <p className="text-muted-foreground">{tServ('new_mortgage_desc')}</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServ('recycle')}</h3>
                <p className="text-muted-foreground">{tServ('recycle_desc')}</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServ('viability')}</h3>
                <p className="text-muted-foreground">{tServ('viability_desc')}</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServ('bank_escort')}</h3>
                <p className="text-muted-foreground">{tServ('bank_escort_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF (REVIEWS) */}
      <section className="w-full bg-primary/5 py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tRev('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-card p-8 rounded-2xl shadow border border-border flex flex-col">
                <div className="flex gap-1 text-[#f59e0b] mb-4">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-foreground text-lg mb-6 flex-grow font-medium leading-relaxed">
                  "{tRev(`r${num}_text` as any)}"
                </p>
                <div className="font-bold text-muted-foreground border-t border-border pt-4">
                  {tRev(`r${num}_name` as any)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section className="w-full bg-background py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tProc('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-border -z-10" />
            
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/20">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{tProc(`step${step}` as any)}</h3>
                <p className="text-muted-foreground">{tProc(`step${step}_desc` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="w-full bg-muted/30 py-20 px-6 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">{tFaq('title')}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1">?</span>
                  {tFaq(`q${num}` as any)}
                </h3>
                <p className="text-muted-foreground">{tFaq(`a${num}` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="w-full bg-primary text-primary-foreground py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{tFinal('title')}</h2>
          <p className="text-xl mb-12 opacity-90">{tFinal('subtitle')}</p>
          <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-2xl w-full max-w-lg text-start">
            <LeadForm />
          </div>
        </div>
      </section>

    </div>
  );
}
