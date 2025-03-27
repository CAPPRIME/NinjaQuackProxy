import { useState, FormEvent } from "react";

interface ProxyControlsProps {
  onSubmit: (url: string) => void;
  currentUrl: string;
  onClearUrl: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleFullscreen?: () => void; // Optional for backward compatibility
}

export default function ProxyControls({
  onSubmit,
  currentUrl,
  onClearUrl,
  onGoBack,
  onGoForward,
  onRefresh,
  isMinimized,
  onToggleMinimize,
  darkMode,
  onToggleDarkMode,
  onToggleFullscreen
}: ProxyControlsProps) {
  const [inputUrl, setInputUrl] = useState(currentUrl);

  // Update input value when currentUrl changes externally
  if (currentUrl !== inputUrl) {
    setInputUrl(currentUrl);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputUrl.trim());
  };

  return (
    <div className={`proxy-controls bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-all duration-300 ${isMinimized ? 'shrink-controls' : ''}`}>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <input 
              type="url" 
              id="proxy-url" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
              placeholder="Enter URL (e.g., https://example.com)" 
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button 
                type="button" 
                className="inline-flex items-center px-2 border border-transparent rounded text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClearUrl}
                aria-label="Clear URL"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Browse URL"
          >
            <span>Browse</span>
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>

      {/* Quick Controls */}
      <div className="flex flex-wrap justify-between items-center text-sm">
        <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
          <button onClick={onGoBack} className="hover:text-primary focus:outline-none flex items-center">
            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button onClick={onGoForward} className="hover:text-primary focus:outline-none flex items-center">
            Forward
            <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button onClick={onRefresh} className="hover:text-primary focus:outline-none flex items-center">
            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Fullscreen button */}
          {onToggleFullscreen && (
            <button 
              onClick={onToggleFullscreen}
              className="text-gray-600 dark:text-gray-400 hover:text-primary focus:outline-none flex items-center"
              aria-label="Toggle fullscreen mode"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span className="ml-1 hidden sm:inline">Fullscreen</span>
            </button>
          )}
          
          <button 
            onClick={onToggleMinimize}
            className="text-gray-600 dark:text-gray-400 hover:text-primary focus:outline-none"
            aria-label={isMinimized ? 'Expand proxy controls' : 'Minimize proxy controls'}
          >
            {!isMinimized ? (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
          
          <button 
            onClick={onToggleDarkMode}
            className="text-gray-600 dark:text-gray-400 hover:text-primary focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {!darkMode ? (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
