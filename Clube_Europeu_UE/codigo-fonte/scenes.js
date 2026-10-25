/* Ilustrações geradas por código: postais, guias, carimbos e ícones */

const CEUS = {
  manha: ['#9BC4F0', '#FCE3B4'], dia: ['#5E9BE0', '#CFE4F7'], tarde: ['#F6A65B', '#FCE0B2'], noite: ['#1A2A6C', '#5A6FB5'], cinza: ['#8FA5C2', '#DDE5EF']
};
function ceu(id, tipo) {
  const [a, b] = CEUS[tipo];
  return `<defs><linearGradient id="ceu-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="600" height="240" fill="url(#ceu-${id})"/>`;
}
const sol = (x, y, r = 22, c = '#FFD25A') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".95"/>`;
const nuvem = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".85"><ellipse cx="0" cy="0" rx="28" ry="11"/><ellipse cx="18" cy="-7" rx="18" ry="11"/><ellipse cx="-14" cy="-5" rx="14" ry="9"/></g>`;
const rio = (y, c = '#3C7CC4') => `<path d="M0 ${y} Q150 ${y - 6} 300 ${y} T600 ${y} V240 H0Z" fill="${c}"/><path d="M40 ${y + 12} h40 M160 ${y + 22} h60 M330 ${y + 14} h50 M470 ${y + 26} h70" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>`;
const chao = (y, c) => `<rect y="${y}" width="600" height="${240 - y}" fill="${c}"/>`;
const bandeiraUE = (x, y, w = 26) => {
  const h = w * 2 / 3, cx = x + w / 2, cy = y + h / 2, r = h * .33;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#003399"/>`;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<circle cx="${(cx + r * Math.sin(a)).toFixed(1)}" cy="${(cy - r * Math.cos(a)).toFixed(1)}" r="${(w / 40).toFixed(2)}" fill="#FFCC00"/>`; }
  return s;
};
const mastro = (x, yBase, alt = 70) => `<line x1="${x}" y1="${yBase}" x2="${x}" y2="${yBase - alt}" stroke="#E6E9F0" stroke-width="2"/>` + bandeiraUE(x + 1, yBase - alt, 28);
const janelas = (x, y, cols, rows, dx, dy, w, h, c) => { let s = ''; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += `<rect x="${x + i * dx}" y="${y + j * dy}" width="${w}" height="${h}" fill="${c}"/>`; return s; };
const pinheiroManso = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-40" stroke="#5B3B24" stroke-width="5"/><ellipse cx="0" cy="-48" rx="34" ry="12" fill="#2F5D3A"/><ellipse cx="-10" cy="-54" rx="18" ry="8" fill="#3D7349"/></g>`;

const POSTAIS = {
  porto: () => ceu('porto', 'tarde') + sol(500, 70, 26, '#FFE08A') + nuvem(140, 50) +
    // casario da Ribeira em socalcos
    (() => { const cores = ['#E2563B', '#F2B544', '#3E7CB1', '#F4E1C1', '#7DB46C', '#D9824B', '#C9D6E8', '#B23A48', '#F2B544', '#5E8C61'];
      let s = '<path d="M0 150 L0 92 L120 110 L210 120 L210 160 Z" fill="#B88A5A"/>';
      for (let i = 0; i < 10; i++) { const x = i * 21, h = 30 + (i % 3) * 10, y = 150 - h - (10 - i) * 3; s += `<rect x="${x}" y="${y}" width="21" height="${h + (10 - i) * 3}" fill="${cores[i]}"/><path d="M${x} ${y} l10.5 -7 l10.5 7z" fill="#8E3B2E"/>` + janelas(x + 4, y + 6, 2, 3, 8, 10, 4, 6, '#2B2B3A'); }
      return s; })() +
    '<path d="M600 150 L600 60 L470 90 L380 130 L380 160Z" fill="#9C7A55"/>' +
    // Ponte Luiz I
    '<path d="M200 168 Q330 20 460 168" fill="none" stroke="#5B5F6B" stroke-width="9"/><path d="M215 168 Q330 40 445 168" fill="none" stroke="#5B5F6B" stroke-width="3"/>' +
    '<rect x="190" y="82" width="280" height="7" fill="#4A4E58"/><rect x="186" y="160" width="288" height="6" fill="#4A4E58"/>' +
    (() => { let s = ''; for (let x = 214; x <= 446; x += 18) { const t = (x - 200) / 260, y = 168 - 296 * t * (1 - t); if (y > 92) s += `<line x1="${x}" y1="89" x2="${x}" y2="${y.toFixed(0)}" stroke="#5B5F6B" stroke-width="2"/>`; if (y < 156) s += `<line x1="${x}" y1="${y.toFixed(0)}" x2="${x}" y2="160" stroke="#5B5F6B" stroke-width="1"/>`; } return s; })() +
    '<rect x="196" y="82" width="10" height="86" fill="#7A6A58"/><rect x="454" y="82" width="10" height="86" fill="#7A6A58"/>' +
    rio(172, '#2F6E9E') +
    // barco rabelo
    '<g transform="translate(300 196)"><path d="M-46 0 Q0 16 46 0 L40 -6 L-40 -6Z" fill="#5B3B24"/><rect x="-2" y="-52" width="3" height="46" fill="#3A2A1A"/><rect x="1" y="-50" width="30" height="34" fill="#F4EBDD"/><path d="M40 -6 l14 -8" stroke="#3A2A1A" stroke-width="3"/></g>',

  lisboa: () => ceu('lisboa', 'dia') + sol(510, 55) + nuvem(120, 45) + nuvem(380, 30, .8) +
    '<path d="M0 150 L80 140 L170 145 L170 160 L0 160Z" fill="#8FA36E"/>' +
    // Ponte 25 de Abril ao fundo
    '<g opacity=".7"><rect x="430" y="70" width="6" height="90" fill="#C0392B"/><rect x="560" y="70" width="6" height="90" fill="#C0392B"/><path d="M380 112 Q433 120 433 72 Q496 140 563 72 Q563 120 600 110" fill="none" stroke="#C0392B" stroke-width="2"/><rect x="380" y="118" width="220" height="4" fill="#C0392B"/></g>' +
    rio(160, '#3C86C6') +
    // Torre de Belém
    '<g transform="translate(250 0)"><rect x="-30" y="126" width="120" height="44" fill="#E9DFC8"/>' +
    janelas(-26, 118, 15, 1, 8, 0, 5, 8, '#E9DFC8') +
    '<rect x="10" y="62" width="44" height="66" fill="#EFE6D0"/>' + janelas(10, 54, 6, 1, 8, 0, 5, 8, '#EFE6D0') +
    '<path d="M24 128 v-14 a8 8 0 0 1 16 0 v14z" fill="#9A8C70"/><rect x="26" y="78" width="12" height="16" rx="6" fill="#9A8C70"/>' +
    '<circle cx="10" cy="64" r="4" fill="#D8CBAE"/><circle cx="54" cy="64" r="4" fill="#D8CBAE"/>' +
    '<path d="M-30 170 h120 v6 h-120z" fill="#C9BB9C"/></g>' +
    // elétrico
    '<g transform="translate(60 128)"><rect width="70" height="28" rx="4" fill="#F2C230"/><rect x="5" y="5" width="60" height="9" fill="#FFF6D6"/><line x1="35" y1="0" x2="45" y2="-14" stroke="#333"/><circle cx="15" cy="30" r="4" fill="#333"/><circle cx="55" cy="30" r="4" fill="#333"/></g>',

  paris: () => ceu('paris', 'manha') + sol(110, 60, 20, '#FFE7A0') + nuvem(470, 50) +
    '<path d="M0 175 L600 175 V240 H0Z" fill="#7FA86A"/>' +
    '<g fill="#6A6058"><rect x="20" y="130" width="120" height="45"/><rect x="420" y="125" width="160" height="50"/></g>' +
    janelas(28, 138, 10, 3, 11, 12, 6, 7, '#E8DCC4') + janelas(428, 133, 13, 3, 12, 13, 6, 7, '#E8DCC4') +
    '<path d="M20 130 l60 -12 l60 12z M420 125 l80 -14 l80 14z" fill="#4A5A7A"/>' +
    // Torre Eiffel
    '<g fill="none" stroke="#6B4F3A" stroke-width="3" stroke-linejoin="round"><path d="M300 22 L304 70 L318 125 L348 200 M300 22 L296 70 L282 125 L252 200"/><path d="M286 126 h28 M295 72 h10 M268 160 h64"/><path d="M262 200 Q300 150 338 200"/><path d="M300 22 V8"/></g>' +
    '<g stroke="#8A6B52" stroke-width="1" opacity=".7"><path d="M297 80 L310 120 M303 80 L290 120 M284 132 L330 180 M316 132 L270 180"/></g>' +
    rio(200, '#4F8FC8'),

  bruxelas: () => ceu('bruxelas', 'cinza') + nuvem(100, 40) + nuvem(470, 55, 1.2) + nuvem(300, 30, .7) +
    chao(190, '#A7B1BE') +
    // Berlaymont: corpo central e asas curvas
    '<path d="M110 190 V92 Q160 78 210 86 V190Z" fill="#C9D3DF"/><path d="M490 190 V92 Q440 78 390 86 V190Z" fill="#C9D3DF"/>' +
    '<rect x="210" y="70" width="180" height="120" fill="#D9E1EA"/>' +
    (() => { let s = ''; for (let y = 78; y < 188; y += 7) s += `<line x1="112" y1="${y + 6}" x2="488" y2="${y + 6}" stroke="#8C9BB0" stroke-width="2"/>`; return s; })() +
    '<rect x="210" y="62" width="180" height="10" fill="#B6C2D1"/>' +
    '<rect x="262" y="40" width="76" height="18" fill="#003399"/><text x="300" y="54" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFCC00">EUROPA</text>' +
    mastro(150, 214, 64) + mastro(190, 214, 64) + mastro(410, 214, 64) + mastro(450, 214, 64) +
    '<rect y="214" width="600" height="26" fill="#8C96A3"/>',

  haia: () => ceu('haia', 'dia') + sol(80, 50) + nuvem(330, 40) + nuvem(520, 60) +
    (() => { const cores = ['#8C3B2E', '#5A3A2A', '#A4553A', '#3D4A5C', '#7A2E2E', '#6B4A35'];
      let s = ''; for (let i = 0; i < 6; i++) { const x = 40 + i * 88, h = 100 + (i % 2) * 18, y = 180 - h, c = cores[i];
        s += `<rect x="${x}" y="${y}" width="80" height="${h}" fill="${c}"/>`;
        s += `<path d="M${x} ${y} h10 v-10 h10 v-10 h10 v-12 h20 v12 h10 v10 h10 v10 h10z" fill="${c}"/>`;
        s += janelas(x + 10, y + 10, 3, Math.floor(h / 30), 22, 28, 14, 18, '#F3E7C9'); }
      return s; })() +
    chao(180, '#6F7D8C') + rio(205, '#3F6E95') +
    // bicicletas
    [90, 250, 420].map(x => `<g transform="translate(${x} 176)" stroke="#1E2A3A" stroke-width="2" fill="none"><circle cx="0" cy="0" r="9"/><circle cx="28" cy="0" r="9"/><path d="M0 0 L10 -14 L24 -14 L28 0 M10 -14 L14 0 L24 -14 M8 -18 h6 M24 -14 l2 -6"/></g>`).join(''),

  maastricht: () => ceu('maastricht', 'tarde') + sol(470, 80, 26, '#FFE6A0') + nuvem(150, 45) +
    '<path d="M0 140 L600 140 V160 H0Z" fill="#8A7B6A"/>' +
    // torre da igreja de São Servácio e São João (vermelha)
    '<rect x="380" y="50" width="36" height="92" fill="#B8423A"/><path d="M380 50 l18 -30 l18 30z" fill="#7E2C26"/><rect x="392" y="70" width="12" height="20" fill="#5C201C"/>' +
    '<rect x="320" y="70" width="44" height="72" fill="#9A8A70"/><path d="M320 70 l22 -16 l22 16z" fill="#6E6150"/>' +
    janelas(30, 110, 9, 2, 32, 14, 14, 8, '#DCCAA8') +
    rio(170, '#4C7FA8') +
    // ponte de São Servácio, com arcos de pedra
    '<rect x="0" y="146" width="600" height="14" fill="#B49A78"/>' +
    [0, 1, 2, 3, 4, 5].map(i => `<path d="M${i * 100 + 6} 160 v20 h12 a38 30 0 0 1 76 0 h6 v-20z" fill="#A88C68"/>`).join(''),

  luxemburgo: () => ceu('luxemburgo', 'dia') + sol(540, 50) + nuvem(220, 40) +
    // colinas com vinhas
    '<path d="M0 150 Q120 70 260 120 T600 100 V170 H0Z" fill="#7DA35A"/>' +
    (() => { let s = ''; for (let i = 0; i < 9; i++) s += `<path d="M${20 + i * 26} ${150 - i * 3} q30 -30 60 -20" stroke="#4F7A35" stroke-width="2" fill="none"/>`; return s; })() +
    // torres douradas do Tribunal de Justiça
    '<rect x="440" y="40" width="26" height="100" fill="#C9A43A"/><rect x="474" y="40" width="26" height="100" fill="#B8932C"/>' +
    janelas(444, 46, 3, 12, 7, 8, 4, 4, '#F2DC92') + janelas(478, 46, 3, 12, 7, 8, 4, 4, '#E5CC7C') +
    rio(168, '#4A86B8') +
    // barco Princesse Marie-Astrid
    '<g transform="translate(220 188)"><path d="M-80 0 L80 0 L66 18 L-70 18Z" fill="#F7F7F2"/><rect x="-60" y="-18" width="110" height="18" fill="#FFFFFF" stroke="#2A4A7A"/>' + janelas(-54, -13, 9, 1, 12, 0, 7, 7, '#2A4A7A') +
    '<rect x="-30" y="-32" width="50" height="14" fill="#FFFFFF" stroke="#2A4A7A"/><line x1="40" y1="-18" x2="40" y2="-48" stroke="#333"/>' + bandeiraUE(41, -48, 22) + '<path d="M-80 8 H80" stroke="#003399" stroke-width="3"/></g>',

  estrasburgo: () => ceu('estrasburgo', 'manha') + sol(90, 60, 20, '#FFE7A0') + nuvem(300, 35) +
    // catedral ao fundo
    '<g fill="#B48A82" opacity=".75"><rect x="40" y="100" width="70" height="70"/><rect x="70" y="40" width="16" height="60"/><path d="M70 40 l8 -28 l8 28z"/></g>' +
    // edifício Louise Weiss: torre elíptica e fachada curva de vidro
    '<path d="M300 180 V60 Q300 40 360 40 Q420 40 420 60 V180Z" fill="#7FA8C9"/>' +
    (() => { let s = ''; for (let y = 52; y < 180; y += 9) s += `<line x1="302" y1="${y}" x2="418" y2="${y}" stroke="#B9D3E8"/>`; for (let x = 312; x < 420; x += 12) s += `<line x1="${x}" y1="48" x2="${x}" y2="180" stroke="#5E88AC" stroke-width=".8"/>`; return s; })() +
    '<path d="M300 60 L296 34 L330 38 Z" fill="#9BBAD4"/>' +
    '<path d="M150 180 Q280 120 460 140 L560 180Z" fill="#A9C6DE"/>' +
    mastro(500, 180, 60) + mastro(530, 180, 60) +
    rio(186, '#4E86B5'),

  frankfurt: () => ceu('frankfurt', 'tarde') + sol(80, 80, 24, '#FFE0A0') +
    // horizonte
    [[150, 60, 40], [200, 90, 30], [240, 40, 34], [280, 110, 26], [520, 70, 36], [560, 100, 30]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${190 - y}" fill="#55657E"/>` + janelas(x + 4, y + 6, Math.floor(w / 9), Math.floor((190 - y) / 12), 9, 12, 4, 6, '#F5D28A')).join('') +
    // torres do BCE
    '<path d="M330 190 L338 34 L372 40 L368 190Z" fill="#8FB0CF"/><path d="M372 190 L376 40 L410 30 L408 190Z" fill="#6E93B8"/><rect x="320" y="150" width="100" height="40" fill="#A9C2DA"/>' +
    (() => { let s = ''; for (let y = 46; y < 150; y += 8) s += `<line x1="338" y1="${y}" x2="408" y2="${y - 3}" stroke="#C8DAEA" stroke-width=".8"/>`; return s; })() +
    // escultura do euro
    '<g transform="translate(470 150)"><text x="0" y="0" font-family="Georgia, serif" font-size="78" font-weight="700" fill="#1F4BB8" text-anchor="middle">€</text>' +
    [...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<circle cx="${(Math.sin(a) * 40).toFixed(1)}" cy="${(-26 - Math.cos(a) * 40).toFixed(1)}" r="3.2" fill="#FFCC00"/>`; }).join('') + '</g>' +
    chao(190, '#556070') + rio(205, '#3C6C98'),

  praga: () => ceu('praga', 'noite') + `<g fill="#fff">${[[60, 30], [140, 60], [220, 20], [420, 40], [560, 25], [500, 70], [300, 55]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4"/>`).join('')}</g>` +
    // satélite Galileo
    '<g transform="translate(470 50) rotate(-18)"><rect x="-8" y="-8" width="16" height="16" fill="#D8D8E0"/><rect x="-46" y="-6" width="34" height="12" fill="#2F55B8" stroke="#9DB3EA"/><rect x="12" y="-6" width="34" height="12" fill="#2F55B8" stroke="#9DB3EA"/><circle cx="0" cy="12" r="4" fill="#FFCC00"/></g>' +
    '<path d="M470 66 L430 140 M470 66 L500 140" stroke="#FFCC00" stroke-opacity=".35" stroke-dasharray="3 5"/>' +
    // castelo e catedral na colina
    '<path d="M0 130 Q150 90 330 112 L330 150 H0Z" fill="#2B3566"/>' +
    '<g fill="#3E4A80"><rect x="60" y="96" width="200" height="28"/><rect x="150" y="58" width="16" height="40"/><path d="M150 58 l8 -24 l8 24z"/><rect x="180" y="70" width="10" height="28"/><path d="M180 70 l5 -16 l5 16z"/></g>' +
    janelas(68, 104, 16, 1, 12, 0, 5, 7, '#F7D57A') +
    rio(170, '#24356E') +
    // Ponte Carlos com torre gótica
    '<rect x="0" y="160" width="600" height="10" fill="#57524A"/>' + [0, 1, 2, 3, 4, 5].map(i => `<path d="M${i * 100 + 10} 170 v14 h10 a30 22 0 0 1 60 0 h10 v-14z" fill="#4A463F"/>`).join('') +
    '<rect x="380" y="110" width="40" height="52" fill="#4A463F"/><path d="M380 110 l20 -34 l20 34z" fill="#36332D"/><path d="M394 162 v-18 a6 6 0 0 1 12 0 v18z" fill="#24356E"/>' +
    [60, 140, 220, 300, 470, 540].map(x => `<line x1="${x}" y1="160" x2="${x}" y2="146" stroke="#F7D57A"/><circle cx="${x}" cy="145" r="3" fill="#F7D57A"/>`).join(''),

  varsovia: () => ceu('varsovia', 'dia') + sol(520, 55) + nuvem(110, 40) + nuvem(380, 60, .8) +
    // Palácio da Cultura e Ciência
    '<g fill="#C9B79A"><rect x="250" y="120" width="100" height="70"/><rect x="265" y="86" width="70" height="40"/><rect x="278" y="58" width="44" height="32"/><rect x="288" y="36" width="24" height="26"/><path d="M296 36 L300 4 L304 36z"/></g>' +
    janelas(256, 128, 9, 4, 10, 14, 5, 8, '#8C7B62') + janelas(270, 92, 6, 2, 11, 14, 5, 8, '#8C7B62') +
    '<g fill="#B8A487"><rect x="200" y="150" width="50" height="40"/><rect x="350" y="150" width="50" height="40"/></g>' +
    // casas do centro histórico
    (() => { const c = ['#E7B04A', '#C85A44', '#7BA6C7', '#E9D8B4', '#9BB86A']; let s = ''; for (let i = 0; i < 5; i++) { s += `<rect x="${20 + i * 34}" y="140" width="34" height="50" fill="${c[i]}"/><path d="M${20 + i * 34} 140 l17 -14 l17 14z" fill="#7A3C2E"/>`; } for (let i = 0; i < 4; i++) { s += `<rect x="${430 + i * 38}" y="136" width="38" height="54" fill="${c[(i + 2) % 5]}"/><path d="M${430 + i * 38} 136 l19 -14 l19 14z" fill="#7A3C2E"/>`; } return s; })() +
    chao(190, '#8C9A7A') + rio(210, '#4A7DB0'),

  zagreb: () => ceu('zagreb', 'dia') + sol(80, 55) + nuvem(480, 45) +
    // catedral com duas torres
    '<g fill="#D9D2C2" opacity=".85"><rect x="440" y="50" width="20" height="110"/><rect x="480" y="50" width="20" height="110"/><path d="M440 50 l10 -40 l10 40z M480 50 l10 -40 l10 40z"/><rect x="430" y="110" width="80" height="50"/></g>' +
    // Igreja de São Marcos com telhado em xadrez
    '<rect x="200" y="110" width="190" height="80" fill="#EDE6D6"/><path d="M190 112 L295 52 L400 112Z" fill="#B23A2E"/>' +
    (() => { let s = '<clipPath id="tz"><path d="M190 112 L295 52 L400 112Z"/></clipPath><g clip-path="url(#tz)">'; for (let i = 0; i < 26; i++) for (let j = 0; j < 8; j++) if ((i + j) % 2) s += `<rect x="${190 + i * 8}" y="${52 + j * 8}" width="8" height="8" fill="#F4F1EA"/>`; return s + '</g>'; })() +
    '<rect x="196" y="64" width="22" height="48" fill="#EDE6D6"/><path d="M196 64 l11 -22 l11 22z" fill="#2E6B3A"/>' +
    '<path d="M282 190 v-36 a13 13 0 0 1 26 0 v36z" fill="#6B5A44"/>' + janelas(222, 128, 3, 1, 22, 0, 8, 18, '#6B5A44') + janelas(332, 128, 3, 1, 18, 0, 8, 18, '#6B5A44') +
    chao(190, '#B9AE98') + '<path d="M0 190 H600" stroke="#9C9078"/>',

  roma: () => ceu('roma', 'tarde') + sol(500, 70, 28, '#FFE2A0') + nuvem(140, 40) +
    pinheiroManso(60, 180, 1.1) + pinheiroManso(560, 180, 1) +
    // Coliseu
    '<path d="M150 190 V80 Q300 52 450 80 V190Z" fill="#D9B98A"/><path d="M380 72 Q420 76 450 82 V120 L420 110 Q400 96 380 100Z" fill="#C7A06A"/>' +
    (() => { let s = ''; for (let row = 0; row < 3; row++) for (let i = 0; i < 12; i++) { const x = 158 + i * 24, y = 92 + row * 32; s += `<path d="M${x} ${y + 24} v-14 a8 8 0 0 1 16 0 v14z" fill="#8C6A42"/>`; } return s; })() +
    '<path d="M150 116 H450 M150 148 H450" stroke="#C09A68" stroke-width="3"/>' +
    chao(190, '#C9B58A')
};

/* Converte as cores das ilustrações para um duotom azul com acento dourado */
const RAMPA = [[0, [35, 70, 127]], [.35, [72, 116, 190]], [.6, [143, 176, 227]], [.82, [201, 218, 244]], [1, [244, 248, 254]]];
function tomAzul(hex) {
  let h = hex.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  // amarelos e laranjas quentes passam a dourado (sol, estrelas, euro)
  const sat = (mx - mn) / (mx || 1); if (g > 140 && b < 190 && ((r > 235 && sat > .3) || (r > 190 && sat > .6))) return '#F1D57A';
  if (h.toUpperCase() === '003399') return '#2459A2';
  if (h.toUpperCase() === 'FFFFFF') return '#FFFFFF';
  let l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  l = Math.min(1, Math.max(0, (l - .15) / .8));
  for (let i = 1; i < RAMPA.length; i++) {
    if (l <= RAMPA[i][0]) { const [a0, c0] = RAMPA[i - 1], [a1, c1] = RAMPA[i], t = (l - a0) / (a1 - a0);
      return '#' + c0.map((v, k) => Math.round(v + (c1[k] - v) * t).toString(16).padStart(2, '0')).join(''); }
  }
  return '#F4F8FE';
}
const CACHE_POSTAIS = {};
function postal(id) {
  if (!CACHE_POSTAIS[id]) {
    const f = POSTAIS[id];
    let svg = f ? f() : '';
    svg = svg.replace(/#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b/g, tomAzul);
    // céu claro e uniforme, como no estilo do clube
    svg = svg.replace(/<linearGradient id="ceu-[^"]+"[^>]*>.*?<\/linearGradient>/, m => m.replace(/stop-color="[^"]+"/g, (x, i) => x).replace(/<stop offset="0" stop-color="[^"]+"/, '<stop offset="0" stop-color="#E6EFFD"').replace(/<stop offset="1" stop-color="[^"]+"/, '<stop offset="1" stop-color="#F6F9FE"'));
    CACHE_POSTAIS[id] = svg;
  }
  return `<svg viewBox="0 0 600 240" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">${CACHE_POSTAIS[id]}</svg>`;
}

/* Guias: monograma sóbrio */
function avatar(g, tam = 56) {
  const ini = g.nome.replace('Professora ', '').split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();
  let est = '';
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; est += `<circle cx="${(28 + 24 * Math.sin(a)).toFixed(1)}" cy="${(28 - 24 * Math.cos(a)).toFixed(1)}" r="1.3" fill="#DFBD54"/>`; }
  return `<svg viewBox="0 0 56 56" width="${tam}" height="${tam}" aria-hidden="true"><circle cx="28" cy="28" r="28" fill="#EAF2FF"/>${est}<circle cx="28" cy="28" r="19" fill="#2459A2"/><text x="28" y="33.5" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="15" fill="#fff">${ini}</text></svg>`;
}

/* Ícones */
const ICONE = {
  comboio: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 3h12a3 3 0 0 1 3 3v9a3 3 0 0 1-2.2 2.9L20 20v1h-2l-1.5-3h-9L6 21H4v-1l1.2-2.1A3 3 0 0 1 3 15V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v5h14V6a1 1 0 0 0-1-1H6Zm1.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>',
  aviao: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21 15.5v-2l-8-5V3.8a1.5 1.5 0 0 0-3 0V8.5l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5Z"/></svg>',
  som: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9h4l5-4v14l-5-4H4zM16 8.5a5 5 0 0 1 0 7l-1.4-1.4a3 3 0 0 0 0-4.2zM18.4 6a8.5 8.5 0 0 1 0 12L17 16.6a6.5 6.5 0 0 0 0-9.2z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4v16l13-8z"/></svg>',
  stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>',
  video: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3l4-3v12l-4-3v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  ligacao: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14zM5 5h6v2H6v11h11v-5h2v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>',
  cadeado: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z"/></svg>',
  certo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z"/></svg>',
  errado: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.3 7.1 16.9 5.7 12 10.6 7.1 5.7 5.7 7.1l4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9z"/></svg>',
  ajuda: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 14a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm0-10a4 4 0 0 0-4 4h2a2 2 0 1 1 3 1.7c-1.2.7-2 1.5-2 3.3h2c0-1 .4-1.4 1.1-1.9A4 4 0 0 0 12 6Z"/></svg>'
};

/* Carimbos do passaporte */
const TINTAS = ['#2459A2', '#AD8016', '#1F3F7A', '#3A6FC0', '#8A6512', '#2D4E86'];
function carimbo(p, i, info) {
  const tinta = TINTAS[i % TINTAS.length];
  const rot = ((i * 37) % 22) - 11;
  const forma = i % 3;
  const nome = p.cidade.length > 13 ? p.cidade.split(' ')[0] : p.cidade;
  const data = info && info.data ? new Date(info.data).toLocaleDateString('pt-PT') : '';
  const modo = info && info.modo ? (info.modo === 'comboio' ? ICONE.comboio : ICONE.aviao) : '';
  let moldura;
  if (forma === 0) moldura = `<circle cx="60" cy="60" r="54" fill="none" stroke="${tinta}" stroke-width="3"/><circle cx="60" cy="60" r="46" fill="none" stroke="${tinta}" stroke-width="1.2"/>`;
  else if (forma === 1) moldura = `<rect x="8" y="18" width="104" height="84" rx="10" fill="none" stroke="${tinta}" stroke-width="3"/><rect x="14" y="24" width="92" height="72" rx="6" fill="none" stroke="${tinta}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  else moldura = `<path d="M60 6 L108 33 V87 L60 114 L12 87 V33Z" fill="none" stroke="${tinta}" stroke-width="3"/><path d="M60 14 L101 37 V83 L60 106 L19 83 V37Z" fill="none" stroke="${tinta}" stroke-width="1.2"/>`;
  let estrelas = '';
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; estrelas += `<circle cx="${(60 + 13 * Math.sin(a)).toFixed(1)}" cy="${(37 - 13 * Math.cos(a)).toFixed(1)}" r="1.5" fill="${tinta}"/>`; }
  return `<svg viewBox="0 0 120 120" class="carimbo" style="--rot:${rot}deg" aria-label="Carimbo de ${p.cidade}" role="img">
    <g opacity=".9">${moldura}${estrelas}
    <text x="60" y="68" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-weight="700" font-size="${nome.length > 9 ? 11 : 13}" fill="${tinta}" letter-spacing="1">${nome.toUpperCase()}</text>
    <text x="60" y="81" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="8" fill="${tinta}">${p.pais.toUpperCase()}</text>
    <text x="60" y="94" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="8" fill="${tinta}">${data}</text>
    ${modo ? `<g transform="translate(52 96) scale(.65)" color="${tinta}">${modo}</g>` : ''}</g></svg>`;
}
