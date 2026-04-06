import {setRequestLocale} from 'next-intl/server';
import { ShieldCheck } from 'lucide-react';

export default async function PrivacyPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card text-card-foreground py-20 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <ShieldCheck size={48} className="text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">מדיניות פרטיות</h1>
          <p className="text-xl text-muted-foreground">עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}</p>
        </div>
      </section>

      <section className="w-full bg-background py-16 px-6">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>1. איסוף מידע</h2>
          <p>אנו אוספים מידע שאתה מספק לנו ישירות, כגון שמך, מספר הטלפון וכתובת הדוא"ל שלך בעת יצירת קשר או מילוי טפסים באתר.</p>
          
          <h2>2. שימוש במידע</h2>
          <p>המידע נאסף ומשמש אך ורק למטרה של מתן שירותי ייעוץ משכנתאות, יצירת קשר עמך, ושיפור השירותים שלנו.</p>
          
          <h2>3. אבטחת מידע</h2>
          <p>אנו נוקטים באמצעי אבטחה מחמירים כדי להגן על המידע האישי שלך מפני גישה בלתי מורשית.</p>
          
          <h2>4. העברת מידע לצד שלישי</h2>
          <p>פרטיך נשמרים בצורה מאובטחת ולא יועברו לשום צד שלישי ללא הסכמתך המפורשת. המידע אינו נמכר או מושכר לצדדים שלישיים.</p>
          
          <h2>5. יצירת קשר</h2>
          <p>בכל שאלה לגבי מדיניות הפרטיות שלנו, ניתן לפנות אלינו דרך טופס יצירת הקשר באתר הדף הראשי.</p>
        </div>
      </section>
    </div>
  );
}
