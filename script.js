(function () {
  'use strict';

  // Keep the existing portfolio design, but disable the two unwanted hero effects.
  const fixStyle = document.createElement('style');
  fixStyle.textContent = `
    /* Keep the profile photo fixed in its original position. */
    .profile-img {
      transform: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(fixStyle);

  // Run before the original Three.js load handler so the rotating TorusKnot is never rendered.
  window.addEventListener('load', function () {
    if (window.THREE && window.THREE.TorusKnotGeometry) {
      window.THREE.TorusKnotGeometry = class extends window.THREE.BufferGeometry {
        constructor() {
          super();
        }
      };
    }
  }, false);

  // Load the original portfolio code without changing the existing design.
  const original = document.createElement('script');
  original.src = 'script-original.js';
  original.defer = false;
  original.onload = function () {
    try {
      repairPortfolio();
      restoreTypingEffect();
    } catch (error) {
      console.error('Portfolio repair:', error);
    }
  };
  original.onerror = function () {
    console.error('Unable to load script-original.js');
  };
  document.head.appendChild(original);

  function repairPortfolio() {
    // Keep only one 3D viewer modal. The existing project has the same modal twice.
    const modals = document.querySelectorAll('#modelViewerModal');
    if (modals.length > 1) {
      for (let i = 1; i < modals.length; i++) modals[i].remove();
    }

    // Ensure the profile photo stays fixed even if another script writes an inline transform.
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) profileImg.style.setProperty('transform', 'none', 'important');

    // Fix external social links that were missing the protocol.
    document.querySelectorAll('a[href^="www."]').forEach(function (a) {
      a.href = 'https://' + a.getAttribute('href');
    });

    // Make footer social links use the same real profiles as the hero.
    const footerSocial = document.querySelectorAll('.social-links-footer a');
    const socialUrls = [
      'https://www.linkedin.com/in/bishnu-sarkar-0855a22aa',
      'https://github.com/bishnu7798',
      'https://twitter.com/',
      'https://www.instagram.com/bishnu.7798/?hl=en'
    ];
    footerSocial.forEach(function (a, i) { if (socialUrls[i]) a.href = socialUrls[i]; });

    // Prevent placeholder project links from jumping to the top of the page.
    document.querySelectorAll('.portfolio-overlay a.btn[href="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const item = a.closest('.portfolio-item');
        if (item) {
          const title = item.querySelector('h3');
          if (title) {
            const modelButton = item.querySelector('.model-btn');
            if (modelButton) modelButton.click();
          }
        }
      });
    });

    // Make the CV button useful even when no CV file exists in the repository.
    const cvButton = Array.from(document.querySelectorAll('.hero-buttons .btn')).find(function (a) {
      return a.textContent.trim().toLowerCase().includes('download cv');
    });
    if (cvButton && cvButton.getAttribute('href') === '#') {
      cvButton.href = 'mailto:bishnusarkar4321@gmail.com?subject=CV%20Request';
    }

    // The original form shows success without actually sending anything.
    // Replace it with a reliable mailto flow while keeping the existing form UI.
    const form = document.getElementById('contactForm');
    if (form && !form.dataset.repaired) {
      form.dataset.repaired = 'true';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const subject = document.getElementById('subject')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';
        if (!name || !email || !subject || !message) return;
        const body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
        window.location.href = 'mailto:bishnusarkar4321@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      }, true);
    }
  }

  // Restore the original rotating text effect reliably even though script-original.js
  // is loaded dynamically after DOMContentLoaded may already have fired.
  function restoreTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || window.__portfolioTypingStarted) return;

    // Give the original handler a chance to start first. If it has not populated the
    // element, start an identical single typing loop ourselves.
    setTimeout(function () {
      if (!typingElement || window.__portfolioTypingStarted) return;
      if (typingElement.textContent.trim() !== '') return;

      window.__portfolioTypingStarted = true;

      const professions = ['Bishnu', 'Nirmalya', 'Full Stack Developer', 'UI/UX Designer'];
      let professionIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseTime = 2000;

      function typeLoop() {
        const currentProfession = professions[professionIndex];

        if (isDeleting) {
          charIndex--;
          typingElement.textContent = currentProfession.substring(0, charIndex);
        } else {
          charIndex++;
          typingElement.textContent = currentProfession.substring(0, charIndex);
        }

        let nextDelay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentProfession.length) {
          nextDelay = pauseTime;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          professionIndex = (professionIndex + 1) % professions.length;
          nextDelay = 500;
        }

        window.__portfolioTypingTimer = setTimeout(typeLoop, nextDelay);
      }

      typeLoop();
    }, 1200);
  }

  // Extra safety: if the dynamically loaded original script misses DOMContentLoaded,
  // make sure the typing animation still starts after the page has fully loaded.
  window.addEventListener('load', function () {
    setTimeout(function () {
      const typingElement = document.getElementById('typing-text');
      if (typingElement && !typingElement.textContent.trim() && !window.__portfolioTypingStarted) {
        restoreTypingEffect();
      }
    }, 1800);
  });
})();
