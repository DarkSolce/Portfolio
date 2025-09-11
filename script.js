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

// === GESTION DU SCROLL AVEC ANIMATIONS ===
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

// === HOVER EFFECTS AVANCÉS ===
function initAdvancedHoverEffects() {
    // Effet de brillance sur les boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, var(--blue-dark), var(--blue-light))';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--blue-dark)';
        });
    });

    // Effet de tilt sur les cartes d'expérience
    const experienceCards = document.querySelectorAll('.experience');
    experienceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// === OPTIMISATION DU SCROLL ===
let ticking = false;
function optimizedScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            animateCounters();
            ticking = false;
        });
        ticking = true;
    }
}

// === INITIALISATION ===
function init() {
    // Animations initiales
    animateHeader();
    setTimeout(typewriterEffect, 500);
    
    // Configuration des événements
    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('load', () => {
        handleScroll();
        animateCounters();
    });
    
    // Initialisation des fonctionnalités
    initSmoothScroll();
    initAdvancedHoverEffects();
    
    // Vérification initiale après un court délai
    setTimeout(() => {
        handleScroll();
        animateCounters();
    }, 100);
}

// === DÉMARRAGE ===
document.addEventListener('DOMContentLoaded', init);

// === INTERSECTION OBSERVER POUR PERFORMANCE ===
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animés
    document.addEventListener('DOMContentLoaded', () => {
        const elementsToObserve = document.querySelectorAll('.scroll-element, .cert-thumb, .projet-img, .experience-logo, .experience, .cert-list li');
        elementsToObserve.forEach(el => observer.observe(el));
    });
}
