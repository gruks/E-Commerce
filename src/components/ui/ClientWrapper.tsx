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
  loadingDuration = 3500 
}: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(showLoading);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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