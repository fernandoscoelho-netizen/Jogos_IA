'use strict';
(function(root){
 const CODES='de at be bg cz cy hr dk sk si es ee fi fr gr hu ie it lv lt lu mt nl pl pt ro se'.split(' ');
 const fail=msg=>{throw new Error('Base inválida: '+msg)};
 const text=(v,label)=>{if(typeof v!=='string'||!v.trim()||v.length>5000||/[<>]/.test(v))fail(label+' deve ser texto simples, sem etiquetas HTML.');};
 const unique=a=>new Set(a).size===a.length;
 function validate(b){
  if(!b||b.schemaVersion!==2||b.language!=='pt-PT')fail('usa schemaVersion 2 e language pt-PT.');
  text(b.title,'O título');
  if(!Array.isArray(b.sources)||b.sources.length<14||b.sources.length>100)fail('faltam as fontes.');
  b.sources.forEach(s=>{if(!Array.isArray(s)||s.length!==3)fail('cada fonte precisa de título, URL e secção.');s.forEach(v=>text(v,'A fonte'));if(!/^https:\/\/[^\s"'<>]+$/.test(s[1]))fail('a ligação de uma fonte deve usar HTTPS.');});
  const references=(r)=>{if(!Array.isArray(r)||!r.length||r.some(i=>!Number.isInteger(i)||i<0||i>=b.sources.length))fail('referências em falta ou fora da lista de fontes.');};
  if(!Array.isArray(b.countries)||b.countries.length!==27||!unique(b.countries.map(c=>c.code)))fail('o catálogo deve conter os 27 países, sem repetições.');
  b.countries.forEach(c=>{if(!CODES.includes(c.code)||c.eu!==true||c.flag!==`assets/flags/${c.code}.png`)fail('país ou caminho de bandeira não reconhecido.');text(c.name,'O país');text(c.description,'A descrição');references(c.refs)});
  if(!Array.isArray(b.missions)||b.missions.length!==6)fail('são necessárias seis missões.');
  const ids=new Set();
  b.missions.forEach((m,mi)=>{
   if(m.id!==`m${mi+1}`)fail('mantém os identificadores m1 a m6.');
   ['name','short','learn','clue','color'].forEach(k=>text(m[k],k));references(m.refs);
   if(!/^#[0-9a-f]{6}$/i.test(m.color)||![m.x,m.y].every(Number.isFinite)||m.x<0||m.x>1000||m.y<0||m.y>580)fail('posição ou cor do local inválida.');
   if(!Array.isArray(m.slots)||m.slots.length!==3)fail('cada missão precisa de três grupos de desafios.');
   m.slots.forEach((s,si)=>{
    if(s.id!==`s${si+1}`||s.advanced!==(si===2)||!Array.isArray(s.variants)||s.variants.length<2||s.variants.length>1000)fail('cada grupo deve ter pelo menos duas variantes; só o terceiro é avançado.');
    s.variants.forEach(t=>{
     if(typeof t.id!=='string'||! /^[a-z0-9-]{1,80}$/.test(t.id)||ids.has(t.id))fail('identificador de desafio repetido ou inválido.');ids.add(t.id);
     ['title','intro','clue','explain'].forEach(k=>text(t[k],k));references(t.refs);
     if(t.type==='choice'||t.type==='budget'||t.type==='match'){
      if(!Array.isArray(t.options)||t.options.length<2||t.options.length>8||!unique(t.options))fail('opções repetidas ou inválidas.');t.options.forEach(o=>text(o,'A opção'));
     }
     if(t.type==='choice'){
      if(!Number.isInteger(t.answer)||t.answer<0||t.answer>=t.options.length)fail('resposta de escolha inválida.');
     }else if(t.type==='match'){
      if(!Array.isArray(t.rows)||t.rows.length<2||t.rows.length>6)fail('linhas de associação inválidas.');
      t.rows.forEach(r=>{if(!Array.isArray(r)||r.length!==2||!t.options.includes(r[1]))fail('associação sem opção correta.');text(r[0],'O enunciado da associação');});
      if(t.flags&&(!Array.isArray(t.flags)||t.flags.length!==t.rows.length||t.flags.some(c=>!CODES.includes(c))))fail('bandeiras sem correspondência com as linhas.');
     }else if(t.type==='order'){
      if(!Array.isArray(t.items)||!Array.isArray(t.answer)||t.items.length<3||t.items.length>6||!unique(t.items)||!unique(t.answer)||t.answer.length!==t.items.length||t.answer.some(v=>!t.items.includes(v)))fail('sequência ou resposta de ordenação inválida.');t.items.forEach(v=>text(v,'O acontecimento'));
     }else if(t.type==='budget'){
      if(!Array.isArray(t.costs)||t.costs.length!==t.options.length||t.costs.some(c=>!Number.isInteger(c)||c<1||c>100)||!Number.isInteger(t.limit)||t.limit<1||t.limit>100)fail('custos ou orçamento inválidos.');
      if(!Array.isArray(t.answer)||!t.answer.length||!unique(t.answer)||t.answer.some(i=>!Number.isInteger(i)||i<0||i>=t.options.length)||t.answer.reduce((sum,i)=>sum+t.costs[i],0)>t.limit)fail('a solução ultrapassa o orçamento ou usa opções inválidas.');
     }else fail('tipo de desafio não reconhecido.');
    });
   });
  });return b;
 }
 function shuffle(a,rng=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function prepare(task,rng){
  const t=JSON.parse(JSON.stringify(task));
  if(t.type==='choice'||t.type==='budget'){
   const indices=shuffle(t.options.map((_,i)=>i),rng);t.options=indices.map(i=>task.options[i]);
   if(t.type==='choice')t.answer=indices.indexOf(task.answer);
   else{t.costs=indices.map(i=>task.costs[i]);t.answer=task.answer.map(i=>indices.indexOf(i))}
  }else if(t.type==='match'){
   const indices=shuffle(t.rows.map((_,i)=>i),rng);t.rows=indices.map(i=>task.rows[i]);if(t.flags)t.flags=indices.map(i=>task.flags[i]);t.options=shuffle(t.options,rng);
  }else if(t.type==='order'){
   t.items=shuffle(t.items,rng);if(t.items.every((v,i)=>v===t.answer[i]))t.items.push(t.items.shift());
  }return t;
 }
 function createSession(bank,year,previous={},rng=Math.random){
  if(![5,6,7,8,9].includes(year))fail('ano de escolaridade inválido.');
  const picks={};const missions=bank.missions.map(m=>m.slots.filter(s=>year>=7||!s.advanced).map(s=>{
   const key=m.id+'-'+s.id;let pool=s.variants.filter(t=>t.id!==previous[key]);if(!pool.length)pool=s.variants;
   const t=pool[Math.floor(rng()*pool.length)];picks[key]=t.id;return prepare(t,rng);
  }));return {missions,picks};
 }
 function isCorrect(t,a){
  if(t.type==='choice')return a===t.answer;
  if(!Array.isArray(a))return false;
  if(t.type==='budget')return unique(a)&&a.length===t.answer.length&&a.every(i=>t.answer.includes(i))&&a.reduce((n,i)=>n+(t.costs[i]??Infinity),0)<=t.limit;
  const target=t.type==='match'?t.rows.map(r=>r[1]):t.answer;
  return a.length===target.length&&a.every((v,i)=>v===target[i]);
 }
 root.BankEngine={validate,shuffle,createSession,prepare,isCorrect};
 if(typeof module!=='undefined'&&module.exports)module.exports=root.BankEngine;
})(typeof window!=='undefined'?window:globalThis);
