// === DÉTECTION DE VIEWPORT AMÉLIORÉE ===
function isInViewport(element, threshold = 0.2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.bottom - rect.top;
    
    return (
        rect.top <= windowHeight - (elementHeight * threshold) &&
        rect.bottom >= (elementHeight * threshold)
    );
}

// === DÉTECTION DE VIEWPORT AMÉLIORÉE ===
function isInViewport(element, threshold = 0.2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.bottom - rect.top;
    
    return (
        rect.top <= windowHeight - (elementHeight * threshold) &&
        rect.bottom >= (elementHeight * threshold)
    );
}

// === GESTION DU SCROLL AVEC BARRE DE PROGRESSION ===
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
    
    // Bouton retour en haut
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (winScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    scrollProgress = scrolled;
}
function handleScroll() {
    // Éléments principaux
    const scrollElements = document.querySelectorAll('.scroll-element');
    scrollElements.forEach((el, index) => {
        if (isInViewport(el) && !el.classList.contains('visible')) {
            // Délai pour effet cascade
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        }
    });

    // Images de projet
    const projectImages = document.querySelectorAll('.projet-img');
    projectImages.forEach((img, index) => {
        if (isInViewport(img) && !img.classList.contains('visible')) {
            setTimeout(() => {
                img.classList.add('visible');
            }, index * 200);
        }
    });

    // Expériences avec animation en cascade
    const experiences = document.querySelectorAll('.experience');
    experiences.forEach((exp, index) => {
        if (isInViewport(exp) && !exp.classList.contains('visible')) {
            setTimeout(() => {
                exp.classList.add('visible');
            }, index * 150);
        }
    });

    // Certifications avec animation en cascade
    const certItems = document.querySelectorAll('.cert-list li');
    certItems.forEach((cert, index) => {
        if (isInViewport(cert) && !cert.classList.contains('visible')) {
            setTimeout(() => {
                cert.classList.add('visible');
            }, index * 80);
        }
    });

    // Logos d'expérience
    const experienceLogos = document.querySelectorAll('.experience-logo');
    experienceLogos.forEach((logo, index) => {
        if (isInViewport(logo) && !logo.classList.contains('visible')) {
            setTimeout(() => {
                logo.classList.add('visible');
            }, index * 100);
        }
    });

    // Miniatures de certifications
    const certThumbs = document.querySelectorAll('.cert-thumb');
    certThumbs.forEach((thumb, index) => {
        if (isInViewport(thumb) && !thumb.classList.contains('visible')) {
            setTimeout(() => {
                thumb.classList.add('visible');
            }, index * 60);
        }
    });
}

// === SMOOTH SCROLL POUR LA NAVIGATION ===
function initSmoothScroll() {
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === ANIMATION D'ENTRÉE POUR LE HEADER ===
function animateHeader() {
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            header.style.transition = 'all 1s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
}

// === EFFETS DE PARALLAXE LÉGER ===
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.projet-img');
    
    parallaxElements.forEach(el => {
        const rate = scrolled * -0.1;
        if (isInViewport(el)) {
            el.style.transform = `translateY(${rate}px)`;
        }
    });
}

// === ANIMATION DE COMPTEUR POUR LES CERTIFICATIONS ===
function animateCounters() {
    const certSections = document.querySelectorAll('#certifications h3');
    
    certSections.forEach((section, index) => {
        if (isInViewport(section) && !section.classList.contains('counted')) {
            section.classList.add('counted');
            
            // Compte les certifications dans cette section
            const nextUl = section.nextElementSibling;
            if (nextUl && nextUl.tagName === 'UL') {
                const certCount = nextUl.querySelectorAll('li').length;
                const originalText = section.textContent;
                
                // Animation du compteur
                let currentCount = 0;
                const increment = Math.ceil(certCount / 20);
                
                const countTimer = setInterval(() => {
                    currentCount += increment;
                    if (currentCount >= certCount) {
                        currentCount = certCount;
                        clearInterval(countTimer);
                    }
                    section.textContent = `${originalText} (${currentCount})`;
                }, 50);
            }
        }
    });
}

// === EFFET DE TYPING POUR LE TITRE ===
function typewriterEffect() {
    const title = document.querySelector('header h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// === INITIALISATION COMPLÈTE ===
function init() {
    // Création des éléments interactifs
    createInteractiveElements();
    
    // Animations initiales avec séquence
    animateHeader();
    setTimeout(typewriterEffect, 1200);
    
    // Configuration des événements optimisés
    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('load', () => {
        handleScroll();
        animateCounters();
        // Masquer la barre de chargement
        setTimeout(() => {
            const loadingBar = document.querySelector('.loading-bar');
            if (loadingBar) loadingBar.style.display = 'none';
        }, 2000);
    });
    
    // Initialisation des fonctionnalités interactives
    initSmoothScroll();
    initAdvancedHoverEffects();
    initCursorEffects();
    
    // Effets sonores (optionnel - commenté par défaut)
    // initSoundEffects();
    
    // Vérification initiale après un délai
    setTimeout(() => {
        handleScroll();
        animateCounters();
    }, 500);
    
    // Animation d'apparition des sections
    setTimeout(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            setTimeout(() => {
                section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 1500);
}

// === DÉMARRAGE OPTIMISÉ ===
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// === GESTION DES ERREURS ===
window.addEventListener('error', (e) => {
    console.warn('Erreur dans les animations:', e.error);
});

// === ANIMATIONS CSS DYNAMIQUES ===
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: var(--accent-gold); }
        51%, 100% { border-color: transparent; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes rotateIn {
        0% { transform: rotate(-180deg) scale(0); opacity: 0; }
        100% { transform: rotate(0deg) scale(1); opacity: 1; }
    }
    
    @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInLeft {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3); }
        50% { opacity: 1; transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
