// === UTILS ===
function isInViewport(el, threshold = 0.2) {
    if(!el) return false;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const elH = rect.bottom - rect.top;
    return rect.top <= winH - (elH * threshold) && rect.bottom >= (elH * threshold);
}

// === HANDLE SCROLL ===
function handleScroll() {
    const elements = document.querySelectorAll('.scroll-element, .projet-img, .experience-logo, .experience, .cert-list li');
    elements.forEach((el, index) => {
        if(isInViewport(el) && !el.classList.contains('visible')){
            setTimeout(()=> el.classList.add('visible'), index*100);
        }
    });
}

// === SMOOTH SCROLL NAVIGATION ===
function initSmoothScroll() {
    document.querySelectorAll('header nav a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if(target){
                const headerH = document.querySelector('header').offsetHeight;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}

// === HEADER ANIMATION ===
function animateHeader() {
    const h = document.querySelector('header');
    if(h){
        h.style.opacity = 0;
        h.style.transform = 'translateY(-50px)';
        setTimeout(()=>{
            h.style.transition = 'all 1s ease-out';
            h.style.opacity = 1;
            h.style.transform = 'translateY(0)';
        }, 200);
    }
}

// === TYPEWRITER EFFECT ===
function typewriterEffect() {
    const title = document.querySelector('header h1');
    if(title){
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        const timer = setInterval(()=>{
            if(i<text.length){ title.textContent += text.charAt(i); i++; }
            else clearInterval(timer);
        },100);
    }
}

// === INITIALISATION ===
function init(){
    animateHeader();
    setTimeout(typewriterEffect, 500);
    initSmoothScroll();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

document.addEventListener('DOMContentLoaded', init);
