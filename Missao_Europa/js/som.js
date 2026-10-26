/* ============================================================
   Missão Europa — som (Web Audio, sem ficheiros externos)
   Começa DESLIGADO. Música: "ambiente" (discreto) ou "melodia"
   (melodia suave inspirada no Hino à Alegria, obra em domínio público).
   ============================================================ */
"use strict";

window.Som = (function () {
  let ctx = null, mestre = null, busMusica = null, busEfeitos = null;
  const cfg = { ligado: false, modo: "ambiente", volume: 0.5, efeitos: true };
  let musicaAtiva = null;       // { parar: fn }
  let temporizador = null;

  function garantirContexto() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    mestre = ctx.createGain();
    mestre.gain.value = 0;
    mestre.connect(ctx.destination);
    busMusica = ctx.createGain(); busMusica.gain.value = 0.55; busMusica.connect(mestre);
    busEfeitos = ctx.createGain(); busEfeitos.gain.value = 0.8; busEfeitos.connect(mestre);
    return true;
  }

  function aplicarVolume() {
    if (!ctx) return;
    const alvo = cfg.ligado ? cfg.volume * 0.6 : 0;
    mestre.gain.cancelScheduledValues(ctx.currentTime);
    mestre.gain.setTargetAtTime(alvo, ctx.currentTime, 0.15);
  }

  /* ---------- Música: ambiente discreto ---------- */
  function iniciarAmbiente() {
    const nos = [];
    const filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass"; filtro.frequency.value = 700; filtro.Q.value = 0.4;
    const ganho = ctx.createGain(); ganho.gain.value = 0;
    filtro.connect(ganho); ganho.connect(busMusica);
    ganho.gain.setTargetAtTime(0.22, ctx.currentTime, 2);
    // acorde suave (Ré maior aberto) com ligeira desafinação
    [146.83, 220.0, 293.66, 369.99].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain(); g.gain.value = 0.18 / (i + 1);
      // respiração lenta
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05 + i * 0.023;
      const lg = ctx.createGain(); lg.gain.value = 0.06 / (i + 1);
      lfo.connect(lg); lg.connect(g.gain);
      o.connect(g); g.connect(filtro);
      o.start(); lfo.start();
      nos.push(o, lfo);
    });
    // filtro a abrir e fechar muito devagar
    const lfoF = ctx.createOscillator(); lfoF.frequency.value = 0.03;
    const lfoFg = ctx.createGain(); lfoFg.gain.value = 250;
    lfoF.connect(lfoFg); lfoFg.connect(filtro.frequency); lfoF.start(); nos.push(lfoF);
    return {
      parar() {
        ganho.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
        setTimeout(() => nos.forEach(n => { try { n.stop(); } catch (e) {} }), 2500);
      }
    };
  }

  /* ---------- Música: melodia suave ---------- */
  // Notas em Ré maior (frequências). Melodia do «Hino à Alegria» (Beethoven, domínio público).
  const N = { D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.0, A4: 440.0, A3: 220.0, D3: 146.83, G3: 196.0, E3: 164.81, Fs3: 185.0 };
  const MELODIA = [
    ["Fs4",1],["Fs4",1],["G4",1],["A4",1],["A4",1],["G4",1],["Fs4",1],["E4",1],
    ["D4",1],["D4",1],["E4",1],["Fs4",1],["Fs4",1.5],["E4",0.5],["E4",2],
    ["Fs4",1],["Fs4",1],["G4",1],["A4",1],["A4",1],["G4",1],["Fs4",1],["E4",1],
    ["D4",1],["D4",1],["E4",1],["Fs4",1],["E4",1.5],["D4",0.5],["D4",2],
    [null,4]
  ];
  const BAIXO = ["D3","A3","D3","A3","D3","A3","D3","A3"];

  function tocarNota(freq, inicio, dur, tipo, vol, destino) {
    const o = ctx.createOscillator(); o.type = tipo; o.frequency.value = freq;
    const g = ctx.createGain(); g.gain.value = 0;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 1800;
    o.connect(f); f.connect(g); g.connect(destino);
    g.gain.setValueAtTime(0, inicio);
    g.gain.linearRampToValueAtTime(vol, inicio + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0008, inicio + dur * 0.95);
    o.start(inicio); o.stop(inicio + dur);
  }

  function iniciarMelodia() {
    let ativo = true;
    const batida = 0.62; // segundos por tempo (calmo)
    const ganho = ctx.createGain(); ganho.gain.value = 0.9; ganho.connect(busMusica);
    function agendarCiclo() {
      if (!ativo) return;
      let t = ctx.currentTime + 0.1, total = 0;
      MELODIA.forEach(([n, d]) => {
        if (n) tocarNota(N[n], t, d * batida * 1.05, "triangle", 0.11, ganho);
        t += d * batida; total += d;
      });
      // baixo suave: uma nota a cada 4 tempos
      for (let i = 0; i < BAIXO.length; i++) {
        tocarNota(N[BAIXO[i]], ctx.currentTime + 0.1 + i * 4 * batida, 3.8 * batida, "sine", 0.07, ganho);
      }
      temporizador = setTimeout(agendarCiclo, total * batida * 1000);
    }
    agendarCiclo();
    return {
      parar() {
        ativo = false; clearTimeout(temporizador);
        ganho.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      }
    };
  }

  function atualizarMusica() {
    if (!ctx) return;
    if (musicaAtiva) { musicaAtiva.parar(); musicaAtiva = null; }
    if (!cfg.ligado) return;
    if (cfg.modo === "ambiente") musicaAtiva = iniciarAmbiente();
    else if (cfg.modo === "melodia") musicaAtiva = iniciarMelodia();
  }

  /* ---------- Efeitos (delicados) ---------- */
  function efeito(nome) {
    if (!ctx || !cfg.ligado || !cfg.efeitos) return;
    const t = ctx.currentTime + 0.01;
    const seq = {
      pista:   [[659.25, 0, 0.25], [987.77, 0.09, 0.35]],
      acerto:  [[523.25, 0, 0.2], [659.25, 0.08, 0.2], [783.99, 0.16, 0.35]],
      erro:    [[329.63, 0, 0.25], [293.66, 0.14, 0.35]],
      estrela: [[783.99, 0, 0.18], [987.77, 0.07, 0.18], [1174.66, 0.14, 0.2], [1567.98, 0.21, 0.5]],
      porta:   [[392.0, 0, 0.2], [523.25, 0.1, 0.25]],
      clique:  [[880, 0, 0.08]],
      final:   [[587.33, 0, 0.3], [739.99, 0.15, 0.3], [880, 0.3, 0.3], [1174.66, 0.45, 0.8]]
    }[nome];
    if (!seq) return;
    seq.forEach(([f, d, dur]) => tocarNota(f, t + d, dur, "sine", nome === "erro" ? 0.07 : 0.1, busEfeitos));
  }

  return {
    cfg,
    ligar(sim) {
      cfg.ligado = !!sim;
      if (cfg.ligado) {
        if (!garantirContexto()) return false;
        if (ctx.state === "suspended") ctx.resume();
      }
      aplicarVolume(); atualizarMusica();
      return true;
    },
    definirModo(modo) { cfg.modo = modo; atualizarMusica(); },
    definirVolume(v) { cfg.volume = Math.max(0, Math.min(1, v)); aplicarVolume(); },
    definirEfeitos(sim) { cfg.efeitos = !!sim; },
    efeito,
    suportado() { return !!(window.AudioContext || window.webkitAudioContext); }
  };
})();
