import {setRequestLocale} from 'next-intl/server';

export default async function AccessibilityStatementPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-primary/10 py-16 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-6 shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">הצהרת נגישות</h1>
          <p className="text-lg text-muted-foreground">אנו מחויבים להנגיש את האתר לכלל האוכלוסייה.</p>
        </div>
      </section>

      <section className="w-full bg-background py-16 px-6">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h2>רמת הנגישות באתר</h2>
          <p>
            אנו משקיעים מאמצים רבים ומקצים משאבים על מנת לספק לכל קהל לקוחותינו שירות שוויוני, מכובד, נגיש ומקצועי. התאמות הנגישות בוצעו עפ"י תקן זמין ברמה AA וכחלק ממחויבות זו, הותקן מודול נגישות מתקדם באתר.
          </p>

          <h2>הסדרי נגישות</h2>
          <ul>
            <li><strong>תפריט נגישות:</strong> כפתור מרחף בצד המסך פותח תפריט המאפשר לשלוט בגדלי הגופנים, בניגודיות הצבעים (גבוהה, הפוכה), בעצירת אנימציות ובהדגשת קישורים.</li>
            <li><strong>ניווט מקלדת:</strong> האתר מותאם לגלישה בעזרת מקלדת בלבד ונתמך על ידי קוראי מסך.</li>
            <li><strong>טקסט אלטרנטיבי:</strong> תמונות באתר כוללות טקסט חלופי קצר (Alt) לתיאור תוכנן היכן שנדרש.</li>
          </ul>

          <h2>סייגים לנגישות ודרכי פנייה</h2>
          <p>
            למרות מאמצינו לשמור על האתר נגיש במלואו, ייתכן שיתגלו חלקים שעדיין אינם נגישים לחלוטין.
            אם נתקלתם בבעיה או בקושי בגלישה באתר, או שיש לכם הצעה לשיפור, נשמח לשמוע מכם!
          </p>
          <p>
            <strong>פניות בנושא נגישות ניתן להפנות אל:</strong><br />
            טלפון: 050-0000000<br />
            דוא"ל: accessibility@mortgagepro.co.il
          </p>
        </div>
      </section>
    </div>
  );
}
