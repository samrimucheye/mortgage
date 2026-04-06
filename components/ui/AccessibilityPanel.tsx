'use client';

import { useState } from 'react';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Type, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff, 
  CircleDot, 
  Link as LinkIcon, 
  Play, 
  Underline,
  RotateCcw,
  X,
  Accessibility
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AccessibilityPanel() {
  const t = useTranslations('A11y');
  const [isOpen, setIsOpen] = useState(false);
  const { 
    state, 
    toggleHighContrast, 
    toggleNegativeContrast, 
    toggleGrayscale, 
    toggleHighlightLinks, 
    toggleReadableFont, 
    toggleDisableAnimations, 
    toggleUnderlineLinks, 
    increaseFontSize, 
    decreaseFontSize, 
    resetAll 
  } = useAccessibility();

  const togglePanel = () => setIsOpen(!isOpen);

  // Reusable button component
  const A11yButton = ({ active, onClick, icon: Icon, label }: { active?: boolean, onClick: () => void, icon: any, label: string }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border text-sm transition-colors text-center gap-2 ${
        active 
        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
        : 'bg-card text-card-foreground border-border hover:bg-muted'
      }`}
      aria-pressed={active}
      aria-label={label}
    >
      <Icon size={24} />
      <span className="font-medium text-xs sm:text-sm leading-tight max-w-[80px]">{label}</span>
    </button>
  );

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={togglePanel}
        aria-label={t('open_panel')}
        aria-expanded={isOpen}
        className="fixed bottom-4 start-4 sm:bottom-6 sm:start-6 z-50 bg-[#0070f3] dark:bg-primary hover:bg-[#0051a8] dark:hover:bg-primary-hover text-white p-3 sm:p-4 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50"
      >
        <Accessibility className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Panel overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 start-4 sm:bottom-24 sm:start-6 z-50 w-[90vw] max-w-[360px] bg-background border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
            role="dialog"
            aria-label={t('panel_title')}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <Accessibility className="w-5 h-5 sm:w-6 sm:h-6" />
                {t('panel_title')}
              </h2>
              <button 
                onClick={togglePanel}
                className="text-primary-foreground/80 hover:text-white transition-colors p-1"
                aria-label={t('close_panel')}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto w-full flex-1">
              <div className="grid grid-cols-2 gap-3">
                <A11yButton onClick={increaseFontSize} icon={ZoomIn} label={t('increase_font')} />
                <A11yButton onClick={decreaseFontSize} icon={ZoomOut} label={t('decrease_font')} />
                <A11yButton active={state.highContrast} onClick={toggleHighContrast} icon={Eye} label={t('high_contrast')} />
                <A11yButton active={state.negativeContrast} onClick={toggleNegativeContrast} icon={EyeOff} label={t('negative_contrast')} />
                <A11yButton active={state.grayscale} onClick={toggleGrayscale} icon={CircleDot} label={t('grayscale')} />
                <A11yButton active={state.highlightLinks} onClick={toggleHighlightLinks} icon={LinkIcon} label={t('highlight_links')} />
                <A11yButton active={state.readableFont} onClick={toggleReadableFont} icon={Type} label={t('readable_font')} />
                <A11yButton active={state.underlineLinks} onClick={toggleUnderlineLinks} icon={Underline} label={t('underline_links')} />
                <A11yButton active={state.disableAnimations} onClick={toggleDisableAnimations} icon={Play} label={t('disable_animations')} />
                
                <button 
                  onClick={resetAll}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:border-red-900 dark:text-red-400 transition-colors col-span-1 text-center gap-2"
                  aria-label={t('reset_all')}
                >
                  <RotateCcw size={24} />
                  <span className="font-medium text-xs sm:text-sm">{t('reset')}</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-muted/50 border-t border-border flex justify-between items-center text-sm">
              <Link href="/accessibility" onClick={() => setIsOpen(false)} className="text-primary hover:underline font-medium flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary rounded px-1">
                {t('statement')}
              </Link>
              <div className="text-muted-foreground text-xs font-medium">
                MortgagePro
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
