import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdBlockerNoticeProps {
  className?: string;
}

export default function AdBlockerNotice({ className = "" }: AdBlockerNoticeProps) {
  // Check if the notice was dismissed
  const isDismissed = localStorage.getItem('adBlockerNoticeDismissed') === 'true';
  
  if (isDismissed) {
    return null;
  }

  return (
    <Alert variant="destructive" className={`border-amber-500 bg-amber-50 dark:bg-amber-950/30 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="text-amber-800 dark:text-amber-300">Ad Blocker Detected</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-200">
        Please disable your ad blocker to support our service. Ads help us keep NinjaQuack Proxy running for free.
      </AlertDescription>
    </Alert>
  );
}