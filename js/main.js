// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality removed as requested

    // Stats animation
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation des nombres
                    const stats = document.querySelectorAll('.stat-number');
                    const availabilityElement = document.querySelector('.availability-animation');
                    
                    // Fonction pour animer un élément avec un délai
                    const animateWithDelay = (element, delay) => {
                        setTimeout(() => {
                            if (element.classList.contains('stat-number')) {
                                const target = parseInt(element.getAttribute('data-target'));
                                let count = 0;
                                const duration = 2000; // 2 seconds
                                const increment = target / (duration / 16); // 60fps
                                
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
                                // Réinitialiser la position et l'opacité
                                element.style.opacity = '0';
                                element.style.transform = 'translateX(-100px) translateY(-100px)';
                                
                                // Animation de chute et de déplacement
                                let opacity = 0;
                                let positionX = -100;
                                let positionY = -100;
                                
                                const animate = () => {
                                    // Augmenter l'opacité
                                    opacity += 0.05;
                                    if (opacity > 1) opacity = 1;
                                    
                                    // Déplacer horizontalement
                                    positionX += 5;
                                    if (positionX > 0) positionX = 0;
                                    
                                    // Déplacer verticalement
                                    positionY += 5;
                                    if (positionY > 0) positionY = 0;
                                    
                                    // Appliquer les transformations
                                    element.style.opacity = opacity;
                                    element.style.transform = `translateX(${positionX}px) translateY(${positionY}px)`;
                                    
                                    // Continuer l'animation si nécessaire
                                    if (opacity < 1 || positionX < 0 || positionY < 0) {
                                        requestAnimationFrame(animate);
                                    } else {
                                        // Une fois l'atterrissage terminé, ajouter la classe pour le shake
                                        element.classList.add('landed');
                                    }
                                };
                                
                                animate();
                            }
                        }, delay);
                    };

                    // Animer chaque élément avec un délai croissant
                    stats.forEach((stat, index) => {
                        animateWithDelay(stat, index * 1500); // 1.5 secondes entre chaque
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
            } else {
                backToTopButton.classList.add('hidden');
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
                // No need to close mobile menu as it's been removed
            }
        });
    });
    
    // Gestion des cookies RGPD
    const setupCookieConsent = () => {
        const cookieBanner = document.getElementById('cookie-consent-banner');
        const customizeToggle = document.getElementById('cookie-customize-toggle');
        const customizePanel = document.getElementById('cookie-customize-panel');
        const acceptAllButton = document.getElementById('cookie-accept-all');
        const rejectAllButton = document.getElementById('cookie-reject-all');
        const savePrefsButton = document.getElementById('cookie-save-preferences');
        
        // Toggles pour les boutons
        const toggles = document.querySelectorAll('.toggle-label');
        
        // Valeurs par défaut des préférences cookies
        let cookiePreferences = {
            necessary: true, // Toujours true et non modifiable
            analytics: false,
            marketing: false,
            preferences: false
        };
        
        // Fonction pour sauvegarder les préférences
        const saveCookiePreferences = (preferences) => {
            // Sauvegarder les préférences pour 6 mois (180 jours)
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (180 * 24 * 60 * 60 * 1000));
            
            // Convertir l'objet de préférences en JSON
            const preferencesJson = JSON.stringify(preferences);
            
            // Sauvegarder dans un cookie
            document.cookie = `cookie_preferences=${encodeURIComponent(preferencesJson)};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
            
            // Appliquer les préférences (ici vous pourriez charger différents scripts en fonction des préférences)
            applyPreferences(preferences);
            
            // Ajouter une animation de disparition à la bannière
            cookieBanner.style.opacity = '0';
            cookieBanner.style.transform = 'translateY(20px)';
            
            // Cacher la bannière après l'animation
            setTimeout(() => {
                cookieBanner.classList.add('hidden');
                cookieBanner.style.opacity = '1';
                cookieBanner.style.transform = 'translateY(0)';
            }, 500);
        };
        
        // Fonction pour appliquer les préférences de cookies
        const applyPreferences = (preferences) => {
            // Pour chaque type de cookie, vous pouvez activer/désactiver les scripts correspondants
            
            // Par exemple, pour Google Analytics :
            if (preferences.analytics) {
                // Code pour charger Google Analytics
                console.log('Google Analytics activé');
                // Insérer ici le code de Google Analytics
            }
            
            if (preferences.marketing) {
                // Code pour charger des scripts marketing
                console.log('Cookies marketing activés');
                // Insérer ici le code pour les cookies marketing
            }
            
            if (preferences.preferences) {
                // Code pour activer les préférences
                console.log('Cookies de préférences activés');
                // Insérer ici le code pour les cookies de préférences
            }
            
            // Enregistrement du consentement (pourrait être envoyé à un serveur)
            console.log('Préférences cookies sauvegardées:', preferences);
        };
        
        // Fonction pour obtenir les préférences sauvegardées
        const getCookiePreferences = () => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('cookie_preferences=')) {
                    const preferencesJson = decodeURIComponent(cookie.substring('cookie_preferences='.length));
                    try {
                        return JSON.parse(preferencesJson);
                    } catch (e) {
                        console.error('Erreur lors du parsing des préférences de cookies:', e);
                        return null;
                    }
                }
            }
            return null; // Aucune préférence trouvée
        };
        
        // Gestion des toggles
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const inputId = this.getAttribute('for');
                const input = document.getElementById(inputId);
                
                if (input && !input.disabled) {
                    // Inverser l'état de la case à cocher
                    input.checked = !input.checked;
                    
                    // Mettre à jour l'apparence du toggle
                    if (input.checked) {
                        this.classList.add('bg-purple-700');
                        this.querySelector('.toggle-dot').classList.add('translate-x-4');
                    } else {
                        this.classList.remove('bg-purple-700');
                        this.querySelector('.toggle-dot').classList.remove('translate-x-4');
                    }
                }
                
                e.preventDefault(); // Empêcher les comportements par défaut
            });
        });
        
        // Vérifier si les préférences de cookies sont déjà définies
        const savedPreferences = getCookiePreferences();
        
        if (savedPreferences) {
            // Appliquer les préférences sauvegardées
            cookiePreferences = savedPreferences;
            applyPreferences(cookiePreferences);
        } else {
            // Afficher la bannière de consentement après un court délai
            setTimeout(() => {
                if (cookieBanner) {
                    cookieBanner.classList.remove('hidden');
                }
            }, 1000); // Délai de 1 seconde pour permettre au site de se charger d'abord
        }
        
        // Attacher les event listeners aux boutons
        if (customizeToggle) {
            customizeToggle.addEventListener('click', () => {
                customizePanel.classList.toggle('hidden');
            });
        }
        
        if (acceptAllButton) {
            acceptAllButton.addEventListener('click', () => {
                // Accepter tous les types de cookies
                cookiePreferences = {
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    preferences: true
                };
                
                // Mettre à jour l'interface utilisateur
                document.getElementById('cookie-analytics').checked = true;
                document.getElementById('cookie-marketing').checked = true;
                document.getElementById('cookie-preferences').checked = true;
                
                // Appliquer les préférences
                saveCookiePreferences(cookiePreferences);
            });
        }
        
        if (rejectAllButton) {
            rejectAllButton.addEventListener('click', () => {
                // Refuser tous les cookies sauf les nécessaires
                cookiePreferences = {
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    preferences: false
                };
                
                // Mettre à jour l'interface utilisateur
                document.getElementById('cookie-analytics').checked = false;
                document.getElementById('cookie-marketing').checked = false;
                document.getElementById('cookie-preferences').checked = false;
                
                // Appliquer les préférences
                saveCookiePreferences(cookiePreferences);
            });
        }
        
        if (savePrefsButton) {
            savePrefsButton.addEventListener('click', () => {
                // Collecter les préférences de l'utilisateur
                cookiePreferences = {
                    necessary: true,
                    analytics: document.getElementById('cookie-analytics').checked,
                    marketing: document.getElementById('cookie-marketing').checked,
                    preferences: document.getElementById('cookie-preferences').checked
                };
                
                // Appliquer les préférences
                saveCookiePreferences(cookiePreferences);
            });
        }
    };
    
    // Initialiser la gestion des cookies
    setupCookieConsent();
    
    // Gestion du popup newsletter
    const setupNewsletterPopup = () => {
        const newsletterPopup = document.getElementById('newsletter-popup');
        const closeButton = document.getElementById('close-newsletter');
        
        // Vérifier si l'utilisateur a déjà fermé le popup
        const hasClosedPopup = localStorage.getItem('newsletter_popup_closed');
        
        if (!hasClosedPopup && newsletterPopup) {
            // Afficher le popup après 2 minutes
            setTimeout(() => {
                newsletterPopup.classList.remove('translate-y-full');
            }, 120000); // 2 minutes
            
            // Gérer la fermeture du popup
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    newsletterPopup.classList.add('translate-y-full');
                    
                    // Mémoriser que l'utilisateur a fermé le popup (pendant 7 jours)
                    const expiryDate = new Date();
                    expiryDate.setTime(expiryDate.getTime() + (7 * 24 * 60 * 60 * 1000));
                    localStorage.setItem('newsletter_popup_closed', expiryDate.toUTCString());
                });
            }
        }
    };
    
    // Initialiser le popup newsletter
    setupNewsletterPopup();

    // Newsletter popup logic
    const marketingNewsletterPopup = document.getElementById('marketing-newsletter-popup');
    const closeMarketingNewsletterBtn = document.getElementById('close-marketing-newsletter');
    
    if (marketingNewsletterPopup && closeMarketingNewsletterBtn) {
        // Show popup after 3 minutes
        setTimeout(() => {
            // Only show if user hasn't closed it before
            if (!localStorage.getItem('marketing_newsletter_closed')) {
                marketingNewsletterPopup.classList.remove('hidden');
                marketingNewsletterPopup.classList.add('flex');
            }
        }, 180000); // 3 minutes in milliseconds
        
        // Close popup when close button is clicked
        closeMarketingNewsletterBtn.addEventListener('click', () => {
            marketingNewsletterPopup.classList.add('hidden');
            marketingNewsletterPopup.classList.remove('flex');
            // Remember that user closed the popup
            localStorage.setItem('marketing_newsletter_closed', 'true');
        });
        
        // Close popup when clicking outside
        marketingNewsletterPopup.addEventListener('click', (e) => {
            if (e.target === marketingNewsletterPopup) {
                marketingNewsletterPopup.classList.add('hidden');
                marketingNewsletterPopup.classList.remove('flex');
                localStorage.setItem('marketing_newsletter_closed', 'true');
            }
        });
        
        // Handle form submission
        const newsletterForm = document.getElementById('marketing-newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                // You can add form validation here if needed
                
                // Close popup and remember not to show it again
                setTimeout(() => {
                    marketingNewsletterPopup.classList.add('hidden');
                    marketingNewsletterPopup.classList.remove('flex');
                    localStorage.setItem('marketing_newsletter_closed', 'true');
                }, 1000); // Short delay to show a successful submission
            });
        }
    }
}); 