const header = document.querySelector('.site-header');
const navigation = document.querySelector('.navigation');
const hero = document.querySelector('.hero');
const menuButton = document.querySelector('.menu-button');
const menuPanel = document.querySelector('.menu-panel');

function updatePageOnScroll() {
  const expanded = window.scrollY > 24;
  const fadeProgress = Math.min(window.scrollY / (window.innerHeight * 0.72), 1);

  navigation.classList.toggle('is-expanded', expanded);
  header.classList.toggle('is-expanded', expanded);
  hero.style.setProperty('--hero-fade', 1 - fadeProgress);
  hero.style.setProperty('--hero-shift', `${fadeProgress * -32}px`);
}

function closeMenu() {
  menuPanel.hidden = true;
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}

updatePageOnScroll();
window.addEventListener('scroll', updatePageOnScroll, { passive: true });

navigation.addEventListener('mouseenter', () => {
  navigation.classList.add('is-expanded');
  header.classList.add('is-expanded');
});

navigation.addEventListener('mouseleave', updatePageOnScroll);

menuButton.addEventListener('click', () => {
  const isOpen = menuPanel.hidden;
  menuPanel.hidden = !isOpen;
  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

menuPanel.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!menuPanel.hidden && !menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menuPanel.hidden) {
    closeMenu();
    menuButton.focus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
