/* ============================================================
   Missão Europa — mundo explorável (p5.js, modo global)
   Coordenadas lógicas: 960 × 600, escaladas para o ecrã.
   Ilustrações esquemáticas (não são reconstruções exatas).
   ============================================================ */
"use strict";

(function () {
  const D = window.DADOS;
  const LW = 960, LH = 600;
  const PISO = { x0: 30, y0: 62, x1: 930, y1: 588 };
  const RAIO = 16, VEL = 210; // píxeis lógicos por segundo

  let escala = 1, contentor = null;
  let salaId = "atrio";
  const jog = { x: 480, y: 470, dir: 1, fase: 0, movendo: false };
  let alvo = null;           // { x, y, obj }
  let preso = 0, ultimaDist = 0, desvio = null;
  let proximo = null;
  let aviso = null;          // { txt, ate }
  let particulas = [];
  let brilhos = {};          // id -> tempo
  const teclas = new Set();
  let entrouPorta = false;

  /* ---------------- utilidades ---------------- */
  const sala = () => D.SALAS[salaId];
  const centro = o => ({ x: o.x + o.w / 2, y: o.y + o.h / 2 });
  function distRet(px, py, o) {
    const dx = Math.max(o.x - px, 0, px - (o.x + o.w));
    const dy = Math.max(o.y - py, 0, py - (o.y + o.h));
    return Math.hypot(dx, dy);
  }
  const bloqueia = o => o.tipo !== "porta" && o.tipo !== "saida";
  function colide(px, py) {
    return sala().objetos.some(o => bloqueia(o) &&
      px > o.x - RAIO + 4 && px < o.x + o.w + RAIO - 4 && py > o.y - RAIO + 4 && py < o.y + o.h + RAIO - 4);
  }
  function limitar(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pontoFrente(o) {
    // ponto livre junto ao objeto (preferencialmente por baixo)
    const c = centro(o);
    const cands = [
      { x: c.x, y: o.y + o.h + RAIO + 8 }, { x: c.x, y: o.y - RAIO - 8 },
      { x: o.x - RAIO - 8, y: c.y }, { x: o.x + o.w + RAIO + 8, y: c.y }
    ].map(p => ({ x: limitar(p.x, PISO.x0 + RAIO, PISO.x1 - RAIO), y: limitar(p.y, PISO.y0 + RAIO, PISO.y1 - RAIO) }));
    const livre = cands.filter(p => !colide(p.x, p.y));
    livre.sort((a, b) => Math.hypot(a.x - jog.x, a.y - jog.y) - Math.hypot(b.x - jog.x, b.y - jog.y));
    return livre[0] || cands[0];
  }

  /* ---------------- API usada pela App ---------------- */
  window.Mundo = {
    _jog: jog,
    entrarSala(id, pos) {
      salaId = id; jog.x = pos.x; jog.y = pos.y; alvo = null; particulas = []; entrouPorta = false;
      teclas.clear();
    },
    posicionarJunto(o) {
      if (o.tipo === "porta" || o.tipo === "saida") return;
      const p = pontoFrente(o); jog.x = p.x; jog.y = p.y; alvo = null;
    },
    aviso(txt) { aviso = { txt, ate: millis() + 3500 }; },
    brilho(id) { brilhos[id] = millis(); },
    celebrar() {
      for (let i = 0; i < 40; i++) {
        particulas.push({ x: jog.x, y: jog.y - 20, vx: (Math.random() - 0.5) * 260, vy: -Math.random() * 260 - 60, v: 1.6 + Math.random(), r: 4 + Math.random() * 5 });
      }
    }
  };

  /* ---------------- p5: configuração ---------------- */
  window.setup = function () {
    contentor = document.getElementById("mundo");
    const w = contentor.clientWidth || 800;
    const cnv = createCanvas(w, w * LH / LW);
    cnv.parent(contentor);
    cnv.elt.setAttribute("aria-hidden", "true");
    escala = width / LW;
    textFont("Segoe UI, system-ui, -apple-system, Roboto, Arial, sans-serif");
    ligarEntrada(cnv.elt);
  };
  window.windowResized = function () {
    if (!contentor) return;
    const w = contentor.clientWidth || 800;
    resizeCanvas(w, w * LH / LW);
    escala = width / LW;
  };

  /* ---------------- entrada: teclado e ponteiro ---------------- */
  function ligarEntrada(canvasEl) {
    const MOV = { arrowup: "c", w: "c", arrowdown: "b", s: "b", arrowleft: "e", a: "e", arrowright: "d", d: "d" };
    contentor.addEventListener("keydown", (ev) => {
      if (!window.App.jogoAtivo()) return;
      const k = ev.key.toLowerCase();
      if (MOV[k]) { teclas.add(MOV[k]); alvo = null; ev.preventDefault(); }
      else if (k === "e" || k === "enter" || k === " ") {
        ev.preventDefault();
        if (proximo) window.App.interagir(proximo);
        else window.Mundo.aviso("Aproxima-te de um objeto para o investigar.");
      }
    });
    contentor.addEventListener("keyup", (ev) => { const k = ev.key.toLowerCase(); if (MOV[k]) teclas.delete(MOV[k]); });
    contentor.addEventListener("blur", () => teclas.clear());

    contentor.addEventListener("pointerdown", (ev) => {
      if (!window.App.jogoAtivo()) return;
      contentor.focus({ preventScroll: true });
      const r = canvasEl.getBoundingClientRect();
      const lx = (ev.clientX - r.left) / r.width * LW, ly = (ev.clientY - r.top) / r.height * LH;
      const obj = sala().objetos.find(o => lx >= o.x - 6 && lx <= o.x + o.w + 6 && ly >= o.y - 6 && ly <= o.y + o.h + 6);
      if (obj) {
        if (distRet(jog.x, jog.y, obj) < 70) { window.App.interagir(obj); return; }
        const p = (obj.tipo === "porta" || obj.tipo === "saida") ? centro(obj) : pontoFrente(obj);
        alvo = { x: p.x, y: p.y, obj };
      } else {
        alvo = { x: limitar(lx, PISO.x0 + RAIO, PISO.x1 - RAIO), y: limitar(ly, PISO.y0 + RAIO, PISO.y1 - RAIO), obj: null };
      }
      preso = 0; ultimaDist = Infinity; desvio = null;
    });
  }

  /* ---------------- ciclo principal ---------------- */
  window.draw = function () {
    const dt = Math.min(0.05, deltaTime / 1000);
    atualizar(dt);
    push();
    scale(escala);
    desenharSala();
    sala().objetos.forEach(desenharObjeto);
    if (alvo && !alvo.obj) desenharMarcaAlvo();
    desenharJogador();
    desenharParticulas(dt);
    desenharInterface();
    pop();
  };

  function atualizar(dt) {
    if (!window.App || !window.App.jogoAtivo()) { teclas.clear(); jog.movendo = false; return; }
    let vx = 0, vy = 0;
    if (teclas.has("c")) vy -= 1; if (teclas.has("b")) vy += 1;
    if (teclas.has("e")) vx -= 1; if (teclas.has("d")) vx += 1;
    if (vx || vy) {
      const n = Math.hypot(vx, vy); vx /= n; vy /= n;
    } else if (alvo) {
      const dx = alvo.x - jog.x, dy = alvo.y - jog.y, d = Math.hypot(dx, dy);
      if (d < 5 || (alvo.obj && distRet(jog.x, jog.y, alvo.obj) < 34 && alvo.obj.tipo !== "porta" && alvo.obj.tipo !== "saida")) {
        const o = alvo.obj; alvo = null;
        if (o) window.App.interagir(o);
        return;
      }
      vx = dx / d; vy = dy / d;
      if (desvio && desvio.t > 0) { desvio.t -= dt; vx = desvio.vx; vy = desvio.vy; }
      else if (d > ultimaDist - 0.3) {
        preso++;
        if (preso % 6 === 0) {
          // contorna o obstáculo: tenta a perpendicular que estiver livre
          const opcoes = [[-vy, vx], [vy, -vx]].filter(([a, b]) => !colide(jog.x + a * 24, jog.y + b * 24));
          if (opcoes.length) {
            const [a, b] = opcoes.sort((p, q) => Math.hypot(alvo.x - (jog.x + p[0] * 24), alvo.y - (jog.y + p[1] * 24)) - Math.hypot(alvo.x - (jog.x + q[0] * 24), alvo.y - (jog.y + q[1] * 24)))[0];
            desvio = { vx: a, vy: b, t: 0.35 }; vx = a; vy = b;
          }
        }
      } else preso = 0;
      ultimaDist = d;
      if (preso > 90) {
        const o = alvo.obj; alvo = null;
        if (o && distRet(jog.x, jog.y, o) < 90) window.App.interagir(o);
        return;
      }
    }
    jog.movendo = !!(vx || vy);
    if (jog.movendo) {
      const passo = VEL * dt;
      const nx = limitar(jog.x + vx * passo, PISO.x0 + RAIO, PISO.x1 - RAIO);
      const ny = limitar(jog.y + vy * passo, PISO.y0 + RAIO, PISO.y1 - RAIO);
      if (!colide(nx, jog.y)) jog.x = nx;
      if (!colide(jog.x, ny)) jog.y = ny;
      if (vx) jog.dir = vx > 0 ? 1 : -1;
      jog.fase += dt * 10;
    }
    // portas: entrar ao caminhar para dentro delas
    const porta = sala().objetos.find(o => (o.tipo === "porta" || o.tipo === "saida") &&
      jog.x > o.x + 10 && jog.x < o.x + o.w - 10 && jog.y > o.y + 6 && jog.y < o.y + o.h - 2);
    if (porta && jog.movendo && !entrouPorta) { entrouPorta = true; window.App.interagir(porta); return; }
    // objeto mais próximo
    proximo = null; let melhor = 62;
    sala().objetos.forEach(o => { const d = distRet(jog.x, jog.y, o); if (d < melhor) { melhor = d; proximo = o; } });
  }

  /* ---------------- desenho da sala ---------------- */
  function desenharSala() {
    const s = sala();
    background(s.parede);
    // chão em mosaico
    noStroke();
    const T = 48;
    for (let y = PISO.y0; y < LH; y += T) {
      for (let x = 0; x < LW; x += T) {
        fill(((x / T + y / T) | 0) % 2 ? s.chao : s.chao2);
        rect(x, y, T, T);
      }
    }
    // parede de topo
    fill(s.parede); rect(0, 0, LW, PISO.y0);
    fill(255, 255, 255, 18); rect(0, PISO.y0 - 8, LW, 8);
    // grinalda de estrelas na parede
    fill(255, 204, 0, 150);
    for (let i = 0; i < 24; i++) estrela(20 + i * 40, 22, 5, 2.2);
    // paredes laterais com sombra
    fill(0, 0, 0, 60); rect(0, PISO.y0, PISO.x0, LH); rect(PISO.x1, PISO.y0, LW - PISO.x1, LH);
    fill(0, 0, 0, 40); rect(0, PISO.y1, LW, LH - PISO.y1);

    if (salaId === "atrio") desenharAtrio();
    if (s.rio) desenharRio();
    if (salaId === "mapa") desenharRosaVentos(480, 300);
    if (salaId === "historia") desenharEstantes();
    if (salaId === "direitos") desenharTapete(480, 300, s.acento);
    if (salaId === "simbolos") desenharTapete(480, 300, "#ffcc00");
  }

  function desenharAtrio() {
    // grande tapete circular azul com as 12 posições de estrelas
    const cx = 480, cy = 290;
    noStroke(); fill(0, 51, 153); ellipse(cx, cy, 330, 300);
    stroke(255, 204, 0, 120); strokeWeight(3); noFill(); ellipse(cx, cy, 316, 286);
    noStroke();
    const n = window.App ? window.App.estrelas() : 0;
    for (let k = 0; k < 12; k++) {
      const a = -HALF_PI + k * TWO_PI / 12;
      const x = cx + Math.cos(a) * 130, y = cy + Math.sin(a) * 118;
      if (k < n) { fill(255, 204, 0); estrela(x, y, 12 + Math.sin(millis() / 300 + k) * 1.2, 5); }
      else { noFill(); stroke(255, 204, 0, 90); strokeWeight(1.5); estrela(x, y, 11, 4.5); noStroke(); }
    }
  }
  function desenharRio() {
    noStroke();
    fill(40, 110, 190); beginShape();
    for (let x = 0; x <= LW; x += 20) vertex(x, 270 + Math.sin(x / 90 + millis() / 1500) * 16);
    for (let x = LW; x >= 0; x -= 20) vertex(x, 330 + Math.sin(x / 90 + millis() / 1500 + 0.6) * 16);
    endShape(CLOSE);
    stroke(255, 255, 255, 70); strokeWeight(2); noFill();
    for (let i = 0; i < 6; i++) {
      const x = (i * 170 + millis() / 30) % LW;
      line(x, 300 + Math.sin(x / 90) * 10, x + 30, 300 + Math.sin((x + 30) / 90) * 10);
    }
    // ponte
    noStroke(); fill(150, 110, 70); rect(440, 255, 80, 92, 6);
    fill(120, 85, 55); for (let y = 260; y < 345; y += 12) rect(440, y, 80, 4);
    fill(0); textAlign(CENTER, CENTER); textSize(11); fill(255, 255, 255, 200);
    text("Rio Douro (ilustração)", 320, 352);
  }
  function desenharRosaVentos(cx, cy) {
    push(); translate(cx, cy); noStroke();
    fill(255, 255, 255, 25); ellipse(0, 0, 220, 220);
    fill(127, 211, 255, 80);
    for (let k = 0; k < 4; k++) { rotate(HALF_PI); triangle(0, -100, -14, 0, 14, 0); }
    fill(255, 255, 255, 160); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
    text("N", 0, -118); text("S", 0, 118); text("O", -118, 0); text("E", 118, 0);
    textStyle(NORMAL); pop();
  }
  function desenharEstantes() {
    noStroke();
    for (let i = 0; i < 9; i++) {
      fill(70, 45, 25); rect(40 + i * 100, PISO.y0 + 2, 90, 26);
      for (let j = 0; j < 8; j++) { fill([180, 60, 60][j % 3] - 40, [140, 110, 70][j % 3], [90, 160, 60][j % 3]); rect(44 + i * 100 + j * 10.5, PISO.y0 + 6, 8, 20); }
    }
  }
  function desenharTapete(cx, cy, cor) {
    push(); noStroke(); const c = color(cor); c.setAlpha(40); fill(c);
    rectMode(CENTER); rect(cx, cy, 420, 200, 30); pop();
  }

  /* ---------------- desenho dos objetos ---------------- */
  function desenharObjeto(o) {
    const c = centro(o);
    const est = window.App ? window.App.estadoObjeto(o) : "";
    const destaque = proximo === o;
    push();
    if (destaque) {
      noFill(); stroke(255, 204, 0); strokeWeight(3);
      rect(o.x - 6, o.y - 6, o.w + 12, o.h + 12, 10);
    }
    noStroke();
    const fn = DESENHOS[o.desenho] || DESENHOS.caixa;
    fn(o, c, est);
    // brilho de pista recém-encontrada
    if (brilhos[o.id] && millis() - brilhos[o.id] < 1200) {
      const t = (millis() - brilhos[o.id]) / 1200;
      noFill(); stroke(255, 230, 120, 255 * (1 - t)); strokeWeight(3); ellipse(c.x, c.y, 60 + t * 80, 60 + t * 80);
    }
    // indicador de estado
    if (o.tipo === "pista") indicadorPista(o, est);
    // rótulo
    rotulo(o, c);
    pop();
  }

  function indicadorPista(o, est) {
    const x = o.x + o.w - 2, y = o.y - 4 + (est === "nova" ? Math.sin(millis() / 250 + o.x) * 3 : 0);
    noStroke();
    if (est === "nova") {
      fill(255, 204, 0); ellipse(x, y, 22, 22);
      // lupa
      stroke(10, 26, 74); strokeWeight(2.2); noFill(); ellipse(x - 2, y - 2, 9, 9); line(x + 1.5, y + 1.5, x + 6, y + 6);
    } else {
      fill(47, 191, 113); ellipse(x, y, 18, 18);
      stroke(255); strokeWeight(2.4); noFill(); line(x - 4, y, x - 1, y + 3); line(x - 1, y + 3, x + 5, y - 4);
    }
  }

  function rotulo(o, c) {
    if (o.tipo === "porta" && o.y < 300) return rotuloEm(o.rotulo, c.x, o.y + o.h + 14);
    if (o.tipo === "porta" || o.tipo === "saida") return rotuloEm(o.rotulo, c.x, o.y - 12);
    rotuloEm(o.rotulo, c.x, o.y + o.h + 13);
  }
  function fatorTexto() { return Math.max(1, Math.min(1.9, 0.75 / escala)); }
  function rotuloEm(t, x, y) {
    textSize(12 * fatorTexto()); textAlign(CENTER, CENTER); noStroke();
    const w = textWidth(t) + 12;
    const h = 18 * fatorTexto();
    fill(5, 12, 40, 190); rect(x - w / 2, y - h / 2, w, h, 6);
    fill(255); text(t, x, y);
  }

  function estrela(x, y, r1, r2) {
    beginShape();
    for (let k = 0; k < 10; k++) {
      const a = -HALF_PI + k * PI / 5, r = k % 2 ? r2 : r1;
      vertex(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    endShape(CLOSE);
  }
  function cadeado(x, y) {
    noFill(); stroke(220); strokeWeight(3); arc(x, y - 4, 14, 16, PI, TWO_PI);
    noStroke(); fill(220); rect(x - 9, y - 4, 18, 14, 3); fill(60); ellipse(x, y + 2, 4, 4);
  }

  const DESENHOS = {
    porta(o, c, est) {
      const sDest = D.SALAS[o.destino];
      fill(sDest.parede); rect(o.x, o.y, o.w, o.h, 8, 8, 2, 2);
      fill(sDest.chao); rect(o.x + 8, o.y + 8, o.w - 16, o.h - 12, 6, 6, 0, 0);
      fill(255, 204, 0); ellipse(o.x + o.w - 18, c.y + 4, 6, 6);
      const n = window.App ? window.App.estrelasSala(o.destino) : 0;
      for (let i = 0; i < 2; i++) {
        if (i < n) { fill(255, 204, 0); } else { fill(255, 255, 255, 60); }
        estrela(c.x - 10 + i * 20, c.y, 7, 3);
      }
    },
    saida(o, c) {
      fill(10, 20, 50, 200); rect(o.x, o.y, o.w, o.h, 8, 8, 0, 0);
      fill(255, 204, 0); triangle(c.x - 10, c.y + 2, c.x + 6, c.y - 8, c.x + 6, c.y + 12);
    },
    pedestal(o, c, est) {
      fill(200, 200, 215); rect(c.x - 34, c.y + 20, 68, 34, 4);
      fill(160, 160, 180); rect(c.x - 40, c.y + 50, 80, 10, 3);
      fill(120); rect(c.x - 2, c.y - 50, 4, 74);
      // bandeira
      fill(0, 51, 153); rect(c.x + 2, c.y - 50, 54, 36);
      const n = window.App ? window.App.estrelas() : 0;
      for (let k = 0; k < 12; k++) {
        const a = -HALF_PI + k * TWO_PI / 12;
        if (k < n) fill(255, 204, 0); else fill(255, 255, 255, 40);
        estrela(c.x + 29 + Math.cos(a) * 12, c.y - 32 + Math.sin(a) * 12, 3, 1.3);
      }
      if (est === "pronto") { noFill(); stroke(255, 204, 0, 150 + 100 * Math.sin(millis() / 200)); strokeWeight(3); ellipse(c.x, c.y, 140, 140); }
    },
    estacao(o, c, est) {
      // pedestal com cofre de estrela
      fill(30, 30, 50, 120); ellipse(c.x, o.y + o.h - 4, o.w, 16);
      fill(225, 230, 245); rect(c.x - 28, c.y - 4, 56, 36, 6);
      fill(190, 198, 222); rect(c.x - 28, c.y + 22, 56, 10, 0, 0, 6, 6);
      if (est === "feito") {
        fill(255, 204, 0); estrela(c.x, c.y - 18, 18, 7.5);
        fill(47, 191, 113); ellipse(c.x + 20, c.y + 8, 18, 18);
        stroke(255); strokeWeight(2.4); noFill(); line(c.x + 15, c.y + 8, c.x + 18, c.y + 11); line(c.x + 18, c.y + 11, c.x + 24, c.y + 4);
      } else if (est === "bloqueado") {
        fill(255, 255, 255, 50); estrela(c.x, c.y - 18, 16, 6.5);
        cadeado(c.x, c.y + 10);
      } else {
        const p = 1 + Math.sin(millis() / 220) * 0.12;
        fill(255, 204, 0, 70); ellipse(c.x, c.y - 18, 52 * p, 52 * p);
        fill(255, 204, 0); estrela(c.x, c.y - 18, 18 * p, 7.5 * p);
        fill(0, 51, 153); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD); text("ABRIR", c.x, c.y + 12); textStyle(NORMAL);
      }
    },
    bandeira(o, c) {
      fill(0, 51, 153); rect(o.x, o.y + 8, o.w, o.h - 8, 4);
      fill(0, 40, 120); rect(o.x, o.y + o.h - 14, o.w, 14, 0, 0, 4, 4);
      fill(255, 204, 0);
      for (let k = 0; k < 12; k++) { const a = k * TWO_PI / 12; estrela(c.x + Math.cos(a) * 15, c.y - 2 + Math.sin(a) * 15, 3.2, 1.4); }
    },
    etiqueta(o, c) {
      fill(240, 225, 190); rect(o.x, o.y, o.w, o.h, 4);
      fill(120, 90, 50); for (let i = 0; i < 3; i++) rect(o.x + 6, o.y + 10 + i * 9, o.w - 12, 3);
      fill(200, 40, 40); ellipse(o.x + 6, o.y + 6, 7, 7);
    },
    giradiscos(o, c) {
      fill(90, 55, 35); rect(o.x, o.y + 14, o.w, o.h - 14, 6);
      fill(20); ellipse(c.x - 6, c.y + 6, 48, 48);
      fill(200, 40, 40); ellipse(c.x - 6, c.y + 6, 14, 14);
      stroke(200); strokeWeight(3); line(o.x + o.w - 8, o.y + 18, c.x + 6, c.y + 2); noStroke();
      fill(255, 204, 0, 180); textSize(16); textAlign(CENTER, CENTER);
      text("♪", c.x + 26, o.y + 4 + Math.sin(millis() / 300) * 3);
    },
    placa(o, c) {
      fill(140, 100, 40); rect(o.x, o.y, o.w, o.h, 6);
      fill(255, 204, 0); rect(o.x + 4, o.y + 4, o.w - 8, o.h - 8, 4);
      fill(110, 75, 20); for (let i = 0; i < 3; i++) rect(o.x + 10, o.y + 12 + i * 9, o.w - 20, 3);
    },
    calendario(o, c) {
      fill(255); rect(o.x, o.y + 6, o.w, o.h - 6, 4);
      fill(200, 40, 40); rect(o.x, o.y + 6, o.w, 18, 4, 4, 0, 0);
      fill(255); textAlign(CENTER, CENTER); textSize(11); text("MAIO", c.x, o.y + 15);
      fill(20); textSize(26); textStyle(BOLD); text("9", c.x, c.y + 12); textStyle(NORMAL);
    },
    saudacoes(o, c) {
      fill(245); rect(o.x, o.y, o.w, o.h, 6);
      const cores = ["#ffcc00", "#7fd3ff", "#ff9fb7", "#9be3c0", "#c4a7ff"];
      ["Olá", "Hola", "Ciao", "Hej", "Tere"].forEach((t, i) => {
        fill(cores[i]); rect(o.x + 8 + (i % 2) * 34, o.y + 8 + i * 19, 42, 15, 7);
        fill(20); textSize(10); textAlign(CENTER, CENTER); text(t, o.x + 29 + (i % 2) * 34, o.y + 15.5 + i * 19);
      });
    },
    globo(o, c) {
      fill(110, 80, 50); rect(c.x - 18, o.y + o.h - 10, 36, 10, 3); rect(c.x - 3, c.y + 22, 6, 24);
      fill(50, 120, 210); ellipse(c.x, c.y - 4, 62, 62);
      fill(70, 170, 90);
      beginShape(); vertex(c.x - 14, c.y - 26); vertex(c.x + 10, c.y - 28); vertex(c.x + 20, c.y - 12); vertex(c.x + 6, c.y - 4); vertex(c.x - 4, c.y + 8); vertex(c.x - 18, c.y - 6); endShape(CLOSE);
      ellipse(c.x + 14, c.y + 12, 14, 10);
      noFill(); stroke(200, 160, 80); strokeWeight(3); arc(c.x, c.y - 4, 74, 74, -PI * 0.1, PI * 1.1);
    },
    moedas(o, c) {
      fill(80, 50, 120); rect(o.x, o.y + 8, o.w, o.h - 8, 10);
      for (let i = 0; i < 3; i++) {
        fill(210, 170, 60); ellipse(o.x + 16 + i * 18, o.y + 10 - (i % 2) * 6, 22, 22);
        fill(240, 205, 90); ellipse(o.x + 16 + i * 18, o.y + 10 - (i % 2) * 6, 15, 15);
        fill(140, 100, 20); textSize(10); textAlign(CENTER, CENTER); text("€", o.x + 16 + i * 18, o.y + 10 - (i % 2) * 6);
      }
    },
    passaporte(o, c) {
      fill(120, 20, 40); rect(o.x, o.y, o.w, o.h, 5);
      fill(255, 204, 0); for (let k = 0; k < 12; k++) { const a = k * TWO_PI / 12; estrela(c.x + Math.cos(a) * 12, c.y - 8 + Math.sin(a) * 12, 2.4, 1); }
      rect(o.x + 10, o.y + o.h - 16, o.w - 20, 3);
    },
    postal(o, c) {
      fill(255); rect(o.x, o.y, o.w, o.h, 4);
      fill(127, 211, 255); rect(o.x + 5, o.y + 5, o.w * 0.5, o.h - 10, 2);
      fill(70, 170, 90); triangle(o.x + 5, o.y + o.h - 5, o.x + 5 + o.w * 0.25, o.y + o.h * 0.45, o.x + 5 + o.w * 0.5, o.y + o.h - 5);
      fill(150); for (let i = 0; i < 3; i++) rect(o.x + o.w * 0.6, o.y + 14 + i * 9, o.w * 0.33, 2);
      fill(200, 40, 40); rect(o.x + o.w - 16, o.y + 5, 10, 10);
    },
    jornal(o, c) {
      fill(235, 230, 215); rect(o.x, o.y, o.w, o.h, 2);
      fill(30); rect(o.x + 6, o.y + 6, o.w - 12, 8);
      fill(120); for (let i = 0; i < 4; i++) { rect(o.x + 6, o.y + 20 + i * 8, o.w / 2 - 10, 3); rect(c.x + 2, o.y + 20 + i * 8, o.w / 2 - 8, 3); }
    },
    caixa(o, c) {
      fill(140, 95, 55); rect(o.x, o.y + 10, o.w, o.h - 10, 4);
      fill(110, 75, 45); rect(o.x, o.y + 10, o.w, 10);
      fill(40); ellipse(c.x - 14, o.y + 10, 18, 14); ellipse(c.x, o.y + 6, 18, 14);
      fill(170, 175, 185); rect(c.x + 8, o.y + 2, 20, 10, 2);
    },
    pergaminho(o, c) {
      fill(240, 220, 170); rect(o.x + 6, o.y + 6, o.w - 12, o.h - 12);
      fill(220, 195, 140); ellipse(o.x + 6, c.y, 12, o.h - 6); ellipse(o.x + o.w - 6, c.y, 12, o.h - 6);
      fill(130, 90, 50); for (let i = 0; i < 3; i++) rect(o.x + 16, o.y + 14 + i * 8, o.w - 32, 2);
      fill(180, 30, 30); ellipse(c.x, o.y + o.h - 10, 12, 12);
    },
    foto(o, c) {
      fill(120, 85, 50); rect(o.x, o.y, o.w, o.h, 3);
      fill(220, 215, 200); rect(o.x + 6, o.y + 6, o.w - 12, o.h - 12);
      fill(200, 185, 150); rect(o.x + 12, c.y - 4, o.w - 24, 18);
      for (let i = 0; i < 5; i++) { fill(160, 140, 110); rect(o.x + 14 + i * 9, c.y - 2, 4, 8, 2, 2, 0, 0); }
      fill(190, 170, 130); rect(o.x + o.w - 22, o.y + 12, 8, 16);
    },
    pasta(o, c) {
      fill(0, 51, 153); rect(o.x, o.y + 6, o.w, o.h - 6, 4); rect(o.x, o.y, o.w * 0.4, 10, 3);
      fill(255, 204, 0); for (let k = 0; k < 12; k++) { const a = k * TWO_PI / 12; estrela(c.x + Math.cos(a) * 11, c.y + 3 + Math.sin(a) * 11, 2.2, 1); }
    },
    caneta(o, c) {
      fill(245); rect(o.x, o.y + 10, o.w, o.h - 10, 4);
      push(); translate(c.x, c.y); rotate(-0.5); fill(20, 20, 60); rect(-26, -4, 46, 8, 3); fill(255, 204, 0); triangle(20, -4, 20, 4, 30, 0); pop();
    },
    medalha(o, c) {
      fill(200, 40, 40); triangle(c.x - 12, o.y, c.x + 12, o.y, c.x, c.y);
      fill(0, 51, 153); triangle(c.x - 4, o.y, c.x + 20, o.y, c.x + 6, c.y);
      fill(220, 175, 60); ellipse(c.x, c.y + 10, 40, 40); fill(245, 205, 90); ellipse(c.x, c.y + 10, 28, 28);
      fill(160, 120, 30); estrela(c.x, c.y + 10, 9, 4);
    },
    hemiciclo(o, c) {
      const cx = c.x, cy = o.y + o.h - 6;
      noFill(); strokeWeight(9);
      for (let r = 0; r < 4; r++) {
        stroke([60, 140, 220][r % 3], [90, 180, 120][r % 3] + 20, [200, 120, 180][r % 3]);
        arc(cx, cy, 60 + r * 46, 50 + r * 40, PI, TWO_PI);
      }
      noStroke(); fill(255, 204, 0); rect(cx - 14, cy - 10, 28, 12, 3);
    },
    pulpito(o, c) {
      fill(225, 230, 245); rect(o.x + 8, o.y + 20, o.w - 16, o.h - 20, 4);
      fill(0, 51, 153); rect(o.x, o.y + 12, o.w, 14, 4);
      fill(255, 204, 0); for (let k = 0; k < 12; k++) { const a = k * TWO_PI / 12; estrela(c.x + Math.cos(a) * 9, c.y + 16 + Math.sin(a) * 9, 2, 0.9); }
      fill(60); rect(c.x - 1, o.y, 2, 14); ellipse(c.x, o.y, 6, 6);
    },
    mesa(o, c) {
      fill(120, 80, 45); rect(o.x, o.y + 14, o.w, o.h - 24, 6);
      for (let i = 0; i < 4; i++) { fill(60, 90, 160); ellipse(o.x + 14 + i * 24, o.y + 8, 16, 16); ellipse(o.x + 14 + i * 24, o.y + o.h - 4, 16, 16); }
    },
    mesaredonda(o, c) {
      for (let k = 0; k < 9; k++) { const a = k * TWO_PI / 9; fill(60, 90, 160); ellipse(c.x + Math.cos(a) * 40, c.y + Math.sin(a) * 34, 15, 15); }
      fill(120, 80, 45); ellipse(c.x, c.y, 62, 52);
      fill(0, 51, 153); ellipse(c.x, c.y, 22, 22);
    },
    martelo(o, c) {
      fill(110, 70, 40); ellipse(c.x, c.y + 14, o.w, 16);
      push(); translate(c.x, c.y); rotate(-0.6);
      fill(150, 100, 55); rect(-3, -6, 6, 30, 2); fill(120, 75, 40); rect(-16, -16, 32, 14, 4);
      pop();
    },
    cofre(o, c) {
      fill(110, 115, 130); rect(o.x, o.y, o.w, o.h, 6);
      fill(150, 155, 170); rect(o.x + 6, o.y + 6, o.w - 12, o.h - 12, 4);
      fill(60); ellipse(c.x, c.y, 22, 22); fill(200); ellipse(c.x, c.y, 8, 8);
      fill(255, 204, 0); textSize(11); textAlign(CENTER, CENTER); text("€", o.x + 12, o.y + 13);
    },
    bilhete(o, c) {
      fill(255, 220, 60); push(); translate(c.x, c.y); rotate(0.08); rect(-o.w / 2, -o.h / 2, o.w, o.h, 2);
      fill(120, 90, 0); for (let i = 0; i < 3; i++) rect(-o.w / 2 + 6, -o.h / 2 + 9 + i * 8, o.w - 12, 2);
      fill(200, 40, 40); textSize(16); textStyle(BOLD); textAlign(CENTER, CENTER); text("!", o.w / 2 - 6, -o.h / 2 + 4); textStyle(NORMAL); pop();
    },
    cartaz(o, c) {
      fill(245); rect(o.x, o.y, o.w, o.h, 3);
      fill(0, 120, 200); rect(o.x, o.y, o.w, 18, 3, 3, 0, 0);
      fill(255); textSize(10); textAlign(CENTER, CENTER); textStyle(BOLD); text("DUDH", c.x, o.y + 9); textStyle(NORMAL);
      fill(0, 120, 200); ellipse(c.x, c.y + 4, 30, 30); fill(245); ellipse(c.x, c.y + 4, 18, 18);
      fill(120); rect(o.x + 10, o.y + o.h - 18, o.w - 20, 3); rect(o.x + 10, o.y + o.h - 11, o.w - 30, 3);
    },
    quadro(o, c) {
      fill(110, 75, 40); rect(o.x, o.y, o.w, o.h, 4);
      fill(30, 70, 50); rect(o.x + 5, o.y + 5, o.w - 10, o.h - 10, 2);
      fill(240); textSize(9); textAlign(LEFT, CENTER);
      ["dignidade · liberdade", "democracia · igualdade", "Estado de direito"].forEach((t, i) => text(t, o.x + 11, o.y + 18 + i * 16));
    },
    livro(o, c) {
      fill(0, 40, 120); rect(o.x, o.y, o.w, o.h, 4);
      fill(0, 51, 153); rect(o.x + 6, o.y, o.w - 6, o.h, 0, 4, 4, 0);
      fill(255, 204, 0); for (let k = 0; k < 12; k++) { const a = k * TWO_PI / 12; estrela(c.x + 3 + Math.cos(a) * 12, c.y + Math.sin(a) * 12, 2.4, 1); }
    },
    urna(o, c) {
      fill(230, 235, 245, 220); rect(o.x, o.y + 16, o.w, o.h - 16, 4);
      fill(0, 51, 153); rect(o.x, o.y + 10, o.w, 10, 3);
      fill(20); rect(c.x - 12, o.y + 13, 24, 3);
      fill(255); push(); translate(c.x, o.y + 4 + Math.sin(millis() / 400) * 3); rect(-9, -10, 18, 14); fill(200, 40, 40); textSize(10); textAlign(CENTER, CENTER); text("✓", 0, -3); pop();
    },
    maquete(o, c) {
      fill(225, 210, 175); rect(o.x, o.y + 26, o.w, o.h - 26);
      for (let i = 0; i < 8; i++) { fill(190, 170, 130); rect(o.x + 6 + i * 10.5, o.y + 38, 6, 16, 3, 3, 0, 0); }
      fill(215, 200, 165); rect(o.x + o.w - 26, o.y + 4, 20, 30);
      triangle(o.x + o.w - 28, o.y + 6, o.x + o.w - 16, o.y - 6, o.x + o.w - 4, o.y + 6);
      fill(120, 100, 70); rect(o.x - 4, o.y + o.h - 6, o.w + 8, 6, 2);
    },
    folha(o, c) {
      push(); translate(c.x, c.y); rotate(-0.6);
      fill(40, 140, 60); ellipse(0, 0, 26, 52); stroke(25, 90, 40); strokeWeight(2); line(0, -24, 0, 26);
      pop();
    },
    mapario(o, c) {
      fill(240, 230, 200); rect(o.x, o.y, o.w, o.h, 4);
      noFill(); stroke(40, 110, 190); strokeWeight(4);
      beginShape(); vertex(o.x + o.w - 8, o.y + 16); vertex(o.x + o.w - 30, o.y + 28); vertex(c.x, o.y + 22); vertex(o.x + 30, o.y + 40); vertex(o.x + 8, o.y + 38); endShape();
      stroke(160, 120, 80); strokeWeight(1.5); line(c.x + 6, o.y + 6, c.x + 6, o.y + o.h - 6);
      noStroke(); fill(80); textSize(9); textAlign(CENTER, CENTER); text("PT", o.x + 22, o.y + o.h - 10); text("ES", o.x + o.w - 22, o.y + o.h - 10);
    },
    painelsolar(o, c) {
      fill(120); rect(c.x - 3, c.y + 10, 6, o.h / 2 - 10);
      push(); translate(c.x, c.y); shearX(-0.3);
      fill(20, 50, 110); rect(-o.w / 2 + 10, -o.h / 2 + 4, o.w - 20, o.h * 0.55, 3);
      stroke(120, 160, 230); strokeWeight(1);
      for (let i = 1; i < 4; i++) line(-o.w / 2 + 10 + i * (o.w - 20) / 4, -o.h / 2 + 4, -o.w / 2 + 10 + i * (o.w - 20) / 4, -o.h / 2 + 4 + o.h * 0.55);
      pop();
      noStroke(); fill(255, 204, 0); ellipse(o.x + 2, o.y + 2, 18, 18);
    },
    mochila(o, c) {
      fill(0, 51, 153); rect(o.x + 4, o.y + 10, o.w - 8, o.h - 10, 12);
      fill(0, 40, 120); rect(o.x + 10, c.y + 6, o.w - 20, 18, 5);
      noFill(); stroke(0, 40, 120); strokeWeight(4); arc(c.x, o.y + 12, 26, 20, PI, TWO_PI); noStroke();
      fill(255, 204, 0); estrela(c.x, o.y + 26, 7, 3);
    },
    correio(o, c) {
      fill(80); rect(c.x - 3, c.y + 10, 6, o.h / 2 - 10);
      fill(0, 51, 153); rect(o.x, o.y, o.w, o.h * 0.6, 12, 12, 3, 3);
      fill(10, 20, 50); rect(o.x + 8, o.y + 12, o.w - 16, 5, 2);
      fill(255); push(); translate(c.x, o.y + 10); rotate(-0.15); rect(-10, -14, 20, 12); pop();
    }
  };

  /* ---------------- jogador ---------------- */
  function desenharJogador() {
    const bob = jog.movendo ? Math.sin(jog.fase) * 2 : 0;
    const x = jog.x, y = jog.y;
    noStroke();
    fill(0, 0, 0, 70); ellipse(x, y + 16, 30, 10);
    // pernas
    fill(40, 40, 60);
    const p = jog.movendo ? Math.sin(jog.fase) * 4 : 0;
    rect(x - 7, y + 4, 5, 12 + p, 2); rect(x + 2, y + 4, 5, 12 - p, 2);
    // corpo
    fill(0, 51, 153); rect(x - 11, y - 14 + bob, 22, 22, 7);
    fill(255, 204, 0); estrela(x + 3 * jog.dir, y - 5 + bob, 4.5, 2);
    // mochila
    fill(200, 60, 60); rect(jog.dir > 0 ? x - 17 : x + 11, y - 12 + bob, 6, 16, 2);
    // cabeça
    fill(240, 200, 160); ellipse(x, y - 24 + bob, 20, 20);
    fill(70, 45, 30); arc(x, y - 27 + bob, 21, 16, PI, TWO_PI);
    fill(30); ellipse(x + 4 * jog.dir, y - 24 + bob, 3, 3);
  }

  function desenharMarcaAlvo() {
    noFill(); stroke(255, 204, 0, 180); strokeWeight(2);
    const r = 14 + Math.sin(millis() / 150) * 3;
    ellipse(alvo.x, alvo.y + 12, r * 2, r);
  }

  function desenharParticulas(dt) {
    noStroke();
    particulas = particulas.filter(p => (p.v -= dt) > 0);
    particulas.forEach(p => {
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt;
      fill(255, 204, 0, Math.min(255, p.v * 200)); estrela(p.x, p.y, p.r, p.r * 0.45);
    });
  }

  function desenharInterface() {
    // pedido de interação
    if (proximo && window.App && window.App.jogoAtivo()) {
      const verbo = { pista: "Investigar", desafio: "Abrir desafio", porta: "Entrar", saida: "Sair", pedestal: "Usar o pedestal" }[proximo.tipo] || "Usar";
      const t = `E / toque · ${verbo}: ${proximo.rotulo}`;
      textSize(15 * Math.min(1.6, fatorTexto())); textAlign(CENTER, CENTER);
      const w = Math.min(LW - 20, textWidth(t) + 28);
      fill(255, 204, 0); rect(LW / 2 - w / 2, LH - 44, w, 30, 15);
      fill(10, 26, 74); textStyle(BOLD); text(t, LW / 2, LH - 29); textStyle(NORMAL);
    }
    // aviso temporário
    if (aviso && millis() < aviso.ate) {
      textSize(15); textAlign(CENTER, CENTER);
      const w = Math.min(880, textWidth(aviso.txt) + 30);
      fill(10, 20, 50, 230); stroke(255, 204, 0); strokeWeight(2);
      rect(LW / 2 - w / 2, 70, w, 34, 10);
      noStroke(); fill(255); text(aviso.txt, LW / 2, 87);
    }
  }
})();
