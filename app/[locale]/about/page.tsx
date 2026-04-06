import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import * as motion from 'framer-motion/client';
import { ShieldCheck, Target, Award, BrainCircuit, Activity, BookOpen, Fingerprint, ShieldAlert, TrendingUp, Calculator, LineChart, HandHeart } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  const whyMePoints = [
    { icon: <Building className="w-5 h-5 text-primary" />, text: t('why_me_1') },
    { icon: <Target className="w-5 h-5 text-primary" />, text: t('why_me_2') },
    { icon: <BrainCircuit className="w-5 h-5 text-primary" />, text: t('why_me_3') },
    { icon: <LineChart className="w-5 h-5 text-primary" />, text: t('why_me_4') },
    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, text: t('why_me_5') }
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -z-10 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent blur-3xl opacity-50" />

      {/* 1. OPENING (HOOK) */}
      <section className="max-w-4xl mx-auto py-20 px-6 lg:py-28 text-center border-b border-border">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20"
        >
          {t('badge')}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6"
        >
          {t('title')} <br />
          <span className="text-primary">{t('title_highlight')}</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
        >
          {t('hook')}
        </motion.p>
      </section>

      {/* 2. PERSONAL STORY & 3. EDUCATION */}
      <section className="max-w-6xl mx-auto py-20 px-6 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-12"
          >
            {/* Story */}
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden group hover:shadow-md transition">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition" />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><BookOpen size={24} /></div>
                <h2 className="text-2xl font-bold text-foreground">{t('story_title')}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('story_text')}
              </p>
            </div>

            {/* Education */}
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden group hover:shadow-md transition">
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition" />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Fingerprint size={24} /></div>
                <h2 className="text-2xl font-bold text-foreground">{t('education_title')}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('education_text')}
              </p>
            </div>
          </motion.div>

          {/* Portrait Image (Optional replacement space) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[450px] relative hidden md:block"
          >
            <div className="absolute inset-x-0 -bottom-10 bg-primary/20 blur-[80px] h-40 -z-10" />
            <div className="relative rounded-[2.5rem] border-4 border-card overflow-hidden shadow-2xl aspect-[4/5] bg-muted flex items-center justify-center">
              {/* You can replace this placeholder with the actual advisor image */}
              <div className="text-muted-foreground text-center p-6 flex flex-col items-center">
                <Activity size={64} className="mb-4 text-primary/40" />
                <p>Data & Experience</p>
                <p className="text-sm">Mortgage Analyst</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. UNIQUE APPROACH */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center border-b border-border">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            <TrendingUp size={32} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('approach_title')}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t('approach_text')}
          </p>
        </motion.div>
      </section>

      {/* 5. WHY CHOOSE ME */}
      <section className="max-w-6xl mx-auto py-20 px-6 border-b border-border">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">{t('why_me_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyMePoints.map((point, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-5 bg-card border border-border/50 rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <div className="shrink-0 p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                {point.icon}
              </div>
              <span className="font-semibold text-card-foreground text-lg">{point.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TRUST / DISCLAIMER */}
      <section className="w-full bg-amber-50 dark:bg-amber-950/20 py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-4 text-amber-800 dark:text-amber-500 text-center md:text-start">
          <ShieldAlert className="shrink-0 mt-1 hidden md:block" size={32} />
          <p className="text-lg font-medium leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </section>

      {/* 7. CTA (END SECTION) */}
      <section className="w-full bg-primary text-primary-foreground py-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <HandHeart size={48} className="mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t('cta_headline')}</h2>
          <p className="text-xl mb-12 opacity-90 font-medium">{t('cta_sub')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <a 
              href="/#lead-form-section" 
              className="bg-background text-primary hover:bg-background/90 font-bold py-4 px-8 rounded-full transition shadow-xl text-lg flex items-center justify-center gap-2"
            >
              <Calculator size={20} />
              {t('cta_btn1')}
            </a>
            <a 
              href="https://wa.me/972500000000" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full transition shadow-xl text-lg border border-white/20"
            >
              {t('cta_btn2')}
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

// Icon for array map
function Building(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}
