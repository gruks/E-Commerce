"use client";

import { memo } from 'react';
import { Check, Circle, Clock } from 'lucide-react';
import { TrackingStep } from '@/src/types/order';

interface TrackingTimelineProps {
  steps: TrackingStep[];
  className?: string;
}

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) return '';
  
  return new Intl.DateTimeFormat("en-US", {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date(timestamp));
};

export const TrackingTimeline = memo(({ steps, className = '' }: TrackingTimelineProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.id} className="relative">
            {/* Timeline Line */}
            {!isLast && (
              <div 
                className={`
                  absolute left-4 top-8 w-0.5 h-8 transition-colors duration-300
                  ${step.isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `}
                aria-hidden="true"
              />
            )}
            
            {/* Step Content */}
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div 
                className={`
                  relative flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${step.isCompleted 
                    ? 'bg-green-500 border-green-500 text-black' 
                    : step.isActive
                      ? 'bg-[#0E2A47] border-[#0E2A47] text-black animate-pulse'
                      : 'bg-white border-gray-300 text-gray-400'
                  }
                `}
                role="img"
                aria-label={`Step ${index + 1}: ${step.isCompleted ? 'Completed' : step.isActive ? 'In Progress' : 'Pending'}`}
              >
                {step.isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : step.isActive ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 
                      className={`
                        text-sm font-medium transition-colors duration-300
                        ${step.isCompleted || step.isActive 
                          ? 'text-gray-900' 
                          : 'text-gray-500'
                        }
                      `}
                    >
                      {step.title}
                    </h4>
                    <p 
                      className={`
                        text-xs mt-1 transition-colors duration-300
                        ${step.isCompleted || step.isActive 
                          ? 'text-gray-600' 
                          : 'text-gray-400'
                        }
                      `}
                    >
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Timestamp */}
                  {step.timestamp && (
                    <time 
                      className={`
                        text-xs flex-shrink-0 ml-4 transition-colors duration-300
                        ${step.isCompleted || step.isActive 
                          ? 'text-gray-500' 
                          : 'text-gray-400'
                        }
                      `}
                      dateTime={step.timestamp}
                    >
                      {formatTimestamp(step.timestamp)}
                    </time>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

TrackingTimeline.displayName = 'TrackingTimeline';