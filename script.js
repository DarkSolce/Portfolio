// Animation scroll pour la section À propos
const aboutSection = document.querySelector('.about-container');
if (aboutSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    observer.observe(aboutSection);
}

// Sélection des éléments pour scroll animation
const scrollElements = document.querySelectorAll(
  ".scroll-element, .cert-thumb, .projet-img, .experience-logo, .experience, .cert-list li"
);

// Vérifie si élément est visible
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

// Ajout / retrait de classe visible
const displayScrollElement = (element) => element.classList.add("visible");
const hideScrollElement = (element) => element.classList.remove("visible");

// Fonction principale de scroll
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.2)) displayScrollElement(el);
    else if (elementOutofView(el)) hideScrollElement(el);
  });
};

// Listener scroll
window.addEventListener("scroll", handleScrollAnimation);

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", handleScrollAnimation);

// Click sur les boutons pour projets
const projectButtons = document.querySelectorAll(".btn");
projectButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = btn.getAttribute("href");
    if (target && document.querySelector(target)) {
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
  });
});
