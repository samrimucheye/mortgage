import type { Metadata } from "next";
import { Inter, Noto_Sans_Hebrew, Noto_Sans_Ethiopic } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ColorInitializer } from '@/components/providers/ColorInitializer';
import { AuthProvider } from '@/components/providers/AuthProvider';
import FloatWhatsApp from '@/components/ui/FloatWhatsApp';
import StickyCtaBar from '@/components/ui/StickyCtaBar';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hebrew = Noto_Sans_Hebrew({ subsets: ["hebrew"], variable: "--font-hebrew" });
const ethiopic = Noto_Sans_Ethiopic({ subsets: ["ethiopic"], variable: "--font-ethiopic", weight: ["400", "700"] });

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
  
  return {
    title: `MortgagePro | יועץ משכנתאות | ${t('home')}`,
    description: "ייעוץ משכנתאות מקצועי לבניית משכנתא חדשה, מחזור משכנתא וחיסכון בעלויות אל מול הבנקים.",
    keywords: "יועץ משכנתאות, מחזור משכנתא, משכנתא חדשה, ריביות משכנתא, יועץ משכנתא",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  // Apply fonts conditionally, fallback to default font stack if preferred
  const fontVar = locale === 'he' ? hebrew.variable : locale === 'am' ? ethiopic.variable : inter.variable;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${fontVar} antialiased bg-background text-foreground flex flex-col min-h-screen transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <ColorInitializer />
              <Header />
              <StickyCtaBar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <FloatWhatsApp />
            </NextIntlClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
