document.addEventListener('DOMContentLoaded', function() {
  // Préférences personnalisées - fonctionnalités
  const prefsPanel = document.getElementById('cookie-consent-banner');
  const customizeToggle = document.getElementById('cookie-customize-toggle');
  const customizePanel = document.getElementById('cookie-customize-panel');
  const acceptAllButton = document.getElementById('cookie-accept-all');
  const rejectAllButton = document.getElementById('cookie-reject-all');
  const savePrefsButton = document.getElementById('cookie-save-preferences');
  const toggles = document.querySelectorAll('.toggle-label');
  
  // Préférences par défaut
  let userPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  };
  
  // Fonction pour sauvegarder les préférences
  const saveUserPreferences = (preferences) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (180 * 24 * 60 * 60 * 1000)); // 180 jours
    
    document.cookie = `cookie_preferences=${encodeURIComponent(JSON.stringify(preferences))};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
    
    if (prefsPanel) {
      prefsPanel.style.opacity = "0";
      prefsPanel.style.transform = "translateY(20px)";
      setTimeout(() => {
        prefsPanel.classList.add('hidden');
      }, 500);
    }
  };
  
  // Fonction pour obtenir la valeur d'un cookie
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
  
  // Afficher le panneau si aucune préférence n'est enregistrée
  const savedPreferences = getCookieValue('cookie_preferences');
  
  // Pour le débogage
  console.log('Préférences sauvegardées:', savedPreferences);
  
  if (!savedPreferences && prefsPanel) {
    console.log('Affichage du panneau de préférences');
    // Forcer l'affichage au cas où le CSS l'aurait caché
    prefsPanel.style.display = 'flex';
    prefsPanel.classList.remove('hidden');
    
    setTimeout(() => {
      prefsPanel.style.opacity = "1";
      prefsPanel.style.transform = "translateY(0)";
    }, 1000);
  } else {
    console.log('Préférences déjà définies');
  }
  
  // Basculer le panneau personnalisé
  if (customizeToggle) {
    customizeToggle.addEventListener('click', () => {
      customizePanel.classList.toggle('hidden');
    });
  }
  
  // Gestion des clics sur les toggles
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
  
  // Bouton "Tout accepter"
  if (acceptAllButton) {
    acceptAllButton.addEventListener('click', () => {
      userPreferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true
      };
      saveUserPreferences(userPreferences);
    });
  }
  
  // Bouton "Tout refuser"
  if (rejectAllButton) {
    rejectAllButton.addEventListener('click', () => {
      userPreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
      };
      saveUserPreferences(userPreferences);
    });
  }
  
  // Bouton "Enregistrer mes préférences"
  if (savePrefsButton) {
    savePrefsButton.addEventListener('click', () => {
      userPreferences = {
        necessary: true,
        analytics: document.getElementById('cookie-analytics')?.checked || false,
        marketing: document.getElementById('cookie-marketing')?.checked || false,
        preferences: document.getElementById('cookie-preferences')?.checked || false
      };
      saveUserPreferences(userPreferences);
    });
  }
}); 