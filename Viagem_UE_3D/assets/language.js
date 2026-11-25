/* Local-file compatible bootstrap; the game state and its codes keep their v3 schema. */
(()=>{
  const valid=s=>s==='en'||s==='pt';
  let language='pt';
  const query=new URLSearchParams(location.search).get('lang');
  if(valid(query))language=query;
  else try{const saved=localStorage.getItem('expresso-language');if(valid(saved))language=saved;}catch{}
  window.ExpressoLanguage=language;
  document.documentElement.lang=language==='en'?'en-GB':'pt-PT';
  document.title=language==='en'?'The Star Express · 13 cities':'O Expresso das Estrelas · 13 cidades';
  const initial=document.createElement('p');initial.className='initial-loading';initial.role='status';
  initial.textContent=language==='en'?'Preparing the journey…':'A preparar a viagem…';document.getElementById('app').append(initial);
  function load(url){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=url;script.onload=resolve;script.onerror=()=>reject(new Error(url));document.head.append(script);});}
  function selector(){
    const nav=document.querySelector('.topbar nav');if(!nav||document.getElementById('game-language'))return;
    const label=document.createElement('label');label.className='language-choice';
    const select=document.createElement('select');select.id='game-language';select.setAttribute('aria-label','Idioma / Language');
    for(const [value,text] of [['pt','PT · Português'],['en','EN · English']]){const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option);}
    select.value=language;label.append(select);nav.insertBefore(label,document.getElementById('nav-options'));
    select.addEventListener('change',()=>{
      try{
        localStorage.setItem('expresso-language',select.value);
        if(document.body.classList.contains('playing'))sessionStorage.setItem('expresso-resume-after-language','1');
      }catch{}
      // The query also carries the choice when local storage is unavailable.
      const url=new URL(location.href);url.searchParams.set('lang',select.value);location.replace(url.href);
    });
    try{
      if(sessionStorage.getItem('expresso-resume-after-language')==='1'){
        sessionStorage.removeItem('expresso-resume-after-language');
        const button=document.getElementById('continue-button');if(button&&!button.hidden)button.click();
      }
    }catch{}
  }
  (async()=>{
    try{
      if(language==='en'){
        await load('./assets/translations.en.js');await load('./assets/language-runtime.js');
        window.ExpressoInstallEnglish(document,window.ExpressoEnglish);
      }
      await load(language==='en'?'./assets/app.en.js':'./assets/app.js');selector();
    }catch(error){initial.textContent=language==='en'?'The game could not open. Keep index.html, assets and models together, and reload.':'Não foi possível abrir o jogo. Mantém index.html, assets e models juntos e volta a abrir.';document.getElementById('app').replaceChildren(initial);console.error(error);}
  })();
})();
