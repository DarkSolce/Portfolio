// Fonction pour détecter si un élément est visible dans le viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50
    );
}

// Fonction pour ajouter la classe 'visible' aux éléments au scroll
function handleScroll() {
    const elements = document.querySelectorAll('.scroll-element, .cert-thumb, .projet-img, .experience-logo');
    elements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Listener scroll + initial check
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Smooth scroll pour la navigation
document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
