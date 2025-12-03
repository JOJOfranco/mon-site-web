/**
 * Performance Optimization for Font Awesome
 * Version optimisée par Claude pour JNV Marketing
 */

document.addEventListener('DOMContentLoaded', () => {
  // Collect all critical Font Awesome icons from the viewport
  const preloadCriticalIcons = () => {
    const criticalIconElements = Array.from(document.querySelectorAll('.fa, .fas'));
    const iconClasses = new Set();
    
    criticalIconElements.forEach(element => {
      Array.from(element.classList).forEach(className => {
        if (className.startsWith('fa-')) {
          iconClasses.add(className);
        }
      });
    });
  };

  // Execute optimization function
  preloadCriticalIcons();
}); 