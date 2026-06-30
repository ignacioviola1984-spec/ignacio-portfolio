// Ignacio Viola — Portfolio
// Dependency-free. i18n toggle (EN default) + reveal-on-scroll + mobile nav.

// ---- i18n (EN/ES) -----------------------------------------------------------
// Content lives as <span class="en">…</span> / <span class="es">…</span> pairs;
// CSS hides the inactive language. Choice persists across pages.
function applyLang(lang) {
  document.body.classList.remove('lang-es', 'lang-en');
  document.body.classList.add('lang-' + lang);
  document.documentElement.lang = lang;
  var btn = document.getElementById('langBtn');
  if (btn) {
    btn.textContent = lang === 'es' ? 'EN' : 'ES';
    btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
  }
}

function toggleLang() {
  var next = document.body.classList.contains('lang-es') ? 'en' : 'es';
  applyLang(next);
  try { localStorage.setItem('iv-lang', next); } catch (e) {}
}

// ---- mobile nav -------------------------------------------------------------
function toggleNav() {
  var open = document.body.classList.toggle('nav-open');
  var btn = document.getElementById('navToggle');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

document.addEventListener('DOMContentLoaded', function () {
  var saved = 'en';
  try { saved = localStorage.getItem('iv-lang') || 'en'; } catch (e) {}
  applyLang(saved);

  // close mobile nav after following a link
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
  });

  // subtle reveal-on-scroll
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
});
