'use strict';
const $=id=>document.getElementById(id);
const freshState=()=>({started:false,year:5,done:[],steps:[0,0,0,0,0,0],attempts:0,retries:0,clues:[],drafts:{},solved:{},session:[]});
let state=freshState(),active=-1,order=[],lastFocus=null,previousPicks={};
try{const saved=JSON.parse(localStorage.getItem('europa-v2-last')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))previousPicks=saved}catch(e){}
const dialog=$('dialog');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function tasks(i){return state.session[i]||[]}
function refs(ids){return '<div class="reference">Apoio: '+[...new Set(ids)].map(i=>`<a href="${SOURCES[i][1]}" target="_blank" rel="noopener">${SOURCES[i][0]}</a> — ${SOURCES[i][2]}`).join('<br>')+'</div>'}
function openDialog(title,body,kicker='CLUBE EUROPEU'){
 if(!dialog.open)lastFocus=document.activeElement;
 $('dialog-title').textContent=title;$('dialog-kicker').textContent=kicker;$('dialog-body').innerHTML=body;
 if(!dialog.open)dialog.showModal();$('dialog-title').focus();dialog.scrollTop=0;
}
function closeDialog(){dialog.close();if(lastFocus&&lastFocus.isConnected)lastFocus.focus()}
$('close-dialog').onclick=closeDialog;
dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog()});
function announce(s){$('announcement').textContent=s}
function render(){
 $('welcome').hidden=state.started;$('missions').hidden=!state.started;
 $('cycle-label').textContent=state.started?`${state.year}.º ano · ${state.year<7?'2.º':'3.º'} ciclo`:'5.º ao 9.º ano';
 $('score').textContent=`${state.done.length*100} / 600`;$('seals').textContent=`${state.done.length} de 6 selos`;
 $('progress').style.width=state.done.length/6*100+'%';document.querySelector('.progress').setAttribute('aria-valuenow',state.done.length);
 $('note-count').textContent=state.clues.length;
 $('mission-list').innerHTML=MISSIONS.map((m,i)=>`<button class="mission-button ${state.done.includes(i)?'complete':''}" data-mission="${i}" ${i===5&&state.done.length<5?'disabled':''}><b>${state.done.includes(i)?'✓':i+1}</b><span>${m.name}<small>${state.done.includes(i)?'Selo reunido · rever':i===5&&state.done.length<5?'Reúne os primeiros cinco selos':m.short}</small></span></button>`).join('');
 document.querySelectorAll('[data-mission]').forEach(b=>b.onclick=()=>visit(Number(b.dataset.mission)));
 $('finish').hidden=state.done.length!==6;
}
$('start').onclick=()=>{
 state.year=Number($('year').value);const selection=BankEngine.createSession(BANK,state.year,previousPicks);
 state.session=selection.missions;previousPicks={...previousPicks,...selection.picks};
 try{localStorage.setItem('europa-v2-last',JSON.stringify(previousPicks))}catch(e){}
 state.started=true;render();$('map').focus();announce('A aventura começou com uma nova seleção de desafios. Escolhe um dos cinco primeiros locais.');
};
function visit(i){
 if(!state.started){announce('Escolhe o teu ano e começa a aventura.');$('start').focus();return}
 if(i===5&&!state.done.includes(5)&&state.done.length<5){announce('Reúne primeiro os outros cinco selos.');return}
 active=i;if(window.moveToStation)window.moveToStation(i);
 if(!state.clues.includes(i))state.clues.push(i);render();
 if(state.done.includes(i)){openDialog(MISSIONS[i].name,`<p class="learning">Aprendizagem: ${esc(MISSIONS[i].learn)}</p><p>${esc(MISSIONS[i].clue)}</p>`+tasks(i).map(t=>`<h3>${esc(t.title)}</h3><p>${esc(t.clue)}</p><p>${esc(t.explain)}</p>${refs(t.refs)}`).join(''),'SELO REUNIDO · REVISÃO');return}
 showTask();
}
function showTask(){
 const m=MISSIONS[active],ts=tasks(active),step=state.steps[active],t=ts[step];
 let controls='';
 if(t.type==='match')controls=t.rows.map((r,i)=>`<div class="match-row"><label for="answer-${i}">${t.flags?`<img class="country-flag" src="assets/flags/${t.flags[i]}.png" alt="">`:''}${esc(r[0])}</label><select class="form-select" id="answer-${i}" required><option value="">Escolhe…</option>${t.options.map(o=>`<option>${esc(o)}</option>`).join('')}</select></div>`).join('');
 if(t.type==='choice'||t.type==='budget')controls='<div class="options">'+t.options.map((o,i)=>`<label class="choice"><input type="${t.type==='budget'?'checkbox':'radio'}" name="answer" value="${i}"><span>${esc(o)}</span></label>`).join('')+'</div>'+(t.type==='budget'?`<div class="budget" aria-live="polite" id="budget-total">0 / ${t.limit} créditos</div>`:'');
 if(t.type==='order'){order=state.drafts[t.id]?.order?[...state.drafts[t.id].order]:[...t.items];controls='<div id="order-list"></div>'}
 openDialog(m.name,`<p class="learning">Aprendizagem: ${esc(m.learn)}</p><details class="clue"><summary>Investigar a pista do local</summary><p class="mt-2">${esc(m.clue)}</p><p>${esc(t.clue)}</p>${refs(t.refs)}</details><p class="task-title">${esc(t.title)}</p><p>${esc(t.intro)}</p><form id="task-form" data-task-id="${t.id}">${controls}<div class="actions"><button type="submit" class="btn btn-primary" id="check">Verificar a minha solução</button><button type="button" class="btn btn-light" id="back-map">Voltar à praça</button></div></form><div id="feedback" aria-live="polite"></div>`,`MISSÃO ${active+1} · DESAFIO ${step+1} DE ${ts.length}`);
 if(t.type==='order')renderOrder();
 const draft=state.drafts[t.id];
 if(draft?.match)draft.match.forEach((v,i)=>$('answer-'+i).value=v);
 if(draft?.selected)draft.selected.forEach(i=>document.querySelector(`[name="answer"][value="${i}"]`).checked=true);
 const updateBudget=()=>{if(t.type==='budget')$('budget-total').textContent=`${selected().reduce((s,i)=>s+t.costs[i],0)} / ${t.limit} créditos`};updateBudget();
 $('task-form').onchange=()=>{saveDraft();updateBudget()};
 $('task-form').onsubmit=e=>{e.preventDefault();saveDraft();check(t)};$('back-map').onclick=closeDialog;
 if(state.solved[t.id])check(t,true);
}
function saveDraft(){if(active<0||!$('task-form'))return;const t=tasks(active)[state.steps[active]];state.drafts[t.id]={match:t.type==='match'?t.rows.map((_,i)=>$('answer-'+i).value):null,selected:selected(),order:t.type==='order'?[...order]:null}}
function renderOrder(){
 $('order-list').innerHTML=order.map((s,i)=>`<div class="order-item"><b>${i+1}</b><span>${esc(s)}</span><button type="button" class="btn btn-light" data-index="${i}" data-dir="-1" aria-label="Subir: ${esc(s)}" ${i===0?'disabled':''}>↑</button><button type="button" class="btn btn-light" data-index="${i}" data-dir="1" aria-label="Descer: ${esc(s)}" ${i===order.length-1?'disabled':''}>↓</button></div>`).join('');
 document.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.index),j=i+Number(b.dataset.dir),dir=b.dataset.dir;[order[i],order[j]]=[order[j],order[i]];renderOrder();saveDraft();const next=document.querySelector(`[data-index="${j}"][data-dir="${dir}"]`);if(next&&!next.disabled)next.focus();else $('order-list').querySelector('button:not(:disabled)').focus()});
}
function selected(){return [...document.querySelectorAll('[name="answer"]:checked')].map(e=>Number(e.value))}
function check(t,restoring=false){
 if(state.solved[t.id]&&!restoring)return;
 let ok=false,missing=false;
 if(t.type==='match'){const a=t.rows.map((_,i)=>$('answer-'+i).value);missing=a.some(v=>!v);ok=a.every((v,i)=>v===t.rows[i][1])}
 if(t.type==='choice'){missing=!selected().length;ok=selected()[0]===t.answer}
 if(t.type==='order')ok=order.every((v,i)=>v===t.answer[i]);
 if(t.type==='budget'){const a=selected();missing=!a.length;ok=BankEngine.isCorrect(t,a)}
 const f=$('feedback');
 if(missing){f.innerHTML='<p class="feedback">Completa a tua escolha antes de verificar.</p>';return}
 if(!restoring)state.attempts++;
 if(!ok){state.retries++;f.innerHTML=`<div class="feedback"><strong>Ainda podes melhorar a solução.</strong><p>${t.type==='budget'?`Confere os três objetivos e o limite de ${t.limit} créditos.`:t.type==='order'?'Procura as datas na pista e compara-as, da mais antiga para a mais recente.':'Compara cada escolha com a pista do local. Altera a solução e volta a verificar.'}</p><details><summary>Ajuda para compreender</summary><p>${esc(t.explain)}</p>${refs(t.refs)}</details><p class="mb-0 mt-2">Não perdes pontos. Podes abrir a pista acima.</p></div>`;AudioGame.effect(false);return}
 state.solved[t.id]=true;
 $('check').disabled=true;document.querySelectorAll('#task-form input,#task-form select,#order-list button').forEach(e=>e.disabled=true);
 f.innerHTML=`<div class="feedback correct"><strong>Descoberta confirmada!</strong><p>${esc(t.explain)}</p>${refs(t.refs)}<button class="btn btn-primary mt-3" id="next">${state.steps[active]+1===tasks(active).length?'Recolher selo':'Continuar a investigar →'}</button></div>`;
 if(!restoring)AudioGame.effect(true);$('next').onclick=()=>{
 state.steps[active]++;
 if(state.steps[active]<tasks(active).length){showTask();return}
 if(!state.done.includes(active))state.done.push(active);render();
 if(state.done.length===6){summary();return}
 openDialog('Um novo selo no teu passaporte!',`<div class="result-stamp">✦</div><p>Concluíste <strong>${MISSIONS[active].name}</strong> e reuniste 100 pontos de descoberta.</p><p>${MISSIONS[active].learn}</p><p>${state.done.length===5?'O Pavilhão do Futuro está agora aberto!':'Continua a explorar a praça.'}</p><button id="return" class="btn btn-primary">Voltar à praça</button>`,'MISSÃO CONCLUÍDA');$('return').onclick=closeDialog;
 };
 $('next').focus();
}
function summary(){openDialog('O futuro também se constrói contigo.',`<div class="result-stamp">✦ ✦ ✦</div><p><strong>6 selos · 600 / 600 pontos de descoberta</strong></p><p>Concluíste ${state.session.reduce((n,ts)=>n+ts.length,0)} desafios do ${state.year}.º ano, em ${state.attempts} verificações. Tiveste ${state.retries} ${state.retries===1?'oportunidade':'oportunidades'} de revisão. Aprender com o erro faz parte da aventura!</p><h3>O que trabalhaste</h3><ul>${MISSIONS.map(m=>`<li>${m.learn}</li>`).join('')}</ul><p>A pontuação reconhece missões concluídas; não é uma classificação escolar. Não foram retirados pontos por tentativas.</p><h3>Leva a descoberta para a tua escola</h3><p>Propõe ao teu Clube Europeu uma ação inclusiva com parceiros. Define o objetivo, ouve a turma e combina como avaliar os resultados.</p><button class="btn btn-primary" id="review-notes">Rever o caderno</button> <button class="btn btn-light" id="summary-close">Explorar a praça</button>`,'AVENTURA CONCLUÍDA');$('review-notes').onclick=notebook;$('summary-close').onclick=closeDialog}
function notebook(){openDialog('Caderno de descobertas',`<p>As pistas da tua seleção ficam disponíveis quando investigas cada local. Podes relê-las sem Internet.</p>${state.clues.length?state.clues.map(i=>`<section><h3>${state.done.includes(i)?'✓':'◦'} ${MISSIONS[i].name}</h3><p class="learning">${MISSIONS[i].learn}</p><p>${MISSIONS[i].clue}</p>${tasks(i).map(t=>`<h3>${esc(t.title)}</h3><p>${esc(t.clue)}</p>${state.done.includes(i)?`<p>${esc(t.explain)}</p>`:''}`).join('')}${refs([...MISSIONS[i].refs,...tasks(i).flatMap(t=>t.refs||[])])}</section>`).join(''):'<p>O teu caderno ainda está vazio. Começa a aventura e investiga um local.</p>'}`,'AS TUAS DESCOBERTAS')}
$('notebook').onclick=notebook;$('finish').onclick=summary;
$('help').onclick=()=>openDialog('Como jogar',`<ol><li>Escolhe o teu ano e começa a aventura. São sorteadas variantes para cada missão e baralhadas as opções. A seleção mantém-se durante esta sessão.</li><li>Toca ou clica num edifício; também podes usar os botões do passaporte.</li><li>Para explorar a pé, coloca o foco na praça com Tab. Usa as setas ou os botões de direção. Perto de um edifício, prime Enter ou «Investigar».</li><li>Abre a pista, resolve o desafio e verifica. Podes corrigir as tuas escolhas sem perder pontos.</li><li>Depois da explicação, continua e recolhe o selo. Os cinco primeiros selos abrem o pavilhão final.</li><li>Consulta o caderno a qualquer momento. Usa Tab e Shift+Tab para navegar, Enter ou Espaço para ativar botões e Escape para fechar janelas.</li></ol><p>As seleções usam os controlos normais do navegador. No desafio de ordem, usa os botões ↑ e ↓. Não é necessário arrastar.</p><p><strong>Som inicialmente desligado.</strong> Ativa-o nas opções de som. Sem limites de tempo. A sessão mantém-se enquanto a página estiver aberta; atualizar ou fechar a página inicia uma sessão nova.</p><p>Recomeçar cria uma nova seleção. Quando o navegador permite guardar preferências locais, o jogo evita a última variante de cada grupo. Não guarda o progresso.</p><p>Todos os recursos do jogo estão na pasta. Só precisas de Internet para abrir as ligações externas das fontes.</p>`);
$('sources').onclick=()=>openDialog('Fontes e rigor',`<p>Consulta institucional: 21 de outubro de 2026. Os textos são sínteses educativas; não são transcrições integrais.</p>${SOURCES.map((s,i)=>`<p><a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a><br><small>${s[2]}</small></p>`).join('')}<h3>Precisões relevantes</h3><p>O excerto da DGE apresenta objetivos educativos, não aprendizagens oficiais por ano. As aprendizagens deste jogo são uma adaptação para o 5.º ao 9.º ano. Europa, UE e Conselho da Europa são distintos. A DUDH é universal e foi adotada pela ONU em 1948. Em 1986, Portugal aderiu às Comunidades Europeias. As 12 estrelas não representam o número de Estados-Membros.</p><p>O processo legislativo foi simplificado ao processo ordinário; há procedimentos especiais. O mapa é uma praça fictícia, não representa fronteiras ou localizações reais. Os custos e problemas ambientais são fictícios. As decisões são propostas educativas, não previsões garantidas.</p><p>Não se identificou contradição material nos objetivos transcritos da DGE. A expressão histórica «direitos do homem» é apresentada como «direitos humanos». A página de distinções do Conselho da Europa ainda refere 705 eurodeputados: esse número está desatualizado e não é usado no jogo.</p><p>Bibliotecas locais: p5.js, distribuição 2.3.3; Bootstrap 5.3.8. Som original gerado com Web Audio; ilustrações vetoriais desenhadas no jogo. Logótipos fornecidos pelo utilizador, conservados sem alteração.</p>`);
$('restart').onclick=()=>{openDialog('Recomeçar a aventura?',`<p>Vais apagar o progresso desta sessão e voltar à escolha do ano.</p><button id="confirm-restart" class="btn btn-primary">Sim, recomeçar</button> <button id="cancel-restart" class="btn btn-light">Continuar a sessão</button>`);$('cancel-restart').onclick=closeDialog;$('confirm-restart').onclick=()=>{state=freshState();AudioGame.stop();AudioGame.mode='off';$('sound').textContent='Som: desligado';render();closeDialog();$('year').focus()}};
const AudioGame={ctx:null,gain:null,timer:null,mode:'off',volume:.2,index:0,
 async set(mode){this.stop();this.mode=mode;if(mode==='off')return;try{this.ctx??=new(window.AudioContext||window.webkitAudioContext)();await this.ctx.resume();this.gain=this.ctx.createGain();this.gain.gain.value=this.volume*.22;this.gain.connect(this.ctx.destination);this.tick();this.timer=setInterval(()=>this.tick(),mode==='ambient'?2600:650)}catch(e){this.mode='off';announce('O som não está disponível neste navegador.')}},
 tone(freq,duration,level=.3){if(!this.ctx||!this.gain)return;const o=this.ctx.createOscillator(),g=this.ctx.createGain(),now=this.ctx.currentTime;o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(level,now+.06);g.gain.exponentialRampToValueAtTime(.0001,now+duration);o.connect(g);g.connect(this.gain);o.start();o.stop(now+duration)},
 tick(){if(document.hidden)return;if(this.mode==='ambient'){this.tone(130.81,3,.12);this.tone(196,3,.06)}else{const notes=[261.63,329.63,392,329.63,293.66,349.23,392,523.25];this.tone(notes[this.index++%notes.length],.85,.22)}},
 effect(ok){if(this.mode!=='off')this.tone(ok?659.25:293.66,.45,.15)},
 stop(){clearInterval(this.timer);this.timer=null;if(this.gain){this.gain.disconnect();this.gain=null}},
};
$('sound').onclick=()=>{
 openDialog('O ambiente sonoro',`<p>O som é opcional. Escolhe o ambiente e ajusta o volume.</p><label for="audio-mode">Tipo de som</label><select id="audio-mode" class="form-select"><option value="off">Todo o som desligado</option><option value="ambient">Ambiente discreto</option><option value="melody">Melodia suave de jogo</option></select><label for="volume" class="mt-3">Volume</label><input id="volume" type="range" min="0" max="100" value="${AudioGame.volume*100}" class="form-range"><p id="volume-label">${Math.round(AudioGame.volume*100)}%</p><p class="small">Os efeitos são delicados e seguem a mesma opção e o mesmo volume.</p><button class="btn btn-primary" id="apply-audio">Aplicar som</button>`);
 $('audio-mode').value=AudioGame.mode;$('volume').oninput=e=>{AudioGame.volume=Number(e.target.value)/100;$('volume-label').textContent=e.target.value+'%';if(AudioGame.gain)AudioGame.gain.gain.value=AudioGame.volume*.22};
 $('apply-audio').onclick=async()=>{await AudioGame.set($('audio-mode').value);$('sound').textContent=AudioGame.mode==='off'?'Som: desligado':AudioGame.mode==='ambient'?'Som: ambiente':'Som: melodia';closeDialog()};
};
function downloadJSON(data,name){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function openBank(){
 const total=BANK.missions.reduce((n,m)=>n+m.slots.reduce((v,s)=>v+s.variants.length,0),0);
 openDialog('Uma base para muitas aventuras',`<p><strong>${total} variantes · 27 bandeiras · 6 missões</strong></p><p>Cada missão sorteia um desafio de cada grupo: dois comuns a todos os anos e um adicional no 3.º ciclo. As perguntas e as opções mantêm-se enquanto jogas. Quando recomeças, cada grupo evita a variante anterior, se o navegador permitir guardar esta preferência.</p><ul>${BANK.missions.map(m=>`<li><strong>${esc(m.name)}:</strong> ${m.slots.map(s=>s.variants.length).join(' + ')} variantes nos três grupos.</li>`).join('')}</ul><button class="btn btn-primary" id="download-bank">Descarregar a base atual (JSON)</button>${state.started?'<button class="btn btn-light mt-2" id="download-selection">Descarregar referências desta sessão (JSON)</button>':''}<h3>Carregar uma base editada</h3><p>Antes de começar, podes escolher uma cópia do JSON com novas variantes. O ficheiro é lido apenas neste navegador. A estrutura é validada; o rigor do conteúdo deve ser revisto pelo professor.</p><label for="bank-file">Ficheiro da base de desafios</label><input class="form-control" id="bank-file" type="file" accept=".json,application/json" ${state.started?'disabled':''}><p class="small">${state.started?'Recomeça a aventura para carregar outra base.':'O carregamento vale para esta página aberta. Ao atualizar, volta a ser usada a base incluída no jogo.'}</p><div id="bank-message" role="status"></div><h3>Catálogo das 27 bandeiras</h3><div class="flag-gallery">${BANK.countries.map(c=>`<figure><img src="${c.flag}" alt="Bandeira de ${esc(c.name)}"><figcaption><strong>${esc(c.name)}</strong><br>${esc(c.description)}</figcaption></figure>`).join('')}</div>${refs([3,11,13])}`,'VERSÃO 2 · VARIANTES ALEATÓRIAS');
 $('download-bank').onclick=()=>downloadJSON(BANK,'banco-desafios.json');
 if($('download-selection'))$('download-selection').onclick=()=>downloadJSON({version:2,base:BANK.title,year:state.year,missions:state.session.map((ts,i)=>({mission:MISSIONS[i].id,name:MISSIONS[i].name,tasks:ts.map(t=>t.id)}))},'selecao-da-sessao.json');
 $('bank-file').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;
  try{if(file.size>3*1024*1024)throw new Error('O ficheiro não pode ultrapassar 3 MB.');const candidate=BankEngine.validate(JSON.parse(await file.text()));BANK=candidate;SOURCES=BANK.sources;MISSIONS=BANK.missions;previousPicks={};render();openBank();$('bank-message').textContent='Base carregada. Podes começar uma nova aventura.'}
  catch(error){$('bank-message').textContent=error instanceof SyntaxError?'O ficheiro não contém JSON válido. A base anterior foi mantida.':error.message+' A base anterior foi mantida.'}
 };
}
$('bank').onclick=openBank;
render();
