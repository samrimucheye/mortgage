const fs = require('fs');
const path = require('path');

const updates = {
  he: {
    A11y: {
      open_panel: "פתח תפריט נגישות",
      panel_title: "תפריט נגישות",
      close_panel: "סגור תפריט נגישות",
      increase_font: "הגדל טקסט",
      decrease_font: "הקטן טקסט",
      high_contrast: "ניגודיות גבוהה",
      negative_contrast: "ניגודיות הפוכה",
      grayscale: "גווני אפור",
      highlight_links: "הדגשת קישורים",
      readable_font: "גופן קריא",
      underline_links: "קו תחתון לקישורים",
      disable_animations: "עצירת אנימציות",
      reset_all: "איפוס הגדרות נגישות",
      reset: "איפוס הגדרות",
      statement: "הצהרת נגישות"
    },
    Privacy: {
      consent_prefix: "אני מאשר/ת את שליחת פרטיי לצורך יצירת קשר ומסכים/ה ל",
      privacy_policy: "מדיניות הפרטיות",
      privacy_secure: "פרטיך נשמרים בצורה מאובטחת ולא יועברו לצד שלישי",
      consent_required: "חובה לאשר את מדיניות הפרטיות"
    },
    Calculator: {
      balance_over_time: "יתרת קרן לאורך זמן",
      mismatch_warning: "שים לב: סך המסלולים אינו תואם לסכום ההלוואה המבוקש."
    }
  },
  en: {
    A11y: {
      open_panel: "Open Accessibility Panel",
      panel_title: "Accessibility Menu",
      close_panel: "Close Accessibility Menu",
      increase_font: "Increase Text",
      decrease_font: "Decrease Text",
      high_contrast: "High Contrast",
      negative_contrast: "Negative Contrast",
      grayscale: "Grayscale",
      highlight_links: "Highlight Links",
      readable_font: "Readable Font",
      underline_links: "Underline Links",
      disable_animations: "Disable Animations",
      reset_all: "Reset Accessibility Settings",
      reset: "Reset Settings",
      statement: "Accessibility Statement"
    },
    Privacy: {
      consent_prefix: "I agree to send my details for contact purposes and accept the ",
      privacy_policy: "Privacy Policy",
      privacy_secure: "Your details are kept securely and will not be shared with a third party",
      consent_required: "You must accept the privacy policy"
    },
    Calculator: {
      balance_over_time: "Principal Balance Over Time",
      mismatch_warning: "Note: Total tracks amount does not match the requested loan amount."
    }
  },
  am: {
    A11y: {
      open_panel: "ተደራሽነት ማውጫን ክፈት",
      panel_title: "ተደራሽነት ማውጫ",
      close_panel: "ተደራሽነት ማውጫን ዝጋ",
      increase_font: "ጽሑፍ አሳድግ",
      decrease_font: "ጽሑፍ አሳንስ",
      high_contrast: "ከፍተኛ ንፅፅር",
      negative_contrast: "አሉታዊ ንፅፅር",
      grayscale: "ጥቁር እና ነጭ",
      highlight_links: "አገናኞችን አድምቅ",
      readable_font: "የሚነበብ ቅርጸ-ቁምፊ",
      underline_links: "አገናኞች ላይ የተሰመረ",
      disable_animations: "እነማዎችን አጥፋ",
      reset_all: "የተደራሽነት ቅንብሮችን ዳግም አስጀምር",
      reset: "ቅንብሮችን ዳግም አስጀምር",
      statement: "የተደራሽነት መግለጫ"
    },
    Privacy: {
      consent_prefix: "ግንኙነት ለመፍጠር መረጃዬን ለመላክ ተስማምቻለሁ እና እቀበላለሁ ፡ ",
      privacy_policy: "የግላዊነት ፖሊሲ",
      privacy_secure: "መረጃዎ ደህንነቱ በተጠበቀ ሁኔታ ይቀመጣል እና ለሶስተኛ ወገን አይተላለፍም",
      consent_required: "የግላዊነት ፖሊሲውን መቀበል አለብዎት"
    },
    Calculator: {
      balance_over_time: "የዋና ሚዛን በጊዜ ሂደት",
      mismatch_warning: "ማሳሰቢያ፡ የኮርሶች አጠቃላይ መጠን ከተጠየቀው የብድር መጠን ጋር አይዛመድም።"
    }
  }
};

const dir = path.join('d:\\Users\\Owner\\Desktop\\Mortgage-consultant\\messages');

for (const [lang, data] of Object.entries(updates)) {
  const filePath = path.join(dir, `${lang}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  content.A11y = { ...content.A11y, ...data.A11y };
  content.Privacy = { ...content.Privacy, ...data.Privacy };
  content.Calculator = { ...content.Calculator, ...data.Calculator };
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
}

console.log("JSON files updated.");
