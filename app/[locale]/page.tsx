import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import LeadForm from '@/components/forms/LeadForm';
import { ShieldCheck, Clock, Layers, Star, CheckCircle2, TrendingUp, ShieldAlert, GraduationCap, Banknote, Terminal, HeartHandshake } from 'lucide-react';


export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const tHero = await getTranslations('Hero');
  const tBenefits = await getTranslations('Benefits');
  const tServices = await getTranslations('Services');
  const tReviews = await getTranslations('Reviews');
  const tProcess = await getTranslations('Process');
  const tFAQ = await getTranslations('FAQ');
  const tFinal = await getTranslations('FinalCTA');
  const tWhy = await getTranslations('WhyMe');
  const tLegal = await getTranslations('Legal');

  return (
    <div className="flex flex-col items-center overflow-x-hidden relative">
      
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
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-4 px-8 rounded-full transition shadow-lg hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
            >
              <TrendingUp size={20} />
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

      {/* 2. LEGAL DISCLAIMER (TOP) */}
      <section className="w-full bg-amber-50 dark:bg-amber-950/20 py-4 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-amber-800 dark:text-amber-500 max-w-4xl">
          <ShieldAlert className="shrink-0 mt-0.5" size={20} />
          <p className="text-sm md:text-base font-medium leading-relaxed">
            {tLegal('disclaimer')}
          </p>
        </div>
      </section>

      {/* 3. WHY ME SECTION (NEW DIFFERENTIATION) */}
      <section className="w-full bg-muted/20 py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tWhy('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-2xl">
                <GraduationCap size={32} />
              </div>
              <p className="text-lg font-bold text-foreground">{tWhy('desc1')}</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-2xl">
                <Banknote size={32} />
              </div>
              <p className="text-lg font-bold text-foreground">{tWhy('desc2')}</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-2xl">
                <Terminal size={32} />
              </div>
              <p className="text-lg font-bold text-foreground">{tWhy('desc3')}</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition lg:col-start-1 lg:col-end-2 lg:translate-x-1/2">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-2xl">
                <TrendingUp size={32} />
              </div>
              <p className="text-lg font-bold text-foreground">{tWhy('desc4')}</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition lg:col-start-3 lg:col-end-4 lg:-translate-x-1/2">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-2xl">
                <HeartHandshake size={32} />
              </div>
              <p className="text-lg font-bold text-foreground">{tWhy('desc5')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section className="w-full bg-background py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">💰</div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBenefits('save_money')}</h3>
            <p className="text-muted-foreground">{tBenefits('save_money_desc')}</p>
          </div>
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBenefits('simple_process')}</h3>
            <p className="text-muted-foreground">{tBenefits('simple_process_desc')}</p>
          </div>
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">🤝</div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBenefits('personal_care')}</h3>
            <p className="text-muted-foreground">{tBenefits('personal_care_desc')}</p>
          </div>
          <div className="flex flex-col p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:border-primary/50">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 text-2xl">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{tBenefits('custom_solutions')}</h3>
            <p className="text-muted-foreground">{tBenefits('custom_solutions_desc')}</p>
          </div>
        </div>
      </section>

      {/* 5. MID-PAGE LEAD FORM */}
      <section id="lead-form-section" className="w-full bg-muted/30 py-20 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">בואו נבדוק כמה אתם יכולים לחסוך</h2>
            <p className="text-muted-foreground">השאירו פרטים לבדיקת זכאות ראשונית - ללא עלות וללא התחייבות.</p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="w-full bg-background py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tServices('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServices('new_mortgage')}</h3>
                <p className="text-muted-foreground">{tServices('new_mortgage_desc')}</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServices('recycle')}</h3>
                <p className="text-muted-foreground">{tServices('recycle_desc')}</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServices('viability')}</h3>
                <p className="text-muted-foreground">{tServices('viability_desc')}</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl flex gap-6 hover:shadow-lg transition">
              <div className="text-primary mt-1"><CheckCircle2 size={32} /></div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tServices('bank_escort')}</h3>
                <p className="text-muted-foreground">{tServices('bank_escort_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF (REVIEWS) */}
      <section className="w-full bg-primary/5 py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tReviews('title')}</h2>
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
                  "{tReviews(`r${num}_text` as any)}"
                </p>
                <div className="font-bold text-muted-foreground border-t border-border pt-4">
                  {tReviews(`r${num}_name` as any)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROCESS */}
      <section className="w-full bg-background py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">{tProcess('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-border -z-10" />
            
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/20">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{tProcess(`step${step}` as any)}</h3>
                <p className="text-muted-foreground">{tProcess(`step${step}_desc` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="w-full bg-muted/30 py-20 px-6 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">{tFAQ('title')}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1">?</span>
                  {tFAQ(`q${num}` as any)}
                </h3>
                <p className="text-muted-foreground">{tFAQ(`a${num}` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
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
