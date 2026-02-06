"use client";

import { useMemo } from "react";
import { usePageRevealer } from "../../components/ui/PageTransition";

export default function CategoriesPage() {
  // Add the page revealer animation
  usePageRevealer();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-1/2 h-1/2 flex items-center justify-center">
        <p className="font-heading text-3xl">
            Thank You! for the response we currently are in test phase. 
            Once deployed we will use a payment api for the transaction.
        </p>
    </div>
  </div>
  );
}