'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AccessibilityState = {
  highContrast: boolean;
  negativeContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  disableAnimations: boolean;
  underlineLinks: boolean;
  fontSize: number; // percentage, default 100
};

type AccessibilityContextType = {
  state: AccessibilityState;
  toggleHighContrast: () => void;
  toggleNegativeContrast: () => void;
  toggleGrayscale: () => void;
  toggleHighlightLinks: () => void;
  toggleReadableFont: () => void;
  toggleDisableAnimations: () => void;
  toggleUnderlineLinks: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetAll: () => void;
};

const defaultState: AccessibilityState = {
  highContrast: false,
  negativeContrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  disableAnimations: false,
  underlineLinks: false,
  fontSize: 100,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('a11y-settings');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage a11y settings");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('a11y-settings', JSON.stringify(state));

    const htmlClasses = document.documentElement.classList;
    
    // Apply classes to HTML element
    state.highContrast ? htmlClasses.add('a11y-high-contrast') : htmlClasses.remove('a11y-high-contrast');
    state.negativeContrast ? htmlClasses.add('a11y-negative-contrast') : htmlClasses.remove('a11y-negative-contrast');
    state.grayscale ? htmlClasses.add('a11y-grayscale') : htmlClasses.remove('a11y-grayscale');
    state.highlightLinks ? htmlClasses.add('a11y-highlight-links') : htmlClasses.remove('a11y-highlight-links');
    state.readableFont ? htmlClasses.add('a11y-readable-font') : htmlClasses.remove('a11y-readable-font');
    state.disableAnimations ? htmlClasses.add('a11y-disable-animations') : htmlClasses.remove('a11y-disable-animations');
    state.underlineLinks ? htmlClasses.add('a11y-underline-links') : htmlClasses.remove('a11y-underline-links');
    
    // Apply font size directly
    if (state.fontSize !== 100) {
      document.documentElement.style.fontSize = `${state.fontSize}%`;
    } else {
      document.documentElement.style.removeProperty('font-size');
    }

  }, [state, isLoaded]);

  const updateState = (updates: Partial<AccessibilityState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const contextValue: AccessibilityContextType = {
    state,
    toggleHighContrast: () => updateState({ highContrast: !state.highContrast, negativeContrast: false }),
    toggleNegativeContrast: () => updateState({ negativeContrast: !state.negativeContrast, highContrast: false }),
    toggleGrayscale: () => updateState({ grayscale: !state.grayscale }),
    toggleHighlightLinks: () => updateState({ highlightLinks: !state.highlightLinks }),
    toggleReadableFont: () => updateState({ readableFont: !state.readableFont }),
    toggleDisableAnimations: () => updateState({ disableAnimations: !state.disableAnimations }),
    toggleUnderlineLinks: () => updateState({ underlineLinks: !state.underlineLinks }),
    increaseFontSize: () => updateState({ fontSize: Math.min(state.fontSize + 10, 150) }),
    decreaseFontSize: () => updateState({ fontSize: Math.max(state.fontSize - 10, 80) }),
    resetAll: () => setState(defaultState)
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
