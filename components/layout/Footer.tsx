import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Footer() {
  const tNav = useTranslations('Navigation');
  const tServ = useTranslations('Services');
  const tFoot = useTranslations('Footer');
  
  return (
    <footer className="bg-card text-muted-foreground py-12 border-t border-border transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-foreground text-lg font-bold mb-4">MortgagePro</h4>
          <p className="text-sm">{tFoot('desc')}</p>
        </div>
        <div>
          <h4 className="text-foreground text-lg font-bold mb-4">{tNav('services')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-primary transition">{tServ('new_mortgage')}</Link></li>
            <li><Link href="/services" className="hover:text-primary transition">{tServ('recycle')}</Link></li>
            <li><Link href="/services" className="hover:text-primary transition">{tServ('viability')}</Link></li>
            <li><Link href="/services" className="hover:text-primary transition">{tServ('bank_escort')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground text-lg font-bold mb-4">{tNav('contact')}</h4>
          <ul className="space-y-2 text-sm">
            <li>Tel: 050-000-0000</li>
            <li dir="ltr">contact@mortgagepro.co.il</li>
            <li>Tel Aviv, Israel</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border text-center text-sm">
        <p>&copy; {new Date().getFullYear()} MortgagePro. {tFoot('rights')}</p>
      </div>
    </footer>
  );
}
