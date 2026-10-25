/* ===== O Clube Europeu foi conhecer a UE… — lógica do jogo ===== */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const NS = 'http://www.w3.org/2000/svg';
const CHAVE = 'clube-europeu-ue-v1';
const N = PARAGENS.length;
const IDX = Object.fromEntries(PARAGENS.map((p, i) => [p.id, i]));
const PAIS_PATH = Object.fromEntries(MAPA.paises.map(p => [p.id || p.n, p]));
const fmt = (n, d = 0) => n.toLocaleString('pt-PT', { minimumFractionDigits: d, maximumFractionDigits: d });
const reduzMov = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Estado ---------- */
let E = null;
function novoEstado(nome, turma, escola, nivel) {
  return { v: 1, nome, turma, escola, nivel, inicio: Date.now(), atual: 0, livre: false,
    cid: {}, pernas: [], ouvidas: [], hino: false, camada: 'ue' };
}
function c(id) { return E.cid[id] || (E.cid[id] = { quizMelhor: 0, quizTent: 0, quizAjudas: 0, desafioOk: false, desafioTent: 0, desafioAjudas: 0, diario: '', carimbo: 0, visto: false }); }
function guardar() { try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) {} }
function carregar() { try { const s = localStorage.getItem(CHAVE); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
const carimbados = st => PARAGENS.filter(p => st.cid[p.id] && st.cid[p.id].carimbo).length;
const acessivel = i => E.livre || i <= E.atual;

/* ---------- Código de progresso ---------- */
function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return (h ^ 0x5e).toString(36); }
function codigoDe(st) { const j = JSON.stringify(st); const b = btoa(unescape(encodeURIComponent(j))); return 'CLUBEUE1.' + b + '.' + hash(j); }
function lerCodigo(txt) {
  const t = (txt || '').trim().replace(/\s+/g, '');
  if (!t.startsWith('CLUBEUE1.')) throw new Error('O código deve começar por CLUBEUE1.');
  const [, b, h] = t.split('.');
  const j = decodeURIComponent(escape(atob(b)));
  const st = JSON.parse(j);
  return { st, valido: hash(j) === h };
}

/* ---------- Utilitários de interface ---------- */
let toastT;
function toast(msg) {
  let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 3200);
}
function abrir(dlg) { if (!dlg.open) dlg.showModal(); dlg.scrollTop = 0; }
function fechar(dlg) { if (dlg.open) dlg.close(); pararVoz(); }
document.addEventListener('click', e => { const b = e.target.closest('[data-fechar]'); if (b) fechar(b.closest('dialog')); });
$$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) fechar(d); }));
const btnFechar = '<button class="fechar" type="button" data-fechar aria-label="Fechar">×</button>';

function estrelasSVG(cx, cy, r, raio, cor, cls = '') {
  let s = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<path class="${cls}" data-i="${i}" d="${estrela(cx + r * Math.sin(a), cy - r * Math.cos(a), raio)}" fill="${cor}"/>`; } return s;
}
function estrela(x, y, R) {
  const r = R * .4; let d = '';
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r : R; d += (k ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(2) + ' ' + (y + rr * Math.sin(a)).toFixed(2); }
  return d + 'Z';
}

/* ---------- Voz (narração e pronúncia) ---------- */
const temVoz = 'speechSynthesis' in window;
function vozPara(lang) {
  const vs = speechSynthesis.getVoices(); const l = lang.toLowerCase();
  return vs.find(v => v.lang.toLowerCase() === l) || vs.find(v => v.lang.toLowerCase().startsWith(l.split('-')[0]));
}
function falar(txt, lang = 'pt-PT') {
  if (!temVoz) { toast('Este navegador não tem leitura em voz alta.'); return; }
  try {
    speechSynthesis.cancel();
    let l = lang === 'lb' ? 'de-DE' : lang;
    const u = new SpeechSynthesisUtterance(txt); u.lang = l; u.rate = .92;
    const v = vozPara(l); if (v) u.voice = v; else if (l !== 'pt-PT') toast('Não há voz instalada para esta língua. Ouvirás uma aproximação.');
    speechSynthesis.speak(u);
  } catch (e) { toast('Não foi possível usar a voz neste navegador.'); }
}
function pararVoz() { try { temVoz && speechSynthesis.cancel(); } catch (e) {} }
if (temVoz) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }
function marcarOuvida(lingua) { if (E && !E.ouvidas.includes(lingua)) { E.ouvidas.push(lingua); guardar(); } }

/* ---------- Hino ---------- */
const NOTAS = { G3: 196, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392 };
const BAIXO = { C4: 130.81, D4: 146.83, E4: 130.81, F4: 174.61, G4: 196, G3: 196 };
let hinoCtx = null, hinoTimers = [];
function pararHino() {
  hinoTimers.forEach(clearTimeout); hinoTimers = [];
  if (hinoCtx) { try { hinoCtx.close(); } catch (e) {} hinoCtx = null; }
  $$('.hino-est path').forEach(p => p.setAttribute('fill', '#DFBD54'));
  const b = $('#b-hino'); if (b) b.innerHTML = ICONE.play + ' Tocar o hino';
}
function tocarHino() {
  if (hinoCtx) { pararHino(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { toast('Este navegador não permite tocar som.'); return; }
  hinoCtx = new AC();
  const ctx = hinoCtx, bpm = 104, beat = 60 / bpm;
  const mestre = ctx.createGain(); mestre.gain.value = .22; mestre.connect(ctx.destination);
  let t = ctx.currentTime + .15, k = 0;
  const estrelas = $$('.hino-est path');
  HINO.forEach(([n, d], i) => {
    const dur = d * beat;
    [[NOTAS[n], 'triangle', .9], [NOTAS[n] * 2, 'sine', .18]].forEach(([f, tipo, g]) => {
      const o = ctx.createOscillator(), gn = ctx.createGain(); o.type = tipo; o.frequency.value = f;
      gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(g, t + .03); gn.gain.exponentialRampToValueAtTime(.001, t + dur * .95);
      o.connect(gn).connect(mestre); o.start(t); o.stop(t + dur);
    });
    if (i % 4 === 0) { const o = ctx.createOscillator(), gn = ctx.createGain(); o.type = 'sine'; o.frequency.value = BAIXO[n] || 130.81;
      gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(.35, t + .05); gn.gain.exponentialRampToValueAtTime(.001, t + beat * 3.8);
      o.connect(gn).connect(mestre); o.start(t); o.stop(t + beat * 4); }
    const atraso = (t - ctx.currentTime) * 1000, idx = k++ % 12;
    hinoTimers.push(setTimeout(() => { estrelas.forEach((p, j) => p.setAttribute('fill', j === idx ? '#FFFFFF' : '#DFBD54')); }, atraso));
    t += dur;
  });
  hinoTimers.push(setTimeout(() => { if (E) { E.hino = true; guardar(); } pararHino(); toast('Ouviste o hino europeu até ao fim.'); }, (t - ctx.currentTime) * 1000 + 200));
  const b = $('#b-hino'); if (b) b.innerHTML = ICONE.stop + ' Parar';
}

/* ---------- Distâncias, tempos e CO2 ---------- */
function km(a, b) {
  const R = 6371, [, , la1, lo1] = MAPA.cidades[a], [, , la2, lo2] = MAPA.cidades[b];
  const dLa = (la2 - la1) * Math.PI / 180, dLo = (lo2 - lo1) * Math.PI / 180;
  const x = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
function estimativa(a, b, modo) {
  const d = km(a, b);
  if (modo === 'comboio') { const via = d * 1.25; return { km: via, h: via / 115 + .3, co2: via * .035 }; }
  return { km: d, h: d / 700 + 2.5, co2: d * .16 };
}
const horas = h => { const H = Math.floor(h), M = Math.round((h - H) * 60 / 5) * 5; return M === 60 ? `${H + 1} h` : `${H} h${M ? ' ' + String(M).padStart(2, '0') : ''}`; };

/* ---------- Mapa ---------- */
const svg = $('#mapa');
let VB = { x: 0, y: 0, w: MAPA.W, h: MAPA.H };
function cor(p, camada) {
  const u = PAISES_UE[p.id];
  if (camada === 'ue') return u ? 'var(--mapa-ue)' : 'var(--mapa-terra)';
  if (camada === 'euro') return u ? (u.euro ? '#E9C55A' : 'var(--mapa-ue)') : 'var(--mapa-terra)';
  if (camada === 'schengen') return (u && u.sch) ? 'var(--mapa-ue2)' : SCHENGEN_EXTRA[p.id] ? '#7FC3B5' : u ? 'var(--mapa-ue)' : 'var(--mapa-terra)';
  if (camada === 'adesao') { if (!u) return 'var(--mapa-terra)'; const e = { 1958: '#1F3F7A', 1973: '#2D5596', 1981: '#3A6FC0', 1986: '#5A8AD3', 1995: '#7EA4E0', 2004: '#A5C0EC', 2007: '#C4D6F3', 2013: '#DCE7F9' }; return e[u.ano]; }
}
const LEGENDAS = {
  ue: [['var(--mapa-ue)', '27 Estados-Membros'], ['var(--mapa-terra)', 'Outros países']],
  euro: [['#E9C55A', 'Usa o euro (21)'], ['var(--mapa-ue)', 'UE com moeda própria (6)']],
  schengen: [['var(--mapa-ue2)', 'UE em Schengen (25)'], ['#7FC3B5', 'Fora da UE, em Schengen (4)'], ['var(--mapa-ue)', 'UE fora de Schengen (2)']],
  adesao: [['#1F3F7A', '1958'], ['#3A6FC0', '1981'], ['#5A8AD3', '1986'], ['#7EA4E0', '1995'], ['#A5C0EC', '2004'], ['#DCE7F9', '2013']]
};
function construirMapa() {
  let s = `<rect x="-200" y="-200" width="${MAPA.W + 400}" height="${MAPA.H + 400}" fill="var(--mapa-mar)"/><g id="g-paises">`;
  MAPA.paises.forEach(p => { s += `<path class="pais${PAISES_UE[p.id] ? ' ue' : ''}" data-id="${p.id}" d="${p.d}"/>`; });
  s += '</g>';
  const mares = { atl: 'Oceano Atlântico', med: 'Mar Mediterrâneo', nor: 'Mar do Norte', bal: 'Mar Báltico' };
  for (const [k, n] of Object.entries(mares)) { const [x, y] = MAPA.mares[k]; s += `<text class="mar-txt" x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle">${n}</text>`; }
  s += '<g id="g-rotas"></g><g id="g-cidades"></g><g id="g-veiculo"></g>';
  svg.innerHTML = s;
  pintar();
  svg.addEventListener('click', e => {
    if (arrastou) return;
    const cid = e.target.closest('.cidade'); if (cid) { abrirCidade(+cid.dataset.i); return; }
    const p = e.target.closest('.pais'); if (p) mostrarFicha(p.dataset.id);
  });
  ligarZoom();
}
function pintar() {
  $$('#g-paises .pais').forEach(el => el.style.fill = cor({ id: el.dataset.id }, E.camada));
  $$('.camadas button').forEach(b => b.setAttribute('aria-pressed', b.dataset.camada === E.camada));
  $('#legenda').innerHTML = LEGENDAS[E.camada].map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`).join('');
}
$$('.camadas button').forEach(b => b.addEventListener('click', () => { E.camada = b.dataset.camada; guardar(); pintar(); }));
function mostrarFicha(id) {
  const u = PAISES_UE[id], f = $('#ficha');
  $$('.pais.sel').forEach(p => p.classList.remove('sel'));
  const el = svg.querySelector(`.pais[data-id="${id}"]`); if (el) el.classList.add('sel');
  if (u) {
    f.innerHTML = `<button type="button" aria-label="Fechar ficha" id="ficha-x">×</button><span class="eyebrow">Estado-Membro da UE</span><h3>${u.n}</h3><dl>
      <dt>Capital</dt><dd>${u.cap}</dd><dt>Adesão</dt><dd>${u.ano === 1958 ? '1958 · fundador' : u.ano}</dd>
      <dt>Moeda</dt><dd>${u.euro ? 'Euro' : u.moeda}</dd><dt>Schengen</dt><dd>${u.sch ? 'Sim' : 'Não'}</dd></dl>`;
  } else {
    const nome = SCHENGEN_EXTRA[id] || NOMES_PT[id] || (MAPA.paises.find(p => p.id === id) || {}).n || 'País';
    f.innerHTML = `<button type="button" aria-label="Fechar ficha" id="ficha-x">×</button><span class="eyebrow">Fora da UE</span><h3>${esc(nome)}</h3><dl><dt>Schengen</dt><dd>${SCHENGEN_EXTRA[id] ? 'Sim' : 'Não'}</dd></dl>`;
  }
  f.hidden = false; $('#ficha-x').onclick = () => { f.hidden = true; if (el) el.classList.remove('sel'); };
}
function desenharRotas() {
  const g = $('#g-rotas'), sw = VB.w / 400; let s = '';
  E.pernas.forEach(pr => { s += `<path class="rota-feita" stroke-width="${sw * 1.6}" ${pr.modo === 'aviao' ? `stroke-dasharray="${sw * 4} ${sw * 3}"` : ''} d="${curva(pr.de, pr.para, pr.modo)}"/>`; });
  const at = PARAGENS[E.atual], prox = PARAGENS[E.atual + 1];
  if (prox && c(at.id).carimbo) s += `<path class="rota-prox" stroke-width="${sw * 1.4}" stroke-dasharray="${sw * 1.5} ${sw * 3}" d="${curva(at.id, prox.id, 'comboio')}"/>`;
  g.innerHTML = s;
}
function curva(a, b, modo) {
  const [x1, y1] = MAPA.cidades[a], [x2, y2] = MAPA.cidades[b];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  let nx = -dy / L, ny = dx / L; if (ny > 0) { nx = -nx; ny = -ny; }
  const k = modo === 'aviao' ? .3 : .08;
  return `M${x1} ${y1} Q${(mx + nx * L * k).toFixed(1)} ${(my + ny * L * k).toFixed(1)} ${x2} ${y2}`;
}
function desenharCidades() {
  const g = $('#g-cidades'), r = VB.w / 160, fs = Math.max(VB.w / 62, 5), longe = VB.w > 520; let s = '';
  PARAGENS.forEach((p, i) => {
    const [x, y] = MAPA.cidades[p.id], feita = !!(E.cid[p.id] && E.cid[p.id].carimbo), atual = i === E.atual;
    const cls = ['cidade', feita ? 'feita' : '', atual ? 'atual' : '', !acessivel(i) ? 'bloq' : ''].join(' ');
    const mostrar = !longe || atual || i === E.atual + 1 || ['porto', 'lisboa', 'paris', 'roma', 'praga', 'varsovia', 'zagreb'].includes(p.id);
    const dir = ['haia', 'maastricht'].includes(p.id) ? 1 : ['bruxelas', 'luxemburgo'].includes(p.id) ? -1 : 1;
    const nome = p.id === 'luxemburgo' ? 'Luxemburgo' : p.cidade;
    s += `<g class="${cls}" data-i="${i}" role="button" tabindex="0" aria-label="${esc(p.cidade)}${feita ? ', carimbada' : ''}">
      <circle class="halo" cx="${x}" cy="${y}" r="${r * 2.2}"/><circle class="pto" cx="${x}" cy="${y}" r="${r}" stroke-width="${r * .45}"/>
      ${mostrar ? `<text x="${x + dir * r * 1.8}" y="${y + fs * .35}" font-size="${fs}" stroke-width="${fs * .28}" text-anchor="${dir > 0 ? 'start' : 'end'}">${esc(nome)}</text>` : ''}</g>`;
  });
  g.innerHTML = s;
  $$('.cidade', g).forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirCidade(+el.dataset.i); } }));
}
function aplicarVB() { svg.setAttribute('viewBox', `${VB.x} ${VB.y} ${VB.w} ${VB.h}`); desenharRotas(); desenharCidades(); }
function ajustarProporcao(alvo) {
  const r = svg.getBoundingClientRect(), ar = (r.width || 800) / (r.height || 500);
  let { x, y, w, h } = alvo; const cx = x + w / 2, cy = y + h / 2;
  if (w / h > ar) h = w / ar; else w = h * ar;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}
let animVB;
function irPara(alvo, dur = 900) {
  const fim = ajustarProporcao(alvo), ini = { ...VB };
  cancelAnimationFrame(animVB);
  if (reduzMov || dur === 0) { VB = fim; aplicarVB(); return; }
  const t0 = performance.now();
  const passo = t => { const k = Math.min(1, (t - t0) / dur), e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    for (const p of ['x', 'y', 'w', 'h']) VB[p] = ini[p] + (fim[p] - ini[p]) * e;
    svg.setAttribute('viewBox', `${VB.x} ${VB.y} ${VB.w} ${VB.h}`); if (k < 1) animVB = requestAnimationFrame(passo); else aplicarVB(); };
  animVB = requestAnimationFrame(passo);
}
function vistaEtapa() {
  const a = PARAGENS[E.atual], b = PARAGENS[Math.min(E.atual + 1, N - 1)];
  const [x1, y1] = MAPA.cidades[a.id], [x2, y2] = MAPA.cidades[b.id];
  const minX = Math.min(x1, x2), maxX = Math.max(x1, x2), minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
  const w = Math.max(maxX - minX, 140) * 1.9, h = Math.max(maxY - minY, 110) * 1.9;
  return { x: (minX + maxX) / 2 - w / 2, y: (minY + maxY) / 2 - h / 2, w, h };
}
const EUROPA = { x: 60, y: 120, w: 820, h: 700 };
let arrastou = false;
function ligarZoom() {
  const zoom = (f, cx, cy) => { const nw = Math.min(Math.max(VB.w * f, 90), 1400), nh = nw * VB.h / VB.w;
    if (cx === undefined) { cx = VB.x + VB.w / 2; cy = VB.y + VB.h / 2; }
    VB = { x: cx - (cx - VB.x) * nw / VB.w, y: cy - (cy - VB.y) * nh / VB.h, w: nw, h: nh }; aplicarVB(); };
  $('#z-mais').onclick = () => zoom(.7); $('#z-menos').onclick = () => zoom(1.4); $('#z-europa').onclick = () => irPara(EUROPA);
  svg.addEventListener('wheel', e => { e.preventDefault(); const r = svg.getBoundingClientRect();
    zoom(e.deltaY > 0 ? 1.15 : .87, VB.x + (e.clientX - r.left) / r.width * VB.w, VB.y + (e.clientY - r.top) / r.height * VB.h); }, { passive: false });
  const ptrs = new Map(); let ini = null, dist0 = 0;
  svg.addEventListener('pointerdown', e => { ptrs.set(e.pointerId, e); arrastou = false; ini = { x: e.clientX, y: e.clientY, vb: { ...VB } };
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; dist0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); } });
  svg.addEventListener('pointermove', e => {
    if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, e);
    const r = svg.getBoundingClientRect();
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()], d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (dist0) { zoom(dist0 / d); dist0 = d; arrastou = true; } return; }
    const dx = e.clientX - ini.x, dy = e.clientY - ini.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) { arrastou = true; svg.classList.add('arrastar'); svg.setPointerCapture(e.pointerId); }
    if (arrastou) { VB.x = ini.vb.x - dx / r.width * VB.w; VB.y = ini.vb.y - dy / r.height * VB.h; svg.setAttribute('viewBox', `${VB.x} ${VB.y} ${VB.w} ${VB.h}`); }
  });
  const fim = e => { ptrs.delete(e.pointerId); svg.classList.remove('arrastar'); if (arrastou) aplicarVB(); setTimeout(() => arrastou = false, 0); dist0 = 0; };
  svg.addEventListener('pointerup', fim); svg.addEventListener('pointercancel', fim);
  addEventListener('resize', () => { VB = ajustarProporcao(VB); aplicarVB(); });
}

/* Animação do veículo ao longo da rota */
function animarViagem(de, para, modo, depois) {
  const g = $('#g-veiculo'), sw = VB.w / 400;
  g.innerHTML = `<path id="trajeto" d="${curva(de, para, modo)}" fill="none" stroke="var(--rota)" stroke-width="${sw * 1.8}" stroke-linecap="round"/>
    <g id="veic" color="#2459A2"><circle r="${sw * 9}" fill="#fff" stroke="#2459A2" stroke-width="${sw}"/><g transform="translate(${-sw * 6} ${-sw * 6}) scale(${sw / 2})">${ICONE[modo]}</g></g>`;
  const path = $('#trajeto'), L = path.getTotalLength(), v = $('#veic');
  path.style.strokeDasharray = L; path.style.strokeDashoffset = L;
  if (reduzMov) { g.innerHTML = ''; depois(); return; }
  const dur = modo === 'aviao' ? 2600 : 3200, t0 = performance.now();
  const passo = t => { const k = Math.min(1, (t - t0) / dur), e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2, pt = path.getPointAtLength(L * e);
    v.setAttribute('transform', `translate(${pt.x} ${pt.y})`); path.style.strokeDashoffset = L * (1 - e);
    if (k < 1) requestAnimationFrame(passo); else setTimeout(() => { g.innerHTML = ''; depois(); }, 350); };
  requestAnimationFrame(passo);
}

/* ---------- Painel de destaque e grelha ---------- */
let modoEscolhido = 'comboio';
function renderDestaque() {
  const p = PARAGENS[E.atual], st = c(p.id), prox = PARAGENS[E.atual + 1], fim = carimbados(E) === N;
  const passos = [['Conhecer', st.visto], ['Quiz', st.quizMelhor >= 2], ['Desafio', st.desafioOk], ['Carimbo', !!st.carimbo]];
  let corpo = '';
  if (fim) {
    corpo = `<span class="eyebrow">Viagem concluída</span><h3>Treze carimbos!</h3><p>Percorreste a Europa do Porto a Roma. O teu certificado já está pronto.</p>
      <div class="acoes"><button class="primario" type="button" id="d-cert">Ver o certificado <span aria-hidden="true">↗</span></button><button class="secundario" type="button" id="d-pass">Abrir o passaporte</button></div>`;
  } else if (!st.carimbo) {
    corpo = `<span class="eyebrow">${E.atual === 0 ? 'Ponto de partida' : 'Estás aqui'} · Paragem ${E.atual + 1} de ${N}</span><h3>${esc(p.cidade)}</h3><p>${esc(RESUMOS[p.id])}</p>
      <div class="progresso-etapa">${passos.map(([t, ok]) => `<span class="${ok ? 'ok' : ''}">${t}</span>`).join('')}</div>
      <div class="acoes"><button class="primario" type="button" id="d-abrir">${st.visto ? 'Continuar nesta cidade' : 'Explorar esta cidade'} <span aria-hidden="true">↗</span></button></div>`;
  } else {
    const ec = estimativa(p.id, prox.id, 'comboio'), ea = estimativa(p.id, prox.id, 'aviao'), curto = ea.km < 350;
    if (curto && modoEscolhido === 'aviao') modoEscolhido = 'comboio';
    corpo = `<span class="eyebrow">Carimbo obtido em ${esc(p.cidade)}</span><h3>Próximo destino: ${esc(prox.cidade)}</h3><p>Escolhe como queres viajar. Os valores são estimativas por passageiro.</p>
      <div class="transportes" role="group" aria-label="Meio de transporte">
        <button class="transp" type="button" data-modo="comboio" aria-pressed="${modoEscolhido === 'comboio'}">${ICONE.comboio}<b>Comboio</b><small>≈ ${horas(ec.h)} · ${fmt(ec.km)} km<br>≈ ${fmt(ec.co2)} kg de CO₂</small></button>
        <button class="transp" type="button" data-modo="aviao" aria-pressed="${modoEscolhido === 'aviao'}" ${curto ? 'disabled' : ''}>${ICONE.aviao}<b>Avião</b><small>${curto ? 'Sem voos diretos práticos para uma distância tão curta.' : `≈ ${horas(ea.h)} com aeroporto · ${fmt(ea.km)} km<br>≈ ${fmt(ea.co2)} kg de CO₂`}</small></button>
      </div>
      <div class="acoes"><button class="primario" type="button" id="d-partir">Partir para ${esc(prox.cidade)} <span aria-hidden="true">→</span></button><button class="ligacao" type="button" id="d-rever">Rever ${esc(p.cidade)}</button></div>`;
  }
  const kmT = E.pernas.reduce((a, b) => a + b.km, 0), co2T = E.pernas.reduce((a, b) => a + b.co2, 0), comb = E.pernas.filter(x => x.modo === 'comboio').length;
  $('#destaque').innerHTML = `<div class="ilus">${postal(p.id)}<span class="etiqueta">${esc(p.pais)}</span></div>
    <div class="destaque-corpo">${corpo}
      <div class="totais"><div><b>${fmt(kmT)}</b><span>km percorridos</span></div><div><b>${fmt(co2T)}</b><span>kg de CO₂</span></div><div><b>${comb}/${E.pernas.length}</b><span>viagens de comboio</span></div></div>
    </div>`;
  const on = (id, f) => { const b = $(id); if (b) b.onclick = f; };
  on('#d-abrir', () => abrirCidade(E.atual)); on('#d-rever', () => abrirCidade(E.atual)); on('#d-partir', partir);
  on('#d-cert', () => abrirCertificado()); on('#d-pass', () => abrirPassaporte());
  $$('.transp').forEach(b => b.onclick = () => { modoEscolhido = b.dataset.modo; renderDestaque(); });
}
function renderGrelha() {
  $('#grelha').innerHTML = PARAGENS.map((p, i) => {
    const st = E.cid[p.id] || {}, ok = acessivel(i);
    const estado = st.carimbo ? 'Carimbado · rever' : i === E.atual ? 'Estás aqui · explorar' : ok ? 'Explorar' : 'Ainda por chegar';
    return `<button type="button" class="cid ${ok ? '' : 'bloq'}" data-i="${i}" ${ok ? '' : 'aria-disabled="true"'}>
      <div class="ilus">${postal(p.id)}<span class="etiqueta">${esc(p.pais)}</span><span class="num">${String(i + 1).padStart(2, '0')}</span>${st.carimbo ? `<span class="mini-carimbo">${carimbo(p, i, { data: st.carimbo })}</span>` : ''}</div>
      <div class="cid-corpo"><span class="eyebrow">${esc(p.titulo)}</span><h3>${esc(p.cidade)}</h3><p>${esc(RESUMOS[p.id])}</p></div>
      <div class="cid-pe"><span>${estado}</span>${ok ? '<span aria-hidden="true">↗</span>' : ICONE.cadeado}</div></button>`;
  }).join('');
  $$('#grelha .cid').forEach(b => b.onclick = () => abrirCidade(+b.dataset.i));
}
function renderTudo() {
  const n = carimbados(E);
  $('#contador').textContent = `${n}/${N}`; $('#chip-carimbos').textContent = n;
  const p = PARAGENS[E.atual], prox = PARAGENS[E.atual + 1];
  $('#faixa-txt').textContent = n === N ? `Viagem concluída, ${E.nome.split(' ')[0]}! Tens os 13 carimbos.` : `Olá, ${E.nome.split(' ')[0]}. Estás em ${p.cidade}${prox ? ` · próxima paragem: ${prox.cidade}` : ''} · nível ${NIVEIS[E.nivel].nome}`;
  renderDestaque(); renderGrelha(); aplicarVB();
}

/* ---------- Viagem ---------- */
function partir() {
  const de = PARAGENS[E.atual], para = PARAGENS[E.atual + 1]; if (!para) return;
  const est = estimativa(de.id, para.id, modoEscolhido), modo = modoEscolhido;
  $('#d-partir').disabled = true;
  document.getElementById('principal').scrollIntoView({ behavior: reduzMov ? 'auto' : 'smooth', block: 'start' });
  const a = MAPA.cidades[de.id], b = MAPA.cidades[para.id];
  const minX = Math.min(a[0], b[0]), minY = Math.min(a[1], b[1]), w = Math.max(Math.abs(a[0] - b[0]), 120) * 1.8, h = Math.max(Math.abs(a[1] - b[1]), 100) * 1.8;
  irPara({ x: minX + Math.abs(a[0] - b[0]) / 2 - w / 2, y: minY + Math.abs(a[1] - b[1]) / 2 - h / 2, w, h }, 700);
  setTimeout(() => animarViagem(de.id, para.id, modo, () => {
    E.pernas.push({ de: de.id, para: para.id, modo, km: Math.round(est.km), co2: Math.round(est.co2), h: est.h, data: Date.now() });
    E.atual++; guardar(); renderTudo(); mostrarViagem(E.pernas[E.pernas.length - 1]);
  }), reduzMov ? 0 : 750);
}
function mostrarViagem(pr) {
  const d = $('#dlg-viagem'), para = PARAGENS[IDX[pr.para]], info = PERNAS[pr.de + '-' + pr.para] || { paises: [], facto: '' };
  const aviao = estimativa(pr.de, pr.para, 'aviao'), poupou = pr.modo === 'comboio' && aviao.km >= 350 ? Math.round(aviao.co2 - pr.co2) : 0;
  const passaFora = false;
  d.innerHTML = `<div class="dlg-corpo">
    <div class="dlg-cab"><div><span class="eyebrow">Diário de viagem · ${pr.modo === 'comboio' ? 'de comboio' : 'de avião'}</span><h2 id="dv-titulo">Chegaste a ${esc(para.cidade)}</h2></div>${btnFechar}</div>
    <div class="viagem-dados"><div><b>${fmt(pr.km)}</b><span>km</span></div><div><b>${horas(pr.h)}</b><span>${pr.modo === 'aviao' ? 'incluindo aeroporto' : 'de viagem'}</span></div><div><b>${fmt(pr.co2)}</b><span>kg de CO₂ (estimativa)</span></div><div><b>${info.paises.length}</b><span>${info.paises.length === 1 ? 'país' : 'países'} atravessados</span></div></div>
    <div class="secao"><h3>Fronteiras</h3><div class="fronteiras">${info.paises.map((p, i) => `${i ? '<span class="seta">→</span>' : ''}<span class="pais-chip">${esc(p)}</span>`).join('')}</div>
      <p style="margin:0">${info.paises.length > 1 ? 'Passaste fronteiras dentro do espaço Schengen sem controlo sistemático de documentos. Mesmo assim, leva sempre um documento de identificação.' : 'Viagem dentro do mesmo país.'}${poupou > 0 ? ` Ao escolher o comboio, emitiste cerca de <b>${fmt(poupou)} kg de CO₂ a menos</b> do que de avião.` : ''}</p></div>
    ${info.facto ? `<div class="nota"><b>Sabias que…</b> ${esc(info.facto)}</div>` : ''}
    <div class="acoes"><button class="primario" type="button" id="dv-ok">Explorar ${esc(para.cidade)} <span aria-hidden="true">↗</span></button></div></div>`;
  abrir(d); $('#dv-ok').onclick = () => { fechar(d); abrirCidade(E.atual); };
}

/* ---------- Cidade ---------- */
let cidadeAtual = null, passoAtual = 'conhecer';
function abrirCidade(i) {
  if (!acessivel(i)) { toast(`Ainda não chegaste a ${PARAGENS[i].cidade}. Segue a viagem pela ordem do mapa.`); return; }
  cidadeAtual = i; const st = c(PARAGENS[i].id);
  passoAtual = st.carimbo ? 'carimbo' : !st.visto ? 'conhecer' : st.quizMelhor < 2 ? 'quiz' : !st.desafioOk ? 'desafio' : 'carimbo';
  renderCidade(); abrir($('#dlg-cidade'));
}
function renderCidade() {
  const p = PARAGENS[cidadeAtual], st = c(p.id), d = $('#dlg-cidade');
  const podeCarimbo = st.quizMelhor >= 2 && st.desafioOk;
  const passos = [['conhecer', 'Conhecer', st.visto], ['quiz', 'Quiz', st.quizMelhor >= 2], ['desafio', 'Desafio', st.desafioOk], ['carimbo', 'Carimbo', !!st.carimbo]];
  d.innerHTML = `<div class="postal">${postal(p.id)}<span class="etiqueta">${esc(p.pais)} · paragem ${cidadeAtual + 1} de ${N}</span>${btnFechar}</div>
    <div class="dlg-corpo">
      <div class="cidade-cab"><span class="eyebrow">${esc(p.titulo)}</span><h2 id="dc-titulo">${esc(p.cidade)}</h2></div>
      <div class="passos" role="tablist" aria-label="Etapas da cidade">${passos.map(([k, t, ok], j) =>
        `<button type="button" role="tab" data-passo="${k}" aria-selected="${passoAtual === k}" class="${ok ? 'feito' : ''}" ${k === 'carimbo' && !podeCarimbo && !st.carimbo ? 'disabled title="Completa o quiz e o desafio"' : ''}><span class="n">${ok ? '✓' : j + 1}</span>${t}</button>`).join('')}</div>
      <div id="passo-corpo"></div>
    </div>`;
  $$('.passos button', d).forEach(b => b.onclick = () => { passoAtual = b.dataset.passo; pararVoz(); renderCidade(); });
  ({ conhecer: passoConhecer, quiz: passoQuiz, desafio: passoDesafio, carimbo: passoCarimbo })[passoAtual](p, st, $('#passo-corpo'));
}
function irPasso(k) { passoAtual = k; renderCidade(); $('#dlg-cidade').scrollTop = 0; }

function passoConhecer(p, st, el) {
  const ex = EXPRESSOES[p.id], lig = LIGACOES[p.id] || [];
  el.innerHTML = `<div class="secao">
    <div class="fala">${avatar(p.guia)}<div class="balao"><div class="quem"><span><b>${esc(p.guia.nome)}</b> <small>· ${esc(p.guia.papel)}</small></span>${temVoz ? `<button type="button" class="som-btn" id="ouvir-guia">${ICONE.som}Ouvir</button>` : ''}</div><p>${esc(p.guia.fala)}</p></div></div>
  </div>
  <div class="secao"><h3>Onde estamos: ${esc(p.onde)}</h3><div class="grelha2">${p.instituicoes.map(x => `<div class="inst"><b>${esc(x.nome)}</b><p>${esc(x.funcao)}</p><small>◎ ${esc(x.local)}</small></div>`).join('')}</div></div>
  <div class="dupla">
    <div class="secao"><h3>Linha do tempo</h3><ol class="cronologia">${p.historia.map(([a, t]) => `<li><b>${a}</b><span>${esc(t)}</span></li>`).join('')}</ol></div>
    <div class="secao"><h3>Sabias que…</h3><ul class="factos">${p.factos.slice(0, E.nivel === 1 ? 2 : 3).map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
  </div>
  <div class="secao"><h3>Fala como um local · ${esc(ex.lingua)}</h3>
    <div class="expressoes">${ex.lista.map(([t, s, l], j) => `<div class="expr"><div><b lang="${l || ex.lang}">${esc(t)}</b><small>${esc(s)}</small></div>${temVoz ? `<button type="button" data-j="${j}" aria-label="Ouvir ${esc(t)}">${ICONE.som}</button>` : ''}</div>`).join('')}</div>
    ${ex.nota ? `<div class="nota">${esc(ex.nota)}</div>` : ''}</div>
  <div class="secao"><h3>Ver e saber mais</h3><div class="lista-ligacoes">${lig.map(ligacaoHTML).join('')}</div></div>
  <div class="acoes"><button class="primario" type="button" id="ir-quiz">Ir para o quiz <span aria-hidden="true">→</span></button></div>`;
  if (!st.visto) { st.visto = true; guardar(); renderDestaque(); $$('.passos button', $('#dlg-cidade'))[0].classList.add('feito'); }
  const og = $('#ouvir-guia'); if (og) og.onclick = () => falar(p.guia.fala, 'pt-PT');
  $$('.expr button', el).forEach(b => b.onclick = () => { const [t, , l] = ex.lista[+b.dataset.j]; falar(t.replace(/[«»]/g, ''), l || ex.lang); marcarOuvida(LINGUA_DE[(l || ex.lang).split('-')[0]] || ex.lingua); });
  $('#ir-quiz').onclick = () => irPasso('quiz');
}
const LINGUA_DE = Object.fromEntries(OLA_24.map(([n, , l]) => [l.split('-')[0], n]));
function ligacaoHTML(x) { return `<a href="${x.u}" target="_blank" rel="noopener"><span class="ico">${x.v ? ICONE.video : ICONE.ligacao}</span><span><b>${esc(x.t)}</b><small>${x.v ? 'Vídeo curto · ' : ''}${esc(x.f)}</small></span></a>`; }

function perguntas(p) {
  const q = p.quiz, x = QUIZ_EXTRA[p.id];
  return E.nivel === 1 ? [x.f, q[0], q[1]] : E.nivel === 3 ? [q[1], q[2], x.d] : q;
}
function passoQuiz(p, st, el) {
  const qs = perguntas(p);
  el.innerHTML = `<p class="muted" style="margin:0">Responde às três perguntas. Precisas de pelo menos 2 certas. Podes tentar as vezes que quiseres.${st.quizTent ? ` Melhor resultado: <b>${st.quizMelhor}/3</b>.` : ''}</p>
    <form id="f-quiz" class="secao">${qs.map((q, i) => `<fieldset class="pergunta"><legend>${i + 1}. ${esc(q.p)}</legend><div class="opcoes">${q.o.map((o, j) =>
      `<label class="opcao"><input type="radio" name="q${i}" value="${j}" id="q${i}o${j}"><span>${esc(o)}</span></label>`).join('')}</div><div class="fb" id="fb${i}"></div></fieldset>`).join('')}
      <div class="acoes"><button class="primario" type="submit">Verificar respostas</button><button class="secundario" type="button" id="q-ajuda">${ICONE.ajuda} Pedir ajuda a ${esc(p.guia.nome.replace('Professora ', ''))}</button></div>
    </form><div id="q-res"></div>`;
  let ajudou = false;
  $('#q-ajuda').onclick = () => {
    if (ajudou) return; ajudou = true; st.quizAjudas++; guardar();
    qs.forEach((q, i) => { const errs = q.o.map((_, j) => j).filter(j => j !== q.c); const j = errs[(i + p.id.length) % errs.length];
      const lab = $(`#q${i}o${j}`).closest('.opcao'); lab.classList.add('riscada'); $(`#q${i}o${j}`).disabled = true; });
    $('#q-ajuda').disabled = true; toast('Foi eliminada uma opção errada em cada pergunta.');
  };
  $('#f-quiz').onsubmit = e => {
    e.preventDefault();
    const resp = qs.map((_, i) => { const r = $(`input[name="q${i}"]:checked`); return r ? +r.value : null; });
    if (resp.some(r => r === null)) { toast('Responde às três perguntas antes de verificar.'); return; }
    let certas = 0;
    qs.forEach((q, i) => {
      const ok = resp[i] === q.c; if (ok) certas++;
      $$(`input[name="q${i}"]`).forEach(inp => { inp.disabled = true; const lab = inp.closest('.opcao');
        if (+inp.value === q.c && ok) lab.classList.add('certa'); else if (+inp.value === resp[i] && !ok) lab.classList.add('errada'); });
      $(`#fb${i}`).innerHTML = ok ? `<div class="feedback ok">${ICONE.certo}<p>${esc(q.e)}</p></div>` : `<div class="feedback erro">${ICONE.errado}<p>Ainda não. Relê a parte «Conhecer» e tenta outra vez.</p></div>`;
    });
    st.quizTent++; st.quizMelhor = Math.max(st.quizMelhor, certas); guardar(); renderDestaque();
    const passou = certas >= 2;
    $('#q-res').innerHTML = `<div class="resultado"><b class="grande">${certas}/3</b><div><b>${passou ? 'Quiz superado!' : 'Quase lá.'}</b><div class="muted">${passou ? (certas === 3 ? 'Todas certas.' : 'Podes repetir para tentar 3 em 3.') : 'Precisas de 2 respostas certas. As explicações aparecem quando acertas.'}</div></div></div>
      <div class="acoes" style="margin-top:12px">${passou ? `<button class="primario" type="button" id="q-seg">Ir para o desafio <span aria-hidden="true">→</span></button>` : ''}<button class="secundario" type="button" id="q-rep">Tentar outra vez</button></div>`;
    $('.acoes', $('#f-quiz')).hidden = true;
    const seg = $('#q-seg'); if (seg) seg.onclick = () => irPasso('desafio');
    $('#q-rep').onclick = () => renderCidade();
    $$('.passos button', $('#dlg-cidade'))[1].classList.toggle('feito', st.quizMelhor >= 2);
    $('#q-res').scrollIntoView({ behavior: reduzMov ? 'auto' : 'smooth', block: 'nearest' });
  };
}

/* ---------- Desafios ---------- */
function passoDesafio(p, st, el) {
  const d = p.desafio;
  el.innerHTML = `<div class="secao"><div><span class="eyebrow">Desafio${st.desafioOk ? ' · superado' : ''}</span><h3 style="font-size:22px;margin-top:4px">${esc(d.titulo)}</h3><p class="muted" style="margin:4px 0 0">${esc(d.enunciado)}</p></div><div id="des-area"></div><div id="des-fb"></div>
    <div class="acoes"><button class="primario" type="button" id="des-ok">Verificar</button><button class="secundario" type="button" id="des-ajuda">${ICONE.ajuda} Pedir uma pista</button></div></div>`;
  const area = $('#des-area'), fb = $('#des-fb');
  const conc = (ok, msg) => {
    st.desafioTent++;
    if (ok) { st.desafioOk = true; fb.innerHTML = `<div class="feedback ok">${ICONE.certo}<p>${msg || 'Desafio superado!'} Agora podes carimbar o passaporte.</p></div>`;
      $('#des-ok').outerHTML = `<button class="primario" type="button" id="des-seg">Carimbar o passaporte <span aria-hidden="true">→</span></button>`; $('#des-seg').onclick = () => irPasso('carimbo');
      $$('.passos button', $('#dlg-cidade'))[2].classList.add('feito'); const bc = $$('.passos button', $('#dlg-cidade'))[3]; if (st.quizMelhor >= 2) bc.disabled = false; }
    else fb.innerHTML = `<div class="feedback erro">${ICONE.errado}<p>${msg}</p></div>`;
    guardar(); renderDestaque();
  };
  const ajuda = f => { $('#des-ajuda').onclick = () => { st.desafioAjudas++; guardar(); f(); }; };
  DESAFIOS[d.tipo](d, area, conc, ajuda, p);
}
const baralhar = (a, seed) => { const r = a.slice(); let s = seed; for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const DESAFIOS = {
  selecao(d, area, conc, ajuda) {
    area.innerHTML = `<div class="secao">${d.itens.map((it, i) => `<label class="sel-item" id="si${i}"><input type="checkbox" id="sc${i}"><span>${esc(it.t)}<small id="se${i}"></small></span></label>`).join('')}</div>`;
    const rev = new Set();
    ajuda(() => { const i = d.itens.findIndex((it, i) => !rev.has(i) && $(`#sc${i}`).checked !== it.ok); if (i < 0) { toast('Já está tudo certo. Carrega em Verificar.'); return; }
      rev.add(i); $(`#sc${i}`).checked = d.itens[i].ok; $(`#se${i}`).textContent = d.itens[i].e; toast('Uma das escolhas foi corrigida e explicada.'); });
    $('#des-ok').onclick = () => {
      let erros = 0;
      d.itens.forEach((it, i) => { const ok = $(`#sc${i}`).checked === it.ok; $(`#si${i}`).classList.toggle('errada', !ok); $(`#si${i}`).classList.toggle('certa', ok); if (ok) $(`#se${i}`).textContent = it.e; else { erros++; $(`#se${i}`).textContent = ''; } });
      conc(erros === 0, erros ? `Há ${erros} ${erros === 1 ? 'escolha que não está certa' : 'escolhas que não estão certas'}. Revê as que estão marcadas a vermelho.` : 'Mochila pronta!');
    };
  },
  associar(d, area, conc, ajuda, p) {
    const ops = d.opcoes || baralhar(d.pares.map(x => x[1]), p.id.length * 7);
    area.innerHTML = `<div class="secao">${d.pares.map(([a], i) => `<div class="par" id="pa${i}"><b id="pl${i}">${esc(a)}</b><select id="ps${i}" aria-labelledby="pl${i}"><option value="">Escolhe…</option>${ops.map(o => `<option>${esc(o)}</option>`).join('')}</select></div>`).join('')}</div>${d.nota ? `<div class="nota" id="des-nota" hidden>${esc(d.nota)}</div>` : ''}`;
    ajuda(() => { const i = d.pares.findIndex(([, b], i) => $(`#ps${i}`).value !== b); if (i < 0) { toast('Já está tudo certo. Carrega em Verificar.'); return; } $(`#ps${i}`).value = d.pares[i][1]; $(`#pa${i}`).classList.add('certa'); toast('Uma associação foi preenchida.'); });
    $('#des-ok').onclick = () => {
      let erros = 0; d.pares.forEach(([, b], i) => { const ok = $(`#ps${i}`).value === b; if (!ok) erros++; $(`#pa${i}`).classList.toggle('certa', ok); $(`#pa${i}`).classList.toggle('errada', !ok); });
      const n = $('#des-nota'); if (n && !erros) n.hidden = false;
      conc(!erros, erros ? `${erros} ${erros === 1 ? 'associação ainda não está certa' : 'associações ainda não estão certas'}.` : 'Todas as associações estão certas!');
    };
  },
  ordenar(d, area, conc, ajuda, p) {
    let ordem = baralhar(d.passos.map((_, i) => i), p.id.length * 13 + 5); if (ordem.every((v, i) => v === i)) ordem.reverse();
    const fixos = new Set();
    const desenhar = () => {
      area.innerHTML = `<ol class="ordem">${ordem.map((k, pos) => `<li class="${fixos.has(pos) ? 'fixa certa' : ''}"><span class="n">${pos + 1}</span><span>${esc(d.passos[k])}</span><span class="setas"><button type="button" data-m="-1" data-pos="${pos}" aria-label="Subir" ${pos === 0 ? 'disabled' : ''}>↑</button><button type="button" data-m="1" data-pos="${pos}" aria-label="Descer" ${pos === ordem.length - 1 ? 'disabled' : ''}>↓</button></span></li>`).join('')}</ol>`;
      $$('.setas button', area).forEach(b => b.onclick = () => { const i = +b.dataset.pos, j = i + +b.dataset.m; [ordem[i], ordem[j]] = [ordem[j], ordem[i]]; fixos.clear(); desenhar(); $$('.setas button', area)[j * 2 + (+b.dataset.m > 0 ? 1 : 0)]?.focus(); });
    };
    desenhar();
    ajuda(() => { const pos = ordem.findIndex((k, i) => k !== i); if (pos < 0) { toast('A ordem já está certa. Carrega em Verificar.'); return; } const de = ordem.indexOf(pos); [ordem[pos], ordem[de]] = [ordem[de], ordem[pos]]; fixos.add(pos); desenhar(); toast(`O passo ${pos + 1} foi colocado no lugar certo.`); });
    $('#des-ok').onclick = () => {
      const certos = ordem.filter((k, i) => k === i).length;
      $$('.ordem li', area).forEach((li, i) => { li.classList.toggle('certa', ordem[i] === i); li.classList.toggle('errada', ordem[i] !== i); });
      conc(certos === ordem.length, `${certos} de ${ordem.length} estão na posição certa. Usa as setas para trocar os que estão a vermelho.`);
    };
  },
  mapa(d, area, conc, ajuda) {
    const [vx, vy, vw, vh] = d.vista, sel = new Set();
    const micro = ['442', '438', '470'];
    let s = `<svg viewBox="${vx} ${vy} ${vw} ${vh}" role="img" aria-label="Mapa para selecionar países">`;
    MAPA.paises.forEach(p => { s += `<path class="pais" data-id="${p.id}" d="${p.d}" style="fill:${PAISES_UE[p.id] ? 'var(--mapa-ue)' : 'var(--mapa-terra)'}"/>`; });
    micro.forEach(id => { const pp = PAIS_PATH[id]; if (!pp) return; const n = pp.d.match(/-?\d+\.?\d*/g).map(Number); let sx = 0, sy = 0, k = 0; for (let i = 0; i < n.length; i += 2) { sx += n[i]; sy += n[i + 1]; k++; }
      s += `<circle class="pais micro" data-id="${id}" cx="${(sx / k).toFixed(1)}" cy="${(sy / k).toFixed(1)}" r="${vw / 90}" style="fill:var(--mapa-ue)" stroke="#2459A2" stroke-width="${vw / 600}"/>`; });
    s += '</svg>';
    area.innerHTML = `<div class="minimapa">${s}</div><p class="muted" style="margin:8px 0 0">Selecionados: <b id="m-sel">nenhum</b>. Os países muito pequenos aparecem como um círculo.</p>`;
    const nome = id => (PAISES_UE[id] || {}).n || SCHENGEN_EXTRA[id] || NOMES_PT[id] || (PAIS_PATH[id] || {}).n || id;
    const atualizar = () => { $$('.minimapa .pais', area).forEach(el => { el.classList.toggle('alvo-sel', sel.has(el.dataset.id)); el.classList.remove('alvo-certo', 'alvo-errado'); });
      $('#m-sel').textContent = sel.size ? [...sel].map(nome).join(', ') : 'nenhum'; };
    $$('.minimapa .pais', area).forEach(el => el.addEventListener('click', () => { const id = el.dataset.id; sel.has(id) ? sel.delete(id) : sel.add(id); atualizar(); }));
    ajuda(() => { const falta = d.alvo.find(id => !sel.has(id)); const errado = [...sel].find(id => !d.alvo.includes(id));
      if (errado) { sel.delete(errado); atualizar(); toast(`${nome(errado)} não faz parte da resposta. Foi retirado.`); }
      else if (falta) { sel.add(falta); atualizar(); toast(`${nome(falta)} foi selecionado.`); } else toast('Já está tudo certo. Carrega em Verificar.'); });
    $('#des-ok').onclick = () => {
      const certos = [...sel].filter(id => d.alvo.includes(id)).length, errados = [...sel].filter(id => !d.alvo.includes(id));
      $$('.minimapa .pais', area).forEach(el => { const id = el.dataset.id; if (sel.has(id)) el.classList.add(d.alvo.includes(id) ? 'alvo-certo' : 'alvo-errado'); });
      const ok = certos === d.alvo.length && !errados.length;
      conc(ok, ok ? 'Encontraste todos!' : `Tens ${certos} de ${d.alvo.length} certos${errados.length ? ` e ${errados.length} a mais (${errados.map(nome).join(', ')})` : ''}.`);
    };
  },
  bandeira(d, area, conc, ajuda) {
    area.innerHTML = `<div class="bandeira-wrap"><svg viewBox="0 0 300 200" id="band" role="img" aria-label="Pré-visualização da bandeira"></svg>
      <div class="controlos">
        <div class="campo"><label for="b-num">Número de estrelas: <b id="b-numv">8</b></label><input type="range" id="b-num" min="6" max="15" value="8"></div>
        <div class="campo"><label for="b-disp">Disposição</label><select id="b-disp"><option value="linha">Em linha</option><option value="grelha">Em grelha</option><option value="circulo">Em círculo</option></select></div>
        <div class="campo"><label for="b-cor">Cor das estrelas</label><select id="b-cor"><option value="#FFFFFF">Brancas</option><option value="#FFCC00">Douradas</option><option value="#C8102E">Vermelhas</option></select></div>
        <div class="campo"><label for="b-fundo">Cor do fundo</label><select id="b-fundo"><option value="#1E7A3E">Verde</option><option value="#003399">Azul</option><option value="#FFFFFF">Branco</option></select></div>
      </div></div>`;
    const desenhar = () => {
      const n = +$('#b-num').value, disp = $('#b-disp').value, cr = $('#b-cor').value, fu = $('#b-fundo').value; $('#b-numv').textContent = n;
      let s = `<rect width="300" height="200" fill="${fu}" stroke="#DFE7F1"/>`;
      for (let i = 0; i < n; i++) {
        let x, y;
        if (disp === 'circulo') { const a = i * 2 * Math.PI / n; x = 150 + 66 * Math.sin(a); y = 100 - 66 * Math.cos(a); }
        else if (disp === 'linha') { x = 20 + (260 / (n - 1)) * i; y = 100; }
        else { const cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n / cols); x = 150 + (i % cols - (cols - 1) / 2) * 40; y = 100 + (Math.floor(i / cols) - (rows - 1) / 2) * 40; }
        s += `<path d="${estrela(x, y, 12)}" fill="${cr}"/>`;
      }
      $('#band').innerHTML = s;
    };
    ['#b-num', '#b-disp', '#b-cor', '#b-fundo'].forEach(id => $(id).addEventListener('input', desenhar)); desenhar();
    const dicas = ['O número de estrelas é o mesmo das horas num relógio.', 'As estrelas estão dispostas como os números de um relógio.', 'Estrelas douradas sobre fundo azul.'];
    let k = 0; ajuda(() => { toast(dicas[Math.min(k++, 2)]); });
    $('#des-ok').onclick = () => {
      const erros = []; if (+$('#b-num').value !== 12) erros.push('o número de estrelas'); if ($('#b-disp').value !== 'circulo') erros.push('a disposição');
      if ($('#b-cor').value !== '#FFCC00') erros.push('a cor das estrelas'); if ($('#b-fundo').value !== '#003399') erros.push('a cor do fundo');
      conc(!erros.length, erros.length ? `Ainda falta acertar ${erros.join(', ')}.` : 'É a bandeira da União Europeia: 12 estrelas douradas em círculo sobre fundo azul.');
    };
  }
};

/* ---------- Carimbo ---------- */
function passoCarimbo(p, st, el) {
  if (!(st.quizMelhor >= 2 && st.desafioOk)) { el.innerHTML = `<p>Completa primeiro o quiz e o desafio.</p>`; return; }
  const i = cidadeAtual, min = E.nivel === 1 ? 20 : 40;
  if (st.carimbo) {
    const prox = PARAGENS[i + 1];
    el.innerHTML = `<div class="dupla"><div class="carimbo-grande">${carimbo(p, i, { data: st.carimbo, modo: (E.pernas.find(x => x.para === p.id) || {}).modo })}</div>
      <div class="secao"><span class="eyebrow">O teu diário de bordo</span><p style="margin:0;font-style:italic">«${esc(st.diario)}»</p>
      <div class="acoes">${i === E.atual && prox ? `<button class="primario" type="button" id="cb-seg">Escolher transporte para ${esc(prox.cidade)} <span aria-hidden="true">→</span></button>` : ''}${carimbados(E) === N ? `<button class="primario" type="button" id="cb-cert">Ver o certificado</button>` : ''}<button class="secundario" type="button" id="cb-pass">Abrir o passaporte</button></div></div></div>`;
    const s = $('#cb-seg'); if (s) s.onclick = () => { fechar($('#dlg-cidade')); $('#destaque').scrollIntoView({ behavior: reduzMov ? 'auto' : 'smooth', block: 'center' }); };
    const ce = $('#cb-cert'); if (ce) ce.onclick = () => { fechar($('#dlg-cidade')); abrirCertificado(); };
    $('#cb-pass').onclick = () => { fechar($('#dlg-cidade')); abrirPassaporte(); };
    return;
  }
  el.innerHTML = `<div class="secao diario"><span class="eyebrow">Diário de bordo</span><label for="diario" style="font:700 18px var(--f-titulo);color:var(--titulo)">O que aprendeste em ${esc(p.cidade)}? Escreve com as tuas palavras.</label>
    <textarea id="diario" maxlength="600" placeholder="Por exemplo: aprendi que…">${esc(st.diario)}</textarea><small class="muted" id="d-cont"></small>
    <div class="acoes"><button class="primario" type="button" id="carimbar" disabled>Carimbar o passaporte</button></div></div>`;
  const ta = $('#diario'), bt = $('#carimbar');
  const at = () => { const n = ta.value.trim().length; bt.disabled = n < min; $('#d-cont').textContent = n < min ? `Faltam ${min - n} caracteres (mínimo ${min}).` : 'Pronto para carimbar.'; st.diario = ta.value; guardar(); };
  ta.addEventListener('input', at); at();
  bt.onclick = () => {
    st.diario = ta.value.trim(); st.carimbo = Date.now(); guardar();
    renderCidade();
    const cg = $('.carimbo-grande .carimbo'); if (cg) cg.classList.add('carimbar');
    renderTudo();
    toast(`Carimbo de ${p.cidade} no passaporte!`);
    if (carimbados(E) === N) setTimeout(() => toast('Completaste a viagem! O certificado está pronto.'), 1500);
  };
}

/* ---------- Distinções ---------- */
function distincoes(st) {
  const n = carimbados(st), comb = st.pernas.filter(x => x.modo === 'comboio').length;
  const quizTodos = PARAGENS.every(p => st.cid[p.id] && st.cid[p.id].quizMelhor === 3);
  const diarios = PARAGENS.filter(p => st.cid[p.id] && (st.cid[p.id].diario || '').trim().length >= 80).length;
  return [
    ['Viajante europeu', 'Carimbar as 13 cidades.', n === N, `${n}/${N}`],
    ['Ecoviajante', 'Fazer pelo menos 9 das 12 viagens de comboio.', comb >= 9, `${comb}/12`],
    ['Poliglota', 'Ouvir expressões ou saudações em 10 línguas.', st.ouvidas.length >= 10, `${st.ouvidas.length}/10`],
    ['Maestro', 'Ouvir o hino europeu até ao fim.', !!st.hino, st.hino ? '✓' : '—'],
    ['Mestre do quiz', 'Acertar 3 em 3 em todas as cidades.', quizTodos, `${PARAGENS.filter(p => st.cid[p.id] && st.cid[p.id].quizMelhor === 3).length}/${N}`],
    ['Repórter', 'Escrever pelo menos 80 caracteres no diário em 8 cidades.', diarios >= 8, `${diarios}/8`]
  ];
}
const MEDALHA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 16.8 6.1 20.1l1.3-6.6L2.5 8.9l6.6-.8z"/></svg>';

/* ---------- Passaporte ---------- */
function mrz(st) {
  const nome = (st.nome || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z ]/g, '').trim().split(/\s+/);
  const l1 = ('P<EUR' + (nome.slice(-1)[0] || '') + '<<' + nome.slice(0, -1).join('<')).padEnd(44, '<').slice(0, 44);
  const l2 = ('CLUBEUE' + String(carimbados(st)).padStart(2, '0') + '<' + new Date(st.inicio).toISOString().slice(2, 10).replace(/-/g, '') + '<NIVEL' + st.nivel).padEnd(44, '<').slice(0, 44);
  return l1 + '\n' + l2;
}
function passaporteHTML(st, soLeitura) {
  const n = carimbados(st), modoDe = id => (st.pernas.find(x => x.para === id) || {}).modo;
  return `<div class="passaporte">
    <div class="capa"><span class="t1">UNIÃO EUROPEIA</span><svg viewBox="0 0 120 120" aria-hidden="true">${estrelasSVG(60, 60, 42, 7, '#E9D28A')}<text x="60" y="66" text-anchor="middle" font-family="Manrope" font-weight="800" font-size="16" fill="#E9D28A">${n}/${N}</text></svg><span class="t2">Passaporte do<br>Clube Europeu</span><span class="t1" style="font-size:9px">O CLUBE EUROPEU FOI CONHECER A UE…</span></div>
    <div class="dados"><dl><div><dt>Viajante</dt><dd>${esc(st.nome)}</dd></div><div><dt>Turma</dt><dd>${esc(st.turma) || '—'}</dd></div><div><dt>Escola</dt><dd>${esc(st.escola) || '—'}</dd></div>
      <div><dt>Nível</dt><dd>${NIVEIS[st.nivel].nome} · ${NIVEIS[st.nivel].publico}</dd></div><div><dt>Partida</dt><dd>${new Date(st.inicio).toLocaleDateString('pt-PT')}</dd></div><div><dt>Carimbos</dt><dd>${n} de ${N}</dd></div></dl>
      <div class="mrz" aria-label="Linha de leitura do passaporte">${esc(mrz(st))}</div>
      <p class="muted" style="margin:0;font-size:13px">Passaporte pedagógico. Não é um documento de viagem.</p></div>
  </div>
  <div class="secao"><h3>Carimbos</h3><div class="paginas">${PARAGENS.map((p, i) => { const s = st.cid[p.id];
    return `<div class="vaga">${s && s.carimbo ? carimbo(p, i, { data: s.carimbo, modo: modoDe(p.id) }) : `<div><span class="sigla">${String(i + 1).padStart(2, '0')}</span>${esc(p.cidade.split(' ')[0])}</div>`}</div>`; }).join('')}</div></div>
  <div class="secao"><h3>Distinções</h3><div class="distincoes">${distincoes(st).map(([t, dsc, ok, v]) => `<div class="dist ${ok ? 'ganha' : ''}"><span class="med">${MEDALHA}</span><div><b>${t}</b> <span class="muted mono" style="font-size:12px">${v}</span><small>${dsc}</small></div></div>`).join('')}</div></div>`;
}
function abrirPassaporte() {
  const d = $('#dlg-passaporte'), cod = codigoDe(E);
  d.innerHTML = `<div class="dlg-corpo"><div class="dlg-cab"><div><span class="eyebrow">O registo da tua viagem</span><h2 id="dp-titulo">O teu passaporte europeu</h2></div>${btnFechar}</div>
    ${passaporteHTML(E)}
    <div class="secao"><h3>Código de progresso</h3><p class="muted" style="margin:0">Copia este código para continuar noutro computador ou para entregar ao professor.</p>
      <textarea class="codigo" id="p-cod" readonly aria-label="Código de progresso">${cod}</textarea>
      <div class="acoes"><button class="primario" type="button" id="p-copiar">Copiar código</button>${carimbados(E) === N ? '<button class="secundario" type="button" id="p-cert">Ver o certificado</button>' : ''}</div></div></div>`;
  abrir(d);
  $('#p-copiar').onclick = () => copiar($('#p-cod'));
  const pc = $('#p-cert'); if (pc) pc.onclick = () => { fechar(d); abrirCertificado(); };
}
function copiar(ta) {
  const t = ta.value;
  const falha = () => { ta.focus(); ta.select(); toast('Seleciona o código e copia-o com Ctrl+C.'); };
  try { navigator.clipboard.writeText(t).then(() => toast('Código copiado.'), falha); } catch (e) { falha(); }
}

/* ---------- Certificado ---------- */
function abrirCertificado(st = E) {
  const d = $('#dlg-cert'), ultima = Math.max(...PARAGENS.map(p => (st.cid[p.id] || {}).carimbo || 0));
  const kmT = st.pernas.reduce((a, b) => a + b.km, 0), comb = st.pernas.filter(x => x.modo === 'comboio').length;
  d.innerHTML = `<div class="dlg-corpo"><div class="dlg-cab"><div><span class="eyebrow">Certificado digital</span><h2 id="dce-titulo" style="font-size:20px">Para guardar, faz uma captura de ecrã ou entrega o código ao professor.</h2></div>${btnFechar}</div>
    <div class="certificado">
      <svg viewBox="0 0 120 80" width="90" aria-hidden="true"><rect width="120" height="80" rx="6" fill="#003399"/>${estrelasSVG(60, 40, 24, 4.6, '#FFCC00')}</svg>
      <span class="eyebrow">O Clube Europeu foi conhecer a UE…</span>
      <div class="c-titulo">Certificado de Viajante Europeu</div>
      <p>Certifica-se que</p><div class="c-nome">${esc(st.nome)}</div>
      <p>${st.turma ? `da turma ${esc(st.turma)}` : ''}${st.escola ? `${st.turma ? ', ' : ''}${esc(st.escola)},` : ''} completou a viagem do Clube Europeu por 13 cidades da União Europeia, no nível ${NIVEIS[st.nivel].nome}, conhecendo as suas instituições, a sua história e as suas línguas. Percorreu ${fmt(kmT)} km, ${comb} ${comb === 1 ? 'viagem' : 'viagens'} de comboio.</p>
      <div class="c-carimbos">${PARAGENS.map((p, i) => carimbo(p, i, { data: (st.cid[p.id] || {}).carimbo })).join('')}</div>
      <p class="mono">Emitido a ${new Date(ultima || Date.now()).toLocaleDateString('pt-PT')} · Verificação ${hash(JSON.stringify(st)).toUpperCase()}</p>
      <img src="${$('.escola img').src}" alt="Agrupamento de Escolas de São Pedro da Cova">
    </div></div>`;
  abrir(d);
}

/* ---------- Recursos: hino, línguas, ligações ---------- */
function abrirRecursos(aba = 'hino') {
  const d = $('#dlg-recursos');
  d.innerHTML = `<div class="dlg-corpo"><div class="dlg-cab"><div><span class="eyebrow">Ouvir e ver a Europa</span><h2 id="dr-titulo">Hino, línguas e vídeos</h2></div>${btnFechar}</div>
    <div class="abas" role="tablist">${[['hino', 'Hino europeu'], ['linguas', '24 línguas'], ['ligacoes', 'Vídeos e fontes']].map(([k, t]) => `<button type="button" role="tab" data-aba="${k}" aria-selected="${k === aba}">${t}</button>`).join('')}</div>
    <div id="aba-corpo"></div></div>`;
  $$('.abas button', d).forEach(b => b.onclick = () => { pararHino(); abrirRecursos(b.dataset.aba); });
  const corpo = $('#aba-corpo');
  if (aba === 'hino') {
    corpo.innerHTML = `<div class="hino"><svg viewBox="0 0 170 170" class="hino-est" aria-hidden="true"><rect width="170" height="170" rx="20" fill="#2459A2"/>${estrelasSVG(85, 85, 52, 9, '#DFBD54')}</svg>
      <div class="secao"><h3 style="font-size:22px">«Ode à Alegria»</h3>
        <p style="margin:0">O hino da União Europeia é a melodia do último andamento da 9.ª Sinfonia de Ludwig van Beethoven, composta em 1823. Foi adotado como hino da Europa pelo Conselho da Europa em 1972 e pelos líderes da UE em 1985.</p>
        <p style="margin:0">Não tem letra oficial: usa a linguagem universal da música para exprimir os ideais de liberdade, paz e solidariedade. Não substitui os hinos nacionais. É tocado em cerimónias oficiais e no Dia da Europa, a 9 de maio.</p>
        <div class="acoes"><button class="primario" type="button" id="b-hino">${ICONE.play} Tocar o hino</button><a class="ligacao" href="https://european-union.europa.eu/principles-countries-history/symbols/european-anthem_pt" target="_blank" rel="noopener">Ouvir a versão oficial ↗</a></div>
        <p class="muted" style="margin:0;font-size:13px">Versão simplificada da melodia, tocada pelo navegador.</p></div></div>`;
    $('#b-hino').onclick = tocarHino;
  } else if (aba === 'linguas') {
    corpo.innerHTML = `<div class="secao"><p style="margin:0">A UE tem <b>24 línguas oficiais</b>. Todos os cidadãos podem escrever às instituições e receber resposta na sua língua, e as leis são publicadas em todas elas. ${temVoz ? 'Carrega numa saudação para a ouvires.' : ''}</p>
      <div class="ola">${OLA_24.map(([n, o, l], i) => `<button type="button" data-i="${i}" class="${E && E.ouvidas.includes(n) ? 'ouvida' : ''}"><b lang="${l}">${esc(o)}</b><small>${n}</small></button>`).join('')}</div>
      <div class="nota">Línguas ouvidas: <b id="n-ouv">${E ? E.ouvidas.length : 0}</b>. Ouve 10 para ganhares a distinção Poliglota.</div></div>`;
    $$('.ola button', corpo).forEach(b => b.onclick = () => { const [n, o, l] = OLA_24[+b.dataset.i]; falar(o.replace(/\s*\(.*\)/, ''), l); marcarOuvida(n); b.classList.add('ouvida'); $('#n-ouv').textContent = E.ouvidas.length; });
  } else {
    corpo.innerHTML = `<div class="secao"><h3>Para toda a viagem</h3><div class="lista-ligacoes">${LIGACOES_GERAIS.map(ligacaoHTML).join('')}</div></div>
      <div class="secao"><h3>Vídeos curtos oficiais</h3><div class="lista-ligacoes">${[...new Map(Object.values(LIGACOES).flat().filter(x => x.v).map(x => [x.u, x])).values()].map(ligacaoHTML).join('')}</div></div>
      <p class="muted" style="margin:0;font-size:14px">As ligações abrem os sítios oficiais da UE num separador novo. Alguns vídeos estão em inglês com legendas.</p>`;
  }
  abrir(d);
}

/* ---------- Professor ---------- */
function relatorioHTML(st) {
  const kmT = st.pernas.reduce((a, b) => a + b.km, 0), co2T = st.pernas.reduce((a, b) => a + b.co2, 0);
  const linhas = PARAGENS.map((p, i) => { const s = st.cid[p.id] || {}, pr = st.pernas.find(x => x.para === p.id);
    return `<tr><td class="num">${i + 1}</td><td><b>${esc(p.cidade)}</b>${pr ? `<br><small class="muted">${pr.modo === 'comboio' ? 'comboio' : 'avião'} · ${fmt(pr.km)} km</small>` : ''}</td>
      <td>${s.carimbo ? new Date(s.carimbo).toLocaleDateString('pt-PT') : '—'}</td><td class="num">${s.quizTent ? `${s.quizMelhor}/3` : '—'}</td><td class="num">${s.quizTent || 0}</td>
      <td>${s.desafioOk ? 'Superado' : s.desafioTent ? 'Em curso' : '—'}<br><small class="muted">${s.desafioTent || 0} tent.</small></td><td class="num">${(s.quizAjudas || 0) + (s.desafioAjudas || 0)}</td><td style="min-width:240px">${s.diario ? esc(s.diario) : '<span class="muted">—</span>'}</td></tr>`; }).join('');
  return `<div class="dados"><dl><div><dt>Aluno</dt><dd>${esc(st.nome)}</dd></div><div><dt>Turma</dt><dd>${esc(st.turma) || '—'}</dd></div><div><dt>Escola</dt><dd>${esc(st.escola) || '—'}</dd></div><div><dt>Nível</dt><dd>${NIVEIS[st.nivel].nome}</dd></div>
    <div><dt>Carimbos</dt><dd>${carimbados(st)}/${N}</dd></div><div><dt>Distância</dt><dd>${fmt(kmT)} km · ${fmt(co2T)} kg CO₂</dd></div><div><dt>Línguas ouvidas</dt><dd>${st.ouvidas.length}</dd></div><div><dt>Hino</dt><dd>${st.hino ? 'Ouvido' : 'Não'}</dd></div></dl>
    ${st.livre ? '<p class="nota" style="margin:0">Modo livre ativo: as cidades podem ter sido abertas fora de ordem.</p>' : ''}</div>
    <div class="tabela-wrap"><table><thead><tr><th>#</th><th>Cidade</th><th>Carimbo</th><th>Quiz</th><th>Tentativas</th><th>Desafio</th><th>Ajudas</th><th>Diário de bordo</th></tr></thead><tbody>${linhas}</tbody></table></div>
    <div class="distincoes">${distincoes(st).map(([t, , ok, v]) => `<div class="dist ${ok ? 'ganha' : ''}"><span class="med">${MEDALHA}</span><div><b>${t}</b><small>${v}</small></div></div>`).join('')}</div>`;
}
function abrirProfessor(sub = 'guia') {
  const d = $('#dlg-prof');
  d.innerHTML = `<div class="dlg-corpo"><div class="dlg-cab"><div><span class="eyebrow">Área do professor</span><h2 id="dpr-titulo">Para docentes</h2></div>${btnFechar}</div>
    <div class="abas" role="tablist">${[['guia', 'Como usar'], ['relatorio', 'Relatório deste aluno'], ['ver', 'Ver um código'], ['opcoes', 'Opções']].map(([k, t]) => `<button type="button" role="tab" data-s="${k}" aria-selected="${k === sub}">${t}</button>`).join('')}</div><div id="prof-corpo" class="secao"></div></div>`;
  $$('.abas button', d).forEach(b => b.onclick = () => abrirProfessor(b.dataset.s));
  const cp = $('#prof-corpo');
  if (sub === 'guia') {
    cp.innerHTML = `<div class="grelha2">
      <div class="inst"><b>Níveis</b><p><b>Explorador</b> (2.º ciclo): perguntas mais simples, 2 factos por cidade e diário com 20 caracteres. <b>Navegador</b> (3.º ciclo): perguntas sobre instituições e datas. <b>Embaixador</b> (secundário): tratados e funcionamento da UE. Diário com 40 caracteres.</p></div>
      <div class="inst"><b>Em cada cidade</b><p>Conhecer (guia, instituições, linha do tempo, expressões e vídeos) → Quiz (2 em 3) → Desafio → Diário de bordo → Carimbo. Não há tempo, vidas nem rankings. As ajudas ficam registadas.</p></div>
      <div class="inst"><b>Entrega</b><p>O aluno copia o código de progresso no passaporte e envia-o (por exemplo, pela plataforma da escola). Em «Ver um código» vê o relatório completo, com os diários de bordo.</p></div>
      <div class="inst"><b>Proposta de aula</b><p>5 min de contexto · 30 min de viagem em pares (3 a 4 cidades) · 10 min de partilha dos diários. A viagem completa ocupa 3 a 4 aulas.</p></div>
      <div class="inst"><b>Para discutir</b><p>Qual a diferença entre o Conselho Europeu, o Conselho da UE e o Conselho da Europa? Porque é que o comboio poupa CO₂? Que obras da UE existem perto da escola?</p></div>
      <div class="inst"><b>Voz e som</b><p>A pronúncia usa as vozes instaladas no computador. Se uma língua não tiver voz, o navegador usa uma aproximação. O hino é tocado pelo próprio navegador.</p></div></div>`;
  } else if (sub === 'relatorio') {
    cp.innerHTML = E ? relatorioHTML(E) : '<p>Ainda não há viagem iniciada neste navegador.</p>';
  } else if (sub === 'ver') {
    cp.innerHTML = `<label for="cod-in" style="font-weight:700;color:var(--titulo)">Cola o código de progresso do aluno</label><textarea class="codigo" id="cod-in" placeholder="CLUBEUE1.…"></textarea>
      <div class="acoes"><button class="primario" type="button" id="cod-ver">Ver relatório</button></div><div id="cod-res" class="secao"></div>`;
    $('#cod-ver').onclick = () => { try { const { st, valido } = lerCodigo($('#cod-in').value);
        $('#cod-res').innerHTML = (valido ? '' : '<div class="feedback erro"><p>Atenção: este código foi alterado depois de ser gerado. Os dados podem não corresponder ao trabalho do aluno.</p></div>') + relatorioHTML(st) +
          (carimbados(st) === N ? '<div class="acoes"><button class="secundario" type="button" id="cod-cert">Ver certificado deste aluno</button></div>' : '');
        const cc = $('#cod-cert'); if (cc) cc.onclick = () => abrirCertificado(st);
      } catch (e) { $('#cod-res').innerHTML = `<div class="feedback erro"><p>Não foi possível ler o código. ${esc(e.message.startsWith('O código') ? e.message : 'Confirma que foi copiado por inteiro.')}</p></div>`; } };
  } else {
    cp.innerHTML = E ? `<label class="sel-item"><input type="checkbox" id="op-livre" ${E.livre ? 'checked' : ''}><span><b>Modo livre</b><small>Permite abrir qualquer cidade fora de ordem (para demonstrações na aula). Fica registado no relatório.</small></span></label>
      <div class="campo"><label for="op-nivel">Nível do aluno</label><select id="op-nivel">${[1, 2, 3].map(n => `<option value="${n}" ${E.nivel === n ? 'selected' : ''}>${NIVEIS[n].nome} · ${NIVEIS[n].publico}</option>`).join('')}</select></div>
      <div class="secao" style="border-top:1px solid var(--linha);padding-top:16px"><b style="color:var(--titulo)">Recomeçar a viagem</b><p class="muted" style="margin:0">Apaga todo o progresso guardado neste navegador.</p>
        <div class="acoes" id="apagar-acoes"><button class="secundario" type="button" id="op-apagar">Apagar progresso…</button></div></div>` : '<p>Ainda não há viagem iniciada neste navegador.</p>';
    if (E) {
      $('#op-livre').onchange = e => { E.livre = e.target.checked; guardar(); renderTudo(); toast(E.livre ? 'Modo livre ativo.' : 'Modo livre desligado.'); };
      $('#op-nivel').onchange = e => { E.nivel = +e.target.value; guardar(); renderTudo(); toast(`Nível alterado para ${NIVEIS[E.nivel].nome}.`); };
      $('#op-apagar').onclick = () => { $('#apagar-acoes').innerHTML = `<span style="color:var(--vermelho);font-weight:600">Tens a certeza? Esta ação não pode ser desfeita.</span><button class="primario" type="button" id="op-sim" style="background:var(--vermelho);border-color:var(--vermelho)">Sim, apagar tudo</button><button class="secundario" type="button" id="op-nao">Cancelar</button>`;
        $('#op-nao').onclick = () => abrirProfessor('opcoes');
        $('#op-sim').onclick = () => { try { localStorage.removeItem(CHAVE); } catch (e) {} E = null; fechar(d); mostrarInicio(); toast('Progresso apagado.'); }; };
    }
  }
  abrir(d);
}

/* ---------- Informação: como jogar e carregar código ---------- */
function abrirComoJogar() {
  const d = $('#dlg-info');
  d.innerHTML = `<div class="dlg-corpo"><div class="dlg-cab"><div><span class="eyebrow">Guia rápido</span><h2 id="di-titulo">Como jogar</h2></div>${btnFechar}</div>
    <div class="grelha2">
      <div class="inst"><b>1 · Explora a cidade</b><p>Ouve o guia, conhece as instituições, a linha do tempo e as expressões da língua local.</p></div>
      <div class="inst"><b>2 · Responde ao quiz</b><p>Três perguntas. Com 2 certas avanças. Se precisares, pede ajuda ao guia.</p></div>
      <div class="inst"><b>3 · Supera o desafio</b><p>Mapa, associações, linha do tempo ou a bandeira. Há pistas disponíveis.</p></div>
      <div class="inst"><b>4 · Carimba e parte</b><p>Escreve no diário de bordo, recebe o carimbo e escolhe entre comboio e avião.</p></div>
    </div>
    <div class="nota">No mapa podes ver os países do euro, do espaço Schengen e o ano de adesão. Clica num país para ver a sua ficha.</div></div>`;
  abrir(d);
}
function abrirCarregar() {
  const d = $('#dlg-info');
  d.innerHTML = `<div class="dlg-corpo"><div class="dlg-cab"><div><span class="eyebrow">Continuar noutro computador</span><h2 id="di-titulo">Carregar código de progresso</h2></div>${btnFechar}</div>
    <label for="cc-in" style="font-weight:700;color:var(--titulo)">Cola aqui o teu código</label><textarea class="codigo" id="cc-in" placeholder="CLUBEUE1.…"></textarea><div id="cc-msg"></div>
    <div class="acoes"><button class="primario" type="button" id="cc-ok">Continuar a viagem</button></div></div>`;
  abrir(d);
  $('#cc-ok').onclick = () => { try { const { st } = lerCodigo($('#cc-in').value); E = Object.assign(novoEstado('', '', '', 2), st); guardar(); fechar(d); entrarJogo(); toast(`Bem-vindo de volta, ${E.nome.split(' ')[0]}!`); }
    catch (e) { $('#cc-msg').innerHTML = `<div class="feedback erro"><p>Não foi possível ler o código. Confirma que o copiaste por inteiro.</p></div>`; } };
}

/* ---------- Início ---------- */
let nivelEscolhido = 2;
function mostrarInicio() {
  $('#inicio').hidden = false; $('#jogo').hidden = true;
  const s = carregar(); $('#i-continuar').hidden = !s;
  if (s) $('#i-continuar').textContent = `Continuar a viagem de ${s.nome.split(' ')[0]} (${carimbados(s)}/${N})`;
  $('#contador').textContent = s ? `${carimbados(s)}/${N}` : `0/${N}`;
}
function entrarJogo() {
  $('#inicio').hidden = true; $('#jogo').hidden = false;
  if (!svg.firstChild) construirMapa(); else pintar();
  VB = ajustarProporcao(EUROPA); aplicarVB(); renderTudo();
  setTimeout(() => irPara(vistaEtapa(), 1100), 400);
  window.scrollTo(0, 0);
}
function iniciar() {
  $('#logo-bandeira').innerHTML = `<rect width="46" height="32" fill="#003399"/>${estrelasSVG(23, 16, 9.5, 1.9, '#FFCC00')}`;
  $('#est-faixa').innerHTML = `<rect width="96" height="96" rx="18" fill="#2459A2"/>${estrelasSVG(48, 48, 30, 6, '#DFBD54')}`;
  $('#bilhete-ilus').innerHTML = postal('porto');
  $('#i-niveis').innerHTML = [1, 2, 3].map(n => `<button type="button" class="nivel" data-n="${n}" aria-pressed="${n === nivelEscolhido}"><span>${NIVEIS[n].publico}</span><b>${NIVEIS[n].nome}</b><small>${NIVEIS[n].desc}</small></button>`).join('');
  $$('.nivel').forEach(b => b.onclick = () => { nivelEscolhido = +b.dataset.n; $$('.nivel').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#form-inicio').onsubmit = e => { e.preventDefault(); const nome = $('#i-nome').value.trim(); if (!nome) { $('#i-nome').focus(); return; }
    E = novoEstado(nome, $('#i-turma').value.trim(), $('#i-escola').value.trim(), nivelEscolhido); guardar(); entrarJogo(); setTimeout(() => abrirCidade(0), 1300); };
  $('#i-continuar').onclick = () => { E = carregar(); if (E) entrarJogo(); };
  $('#i-codigo').onclick = abrirCarregar;
  $('#marca').onclick = e => { e.preventDefault(); if (E) { window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  $('#b-passaporte').onclick = () => E ? abrirPassaporte() : toast('Começa a viagem para receberes o passaporte.');
  $('#b-recursos2').onclick = () => abrirRecursos('hino');
  $('#b-como').onclick = abrirComoJogar;
  $$('.cab-nav button').forEach(b => b.onclick = () => {
    const k = b.dataset.ir;
    if (k === 'viagem') { if (E) { $('#jogo').hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' }); } else mostrarInicio(); }
    else if (k === 'recursos') abrirRecursos('hino'); else if (k === 'ligacoes') abrirRecursos('ligacoes'); else abrirProfessor();
  });
  $$('dialog').forEach(d => d.addEventListener('close', () => { pararVoz(); if (d.id === 'dlg-recursos') pararHino(); }));
  mostrarInicio();
}
iniciar();
})();
