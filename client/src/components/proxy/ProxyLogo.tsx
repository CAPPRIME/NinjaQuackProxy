export default function ProxyLogo() {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex items-center">
        <svg 
          className="h-12 w-12 text-primary" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M8 9l3 3-3 3M5 7h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M16 10c0 1-1 2-2 3 1 1 2 2 2 3 2-1 3-2.5 3-5s-1-4-3-5c0 1-1 2-2 3 1 1 2 2 2 3z" 
          />
        </svg>
        <h1 className="text-4xl font-bold ml-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          NinjaQuack
        </h1>
      </div>
    </div>
  );
}
