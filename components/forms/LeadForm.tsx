'use client';

import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useState} from 'react';
import ConsentCheckbox from './ConsentCheckbox';

export default function LeadForm() {
  const t = useTranslations('Contact');
  const tPrivacy = useTranslations('Privacy');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const formSchema = z.object({
    name: z.string().min(2, {message: t('validation.name_required')}),
    phone: z.string().regex(/^[0-9+\-()\s]{9,15}$/, {message: t('validation.phone_invalid')}),
    email: z.string().email().optional().or(z.literal('')),
    message: z.string().optional(),
    consent: z.boolean().refine(val => val === true, {
      message: tPrivacy('consent_required')
    })
  });

  type FormValues = z.infer<typeof formSchema>;

  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const payload = { ...data, consentDate: new Date().toISOString() };
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      reset();
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div className="bg-card p-8 rounded-2xl shadow-xl shadow-muted/50 w-full max-w-md mx-auto transition-colors border border-border">
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
          <h3 className="text-2xl font-bold text-card-foreground mb-2">{t('success')}</h3>
          <button onClick={() => setStatus('idle')} className="mt-4 text-primary underline">Send another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{t('name')} *</label>
            <input 
              {...register('name')} 
              className={`w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition ${errors.name ? 'border-red-500 flex-1' : 'border-border'}`} 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{t('phone')} *</label>
            <input 
              {...register('phone')} 
              className={`w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition ${errors.phone ? 'border-red-500 flex-1' : 'border-border'}`} 
              dir="ltr"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{t('email')}</label>
            <input 
              type="email"
              {...register('email')} 
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition" 
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">{t('message')}</label>
            <textarea 
              {...register('message')} 
              rows={4}
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition resize-none" 
            />
          </div>

          <ConsentCheckbox register={register} error={errors.consent?.message as string | undefined} />

          {status === 'error' && <p className="text-red-500 text-sm text-center">{t('error')}</p>}

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-4 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '...' : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
}
