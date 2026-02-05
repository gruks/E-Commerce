"use client";

import { memo } from 'react';

export const OrderCardSkeleton = memo(() => (
  <div className="bg-gray-50 border border-gray-200 p-4 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div className="flex items-center gap-3 mb-3">
      <div className="flex -space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-8 h-8 bg-gray-200 border-2 border-white"></div>
        ))}
      </div>
      <div className="h-3 bg-gray-200 rounded w-16"></div>
    </div>

    <div className="flex items-center justify-between">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
      <div className="h-3 bg-gray-200 rounded w-24"></div>
    </div>
  </div>
));

OrderCardSkeleton.displayName = 'OrderCardSkeleton';

export const OrderDetailsSkeleton = memo(() => (
  <div className="bg-gray-50 border border-gray-200 p-6 animate-pulse">
    {/* Header */}
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2 mb-6">
      <div className="h-10 bg-gray-200 rounded w-24"></div>
      <div className="h-10 bg-gray-200 rounded w-20"></div>
      <div className="h-10 bg-gray-200 rounded w-20"></div>
    </div>

    {/* Tracking Timeline */}
    <div className="mb-8">
      <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Items */}
    <div className="mb-8">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-gray-200">
            <div className="w-16 h-16 bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-40 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Order Summary */}
    <div className="mb-8">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="bg-gray-100 p-4 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Shipping & Payment */}
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
        <div className="bg-gray-100 p-4">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div>
        <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
        <div className="bg-gray-100 p-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  </div>
));

OrderDetailsSkeleton.displayName = 'OrderDetailsSkeleton';