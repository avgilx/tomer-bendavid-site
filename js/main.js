/* תומר בן דוד — סקריפט ראשי */
(function () {
  'use strict';

  /* תפריט נייד */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* אנימציית גילוי בגלילה */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* הצג/הסתר פרטים (הכשרת מורים) */
  document.querySelectorAll('[data-disclosure]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('data-disclosure'));
      if (!panel) return;
      var isHidden = panel.hasAttribute('hidden');
      if (isHidden) { panel.removeAttribute('hidden'); } else { panel.setAttribute('hidden', ''); }
      btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      btn.textContent = isHidden ? 'הסתרת הפרטים' : btn.getAttribute('data-label-more');
    });
  });
})();
