import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AdBlockNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if notification was previously dismissed
    const previouslyDismissed = localStorage.getItem('adBlockerNoticeDismissed');
    if (previouslyDismissed === 'true') {
      return;
    }
    
    // Always show the message after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('adBlockerNoticeDismissed', 'true');
  };

  if (!isVisible || dismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4">
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            Please Disable AdBlocker
          </h3>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            We've detected that you may be using an ad blocker. Our site relies on ads to keep our servers running.
          </p>
          
          <p>
            Please consider disabling your ad blocker for this site to help support our free service.
          </p>
          
          <p className="italic">
            Without ads, we can't maintain the infrastructure needed for NinjaQuack Proxy.
          </p>
          
          <p className="pt-2 font-medium">
            Thank you for your understanding and support!
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDismiss}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md font-medium"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}