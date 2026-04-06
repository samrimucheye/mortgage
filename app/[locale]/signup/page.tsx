'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, UserPlus } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function SignupPage() {
  const t = useTranslations('Signup');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError(t('password_mismatch'));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('password_length'));
      setLoading(false);
      return;
    }

    try {
      // 1. Create the user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('creation_error'));
        setLoading(false);
        return;
      }

      // 2. Automatically log them in
      const loginRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (loginRes?.error) {
        setError(t('login_failed'));
        setLoading(false);
      } else {
        router.push(`/${locale}/admin`);
        router.refresh();
      }
    } catch (err) {
      setError(t('network_error'));
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 ${locale === 'he' ? 'font-hebrew' : ''}`} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center text-3xl font-serif font-bold shadow-lg mb-6">
            M
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('create_account')}</h1>
          <p className="text-slate-500">{t('signup_desc')}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('email_label')}</label>
            <div className="relative">
              <Mail className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${locale === 'he' ? 'right-4' : 'left-4'}`} size={20} />
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 ${locale === 'he' ? 'pl-4 pr-12' : 'pr-4 pl-12'} focus:ring-2 focus:ring-blue-600 outline-none transition`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('password_label')}</label>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${locale === 'he' ? 'right-4' : 'left-4'}`} size={20} />
              <input
                type="password"
                required
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 ${locale === 'he' ? 'pl-4 pr-12' : 'pr-4 pl-12'} focus:ring-2 focus:ring-blue-600 outline-none transition`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t('confirm_password_label')}</label>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${locale === 'he' ? 'right-4' : 'left-4'}`} size={20} />
              <input
                type="password"
                required
                dir="ltr"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 ${locale === 'he' ? 'pl-4 pr-12' : 'pr-4 pl-12'} focus:ring-2 focus:ring-blue-600 outline-none transition`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? t('creating_account') : (
              <>
                <UserPlus size={20} />
                {t('signup_btn')}
              </>
            )}
          </button>
          
          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <span className="text-slate-500 text-sm">{t('have_account_q')}</span>
            <Link href={`/${locale}/login`} className="text-blue-600 font-bold hover:underline text-sm">
              {t('login_link')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
