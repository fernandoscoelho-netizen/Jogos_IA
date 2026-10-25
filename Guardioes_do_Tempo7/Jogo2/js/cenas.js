/* =========================================================
   Cenas desenhadas com p5.js (modo de instância).
   Espaço lógico: 960 × 540. Tudo é ilustração estilizada.
   ========================================================= */
const LARG = 960, ALT = 540;

// aleatoriedade com semente (as cenas ficam sempre iguais)
let _semente = 11;
function semear(n) { _semente = n >>> 0; }
function R(a = 1, b) { _semente = (_semente + 0x6D2B79F5) >>> 0; let t = _semente; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296; return b === undefined ? r * a : a + r * (b - a); }
function N(x) { const i = Math.floor(x), f = x - i, h = k => { const v = Math.sin(k * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); }; const u = f * f * (3 - 2 * f); return h(i) * (1 - u) + h(i + 1) * u; }

const CENA_CFG = {
  paleo:   { andar: [385, 505], porta: [905, 468], inicio: [70, 470] },
  neo:     { andar: [400, 505], porta: [62, 478],  inicio: [470, 480] },
  mega:    { andar: [385, 505], porta: [70, 478],  inicio: [300, 480] },
  egito:   { andar: [430, 510], porta: [915, 485], inicio: [230, 485] },
  porto:   { andar: [425, 510], porta: [62, 482],  inicio: [320, 485] },
  arquivo: { andar: [400, 505], porta: [480, 395], inicio: [120, 480] }
};

const Cenas = {
  /* ---------- utilitários ---------- */
  ceu(g, c1, c2, y0 = 0, y1 = ALT) {
    const ctx = g.drawingContext, gr = ctx.createLinearGradient(0, y0, 0, y1);
    gr.addColorStop(0, c1); gr.addColorStop(1, c2);
    ctx.save(); ctx.fillStyle = gr; ctx.fillRect(0, y0, LARG, y1 - y0); ctx.restore();
  },
  colinas(g, yBase, amp, cor, semente, passo = 8, freq = 0.004) {
    g.noStroke(); g.fill(cor); g.beginShape(); g.vertex(0, ALT);
    for (let x = 0; x <= LARG; x += passo) g.vertex(x, yBase - N(semente + x * freq) * amp);
    g.vertex(LARG, ALT); g.endShape(g.CLOSE);
  },
  arvoreFolhosa(g, x, y, s, cTronco, cCopa) {
    g.noStroke(); g.fill(cTronco); g.rect(x - 4 * s, y - 30 * s, 8 * s, 30 * s, 2);
    g.fill(cCopa);
    g.ellipse(x, y - 44 * s, 46 * s, 36 * s); g.ellipse(x - 16 * s, y - 34 * s, 30 * s, 24 * s); g.ellipse(x + 16 * s, y - 34 * s, 30 * s, 24 * s);
  },
  pinheiro(g, x, y, s, cTronco, cCopa) {
    g.noStroke(); g.fill(cTronco); g.rect(x - 3 * s, y - 16 * s, 6 * s, 16 * s);
    g.fill(cCopa); for (let i = 0; i < 3; i++) g.triangle(x - (22 - i * 5) * s, y - (12 + i * 16) * s, x + (22 - i * 5) * s, y - (12 + i * 16) * s, x, y - (40 + i * 16) * s);
  },
  palmeira(g, x, y, s) {
    g.stroke('#8a6a45'); g.strokeWeight(5 * s); g.noFill();
    g.line(x, y, x + 6 * s, y - 70 * s);
    g.noStroke(); g.fill('#5f8f5a');
    for (let a = 0; a < 6; a++) {
      const ang = -Math.PI / 2 + (a - 2.5) * 0.55;
      g.push(); g.translate(x + 6 * s, y - 70 * s); g.rotate(ang + Math.PI / 2); g.ellipse(0, -18 * s, 10 * s, 40 * s); g.pop();
    }
  },
  ampliar: 1, // >1 em ecrãs pequenos, para manter o texto legível
  nuvens(p, t, alfa = 200) {
    p.noStroke();
    for (let i = 0; i < 4; i++) {
      const x = ((i * 290 + t * (6 + i * 2)) % (LARG + 260)) - 130, y = 60 + (i % 3) * 38;
      p.fill(255, 255, 255, alfa * (0.7 + 0.1 * i));
      p.ellipse(x, y, 110, 30); p.ellipse(x - 30, y + 4, 70, 24); p.ellipse(x + 34, y + 3, 80, 26); p.ellipse(x + 6, y - 10, 60, 26);
    }
  },
  rotulo(p, txt, x, y, destaque = false) {
    const k = this.ampliar;
    p.push(); p.textSize(13 * k); p.textStyle(p.BOLD);
    const w = p.textWidth(txt) + 16 * k;
    x = Math.max(w / 2 + 4, Math.min(LARG - w / 2 - 4, x));
    p.noStroke(); p.fill(destaque ? 'rgba(30,58,95,0.92)' : 'rgba(255,253,247,0.92)');
    p.rect(x - w / 2, y - 12 * k, w, 24 * k, 12 * k);
    p.fill(destaque ? '#fff' : '#1e3a5f'); p.textAlign(p.CENTER, p.CENTER); p.text(txt, x, y + 1);
    p.pop();
  },

  /* ---------- fundos (desenhados num buffer) ---------- */
  fundo(g, era, est) {
    g.push(); semear(11);
    this['fundo_' + era](g, est || {});
    g.pop();
  },

  fundo_paleo(g) {
    this.ceu(g, '#f6d7b8', '#cfd8e6', 0, 330);
    g.noStroke(); g.fill(255, 240, 210, 180); g.ellipse(700, 120, 90, 90);
    this.colinas(g, 300, 90, '#b7c2cf', 10, 8, 0.003);
    this.colinas(g, 330, 70, '#9fb09a', 40, 8, 0.005);
    for (let i = 0; i < 9; i++) this.pinheiro(g, 420 + i * 62 + R(-10, 10), 335 + R(-6, 6), 0.9 + R(0.3), '#6b5442', '#5d7d63');
    // rio ao fundo
    g.fill('#9cc3cf'); g.beginShape(); g.vertex(380, 352); g.vertex(960, 335); g.vertex(960, 372); g.vertex(360, 372); g.endShape(g.CLOSE);
    // chão
    this.ceu(g, '#c9b28f', '#a98e6b', 360, ALT);
    g.fill(160, 135, 100, 90); for (let i = 0; i < 60; i++) g.ellipse(R(LARG), R(380, 535), R(6, 22), R(3, 7));
    // abrigo rochoso (palas)
    g.fill('#8f7b69'); g.beginShape();
    g.vertex(0, 0); g.vertex(420, 0); g.vertex(400, 60); g.vertex(360, 120); g.vertex(330, 150); g.vertex(250, 170); g.vertex(130, 175);
    g.vertex(80, 300); g.vertex(60, 380); g.vertex(0, 395); g.endShape(g.CLOSE);
    g.fill('#a6917c'); g.beginShape(); g.vertex(70, 180); g.vertex(330, 160); g.vertex(345, 330); g.vertex(320, 375); g.vertex(60, 385); g.endShape(g.CLOSE);
    g.fill('#b8a48e'); g.beginShape(); g.vertex(110, 195); g.vertex(320, 178); g.vertex(328, 320); g.vertex(100, 330); g.endShape(g.CLOSE);
    g.stroke(120, 100, 85, 70); g.strokeWeight(2); for (let i = 0; i < 14; i++) { const x = R(90, 330), y = R(180, 360); g.line(x, y, x + R(-20, 20), y + R(10, 30)); }
    g.noStroke();
    // arbustos
    for (let i = 0; i < 6; i++) { g.fill(R() < 0.5 ? '#7e9a74' : '#6f8c68'); g.ellipse(360 + i * 110 + R(-20, 20), 380, 70, 34); }
  },

  fundo_neo(g, est) {
    const n = est.neo || 0;
    this.ceu(g, '#cfe6f2', '#f3ecd9', 0, 330);
    g.noStroke(); g.fill(255, 250, 225, 200); g.ellipse(160, 90, 70, 70);
    this.colinas(g, 290, 80, '#b9cbbd', 3, 8, 0.003);
    this.colinas(g, 335, 60, '#a9c49a', 21, 8, 0.004);
    if (n >= 4) { // aldeia vizinha ao longe (trocas)
      for (let i = 0; i < 4; i++) { const x = 760 + i * 28, y = 300; g.fill('#d8c6a0'); g.rect(x - 9, y - 10, 18, 10); g.fill('#b9945a'); g.triangle(x - 12, y - 10, x + 12, y - 10, x, y - 24); }
    }
    this.ceu(g, '#c8c79a', '#b6a77c', 345, ALT);
    // campo de cereais (cresce)
    const larguraCampo = n >= 1 ? 330 : 220;
    g.fill('#e2c56b'); g.quad(20, 360, 20 + larguraCampo, 355, 30 + larguraCampo, 440, 0, 450);
    g.stroke('#c9a646'); g.strokeWeight(2);
    for (let r = 0; r < 9; r++) { const y = 365 + r * 9; for (let x = 20; x < 10 + larguraCampo; x += 9) g.line(x, y, x + 2, y - 7); }
    g.noStroke();
    for (let i = 0; i < 7; i++) this.arvoreFolhosa(g, 500 + i * 70 + R(-15, 15), 345, 0.8 + R(0.3), '#7a5c40', '#7fa36e');
    // cabanas: número aumenta com as decisões
    const cabanas = [[470, 395], [560, 380], [400, 380], [690, 400], [620, 360]];
    const qt = 2 + Math.min(3, n);
    for (let i = 0; i < qt; i++) this.cabana(g, cabanas[i][0], cabanas[i][1], i === 0 ? 1.15 : 1);
    // cerca dos animais
    g.stroke('#8b6a48'); g.strokeWeight(3);
    for (let x = 270; x <= 400; x += 26) g.line(x, 430, x, 470);
    g.line(270, 440, 400, 440); g.line(270, 458, 400, 458);
    g.noStroke();
    if (n >= 3) { // oficina extra com vasos
      g.fill('#a8623d'); for (let i = 0; i < 4; i++) g.ellipse(720 + i * 18, 470, 14, 18);
    }
    if (n >= 4) { // caminho de trocas
      g.fill(220, 205, 170, 160); g.quad(940, 520, 960, 520, 820, 330, 800, 330);
    }
  },
  cabana(g, x, y, s) {
    g.noStroke(); g.fill('#d9c39b'); g.ellipse(x, y, 74 * s, 22 * s);
    g.rect(x - 32 * s, y - 34 * s, 64 * s, 34 * s);
    g.fill('#b38b4f'); g.triangle(x - 42 * s, y - 32 * s, x + 42 * s, y - 32 * s, x, y - 86 * s);
    g.stroke('#9c7840'); g.strokeWeight(1.5); for (let i = -3; i <= 3; i++) g.line(x + i * 10 * s, y - 32 * s, x, y - 84 * s);
    g.noStroke(); g.fill('#6e5236'); g.rect(x - 9 * s, y - 24 * s, 18 * s, 24 * s, 8 * s, 8 * s, 0, 0);
  },

  fundo_mega(g, est) {
    this.ceu(g, '#f5dcae', '#d7e1e8', 0, 320);
    g.noStroke(); g.fill(255, 236, 190, 200); g.ellipse(820, 200, 110, 110);
    this.colinas(g, 300, 30, '#c3c7b9', 5, 10, 0.002);
    this.ceu(g, '#d8c58e', '#c2ad78', 300, ALT);
    g.fill(170, 150, 100, 80); for (let i = 0; i < 80; i++) g.ellipse(R(LARG), R(310, 535), R(10, 30), R(2, 5));
    // azinheiras/carvalhos dispersos
    for (let i = 0; i < 8; i++) this.arvoreFolhosa(g, 40 + i * 125 + R(-30, 30), 305 + R(0, 8), 0.65 + R(0.2), '#6b5a45', '#7d8f62');
    // cromeleque (anel de menires em perspetiva)
    const cx = 420, cy = 300;
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2, x = cx + Math.cos(a) * 120, y = cy + Math.sin(a) * 32;
      const h = 22 + (Math.sin(a) + 1) * 8;
      g.fill(Math.sin(a) > 0 ? '#9a9a8a' : '#aeae9e'); g.ellipse(x, y - h / 2, 13 + (Math.sin(a) + 1) * 3, h);
    }
    // anta antiga (sem mamoa, como muitas hoje)
    const ax = 700, ay = 395;
    g.fill('#8c8c7c'); g.rect(ax - 46, ay - 60, 18, 60, 4); g.rect(ax - 12, ay - 64, 18, 64, 4); g.rect(ax + 26, ay - 58, 18, 58, 4);
    g.fill('#9d9d8c'); g.quad(ax - 60, ay - 58, ax + 56, ay - 66, ax + 60, ay - 50, ax - 56, ay - 44);
    // menir grande
    g.fill('#a19f8d'); g.beginShape(); g.vertex(170, 402); g.vertex(166, 320); g.vertex(176, 272); g.vertex(194, 258); g.vertex(210, 276); g.vertex(214, 340); g.vertex(208, 402); g.endShape(g.CLOSE);
    g.fill('#8f8d7c'); g.beginShape(); g.vertex(196, 402); g.vertex(200, 300); g.vertex(194, 262); g.vertex(210, 276); g.vertex(214, 340); g.vertex(208, 402); g.endShape(g.CLOSE);
    g.fill(0, 0, 0, 30); g.ellipse(190, 402, 60, 10);
  },
  antaEmObra(p, x, y, fase) { // construída no desafio m2
    p.noStroke();
    if (fase === 0) { p.fill('#9a9a8a'); p.ellipse(x - 40, y, 50, 16); p.ellipse(x + 10, y + 6, 46, 14); p.ellipse(x + 50, y - 4, 40, 14); p.fill('#a5a594'); p.quad(x - 60, y - 22, x + 40, y - 26, x + 44, y - 16, x - 56, y - 12); return; }
    if (fase >= 3) { p.fill('#b7a77a'); p.ellipse(x, y - 18, 190, 90); p.fill('#a89a6e'); p.ellipse(x, y - 6, 150, 40); }
    p.fill('#8c8c7c'); p.rect(x - 38, y - 48, 14, 48, 3); p.rect(x - 8, y - 52, 14, 52, 3); p.rect(x + 22, y - 46, 14, 46, 3);
    if (fase >= 2) { p.fill('#9d9d8c'); p.quad(x - 50, y - 48, x + 44, y - 54, x + 48, y - 40, x - 46, y - 34); }
    else { p.fill('#a5a594'); p.quad(x + 40, y - 6, x + 120, y - 10, x + 122, y, x + 42, y + 4); p.fill(160, 140, 100, 120); p.triangle(x + 40, y + 4, x + 130, y + 4, x + 40, y - 40); }
    if (fase >= 3) { p.fill('#c1b083'); p.arc(x, y - 18, 190, 110, Math.PI, 0); p.fill('#6e6a5a'); p.rect(x - 10, y - 26, 20, 26, 6, 6, 0, 0); }
  },

  fundo_egito(g) {
    this.ceu(g, '#f7e3bf', '#cfe3ea', 0, 300);
    g.noStroke(); g.fill(255, 244, 210, 220); g.ellipse(150, 90, 80, 80);
    // deserto ao fundo
    this.colinas(g, 290, 30, '#e9d3a6', 9, 10, 0.002);
    // pirâmides
    g.fill('#e2c38a'); g.triangle(650, 290, 830, 290, 740, 190); g.fill('#cfae74'); g.triangle(740, 190, 830, 290, 760, 290);
    g.fill('#e6c993'); g.triangle(560, 292, 670, 292, 615, 232); g.fill('#d3b37b'); g.triangle(615, 232, 670, 292, 625, 292);
    // margem distante verde
    g.fill('#a9c58c'); g.rect(0, 296, LARG, 70);
    for (let i = 0; i < 11; i++) this.palmeira(g, 20 + i * 76 + R(-15, 15), 330 + R(-8, 10), 0.6 + R(0.2));
    // templo (pilone)
    g.fill('#e8d2a2'); g.quad(812, 366, 862, 366, 856, 296, 818, 296); g.quad(878, 366, 928, 366, 922, 296, 884, 296);
    g.fill('#d9bf8b'); g.rect(860, 316, 20, 50); g.fill('#a88b5a'); g.rect(864, 330, 12, 36);
    g.stroke('#c4a46e'); g.strokeWeight(1.5); for (let k = 0; k < 4; k++) { g.line(822, 310 + k * 12, 852, 310 + k * 12); g.line(888, 310 + k * 12, 918, 310 + k * 12); } g.noStroke();
  },
  // camada do Nilo e margem próxima (muda com as estações)
  nilo(p, est, t) {
    const e = est.egito || 0; // 0 normal, 1 cheia, 2 peret, 3 shemu
    const topo = [370, 345, 368, 382][e], base = [425, 448, 425, 415][e];
    p.noStroke(); p.fill(e === 1 ? '#7fa9b9' : '#8fbccb');
    p.beginShape(); p.vertex(0, topo); for (let x = 0; x <= LARG; x += 20) p.vertex(x, topo + Math.sin(x * 0.02 + t * 0.6) * 2); p.vertex(LARG, base); p.vertex(0, base); p.endShape(p.CLOSE);
    p.stroke(255, 255, 255, 90); p.strokeWeight(2);
    for (let i = 0; i < 12; i++) { const x = (i * 97 + t * 14) % LARG; const y = topo + 12 + (i % 4) * 9; p.line(x, y, x + 18, y); }
    p.noStroke();
    // margem próxima e campos
    const cor = ['#c9b48a', '#8f8a6a', '#7fb36a', '#e0c56a'][e];
    p.fill('#d5c29a'); p.rect(0, base, LARG, ALT - base);
    p.fill(cor); p.rect(0, base, 520, 22);
    if (e === 1) { p.fill(127, 169, 185, 120); p.rect(0, base, LARG, 18); }
  },

  fundo_porto(g) {
    this.ceu(g, '#d6e8f2', '#f6efe0', 0, 280);
    g.noStroke(); g.fill(255, 250, 230, 200); g.ellipse(820, 80, 70, 70);
    // cidade-ilha amuralhada (Tiro estava numa ilha)
    g.fill('#d7c7a7'); g.rect(560, 230, 330, 50);
    for (let i = 0; i < 9; i++) { g.fill(i % 2 ? '#e3d4b3' : '#cfbd99'); g.rect(570 + i * 35, 196 + (i % 3) * 8, 30, 40 - (i % 3) * 8); }
    g.fill('#c5b28c'); for (let i = 0; i < 11; i++) g.rect(560 + i * 30, 224, 14, 8);
    g.fill('#c2ad85'); g.rect(600, 186, 18, 50); g.rect(820, 190, 18, 46);
    // mar
    this.ceu(g, '#9cc6d6', '#7fb0c4', 275, 420);
    // cais
    this.ceu(g, '#d9c8a6', '#c7b28c', 420, ALT);
    g.fill('#bda67d'); g.rect(0, 416, LARG, 10);
    g.fill(150, 130, 95, 90); for (let x = 0; x < LARG; x += 48) g.rect(x, 430, 2, 100);
  },

  fundo_arquivo(g) {
    this.ceu(g, '#e9e2d3', '#d8cdb8', 0, ALT);
    g.noStroke();
    // estantes
    for (let i = 0; i < 2; i++) {
      const x0 = i === 0 ? 40 : 700;
      g.fill('#b08d64'); g.rect(x0, 90, 220, 300, 6);
      for (let r = 0; r < 5; r++) { g.fill('#8c6c48'); g.rect(x0 + 8, 100 + r * 58, 204, 6);
        for (let k = 0; k < 9; k++) { g.fill(['#7a4a7e', '#3f8f8a', '#c9a646', '#a0785a', '#1e3a5f'][(k + r) % 5]); g.rect(x0 + 14 + k * 22, 108 + r * 58, 16, 46, 2); } }
    }
    // porta
    g.fill('#c8b38a'); g.rect(330, 120, 300, 280, 150, 150, 0, 0);
    g.fill('#8c6c48'); g.rect(350, 140, 260, 260, 130, 130, 0, 0);
    g.fill('#d8c8a5'); g.rect(0, 400, LARG, 140);
    g.fill(180, 160, 125, 80); for (let x = 0; x < LARG; x += 60) g.rect(x, 400, 2, 140);
  },

  /* ---------- objetos ---------- */
  objeto(p, id, x, y, t) {
    p.push(); p.noStroke();
    switch (id) {
      case 'camada':
        [['#8a6a4f', 0], ['#a5835f', 14], ['#b99a72', 28], ['#9b7b58', 42]].forEach(([c, dy]) => { p.fill(c); p.rect(x - 40, y - 30 + dy, 80, 14); });
        p.fill('#efe6d6'); p.ellipse(x - 18, y - 3, 10, 4); p.fill('#5a5a5a'); p.triangle(x + 10, y + 10, x + 18, y + 10, x + 14, y + 3);
        p.stroke('#6b5442'); p.strokeWeight(2); p.line(x + 46, y - 34, x + 46, y + 26); p.noStroke(); p.fill('#d9534f'); p.triangle(x + 46, y - 34, x + 60, y - 30, x + 46, y - 26);
        break;
      case 'biface':
        p.fill('#7d7f86'); p.beginShape(); p.vertex(x, y - 22); p.vertex(x + 13, y - 2); p.vertex(x + 9, y + 14); p.vertex(x - 9, y + 14); p.vertex(x - 13, y - 2); p.endShape(p.CLOSE);
        p.fill('#9a9ca3'); p.triangle(x, y - 18, x + 8, y - 2, x - 4, y + 2); p.fill('#6a6c72'); p.triangle(x - 8, y + 4, x + 2, y + 12, x - 9, y + 12);
        break;
      case 'fogueira': {
        p.fill('#6b5442'); p.ellipse(x, y + 10, 64, 16);
        p.fill('#8a8a8a'); for (let i = 0; i < 7; i++) p.ellipse(x + Math.cos(i) * 28, y + 10 + Math.sin(i) * 6, 12, 8);
        const f = Math.sin(t * 9) * 3;
        p.fill(255, 170, 70, 210); p.ellipse(x, y - 6 + f * 0.3, 26, 36 + f);
        p.fill(255, 220, 120, 230); p.ellipse(x, y, 14, 20 + f * 0.6);
        p.fill(255, 200, 120, 40); p.ellipse(x, y, 110 + f * 4, 70 + f * 2);
        break; }
      case 'cranio':
        p.fill('#c8b9a0'); p.ellipse(x - 26, y + 6, 40, 10);
        p.fill('#efe6d2'); p.ellipse(x, y - 8, 34, 28); p.rect(x - 10, y - 2, 22, 12, 4);
        p.fill('#6b5a48'); p.ellipse(x - 6, y - 6, 8, 7); p.ellipse(x + 7, y - 6, 8, 7); p.rect(x - 1, y + 2, 3, 5);
        break;
      case 'pintura':
        p.fill(170, 70, 40, 200);
        p.ellipse(x - 30, y - 10, 46, 20); p.ellipse(x - 52, y - 16, 14, 12); p.rect(x - 46, y - 2, 4, 16); p.rect(x - 18, y - 2, 4, 16);
        p.triangle(x - 56, y - 22, x - 58, y - 30, x - 52, y - 22);
        p.fill(60, 45, 35, 200); p.ellipse(x + 30, y + 14, 36, 16); p.ellipse(x + 46, y + 9, 12, 10); p.rect(x + 18, y + 20, 3, 12); p.rect(x + 38, y + 20, 3, 12);
        p.fill(170, 70, 40, 170); for (let i = 0; i < 3; i++) p.ellipse(x + 10 + i * 9, y - 22, 6, 9);
        break;
      case 'sepultura':
        p.fill('#a3866a'); p.ellipse(x, y + 4, 90, 34); p.fill('#8a6f56'); p.ellipse(x, y + 2, 70, 22);
        p.fill('#efe6d2'); p.ellipse(x - 20, y, 14, 10); p.fill('#f3d6c9'); p.ellipse(x + 8, y - 2, 9, 7); p.ellipse(x + 18, y + 3, 8, 6);
        p.fill(180, 70, 50, 120); p.ellipse(x, y + 2, 40, 10);
        break;
      case 'campo':
        p.stroke('#b8902f'); p.strokeWeight(2);
        for (let i = -3; i <= 3; i++) { const sw = Math.sin(t * 1.5 + i) * 2; p.line(x + i * 7, y + 10, x + i * 7 + sw, y - 18); p.noStroke(); p.fill('#d9b24c'); p.ellipse(x + i * 7 + sw, y - 22, 5, 12); p.stroke('#b8902f'); }
        break;
      case 'cabras':
        for (let k = 0; k < 2; k++) {
          const bx = x - 18 + k * 34, by = y - k * 6 + Math.sin(t * 2 + k) * 0.6;
          p.fill(k ? '#f1ece2' : '#d9cbb2'); p.ellipse(bx, by, 30, 18); p.ellipse(bx + 15, by - 8, 12, 10);
          p.fill('#6b5a48'); p.rect(bx - 10, by + 6, 3, 10); p.rect(bx + 7, by + 6, 3, 10);
          p.stroke('#6b5a48'); p.strokeWeight(2); p.line(bx + 15, by - 12, bx + 11, by - 20); p.noStroke();
        }
        break;
      case 'mo':
        p.fill('#9b9686'); p.ellipse(x, y, 62, 22); p.fill('#b3ae9c'); p.ellipse(x, y - 4, 56, 16);
        p.fill('#8c8676'); p.ellipse(x + 4, y - 9, 26, 10); p.fill('#f3ead2'); p.ellipse(x - 14, y - 4, 10, 4);
        break;
      case 'ceramica':
        p.fill('#b5683f'); p.ellipse(x, y, 34, 40); p.rect(x - 9, y - 26, 18, 10, 3);
        p.stroke('#f2d7b8'); p.strokeWeight(2); for (let i = -1; i <= 1; i++) p.line(x - 14, y + i * 7, x + 14, y + i * 7);
        p.noStroke(); p.fill('#9a5534'); p.ellipse(x + 22, y + 10, 18, 20);
        break;
      case 'celeiro':
        p.fill('#8b6a48'); p.rect(x - 26, y - 4, 6, 18); p.rect(x + 20, y - 4, 6, 18);
        p.fill('#cdb07a'); p.rect(x - 30, y - 44, 60, 42, 4);
        p.fill('#a98249'); p.triangle(x - 36, y - 42, x + 36, y - 42, x, y - 70);
        p.fill('#e2c56b'); p.ellipse(x, y - 22, 20, 12);
        break;
      case 'tear':
        p.stroke('#7a5c40'); p.strokeWeight(4); p.line(x - 24, y + 14, x - 20, y - 46); p.line(x + 24, y + 14, x + 20, y - 46); p.line(x - 22, y - 42, x + 22, y - 42);
        p.strokeWeight(1); p.stroke('#e9dcc0'); for (let i = -16; i <= 16; i += 4) p.line(x + i, y - 40, x + i, y - 2);
        p.noStroke(); p.fill('#c27b5a'); p.rect(x - 17, y - 34, 34, 14); p.fill('#8b6a48'); for (let i = -12; i <= 12; i += 8) p.ellipse(x + i, y + 2, 7, 9);
        break;
      case 'menir':
        p.fill(255, 255, 255, 0); break; // desenhado no fundo
      case 'cromeleque': case 'anta': break; // desenhados no fundo
      case 'placa':
        p.fill('#6e7682'); p.beginShape(); p.vertex(x - 16, y + 20); p.vertex(x + 16, y + 20); p.vertex(x + 12, y - 22); p.vertex(x - 12, y - 22); p.endShape(p.CLOSE);
        p.stroke('#d2d7de'); p.strokeWeight(1.5);
        for (let i = 0; i < 4; i++) { const yy = y - 4 + i * 6; p.line(x - 12, yy, x - 4, yy - 4); p.line(x - 4, yy - 4, x + 4, yy); p.line(x + 4, yy, x + 12, yy - 4); }
        p.line(x - 6, y - 14, x + 6, y - 14); p.noStroke(); p.fill('#d2d7de'); p.ellipse(x, y - 18, 3, 3);
        break;
      case 'nilo':
        p.fill('#4f7c56'); for (let i = 0; i < 5; i++) { p.push(); p.translate(x - 20 + i * 10, y + 10); p.rotate((i - 2) * 0.15 + Math.sin(t + i) * 0.05); p.rect(-1.5, -34, 3, 34); p.ellipse(0, -36, 9, 14); p.pop(); }
        break;
      case 'barco': {
        const by = y + Math.sin(t * 1.4) * 2;
        p.fill('#a4774a'); p.arc(x, by, 110, 34, 0, Math.PI); p.stroke('#7a5536'); p.strokeWeight(3); p.line(x - 55, by, x - 64, by - 14); p.line(x + 55, by, x + 64, by - 14);
        p.line(x, by, x, by - 70); p.noStroke(); p.fill('#f5ecd7'); p.rect(x - 26, by - 66, 52, 50, 2);
        p.fill('#6b4f36'); p.ellipse(x + 30, by - 6, 8, 12);
        break; }
      case 'farao':
        p.fill('#d8c08c'); p.rect(x - 22, y + 4, 44, 14, 2);
        p.fill('#e6cf9c'); p.rect(x - 12, y - 46, 24, 50, 3);
        p.fill('#3f6f8a'); p.quad(x - 16, y - 50, x + 16, y - 50, x + 12, y - 30, x - 12, y - 30);
        p.fill('#e6cf9c'); p.ellipse(x, y - 52, 16, 18); p.fill('#c9a646'); p.rect(x - 2, y - 66, 4, 8);
        break;
      case 'escriba':
        p.fill('#f3ead8'); p.ellipse(x, y - 4, 30, 28); p.fill('#c58f63'); p.ellipse(x, y - 30, 16, 18); p.fill('#2f2f2f'); p.arc(x, y - 32, 18, 18, Math.PI, 0);
        p.fill('#efe0b0'); p.rect(x - 4, y - 10, 34, 12, 2); p.fill('#b44'); p.ellipse(x + 26, y - 4, 3, 3);
        p.fill('#555'); for (let i = 0; i < 4; i++) p.rect(x + 2 + i * 6, y - 7, 3, 5);
        break;
      case 'piramide': case 'templo': break; // no fundo
      case 'sarcofago':
        p.fill('#c9a646'); p.rect(x - 16, y - 38, 32, 60, 14, 14, 6, 6);
        p.fill('#3f6f8a'); p.rect(x - 14, y - 34, 28, 10, 8); p.fill('#e6cf9c'); p.ellipse(x, y - 22, 16, 16);
        p.stroke('#3f6f8a'); p.strokeWeight(2); for (let i = 0; i < 3; i++) p.line(x - 10, y - 6 + i * 7, x + 10, y - 6 + i * 7); p.noStroke();
        break;
      case 'navio': {
        const by = y + Math.sin(t * 1.2) * 2.5;
        p.fill('#8a5f3c'); p.arc(x, by, 170, 50, 0, Math.PI);
        p.fill('#7a5232'); p.ellipse(x + 84, by - 12, 14, 22); p.ellipse(x + 92, by - 22, 12, 9); // cabeça de cavalo
        p.stroke('#6b4a2e'); p.strokeWeight(4); p.line(x, by, x, by - 100); p.line(x - 40, by - 92, x + 40, by - 92);
        p.noStroke(); p.fill('#efe3c8'); p.rect(x - 38, by - 90, 76, 58); p.fill('#7a4a7e'); p.rect(x - 38, by - 72, 76, 8);
        p.fill('#c8a06a'); for (let i = -3; i <= 3; i++) p.ellipse(x + i * 18, by + 4, 10, 6);
        break; }
      case 'anforas':
        for (let i = 0; i < 4; i++) { const ax = x - 30 + i * 18; p.fill(i % 2 ? '#c27b5a' : '#b5683f'); p.ellipse(ax, y, 16, 34); p.rect(ax - 3, y - 26, 6, 10); p.triangle(ax - 4, y + 14, ax + 4, y + 14, ax, y + 24); }
        p.fill('#7a4a7e'); p.rect(x + 40, y - 6, 34, 22, 3); p.fill('#94609a'); p.rect(x + 40, y - 6, 34, 6, 3);
        break;
      case 'mapa':
        p.fill('#efe3c2'); p.rect(x - 34, y - 26, 68, 46, 3);
        p.fill('#9cc6d6'); p.ellipse(x, y - 4, 52, 24); p.fill('#cdb98e'); p.ellipse(x + 22, y - 4, 10, 18);
        p.stroke('#b44'); p.strokeWeight(1.5); p.line(x + 22, y - 6, x - 20, y - 2); p.noStroke(); p.fill('#b44'); for (const [dx, dy] of [[22, -6], [0, 4], [-20, -2]]) p.ellipse(x + dx, y + dy, 4, 4);
        p.fill('#8b6a48'); p.rect(x - 3, y + 20, 6, 30);
        break;
      case 'alfabeto':
        p.fill('#d8cdb4'); p.rect(x - 30, y - 26, 60, 40, 4);
        p.stroke('#5b4a3a'); p.strokeWeight(2); p.noFill();
        p.line(x - 20, y - 18, x - 12, y - 4); p.line(x - 20, y - 4, x - 10, y - 16); p.line(x - 22, y - 12, x - 12, y - 8); // aleph
        p.line(x - 2, y - 18, x - 2, y - 2); p.line(x - 2, y - 18, x + 6, y - 12); p.line(x + 6, y - 12, x - 2, y - 8); // beth
        p.line(x + 14, y - 18, x + 20, y - 4); p.line(x + 14, y - 18, x + 10, y - 8); // gimel
        p.noStroke(); p.fill('#8b6a48'); p.rect(x - 34, y + 14, 68, 6, 2);
        break;
      case 'rolo':
        p.fill('#efe3c2'); p.rect(x - 22, y - 18, 44, 32); p.fill('#c8a06a'); p.ellipse(x - 24, y - 2, 10, 38); p.ellipse(x + 24, y - 2, 10, 38);
        p.fill('#6b5a48'); for (let i = 0; i < 4; i++) p.rect(x - 16, y - 12 + i * 7, 32 - (i % 2) * 8, 2);
        p.fill('#d9d0bd'); p.ellipse(x + 46, y - 2, 22, 22); p.fill('#c58f63'); p.ellipse(x + 46, y - 22, 14, 16);
        break;
    }
    p.pop();
  },

  /* ---------- Pedra do Tempo (portal dos desafios) ---------- */
  pedraTempo(p, x, y, t, ativa, concluida, cor) {
    p.push(); p.noStroke();
    if (ativa) { const r = 70 + Math.sin(t * 3) * 6; p.fill(255, 220, 140, 70); p.ellipse(x, y - 34, r, r * 1.3); }
    p.fill(ativa ? '#c8b89a' : '#a99f8e'); p.rect(x - 22, y - 78, 44, 80, 22, 22, 6, 6);
    p.fill(0, 0, 0, 25); p.ellipse(x, y + 2, 60, 12);
    p.noFill(); p.stroke(concluida ? cor : (ativa ? '#e6b84a' : '#8a8273')); p.strokeWeight(3);
    p.beginShape();
    for (let a = 0; a < Math.PI * 5; a += 0.2) { const r = 1.6 * a; p.vertex(x + Math.cos(a + (ativa ? t : 0)) * r, y - 40 + Math.sin(a + (ativa ? t : 0)) * r); }
    p.endShape();
    if (!ativa && !concluida) { p.noStroke(); p.fill('#6f6758'); p.rect(x - 8, y - 22, 16, 12, 2); p.noFill(); p.stroke('#6f6758'); p.strokeWeight(2.5); p.arc(x, y - 22, 12, 14, Math.PI, 0); }
    p.pop();
  },

  /* ---------- personagem (viajante do tempo atual) ---------- */
  viajante(p, x, y, dir, passo, aAndar) {
    p.push(); p.translate(x, y); p.scale(dir, 1); p.noStroke();
    const s = aAndar ? Math.sin(passo) * 6 : 0;
    p.fill(0, 0, 0, 40); p.ellipse(0, 2, 36, 10);
    p.fill('#3d4b63'); p.rect(-8 + s * 0.4, -26, 7, 26, 3); p.rect(1 - s * 0.4, -26, 7, 26, 3);
    p.fill('#5c4033'); p.ellipse(-4 + s * 0.4, 0, 12, 6); p.ellipse(5 - s * 0.4, 0, 12, 6);
    p.fill('#2e7d78'); p.rect(-12, -58, 24, 34, 8);
    p.fill('#a0785a'); p.rect(-16, -52, 8, 22, 3); // mochila
    p.stroke('#7b5a40'); p.strokeWeight(2); p.line(-10, -56, 10, -30); p.noStroke();
    p.fill('#e7b98f'); p.ellipse(0, -70, 22, 24);
    p.fill('#4a3428'); p.arc(0, -74, 24, 20, Math.PI, 0);
    p.fill('#e8dcb8'); p.ellipse(0, -80, 34, 8); p.rect(-10, -90, 20, 10, 4); // chapéu
    p.fill('#2b2b2b'); p.ellipse(5, -70, 3, 3);
    p.fill('#f5e6b8'); p.rect(10, -50, 10, 13, 2); // caderno na mão
    p.pop();
  }
};
