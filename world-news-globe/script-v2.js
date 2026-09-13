(() => {
  const RAW='https://raw.githubusercontent.com/bishnu7798/bishnu-portfolio/main/world-news-globe/';
  const LOCAL='./';
  const FALLBACK='https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80';
  const state={countries:[],regions:[],cities:[],news:[],level:'world',country:null,region:null,city:null,filter:'ALL',globe:null,auto:true,heat:true};
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  async function get(name){
    const urls=[RAW+name+'?v=20260913',LOCAL+name+'?v=20260913'];
    let last;
    for(const url of urls){try{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`${name} HTTP ${r.status}`);return await r.json()}catch(e){last=e}}
    throw last||new Error('Cannot load '+name);
  }
  function ago(v){const s=Math.max(0,(Date.now()-new Date(v).getTime())/1000);if(s<60)return'Just now';if(s<3600)return Math.floor(s/60)+' min ago';if(s<86400)return Math.floor(s/3600)+' hr ago';return Math.floor(s/86400)+' day ago'}
  function img(u,t){return `<img src="${esc(u||FALLBACK)}" alt="${esc(t)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK}'">`}
  function filtered(){let n=[...state.news];if(state.level==='country')n=n.filter(x=>x.country===state.country?.id);if(state.level==='region')n=n.filter(x=>x.country===state.country?.id&&x.region===state.region?.id);if(state.level==='city')n=n.filter(x=>x.city===state.city?.name);if(state.filter!=='ALL')n=n.filter(x=>String(x.category||'').toUpperCase()===state.filter);return n.sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt))}
  function title(){return state.level==='city'?state.city.name:state.level==='region'?state.region.name:state.level==='country'?state.country.name:'GLOBAL NEWS'}
  function render(){
    const news=filtered(),first=news[0];$('panelTitle').textContent=title();$('locationTitle').textContent=title();
    $('breadcrumb').innerHTML='<button data-level="world">WORLD</button>'+(state.country?` / <button data-level="country">${esc(state.country.name.toUpperCase())}</button>`:'')+(state.region?` / <button data-level="region">${esc(state.region.name.toUpperCase())}</button>`:'')+(state.city?` / <button data-level="city">${esc(state.city.name.toUpperCase())}</button>`:'');
    $('backBtn').hidden=state.level==='world';
    const filters=['ALL','LOCAL','BUSINESS','TECHNOLOGY','SCIENCE','ENVIRONMENT','SPORTS','POLITICS'];$('filters').innerHTML=filters.map(f=>`<button class="filter ${state.filter===f?'active':''}" data-filter="${f}">${f}</button>`).join('');
    if(!first){$('featuredNews').innerHTML='<div class="meta">No news found for this selection.</div>';$('newsList').innerHTML='';return}
    $('featuredNews').innerHTML=`<article class="featured">${img(first.image,first.title)}<div class="featured-body"><div class="category">${esc(first.category||'NEWS')}</div><h3>${esc(first.title)}</h3><p>${esc(first.description)}</p><div class="meta">${esc(first.source||'WorldLens')} · ${ago(first.publishedAt)}</div><a class="read" href="${esc(first.url||'#')}" target="_blank" rel="noopener">READ FULL STORY →</a></div></article>`;
    $('newsList').innerHTML=news.slice(1,8).map(n=>`<article class="news-card">${img(n.image,n.title)}<div><div class="category">${esc(n.category||'NEWS')}</div><h4>${esc(n.title)}</h4><p>${esc(n.description)}</p><div class="meta">${esc(n.source||'WorldLens')} · ${ago(n.publishedAt)}</div><a class="read" href="${esc(n.url||'#')}" target="_blank" rel="noopener">READ →</a></div></article>`).join('');
  }
  function camera(lat,lng,alt){if(state.globe)state.globe.pointOfView({lat,lng,alt},900)}
  function country(c){state.level='country';state.country=c;state.region=null;state.city=null;state.filter='ALL';render();camera(c.lat,c.lng,1.35)}
  function region(r){state.level='region';state.region=r;state.country=state.countries.find(c=>c.id===r.country);state.city=null;state.filter='ALL';render();camera(r.lat,r.lng,.65)}
  function city(c){state.level='city';state.city=c;state.country=state.countries.find(x=>x.id===c.country)||null;state.region=state.regions.find(x=>x.id===c.region)||null;state.filter='ALL';render();camera(c.lat,c.lng,.25)}
  function world(){state.level='world';state.country=null;state.region=null;state.city=null;state.filter='ALL';render();camera(20,0,2.5)}
  function globe(){
    if(typeof Globe!=='function')throw new Error('3D globe library did not load');
    state.globe=Globe()(document.getElementById('globeViz')).backgroundColor('#02050b').globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg').bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png').showAtmosphere(true).atmosphereColor('#4d9cff').atmosphereAltitude(.16).pointsData(state.cities).pointLat('lat').pointLng('lng').pointRadius(.28).pointAltitude(.02).pointColor(()=> '#ff9f43').pointLabel(c=>`<b>${esc(c.name)}</b><br>Click for city news`).onPointClick(c=>city(c));
    state.globe.controls().enableDamping=true;state.globe.controls().autoRotate=true;state.globe.controls().autoRotateSpeed=.3;
    const resize=()=>{const e=$('globeViz');state.globe.width(e.clientWidth).height(e.clientHeight)};window.addEventListener('resize',resize);resize();
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r=>r.json()).then(t=>{const f=topojson.feature(t,t.objects.countries).features;state.globe.polygonsData(f).polygonLabel(d=>`<b>${esc(d.properties?.name||'Country')}</b><br>Click for news`).polygonCapColor(d=>(String(d.properties?.name||'').toLowerCase().includes('india'))?'rgba(60,135,245,.42)':'rgba(55,105,180,.15)').polygonSideColor(()=> 'rgba(80,120,180,.18)').polygonStrokeColor(()=> 'rgba(120,170,255,.45)').polygonAltitude(.006).onPolygonClick(d=>{const n=String(d.properties?.name||'').toLowerCase();const aliases={'united states of america':'United States','united states':'United States','united kingdom':'United Kingdom'};const wanted=aliases[n]||d.properties?.name;const c=state.countries.find(x=>x.name.toLowerCase()===String(wanted).toLowerCase());if(c)country(c)})}).catch(console.warn);
  }
  async function start(){
    try{
      $('loadingText').textContent='Loading news...';
      const data=await Promise.all([get('countries.json'),get('regions.json'),get('cities.json'),get('news.json')]);
      [state.countries,state.regions,state.cities,state.news]=data;
      if(!Array.isArray(state.news)||!state.news.length)throw new Error('news.json is empty');
      render();$('loadingText').textContent=`${state.news.length} news stories loaded`;
      try{globe()}catch(e){console.warn(e)}
      setTimeout(()=>$('loading').classList.add('hidden'),350);
      $('errorBox').hidden=true;
    }catch(e){
      console.error('WorldLens:',e);$('loading').classList.add('hidden');$('errorBox').hidden=false;$('errorBox').querySelector('strong').textContent='News loading failed';$('errorBox').querySelector('span').textContent='Refreshing the page will retry the GitHub data source.';
    }
  }
  document.addEventListener('click',e=>{
    const f=e.target.closest('[data-filter]');if(f){state.filter=f.dataset.filter;render();return}
    const b=e.target.closest('#breadcrumb button');if(b){if(b.dataset.level==='world')world();else if(b.dataset.level==='country')country(state.country);else if(b.dataset.level==='region')region(state.region);return}
    const s=e.target.closest('.search-result');if(s){const x=$('searchResults')._items[+s.dataset.i];$('searchResults').classList.remove('show');$('searchInput').value=x.name;x.type==='country'?country(x.item):x.type==='region'?region(x.item):city(x.item)}
  });
  $('searchInput').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();if(!q){$('searchResults').classList.remove('show');return}const a=[];state.countries.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>a.push({type:'country',name:x.name,item:x}));state.regions.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>a.push({type:'region',name:x.name,item:x}));state.cities.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>a.push({type:'city',name:x.name,item:x}));$('searchResults')._items=a;$('searchResults').innerHTML=a.slice(0,8).map((x,i)=>`<button class="search-result" data-i="${i}"><b>📍 ${esc(x.name)}</b><small>${x.type}</small></button>`).join('');$('searchResults').classList.toggle('show',a.length>0)});
  $('zoomIn').onclick=()=>{if(state.globe){const p=state.globe.pointOfView();state.globe.pointOfView({...p,altitude:Math.max(.15,p.altitude*.75)},400)}};
  $('zoomOut').onclick=()=>{if(state.globe){const p=state.globe.pointOfView();state.globe.pointOfView({...p,altitude:Math.min(4,p.altitude*1.3)},400)}};
  $('resetBtn').onclick=world;$('backBtn').onclick=()=>state.level==='city'?region(state.region):state.level==='region'?country(state.country):world();
  $('rotateBtn').onclick=()=>{state.auto=!state.auto;if(state.globe)state.globe.controls().autoRotate=state.auto;$('rotateBtn').textContent=`AUTO ROTATE: ${state.auto?'ON':'OFF'}`};
  $('heatBtn').onclick=()=>{state.heat=!state.heat;if(state.globe)state.globe.pointColor(()=>state.heat?'#ff9f43':'#5da2ff');$('heatBtn').textContent=`HEATMAP: ${state.heat?'ON':'OFF'}`};
  $('fullscreenBtn').onclick=()=>document.documentElement.requestFullscreen?.();$('themeBtn').onclick=()=>document.body.classList.toggle('light');$('retryBtn').onclick=()=>location.reload();
  start();
})();