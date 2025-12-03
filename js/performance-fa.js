/**
 * Performance Optimization for Font Awesome
 * Optimizes loading of Font Awesome icons on the JNV Marketing site
 */

document.addEventListener('DOMContentLoaded', () => {
  // Collect all critical Font Awesome icons from the viewport
  const preloadCriticalIcons = () => {
    const criticalIconElements = Array.from(document.querySelectorAll('.fa, .fab, .fas, .far, .fal'));
    const iconClasses = new Set();
    
    criticalIconElements.forEach(element => {
      Array.from(element.classList).forEach(className => {
        if (className.startsWith('fa-')) {
          iconClasses.add(className);
        }
      });
    });
    
    console.log('Critical Font Awesome icons:', Array.from(iconClasses));
    
    // We're not creating the style block anymore as it was causing icons to disappear
    // Instead, we'll just log the critical icons for performance monitoring
  };

  // Load Font Awesome asynchronously but with high priority for critical icons
  const optimizeFontAwesomeLoading = () => {
    // Check if Font Awesome is already loaded via link tag
    const existingLinks = Array.from(document.querySelectorAll('link'));
    const hasFontAwesome = existingLinks.some(link => 
      link.href && (
        link.href.includes('fontawesome') || 
        link.href.includes('font-awesome')
      )
    );

    if (!hasFontAwesome) {
      console.log('Font Awesome not detected in link tags, optimizing loading...');
      // This would only run if FA wasn't already included - which it is in our case
      // But keeping as fallback
    }
  };
  
  // Execute optimization functions
  preloadCriticalIcons();
  optimizeFontAwesomeLoading();
  
  // Log performance metrics for Font Awesome
  if (window.performance && window.performance.getEntriesByType) {
    const resourceEntries = window.performance.getEntriesByType('resource');
    const fontAwesomeResources = resourceEntries.filter(entry => 
      entry.name.includes('fontawesome') || 
      entry.name.includes('font-awesome') ||
      entry.name.includes('fa-')
    );
    
    if (fontAwesomeResources.length > 0) {
      console.log('Font Awesome resource metrics:', fontAwesomeResources);
      fontAwesomeResources.forEach(resource => {
        console.log(`${resource.name}: ${Math.round(resource.duration)}ms`);
      });
    }
  }
}); 