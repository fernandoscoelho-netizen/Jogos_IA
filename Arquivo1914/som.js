'use strict';
// Composições originais contemporâneas, locais e sem serviços de áudio externos.
const MUSIC_TRACKS=[
 {file:'assets/som/01-mystere-des-archives.mp3',title:'Mistério dos arquivos'},
 {file:'assets/som/02-memoires-de-guerre.mp3',title:'Memórias da guerra'},
 {file:'assets/som/03-voix-de-petrograd.mp3',title:'Vozes de Petrogrado'}
];
let audioContext=null,audioMaster=null,audioTimer=null,audioNodes=[];
let audioMode='off',audioVolume=.26,audioRequest=0,musicRoom=-1;
const music=new Audio();music.loop=true;music.preload='none';
music.id='soundtrack';music.hidden=true;music.setAttribute('aria-hidden','true');document.body.append(music);
function soundMessage(text){if($('#audioMessage'))$('#audioMessage').textContent=text;}
function stopAudio(){
 audioRequest++;if(audioTimer)clearInterval(audioTimer);audioTimer=null;
 music.pause();music.currentTime=0;musicRoom=-1;
 audioNodes.forEach(n=>{try{n.stop();}catch(e){}});audioNodes=[];
 if(audioMaster&&audioContext)audioMaster.gain.setValueAtTime(0,audioContext.currentTime);
 audioMode='off';$('#sound').textContent='Som: desligado';
}
function synthNote(freq,duration,delay=0,amplitude=.12,type='sine'){
 if(!audioContext||!audioMaster||audioMode==='off')return;
 const t=audioContext.currentTime+delay,o=audioContext.createOscillator(),g=audioContext.createGain();
 o.type=type;o.frequency.value=freq;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(amplitude,t+Math.min(.12,duration*.18));
 g.gain.exponentialRampToValueAtTime(.0001,t+duration);
 o.connect(g);g.connect(audioMaster);o.start(t);o.stop(t+duration+.03);audioNodes.push(o);
 o.onended=()=>{audioNodes=audioNodes.filter(x=>x!==o);o.disconnect();g.disconnect();};
}
function applyVolume(){
 music.volume=audioVolume;
 if(audioMaster&&audioContext)audioMaster.gain.setValueAtTime(audioMode==='off'?0:audioVolume,audioContext.currentTime);
}
function syncMusic(){
 if(audioMode!=='melody'||musicRoom===state.room)return;
 const token=audioRequest,track=MUSIC_TRACKS[state.room];
 musicRoom=state.room;music.src=track.file;applyVolume();
 music.play().then(()=>{if(token!==audioRequest||audioMode!=='melody')return; soundMessage('A tocar: '+track.title+'.');}).catch(()=>{
  if(token!==audioRequest||audioMode!=='melody')return;
  musicRoom=-1;soundMessage('Não foi possível iniciar a música. Volta a selecionar Banda sonora de aventura. Confirma que a pasta assets/som acompanha o jogo.');
 });
}
async function setAudio(mode){
 stopAudio();if(mode==='off'){soundMessage('Todo o som está desligado.');return;}
 const token=audioRequest;audioMode=mode;soundMessage(mode==='melody'?'A preparar a banda sonora…':'A preparar o ambiente…');
 try{
  // A reprodução musical mantém-se disponível se o navegador não oferecer Web Audio.
  const AudioClass=window.AudioContext||window.webkitAudioContext;
  if(AudioClass){audioContext??=new AudioClass();if(!audioMaster){audioMaster=audioContext.createGain();audioMaster.connect(audioContext.destination);}await audioContext.resume();}
  if(token!==audioRequest)return;applyVolume();
  if(mode==='ambient'){
   if(!audioContext){stopAudio();soundMessage('O ambiente discreto não está disponível neste navegador. Podes escolher a banda sonora de aventura.');return;}
   const tick=()=>{[130.81,196,220,293.66].forEach((f,i)=>synthNote(f,9,i*.14,.035));};
   tick();audioTimer=setInterval(tick,8500);$('#sound').textContent='Som: ambiente';soundMessage('Ambiente discreto: um fundo harmónico suave para leres e investigares.');
  }else{syncMusic();$('#sound').textContent='Som: aventura';}
 }catch(e){if(token===audioRequest){stopAudio();soundMessage('O navegador não disponibilizou áudio. Podes continuar a jogar sem som.');}}
}
function audioFx(type){
 if(audioMode==='off')return;
 const notes=type==='success'?[293.66,349.23,440,587.33]:[587.33,880,1174.66];
 notes.forEach((f,i)=>synthNote(f,type==='success'?.8:.48,i*.09,.10));
 if(type==='success')synthNote(146.83,1.1,0,.14,'triangle');
}
$('#sound').onclick=()=>{
 showDialog('SOM FACULTATIVO','O som da tua investigação',`<label for="audioMode">Escolhe o modo</label><select class="form-select" id="audioMode"><option value="off">Todo o som desligado</option><option value="ambient">Ambiente discreto</option><option value="melody">Banda sonora de aventura</option></select><label class="mt-4" for="volume">Volume</label><input id="volume" type="range" min="0" max="100" value="${Math.round(audioVolume*100)}"><output id="volumeText">${Math.round(audioVolume*100)}%</output><p class="mt-3">Piano, cordas suaves e pequenos motivos de descoberta acompanham a exploração. A banda sonora muda com cada sala.</p><p class="small">Três composições originais atuais, evocativas do ambiente histórico; não são gravações nem reconstruções musicais da época. Todos os ficheiros estão incluídos para jogar sem Internet. Desligar o som silencia também os efeitos.</p><p id="audioMessage" role="status">${audioMode==='melody'?'A tocar: '+MUSIC_TRACKS[state.room].title+'.':audioMode==='off'?'O som está desligado.':'Ambiente discreto selecionado.'}</p>`);
 $('#audioMode').value=audioMode;$('#audioMode').onchange=e=>setAudio(e.target.value);
 $('#volume').oninput=e=>{audioVolume=+e.target.value/100;$('#volumeText').textContent=e.target.value+'%';applyVolume();};
};
document.addEventListener('visibilitychange',()=>{
 if(document.hidden){music.pause();if(audioContext)audioContext.suspend();}
 else{if(audioContext&&audioMode!=='off')audioContext.resume().catch(()=>{});if(audioMode==='melody')music.play().catch(()=>soundMessage('Seleciona novamente a banda sonora para retomar a reprodução.'));}
});
