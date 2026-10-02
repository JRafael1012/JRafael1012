/**
 * Comportamiento del sitio. Sin dependencias.
 *
 * 1. Revela los bloques con `.reveal` al entrar en pantalla.
 * 2. Compensa el header fijo al saltar desde el menú a una sección.
 *
 * Si el usuario prefiere menos movimiento, todo se muestra de inmediato.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Revelado al hacer scroll --- */
  var targets = document.querySelectorAll('.reveal');

  if (!targets.length) {
    // nada que observar
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- 2. Botón de pausa de la marquesina ---
     El contenido en movimiento necesita una forma de detenerse (WCAG 2.2.2).
     Este bloque cablea el botón: alterna .is-paused y actualiza la etiqueta. */
  var toggle = document.querySelector('[data-marquee-toggle]');
  var marquee = document.querySelector('[data-marquee]');
  var toggleLabel = document.querySelector('[data-marquee-toggle-label]');

  if (toggle && marquee) {
    var icon = toggle.querySelector('.marquee-toggle__icon');

    toggle.addEventListener('click', function () {
      var paused = marquee.classList.toggle('is-paused');
      toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');

      if (toggleLabel) toggleLabel.textContent = paused ? 'Reproducir' : 'Pausar';
      if (icon) icon.textContent = paused ? '▶' : '❚❚';
    });
  }

  /* --- 3. Compensación del header fijo al navegar por anclas --- */
  var header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

      // Mantiene la URL sincronizada sin provocar un salto brusco.
      if (window.history.replaceState) {
        window.history.replaceState(null, '', id);
      }
    });
  });

  if (!header) return;
})();
