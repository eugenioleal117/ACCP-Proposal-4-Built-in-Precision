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
const hero = document.querySelector('.cinematic-hero');
const poster = document.querySelector('#hero-fallback');
const playToggle = document.querySelector('#film-toggle');
const replay = document.querySelector('#film-replay');
const scrubber = document.querySelector('#film-progress');
const filmTime = document.querySelector('#film-time');
let userPaused = false;
let inView = true;
let pendingSeek = null;
let mediaFailed = false;
film.muted = true;
const timeLabel = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
function syncFilm() {
  const duration = Number.isFinite(film.duration) && film.duration > 0 ? film.duration : 20;
  const seconds = Math.min(duration, film.currentTime || 0);
  const playing = !film.paused && !film.ended;
  hero.classList.toggle('is-playing', playing);
  playToggle.textContent = mediaFailed ? 'Film unavailable' : playing ? 'Pause film' : 'Play film';
  scrubber.max = duration;
  scrubber.value = seconds;
  scrubber.setAttribute('aria-valuetext', `${Math.floor(seconds)} of ${Math.ceil(duration)} seconds`);
  filmTime.textContent = `${timeLabel(seconds)} / ${timeLabel(Math.ceil(duration))}`;
}
async function playFilm() {
  if (mediaFailed || document.hidden || !inView) return;
  if (film.ended) film.currentTime = 0;
  try { await film.play(); } catch { syncFilm(); }
}
playToggle.addEventListener('click', () => {
  if (film.paused || film.ended) { userPaused = false; playFilm(); }
  else { userPaused = true; film.pause(); }
});
replay.addEventListener('click', () => {
  userPaused = false;
  if (film.readyState >= 1) film.currentTime = 0;
  else pendingSeek = 0;
  playFilm();
});
film.addEventListener('loadedmetadata', () => {
  if (pendingSeek !== null) { film.currentTime = pendingSeek; pendingSeek = null; }
  syncFilm();
});
['timeupdate', 'play', 'pause', 'ended', 'seeked'].forEach(event => film.addEventListener(event, syncFilm));
scrubber.addEventListener('input', () => {
  userPaused = true;
  film.pause();
  const target = Number(scrubber.value);
  if (film.readyState >= 1) film.currentTime = target;
  else pendingSeek = target;
});
film.addEventListener('error', () => {
  mediaFailed = true;
  film.hidden = true;
  poster.hidden = false;
  playToggle.disabled = replay.disabled = scrubber.disabled = true;
  syncFilm();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => entries.forEach(entry => {
    inView = entry.isIntersecting;
    if (!inView) film.pause();
    else if (!reduceMotion.matches && !userPaused && !document.querySelector('dialog[open]')) playFilm();
  }), { threshold: 0.15 }).observe(hero);
} else if (!reduceMotion.matches) playFilm();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) film.pause();
  else if (inView && !userPaused && !reduceMotion.matches && !document.querySelector('dialog[open]')) playFilm();
});
reduceMotion.addEventListener('change', event => {
  if (event.matches) { film.pause(); userPaused = true; }
});

const studies = [
  { title: 'The blue-hour residence', type: 'Residential', image: 'assets/hero-house.png', alt: 'A modern concrete and glass courtyard home at blue hour', description: 'Low concrete volumes, slender steel columns and wide overhangs create a quiet relationship between the rooms and the landscape. An illustrative architectural direction, not a completed ACCP project.' },
  { title: 'The structural atrium', type: 'Commercial', image: 'assets/steel-atrium.jpg', alt: 'Double-height commercial atrium with concrete and a steel staircase', description: 'Exposed concrete and a crisp steel stair establish a clear, confident spatial language. This illustrative study explores the commercial character of the identity.' },
  { title: 'Where materials meet', type: 'Detail', image: 'assets/steel-atrium.jpg', alt: 'Steel stair, concrete wall and glazed enclosure', description: 'The connection between a steel stair, concrete wall and glass façade becomes the focus. The new brand borrows its precision from these architectural junctions. Illustrative study.' },
  { title: 'The Florida residence', type: 'Residential construction', image: 'assets/florida-timelapse-poster-v2.jpg', alt: 'Completed contemporary Florida home from the cinematic timelapse', description: 'A cinematic study follows a Florida residence from an empty site through structure, enclosure and finishing. This AI-generated architectural concept illustrates the construction process; it does not depict an actual ACCP project.' }
];
const studyDialog = document.querySelector('#study-dialog');
let activeStudy = 0;
function setStudy(index, announce = true) {
  activeStudy = (index + studies.length) % studies.length;
  const study = studies[activeStudy];
  const image = document.querySelector('#study-image');
  image.src = study.image;
  image.alt = study.alt;
  image.style.filter = activeStudy === 1 || activeStudy === 2 ? 'grayscale(1)' : '';
  document.querySelector('#study-type').textContent = study.type;
  document.querySelector('#study-title').textContent = study.title;
  document.querySelector('#study-description').textContent = study.description;
  document.querySelector('#study-status').textContent = announce ? `Study ${activeStudy + 1} of ${studies.length}: ${study.title}` : '';
}
document.querySelectorAll('[data-study]').forEach(button => button.addEventListener('click', () => {
  setStudy(Number(button.dataset.study), false);
  film.pause();
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
  film.pause();
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
