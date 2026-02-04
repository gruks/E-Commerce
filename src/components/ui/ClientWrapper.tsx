"use client";

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface ClientWrapperProps {
  children: React.ReactNode;
  showLoading?: boolean;
  loadingDuration?: number;
}

export default function ClientWrapper({ 
  children, 
  showLoading = true, 
  loadingDuration = 2500 
}: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if this is a page refresh/reload
    const isPageRefresh = () => {
      // Check if performance navigation API is available
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return navigation.type === 'reload';
      }
      
      // Fallback: check if page was accessed directly (not from navigation)
      return document.referrer === '' || document.referrer === window.location.href;
    };

    // Show loading screen on page refresh or initial load
    if (showLoading && (isPageRefresh() || !sessionStorage.getItem('hasVisited'))) {
      setIsLoading(true);
      // Mark that user has visited (to avoid loading on navigation)
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, [showLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Don't render anything on server side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onComplete={handleLoadingComplete} 
          duration={loadingDuration}
        />
      )}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}