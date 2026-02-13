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

/* Smooth scroll a la siguiente sección */
document.addEventListener('DOMContentLoaded', () => {
  const arrow = document.querySelector('.mc-video-hero__arrow');
  if (!arrow) return;

  arrow.addEventListener('click', (e) => {
    const href = arrow.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
