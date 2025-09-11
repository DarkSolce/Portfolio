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
// === SELECTEURS ===
const scrollElements = document.querySelectorAll(
  ".scroll-element, .cert-thumb, .projet-img, .experience-logo, .experience, .cert-list li"
);

// === FONCTION DE VERIFICATION DE VISIBILITE ===
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

// === AJOUT / RETRAIT DE CLASSE VISIBLE ===
const displayScrollElement = (element) => {
  element.classList.add("visible");
};

const hideScrollElement = (element) => {
  element.classList.remove("visible");
};

// === FONCTION PRINCIPALE DE SCROLL ===
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.2)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

// === LISTENER SCROLL ===
window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// === INITIALISATION AU CHARGEMENT ===
document.addEventListener("DOMContentLoaded", () => {
  handleScrollAnimation();
});

// === OPTIONNEL: CLICK SUR LES BOUTONS POUR PROJETS ===
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
