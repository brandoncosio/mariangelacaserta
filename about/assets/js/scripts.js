  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const navClose = document.getElementById('navClose');
  const body = document.body;

  function openMenu() {
    navOverlay.classList.add('is-open');
    navToggle.classList.add('is-open');
    body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navOverlay.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
});

  navClose.addEventListener('click', closeMenu);
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) closeMenu();
  });