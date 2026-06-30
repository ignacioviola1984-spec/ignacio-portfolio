// Ignacio Viola — Portfolio
// Minimal, dependency-free. Reveal-on-scroll + i18n scaffold (EN-only for now).

// ---- i18n scaffold ----------------------------------------------------------
// The site ships English-only. The mechanism below is kept so a Spanish toggle
// can be added later WITHOUT reworking anything:
//   1. add <span class="es">…</span> / <span class="en">…</span> pairs in the HTML
//   2. add a button:  <button id="langBtn" onclick="toggleLang()">ES</button>
//   3. uncomment the toggleLang() function below
// applyLang() already runs on load and persists to localStorage.
function applyLang(lang) {
  document.body.classList.remove('lang-es', 'lang-en');
  document.body.classList.add('lang-' + lang);
  document.documentElement.lang = lang;
  var btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
}

// function toggleLang() {
//   var next = document.body.classList.contains('lang-es') ? 'en' : 'es';
//   applyLang(next);
//   try { localStorage.setItem('iv-lang', next); } catch (e) {}
// }

document.addEventListener('DOMContentLoaded', function () {
  var saved = 'en';
  try { saved = localStorage.getItem('iv-lang') || 'en'; } catch (e) {}
  applyLang(saved);

  // ---- subtle reveal-on-scroll ----------------------------------------------
  var targets = document.querySelectorAll('.hero, .section');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
});
