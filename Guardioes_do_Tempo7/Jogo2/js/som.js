/* =========================================================
   Som — gerado com a Web Audio API (não precisa de ficheiros).
   Modos: 'off' | 'efeitos' | 'ambiente' | 'melodia'. Começa desligado.
   ========================================================= */
const Som = (() => {
  let ctx = null, mestre = null, musica = null, efeitosGain = null;
  let modo = 'off', volume = 0.5, efeitosLigados = true;
  let nosAmbiente = [], temporizadorMelodia = null, eraTom = 0;

  function iniciar() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    mestre = ctx.createGain(); mestre.gain.value = volume * 0.6; mestre.connect(ctx.destination);
    musica = ctx.createGain(); musica.gain.value = 0; musica.connect(mestre);
    efeitosGain = ctx.createGain(); efeitosGain.gain.value = 0.7; efeitosGain.connect(mestre);
    return true;
  }

  function ruidoRosa(seg) {
    const n = Math.floor(ctx.sampleRate * seg), buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.08; b6 = w * 0.115926;
    }
    return buf;
  }

  function pararTudo() {
    nosAmbiente.forEach(n => { try { n.stop(); } catch (e) {} });
    nosAmbiente = [];
    if (temporizadorMelodia) { clearTimeout(temporizadorMelodia); temporizadorMelodia = null; }
  }

  function comecarAmbiente() {
    // vento/água suave: ruído rosa filtrado com variação lenta + nota grave muito discreta
    const src = ctx.createBufferSource(); src.buffer = ruidoRosa(6); src.loop = true;
    const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = 520; filtro.Q.value = 0.4;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lfoG = ctx.createGain(); lfoG.gain.value = 260; lfo.connect(lfoG); lfoG.connect(filtro.frequency);
    const g = ctx.createGain(); g.gain.value = 0.55;
    src.connect(filtro); filtro.connect(g); g.connect(musica);
    const drone = ctx.createOscillator(); drone.type = 'sine'; drone.frequency.value = 110 * Math.pow(2, eraTom / 12);
    const dg = ctx.createGain(); dg.gain.value = 0.05; drone.connect(dg); dg.connect(musica);
    src.start(); lfo.start(); drone.start();
    nosAmbiente.push(src, lfo, drone);
  }

  // melodia pentatónica lenta, gerada passo a passo
  const ESCALA = [0, 2, 4, 7, 9, 12, 14, 16];
  let passo = 3;
  function nota(freq, inicio, dur, tipo = 'triangle', ganho = 0.12, destino = musica) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = tipo; o.frequency.value = freq;
    g.gain.setValueAtTime(0, inicio);
    g.gain.linearRampToValueAtTime(ganho, inicio + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0008, inicio + dur);
    o.connect(g); g.connect(destino); o.start(inicio); o.stop(inicio + dur + 0.05);
  }
  function cicloMelodia() {
    if (modo !== 'melodia' || !ctx) return;
    const base = 261.63 * Math.pow(2, eraTom / 12);
    const t = ctx.currentTime + 0.05;
    passo = Math.max(0, Math.min(ESCALA.length - 1, passo + [-2, -1, -1, 0, 1, 1, 2][Math.floor(Math.random() * 7)]));
    nota(base * Math.pow(2, ESCALA[passo] / 12), t, 1.6, 'triangle', 0.10);
    if (Math.random() < 0.35) nota(base / 2 * Math.pow(2, ESCALA[Math.floor(Math.random() * 4)] / 12), t, 2.4, 'sine', 0.07);
    temporizadorMelodia = setTimeout(cicloMelodia, 650 + Math.random() * 500);
  }

  function aplicar() {
    if (!ctx) return;
    pararTudo();
    const agora = ctx.currentTime;
    musica.gain.cancelScheduledValues(agora);
    if (modo === 'off' || modo === 'efeitos') { musica.gain.setTargetAtTime(0, agora, 0.2); if (modo === 'efeitos' && ctx.state === 'suspended') ctx.resume(); return; }
    if (ctx.state === 'suspended') ctx.resume();
    musica.gain.setTargetAtTime(modo === 'ambiente' ? 0.9 : 0.8, agora, 0.6);
    if (modo === 'ambiente') comecarAmbiente(); else cicloMelodia();
  }

  return {
    get modo() { return modo; },
    get volume() { return volume; },
    get efeitos() { return efeitosLigados; },
    definirModo(m) { modo = m; if (m !== 'off') iniciar(); aplicar(); },
    definirVolume(v) { volume = v; if (mestre) mestre.gain.setTargetAtTime(v * 0.6, ctx.currentTime, 0.05); },
    definirEfeitos(b) { efeitosLigados = b; if (b) iniciar(); },
    definirEra(i) { eraTom = [0, 2, -3, 5, -1, 0][i] || 0; if (modo === 'ambiente') aplicar(); },
    efeito(tipo) {
      if (!efeitosLigados || modo === 'off') return;
      if (!iniciar()) return;
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime + 0.02, d = efeitosGain;
      if (tipo === 'pista') { nota(880, t, 0.5, 'sine', 0.10, d); nota(1318.5, t + 0.08, 0.6, 'sine', 0.07, d); }
      else if (tipo === 'certo') { nota(523.25, t, 0.4, 'triangle', 0.10, d); nota(783.99, t + 0.12, 0.6, 'triangle', 0.09, d); }
      else if (tipo === 'tenta') { nota(392, t, 0.45, 'sine', 0.08, d); nota(349.23, t + 0.14, 0.5, 'sine', 0.06, d); }
      else if (tipo === 'selo') { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => nota(f, t + i * 0.12, 0.9, 'triangle', 0.08, d)); }
      else if (tipo === 'clique') { nota(660, t, 0.12, 'sine', 0.04, d); }
    },
    estado() { return { modo, volume, efeitos: efeitosLigados, contexto: ctx ? ctx.state : 'nenhum' }; }
  };
})();
