/**
 * Opens the current website in an about:blank tab.
 * This can help bypass certain restrictions by opening the content in a new context.
 */
export function openInBlankTab() {
  // Create a new window through about:blank
  const newWindow = window.open('about:blank', '_blank');
  
  if (!newWindow) {
    alert('Pop-up blocked. Please allow pop-ups for this site to use this feature.');
    return;
  }
  
  // Write the current origin to the new window
  const currentOrigin = window.location.origin;
  const currentPath = window.location.pathname + window.location.search + window.location.hash;
  
  // Write content to the blank page that will redirect to our site
  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>NinjaQuack</title>
      <style>
        body {
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #f9fafb;
          color: #1f2937;
        }
        .container {
          text-align: center;
          padding: 2rem;
          max-width: 600px;
        }
        h1 {
          margin-bottom: 1rem;
          color: #4a0d80;
        }
        iframe {
          width: 100%;
          height: 100vh;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }
        .button {
          background-color: #4a0d80;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          margin-top: 1rem;
        }
      </style>
    </head>
    <body>
      <iframe src="${currentOrigin}${currentPath}" allow="fullscreen"></iframe>
    </body>
    </html>
  `);
  
  // Close the document to finish loading
  newWindow.document.close();
}