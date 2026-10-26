/* ============================================================
   Missão Europa — motor de desafios
   Tipos: associar, classificar, ordenar, passos, construir
   ============================================================ */
"use strict";

window.Desafios = (function () {
  const D = window.DADOS;
  let modal = null;
  let atual = null;          // { id, def, tentativas, revisao, aoConcluir }
  let previaP5 = null;

  const $ = (id) => document.getElementById(id);
  const CORES_PAR = ["#ffcc00", "#7fd3ff", "#ff9fb7", "#9be3c0", "#c4a7ff", "#ffb36b", "#e6ff7a", "#8fb3ff", "#ff8a8a", "#7af0e0", "#f2c6ff", "#d9d9d9"];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function baralhar(a) {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    return b;
  }
  function filtrarNivel(lista, nivel) { return lista.filter(x => !x.nivel || x.nivel <= nivel); }
  function nomeBandeira(cod) { return (window.BANDEIRAS_DATA && window.BANDEIRAS_DATA[cod]) || `img/bandeiras/${cod}.svg`; }
  function fonteHTML(chave) {
    const f = D.FONTES[chave];
    if (!f) return "";
    return `Fonte: <a href="${f.url}" target="_blank" rel="noopener">${esc(f.nome)}</a>`;
  }
  function nomesPistas(ids) { return ids.map(i => D.PISTAS[i] ? "«" + D.PISTAS[i].nome + "»" : i).join(", "); }

  function feedback(html, classe) {
    $("desafioFeedback").innerHTML = html ? `<div class="feedback ${classe || ""}">${html}</div>` : "";
  }
  function rodape(botoes) {
    const r = $("desafioRodape"); r.innerHTML = "";
    botoes.forEach(b => {
      const bt = document.createElement("button");
      bt.type = "button"; bt.className = "btn " + (b.classe || "btn-ouro"); bt.textContent = b.texto;
      if (b.id) bt.id = b.id;
      if (b.desativado) bt.disabled = true;
      bt.addEventListener("click", b.acao);
      r.appendChild(bt);
    });
  }
  function registarErro() {
    if (!atual.revisao) atual.tentativas++;
    window.Som.efeito("erro");
  }
  function pontosPorTentativas(t) { return t === 0 ? 3 : t === 1 ? 2 : 1; }

  /* ---------- Conclusão comum ---------- */
  function concluir(extraHTML) {
    const def = atual.def;
    const pts = pontosPorTentativas(atual.tentativas);
    window.Som.efeito(atual.revisao ? "acerto" : "estrela");
    const cab = atual.revisao
      ? `<p class="h5 mb-2">✔️ Desafio resolvido outra vez!</p>`
      : `<p class="h5 mb-2">⭐ Estrela recuperada! <span class="badge text-bg-warning">+${pts} ${pts === 1 ? "ponto" : "pontos"}</span></p>`;
    feedback(
      cab +
      `<p class="mb-2">${esc(def.explicacao)}</p>` +
      (extraHTML || "") +
      `<p class="small mb-1"><strong>Aprendizagem:</strong> ${esc(def.aprendizagem)}</p>` +
      `<p class="small mb-0 fonte">${fonteHTML(def.fonte)}</p>`, "ok");
    rodape([{ texto: "Continuar a missão", acao: () => modal.hide(), id: "btnFecharDesafio" }]);
    const cb = atual.aoConcluir, id = atual.id, t = atual.tentativas, rev = atual.revisao;
    atual.concluido = true;
    if (!rev && cb) cb(id, t, pts);
    setTimeout(() => { const b = $("btnFecharDesafio"); if (b) b.focus(); }, 50);
  }

  /* ============================================================
     BANCO DE PERGUNTAS (dados/banco-perguntas.json) e sorteio
     ============================================================ */
  let BANCO = { desafios: {} };
  let origemBanco = "nenhum";

  function validarBanco(b) {
    const erros = [];
    if (!b || typeof b !== "object" || !b.desafios || typeof b.desafios !== "object") return ["O ficheiro não tem a secção «desafios»."];
    Object.entries(b.desafios).forEach(([id, e]) => {
      const def = D.DESAFIOS[id];
      if (!def) { erros.push(`Desafio desconhecido: ${id}`); return; }
      const sel = e.selecao || {};
      const verLista = (lista, campos) => {
        if (!Array.isArray(lista) || !lista.length) { erros.push(`${id}: a lista está vazia.`); return; }
        lista.forEach((x, i) => campos.forEach(c => { if (x[c] === undefined || x[c] === "") erros.push(`${id}, item ${i + 1}: falta «${c}».`); }));
        [2, 3].forEach(n => {
          const pedidos = sel["n" + n];
          const disp = lista.filter(x => !x.nivel || x.nivel <= n).length;
          if (pedidos && pedidos > disp) erros.push(`${id}: pedes ${pedidos} itens no ${n}.º ciclo, mas só há ${disp}.`);
        });
      };
      if (def.tipo === "associar" && e.pares) verLista(e.pares, ["a", "b"]);
      if (def.tipo === "classificar" && e.itens) {
        verLista(e.itens, ["texto", "cat", "explicacao"]);
        const cats = def.categorias.map(c => c.id);
        (e.itens || []).forEach((x, i) => { if (!cats.includes(x.cat)) erros.push(`${id}, item ${i + 1}: categoria «${x.cat}» inválida (usa: ${cats.join(", ")}).`); });
      }
      if (def.tipo === "ordenar" && e.itens) verLista(e.itens, ["texto", "ano"]);
      if (def.tipo === "passos" && e.passos) {
        e.passos.forEach((p, i) => (p.variantes || [p]).forEach(v => {
          if (!v.pergunta || !Array.isArray(v.opcoes) || v.opcoes.length < 2) erros.push(`${id}, etapa ${i + 1}: precisa de pergunta e de pelo menos 2 opções.`);
          else if (!v.aberta && !p.aberta && !v.opcoes.some(o => o.certa)) erros.push(`${id}, etapa ${i + 1}: nenhuma opção está marcada como certa.`);
        }));
      }
    });
    return erros;
  }
  function aplicarBanco(b, origem) {
    const erros = validarBanco(b);
    if (erros.length) return erros;
    BANCO = b; origemBanco = origem;
    return [];
  }
  if (window.BANCO_PERGUNTAS) aplicarBanco(window.BANCO_PERGUNTAS, "original");

  function escolherUm(a) { return a[Math.floor(Math.random() * a.length)]; }
  function substituir(txt, vars) { return typeof txt === "string" ? txt.replace(/\{(\w+)\}/g, (m, k) => vars[k] !== undefined ? vars[k] : m) : txt; }
  function substituirTudo(obj, vars) {
    if (Array.isArray(obj)) return obj.map(x => substituirTudo(x, vars));
    if (obj && typeof obj === "object") { const r = {}; for (const k in obj) r[k] = substituirTudo(obj[k], vars); return r; }
    return substituir(obj, vars);
  }

  // Sorteia n itens, respeitando grupos, mínimos por categoria e (no 3.º ciclo) uma parte de itens de nível 3.
  function amostrar(lista, n, nivel, opc) {
    opc = opc || {};
    const elegiveis = baralhar(filtrarNivel(lista, nivel));
    n = Math.min(n || elegiveis.length, elegiveis.length);
    const res = [], grupos = new Set();
    const grupoDe = opc.grupo || (x => x.grupo);
    const pode = x => !res.includes(x) && !(grupoDe(x) && grupos.has(grupoDe(x)));
    const tomar = x => { res.push(x); if (grupoDe(x)) grupos.add(grupoDe(x)); };
    if (opc.minPorCategoria && opc.categorias) {
      baralhar(opc.categorias).forEach(cat => {
        let c = 0;
        elegiveis.forEach(x => { if (x.cat === cat && c < opc.minPorCategoria && res.length < n && pode(x)) { tomar(x); c++; } });
      });
    }
    if (nivel >= 3) {
      const alvo = Math.ceil(n / 2);
      elegiveis.forEach(x => { if (x.nivel === 3 && res.filter(r => r.nivel === 3).length < alvo && res.length < n && pode(x)) tomar(x); });
    }
    elegiveis.forEach(x => { if (res.length < n && pode(x)) tomar(x); });
    return res;
  }

  // Cria a versão sorteada de um desafio para esta tentativa.
  function sortear(id, nivel) {
    const def = D.DESAFIOS[id], b = (BANCO.desafios || {})[id] || {};
    const inst = Object.assign({}, def);
    const sel = b.selecao || {};
    const n = nivel >= 3 ? sel.n3 : sel.n2;
    if (def.tipo === "associar" && b.pares) {
      const unicosB = new Set();
      inst.pares = amostrar(b.pares, n, nivel, { grupo: x => x.grupo })
        .map(x => ({ ...x, b: Array.isArray(x.b) ? escolherUm(x.b) : x.b }))
        .filter(x => { if (unicosB.has(x.b)) return false; unicosB.add(x.b); return true; });
    }
    if (def.tipo === "classificar" && b.itens) {
      inst.itens = amostrar(b.itens, n, nivel, { minPorCategoria: sel.minPorCategoria, categorias: def.categorias.map(c => c.id) });
    }
    if (def.tipo === "ordenar" && b.itens) {
      inst.itens = amostrar(b.itens, n, nivel, { grupo: x => String(x.ano) })
        .sort((x, y) => parseInt(x.ano, 10) - parseInt(y.ano, 10));
    }
    if (def.tipo === "passos" && b.passos) {
      const cen = b.cenarios ? escolherUm(b.cenarios) : {};
      inst.passos = b.passos.map(p => {
        const v = p.variantes ? Object.assign({ nivel: p.nivel, aberta: p.aberta }, escolherUm(p.variantes)) : p;
        return substituirTudo(v, cen);
      });
      inst.intro = substituir(cen.intro || b.intro || def.intro, cen);
      inst.explicacao = substituir(b.explicacao || def.explicacao, cen);
    }
    if (def.tipo === "construir") inst.estadoInicial = b.estadosIniciais ? escolherUm(b.estadosIniciais) : null;
    ["instrucao", "explicacao", "titulo"].forEach(k => { if (b[k] && def.tipo !== "passos") inst[k] = b[k]; });
    return inst;
  }

  /* ============================================================
     ASSOCIAR
     ============================================================ */
  function montarAssociar(def, nivel) {
    const pares = filtrarNivel(def.pares, nivel).map((p, i) => ({ ...p, i }));
    const colA = baralhar(pares), colB = baralhar(pares);
    const ligacoes = {};   // índice A -> índice B
    const bloqueados = {}; // índice A certo
    let selA = null, selB = null;

    const corpo = $("desafioCorpo");
    corpo.innerHTML = `<p class="instrucao">${esc(def.instrucao)}</p>
      <div class="colunas-assoc">
        <div><h3>${esc(def.colA)}</h3><div id="colA"></div></div>
        <div><h3>${esc(def.colB)}</h3><div id="colB"></div></div>
      </div>`;

    function rotuloA(p, pos) {
      return p.bandeira
        ? `<img class="bandeira" src="${nomeBandeira(p.a)}" alt=""><span>Bandeira ${pos + 1}</span>`
        : `<span>${esc(p.a)}</span>`;
    }
    const botoesA = {}, botoesB = {};
    colA.forEach((p, pos) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "cartao-op"; b.setAttribute("aria-pressed", "false");
      b.innerHTML = rotuloA(p, pos) + `<span class="marca-par" aria-hidden="true"></span>`;
      b.dataset.rotulo = p.bandeira ? `Bandeira ${pos + 1}` : p.a;
      b.addEventListener("click", () => clicarA(p.i));
      $("colA").appendChild(b); botoesA[p.i] = b;
    });
    colB.forEach(p => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "cartao-op"; b.setAttribute("aria-pressed", "false");
      b.innerHTML = `<span>${esc(p.b)}</span><span class="marca-par" aria-hidden="true"></span>`;
      b.dataset.rotulo = p.b;
      b.addEventListener("click", () => clicarB(p.i));
      $("colB").appendChild(b); botoesB[p.i] = b;
    });

    function aDeB(bi) { return Object.keys(ligacoes).find(a => ligacoes[a] === bi); }

    function atualizar() {
      let n = 0; const numeros = {};
      colA.forEach(p => { if (ligacoes[p.i] !== undefined) numeros[p.i] = ++n; });
      Object.values(botoesA).forEach(b => { b.classList.remove("par"); b.querySelector(".marca-par").textContent = ""; b.querySelector(".marca-par").style.background = "transparent"; });
      Object.values(botoesB).forEach(b => { b.classList.remove("par"); b.querySelector(".marca-par").textContent = ""; b.querySelector(".marca-par").style.background = "transparent"; });
      Object.keys(ligacoes).forEach(a => {
        const ba = botoesA[a], bb = botoesB[ligacoes[a]], num = numeros[a], cor = CORES_PAR[(num - 1) % CORES_PAR.length];
        [ba, bb].forEach(b => { b.classList.add("par"); const m = b.querySelector(".marca-par"); m.textContent = num; m.style.background = cor; });
        ba.setAttribute("aria-label", `${ba.dataset.rotulo}, ligado a ${bb.dataset.rotulo} (par ${num})`);
        bb.setAttribute("aria-label", `${bb.dataset.rotulo}, ligado a ${ba.dataset.rotulo} (par ${num})`);
      });
      Object.keys(botoesA).forEach(a => {
        const b = botoesA[a];
        if (ligacoes[a] === undefined) b.setAttribute("aria-label", b.dataset.rotulo + ", sem par");
        b.setAttribute("aria-pressed", String(+a === selA));
      });
      Object.keys(botoesB).forEach(bi => {
        const b = botoesB[bi];
        if (aDeB(+bi) === undefined) b.setAttribute("aria-label", b.dataset.rotulo + ", sem par");
        b.setAttribute("aria-pressed", String(+bi === selB));
      });
      const completo = Object.keys(ligacoes).length === pares.length;
      const bv = $("btnVerificar"); if (bv) bv.disabled = !completo;
    }

    function tentarLigar() {
      if (selA === null || selB === null) return;
      const antigoA = aDeB(selB); if (antigoA !== undefined) delete ligacoes[antigoA];
      ligacoes[selA] = selB;
      botoesA[selA].classList.remove("errado"); botoesB[selB].classList.remove("errado");
      window.Som.efeito("clique");
      selA = null; selB = null;
      feedback("");
      atualizar();
    }
    function limparErro(b) { b.classList.remove("errado"); }
    function clicarA(ai) {
      if (bloqueados[ai]) return;
      if (ligacoes[ai] !== undefined) { limparErro(botoesA[ai]); limparErro(botoesB[ligacoes[ai]]); delete ligacoes[ai]; }
      selA = (selA === ai) ? null : ai;
      tentarLigar(); atualizar();
    }
    function clicarB(bi) {
      const a = aDeB(bi);
      if (a !== undefined && bloqueados[a]) return;
      if (a !== undefined) { limparErro(botoesA[a]); limparErro(botoesB[bi]); delete ligacoes[a]; }
      selB = (selB === bi) ? null : bi;
      tentarLigar(); atualizar();
    }

    function verificar() {
      const errados = [];
      Object.keys(ligacoes).forEach(a => {
        const certo = +a === ligacoes[a];
        botoesA[a].classList.toggle("certo", certo); botoesB[ligacoes[a]].classList.toggle("certo", certo);
        botoesA[a].classList.toggle("errado", !certo); botoesB[ligacoes[a]].classList.toggle("errado", !certo);
        if (certo) { bloqueados[a] = true; botoesA[a].disabled = true; botoesB[ligacoes[a]].disabled = true; }
        else errados.push(+a);
      });
      if (!errados.length) { concluir(); return; }
      registarErro();
      const p = pares;
      const mostrarResposta = atual.tentativas >= 3 && !atual.revisao;
      const linhas = errados.map(a => {
        const par = p.find(x => x.i === a);
        const nome = par.bandeira ? botoesA[a].dataset.rotulo : par.a;
        return `<li><strong>${esc(nome)}</strong>: ${esc(par.dica)}${mostrarResposta ? ` → <em>${esc(par.b)}</em>` : ""}</li>`;
      }).join("");
      feedback(`<p class="mb-1"><strong>Quase!</strong> ${pares.length - errados.length} de ${pares.length} pares certos (a verde ficam fixos). Os pares errados foram desfeitos (a vermelho): forma-os de novo.</p><ul>${linhas}</ul>`, "ko");
      // desfaz os pares errados para nova tentativa
      errados.forEach(a => delete ligacoes[a]);
      atualizar();
      errados.forEach(a => botoesA[a].classList.add("errado"));
    }

    rodape([{ texto: "Verificar", acao: verificar, id: "btnVerificar", desativado: true }]);
    atualizar();
  }

  /* ============================================================
     CLASSIFICAR
     ============================================================ */
  function montarClassificar(def, nivel) {
    const itens = baralhar(filtrarNivel(def.itens, nivel).map((x, i) => ({ ...x, i })));
    const corpo = $("desafioCorpo");
    const nomeGrupo = "cl_" + atual.id;
    corpo.innerHTML = `<p class="instrucao">${esc(def.instrucao)}</p><div id="listaClasse"></div>`;
    const lista = $("listaClasse");
    const fixos = {};

    itens.forEach((it, k) => {
      const div = document.createElement("div");
      div.className = "item-classe"; div.id = "ic_" + it.i;
      div.setAttribute("role", "group");
      div.setAttribute("aria-labelledby", "icl_" + it.i);
      const img = it.bandeira ? `<img class="bandeira" src="${nomeBandeira(it.bandeira)}" alt="">` : "";
      div.innerHTML = `<div class="rotulo-item" id="icl_${it.i}">${img}<span><strong>${k + 1}.</strong> ${esc(it.texto)}</span></div>
        <div class="btn-group btn-group-sm" role="radiogroup" aria-label="Categoria para: ${esc(it.texto)}">
          ${def.categorias.map(c => `<input type="radio" class="btn-check" name="${nomeGrupo}_${it.i}" id="r_${it.i}_${c.id}" value="${c.id}" autocomplete="off">
          <label class="btn btn-cat" for="r_${it.i}_${c.id}">${esc(c.nome)}</label>`).join("")}
        </div><div class="dica-item" id="di_${it.i}" aria-live="polite"></div>`;
      lista.appendChild(div);
      div.querySelectorAll("input").forEach(inp => inp.addEventListener("change", () => {
        div.classList.remove("errado"); $("di_" + it.i).textContent = ""; window.Som.efeito("clique"); estadoBotao();
      }));
    });

    function escolha(it) { const s = document.querySelector(`input[name="${nomeGrupo}_${it.i}"]:checked`); return s ? s.value : null; }
    function estadoBotao() {
      const faltam = itens.filter(it => !escolha(it)).length;
      const bv = $("btnVerificar");
      if (bv) { bv.disabled = faltam > 0; bv.textContent = faltam ? `Verificar (faltam ${faltam})` : "Verificar"; }
    }
    function verificar() {
      const errados = [];
      itens.forEach(it => {
        if (fixos[it.i]) return;
        const div = $("ic_" + it.i);
        if (escolha(it) === it.cat) {
          fixos[it.i] = true; div.classList.add("certo"); div.classList.remove("errado");
          div.querySelectorAll("input").forEach(x => x.disabled = true);
        } else { div.classList.add("errado"); errados.push(it); }
      });
      if (!errados.length) {
        const lst = itens.map(it => `<li><strong>${esc(it.texto)}</strong> — ${esc(it.explicacao)}</li>`).join("");
        concluir(`<details class="mb-2"><summary>Ver a explicação de cada caso</summary><ul class="small mt-2">${lst}</ul></details>`);
        return;
      }
      registarErro();
      const ajudaForte = atual.tentativas >= 2 && !atual.revisao;
      errados.forEach(it => {
        $("di_" + it.i).innerHTML = ajudaForte
          ? `💡 ${esc(it.explicacao)}`
          : `💡 Ainda não. Consulta no caderno: ${esc(nomesPistas(def.requer))}.`;
      });
      feedback(`<p class="mb-0"><strong>Quase!</strong> ${itens.length - errados.length} de ${itens.length} certos (ficam a verde). Muda as escolhas a vermelho e verifica outra vez.${ajudaForte ? "" : " Se voltares a errar, aparece uma ajuda mais forte."}</p>`, "ko");
      const prim = document.querySelector(".item-classe.errado input"); if (prim) prim.focus();
    }
    rodape([{ texto: "Verificar", acao: verificar, id: "btnVerificar", desativado: true }]);
    estadoBotao();
  }

  /* ============================================================
     ORDENAR
     ============================================================ */
  function montarOrdenar(def, nivel) {
    const certos = filtrarNivel(def.itens, nivel).map((x, i) => ({ ...x, i }));
    let ordem = baralhar(certos);
    let tentativasAqui = 0;
    while (ordem.every((x, k) => x.i === k)) ordem = baralhar(certos);
    let mostrarAnos = false;

    const corpo = $("desafioCorpo");
    corpo.innerHTML = `<p class="instrucao">${esc(def.instrucao)}</p>
      <p class="small mb-1">⬆️ Mais antigo</p><ol class="lista-ordenar" id="listaOrd"></ol><p class="small">⬇️ Mais recente</p>`;

    function desenhar(focoIdx, focoDir) {
      const ol = $("listaOrd"); ol.innerHTML = "";
      ordem.forEach((it, k) => {
        const li = document.createElement("li");
        li.dataset.i = it.i;
        li.innerHTML = `<span class="num" aria-hidden="true">${k + 1}</span>
          <span class="txt">${esc(it.texto)}${mostrarAnos ? ` <span class="ano">(${it.ano})</span>` : ""}</span>
          <button type="button" class="btn btn-sm btn-mover" aria-label="Subir: ${esc(it.texto)}" ${k === 0 ? "disabled" : ""}>↑</button>
          <button type="button" class="btn btn-sm btn-mover" aria-label="Descer: ${esc(it.texto)}" ${k === ordem.length - 1 ? "disabled" : ""}>↓</button>`;
        const [bs, bd] = li.querySelectorAll("button");
        bs.addEventListener("click", () => mover(k, -1));
        bd.addEventListener("click", () => mover(k, +1));
        ol.appendChild(li);
      });
      if (focoIdx !== undefined) {
        const li = $("listaOrd").children[focoIdx];
        li.classList.add("realce");
        const btns = li.querySelectorAll("button");
        const alvo = focoDir < 0 ? (btns[0].disabled ? btns[1] : btns[0]) : (btns[1].disabled ? btns[0] : btns[1]);
        alvo.focus();
      }
    }
    function mover(k, d) {
      const n = k + d; if (n < 0 || n >= ordem.length) return;
      [ordem[k], ordem[n]] = [ordem[n], ordem[k]];
      window.Som.efeito("clique"); feedback("");
      desenhar(n, d);
    }
    function verificar() {
      let certosN = 0;
      const lis = $("listaOrd").children;
      ordem.forEach((it, k) => {
        const ok = it.i === k; if (ok) certosN++;
        lis[k].classList.toggle("certo", ok); lis[k].classList.toggle("errado", !ok);
      });
      if (certosN === ordem.length) {
        mostrarAnos = true; desenhar();
        [...$("listaOrd").children].forEach(li => li.classList.add("certo"));
        $("listaOrd").querySelectorAll("button").forEach(b => b.disabled = true);
        concluir();
        return;
      }
      registarErro(); tentativasAqui++;
      if (tentativasAqui >= 2) mostrarAnos = true;
      const msg = tentativasAqui >= 2
        ? "Mostrámos as datas ao lado de cada acontecimento para te ajudar."
        : `Abre o caderno (botão «Caderno») e procura as datas nas pistas do arquivo. Se voltares a errar, mostramos as datas.`;
      feedback(`<p class="mb-0"><strong>${certosN} de ${ordem.length}</strong> estão no lugar certo (a verde). ${msg}</p>`, "ko");
      if (mostrarAnos) {
        desenhar();
        const l2 = $("listaOrd").children;
        ordem.forEach((it, k) => { l2[k].classList.toggle("certo", it.i === k); l2[k].classList.toggle("errado", it.i !== k); });
      }
    }
    desenhar();
    rodape([{ texto: "Verificar a ordem", acao: verificar, id: "btnVerificar" }]);
  }

  /* ============================================================
     PASSOS (decisões em várias etapas)
     ============================================================ */
  function montarPassos(def, nivel) {
    const passos = filtrarNivel(def.passos, nivel);
    let p = 0;
    const corpo = $("desafioCorpo");

    function desenhar() {
      const passo = passos[p];
      const etapas = passos.map((_, k) => `<span class="${k < p ? "feita" : k === p ? "atual" : ""}"></span>`).join("");
      const opcoes = baralhar(passo.opcoes.map((o, i) => ({ ...o, i })));
      corpo.innerHTML =
        (def.intro && p === 0 ? `<p class="instrucao">${esc(def.intro)}</p>` : "") +
        `<div class="etapas" aria-hidden="true">${etapas}</div>
         <p class="small mb-1">Etapa ${p + 1} de ${passos.length}${passo.aberta ? ' · <span class="badge selo-interpretacao">Interpretação: várias respostas válidas</span>' : ""}</p>
         <p class="fw-semibold" id="perguntaPasso">${esc(passo.pergunta)}</p>
         <div role="group" aria-labelledby="perguntaPasso" id="opcoesPasso"></div>`;
      const cont = $("opcoesPasso");
      opcoes.forEach(o => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "opcao-passo"; b.textContent = o.texto;
        b.addEventListener("click", () => escolher(o, b));
        cont.appendChild(b);
      });
      feedback("");
      rodape([]);
      setTimeout(() => { const b = cont.querySelector("button"); if (b) b.focus(); }, 30);
    }
    function avancar() {
      p++;
      if (p >= passos.length) {
        corpo.innerHTML = `<div class="etapas" aria-hidden="true">${passos.map(() => '<span class="feita"></span>').join("")}</div>`;
        concluir();
      } else desenhar();
    }
    function escolher(o, b) {
      const passo = passos[p];
      if (passo.aberta) {
        $("opcoesPasso").querySelectorAll("button").forEach(x => { x.disabled = true; });
        b.classList.add("escolhida");
        window.Som.efeito("acerto");
        feedback(`<p class="mb-1"><span class="badge selo-interpretacao">Interpretação</span></p><p class="mb-0">${esc(o.feedback)}</p>`, "info");
        rodape([{ texto: p === passos.length - 1 ? "Concluir" : "Etapa seguinte", acao: avancar, id: "btnSeguinte" }]);
        $("btnSeguinte").focus();
        return;
      }
      if (o.certa) {
        $("opcoesPasso").querySelectorAll("button").forEach(x => { x.disabled = true; });
        b.classList.add("certo");
        window.Som.efeito("acerto");
        feedback(`<p class="mb-0">✅ ${esc(o.feedback)}</p>`, "ok");
        rodape([{ texto: p === passos.length - 1 ? "Concluir" : "Etapa seguinte", acao: avancar, id: "btnSeguinte" }]);
        $("btnSeguinte").focus();
      } else {
        b.classList.add("errado"); b.disabled = true;
        registarErro();
        feedback(`<p class="mb-0">🔁 ${esc(o.feedback)} Tenta outra opção.</p>`, "ko");
      }
    }
    desenhar();
  }

  /* ============================================================
     CONSTRUIR (bandeira europeia, com pré-visualização p5.js)
     ============================================================ */
  function montarConstruir(def) {
    const corpo = $("desafioCorpo");
    const st = Object.assign({ fundo: "verde", estrelas: "branco", n: 27, disp: "linhas" }, def.estadoInicial || {});
    const CORES = { azul: "#003399", verde: "#1e7a3c", vermelho: "#c8102e", branco: "#ffffff", dourado: "#ffcc00" };
    corpo.innerHTML = `<p class="instrucao">${esc(def.instrucao)}</p>
      <div class="construir-grid">
        <div>
          <div class="previa-bandeira" id="previaBandeira" role="img" aria-label="Pré-visualização da bandeira"></div>
          <p class="small mt-1 mb-0 opacity-75">Pré-visualização (ilustração).</p>
        </div>
        <div>
          <fieldset class="mb-2"><legend class="h6 mb-1">Cor do fundo</legend>
            ${["azul", "verde", "vermelho", "branco"].map(c => `<input type="radio" class="btn-check" name="cbFundo" id="cbF_${c}" value="${c}" ${st.fundo === c ? "checked" : ""}><label class="btn btn-sm btn-cat me-1 mb-1" for="cbF_${c}">${c[0].toUpperCase() + c.slice(1)}</label>`).join("")}
          </fieldset>
          <fieldset class="mb-2"><legend class="h6 mb-1">Cor das estrelas</legend>
            ${["dourado", "branco", "vermelho"].map(c => `<input type="radio" class="btn-check" name="cbEst" id="cbE_${c}" value="${c}" ${st.estrelas === c ? "checked" : ""}><label class="btn btn-sm btn-cat me-1 mb-1" for="cbE_${c}">${c[0].toUpperCase() + c.slice(1)}</label>`).join("")}
          </fieldset>
          <label for="cbN" class="form-label h6 mb-0">Número de estrelas: <span id="cbNval">${st.n}</span></label>
          <div class="d-flex align-items-center gap-2 mb-2">
            <button type="button" class="btn btn-sm btn-cat" id="cbMenos" aria-label="Menos uma estrela">−</button>
            <input type="range" class="form-range" id="cbN" min="1" max="30" value="${st.n}">
            <button type="button" class="btn btn-sm btn-cat" id="cbMais" aria-label="Mais uma estrela">+</button>
          </div>
          <fieldset class="mb-1"><legend class="h6 mb-1">Disposição</legend>
            ${[["circulo", "Em círculo"], ["linhas", "Em linhas"], ["espalhadas", "Espalhadas"]].map(([v, t]) => `<input type="radio" class="btn-check" name="cbDisp" id="cbD_${v}" value="${v}" ${st.disp === v ? "checked" : ""}><label class="btn btn-sm btn-cat me-1 mb-1" for="cbD_${v}">${t}</label>`).join("")}
          </fieldset>
        </div>
      </div>`;

    function ler() {
      st.fundo = document.querySelector('input[name="cbFundo"]:checked').value;
      st.estrelas = document.querySelector('input[name="cbEst"]:checked').value;
      st.disp = document.querySelector('input[name="cbDisp"]:checked').value;
      st.n = +$("cbN").value; $("cbNval").textContent = st.n;
      $("previaBandeira").setAttribute("aria-label", `Pré-visualização: fundo ${st.fundo}, ${st.n} estrelas de cor ${st.estrelas}, ${st.disp === "circulo" ? "em círculo" : st.disp === "linhas" ? "em linhas" : "espalhadas"}`);
      feedback("");
    }
    corpo.querySelectorAll("input").forEach(i => i.addEventListener("input", ler));
    $("cbMenos").addEventListener("click", () => { $("cbN").value = Math.max(1, st.n - 1); ler(); });
    $("cbMais").addEventListener("click", () => { $("cbN").value = Math.min(30, st.n + 1); ler(); });

    // Pré-visualização com p5.js (modo instância)
    if (previaP5) { previaP5.remove(); previaP5 = null; }
    const cont = $("previaBandeira");
    previaP5 = new p5(function (s) {
      function estrela(x, y, r1, r2) {
        s.beginShape();
        for (let k = 0; k < 10; k++) {
          const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? r2 : r1;
          s.vertex(x + Math.cos(a) * r, y + Math.sin(a) * r);
        }
        s.endShape(s.CLOSE);
      }
      s.setup = function () {
        const w = Math.max(240, cont.clientWidth || 300);
        s.createCanvas(w, w * 2 / 3);
        s.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
      };
      s.draw = function () {
        const W = s.width, H = s.height;
        s.background(CORES[st.fundo]);
        if (st.fundo === "branco") { s.noFill(); s.stroke(180); s.rect(0, 0, W - 1, H - 1); }
        s.noStroke(); s.fill(CORES[st.estrelas]);
        if (st.estrelas === st.fundo || (st.estrelas === "branco" && st.fundo === "branco")) { s.stroke(150); s.strokeWeight(1); }
        const R = H / 3, r1 = H / 18, r2 = r1 * 0.4;
        const pulso = 1 + Math.sin(s.frameCount / 20) * 0.03;
        if (st.disp === "circulo") {
          for (let k = 0; k < st.n; k++) {
            const a = -Math.PI / 2 + k * 2 * Math.PI / st.n;
            estrela(W / 2 + Math.cos(a) * R, H / 2 + Math.sin(a) * R, r1 * pulso, r2 * pulso);
          }
        } else if (st.disp === "linhas") {
          const cols = Math.ceil(Math.sqrt(st.n * 1.6)), lin = Math.ceil(st.n / cols);
          for (let k = 0; k < st.n; k++) {
            const c = k % cols, l = Math.floor(k / cols);
            estrela(W * (c + 1) / (cols + 1), H * (l + 1) / (lin + 1), r1 * 0.8, r2 * 0.8);
          }
        } else {
          for (let k = 0; k < st.n; k++) {
            const x = (Math.sin(k * 12.9898) * 43758.5453) % 1, y = (Math.sin(k * 78.233) * 12543.123) % 1;
            estrela(W * (0.1 + 0.8 * Math.abs(x)), H * (0.12 + 0.76 * Math.abs(y)), r1 * 0.8, r2 * 0.8);
          }
        }
      };
    }, cont);

    function verificar() {
      ler();
      const erros = [];
      if (st.fundo !== "azul") erros.push("A cor do fundo não está certa: relê a pista da bandeira dobrada.");
      if (st.estrelas !== "dourado") erros.push("As estrelas não são dessa cor: na bandeira europeia, são douradas (amarelas).");
      if (st.n !== 12) erros.push(st.n === 27
        ? "27 é o número de países da UE… mas o número de estrelas não depende do número de países!"
        : "O número de estrelas ainda não está certo. Relê a pista da bandeira dobrada.");
      if (st.disp !== "circulo") erros.push("A disposição não está certa: as estrelas formam uma figura que simboliza a unidade.");
      if (!erros.length) {
        concluir(`<p class="small mb-2">Sabias? A bandeira foi adotada primeiro pelo Conselho da Europa (1955) e só depois pelas Comunidades Europeias (1985).</p>`);
        corpo.querySelectorAll("input, button").forEach(x => x.disabled = true);
        return;
      }
      registarErro();
      feedback(`<p class="mb-1"><strong>Ainda não é a bandeira europeia.</strong> Corrige ${erros.length === 1 ? "este pormenor" : "estes pormenores"}:</p><ul>${erros.map(e => `<li>${esc(e)}</li>`).join("")}</ul>`, "ko");
    }
    ler();
    rodape([{ texto: "Verificar a bandeira", acao: verificar, id: "btnVerificar" }]);
  }

  /* ============================================================
     API pública
     ============================================================ */
  function abrir(id, opcoes) {
    const def = D.DESAFIOS[id];
    if (!def) return;
    if (!modal) {
      modal = bootstrap.Modal.getOrCreateInstance($("modalDesafio"));
      $("modalDesafio").addEventListener("hidden.bs.modal", () => {
        if (previaP5) { previaP5.remove(); previaP5 = null; }
        const fecho = atual && atual.aoFechar; atual = null;
        if (fecho) fecho();
      });
    }
    const inst = sortear(id, opcoes.nivel || 2);
    atual = { id, def: inst, tentativas: 0, revisao: !!opcoes.revisao, aoConcluir: opcoes.aoConcluir, aoFechar: opcoes.aoFechar };
    $("tDesafio").textContent = (opcoes.revisao ? "🔁 " : "⭐ ") + def.titulo + (opcoes.revisao ? " (revisão, sem pontos)" : "");
    $("desafioAprendizagem").innerHTML = `<strong>Vais aprender a:</strong> ${esc(def.aprendizagem)}`;
    feedback(""); $("desafioRodape").innerHTML = "";
    const nivel = opcoes.nivel || 2;
    const montar = { associar: montarAssociar, classificar: montarClassificar, ordenar: montarOrdenar, passos: montarPassos, construir: montarConstruir }[def.tipo];
    modal.show();
    montar(inst, nivel);
  }

  return { abrir, fonteHTML, esc, nomesPistas, pontosPorTentativas, aplicarBanco, validarBanco, sortear,
    get banco() { return BANCO; }, _inst() { return atual && atual.def; }, get origemBanco() { return origemBanco; } };
})();
