(function () {
  'use strict';
  const fixStyle = document.createElement('style');
  fixStyle.textContent = `
    .profile-img{transform:none!important;transition:none!important}
    .worldlens-project .portfolio-image{position:relative;overflow:hidden}
    .worldlens-project .portfolio-image img{transition:transform .5s ease,filter .5s ease}
    .worldlens-project:hover .portfolio-image img{transform:scale(1.05);filter:brightness(.72)}
    .worldlens-project .worldlens-badge{position:absolute;top:14px;left:14px;z-index:3;padding:6px 10px;border-radius:999px;background:rgba(6,12,26,.78);border:1px solid rgba(110,170,255,.35);color:#9ec9ff;font-size:10px;letter-spacing:.12em;font-weight:700;backdrop-filter:blur(8px)}
    #worldLensProjectModal{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:24px}
    #worldLensProjectModal.open{display:flex}
    .worldlens-modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(12px)}
    .worldlens-modal{position:relative;width:min(1080px,100%);max-height:92vh;overflow:auto;background:linear-gradient(145deg,#101a30,#060a13);border:1px solid rgba(120,170,255,.22);border-radius:26px;box-shadow:0 40px 120px #000;transform:translateY(18px) scale(.98);opacity:0;transition:.35s ease}
    #worldLensProjectModal.open .worldlens-modal{transform:none;opacity:1}
    .worldlens-close{position:absolute;right:18px;top:18px;z-index:5;width:42px;height:42px;border:1px solid rgba(255,255,255,.16);border-radius:50%;background:rgba(0,0,0,.45);color:#fff;font-size:28px;line-height:1}
    .worldlens-hero-image{padding:12px}.worldlens-hero-image img{width:100%;display:block;border-radius:20px;max-height:390px;object-fit:cover}
    .worldlens-modal-body{padding:8px 30px 32px}.worldlens-kicker{font-size:10px;color:#62a9ff;letter-spacing:.16em;font-weight:800}.worldlens-modal-body h2{font-size:clamp(28px,4vw,48px);margin:10px 0 12px;line-height:1.08}.worldlens-lead{max-width:850px;color:#9fb0ca;font-size:15px;line-height:1.7}
    .worldlens-feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}.worldlens-feature-grid div{padding:16px;border:1px solid rgba(150,180,255,.13);border-radius:15px;background:rgba(255,255,255,.035)}.worldlens-feature-grid b{display:block;margin-bottom:7px}.worldlens-feature-grid span{display:block;color:#8498b7;font-size:12px;line-height:1.5}
    .worldlens-stack{display:flex;flex-wrap:wrap;gap:7px}.worldlens-stack span{padding:7px 10px;border-radius:999px;background:rgba(77,139,255,.1);border:1px solid rgba(100,160,255,.18);color:#a8caff;font-size:10px}.worldlens-flow{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:22px 0;padding:14px;border-radius:14px;background:rgba(255,255,255,.035);color:#aac0df;font-size:10px}.worldlens-flow strong{color:#fff;margin-right:8px}.worldlens-flow i{color:#4e91ff;font-style:normal}.worldlens-actions{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap}.worldlens-actions .btn{cursor:pointer}
    @media(max-width:760px){.worldlens-feature-grid{grid-template-columns:1fr 1fr}.worldlens-modal-body{padding:8px 18px 24px}.worldlens-modal{border-radius:20px}}
    @media(max-width:480px){.worldlens-feature-grid{grid-template-columns:1fr}.worldlens-flow{display:block}.worldlens-flow span,.worldlens-flow i{display:inline-block;margin:4px}}
  `;
  document.head.appendChild(fixStyle);

  window.addEventListener('load', function () {
    if (window.THREE && window.THREE.TorusKnotGeometry) {
      window.THREE.TorusKnotGeometry = class extends window.THREE.BufferGeometry { constructor(){super();} };
    }
  }, false);

  const original = document.createElement('script');
  original.src = 'script-original.js';
  original.defer = false;
  original.onload = function () {
    try { repairPortfolio(); restoreTypingEffect(); addWorldLensProject(); updateDeveloperPortfolioProject(); }
    catch (error) { console.error('Portfolio repair:', error); }
  };
  original.onerror = function () { console.error('Unable to load script-original.js'); };
  document.head.appendChild(original);

  function repairPortfolio() {
    const modals = document.querySelectorAll('#modelViewerModal');
    modals.forEach(modal => modal.remove());
    document.querySelectorAll('.model-btn').forEach(button => button.remove());
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) profileImg.style.setProperty('transform','none','important');
    document.querySelectorAll('a[href^="www."]').forEach(a=>a.href='https://'+a.getAttribute('href'));
    const footerSocial=document.querySelectorAll('.social-links-footer a');
    const socialUrls=['https://www.linkedin.com/in/bishnu-sarkar-0855a22aa','https://github.com/bishnu7798','https://twitter.com/','https://www.instagram.com/bishnu.7798/?hl=en'];
    footerSocial.forEach((a,i)=>{if(socialUrls[i])a.href=socialUrls[i]});
    const cvButton=Array.from(document.querySelectorAll('.hero-buttons .btn')).find(a=>a.textContent.trim().toLowerCase().includes('download cv'));
    if(cvButton&&cvButton.getAttribute('href')==='#')cvButton.href='mailto:bishnusarkar4321@gmail.com?subject=CV%20Request';
    const form=document.getElementById('contactForm');
    if(form&&!form.dataset.repaired){form.dataset.repaired='true';form.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name')?.value.trim()||'',email=document.getElementById('email')?.value.trim()||'',subject=document.getElementById('subject')?.value.trim()||'',message=document.getElementById('message')?.value.trim()||'';if(!name||!email||!subject||!message)return;const body='Name: '+name+'\nEmail: '+email+'\n\n'+message;window.location.href='mailto:bishnusarkar4321@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)},true)}
  }

  function updateDeveloperPortfolioProject(){
    const cards = document.querySelectorAll('.portfolio-grid .portfolio-item');
    cards.forEach(card => {
      const title = card.querySelector('h3');
      if (!title || title.textContent.trim() !== 'Developer Portfolio') return;
      const image = card.querySelector('.portfolio-image img');
      const viewButton = card.querySelector('.portfolio-overlay a.btn');
      if (image) {
        image.src = 'https://image.thum.io/get/width/1200/crop/800/https://bishnu7798.github.io/bishnu-portfolio/';
        image.alt = 'Bishnu Developer Portfolio website preview';
        image.loading = 'lazy';
      }
      if (viewButton) {
        viewButton.href = 'https://bishnu7798.github.io/bishnu-portfolio/';
        viewButton.target = '_blank';
        viewButton.rel = 'noopener noreferrer';
        viewButton.textContent = 'Visit Website';
      }
    });
  }

  function addWorldLensProject(){
    const grid=document.querySelector('.portfolio-grid');
    if(!grid||grid.querySelector('.worldlens-project'))return;
    const card=document.createElement('div');card.className='portfolio-item worldlens-project';card.dataset.category='web';
    card.innerHTML=`<div class="portfolio-image"><img src="images/worldlens-globe.svg" alt="WorldLens interactive 3D news globe preview" loading="lazy"><span class="worldlens-badge">NEW · 3D NEWS GLOBE</span><div class="portfolio-overlay"><h3>WorldLens — Global Interactive 3D News Globe</h3><p>Professional interactive globe that connects World → Country → Region → City → Recent News, with news photos, search, markers, heatmap mode and responsive UI.</p><button type="button" class="btn worldlens-open">View Project</button><a class="btn" href="world-news-globe/index.html" target="_blank" rel="noopener noreferrer">Open Demo</a></div></div>`;
    grid.appendChild(card);card.querySelector('.worldlens-open').addEventListener('click',openWorldLensUI);
    document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{setTimeout(()=>{const filter=btn.dataset.filter||'all';card.style.display=(filter==='all'||filter==='web')?'':'none'},0)}));
  }

  function openWorldLensUI(){
    let modal=document.getElementById('worldLensProjectModal');
    if(!modal){
      modal=document.createElement('div');modal.id='worldLensProjectModal';
      modal.innerHTML=`<div class="worldlens-modal-backdrop"></div><div class="worldlens-modal" role="dialog" aria-modal="true" aria-labelledby="worldlensModalTitle"><button class="worldlens-close" aria-label="Close project details">×</button><div class="worldlens-hero-image"><img src="images/worldlens-globe.svg" alt="WorldLens project preview"></div><div class="worldlens-modal-body"><span class="worldlens-kicker">NEW PROJECT · GLOBAL WEB EXPERIENCE</span><h2 id="worldlensModalTitle">WorldLens — Interactive Global News Globe</h2><p class="worldlens-lead">Explore the world through a cinematic 3D Earth. Select a country, move into its region and city, then read recent stories with photos and original article links.</p><div class="worldlens-feature-grid"><div><b>🌍 3D Earth</b><span>Mouse/touch rotation, zoom, atmosphere and country boundaries.</span></div><div><b>📰 News Intelligence</b><span>Global, country, region and city-level demo news.</span></div><div><b>📍 Smart Navigation</b><span>Search, markers, breadcrumbs and back navigation.</span></div><div><b>📸 Rich Stories</b><span>Lazy-loaded photos, source, time and read-full-story links.</span></div><div><b>🔥 Heatmap Mode</b><span>News-volume markers and optional activity visualization.</span></div><div><b>📱 Responsive UI</b><span>Desktop side panel and mobile stacked news experience.</span></div></div><div class="worldlens-stack"><span>HTML5</span><span>CSS3</span><span>Vanilla JS</span><span>Three.js</span><span>Globe.gl</span><span>JSON</span></div><div class="worldlens-flow"><strong>DEMO FLOW</strong><span>WORLD</span><i>→</i><span>INDIA</span><i>→</i><span>WEST BENGAL</span><i>→</i><span>KOLKATA</span><i>→</i><span>NEWS</span></div><div class="worldlens-actions"><a class="btn" href="world-news-globe/index.html" target="_blank" rel="noopener noreferrer">Launch WorldLens →</a><button class="btn worldlens-close-action">Close</button></div></div></div>`;
      document.body.appendChild(modal);const close=()=>modal.classList.remove('open');modal.querySelector('.worldlens-close').addEventListener('click',close);modal.querySelector('.worldlens-close-action').addEventListener('click',close);modal.querySelector('.worldlens-modal-backdrop').addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    }modal.classList.add('open');
  }

  function restoreTypingEffect(){
    const typingElement=document.getElementById('typing-text');if(!typingElement||window.__portfolioTypingStarted)return;
    setTimeout(function(){if(!typingElement||window.__portfolioTypingStarted||typingElement.textContent.trim()!=='')return;window.__portfolioTypingStarted=true;const professions=['Bishnu','Nirmalya','Full Stack Developer','UI/UX Designer'];let professionIndex=0,charIndex=0,isDeleting=false;const typingSpeed=100,deletingSpeed=50,pauseTime=2000;function typeLoop(){const currentProfession=professions[professionIndex];if(isDeleting){charIndex--;typingElement.textContent=currentProfession.substring(0,charIndex)}else{charIndex++;typingElement.textContent=currentProfession.substring(0,charIndex)}let nextDelay=isDeleting?deletingSpeed:typingSpeed;if(!isDeleting&&charIndex===currentProfession.length){nextDelay=pauseTime;isDeleting=true}else if(isDeleting&&charIndex===0){isDeleting=false;professionIndex=(professionIndex+1)%professions.length;nextDelay=500}window.__portfolioTypingTimer=setTimeout(typeLoop,nextDelay)}typeLoop()},1200);
  }
  window.addEventListener('load',function(){setTimeout(function(){const typingElement=document.getElementById('typing-text');if(typingElement&&!typingElement.textContent.trim()&&!window.__portfolioTypingStarted)restoreTypingEffect()},1800)});
})();
