/**
 * Script JavaScript principal optimisé pour JNV Marketing
 */

document.addEventListener('DOMContentLoaded', function() {
    // Stats animation
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation des chiffres
                    const stats = document.querySelectorAll('.stat-number');
                    const availabilityElement = document.querySelector('.availability-animation');
                    
                    // Fonction pour animer un élément avec un délai
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
                                // Animation de l'élément 24/7
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

                    // Animer chaque élément avec un délai croissant
                    stats.forEach((stat, index) => {
                        animateWithDelay(stat, index * 1500);
                    });
                    
                    // Animer le 24/7 après les statistiques
                    if (availabilityElement) {
                        animateWithDelay(availabilityElement, stats.length * 1500);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // FAQ toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        if (question && answer && icon) {
            question.addEventListener('click', () => {
                // Fermer toutes les autres réponses
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        if (otherAnswer) otherAnswer.classList.add('hidden');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                });

                // Basculer la réponse actuelle
                answer.classList.toggle('hidden');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        }
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.remove('invisible');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.add('invisible');
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('opacity-0');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion des cookies RGPD - Version simplifiée
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const customizeToggle = document.getElementById('cookie-customize-toggle');
    const customizePanel = document.getElementById('cookie-customize-panel');
    const acceptAllButton = document.getElementById('cookie-accept-all');
    const rejectAllButton = document.getElementById('cookie-reject-all');
    const savePrefsButton = document.getElementById('cookie-save-preferences');
    const toggles = document.querySelectorAll('.toggle-label');
    
    // Préférences par défaut
    let cookiePreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
    };
    
    // Fonction pour sauvegarder les préférences
    const saveCookiePreferences = (preferences) => {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (180 * 24 * 60 * 60 * 1000));
        document.cookie = `cookie_preferences=${encodeURIComponent(JSON.stringify(preferences))};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
        
        cookieBanner.style.opacity = "0";
        cookieBanner.style.transform = "translateY(20px)";
        setTimeout(() => {
            cookieBanner.classList.add('hidden');
        }, 500);
    };
    
    // Vérifier si les préférences existent déjà
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
    
    const savedPreferences = getCookieValue('cookie_preferences');
    
    if (!savedPreferences && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.remove('hidden');
        }, 1000);
    }
    
    // Gestion des events
    if (customizeToggle) {
        customizeToggle.addEventListener('click', () => {
            customizePanel.classList.toggle('hidden');
        });
    }
    
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