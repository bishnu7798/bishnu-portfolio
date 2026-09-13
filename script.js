(function () {
  'use strict';

  // Keep the existing portfolio design, but disable the two unwanted hero effects.
  const fixStyle = document.createElement('style');
  fixStyle.textContent = `
    .profile-img {
      transform: none !important;
      transition: none !important;
    }

    /* WorldLens project card */
    .worldlens-project .portfolio-image { position: relative; overflow: hidden; }
    .worldlens-project .portfolio-image img { transition: transform .5s ease, filter .5s ease; }
    .worldlens-project:hover .portfolio-image img { transform: scale(1.05); filter: brightness(.72); }
    .worldlens-project .worldlens-badge {
      position:absolute; top:14px; left:14px; z-index:3; padding:6px 10px;
      border-radius:999px; background:rgba(6,12,26,.78); border:1px solid rgba(110,170,255,.35);
      color:#9ec9ff; font-size:10px; letter-spacing:.12em; font-weight:700; backdrop-filter:blur(8px);
    }
  `;
  document.head.appendChild(fixStyle);

  // Run before the original Three.js load handler so the rotating TorusKnot is never rendered.
  window.addEventListener('load', function () {
    if (window.THREE && window.THREE.TorusKnotGeometry) {
      window.THREE.TorusKnotGeometry = class extends window.THREE.BufferGeometry {
        constructor() { super(); }
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
      addWorldLensProject();
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

    const profileImg = document.querySelector('.profile-img');
    if (profileImg) profileImg.style.setProperty('transform', 'none', 'important');

    // Fix external social links that were missing the protocol.
    document.querySelectorAll('a[href^="www."]').forEach(function (a) {
      a.href = 'https://' + a.getAttribute('href');
    });

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

    const cvButton = Array.from(document.querySelectorAll('.hero-buttons .btn')).find(function (a) {
      return a.textContent.trim().toLowerCase().includes('download cv');
    });
    if (cvButton && cvButton.getAttribute('href') === '#') {
      cvButton.href = 'mailto:bishnusarkar4321@gmail.com?subject=CV%20Request';
    }

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

  function addWorldLensProject() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid || grid.querySelector('.worldlens-project')) return;

    const card = document.createElement('div');
    card.className = 'portfolio-item worldlens-project';
    card.dataset.category = 'web';
    card.innerHTML = `
      <div class="portfolio-image">
        <img src="images/worldlens-globe.svg" alt="WorldLens interactive 3D news globe preview" loading="lazy">
        <span class="worldlens-badge">NEW · 3D NEWS GLOBE</span>
        <div class="portfolio-overlay">
          <h3>WorldLens — Global Interactive 3D News Globe</h3>
          <p>Professional interactive globe that connects World → Country → Region → City → Recent News, with news photos, search, markers, heatmap mode and responsive UI.</p>
          <button type="button" class="btn worldlens-open">View Project</button>
          <a class="btn" href="world-news-globe/index.html" target="_blank" rel="noopener noreferrer">Open Demo</a>
        </div>
      </div>`;

    grid.appendChild(card);
    card.querySelector('.worldlens-open').addEventListener('click', openWorldLensUI);
  }

  function openWorldLensUI() {
    let modal = document.getElementById('worldLensProjectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'worldLensProjectModal';
      modal.innerHTML = `
        <div class="worldlens-modal-backdrop"></div>
        <div class="worldlens-modal" role="dialog" aria-modal="true" aria-labelledby="worldlensModalTitle">
          <button class="worldlens-close" aria-label="Close project details">×</button>
          <div class="worldlens-hero-image"><img src="images/worldlens-globe.svg" alt="WorldLens project preview"></div>
          <div class="worldlens-modal-body">
            <span class="worldlens-kicker">NEW PROJECT · GLOBAL WEB EXPERIENCE</span>
            <h2 id="worldlensModalTitle">WorldLens — Interactive Global News Globe</h2>
            <p class="worldlens-lead">Explore the world through a cinematic 3D Earth. Select a country, move into its region and city, then read recent stories with photos and original article links.</p>
            <div class="worldlens-feature-grid">
              <div><b>🌍 3D Earth</b><span>Mouse/touch rotation, zoom, atmosphere and country boundaries.</span></div>
              <div><b>📰 News Intelligence</b><span>Global, country, region and city-level demo news.</span></div>
              <div><b>📍 Smart Navigation</b><span>Search, markers, breadcrumbs and back navigation.</span></div>
              <div><b>📸 Rich Stories</b><span>Lazy-loaded photos, source, time and read-full-story links.</span></div>
              <div><b>🔥 Heatmap Mode</b><span>News-volume markers and optional activity visualization.</span></div>
              <div><b>📱 Responsive UI</b><span>Desktop side panel and mobile stacked news experience.</span></div>
            </div>
            <div class="worldlens-stack"><span>HTML5</span><span>CSS3</span><span>Vanilla JS</span><span>Three.js</span><span>Globe.gl</span><span>JSON</span></div>
            <div class="worldlens-flow"><strong>DEMO FLOW</strong><span>WORLD</span><i>→</i><span>INDIA</span><i>→</i><span>WEST BENGAL</span><i>→</i><span>KOLKATA</span><i>→</i><span>NEWS</span></div>
            <div class="worldlens-actions"><a class="btn" href="world-news-globe/index.html" target="_blank" rel="noopener noreferrer">Launch WorldLens →</a><button class="btn worldlens-close-action">Close</button></div>
          </div>
        </div>`;
      document.body.appendChild(modal);
      const close = () => modal.classList.remove('open');
      modal.querySelector('.worldlens-close').addEventListener('click', close);
      modal.querySelector('.worldlens-close-action').addEventListener('click', close);
      modal.querySelector('.worldlens-modal-backdrop').addEventListener('click', close);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
    modal.classList.add('open');
  }

  function restoreTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || window.__portfolioTypingStarted) return;
    setTimeout(function () {
      if (!typingElement || window.__portfolioTypingStarted) return;
      if (typingElement.textContent.trim() !== '') return;
      window.__portfolioTypingStarted = true;
      const professions = ['Bishnu', 'Nirmalya', 'Full Stack Developer', 'UI/UX Designer'];
      let professionIndex = 0, charIndex = 0, isDeleting = false;
      const typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000;
      function typeLoop() {
        const currentProfession = professions[professionIndex];
        if (isDeleting) { charIndex--; typingElement.textContent = currentProfession.substring(0, charIndex); }
        else { charIndex++; typingElement.textContent = currentProfession.substring(0, charIndex); }
        let nextDelay = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && charIndex === currentProfession.length) { nextDelay = pauseTime; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; professionIndex = (professionIndex + 1) % professions.length; nextDelay = 500; }
        window.__portfolioTypingTimer = setTimeout(typeLoop, nextDelay);
      }
      typeLoop();
    }, 1200);
  }

  window.addEventListener('load', function () {
    setTimeout(function () {
      const typingElement = document.getElementById('typing-text');
      if (typingElement && !typingElement.textContent.trim() && !window.__portfolioTypingStarted) restoreTypingEffect();
    }, 1800);
  });
})();
