// === SELECTEURS ===
const scrollElements = document.querySelectorAll(
  ".scroll-element, .certif-img, .projet-img, .about-container"
);

// === FONCTIONS VISIBILITÉ ===
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

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
window.addEventListener("scroll", handleScrollAnimation);
document.addEventListener("DOMContentLoaded", handleScrollAnimation);

// === BOUTONS PROJETS ===
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
