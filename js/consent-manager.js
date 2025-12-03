document.addEventListener('DOMContentLoaded', function() {
  // Cookie Consent Banner functionality
  const cookieBanner = document.getElementById('cookie-consent-banner');
  const customizeToggle = document.getElementById('cookie-customize-toggle');
  const customizePanel = document.getElementById('cookie-customize-panel');
  const acceptAllButton = document.getElementById('cookie-accept-all');
  const rejectAllButton = document.getElementById('cookie-reject-all');
  const savePrefsButton = document.getElementById('cookie-save-preferences');
  const toggles = document.querySelectorAll('.toggle-label');
  
  // Default preferences
  let cookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  };
  
  // Function to save cookie preferences
  const saveCookiePreferences = (preferences) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (180 * 24 * 60 * 60 * 1000)); // 180 days
    
    document.cookie = `cookie_preferences=${encodeURIComponent(JSON.stringify(preferences))};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
    
    // Cacher simplement la bannière
    cookieBanner.style.display = 'none';
  };
  
  // Function to get cookie value
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  
  // Show banner if no preferences are saved
  const savedPreferences = getCookieValue('cookie_preferences');
  
  // For troubleshooting - log cookie status
  console.log('Cookie preferences:', savedPreferences);
  
  if (!savedPreferences && cookieBanner) {
    console.log('Showing cookie banner');
    // Afficher immédiatement la bannière
    cookieBanner.style.display = 'block';
  } else if (cookieBanner) {
    // S'assurer qu'elle est bien cachée
    cookieBanner.style.display = 'none';
  }
  
  // Toggle customize panel
  if (customizeToggle && customizePanel) {
    customizeToggle.addEventListener('click', () => {
      console.log('Toggle clicked - showing/hiding customize panel');
      customizePanel.classList.toggle('hidden');
    });
  } else {
    console.log('Error: customizeToggle or customizePanel not found');
  }
  
  // Handle toggle clicks
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      const inputId = this.getAttribute('for');
      const input = document.getElementById(inputId);
      
      if (input && !input.disabled) {
        input.checked = !input.checked;
        
        if (input.checked) {
          this.classList.add('bg-purple-700');
          this.querySelector('.toggle-dot').classList.add('translate-x-4');
        } else {
          this.classList.remove('bg-purple-700');
          this.querySelector('.toggle-dot').classList.remove('translate-x-4');
        }
      }
      
      e.preventDefault();
    });
  });
  
  // Accept all button
  if (acceptAllButton) {
    acceptAllButton.addEventListener('click', () => {
      cookiePreferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true
      };
      saveCookiePreferences(cookiePreferences);
    });
  }
  
  // Reject all button
  if (rejectAllButton) {
    rejectAllButton.addEventListener('click', () => {
      cookiePreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
      };
      saveCookiePreferences(cookiePreferences);
    });
  }
  
  // Save preferences button
  if (savePrefsButton) {
    savePrefsButton.addEventListener('click', () => {
      cookiePreferences = {
        necessary: true,
        analytics: document.getElementById('cookie-analytics')?.checked || false,
        marketing: document.getElementById('cookie-marketing')?.checked || false,
        preferences: document.getElementById('cookie-preferences')?.checked || false
      };
      saveCookiePreferences(cookiePreferences);
    });
  }
}); 