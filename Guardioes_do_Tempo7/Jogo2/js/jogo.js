/* =========================================================
   Guardiões do Tempo — motor do jogo
   p5.js (modo de instância) para a cena; Bootstrap para a interface.
   ========================================================= */
(() => {
  'use strict';
  const CHAVE = 'guardioes-do-tempo-v1';
  const ERA_IDS = ERAS.map(e => e.id).concat('arquivo');
  const $ = s => document.querySelector(s);
  const reduzirMov = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- estado ---------------- */
  const estadoInicial = () => ({
    eraAtual: 0, eraMax: 0, encontrados: {}, desafios: {}, selos: [],
    pontos: 0, constr: { neo: 0, mega: 0, egito: 0 }, final: false
  });
  let E = estadoInicial();
  function guardar() { try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) {} }
  function carregar() { try { const s = localStorage.getItem(CHAVE); if (s) { const o = JSON.parse(s); if (o && typeof o.eraAtual === 'number') return Object.assign(estadoInicial(), o); } } catch (e) {} return null; }

  const totalObjetos = ERAS.reduce((n, e) => n + e.objetos.length, 0);
  const todosDesafios = ERAS.flatMap(e => e.desafios).concat(DESAFIO_FINAL);
  const PONTOS_MAX = totalObjetos * 10 + todosDesafios.length * 100;

  const eraDados = () => ERAS[E.eraAtual] || null;
  const eraId = () => ERA_IDS[E.eraAtual];
  const pistasEra = era => era.objetos.filter(o => E.encontrados[o.id]).length;
  const desafiosFeitos = era => era.desafios.filter(d => E.desafios[d.id] && E.desafios[d.id].ok).length;
  const eraCompleta = era => desafiosFeitos(era) === era.desafios.length;
  const pedraAtiva = () => { const era = eraDados(); return era ? pistasEra(era) === era.objetos.length : E.selos.length === ERAS.length; };

  function anunciar(txt) { const a = $('#anuncio'); a.textContent = ''; setTimeout(() => { a.textContent = txt; }, 30); }
  function baralhar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const semTags = s => String(s).replace(/<[^>]+>/g, '');

  /* ---------------- modais ---------------- */
  function mostrarModal(id) {
    const alvo = document.getElementById(id);
    const aberto = document.querySelector('.modal.show');
    const abrir = () => bootstrap.Modal.getOrCreateInstance(alvo).show();
    if (aberto && aberto !== alvo) { aberto.addEventListener('hidden.bs.modal', abrir, { once: true }); bootstrap.Modal.getInstance(aberto).hide(); }
    else abrir();
  }
  function fecharModal(id) { const m = bootstrap.Modal.getInstance(document.getElementById(id)); if (m) m.hide(); }
  const algoAberto = () => !!document.querySelector('.modal.show, .modal.fade[style*="display: block"], .offcanvas.show, .offcanvas.showing') || !$('#ecraInicio').hidden;

  /* ---------------- selos (SVG) ---------------- */
  function seloSVG(id, cor, tam = 40, apagado = false) {
    const c = apagado ? '#cfc8b8' : cor, l = apagado ? '#a59d8c' : '#fffaf0';
    const desenhos = {
      paleo: `<polygon points="20,7 29,20 26,32 14,32 11,20" fill="${l}"/>`,
      neo: `<line x1="20" y1="34" x2="20" y2="10" stroke="${l}" stroke-width="2"/>${[12, 17, 22, 27].map(y => `<ellipse cx="16" cy="${y}" rx="3" ry="5" fill="${l}"/><ellipse cx="24" cy="${y}" rx="3" ry="5" fill="${l}"/>`).join('')}`,
      mega: `<rect x="15" y="8" width="10" height="24" rx="5" fill="${l}"/><line x1="9" y1="32" x2="31" y2="32" stroke="${l}" stroke-width="2"/>`,
      egito: `<circle cx="20" cy="11" r="4" fill="${l}"/><ellipse cx="20" cy="23" rx="7" ry="9" fill="${l}"/><path d="M12 18 L7 15 M12 24 L6 25 M12 29 L8 33 M28 18 L33 15 M28 24 L34 25 M28 29 L32 33" stroke="${l}" stroke-width="1.8"/>`,
      porto: `<path d="M13 10 L24 30 M12 28 L26 12 M10 18 L27 23" stroke="${l}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`
    };
    return `<svg width="${tam}" height="${tam}" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><circle cx="20" cy="20" r="19" fill="${c}" stroke="${apagado ? '#b9b1a0' : '#e6c98a'}" stroke-width="2"/>${desenhos[id] || ''}</svg>`;
  }

  /* ---------------- interface: barra da época ---------------- */
  function atualizarInterface() {
    const era = eraDados();
    $('#eraNome').textContent = era ? era.nome : 'O Arquivo do Tempo';
    $('#eraPeriodo').textContent = era ? `${era.periodo} · ${era.quando}` : 'Junta os cinco selos para abrir a porta';
    $('#eraPaginas').textContent = era ? `Sebenta: ${era.paginas}` : 'Sebenta: síntese, p. 12';
    $('#legendaCena').textContent = era ? era.cenaLegenda : 'Ilustração estilizada de um arquivo imaginário.';
    if (era) {
      const p = pistasEra(era), n = era.objetos.length;
      $('#rotPistas').textContent = 'Pistas';
      $('#contPistas').textContent = `${p}/${n}`;
      $('#contDesafios').textContent = `${desafiosFeitos(era)}/${era.desafios.length}`;
      $('#objetivo').textContent = p < n ? era.objetivo : (eraCompleta(era) ? 'Época concluída! Usa a linha do tempo para avançar.' : 'Todas as pistas recolhidas! Vai até à Pedra do Tempo.');
    } else {
      $('#rotPistas').textContent = 'Selos'; $('#contPistas').textContent = `${E.selos.length}/5`;
      $('#contDesafios').textContent = E.final ? '1/1' : '0/1';
      $('#objetivo').textContent = E.final ? 'Missão cumprida! Podes rever o caderno ou jogar de novo.' : 'Vai até à porta do Arquivo e coloca os selos por ordem cronológica.';
    }
    $('#contPontos').textContent = E.pontos;
    // selos
    $('#selos').innerHTML = ERAS.map(e => `<span class="selo-mini" title="${esc(e.selo.nome)}${E.selos.includes(e.id) ? '' : ' (por conquistar)'}">${seloSVG(e.id, e.selo.cor, 28, !E.selos.includes(e.id))}</span>`).join('') +
      `<span class="visually-hidden">${E.selos.length} de 5 selos conquistados</span>`;
    // linha do tempo
    $('#linhaTempo').innerHTML = ERA_IDS.map((id, i) => {
      const nome = ERAS[i] ? ERAS[i].periodo.split(' — ')[0].replace(' e Calcolítico', '') : 'Arquivo';
      const curto = ['Paleolítico', 'Neolítico', 'Megalitismo', 'Egito', 'Fenícios e Hebreus', 'Arquivo'][i];
      const bloqueada = i > E.eraMax, atual = i === E.eraAtual;
      const feito = ERAS[i] ? E.selos.includes(id) : E.final;
      return `<li><button type="button" class="btn btn-sm marco ${atual ? 'atual' : ''} ${feito ? 'feito' : ''}" data-era="${i}" ${bloqueada ? 'disabled' : ''}
        aria-label="${esc(curto)}${bloqueada ? ' (bloqueada)' : ''}${atual ? ' (época atual)' : ''}${feito ? ' (concluída)' : ''}" ${atual ? 'aria-current="step"' : ''}>
        <span class="marco-num" aria-hidden="true">${feito ? '✓' : (bloqueada ? '🔒' : i + 1)}</span><span class="marco-txt">${esc(curto)}</span></button></li>`;
    }).join('');
    // lista acessível de objetos
    const lista = era ? era.objetos.map(o => `<button type="button" class="btn btn-sm ${E.encontrados[o.id] ? 'btn-outline-success' : 'btn-outline-primary'}" data-obj="${o.id}">
        ${E.encontrados[o.id] ? '✓ ' : ''}${esc(o.nome)}</button>`).join('') : '';
    const ativa = pedraAtiva();
    const rotPedra = era ? 'Pedra do Tempo (desafios)' : 'Porta do Arquivo (desafio final)';
    $('#listaObjetos').innerHTML = lista + `<button type="button" class="btn btn-sm ${ativa ? 'btn-warning' : 'btn-outline-secondary'}" data-obj="__pedra" ${ativa ? '' : 'aria-disabled="true"'}>
      ${ativa ? '✦ ' : '🔒 '}${rotPedra}</button>`;
    $('#btnContinuarEra').hidden = !(era && eraCompleta(era) && E.eraAtual < ERA_IDS.length - 1);
    $('#btnContinuarEra').textContent = E.eraAtual === ERAS.length - 1 ? 'Ir para o Arquivo do Tempo →' : 'Viajar para a época seguinte →';
    if (sk) sk.descricao();
  }

  /* ---------------- pistas ---------------- */
  const ROT_TIPO = { facto: ['Facto', 'text-bg-success'], hipotese: ['Hipótese', 'text-bg-warning'], interpretacao: ['Interpretação', 'text-bg-info'] };
  function abrirPista(obj) {
    const nova = !E.encontrados[obj.id];
    if (nova) { E.encontrados[obj.id] = true; E.pontos += 10; guardar(); Som.efeito('pista'); }
    const [rt, ct] = ROT_TIPO[obj.tipo];
    $('#pistaTitulo').textContent = obj.titulo;
    $('#pistaCorpo').innerHTML = `
      <p class="mb-2"><span class="badge ${ct}">${rt}</span> ${nova ? '<span class="badge text-bg-light border">+10 pontos · nova pista no caderno</span>' : ''}</p>
      <p>${obj.texto}</p>
      ${obj.nota ? `<div class="olhar"><strong>🔎 Olhar de historiador:</strong> ${obj.nota}</div>` : ''}
      <p class="small text-body-secondary mt-3 mb-0">📖 Sebenta, ${esc(obj.pagina)} · Aprendizagem: ${esc(APRENDIZAGENS[obj.ae])}</p>`;
    mostrarModal('modalPista');
    const era = eraDados();
    anunciar(nova ? `Nova pista: ${obj.nome}. ${pistasEra(era)} de ${era.objetos.length} pistas.` : `Pista: ${obj.nome}.`);
    atualizarInterface();
    if (nova && pistasEra(era) === era.objetos.length) {
      $('#modalPista').addEventListener('hidden.bs.modal', () => anunciar('Recolheste todas as pistas! A Pedra do Tempo está ativa.'), { once: true });
    }
  }

  /* ---------------- desafios ---------------- */
  let desafioAtual = null, resolvido = false, rascunho = null;
  function proximoDesafio() {
    const era = eraDados();
    if (!era) return E.final ? null : DESAFIO_FINAL;
    return era.desafios.find(d => !(E.desafios[d.id] && E.desafios[d.id].ok)) || null;
  }
  function usarPedra() {
    if (!pedraAtiva()) {
      const era = eraDados();
      if (era) { const f = era.objetos.length - pistasEra(era); anunciar(`A Pedra do Tempo ainda está fechada. Faltam ${f} pista${f > 1 ? 's' : ''}.`); mostrarMsgCena(`Faltam ${f} pista${f > 1 ? 's' : ''} para ativar a Pedra do Tempo.`); }
      else { anunciar('Precisas dos cinco selos para abrir a porta.'); mostrarMsgCena('Precisas dos cinco selos para abrir a porta.'); }
      return;
    }
    const d = proximoDesafio();
    if (d) abrirDesafio(d);
    else if (eraDados()) mostrarSelo(eraDados(), false);
    else mostrarFim();
  }
  function regDesafio(id) { return E.desafios[id] || (E.desafios[id] = { tentativas: 0, erros: 0, ok: false, pontos: 0 }); }

  function abrirDesafio(d) {
    desafioAtual = d; resolvido = false;
    const reg = regDesafio(d.id);
    const era = eraDados();
    const posicao = era ? `${era.desafios.indexOf(d) + 1} de ${era.desafios.length}` : 'final';
    $('#desafioTitulo').textContent = d.titulo;
    $('#desafioSub').textContent = `${era ? era.nome : 'Arquivo do Tempo'} · desafio ${posicao}`;
    $('#desafioAE').innerHTML = `<strong>Aprendizagem:</strong> ${esc(APRENDIZAGENS[d.ae])} <span class="text-body-secondary">· 📖 Sebenta, ${esc(d.pagina)}</span>`;
    $('#desafioEnunciado').innerHTML = d.enunciado;
    $('#desafioFeedback').innerHTML = '';
    $('#btnVerificar').hidden = d.tipo === 'decisoes';
    $('#btnSeguinte').hidden = true;
    if (d.tipo === 'ordenar') rascunho = { ordem: baralharDiferente(d.itens) };
    if (d.tipo === 'classificar') rascunho = { esc: d.itens.map(() => null), ordem: baralhar(d.itens.map((_, i) => i)) };
    if (d.tipo === 'associar') rascunho = { esc: d.pares.map(() => ''), defs: baralhar(d.pares.map(p => p.def)) };
    if (d.tipo === 'decisoes') rascunho = { passo: 0, bloqueadas: [], certo: false, escolhida: null };
    if (d.id === 'e1') { E.constr.egito = 1; if (sk) sk.refazerFundo(); }
    desenharDesafio(); mostrarModal('modalDesafio');
  }
  function baralharDiferente(itens) { let o; do { o = baralhar(itens); } while (itens.length > 1 && o.every((x, i) => x === itens[i])); return o; }

  function desenharDesafio(marcas) {
    const d = desafioAtual, c = $('#desafioCorpo');
    if (d.tipo === 'ordenar') {
      c.innerHTML = `<ol class="list-unstyled lista-ordenar" aria-label="Itens a ordenar">${rascunho.ordem.map((it, i) => {
        const m = marcas ? (marcas[i] ? 'certo' : 'errado') : '';
        return `<li class="item-ordenar ${m}" data-i="${i}">
          <span class="ordem-num" aria-hidden="true">${i + 1}</span>
          <span class="flex-grow-1">${esc(it)}${marcas && marcas[i] && d.datas ? ` <span class="small text-body-secondary">(${esc(d.datas[d.itens.indexOf(it)])})</span>` : ''}</span>
          ${m ? `<span class="visually-hidden">${m === 'certo' ? 'posição certa' : 'posição errada'}</span><span aria-hidden="true" class="marca">${m === 'certo' ? '✓' : '✗'}</span>` : ''}
          <span class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" data-mover="-1" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Subir «${esc(it)}»">↑</button>
            <button type="button" class="btn btn-outline-secondary" data-mover="1" data-i="${i}" ${i === rascunho.ordem.length - 1 ? 'disabled' : ''} aria-label="Descer «${esc(it)}»">↓</button>
          </span></li>`;
      }).join('')}</ol>
      <p class="small text-body-secondary mb-0">${d.id === 'e2' ? '1 = topo da pirâmide.' : '1 = o mais antigo.'}</p>`;
    } else if (d.tipo === 'classificar') {
      c.innerHTML = `<div class="vstack gap-2">${rascunho.ordem.map(idx => {
        const it = d.itens[idx], sel = rascunho.esc[idx];
        const m = marcas && marcas[idx] !== undefined ? (marcas[idx] ? 'certo' : 'errado') : '';
        return `<div class="item-classificar ${m}" role="group" aria-label="${esc(it.t)}">
          <div class="mb-1">${m ? `<span aria-hidden="true" class="marca">${m === 'certo' ? '✓' : '✗'}</span> ` : ''}${esc(it.t)}${m ? `<span class="visually-hidden"> — ${m === 'certo' ? 'certo' : 'revê esta escolha'}</span>` : ''}</div>
          <div class="d-flex flex-wrap gap-1">${d.categorias.map((cat, ci) => `<button type="button" class="btn btn-sm ${sel === ci ? 'btn-primary' : 'btn-outline-primary'}" data-classe="${ci}" data-item="${idx}" aria-pressed="${sel === ci}">${esc(cat)}</button>`).join('')}</div>
        </div>`;
      }).join('')}</div>`;
    } else if (d.tipo === 'associar') {
      c.innerHTML = `<div class="vstack gap-2">${d.pares.map((p, i) => {
        const m = marcas ? (marcas[i] ? 'certo' : 'errado') : '';
        return `<div class="item-classificar ${m}"><label class="form-label mb-1 fw-semibold" for="assoc${i}">${m ? `<span aria-hidden="true" class="marca">${m === 'certo' ? '✓' : '✗'}</span> ` : ''}${esc(p.termo)}</label>
          <select class="form-select" id="assoc${i}" data-assoc="${i}"><option value="">— Escolhe —</option>
          ${rascunho.defs.map(df => `<option ${rascunho.esc[i] === df ? 'selected' : ''}>${esc(df)}</option>`).join('')}</select></div>`;
      }).join('')}</div>`;
    } else if (d.tipo === 'decisoes') {
      const p = d.passos[rascunho.passo];
      c.innerHTML = `<div class="d-flex justify-content-between align-items-center mb-2"><span class="badge text-bg-secondary">Decisão ${rascunho.passo + 1} de ${d.passos.length}</span>
        <div class="progress flex-grow-1 ms-3" role="progressbar" aria-label="Progresso das decisões" aria-valuenow="${rascunho.passo + (rascunho.certo ? 1 : 0)}" aria-valuemin="0" aria-valuemax="${d.passos.length}" style="height:8px"><div class="progress-bar bg-warning" style="width:${(rascunho.passo + (rascunho.certo ? 1 : 0)) / d.passos.length * 100}%"></div></div></div>
        <figure class="vista mb-2"><img id="vistaCena" alt="${esc(VISTAS[d.id] ? VISTAS[d.id](rascunho) : '')}"><figcaption class="small text-body-secondary">A cena muda com as tuas decisões.</figcaption></figure>
        <p class="situacao">${p.sit}</p>
        <div class="vstack gap-2" role="group" aria-label="Opções">${p.op.map((o, i) => `<button type="button" class="btn btn-opcao text-start ${rascunho.bloqueadas.includes(i) ? 'riscada' : ''} ${rascunho.escolhida === i ? 'certo' : ''}" data-op="${i}" ${rascunho.bloqueadas.includes(i) || rascunho.certo ? 'disabled' : ''}>${rascunho.escolhida === i ? '✓ ' : ''}${esc(o.t)}</button>`).join('')}</div>`;
      atualizarVista();
    }
  }

  function verificar() {
    const d = desafioAtual, reg = regDesafio(d.id);
    let marcas, certos = 0, total;
    if (d.tipo === 'ordenar') {
      marcas = rascunho.ordem.map((it, i) => it === d.itens[i]); total = d.itens.length;
    } else if (d.tipo === 'classificar') {
      const falta = rascunho.esc.filter(x => x === null).length;
      if (falta) { feedback('info', `Ainda falta${falta > 1 ? 'm' : ''} classificar ${falta} afirmaç${falta > 1 ? 'ões' : 'ão'}.`); return; }
      marcas = {}; d.itens.forEach((it, i) => { marcas[i] = rascunho.esc[i] === it.c; }); total = d.itens.length;
    } else if (d.tipo === 'associar') {
      const falta = rascunho.esc.filter(x => !x).length;
      if (falta) { feedback('info', `Ainda falta${falta > 1 ? 'm' : ''} associar ${falta} termo${falta > 1 ? 's' : ''}.`); return; }
      marcas = d.pares.map((p, i) => rascunho.esc[i] === p.def); total = d.pares.length;
    }
    certos = Object.values(marcas).filter(Boolean).length;
    reg.tentativas++;
    desenharDesafio(marcas);
    if (certos === total) sucesso(reg);
    else {
      Som.efeito('tenta');
      feedback('warning', `<strong>Quase!</strong> Tens ${certos} de ${total} certo${certos === 1 ? '' : 's'}. Os itens marcados com ✗ precisam de ser revistos.${reg.tentativas >= 1 && d.dica ? `<br><span class="small">💡 Dica: ${d.dica}</span>` : ''}<br><span class="small">Podes consultar o caderno de descobertas sem perder o que já fizeste.</span>`);
      guardar();
    }
  }
  function pontosDe(reg, tipo) {
    if (tipo === 'decisoes') return reg.erros === 0 ? 100 : reg.erros <= 2 ? 70 : 40;
    return reg.tentativas <= 1 ? 100 : reg.tentativas === 2 ? 70 : 40;
  }
  function sucesso(reg) {
    const d = desafioAtual;
    resolvido = true;
    const primeira = !reg.ok;
    if (primeira) { reg.ok = true; reg.pontos = pontosDe(reg, d.tipo); E.pontos += reg.pontos; }
    Som.efeito('certo');
    feedback('success', `${d.explicacao}<div class="small mt-2">📖 Sebenta, ${esc(d.pagina)}${primeira ? ` · <strong>+${reg.pontos} pontos</strong>` : ''}</div>`);
    $('#btnVerificar').hidden = true;
    const btn = $('#btnSeguinte'); btn.hidden = false;
    btn.textContent = 'Continuar →';
    btn.focus();
    anunciar('Desafio resolvido! ' + semTags(d.explicacao).slice(0, 160));
    guardar(); atualizarInterface();
  }
  function feedback(tipo, html) {
    const f = $('#desafioFeedback');
    f.innerHTML = `<div class="alert alert-${tipo} mb-0" role="${tipo === 'warning' ? 'alert' : 'status'}">${html}</div>`;
    f.scrollIntoView({ block: 'nearest', behavior: reduzirMov ? 'auto' : 'smooth' });
  }
  function escolherOpcao(i) {
    const d = desafioAtual, reg = regDesafio(d.id), p = d.passos[rascunho.passo], o = p.op[i];
    if (o.ok) {
      rascunho.certo = true; rascunho.escolhida = i;
      Som.efeito('certo');
      construir(d.id, rascunho.passo + 1);
      desenharDesafio();
      const ultimo = rascunho.passo === d.passos.length - 1;
      if (ultimo) { reg.tentativas++; sucessoDecisoes(o.f); }
      else {
        feedback('success', `<strong>Boa decisão!</strong> ${o.f}`);
        const b = $('#btnSeguinte'); b.hidden = false; b.textContent = 'Decisão seguinte →'; b.focus();
      }
    } else {
      reg.erros++; rascunho.bloqueadas.push(i); Som.efeito('tenta');
      desenharDesafio();
      feedback('warning', `<strong>Pensa outra vez.</strong> ${o.f}<br><span class="small">Escolhe outra opção.</span>`);
      guardar();
    }
  }
  function sucessoDecisoes(ultimaF) {
    const reg = regDesafio(desafioAtual.id);
    sucesso(reg);
    const f = $('#desafioFeedback .alert');
    f.insertAdjacentHTML('afterbegin', `<p class="mb-2"><strong>Boa decisão!</strong> ${ultimaF}</p><hr>`);
  }
  function construir(id, nivel) {
    if (id === 'n2') E.constr.neo = Math.max(E.constr.neo, nivel);
    if (id === 'm2') E.constr.mega = Math.max(E.constr.mega, nivel);
    if (sk) sk.refazerFundo();
    guardar();
  }
  function seguinte() {
    const d = desafioAtual;
    if (d.tipo === 'decisoes' && !resolvido) {
      rascunho.passo++; rascunho.bloqueadas = []; rascunho.certo = false; rascunho.escolhida = null;
      if (d.id === 'e1') { E.constr.egito = Math.min(3, rascunho.passo + 1); if (sk) sk.refazerFundo(); }
      $('#btnSeguinte').hidden = true; $('#desafioFeedback').innerHTML = '';
      desenharDesafio();
      const b = document.querySelector('#desafioCorpo .btn-opcao'); if (b) b.focus();
      return;
    }
    if (d.id === 'e1') { E.constr.egito = 0; if (sk) sk.refazerFundo(); }
    if (d === DESAFIO_FINAL) { E.final = true; guardar(); atualizarInterface(); mostrarFim(); return; }
    const prox = proximoDesafio();
    if (prox) abrirDesafio(prox);
    else concluirEra();
  }

  // vista da cena dentro do desafio (para veres a construção a acontecer)
  const VISTAS = {
    n2: r => ['A aldeia com duas cabanas e um pequeno campo.', 'O campo de cereais aumentou.', 'Surgiu mais uma cabana e fumo das lareiras.', 'A aldeia tem mais cabanas e vasos de cerâmica.', 'Um caminho liga agora a aldeia a uma aldeia vizinha.'][E.constr.neo] || '',
    m2: r => ['Blocos de pedra deitados no chão.', 'Os esteios estão de pé.', 'A laje de cobertura está sobre os esteios.', 'A anta está coberta pela mamoa.'][E.constr.mega] || '',
    e1: r => ['', 'O Nilo transbordou e cobre os campos.', 'A água recuou; os campos estão verdes.', 'O rio está baixo e os cereais estão dourados.'][E.constr.egito] || ''
  };
  function atualizarVista() {
    if (!sk) return;
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => {
      const img = document.getElementById('vistaCena'); if (!img) return;
      img.src = sk.instantaneo();
      if (desafioAtual && VISTAS[desafioAtual.id]) img.alt = VISTAS[desafioAtual.id](rascunho);
    }, 60)));
  }

  /* ---------------- selos e épocas ---------------- */
  function concluirEra() {
    const era = eraDados();
    const novo = !E.selos.includes(era.id);
    if (novo) { E.selos.push(era.id); E.eraMax = Math.max(E.eraMax, E.eraAtual + 1); Som.efeito('selo'); }
    guardar(); atualizarInterface();
    mostrarSelo(era, novo);
  }
  function mostrarSelo(era, novo) {
    const aes = [...new Set(era.objetos.map(o => o.ae).concat(era.desafios.map(d => d.ae)))].sort();
    $('#seloTitulo').textContent = novo ? `Conquistaste o ${era.selo.nome}!` : era.selo.nome;
    $('#seloCorpo').innerHTML = `<div class="text-center mb-3 selo-grande">${seloSVG(era.id, era.selo.cor, 96)}</div>
      <p class="text-center">Concluíste a época <strong>${esc(era.nome)}</strong> (${esc(era.periodo)}).</p>
      <h3 class="h6">Nesta época trabalhaste:</h3>
      <ul class="small">${aes.map(a => `<li>${esc(APRENDIZAGENS[a])}</li>`).join('')}</ul>
      <p class="small text-body-secondary mb-0">Tudo o que descobriste está guardado no caderno de descobertas.</p>`;
    $('#btnSeloAvancar').textContent = E.eraAtual === ERAS.length - 1 ? 'Ir para o Arquivo do Tempo →' : 'Viajar para a época seguinte →';
    mostrarModal('modalSelo');
  }
  function irParaEra(i, mostrarIntro = true) {
    if (i > E.eraMax || i < 0 || i >= ERA_IDS.length) return;
    E.eraAtual = i; guardar();
    if (sk) sk.entrarEra();
    Som.definirEra(i);
    atualizarInterface();
    if (mostrarIntro) mostrarIntroEra();
  }
  function mostrarIntroEra() {
    const era = eraDados();
    if (era) {
      $('#introTitulo').textContent = era.nome;
      $('#introCorpo').innerHTML = `<p class="text-uppercase small fw-semibold text-body-secondary mb-1">${esc(era.periodo)} · ${esc(era.quando)}</p>
        <p>${era.intro}</p><div class="alert alert-light border mb-0"><strong>Objetivo:</strong> ${esc(era.objetivo)}</div>
        <p class="small text-body-secondary mt-2 mb-0">📖 Para apoio, consulta a sebenta, ${esc(era.paginas)}.</p>`;
    } else {
      $('#introTitulo').textContent = 'O Arquivo do Tempo';
      $('#introCorpo').innerHTML = `<p>Regressaste ao Arquivo com os cinco selos. A porta só se abre se os colocares pela ordem certa, do mais antigo para o mais recente.</p>
        <div class="alert alert-light border mb-0"><strong>Objetivo:</strong> vai até à porta e resolve o desafio final.</div>`;
    }
    mostrarModal('modalIntro');
  }

  /* ---------------- caderno ---------------- */
  function desenharCaderno() {
    const blocos = ERAS.map((era, i) => {
      const achados = era.objetos.filter(o => E.encontrados[o.id]);
      const conteudo = achados.length ? achados.map(o => {
        const [rt, ct] = ROT_TIPO[o.tipo];
        return `<article class="entrada"><h4 class="h6 mb-1">${esc(o.titulo)} <span class="badge ${ct} align-middle">${rt}</span></h4>
          <p class="small mb-1">${o.texto}</p>${o.nota ? `<p class="small olhar mb-1">🔎 ${o.nota}</p>` : ''}
          <p class="small text-body-secondary mb-0">📖 Sebenta, ${esc(o.pagina)}</p></article>`;
      }).join('') : '<p class="small text-body-secondary">Ainda não recolheste pistas nesta época.</p>';
      return `<section class="mb-3"><h3 class="h6 d-flex align-items-center gap-2">${seloSVG(era.id, era.selo.cor, 24, !E.selos.includes(era.id))} ${esc(era.nome)} <span class="badge text-bg-light border">${achados.length}/${era.objetos.length}</span></h3>${i > E.eraMax ? '<p class="small text-body-secondary">🔒 Época ainda por visitar.</p>' : conteudo}</section>`;
    }).join('');
    $('#cadDescobertas').innerHTML = blocos;
    const todos = [...new Set(ERAS.flatMap(e => e.objetos.flatMap(o => o.conceitos)))];
    const ganhos = new Set(ERAS.flatMap(e => e.objetos.filter(o => E.encontrados[o.id]).flatMap(o => o.conceitos)));
    $('#cadConceitos').innerHTML = `<p class="small">Conceitos das Aprendizagens Essenciais que já encontraste nas pistas (${ganhos.size}/${todos.length}):</p>
      <div class="d-flex flex-wrap gap-2">${todos.map(c => `<span class="badge rounded-pill ${ganhos.has(c) ? 'text-bg-primary' : 'text-bg-light border text-body-tertiary'}">${ganhos.has(c) ? '' : '🔒 '}${esc(c)}</span>`).join('')}</div>`;
    $('#cadAprendizagens').innerHTML = `<ul class="list-unstyled">${Object.entries(APRENDIZAGENS).map(([k, v]) => {
      const ds = todosDesafios.filter(d => d.ae === k), ok = ds.filter(d => E.desafios[d.id] && E.desafios[d.id].ok).length;
      const obs = ERAS.flatMap(e => e.objetos).filter(o => o.ae === k), oo = obs.filter(o => E.encontrados[o.id]).length;
      const feito = (ds.length ? ok === ds.length : true) && oo === obs.length;
      return `<li class="mb-2 small"><span aria-hidden="true">${feito ? '✅' : '◻️'}</span> ${esc(v)}<br><span class="text-body-secondary">Pistas ${oo}/${obs.length} · desafios ${ok}/${ds.length}</span></li>`;
    }).join('')}</ul>`;
    $('#cadNotas').innerHTML = `<p class="small">Pontos da sebenta que merecem atenção, verificados em fontes científicas e institucionais:</p>
      ${NOTAS_RIGOR.map(n => `<div class="small mb-2"><strong>${esc(n.t)}:</strong> ${esc(n.d)}</div>`).join('')}`;
  }

  /* ---------------- conclusão ---------------- */
  function mostrarFim() {
    const pct = E.pontos / PONTOS_MAX;
    const estrelas = pct >= 0.85 ? 3 : pct >= 0.6 ? 2 : 1;
    const primeira = todosDesafios.filter(d => E.desafios[d.id] && E.desafios[d.id].ok && E.desafios[d.id].pontos === 100).length;
    const nPistas = Object.keys(E.encontrados).length;
    $('#fimCorpo').innerHTML = `
      <div class="text-center mb-3"><div class="estrelas" aria-label="${estrelas} de 3 estrelas">${'★'.repeat(estrelas)}<span class="apagada">${'★'.repeat(3 - estrelas)}</span></div>
      <p class="display-6 fw-semibold mb-0">${E.pontos} <span class="fs-5 text-body-secondary">/ ${PONTOS_MAX} pontos</span></p>
      <p class="mb-0">${estrelas === 3 ? 'Excelente trabalho de historiador!' : estrelas === 2 ? 'Muito bem! Podes ainda melhorar à primeira tentativa.' : 'Concluíste a missão! Revê o caderno e tenta de novo para melhorar.'}</p></div>
      <div class="row g-2 text-center mb-3">
        <div class="col-4"><div class="stat"><strong>${nPistas}/${totalObjetos}</strong><span>pistas</span></div></div>
        <div class="col-4"><div class="stat"><strong>${primeira}/${todosDesafios.length}</strong><span>desafios à 1.ª</span></div></div>
        <div class="col-4"><div class="stat"><strong>${E.selos.length}/5</strong><span>selos</span></div></div>
      </div>
      <h3 class="h6">Aprendizagens trabalhadas nesta sessão</h3>
      <ul class="small">${Object.values(APRENDIZAGENS).map(v => `<li>${esc(v)}</li>`).join('')}</ul>
      <h3 class="h6">Para rever antes do teste</h3>
      <p class="small mb-0">Tenta responder às 10 perguntas de autoavaliação da sebenta (p. 12). Usa o caderno de descobertas para confirmar as tuas respostas.</p>`;
    mostrarModal('modalFim');
  }

  function recomecar() {
    E = estadoInicial();
    try { localStorage.removeItem(CHAVE); } catch (e) {}
    if (sk) { sk.entrarEra(); }
    atualizarInterface();
    fecharModal('modalRecomecar'); fecharModal('modalFim');
    $('#btnContinuar').hidden = true; $('#btnComecar').textContent = 'Começar a aventura';
    ecraInicial(true);
  }

  /* ---------------- mensagem curta na cena ---------------- */
  let msgCena = '', msgFim = 0;
  function mostrarMsgCena(t) { msgCena = t; msgFim = performance.now() + 3200; }

  /* ---------------- p5: cena interativa ---------------- */
  let sk = null;
  const teclas = new Set();

  function criarSketch() {
    return new p5(p => {
      let escala = 1, fundo = null, precisaFundo = true, t = 0, hover = null, fade = 0;
      const jog = { x: 70, y: 470, dir: 1, passo: 0, alvo: null, alvoObj: null, aAndar: false };

      function cfg() { return CENA_CFG[eraId()]; }
      function pontoAcesso(x, y) { const [a, b] = cfg().andar; return [x, Math.max(a, Math.min(b, y + 8))]; }
      function alvos() {
        const era = eraDados(), l = [];
        if (era) era.objetos.forEach(o => l.push({ id: o.id, nome: o.nome, x: o.x, y: o.y, obj: o }));
        const [px, py] = cfg().porta;
        l.push({ id: '__pedra', nome: era ? 'Pedra do Tempo' : 'Porta do Arquivo', x: px, y: era ? py - 30 : py });
        return l;
      }
      function maisProximo() {
        let m = null, md = 78;
        for (const a of alvos()) { const [ax, ay] = pontoAcesso(a.x, a.y); const d = Math.hypot(jog.x - ax, jog.y - ay); if (d < md) { md = d; m = a; } }
        return m;
      }
      function interagir(a) {
        if (!a) return;
        if (a.id === '__pedra') usarPedra(); else abrirPista(a.obj);
      }
      function irPara(a) {
        const [ax, ay] = pontoAcesso(a.x, a.y);
        jog.alvo = [ax - (ax > jog.x ? 26 : -26) * 0, ay]; jog.alvoObj = a;
      }

      p.setup = () => {
        const cont = document.getElementById('cena');
        const c = p.createCanvas(10, 10); c.parent(cont);
        c.elt.setAttribute('role', 'img');
        p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
        p.textFont('system-ui, -apple-system, "Segoe UI", Roboto, sans-serif');
        ajustar();
        entrar();
        c.elt.addEventListener('pointerdown', ev => {
          if (algoAberto()) return;
          const r = c.elt.getBoundingClientRect();
          const x = (ev.clientX - r.left) / escala, y = (ev.clientY - r.top) / escala;
          document.getElementById('cena').focus({ preventScroll: true });
          const a = alvoEm(x, y);
          if (a) { const [ax, ay] = pontoAcesso(a.x, a.y); if (Math.hypot(jog.x - ax, jog.y - ay) < 78) interagir(a); else irPara(a); }
          else { const [a1, b1] = cfg().andar; jog.alvo = [Math.max(20, Math.min(LARG - 20, x)), Math.max(a1, Math.min(b1, y))]; jog.alvoObj = null; }
        });
        c.elt.addEventListener('pointermove', ev => {
          const r = c.elt.getBoundingClientRect();
          hover = alvoEm((ev.clientX - r.left) / escala, (ev.clientY - r.top) / escala);
          c.elt.style.cursor = hover ? 'pointer' : 'default';
        });
        c.elt.addEventListener('pointerleave', () => { hover = null; });
      };
      function alvoEm(x, y) {
        let m = null, md = 46;
        for (const a of alvos()) {
          const ay = a.id === '__pedra' ? a.y - 10 : (['pintura', 'cromeleque', 'piramide', 'templo', 'menir', 'anta'].includes(a.id) ? a.y - 20 : a.y - 6);
          const raio = Math.max(['cromeleque', 'piramide', 'navio', 'menir'].includes(a.id) ? 80 : 46, 20 / escala);
          const d = Math.hypot(x - a.x, (y - ay) * 0.9);
          if (d < raio && d < md + (raio - 46)) { md = d; m = a; }
        }
        return m;
      }
      function ajustar() {
        const cont = document.getElementById('cena');
        const w = cont.clientWidth;
        let h = w * ALT / LARG;
        const maxH = Math.max(240, window.innerHeight - 300);
        let ww = w; if (h > maxH) { h = maxH; ww = h * LARG / ALT; }
        p.resizeCanvas(Math.floor(ww), Math.floor(h));
        escala = ww / LARG; precisaFundo = true;
        Cenas.ampliar = Math.min(2.2, Math.max(1, 0.62 / escala));
      }
      p.windowResized = ajustar;
      function entrar() {
        const [x, y] = cfg().inicio; jog.x = x; jog.y = y; jog.alvo = null; jog.alvoObj = null; jog.dir = 1;
        precisaFundo = true; fade = 1;
      }
      function refazer() {
        if (fundo) fundo.remove();
        fundo = p.createGraphics(p.width, p.height);
        fundo.push(); fundo.scale(escala);
        Cenas.fundo(fundo, eraId(), E.constr);
        fundo.pop();
        precisaFundo = false;
      }

      p.draw = () => {
        const dt = Math.min(0.05, p.deltaTime / 1000 || 0.016);
        if (!reduzirMov) t += dt; else t += dt * 0.15;
        if (precisaFundo || !fundo) refazer();
        p.image(fundo, 0, 0, p.width, p.height);
        p.push(); p.scale(escala);
        const id = eraId();
        // camadas animadas
        if (['neo', 'mega', 'egito', 'porto'].includes(id)) Cenas.nuvens(p, t, 170);
        if (id === 'egito') Cenas.nilo(p, E.constr, t);
        if (id === 'porto') { p.stroke(255, 255, 255, 80); p.strokeWeight(2); for (let i = 0; i < 14; i++) { const x = (i * 83 + t * 10) % LARG, y = 300 + (i % 5) * 22; p.line(x, y, x + 20, y); } p.noStroke(); }
        if (id === 'mega') Cenas.antaEmObra(p, 545, 478, E.constr.mega);
        if (id === 'neo' && E.constr.neo >= 2) { p.noStroke(); for (let i = 0; i < 3; i++) { p.fill(240, 240, 240, 60 - i * 15); p.ellipse(470 + Math.sin(t + i) * 6, 290 - i * 18 - (t * 8 % 18), 18 + i * 8, 14 + i * 6); } }
        // atualizar jogador
        mover(dt);
        // objetos e jogador ordenados por profundidade
        const lista = alvos().map(a => ({ tipo: 'a', y: a.y, a })).concat([{ tipo: 'j', y: jog.y }]);
        lista.sort((u, v) => u.y - v.y);
        const perto = algoAberto() ? null : maisProximo();
        for (const it of lista) {
          if (it.tipo === 'j') { Cenas.viajante(p, jog.x, jog.y, jog.dir, jog.passo, jog.aAndar); continue; }
          const a = it.a;
          if (a.id === '__pedra') {
            if (id === 'arquivo') desenharPorta(a);
            else { const era = eraDados(); Cenas.pedraTempo(p, a.x, a.y + 30, t, pedraAtiva() && !eraCompleta(era), eraCompleta(era), era.selo.cor); }
          } else {
            Cenas.objeto(p, a.id, a.x, a.y, t);
            if (!E.encontrados[a.id]) indicador(a);
            else { p.noStroke(); p.fill('#2e8b57'); p.ellipse(a.x + 22, a.y - 30, 16, 16); p.fill('#fff'); p.textAlign(p.CENTER, p.CENTER); p.textSize(11); p.text('✓', a.x + 22, a.y - 29); }
          }
        }
        // rótulos
        const mostrar = hover || perto;
        if (mostrar) {
          const ly = mostrar.id === '__pedra' ? mostrar.y - (id === 'arquivo' ? 150 : 70) : mostrar.y - 52;
          Cenas.rotulo(p, mostrar.nome, mostrar.x, Math.max(20, ly));
        }
        if (perto) {
          const t2 = perto.id === '__pedra' ? (pedraAtiva() ? `E / Enter — usar: ${perto.nome}` : `${perto.nome} — fechada`) : `E / Enter — investigar: ${perto.nome}`;
          Cenas.rotulo(p, t2, LARG / 2, ALT - 22, true);
        }
        if (msgCena && performance.now() < msgFim) Cenas.rotulo(p, msgCena, LARG / 2, 30, true);
        if (fade > 0) { p.noStroke(); p.fill(250, 245, 235, fade * 255); p.rect(0, 0, LARG, ALT); fade = Math.max(0, fade - dt * 1.6); }
        p.pop();
      };

      function indicador(a) {
        const pul = reduzirMov ? 0 : Math.sin(t * 3 + a.x) * 3;
        const yy = a.y - 34 - (['pintura'].includes(a.id) ? 10 : 0) - (['cromeleque', 'anta', 'menir'].includes(a.id) ? 60 : 0) - (a.id === 'piramide' ? 90 : 0) - (a.id === 'templo' ? 70 : 0) - (a.id === 'navio' ? 60 : 0) - (a.id === 'farao' ? 40 : 0);
        const k = Cenas.ampliar;
        p.noStroke(); p.fill(255, 214, 120, 90); p.ellipse(a.x, yy, (30 + pul) * k, (30 + pul) * k);
        p.fill('#e6b84a'); p.ellipse(a.x, yy, 22 * k, 22 * k); p.fill('#fff'); p.textAlign(p.CENTER, p.CENTER); p.textSize(14 * k); p.textStyle(p.BOLD); p.text('?', a.x, yy + 1); p.textStyle(p.NORMAL);
      }
      function desenharPorta(a) {
        const aberta = E.final;
        p.noStroke();
        if (aberta) { p.fill(255, 240, 200); p.rect(350, 140, 260, 260, 130, 130, 0, 0); p.fill(255, 225, 160, 120 + Math.sin(t * 2) * 40); p.ellipse(480, 300, 240, 200); }
        ERAS.forEach((era, i) => {
          const x = 400 + i * 40, y = 220;
          p.fill(E.selos.includes(era.id) ? era.selo.cor : 'rgba(0,0,0,0.25)'); p.ellipse(x, y, 30, 30);
          p.noFill(); p.stroke('#e6c98a'); p.strokeWeight(2); p.ellipse(x, y, 30, 30); p.noStroke();
        });
        if (pedraAtiva() && !aberta) { p.fill(255, 214, 120, 60 + Math.sin(t * 3) * 30); p.ellipse(480, 220, 230, 60); }
      }

      function mover(dt) {
        let dx = 0, dy = 0;
        if (!algoAberto()) {
          if (teclas.has('ArrowLeft') || teclas.has('a')) dx -= 1;
          if (teclas.has('ArrowRight') || teclas.has('d')) dx += 1;
          if (teclas.has('ArrowUp') || teclas.has('w')) dy -= 1;
          if (teclas.has('ArrowDown') || teclas.has('s')) dy += 1;
        }
        const vel = 200 * dt;
        if (dx || dy) { jog.alvo = null; jog.alvoObj = null; const n = Math.hypot(dx, dy); jog.x += dx / n * vel; jog.y += dy / n * vel * 0.7; }
        else if (jog.alvo && !algoAberto()) {
          const ddx = jog.alvo[0] - jog.x, ddy = jog.alvo[1] - jog.y, d = Math.hypot(ddx, ddy);
          const lim = jog.alvoObj ? 40 : 3;
          if (d <= Math.max(lim, vel)) {
            if (!jog.alvoObj) { jog.x = jog.alvo[0]; jog.y = jog.alvo[1]; }
            const a = jog.alvoObj; jog.alvo = null; jog.alvoObj = null; if (a) interagir(a);
          } else { dx = ddx / d; dy = ddy / d; jog.x += dx * vel; jog.y += dy * vel; }
        }
        const [a1, b1] = cfg().andar;
        jog.x = Math.max(20, Math.min(LARG - 20, jog.x)); jog.y = Math.max(a1, Math.min(b1, jog.y));
        jog.aAndar = !!(dx || dy);
        if (dx) jog.dir = dx > 0 ? 1 : -1;
        if (jog.aAndar) jog.passo += dt * 12;
      }

      p.keyPressed = () => {}; // teclado tratado no documento
      // API para o resto do jogo
      p.refazerFundo = () => { precisaFundo = true; };
      p.entrarEra = entrar;
      p.interagirPerto = () => { const a = maisProximo(); if (a) { interagir(a); return true; } return false; };
      p.descricao = () => {
        const era = eraDados(), cv = document.querySelector('#cena canvas');
        if (!cv) return;
        cv.setAttribute('aria-label', era
          ? `Cena: ${era.nome}. ${era.cenaLegenda} Objetos: ${era.objetos.map(o => o.nome + (E.encontrados[o.id] ? ' (investigado)' : '')).join(', ')}. Usa as setas para te deslocares ou os botões abaixo da cena.`
          : 'Cena: o Arquivo do Tempo, com uma porta de cinco selos. Usa os botões abaixo da cena.');
      };
      p.estadoJogador = () => ({ ...jog });
      p.instantaneo = () => { try { return p.canvas.toDataURL('image/jpeg', 0.82); } catch (e) { return ''; } };
      p.irParaObjeto = idObj => { const a = alvos().find(x => x.id === idObj); if (a) irPara(a); };
    });
  }

  /* ---------------- teclado ---------------- */
  const MOV = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'd', 'w', 's'];
  function emCampo(el) { return el && (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) || el.isContentEditable); }
  document.addEventListener('keydown', ev => {
    if (emCampo(document.activeElement) || algoAberto()) return;
    const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
    const naCena = document.activeElement === document.body || document.activeElement === $('#cena');
    if (MOV.includes(k)) {
      if (k.length > 1 || naCena || !document.activeElement.closest('button,a')) { teclas.add(k); if (naCena || k.startsWith('Arrow')) ev.preventDefault(); }
      return;
    }
    if (k === 'e' || ((k === 'Enter' || k === ' ') && naCena)) { if (sk && sk.interagirPerto()) ev.preventDefault(); return; }
    if (k === 'c') { abrirCaderno(); ev.preventDefault(); }
    if (k === 'h' || k === '?') { mostrarModal('modalAjuda'); }
  });
  document.addEventListener('keyup', ev => { const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key; teclas.delete(k); });
  window.addEventListener('blur', () => teclas.clear());

  function abrirCaderno() { desenharCaderno(); bootstrap.Offcanvas.getOrCreateInstance('#caderno').show(); }

  /* ---------------- ligações da interface ---------------- */
  function ligar() {
    $('#btnComecar').addEventListener('click', () => { const g = E; if (Object.keys(g.encontrados).length) { E = estadoInicial(); guardar(); } comecar(); });
    $('#btnContinuar').addEventListener('click', comecar);
    $('#btnCaderno').addEventListener('click', abrirCaderno);
    $('#btnAjuda').addEventListener('click', () => mostrarModal('modalAjuda'));
    $('#btnSom').addEventListener('click', () => mostrarModal('modalSom'));
    $('#btnRecomecar').addEventListener('click', () => mostrarModal('modalRecomecar'));
    $('#btnConfirmarRecomecar').addEventListener('click', recomecar);
    $('#btnJogarDeNovo').addEventListener('click', recomecar);
    $('#btnFimCaderno').addEventListener('click', () => { fecharModal('modalFim'); $('#modalFim').addEventListener('hidden.bs.modal', abrirCaderno, { once: true }); });
    $('#btnVerificar').addEventListener('click', verificar);
    $('#btnSeguinte').addEventListener('click', seguinte);
    $('#btnSeloAvancar').addEventListener('click', () => irParaEra(E.eraAtual + 1));
    $('#btnContinuarEra').addEventListener('click', () => irParaEra(E.eraAtual + 1));
    $('#linhaTempo').addEventListener('click', ev => { const b = ev.target.closest('[data-era]'); if (b && !b.disabled) irParaEra(+b.dataset.era); });
    $('#listaObjetos').addEventListener('click', ev => {
      const b = ev.target.closest('[data-obj]'); if (!b) return;
      if (b.dataset.obj === '__pedra') { usarPedra(); return; }
      const o = eraDados().objetos.find(x => x.id === b.dataset.obj); if (o) abrirPista(o);
    });
    $('#desafioCorpo').addEventListener('click', ev => {
      const m = ev.target.closest('[data-mover]');
      if (m) {
        const i = +m.dataset.i, j = i + +m.dataset.mover, o = rascunho.ordem;[o[i], o[j]] = [o[j], o[i]];
        Som.efeito('clique'); desenharDesafio(); $('#desafioFeedback').innerHTML = '';
        const alvo = document.querySelector(`#desafioCorpo [data-i="${j}"][data-mover="${m.dataset.mover}"]`) || document.querySelector(`#desafioCorpo [data-i="${j}"][data-mover]`);
        if (alvo) alvo.focus();
        anunciar(`«${o[j]}» passou para a posição ${j + 1}.`);
        return;
      }
      const c = ev.target.closest('[data-classe]');
      if (c) {
        const it = +c.dataset.item; rascunho.esc[it] = +c.dataset.classe; Som.efeito('clique');
        desenharDesafio(); const f = document.querySelector(`#desafioCorpo [data-item="${it}"][data-classe="${c.dataset.classe}"]`); if (f) f.focus();
        return;
      }
      const op = ev.target.closest('[data-op]');
      if (op && !op.disabled) escolherOpcao(+op.dataset.op);
    });
    $('#desafioCorpo').addEventListener('change', ev => { const s = ev.target.closest('[data-assoc]'); if (s) rascunho.esc[+s.dataset.assoc] = s.value; });
    // som
    document.querySelectorAll('input[name="modoSom"]').forEach(r => r.addEventListener('change', () => { Som.definirModo(r.value); Som.definirEra(E.eraAtual); atualizarBotaoSom(); }));
    $('#volume').addEventListener('input', ev => { Som.definirVolume(+ev.target.value / 100); $('#volumeValor').textContent = ev.target.value + '%'; });
    $('#efeitos').addEventListener('change', ev => Som.definirEfeitos(ev.target.checked));
    $('#caderno').addEventListener('show.bs.offcanvas', desenharCaderno);
    $('#modalDesafio').addEventListener('hidden.bs.modal', () => { if (E.constr.egito) { E.constr.egito = 0; if (sk) sk.refazerFundo(); guardar(); } });
    // ao fechar modais, devolver o foco à cena
    document.querySelectorAll('.modal').forEach(m => m.addEventListener('hidden.bs.modal', () => {
      if (!document.querySelector('.modal.show') && $('#ecraInicio').hidden) $('#cena').focus({ preventScroll: true });
    }));
  }
  function atualizarBotaoSom() {
    const m = Som.modo;
    $('#btnSom').innerHTML = `<span aria-hidden="true">${m === 'off' ? '🔇' : '🔊'}</span><span class="d-none d-md-inline"> Som</span>`;
    $('#btnSom').setAttribute('aria-label', `Definições de som (atual: ${({ off: 'desligado', efeitos: 'só efeitos', ambiente: 'ambiente discreto', melodia: 'melodia suave' })[m]})`);
  }

  function ecraInicial(visivel) {
    $('#ecraInicio').hidden = !visivel;
    document.querySelectorAll('header, main, footer, .salto').forEach(el => { if (visivel) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
    if (visivel) setTimeout(() => { const b = $('#btnContinuar').hidden ? $('#btnComecar') : $('#btnContinuar'); b.focus(); }, 30);
  }
  function comecar() {
    ecraInicial(false);
    if (!sk) sk = criarSketch(); else sk.entrarEra();
    Som.definirEra(E.eraAtual);
    atualizarInterface();
    setTimeout(() => mostrarIntroEra(), 60);
  }

  // arranque
  document.addEventListener('DOMContentLoaded', () => {
    const salvo = carregar();
    if (salvo) { E = salvo; $('#btnContinuar').hidden = false; $('#btnComecar').textContent = 'Começar de novo'; }
    ligar(); atualizarBotaoSom(); atualizarInterface(); ecraInicial(true);
    // exposto para testes automáticos
    window.__jogo = { estado: () => E, irParaEra, verificar, abrirDesafio, usarPedra, todosDesafios, PONTOS_MAX, sk: () => sk, rascunho: () => rascunho, desafio: () => desafioAtual, escolherOpcao, seguinte };
  });
})();
