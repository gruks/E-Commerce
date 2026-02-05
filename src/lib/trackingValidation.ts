import { TrackingMethod, TrackingValidation } from '@/src/types/tracking';

/**
 * Validates Order ID format
 * Expected format: ORD-YYYY-XXX (e.g., ORD-2024-001)
 */
export const validateOrderId = (id: string): TrackingValidation => {
  const trimmedId = id.trim();
  
  if (!trimmedId) {
    return { isValid: false, error: 'Order ID is required' };
  }
  
  if (trimmedId.length < 8) {
    return { isValid: false, error: 'Order ID is too short' };
  }
  
  // Basic format validation for Order ID
  const orderIdPattern = /^ORD-\d{4}-\d{3,}$/i;
  if (!orderIdPattern.test(trimmedId)) {
    return { 
      isValid: false, 
      error: 'Invalid Order ID format. Expected: ORD-YYYY-XXX' 
    };
  }
  
  return { isValid: true };
};

/**
 * Validates Tracking ID format
 * Expected format: TRK followed by 9+ alphanumeric characters
 */
export const validateTrackingId = (id: string): TrackingValidation => {
  const trimmedId = id.trim();
  
  if (!trimmedId) {
    return { isValid: false, error: 'Tracking ID is required' };
  }
  
  if (trimmedId.length < 10) {
    return { isValid: false, error: 'Tracking ID is too short' };
  }
  
  // Basic format validation for Tracking ID
  const trackingIdPattern = /^TRK[A-Z0-9]{9,}$/i;
  if (!trackingIdPattern.test(trimmedId)) {
    return { 
      isValid: false, 
      error: 'Invalid Tracking ID format. Expected: TRK followed by 9+ characters' 
    };
  }
  
  return { isValid: true };
};

/**
 * Validates identifier based on selected method
 */
export const validateIdentifier = (
  method: TrackingMethod, 
  identifier: string
): TrackingValidation => {
  switch (method) {
    case 'order-id':
      return validateOrderId(identifier);
    case 'tracking-id':
      return validateTrackingId(identifier);
    default:
      return { isValid: false, error: 'Invalid tracking method' };
  }
};

/**
 * Formats identifier for display
 */
export const formatIdentifier = (
  method: TrackingMethod, 
  identifier: string
): string => {
  const trimmed = identifier.trim().toUpperCase();
  
  switch (method) {
    case 'order-id':
      // Ensure ORD- prefix
      return trimmed.startsWith('ORD-') ? trimmed : `ORD-${trimmed}`;
    case 'tracking-id':
      // Ensure TRK prefix
      return trimmed.startsWith('TRK') ? trimmed : `TRK${trimmed}`;
    default:
      return trimmed;
  }
};