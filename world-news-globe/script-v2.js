(() => {
  const RAW='https://raw.githubusercontent.com/bishnu7798/bishnu-portfolio/main/world-news-globe/';
  const LOCAL='./';
  const FALLBACK='https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80';

  // Built-in demo data means the news panel still works even when a browser/CDN blocks JSON requests.
  const DEMO_COUNTRIES=[
    {id:'IN',name:'India',capital:'New Delhi',lat:20.5937,lng:78.9629},{id:'US',name:'United States',capital:'Washington, D.C.',lat:37.0902,lng:-95.7129},{id:'GB',name:'United Kingdom',capital:'London',lat:55.3781,lng:-3.4360},{id:'FR',name:'France',capital:'Paris',lat:46.2276,lng:2.2137},{id:'DE',name:'Germany',capital:'Berlin',lat:51.1657,lng:10.4515},{id:'JP',name:'Japan',capital:'Tokyo',lat:36.2048,lng:138.2529},{id:'CN',name:'China',capital:'Beijing',lat:35.8617,lng:104.1954},{id:'AU',name:'Australia',capital:'Canberra',lat:-25.2744,lng:133.7751},{id:'BR',name:'Brazil',capital:'Brasília',lat:-14.2350,lng:-51.9253},{id:'CA',name:'Canada',capital:'Ottawa',lat:56.1304,lng:-106.3468},{id:'ZA',name:'South Africa',capital:'Pretoria',lat:-30.5595,lng:22.9375}
  ];
  const DEMO_REGIONS=[
    {country:'IN',id:'WB',name:'West Bengal',type:'state',lat:22.9868,lng:87.8550},{country:'IN',id:'DL',name:'Delhi',type:'union territory',lat:28.7041,lng:77.1025},{country:'US',id:'CA',name:'California',type:'state',lat:36.7783,lng:-119.4179},{country:'GB',id:'ENG',name:'England',type:'country',lat:52.3555,lng:-1.1743},{country:'FR',id:'IDF',name:'Île-de-France',type:'region',lat:48.8499,lng:2.6370},{country:'AU',id:'NSW',name:'New South Wales',type:'state',lat:-31.2532,lng:146.9211},{country:'BR',id:'SP',name:'São Paulo',type:'state',lat:-23.5505,lng:-46.6333},{country:'JP',id:'TOK',name:'Tokyo',type:'prefecture',lat:35.6762,lng:139.6503}
  ];
  const DEMO_CITIES=[
    {country:'IN',region:'WB',name:'Kolkata',lat:22.5726,lng:88.3639},{country:'IN',region:'DL',name:'New Delhi',lat:28.6139,lng:77.2090},{country:'US',region:'CA',name:'Los Angeles',lat:34.0522,lng:-118.2437},{country:'GB',region:'ENG',name:'London',lat:51.5074,lng:-0.1278},{country:'FR',region:'IDF',name:'Paris',lat:48.8566,lng:2.3522},{country:'AU',region:'NSW',name:'Sydney',lat:-33.8688,lng:151.2093},{country:'BR',region:'SP',name:'São Paulo',lat:-23.5505,lng:-46.6333},{country:'JP',region:'TOK',name:'Tokyo',lat:35.6762,lng:139.6503},{country:'DE',name:'Berlin',lat:52.5200,lng:13.4050},{country:'CN',name:'Beijing',lat:39.9042,lng:116.4074},{country:'CA',name:'Toronto',lat:43.6532,lng:-79.3832},{country:'ZA',name:'Johannesburg',lat:-26.2041,lng:28.0473}
  ];
  const DEMO_NEWS=[
    {id:'001',country:'IN',region:'WB',city:'Kolkata',title:'Kolkata launches a new smart mobility and public-service initiative',description:'A demo local-news story showing city-level headlines, images and source metadata.',image:'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T07:00:00+05:30',category:'Local',url:'https://www.reuters.com/'},
    {id:'002',country:'IN',region:'WB',city:'Kolkata',title:'West Bengal technology ecosystem sees fresh digital growth',description:'Demo regional coverage for the West Bengal route in the interactive globe.',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T06:25:00+05:30',category:'Technology',url:'https://www.bbc.com/news'},
    {id:'003',country:'US',region:'CA',city:'Los Angeles',title:'Los Angeles expands connected-city infrastructure',description:'A demo story for the country → region → city navigation flow.',image:'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T01:15:00-07:00',category:'Business',url:'https://www.cnn.com/'},
    {id:'004',country:'GB',region:'ENG',city:'London',title:'London pilots a smarter urban data network',description:'Demo world news marker and London city article.',image:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T05:10:00+01:00',category:'Science',url:'https://www.reuters.com/'},
    {id:'005',country:'JP',region:'TOK',city:'Tokyo',title:'Tokyo showcases next-generation urban technology',description:'Demo Tokyo coverage for the prefecture → city flow.',image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T12:20:00+09:00',category:'Technology',url:'https://www.bbc.com/news'},
    {id:'006',country:'FR',region:'IDF',city:'Paris',title:'Paris accelerates a new sustainable-city program',description:'Demo Île-de-France regional story.',image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T04:35:00+02:00',category:'Environment',url:'https://www.france24.com/'},
    {id:'007',country:'AU',region:'NSW',city:'Sydney',title:'Sydney tests new coastal resilience technology',description:'Demo New South Wales coverage.',image:'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T14:05:00+10:00',category:'Environment',url:'https://www.reuters.com/'},
    {id:'008',country:'BR',region:'SP',city:'São Paulo',title:'São Paulo expands digital services for residents',description:'Demo Brazilian city story.',image:'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T08:45:00-03:00',category:'Local',url:'https://www.reuters.com/'},
    {id:'009',country:'DE',city:'Berlin',title:'Berlin advances an open-data innovation program',description:'Demo German global-news marker.',image:'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T05:40:00+02:00',category:'Business',url:'https://www.dw.com/'},
    {id:'010',country:'CN',city:'Beijing',title:'Beijing highlights new urban technology projects',description:'Demo China coverage.',image:'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T11:10:00+08:00',category:'Technology',url:'https://www.reuters.com/'},
    {id:'011',country:'CA',city:'Toronto',title:'Toronto expands connected public services',description:'Demo Canada coverage.',image:'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T08:30:00-04:00',category:'Local',url:'https://www.cbc.ca/news'},
    {id:'012',country:'ZA',city:'Johannesburg',title:'Johannesburg pilots a new digital city platform',description:'Demo South Africa coverage.',image:'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=1000&q=80',source:'WorldLens Demo',publishedAt:'2026-09-13T13:20:00+02:00',category:'Technology',url:'https://www.reuters.com/'}
  ];

  const state={countries:DEMO_COUNTRIES,regions:DEMO_REGIONS,cities:DEMO_CITIES,news:DEMO_NEWS,level:'world',country:null,region:null,city:null,filter:'ALL',globe:null,auto:true,heat:true};
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  async function get(name){
    const bust='?t='+Date.now();
    for(const url of [RAW+name+bust,LOCAL+name+bust]){
      try{const r=await fetch(url,{cache:'no-store'});if(!r.ok)continue;const d=await r.json();if(Array.isArray(d)&&d.length)return d}catch(e){}
    }
    return name==='countries.json'?DEMO_COUNTRIES:name==='regions.json'?DEMO_REGIONS:name==='cities.json'?DEMO_CITIES:DEMO_NEWS;
  }
  async function getMeta(){
    for(const url of [RAW+'news-meta.json?t='+Date.now(),LOCAL+'news-meta.json?t='+Date.now()]){
      try{const r=await fetch(url,{cache:'no-store'});if(r.ok)return await r.json()}catch(e){}
    }
    return null;
  }
  function ago(v){const ms=Date.now()-new Date(v).getTime();const s=Math.max(0,ms/1000);if(s<60)return'Just now';if(s<3600)return Math.floor(s/60)+' min ago';if(s<86400)return Math.floor(s/3600)+' hr ago';return Math.floor(s/86400)+' day ago'}
  function img(u,t){return `<img src="${esc(u||FALLBACK)}" alt="${esc(t)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK}'">`}
  function filtered(){let n=[...state.news];if(state.level==='country')n=n.filter(x=>x.country===state.country?.id);if(state.level==='region')n=n.filter(x=>x.country===state.country?.id&&x.region===state.region?.id);if(state.level==='city')n=n.filter(x=>x.city===state.city?.name);if(state.filter!=='ALL')n=n.filter(x=>String(x.category||'').toUpperCase()===state.filter);return n.sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt))}
  function title(){return state.level==='city'?state.city.name:state.level==='region'?state.region.name:state.level==='country'?state.country.name:'GLOBAL NEWS'}
  function render(){
    renderTicker();
    const news=filtered(),first=news[0];$('panelTitle').textContent=title();$('locationTitle').textContent=title();
    $('breadcrumb').innerHTML='<button data-level="world">WORLD</button>'+(state.country?` / <button data-level="country">${esc(state.country.name.toUpperCase())}</button>`:'')+(state.region?` / <button data-level="region">${esc(state.region.name.toUpperCase())}</button>`:'')+(state.city?` / <button data-level="city">${esc(state.city.name.toUpperCase())}</button>`:'');
    $('backBtn').hidden=state.level==='world';
    const filters=['ALL','LOCAL','BUSINESS','TECHNOLOGY','SCIENCE','ENVIRONMENT','SPORTS','POLITICS'];$('filters').innerHTML=filters.map(f=>`<button class="filter ${state.filter===f?'active':''}" data-filter="${f}">${f}</button>`).join('');
    if(!first){$('featuredNews').innerHTML='<div class="meta">No news found for this selection.</div>';$('newsList').innerHTML='';return}
    $('featuredNews').innerHTML=`<article class="featured">${img(first.image,first.title)}<div class="featured-body"><div class="category">${esc(first.category||'NEWS')}</div><h3>${esc(first.title)}</h3><p>${esc(first.description)}</p><div class="meta">${esc(first.source||'WorldLens')} · ${ago(first.publishedAt)}</div><a class="read" href="${esc(first.url||'#')}" target="_blank" rel="noopener">READ FULL STORY →</a></div></article>`;
    $('newsList').innerHTML=news.slice(1,8).map(n=>`<article class="news-card">${img(n.image,n.title)}<div><div class="category">${esc(n.category||'NEWS')}</div><h4>${esc(n.title)}</h4><p>${esc(n.description)}</p><div class="meta">${esc(n.source||'WorldLens')} · ${ago(n.publishedAt)}</div><a class="read" href="${esc(n.url||'#')}" target="_blank" rel="noopener">READ →</a></div></article>`).join('');
  }
  function updateLiveMeta(meta){
    const badge=$('updatedBadge');
    if(!badge)return;
    if(meta?.updatedAt){
      const d=new Date(meta.updatedAt);
      badge.textContent='UPDATED '+d.toLocaleString([], {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
      badge.title='Provider: '+(meta.provider||'RSS')+' · Stories: '+(meta.storyCount||state.news.length);
      badge.classList.add('fresh');
    }else{
      badge.textContent='LIVE RSS';
    }
  }
  function renderTicker(){
    const box=$('breakingTicker'); if(!box)return;
    const breaking=[...state.news].filter(x=>x.breaking).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,8);
    const items=(breaking.length?breaking:state.news.slice(0,8));
    if(!items.length){box.hidden=true;return}
    box.hidden=false;
    box.innerHTML='<span class="ticker-label">● LIVE</span><div class="ticker-track">'+items.map(n=>'<a href="'+esc(n.url||'#')+'" target="_blank" rel="noopener"><strong>'+esc(n.city||n.country||'WORLD')+'</strong> '+esc(n.title)+'</a>').join('')+'</div>';
  }
  function camera(lat,lng,alt){if(state.globe)state.globe.pointOfView({lat,lng,alt},900)}
  function country(c){state.level='country';state.country=c;state.region=null;state.city=null;state.filter='ALL';render();camera(c.lat,c.lng,1.35)}
  function region(r){state.level='region';state.region=r;state.country=state.countries.find(c=>c.id===r.country);state.city=null;state.filter='ALL';render();camera(r.lat,r.lng,.65)}
  function city(c){state.level='city';state.city=c;state.country=state.countries.find(x=>x.id===c.country)||null;state.region=state.regions.find(x=>x.id===c.region)||null;state.filter='ALL';render();camera(c.lat,c.lng,.25)}
  function world(){state.level='world';state.country=null;state.region=null;state.city=null;state.filter='ALL';render();camera(20,0,2.5)}
  function initGlobe(){
    if(typeof Globe!=='function')throw new Error('Globe.gl CDN unavailable');
    state.globe=Globe()(document.getElementById('globeViz')).backgroundColor('#02050b').globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg').bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png').showAtmosphere(true).atmosphereColor('#4d9cff').atmosphereAltitude(.16).pointsData(state.cities).pointLat('lat').pointLng('lng').pointRadius(.28).pointAltitude(.02).pointColor(()=>state.heat?'#ff9f43':'#5da2ff').pointLabel(c=>`<b>${esc(c.name)}</b><br>Click for city news`).onPointClick(c=>city(c));
    state.globe.controls().enableDamping=true;state.globe.controls().autoRotate=true;state.globe.controls().autoRotateSpeed=.3;
    const resize=()=>{const e=$('globeViz');state.globe.width(e.clientWidth).height(e.clientHeight)};window.addEventListener('resize',resize);resize();
    if(typeof topojson!=='undefined')fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r=>r.json()).then(t=>{const f=topojson.feature(t,t.objects.countries).features;state.globe.polygonsData(f).polygonLabel(d=>`<b>${esc(d.properties?.name||'Country')}</b><br>Click for news`).polygonCapColor(d=>(String(d.properties?.name||'').toLowerCase().includes('india'))?'rgba(60,135,245,.42)':'rgba(55,105,180,.15)').polygonSideColor(()=> 'rgba(80,120,180,.18)').polygonStrokeColor(()=> 'rgba(120,170,255,.45)').polygonAltitude(.006).onPolygonClick(d=>{const n=String(d.properties?.name||'').toLowerCase();const aliases={'united states of america':'United States','united states':'United States','united kingdom':'United Kingdom'};const wanted=aliases[n]||d.properties?.name;const c=state.countries.find(x=>x.name.toLowerCase()===String(wanted).toLowerCase());if(c)country(c)})}).catch(()=>{});
  }
  async function start(){
    $('loadingText').textContent='Loading WorldLens...';
    try{
      const data=await Promise.all([get('countries.json'),get('regions.json'),get('cities.json'),get('news.json'),getMeta()]);
      state.countries=data[0];state.regions=data[1];state.cities=data[2];state.news=data[3];
      const meta=data[4];
      updateLiveMeta(meta);
      renderTicker();
      if(meta?.updatedAt){
        $('loadingText').textContent='Live RSS news · updated '+new Date(meta.updatedAt).toLocaleString();
      }
    }catch(e){console.warn('Using built-in demo data',e)}
    render();
    try{initGlobe()}catch(e){console.warn('Globe unavailable; continuing in news mode',e);$('locationTitle').textContent='NEWS MODE'}
    $('loadingText').textContent=`${state.news.length} news stories ready`;
    setTimeout(()=>$('loading').classList.add('hidden'),300);
  }
  document.addEventListener('click',e=>{
    const f=e.target.closest('[data-filter]');if(f){state.filter=f.dataset.filter;render();return}
    const b=e.target.closest('#breadcrumb button');if(b){if(b.dataset.level==='world')world();else if(b.dataset.level==='country'&&state.country)country(state.country);else if(b.dataset.level==='region'&&state.region)region(state.region);return}
    const s=e.target.closest('.search-result');if(s){const x=$('searchResults')._items[+s.dataset.i];$('searchResults').classList.remove('show');$('searchInput').value=x.name;x.type==='country'?country(x.item):x.type==='region'?region(x.item):city(x.item)}
  });
  $('searchInput').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();if(!q){$('searchResults').classList.remove('show');return}const a=[];state.countries.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>a.push({type:'country',name:x.name,item:x}));state.regions.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>a.push({type:'region',name:x.name,item:x}));state.cities.filter(x=>x.name.toLowerCase().includes(q)).forEach(x=>a.push({type:'city',name:x.name,item:x}));$('searchResults')._items=a;$('searchResults').innerHTML=a.slice(0,8).map((x,i)=>`<button class="search-result" data-i="${i}"><b>📍 ${esc(x.name)}</b><small>${x.type}</small></button>`).join('');$('searchResults').classList.toggle('show',a.length>0)});
  $('zoomIn').onclick=()=>{if(state.globe){const p=state.globe.pointOfView();state.globe.pointOfView({...p,altitude:Math.max(.15,p.altitude*.75)},400)}};
  $('zoomOut').onclick=()=>{if(state.globe){const p=state.globe.pointOfView();state.globe.pointOfView({...p,altitude:Math.min(4,p.altitude*1.3)},400)}};
  $('resetBtn').onclick=world;$('backBtn').onclick=()=>state.level==='city'?region(state.region):state.level==='region'?country(state.country):world();
  $('rotateBtn').onclick=()=>{state.auto=!state.auto;if(state.globe)state.globe.controls().autoRotate=state.auto;$('rotateBtn').textContent=`AUTO ROTATE: ${state.auto?'ON':'OFF'}`};
  $('heatBtn').onclick=()=>{state.heat=!state.heat;if(state.globe)state.globe.pointColor(()=>state.heat?'#ff9f43':'#5da2ff');$('heatBtn').textContent=`HEATMAP: ${state.heat?'ON':'OFF'}`};
  $('fullscreenBtn').onclick=()=>document.documentElement.requestFullscreen?.();$('themeBtn').onclick=()=>document.body.classList.toggle('light');
  start();
})();