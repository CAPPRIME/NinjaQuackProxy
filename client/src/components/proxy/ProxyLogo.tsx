export default function ProxyLogo() {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex items-center">
        <svg 
          className="h-10 w-10 text-primary" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 4a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z" 
          />
        </svg>
        <h1 className="text-3xl font-bold ml-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Netlify Proxy
        </h1>
      </div>
    </div>
  );
}
