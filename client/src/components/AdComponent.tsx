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
    // For now, we'll just set adBlocked to false to always show the ad placeholder
    // This can be replaced with real ad block detection later
    setAdBlocked(false);
    
    // In a real implementation, we would have code like this:
    /*
    const checkAdBlocker = async () => {
      try {
        // Attempt to load an ad script or make an ad network request
        const response = await fetch('https://ad-network-url.com/check');
        const adBlockDetected = !response.ok;
        setAdBlocked(adBlockDetected);
      } catch (error) {
        setAdBlocked(true);
      }
    };
    checkAdBlocker();
    */
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
          className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-md overflow-hidden border border-purple-200 dark:border-purple-800"
          style={{ width, height }}
        >
          <div className="text-center text-gray-600 dark:text-gray-300 p-2">
            <svg className="w-8 h-8 mx-auto mb-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="font-medium block">Advertisement</span>
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
              Support NinjaQuack by viewing ads
            </p>
          </div>
        </div>
      )}
    </div>
  );
}