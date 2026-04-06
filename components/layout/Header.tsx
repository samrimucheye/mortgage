'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, routing} from '@/i18n/routing';
import {useState} from 'react';
import {Menu, X, Globe, User, LogOut, LayoutDashboard, Users, Users2, Calculator} from 'lucide-react';
import {useParams} from 'next/navigation';
import {ThemeSwitcher} from '@/components/ui/ThemeSwitcher';
import {useSession, signIn, signOut} from 'next-auth/react';

const flags: Record<string, string> = {
  he: '🇮🇱',
  en: '🇺🇸',
  am: '🇪🇹',
};

export default function Header() {
  const t = useTranslations('Navigation');
  const authT = useTranslations('Auth');
  const localesMap = useTranslations('Locales');
  const locale = useLocale();
  const {data: session, status} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    {href: '/', label: t('home')},
    {href: '/about', label: t('about')},
    {href: '/services', label: t('services')},
    {href: '/calculator', label: t('calculator')},
    {href: '/contact', label: t('contact')},
  ];

  const isAdmin = (session?.user as any)?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md shadow-sm border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <span className="font-serif">M</span>
              </div>
              <span className="hidden sm:block">Mortgage<span className="text-primary opacity-80">Pro</span></span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 lg:gap-12 mx-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className={`text-base font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition p-2 rounded-md hover:bg-muted">
                <span className="text-base leading-none">{flags[locale as keyof typeof flags]}</span>
                <span className="text-sm font-medium">{localesMap(locale)}</span>
              </button>
              <div className="absolute top-full end-0 mt-2 w-32 bg-card border-border border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {routing.locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname as any}
                    locale={l}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary text-start transition-colors"
                  >
                    <span className="text-base leading-none">{flags[l as keyof typeof flags]}</span>
                    <span>{localesMap(l)}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-6 w-[1px] bg-border mx-1" />

            {/* Auth Actions */}
            {status === 'authenticated' ? (
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-bold hover:bg-primary/20 transition-all">
                      <LayoutDashboard size={16} />
                      <span>{authT('admin_dashboard')}</span>
                    </button>
                    <div className="absolute top-full end-0 mt-2 w-48 bg-card border-border border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden">
                      <div className="px-4 py-3 bg-muted/30 border-b border-border">
                        <p className="text-xs text-muted-foreground font-medium uppercase">{authT('admin_dashboard')}</p>
                      </div>
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                        <LayoutDashboard size={16} className="text-primary" />
                        <span>{authT('admin_dashboard')}</span>
                      </Link>
                      <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                        <Users size={16} className="text-primary" />
                        <span>{authT('leads')}</span>
                      </Link>
                      <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                        <Users2 size={16} className="text-primary" />
                        <span>{authT('clients')}</span>
                      </Link>
                      <Link href="/admin/mix-builder" className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors border-b border-border">
                        <Calculator size={16} className="text-primary" />
                        <span>{authT('builder')}</span>
                      </Link>
                      <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors font-medium"
                      >
                        <LogOut size={16} />
                        <span>{authT('logout')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="hidden lg:block">{authT('logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => signIn()}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  {authT('login')}
                </button>
                <Link 
                  href="/signup"
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  {authT('signup')}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden gap-3">
            <ThemeSwitcher />
            <button onClick={toggleMenu} className="text-foreground hover:text-primary focus:outline-none ml-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
               key={link.href}
               href={link.href as any}
               onClick={() => setIsOpen(false)}
               className={`block px-3 py-4 rounded-md text-base font-medium ${pathname === link.href ? 'text-primary bg-muted' : 'text-foreground hover:bg-muted'}`}
              >
               {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border mt-4">
              {status === 'authenticated' ? (
                <div className="space-y-3">
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-4 text-primary font-bold bg-primary/10 rounded-md"
                    >
                      <LayoutDashboard size={20} />
                      {authT('admin_dashboard')}
                    </Link>
                  )}
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-2 px-3 py-4 text-destructive font-bold hover:bg-destructive/10 rounded-md"
                  >
                    <LogOut size={20} />
                    {authT('logout')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => signIn()}
                    className="flex justify-center items-center py-3 border border-border rounded-lg text-sm font-bold"
                  >
                    {authT('login')}
                  </button>
                  <Link 
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold"
                  >
                    {authT('signup')}
                  </Link>
                </div>
              )}
            </div>
            
            <div className="pt-6 flex justify-center gap-4">
               {routing.locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname as any}
                    locale={l}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${locale === l ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                  >
                    <span>{flags[l as keyof typeof flags]}</span>
                    <span className="text-xs font-bold uppercase">{l}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
