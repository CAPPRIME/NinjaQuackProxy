import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AdBlockNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if Ad Blocker is enabled
    const checkAdBlocker = async () => {
      try {
        // Try to fetch an ad-related resource
        const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors'
        });
        
        // If the fetch succeeds, ad blocker might not be enabled
        setIsVisible(false);
      } catch (error) {
        // If fetch fails, ad blocker might be enabled
        setIsVisible(true);
      }
    };

    // Check after a short delay to ensure page has loaded
    const timer = setTimeout(() => {
      checkAdBlocker();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || dismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4">
        <button 
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            Servers are expensive! :(
          </h3>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Please support this game by disabling your ad blocker for this site.
          </p>
          
          <p className="italic">
            (Playing in an incognito window might work.)
          </p>
          
          <p className="pt-2">
            Thank you, I really appreciate it!
          </p>
          
          <p className="text-right font-medium">
            — The Developer
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setDismissed(true)}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md font-medium"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}