/**
 * Helper file to clear cookies for testing
 * Add ?clear-cookies to the URL to clear cookies on page load
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if URL contains the clear-cookies parameter
  if (window.location.search.includes('clear-cookies')) {
    // Function to clear all cookies
    const clearCookies = () => {
      const cookies = document.cookie.split(';');
      
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
      
      console.log('All cookies cleared!');
      alert('Cookies cleared! The page will now reload.');
      
      // Remove the query parameter and reload
      const url = window.location.href.split('?')[0];
      window.location.href = url;
    };
    
    clearCookies();
  }
}); 