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

  /* --- 3. Cambio automático de fotografías del perfil --- */
  var photoFrame = document.querySelector('[data-photo-frame]');

  if (photoFrame) {
    var photoToggle = photoFrame.querySelector('[data-photo-toggle]');
    var photos = Array.prototype.slice.call(photoFrame.querySelectorAll('.photo'));

    if (photoToggle && photos.length > 1 && !reduceMotion) {
      var photoToggleLabel = photoToggle.querySelector('[data-photo-toggle-label]');
      var photoToggleIcon = photoToggle.querySelector('.photo-toggle__icon');
      var activePhoto = 0;
      var photosPaused = false;

      photoToggle.hidden = false;

      window.setInterval(function () {
        if (photosPaused) return;

        photos[activePhoto].classList.remove('is-active');
        activePhoto = (activePhoto + 1) % photos.length;
        photos[activePhoto].classList.add('is-active');
      }, 15000);

      photoToggle.addEventListener('click', function () {
        photosPaused = !photosPaused;
        photoToggle.setAttribute('aria-pressed', photosPaused ? 'true' : 'false');

        if (photoToggleLabel) {
          photoToggleLabel.textContent = photosPaused ? 'Reanudar fotos' : 'Pausar fotos';
        }
        if (photoToggleIcon) photoToggleIcon.textContent = photosPaused ? '▶' : '❚❚';
      });
    }
  }

  /* --- 4. Fotos del diploma y su entrega --- */
  var credentialGallery = document.querySelector('[data-credential-gallery]');

  if (credentialGallery) {
    var credentialSlides = Array.prototype.slice.call(
      credentialGallery.querySelectorAll('[data-credential-slide]')
    );
    var credentialStatus = credentialGallery.querySelector('[data-credential-status]');
    var credentialToggle = credentialGallery.querySelector('[data-credential-toggle]');
    var credentialToggleLabel = credentialGallery.querySelector(
      '[data-credential-toggle-label]'
    );
    var credentialNext = credentialGallery.querySelector('[data-credential-next]');

    if (credentialSlides.length > 1 && credentialToggle && credentialNext) {
      var activeCredential = 0;
      var credentialPaused = false;
      var credentialTimer;

      var showCredential = function (index) {
        credentialSlides[activeCredential].classList.remove('is-active');
        credentialSlides[activeCredential].setAttribute('aria-hidden', 'true');
        activeCredential = index % credentialSlides.length;
        credentialSlides[activeCredential].classList.add('is-active');
        credentialSlides[activeCredential].setAttribute('aria-hidden', 'false');

        if (credentialStatus) {
          credentialStatus.textContent = String(activeCredential + 1).padStart(2, '0');
        }
      };

      var scheduleCredentialAdvance = function () {
        window.clearTimeout(credentialTimer);
        credentialGallery.classList.remove('is-playing');

        if (reduceMotion || credentialPaused) return;

        void credentialGallery.offsetWidth;
        credentialGallery.classList.add('is-playing');
        credentialTimer = window.setTimeout(function () {
          showCredential(activeCredential + 1);
          scheduleCredentialAdvance();
        }, 5000);
      };

      credentialNext.addEventListener('click', function () {
        showCredential(activeCredential + 1);
        scheduleCredentialAdvance();
      });

      credentialToggle.addEventListener('click', function () {
        credentialPaused = !credentialPaused;
        credentialToggle.setAttribute(
          'aria-pressed',
          credentialPaused ? 'true' : 'false'
        );

        if (credentialToggleLabel) {
          credentialToggleLabel.textContent = credentialPaused ? 'Reanudar' : 'Pausar';
        }

        scheduleCredentialAdvance();
      });

      if (reduceMotion) {
        credentialToggle.hidden = true;
      } else {
        scheduleCredentialAdvance();
      }
    }
  }

  /* --- 5. Progreso visual de la línea de trayectoria --- */
  var timeline = document.querySelector('[data-timeline]');

  if (timeline && !reduceMotion) {
    var timelineFrame = 0;

    var updateTimelineProgress = function () {
      timelineFrame = 0;
      var bounds = timeline.getBoundingClientRect();
      var marker = window.innerHeight * 0.58;
      var progress = (marker - bounds.top) / bounds.height;
      progress = Math.max(0, Math.min(1, progress));
      timeline.style.setProperty('--timeline-progress', String(progress));
    };

    var requestTimelineUpdate = function () {
      if (timelineFrame) return;
      timelineFrame = window.requestAnimationFrame(updateTimelineProgress);
    };

    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);
    requestTimelineUpdate();
  }

  /* --- 6. Compensación del header fijo al navegar por anclas --- */
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
