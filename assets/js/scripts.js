// ================= NAV MENU =================
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.getElementById('navClose');
const body = document.body;

// Abrir menú
function openMenu() {
  if (navOverlay.classList.contains('is-open')) return;

  navOverlay.classList.remove('is-closing');
  navOverlay.classList.add('is-open');
  navToggle.classList.add('is-open');
  body.classList.add('nav-open');
  navToggle.setAttribute('aria-expanded', 'true');
}

// Cerrar menú (con animación)
function closeMenu() {
  if (
    !navOverlay.classList.contains('is-open') ||
    navOverlay.classList.contains('is-closing')
  ) return;

  // Activa animación de salida
  navOverlay.classList.add('is-closing');

  // Espera a que termine la animación CSS
  setTimeout(() => {
    navOverlay.classList.remove('is-open');
    navOverlay.classList.remove('is-closing');
    navToggle.classList.remove('is-open');
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }, 330); // ⬅️ debe coincidir con el CSS
}

// Toggle botón hamburguesa
navToggle.addEventListener('click', () => {
  const isOpen = navOverlay.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
});

// Botón X
navClose.addEventListener('click', closeMenu);

// Click fuera del panel
navOverlay.addEventListener('click', (e) => {
  if (e.target === navOverlay) closeMenu();
});

// ESC para cerrar (opcional pero pro)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


/* ================= FAQ behavior ================= */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-mc-faq]');
  if (!root) return;

  const items = Array.from(
    root.querySelectorAll('details.mc-faq__item')
  );

  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;

      items.forEach(other => {
        if (other !== item) {
          other.removeAttribute('open');
        }
      });
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.mc-services');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('.mc-services__slide'));
  if (slides.length < 2) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;

  const interval = 2000;
  const animTime = reduced ? 0 : 650;

  slides.forEach(img => {
    const preload = new Image();
    preload.src = img.src;
  });

  function nextSlide(){
    const current = slides[index];
    const next = slides[(index + 1) % slides.length];

    current.classList.add('is-exit');
    next.classList.add('is-enter');

    void next.offsetWidth;

    if (!reduced) {
      next.classList.add('is-reveal');
      current.classList.add('is-hide');
    }

    setTimeout(() => {
      current.className = 'mc-services__slide';
      next.className = 'mc-services__slide is-active';
      index = (index + 1) % slides.length;
    }, animTime + 30);
  }

  setInterval(nextSlide, interval);
});
document.querySelectorAll(".card").forEach(card => {

  const slides = card.querySelectorAll(".slide");
  const tag = card.querySelector(".dynamic-tag");
  const leftBtn = card.querySelector(".left");
  const rightBtn = card.querySelector(".right");

  let index = 0;
  let interval;

  function updateTag() {
    tag.textContent = index === 0 ? "ANTES" : "DESPUÉS";
  }

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
    updateTag();
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  function startAuto() {
    interval = setInterval(nextSlide, 3500);
  }

  function resetAuto() {
    clearInterval(interval);
    startAuto();
  }

  rightBtn?.addEventListener("click", () => {
    nextSlide();
    resetAuto();
  });

  leftBtn?.addEventListener("click", () => {
    prevSlide();
    resetAuto();
  });

  startAuto();
  updateTag();
});
