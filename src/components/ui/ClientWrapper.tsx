"use client";

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { useLoadingState } from '@/src/contexts/LoadingContext';

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
  const { setPageLoaded } = useLoadingState();

  useEffect(() => {
    setIsClient(true);
    
    // Always show loading on first visit to the site
    const hasVisitedBefore = sessionStorage.getItem('hasVisited');
    
    if (showLoading && !hasVisitedBefore) {
      console.log('First visit - Starting loading screen...');
      setIsLoading(true);
      setPageLoaded(false); // Explicitly set to false
      // Mark that user has visited
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      // If not showing loading, mark as loaded immediately
      console.log('Not first visit or loading disabled, setting page as loaded');
      setPageLoaded(true);
    }
  }, [showLoading, setPageLoaded]);

  const handleLoadingComplete = () => {
    console.log('Loading complete, setting page as loaded');
    setIsLoading(false);
    // Set page loaded state after loading completes
    setTimeout(() => {
      setPageLoaded(true);
      console.log('Page loaded state set to true');
    }, 400);
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