"use client";

import { Minus, Plus } from "lucide-react";
import { QuantityStepperProps } from "./types";

export const QuantityStepper = ({
  value,
  min = 1,
  max = 99,
  disabled = false,
  onChange,
  size = 'md'
}: QuantityStepperProps) => {
  const handleDecrease = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm'
  };

  const inputSizeClasses = {
    sm: 'h-8 text-xs px-2 min-w-[2.5rem]',
    md: 'h-10 text-sm px-3 min-w-[3rem]'
  };

  return (
    <div className="flex items-center border border-border-default rounded-lg overflow-hidden bg-bg-tertiary">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className={`${sizeClasses[size]} flex items-center justify-center hover:bg-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>
      
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || min;
          if (newValue >= min && newValue <= max && !disabled) {
            onChange(newValue);
          }
        }}
        className={`${inputSizeClasses[size]} text-center border-0 bg-transparent focus:outline-none focus:ring-0 font-medium text-text-primary`}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Quantity"
      />
      
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className={`${sizeClasses[size]} flex items-center justify-center hover:bg-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};