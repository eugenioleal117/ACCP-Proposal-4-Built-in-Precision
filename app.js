const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const theme = document.querySelector('#theme');
function setTheme(value) {
  root.dataset.theme = value;
  theme.setAttribute('aria-label', value === 'night' ? 'Switch to light mode' : 'Switch to dark mode');
  theme.querySelector('use').setAttribute('href', value === 'night' ? '#sun' : '#moon');
}
setTheme(root.dataset.theme);
theme.addEventListener('click', () => {
  const value = root.dataset.theme === 'night' ? 'day' : 'night';
  setTheme(value);
  try { localStorage.setItem('accp-proposal-04-theme', value); } catch {}
});
document.addEventListener('keydown', () => { root.dataset.keyboard = ''; });
document.addEventListener('pointerdown', () => { delete root.dataset.keyboard; });

const menu = document.querySelector('#main-nav');
const menuToggle = document.querySelector('#menu-toggle');
function closeMenu(restoreFocus = false) {
  const wasOpen = menu.classList.contains('is-open');
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  if (restoreFocus && wasOpen) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  if (menu.classList.contains('is-open')) { closeMenu(true); return; }
  menu.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close navigation');
  menu.querySelector('a').focus({ preventScroll: true });
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  closeMenu();
  document.querySelector(link.hash)?.focus({ preventScroll: true });
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.addEventListener('focusin', event => { if (!event.target.closest('.header')) closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  root.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

const film = document.querySelector('#construction-film');
const poster = document.querySelector('#hero-fallback');
let mediaFailed = false;
film.muted = true;
film.loop = true;
film.autoplay = true;
film.playsInline = true;
film.controls = false;
async function keepFilmPlaying() {
  if (mediaFailed || document.hidden) return;
  try { await film.play(); } catch { /* Retry on readiness or the first page interaction. */ }
}
['loadeddata', 'canplay'].forEach(event => film.addEventListener(event, keepFilmPlaying));
film.addEventListener('pause', keepFilmPlaying);
film.addEventListener('ended', () => { film.currentTime = 0; keepFilmPlaying(); });
film.addEventListener('error', () => {
  mediaFailed = true;
  film.hidden = true;
  poster.hidden = false;
});
window.addEventListener('pageshow', keepFilmPlaying);
document.addEventListener('visibilitychange', () => { if (!document.hidden) keepFilmPlaying(); });
document.addEventListener('pointerdown', keepFilmPlaying, { once: true, passive: true });
document.addEventListener('keydown', keepFilmPlaying, { once: true });
keepFilmPlaying();

const studies = [
  {
    "title": "The limestone residence",
    "type": "Residential",
    "image": "assets/florida-residence-v3.webp",
    "alt": "Contemporary Florida residence with a charcoal metal roof, ivory walls, limestone and a burgundy front door",
    "description": "Charcoal standing-seam roofing, ivory walls, slender blue steel and warm limestone shape a contemporary Florida residence. Newly generated architectural study for this identity; not an actual ACCP project."
  },
  {
    "title": "The blue-steel headquarters",
    "type": "Commercial",
    "image": "assets/commercial-headquarters-v3.webp",
    "alt": "Contemporary commercial headquarters with structural blue metal cladding, clear glass and pale limestone",
    "description": "Blue ribbed metal, a burgundy accent and a limestone entrance give this commercial building a precise, grounded character. Newly generated architectural study; not an actual ACCP project."
  },
  {
    "title": "A precise connection",
    "type": "Architectural detail",
    "image": "assets/steel-glass-junction-v3.webp",
    "alt": "Close architectural connection between navy steel, clear glass, concrete and warm limestone",
    "description": "Steel, glass, concrete and limestone meet in one considered connection. A new close-up study of the materials that inform the identity, not a documented ACCP construction detail."
  },
  {
    "title": "The sheltered courtyard",
    "type": "Residential",
    "image": "assets/florida-courtyard-v3.webp",
    "alt": "Sheltered Florida courtyard with dark steel columns, a limestone terrace and palms",
    "description": "A sheltered Florida lanai opens to native planting through an exact rhythm of dark steel columns and warm mineral surfaces. Newly generated architectural study, not an actual ACCP project."
  }
];
const studyDialog = document.querySelector('#study-dialog');
let activeStudy = 0;
function setStudy(index, announce = true) {
  activeStudy = (index + studies.length) % studies.length;
  const study = studies[activeStudy];
  const image = document.querySelector('#study-image');
  image.src = study.image;
  image.alt = study.alt;
  document.querySelector('#study-type').textContent = study.type;
  document.querySelector('#study-title').textContent = study.title;
  document.querySelector('#study-description').textContent = study.description;
  document.querySelector('#study-status').textContent = announce ? `Study ${activeStudy + 1} of ${studies.length}: ${study.title}` : '';
}
document.querySelectorAll('[data-study]').forEach(button => button.addEventListener('click', () => {
  setStudy(Number(button.dataset.study), false);
  studyDialog.showModal();
}));
document.querySelector('#previous-study').addEventListener('click', () => setStudy(activeStudy - 1));
document.querySelector('#next-study').addEventListener('click', () => setStudy(activeStudy + 1));
studyDialog.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  setStudy(activeStudy + (event.key === 'ArrowRight' ? 1 : -1));
});
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const filter = button.dataset.filter;
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(item => {
    item.hidden = filter !== 'all' && item.dataset.category !== filter;
    if (!item.hidden) { count++; item.classList.add('visible'); }
  });
  document.querySelector('.study-grid').classList.toggle('is-filtered', filter !== 'all');
  document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'study' : 'studies'} shown`;
}));

const paletteStatus = document.querySelector('#palette-status');
document.querySelectorAll('[data-color]').forEach(button => {
  button.setAttribute('aria-label', `Copy ${button.querySelector('strong').textContent}, ${button.dataset.color}`);
  button.addEventListener('click', async () => {
    paletteStatus.textContent = '';
    try {
      await navigator.clipboard.writeText(button.dataset.color);
      paletteStatus.textContent = `${button.dataset.color} copied.`;
    } catch {
      paletteStatus.textContent = `Color: ${button.dataset.color}. Select the code to copy it.`;
    }
  });
});

const quoteDialog = document.querySelector('#quote-dialog');
const inquiry = document.querySelector('#inquiry');
const project = document.querySelector('#project-fields');
const contact = document.querySelector('#contact-fields');
const step = document.querySelector('#quote-step');
const back = document.querySelector('#quote-back');
const next = document.querySelector('#quote-next');
const quoteStatus = document.querySelector('#quote-status');
let contactStep = false;
function showStep(isContact, focus = true) {
  contactStep = isContact;
  project.hidden = project.disabled = isContact;
  contact.hidden = contact.disabled = !isContact;
  back.hidden = !isContact;
  step.textContent = isContact ? 'Step 2 of 2 / Contact' : 'Step 1 of 2 / Project';
  next.textContent = isContact ? 'Finish demo' : 'Continue';
  next.disabled = false;
  quoteStatus.textContent = '';
  if (focus) (isContact ? contact : project).querySelector('input, select').focus();
}
document.querySelectorAll('.quote-open').forEach(button => button.addEventListener('click', () => {
  closeMenu();
  inquiry.reset();
  showStep(false, false);
  quoteDialog.showModal();
}));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
back.addEventListener('click', () => showStep(false));
quoteDialog.addEventListener('close', () => {
  inquiry.reset();
  showStep(false, false);
});
inquiry.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactStep) { showStep(true); return; }
  quoteStatus.textContent = 'Demo complete. No information was sent.';
});
inquiry.addEventListener('input', () => { quoteStatus.textContent = ''; });
