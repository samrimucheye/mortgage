import {setRequestLocale} from 'next-intl/server';
import LeadForm from '@/components/forms/LeadForm';
import {getTranslations} from 'next-intl/server';

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');
  return (
    <div className="py-20 px-6 min-h-[calc(100vh-80px)] bg-background flex flex-col items-center justify-center transition-colors">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground tracking-tight lg:text-5xl mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please fill out the form below.
        </p>
      </div>
      <LeadForm />
    </div>
  );
}
