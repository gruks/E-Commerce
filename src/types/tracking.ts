export type TrackingMethod = 'order-id' | 'tracking-id';

export interface TrackingFormData {
  method: TrackingMethod;
  identifier: string;
}

export interface TrackingEntryProps {
  onTrack: (data: TrackingFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export interface TrackingValidation {
  isValid: boolean;
  error?: string;
}

export interface TrackingResult {
  success: boolean;
  data?: any;
  error?: string;
}