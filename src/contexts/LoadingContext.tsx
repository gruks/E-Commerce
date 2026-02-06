"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isPageLoaded: boolean;
  setPageLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  // Start with false - page is not loaded initially
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ isPageLoaded, setPageLoaded: setIsPageLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingState() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    // Return default values if used outside provider (shouldn't happen)
    console.warn('useLoadingState used outside LoadingProvider');
    return { isPageLoaded: true, setPageLoaded: () => {} };
  }
  return context;
}
