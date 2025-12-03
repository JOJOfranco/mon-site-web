document.addEventListener('DOMContentLoaded', function() {
  // Stats counter animation
  const statsSection = document.getElementById('stats');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation for stat numbers
          const statNumbers = document.querySelectorAll('.stat-number');
          const availabilityElement = document.querySelector('.availability-animation');
          
          // Function to animate with delay
          const animateWithDelay = (element, delay) => {
            setTimeout(() => {
              if (element.classList.contains('stat-number')) {
                const target = parseInt(element.getAttribute('data-target'));
                let count = 0;
                const increment = target / (2000 / 16); // 60fps
                
                const updateCount = () => {
                  count += increment;
                  if (count < target) {
                    if (target === 100) {
                      element.textContent = Math.ceil(count) + '%';
                    } else {
                      element.textContent = '+' + Math.ceil(count);
                    }
                    requestAnimationFrame(updateCount);
                  } else {
                    if (target === 100) {
                      element.textContent = target + '%';
                    } else {
                      element.textContent = '+' + target;
                    }
                  }
                };
                
                updateCount();
              } else if (element.classList.contains('availability-animation')) {
                // Animation for 24/7 element
                element.style.opacity = '0';
                element.style.transform = 'translateX(-100px) translateY(-100px)';
                
                let opacity = 0;
                let positionX = -100;
                let positionY = -100;
                
                const animate = () => {
                  opacity += 0.05;
                  if (opacity > 1) opacity = 1;
                  
                  positionX += 5;
                  if (positionX > 0) positionX = 0;
                  
                  positionY += 5;
                  if (positionY > 0) positionY = 0;
                  
                  element.style.opacity = opacity;
                  element.style.transform = `translateX(${positionX}px) translateY(${positionY}px)`;
                  
                  if (opacity < 1 || positionX < 0 || positionY < 0) {
                    requestAnimationFrame(animate);
                  } else {
                    element.classList.add('landed');
                  }
                };
                
                animate();
              }
            }, delay);
          };

          // Animate each stat with increasing delay
          statNumbers.forEach((stat, index) => {
            animateWithDelay(stat, index * 1500);
          });
          
          // Animate the 24/7 after the stats
          if (availabilityElement) {
            animateWithDelay(availabilityElement, statNumbers.length * 1500);
          }

          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }
}); 