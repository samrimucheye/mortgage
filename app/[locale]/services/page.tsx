import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Services');
  
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
      
      <div className="space-y-12">
        {/* Service 1 */}
        <div className="bg-card rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-border hover:border-primary/50 transition-colors">
          <div className="w-24 h-24 bg-muted text-primary rounded-full flex items-center justify-center text-4xl shrink-0">
            🏠
          </div>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-3">{t('new_mortgage')}</h2>
            <p className="text-muted-foreground text-lg">{t('new_mortgage_desc')}</p>
          </div>
        </div>

        {/* Service 2 */}
        <div className="bg-card rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-border hover:border-primary/50 transition-colors">
          <div className="w-24 h-24 bg-muted text-primary rounded-full flex items-center justify-center text-4xl shrink-0">
            🔄
          </div>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-3">{t('recycle')}</h2>
            <p className="text-muted-foreground text-lg">{t('recycle_desc')}</p>
          </div>
        </div>

        {/* Service 3 */}
        <div className="bg-card rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-border hover:border-primary/50 transition-colors">
          <div className="w-24 h-24 bg-muted text-primary rounded-full flex items-center justify-center text-4xl shrink-0">
            🔍
          </div>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-3">{t('viability')}</h2>
            <p className="text-muted-foreground text-lg">{t('viability_desc')}</p>
          </div>
        </div>

        {/* Service 4 */}
        <div className="bg-card rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-border hover:border-primary/50 transition-colors">
          <div className="w-24 h-24 bg-muted text-primary rounded-full flex items-center justify-center text-4xl shrink-0">
            🤝
          </div>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-3">{t('bank_escort')}</h2>
            <p className="text-muted-foreground text-lg">{t('bank_escort_desc')}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
