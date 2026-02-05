"use client";

import { PromotionProgress as PromotionProgressType } from "./types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

interface PromotionProgressProps {
  promotion: PromotionProgressType;
}

export const PromotionProgress = ({ promotion }: PromotionProgressProps) => {
  const progress = Math.min((promotion.current / promotion.target) * 100, 100);
  const remaining = Math.max(promotion.target - promotion.current, 0);

  return (
    <div className="bg-brand-softer border border-brand-soft rounded-lg p-4 mb-4">
      {/* Progress Message */}
      <div className="text-center mb-3">
        {remaining > 0 ? (
          <p className="text-sm text-text-primary">
            <span className="font-medium">Add {formatCurrency(remaining)} more</span>{" "}
            <span className="text-text-secondary">{promotion.message}</span>
          </p>
        ) : (
          <p className="text-sm font-medium text-brand-primary">
            🎉 {promotion.message}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Milestone Indicators */}
        <div className="flex justify-between mt-2 text-xs text-text-muted">
          <span>{formatCurrency(0)}</span>
          <span className="font-medium text-brand-primary">
            {formatCurrency(promotion.target)}
          </span>
        </div>
      </div>

      {/* Next Milestone */}
      {promotion.nextMilestone && remaining > 0 && (
        <div className="mt-2 text-center">
          <p className="text-xs text-text-muted">
            Next: <span className="font-medium">{promotion.nextMilestone.reward}</span>
          </p>
        </div>
      )}
    </div>
  );
};