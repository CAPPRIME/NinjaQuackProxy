import React, { useState, useEffect } from 'react';
import AdBlockerNotice from './ui/AdBlockerNotice';

// Define different ad sizes for different placements
type AdSize = 'banner' | 'sidebar' | 'leaderboard' | 'large-rectangle';

// Map ad sizes to dimensions
const adSizeDimensions = {
  'banner': { width: '468px', height: '60px' },
  'sidebar': { width: '300px', height: '600px' },
  'leaderboard': { width: '728px', height: '90px' },
  'large-rectangle': { width: '336px', height: '280px' }
};

interface AdComponentProps {
  size: AdSize;
  className?: string;
}

export default function AdComponent({ size, className = '' }: AdComponentProps) {
  const [adBlocked, setAdBlocked] = useState(false);
  
  useEffect(() => {
    // In a real implementation, we would try to load an ad
    // and set adBlocked to true if it fails
    const checkAdBlocker = async () => {
      try {
        // Simulate checking for ad blocker
        // In a real app, we would try to load an ad script
        const adBlockDetected = Math.random() > 0.5; // Just for demonstration
        setAdBlocked(adBlockDetected);
      } catch (error) {
        setAdBlocked(true);
      }
    };
    
    // Check for ad blocker
    checkAdBlocker();
  }, []);

  const { width, height } = adSizeDimensions[size];
  
  return (
    <div className={`ad-container relative ${className}`} style={{ width, height }}>
      {adBlocked ? (
        <div className="w-full h-full flex flex-col justify-center items-center border border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-md overflow-hidden">
          <AdBlockerNotice className="max-w-full m-2" />
        </div>
      ) : (
        <div 
          className="w-full h-full flex justify-center items-center bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-md overflow-hidden"
          style={{ width, height }}
        >
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 p-2">
            <span className="font-medium">Advertisement</span>
            <div className="text-xs opacity-75 mt-1">
              {/* This would be replaced with actual ad content */}
              Ad content would appear here
            </div>
          </div>
        </div>
      )}
    </div>
  );
}