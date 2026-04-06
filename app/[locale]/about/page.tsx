import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import * as motion from 'framer-motion/client';
import { CheckCircle2, ChevronLeft, ShieldCheck, Target, Award } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  const benefits = [
    { icon: <Award className="w-6 h-6 text-primary" />, text: t('benefit_1') },
    { icon: <Target className="w-6 h-6 text-primary" />, text: t('benefit_2') },
    { icon: <ShieldCheck className="w-6 h-6 text-primary" />, text: t('benefit_3') },
    { icon: <CheckCircle2 className="w-6 h-6 text-primary" />, text: t('benefit_4') }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto py-20 px-6 lg:py-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Text Content */}
          <div className="flex-1 space-y-8 order-2 lg:order-1 ltr:text-left rtl:text-right">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
              >
                {t('badge')}
              </motion.span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
                {t('title')} <br />
                <span className="text-primary italic">{t('title_highlight')}</span>
              </h1>
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl ltr:mr-auto rtl:ml-auto">
              <p>
                {t('description_1')}
              </p>
              <p>
                {t('description_2')}
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center md:ltr:justify-start md:rtl:justify-start justify-center gap-2">
                <span>{t('why_choose_me')}</span>
                <div className="h-1 w-12 bg-primary rounded-full hidden md:block" />
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-xl hover:shadow-md hover:border-primary/30 transition-all group"
                  >
                    <div className="shrink-0 p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-full lg:w-[400px] order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl -z-10" />
              <div className="relative group overflow-hidden rounded-[2rem] border-2 border-border shadow-2xl">
                <Image 
                  src="/images/advisor.png" 
                  alt="Mortgage Proctor" 
                  width={600} 
                  height={800}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-card border border-border p-5 rounded-2xl shadow-xl hidden md:block backdrop-blur-sm bg-card/90"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ltr:text-left rtl:text-right">
                    <p className="text-2xl font-bold text-foreground">{t('exp_years')}</p>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t('exp_label')}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
