const fs = require('fs');
const path = require('path');

const updates = {
  he: {
    Login: {
      invalid_credentials: "אימייל או סיסמה שגויים",
      welcome_back: "ברוך שובך",
      welcome_desc: "התחבר למערכת ניהול הלקוחות של MortgagePro",
      email_label: "כתובת אימייל",
      password_label: "סיסמה",
      logging_in: "מתחבר...",
      login_btn: "כניסה למערכת",
      no_account_q: "אין לך חשבון? ",
      signup_link: "הירשם כאן"
    },
    Signup: {
      password_mismatch: "הסיסמאות אינן תואמות",
      password_length: "הסיסמה חייבת להכיל לפחות 6 תווים",
      creation_error: "שגיאה ביצירת המשתמש",
      login_failed: "ההרשמה הצליחה אך ההתחברות נכשלה. אנא נסה שוב.",
      network_error: "שגיאת רשת. אנא נסה שנית.",
      create_account: "יצירת חשבון",
      signup_desc: "הירשם כמנהל במערכת MortgagePro",
      email_label: "כתובת אימייל",
      password_label: "סיסמה",
      confirm_password_label: "אימות סיסמה",
      creating_account: "יוצר חשבון...",
      signup_btn: "הירשם למערכת",
      have_account_q: "כבר יש לך חשבון? ",
      login_link: "התחבר כאן"
    }
  },
  en: {
    Login: {
      invalid_credentials: "Invalid email or password",
      welcome_back: "Welcome Back",
      welcome_desc: "Log in to the MortgagePro CRM",
      email_label: "Email Address",
      password_label: "Password",
      logging_in: "Logging in...",
      login_btn: "Sign In",
      no_account_q: "Don't have an account? ",
      signup_link: "Sign up here"
    },
    Signup: {
      password_mismatch: "Passwords do not match",
      password_length: "Password must be at least 6 characters",
      creation_error: "Error creating user",
      login_failed: "Signup successful but login failed. Please try again.",
      network_error: "Network error. Please try again.",
      create_account: "Create Account",
      signup_desc: "Register as an admin in MortgagePro",
      email_label: "Email Address",
      password_label: "Password",
      confirm_password_label: "Confirm Password",
      creating_account: "Creating account...",
      signup_btn: "Sign Up",
      have_account_q: "Already have an account? ",
      login_link: "Log in here"
    }
  },
  am: {
    Login: {
      invalid_credentials: "የተሳሳተ ኢሜይል ወይም የይለፍ ቃል",
      welcome_back: "እንኳን ደህና መጡ",
      welcome_desc: "ወደ MortgagePro አስተዳደር ስርዓት ይግቡ",
      email_label: "የኢሜይል አድራሻ",
      password_label: "የይለፍ ቃል",
      logging_in: "በመግባት ላይ...",
      login_btn: "ግባ",
      no_account_q: "መለያ የለዎትም? ",
      signup_link: "እዚህ ይመዝገቡ"
    },
    Signup: {
      password_mismatch: "የይለፍ ቃሎቹ አይዛመዱም",
      password_length: "የይለፍ ቃል ቢያንስ 6 ሆሄያት መሆን አለበት",
      creation_error: "ተጠቃሚ ሲፈጠር ስህተት አጋጥሟል",
      login_failed: "ምዝገባው ተሳክቷል ነገር ግን መግባት አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
      network_error: "የአውታረ መረብ ስህተት። እባክዎ እንደገና ይሞክሩ።",
      create_account: "መለያ ፍጠር",
      signup_desc: "እንደ አስተዳዳሪ ב MortgagePro ይመዝገቡ",
      email_label: "የኢሜይል አድራሻ",
      password_label: "የይለፍ ቃል",
      confirm_password_label: "የይለፍ ቃል አረጋግጥ",
      creating_account: "መለያ በመፍጠር ላይ...",
      signup_btn: "ይመዝገቡ",
      have_account_q: "ቀድሞውኑ መለያ አሎት? ",
      login_link: "እዚህ ይግቡ"
    }
  }
};

const dir = path.join('d:\\Users\\Owner\\Desktop\\Mortgage-consultant\\messages');

for (const [lang, data] of Object.entries(updates)) {
  const filePath = path.join(dir, `${lang}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  content.Login = { ...content.Login, ...data.Login };
  content.Signup = { ...content.Signup, ...data.Signup };
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
}

console.log("JSON files updated.");
