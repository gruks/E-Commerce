"use client";

import { useState, useCallback } from 'react';
import { TrackingMethod, TrackingEntryProps, TrackingFormData } from '@/src/types/tracking';
import { validateIdentifier, formatIdentifier } from '@/src/lib/trackingValidation';

export const TrackingEntry = ({ 
  onTrack, 
  isLoading = false, 
  error = null,
  className = '' 
}: TrackingEntryProps) => {
  const [selectedMethod, setSelectedMethod] = useState<TrackingMethod>('order-id');
  const [identifier, setIdentifier] = useState('');

  const handleMethodChange = useCallback((method: TrackingMethod) => {
    setSelectedMethod(method);
    setIdentifier('');
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier.trim() || isLoading) return;
    
    const validation = validateIdentifier(selectedMethod, identifier);
    if (!validation.isValid) {
      return;
    }

    const formattedIdentifier = formatIdentifier(selectedMethod, identifier);
    
    const formData: TrackingFormData = {
      method: selectedMethod,
      identifier: formattedIdentifier
    };

    try {
      await onTrack(formData);
    } catch (err) {
      console.error('Tracking submission error:', err);
    }
  }, [selectedMethod, identifier, isLoading, onTrack]);

  const getPlaceholder = () => {
    return selectedMethod === 'order-id' ? 'Enter your Order ID' : 'Enter your Tracking ID';
  };

  return (
    <form 
      className={`track-form max-w-2xl mx-auto shadow-sm p-6 space-y-6 ${className}`}
      onSubmit={handleSubmit}
    >
      {/* Radio Selection */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Order ID */}
        <label className="radio-item">
          <input 
            type="radio" 
            name="searchBy" 
            value="order-id"
            checked={selectedMethod === 'order-id'}
            onChange={() => handleMethodChange('order-id')}
          />
          <span className="radio-circle"></span>
          <span className="radio-text">Order ID</span>
        </label>

        {/* Tracking ID */}
        <label className="radio-item">
          <input 
            type="radio" 
            name="searchBy" 
            value="tracking-id"
            checked={selectedMethod === 'tracking-id'}
            onChange={() => handleMethodChange('tracking-id')}
          />
          <span className="radio-circle"></span>
          <span className="radio-text">Tracking ID</span>
        </label>
      </div>

      {/* Input + Button */}
      <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2 max-w-md focus:outline-none focus:ring-2 focus:ring-#fffff0 transition disabled:opacity-50"
          />
        <button
          type="submit"
          disabled={!identifier.trim() || isLoading}
          className="bg-white text-black px-6 py-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Tracking...' : 'Track Your Order'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm mt-2">
          {error}
        </div>
      )}
    </form>
  );
};