"use client";

import { useState } from 'react';
import { TrackingEntry } from './TrackingEntry';
import { TrackingFormData } from '@/src/types/tracking';

/**
 * Example usage of the TrackingEntry component
 * This demonstrates how to integrate the component with your tracking logic
 */
export const TrackingEntryExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleTrack = async (formData: TrackingFormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      setResult({
        method: formData.method,
        identifier: formData.identifier,
        status: 'found',
        message: 'Order tracking information retrieved successfully'
      });
      
      console.log('Tracking request:', formData);
    } catch (err) {
      setError('Failed to track order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        TrackingEntry Component Example
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Component */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Component
          </h2>
          <TrackingEntry
            onTrack={handleTrack}
            isLoading={isLoading}
            error={error}
          />
        </div>
        
        {/* Debug Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Debug Information
          </h2>
          <div className="bg-gray-100 border border-gray-200 p-4 text-sm">
            <div className="mb-4">
              <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
            </div>
            <div className="mb-4">
              <strong>Error:</strong> {error || 'None'}
            </div>
            <div>
              <strong>Result:</strong>
              <pre className="mt-2 text-xs bg-gray-200 p-2 overflow-auto">
                {result ? JSON.stringify(result, null, 2) : 'None'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};