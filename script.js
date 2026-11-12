// DJ Mel Mess · schéma v1

// Menu : fond au défilement
const nav = document.getElementById('nav');
const surDefile = () => nav.classList.toggle('est-scrolle', window.scrollY > 30);
surDefile();
window.addEventListener('scroll', surDefile, { passive: true });

// Menu cell
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const fermerMenu = () => {
  menu.classList.remove('ouvert');
  document.body.classList.remove('menu-ouvert');
  burger.setAttribute('aria-expanded', 'false');
};
burger.addEventListener('click', () => {
  const ouvert = menu.classList.toggle('ouvert');
  document.body.classList.toggle('menu-ouvert', ouvert);
  burger.setAttribute('aria-expanded', String(ouvert));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', fermerMenu));

// Apparition au défilement
const elements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entrees => {
    entrees.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => obs.observe(el));
} else {
  elements.forEach(el => el.classList.add('visible'));
}

// Formulaire : validation seulement (l'envoi sera branché plus tard)
const form = document.getElementById('form');
const note = document.getElementById('form-note');
form.addEventListener('submit', ev => {
  ev.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(ch => {
    const valide = ch.value.trim() !== '' && (ch.type !== 'email' || /.+@.+\..+/.test(ch.value));
    ch.classList.toggle('invalide', !valide);
    if (!valide) ok = false;
  });
  note.textContent = ok
    ? 'Merci! (Aperçu : l\'envoi du formulaire sera branché à la mise en ligne.)'
    : 'Il manque quelques infos : nom, courriel, date et type d\'événement.';
});

// APERÇU : sélecteur de palette (retirer à la mise en ligne)
(function () {
  const boutons = document.querySelectorAll('.essai button');
  function appliquer(p) {
    if (p === 'a') document.documentElement.removeAttribute('data-palette');
    else document.documentElement.setAttribute('data-palette', p);
    boutons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p === p)));
    try { localStorage.setItem('palette', p); } catch (e) {}
  }
  let depart = new URLSearchParams(location.search).get('p');
  if (!depart) { try { depart = localStorage.getItem('palette'); } catch (e) {} }
  if (depart) appliquer(depart);
  boutons.forEach(b => b.addEventListener('click', () => appliquer(b.dataset.p)));
})();
