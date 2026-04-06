'use client';

import React from 'react';
import Link from 'next/link';

interface ConsentCheckboxProps {
  register: any;
  error?: string;
  name?: string;
}

export default function ConsentCheckbox({ register, error, name = 'consent' }: ConsentCheckboxProps) {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={name}
          {...register(name)}
          className={`mt-1 min-w-[20px] w-5 h-5 rounded border-2 transition-colors cursor-pointer text-primary focus:ring-primary ${error ? 'border-red-500' : 'border-input bg-background'}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${name}-error`}
        />
        <label htmlFor={name} className="text-sm text-foreground cursor-pointer select-none leading-tight">
          אני מאשר/ת את שליחת פרטיי לצורך יצירת קשר ומסכים/ה ל<Link href="/privacy" className="text-primary hover:underline cursor-pointer" target="_blank">מדיניות הפרטיות</Link>
        </label>
      </div>
      {error && <p id={`${name}-error`} className="text-red-500 text-xs font-medium mr-8">{error}</p>}
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5 opacity-80">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        פרטיך נשמרים בצורה מאובטחת ולא יועברו לצד שלישי
      </p>
    </div>
  );
}
