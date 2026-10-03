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

  /* Lo rellena el bloque de la línea de tiempo; sirve para recalcularla
     cuando la trayectoria se despliega y pasa a tener altura. */
  var refreshTimeline = null;

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

  /* --- 4. Botón que despliega las competencias y torneos --- */
  /* Cada botón apunta a su panel con `aria-controls`, así que el bloque es
     el mismo aunque se añadan más secciones plegables. Con `data-exp-open`
     el panel empieza abierto, que es lo que necesita "Sobre mí" para que la
     primera respuesta se lea sin tocar nada. */
  var expToggles = document.querySelectorAll('[data-exp-toggle]');

  expToggles.forEach(function (toggle) {
    var panel = document.getElementById(toggle.getAttribute('aria-controls'));
    var label = toggle.querySelector('[data-exp-toggle-label]');
    var cerrado = label ? label.textContent.trim() : '';

    if (!panel) return;

    /* `data-exp-css`: el estado lo lleva el CSS leyendo `aria-expanded` en vez
       de `hidden`. Lo necesitan los paneles que se abren de lado, porque con
       `display: none` no hay nada que transicionar. El `hidden` del HTML se
       quita una sola vez —para quien llegue sin JavaScript— y a partir de ahí
       manda `visibility`, que sí saca el panel del tabulado y de los lectores
       de pantalla. El resto de paneles sigue igual que antes. */
    var usaCss = toggle.hasAttribute('data-exp-css');

    if (usaCss) {
      panel.hidden = false;
    }

    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (!usaCss) {
        panel.hidden = !open;
      }

      if (label) {
        label.textContent = open ? cerrado.replace(/^Ver/, 'Ocultar') : cerrado;
      }

      if (open && refreshTimeline) refreshTimeline();
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    setOpen(toggle.hasAttribute('data-exp-open'));
  });

  /* --- 5. Fotos del diploma y su entrega --- */
  /* Sin botones, como el collage: el avance es automático. La foto visible
     se marca con `is-active`, y `aria-hidden` evita que un lector de pantalla
     lea las dos fotos a la vez. */
  var credentialGallery = document.querySelector('[data-credential-gallery]');

  if (credentialGallery && !reduceMotion) {
    var credentialSlides = Array.prototype.slice.call(
      credentialGallery.querySelectorAll('[data-credential-slide]')
    );

    if (credentialSlides.length > 1) {
      window.setInterval(function () {
        var current = credentialSlides.findIndex(function (slide) {
          return slide.classList.contains('is-active');
        });

        if (current < 0) return;

        var next = (current + 1) % credentialSlides.length;
        credentialSlides[current].classList.remove('is-active');
        credentialSlides[current].setAttribute('aria-hidden', 'true');
        credentialSlides[next].classList.add('is-active');
        credentialSlides[next].setAttribute('aria-hidden', 'false');
      }, 5000);
    }
  }

  /* --- 6. Collage de fotos de robótica --- */
  /* Cuatro casillas enrejan el grupo de fotos: en cada turno todas avanzan
     una posición, así que las combinaciones que salen son distintas sin
     repetir fotos. Cada casilla lleva dentro todas las capas y solo se ve la
     activa, para que el cambio sea un fundido y no un salto.

     Va solo, sin botones: si el usuario pidió menos movimiento, no arranca. */
  var robCollage = document.querySelector('[data-rob-collage]');

  if (robCollage && !reduceMotion) {
    var robTiles = Array.prototype.slice.call(
      robCollage.querySelectorAll('.rob-collage__tile')
    );

    if (robTiles.length > 1) {
      var robTotal = robTiles[0].querySelectorAll('.rob-collage__layer').length;
      var robTurn = 0;

      var scheduleRobTurn = function () {
        robTiles.forEach(function (tile, casilla) {
          var layers = tile.querySelectorAll('.rob-collage__layer');

          for (var i = 0; i < layers.length; i += 1) {
            layers[i].classList.toggle('is-active', i === (casilla + robTurn) % layers.length);
          }
        });
      };

      if (robTotal > robTiles.length) {
        window.setInterval(function () {
          robTurn = (robTurn + 1) % robTotal;
          scheduleRobTurn();
        }, 5000);
      }
    }
  }

  /* --- 7. Progreso visual de la línea de trayectoria --- */
  var timeline = document.querySelector('[data-timeline]');

  if (timeline && !reduceMotion) {
    var timelineFrame = 0;

    var updateTimelineProgress = function () {
      timelineFrame = 0;

      // Plegada no tiene altura: medirla daría una división por cero.
      if (!timeline.offsetHeight) return;

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

    refreshTimeline = requestTimelineUpdate;

    window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineUpdate);
    requestTimelineUpdate();
  }

  /* --- 8. Compensación del header fijo al navegar por anclas --- */
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
