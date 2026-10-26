/* ============================================================
   Missão Europa — dados do jogo (conteúdos, fontes, salas)
   Todo o texto visível está em português de Portugal.
   ============================================================ */
"use strict";

window.DADOS = (function () {

  /* ---------- Fontes consultadas ---------- */
  const FONTES = {
    dge:       { nome: "DGE — Clubes Europeus", url: "https://dge.mec.pt/clubes-europeus" },
    ue:        { nome: "União Europeia — Princípios, países, história", url: "https://european-union.europa.eu/principles-countries-history_pt" },
    bandeira:  { nome: "UE › Princípios, países, história › Símbolos › Bandeira europeia", url: "https://european-union.europa.eu/principles-countries-history/symbols/european-flag_pt" },
    hino:      { nome: "UE › Princípios, países, história › Símbolos › Hino europeu", url: "https://european-union.europa.eu/principles-countries-history/symbols/european-anthem_pt" },
    simbolos:  { nome: "UE › Princípios, países, história › Símbolos (lema)", url: "https://european-union.europa.eu/principles-countries-history/symbols_pt" },
    diaEuropa: { nome: "UE › Princípios, países, história › Dia da Europa", url: "https://european-union.europa.eu/principles-countries-history/europe-day_pt" },
    linguas:   { nome: "UE › Princípios, países, história › Línguas", url: "https://european-union.europa.eu/principles-countries-history/languages_pt" },
    paises:    { nome: "UE › Princípios, países, história › Países da UE", url: "https://european-union.europa.eu/principles-countries-history/eu-countries_pt" },
    historia:  { nome: "UE › Princípios, países, história › História da UE", url: "https://european-union.europa.eu/principles-countries-history/history-eu_pt" },
    valores:   { nome: "UE › Princípios e valores › Objetivos e valores", url: "https://european-union.europa.eu/principles-countries-history/principles-and-values/aims-and-values_pt" },
    instituicoes: { nome: "UE › Instituições e órgãos › Tipos de instituições", url: "https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies/types-institutions-and-bodies_pt" },
    bce:       { nome: "Banco Central Europeu — Bulgária na área do euro (1 jan. 2026)", url: "https://www.ecb.europa.eu" },
    pe:        { nome: "Parlamento Europeu — composição 2024-2029", url: "https://www.europarl.europa.eu" },
    dudh:      { nome: "Nações Unidas — Declaração Universal dos Direitos Humanos (1948)", url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights" },
    coe:       { nome: "Conselho da Europa — Estados-membros", url: "https://www.coe.int" },
    unesco:    { nome: "UNESCO — Lista do Património Mundial", url: "https://whc.unesco.org/en/list/" },
    albufeira: { nome: "Convenção de Albufeira (1998) — Resolução da AR n.º 66/1999", url: "https://diariodarepublica.pt/dr/detalhe/resolucao-assembleia-republica/66-1999-434660" },
    clima:     { nome: "Lei Europeia do Clima — Regulamento (UE) 2021/1119", url: "https://eur-lex.europa.eu/eli/reg/2021/1119/oj" }
  };

  /* ---------- Objetivos dos Clubes Europeus (fonte fornecida) ---------- */
  const OBJETIVOS_CLUBE = {
    O1: "Informação sobre a Europa (geografia, história, cultura, economia)",
    O2: "Informação sobre as Instituições Europeias",
    O3: "Os Estados-membros da UE e do Conselho da Europa",
    O4: "O património cultural e natural da Europa",
    O5: "Os problemas da Europa contemporânea",
    O6: "Os objetivos da integração europeia",
    O7: "Declaração Universal dos Direitos Humanos",
    O8: "Compreender o pluralismo europeu (semelhanças e diferenças)",
    O9: "Interdependência europeia e mundial e necessidade de cooperação",
    O10: "Responsabilidade face à paz, aos direitos humanos, ao ambiente e ao património"
  };

  /* ---------- Pistas (objetos a investigar) ----------
     tipo: "Facto" | "Nota de rigor" | "Facto e projeção" */
  const PISTAS = {
    /* Átrio */
    a_placa: {
      nome: "Placa do Clube Europeu", tipo: "Facto", fonte: "dge",
      texto: "Os Clubes Europeus existem nas escolas portuguesas desde 1986 e formam a Rede Nacional de Clubes Europeus, coordenada pela Direção-Geral da Educação (DGE). Querem que os alunos participem na construção europeia, conheçam os seus direitos e deveres e reforcem os valores da cidadania europeia."
    },
    a_correio: {
      nome: "Caixa de correio", tipo: "Nota de rigor", fonte: "paises",
      texto: "Europa e União Europeia não são a mesma coisa! A Europa é um continente com mais de 40 países (o número exato depende do critério usado). A União Europeia (UE) é uma união de 27 desses países, que decidiram cooperar e partilhar regras comuns."
    },

    /* Sala 1 — Símbolos e Línguas */
    s_bandeira: {
      nome: "Bandeira dobrada", tipo: "Facto", fonte: "bandeira",
      texto: "A bandeira europeia tem 12 estrelas douradas, dispostas em círculo, sobre fundo azul. O círculo simboliza a unidade, a solidariedade e a harmonia entre os povos da Europa. Atenção: o número de estrelas não tem nada a ver com o número de países."
    },
    s_origem: {
      nome: "Etiqueta antiga", tipo: "Nota de rigor", fonte: "bandeira",
      texto: "A bandeira foi escolhida primeiro pelo Conselho da Europa, em 1955 — uma organização diferente da UE, dedicada aos direitos humanos. Só em 1985 os líderes das Comunidades Europeias (que mais tarde deram origem à UE) a adotaram também."
    },
    s_hino: {
      nome: "Gira-discos", tipo: "Facto", fonte: "hino",
      texto: "O hino europeu é a melodia do «Hino à Alegria», da 9.ª Sinfonia de Ludwig van Beethoven (1823), inspirada num poema de Friedrich Schiller (1785). É o hino da UE desde 1985 e não tem letra oficial: só música, que todos podem compreender. (O Conselho da Europa já o tinha adotado em 1972.)"
    },
    s_lema: {
      nome: "Placa dourada", tipo: "Facto", fonte: "simbolos",
      texto: "O lema da UE é «Unida na diversidade», usado desde 2000. Quer dizer que os europeus trabalham juntos pela paz e pelo bem-estar, enriquecidos pelas suas diferentes culturas, tradições e línguas."
    },
    s_dia: {
      nome: "Calendário", tipo: "Facto", fonte: "diaEuropa",
      texto: "O Dia da Europa celebra-se a 9 de maio. Recorda a Declaração Schuman, de 9 de maio de 1950, considerada o ponto de partida da atual União Europeia."
    },
    s_linguas: {
      nome: "Painel das saudações", tipo: "Facto", fonte: "linguas",
      texto: "A UE tem 24 línguas oficiais — o português é uma delas. Qualquer cidadão pode escrever às instituições europeias numa dessas línguas e receber a resposta na mesma língua."
    },

    /* Sala 2 — Mapa */
    m_globo: {
      nome: "Globo", tipo: "Facto", fonte: "paises",
      texto: "A UE tem 27 Estados-membros. Os seis fundadores foram a Alemanha, a Bélgica, a França, a Itália, o Luxemburgo e os Países Baixos. Portugal e Espanha entraram a 1 de janeiro de 1986. A adesão mais recente foi a da Croácia, em 2013. O Reino Unido saiu da UE a 31 de janeiro de 2020."
    },
    m_moedas: {
      nome: "Porta-moedas", tipo: "Facto", fonte: "bce",
      texto: "Desde 1 de janeiro de 2026, com a entrada da Bulgária, o euro é a moeda de 21 dos 27 países da UE. Seis países da UE ainda usam a sua própria moeda: Chéquia, Dinamarca, Hungria, Polónia, Roménia e Suécia. Estes números podem mudar com o tempo — confirma sempre a data da informação!"
    },
    m_passaporte: {
      nome: "Passaporte", tipo: "Facto", fonte: "paises",
      texto: "No Espaço Schengen não há controlos nas fronteiras entre os países. A maior parte dos países da UE faz parte dele, mas nem todos (a Irlanda, por exemplo, não faz). E há países fora da UE que fazem parte: Islândia, Listenstaine, Noruega e Suíça."
    },
    m_postal: {
      nome: "Postal de viagem", tipo: "Facto", fonte: "coe",
      texto: "A Noruega, a Suíça e a Islândia são países europeus, mas não pertencem à UE. O Reino Unido também não, desde 2020. Todos eles fazem parte do Conselho da Europa, uma organização com 46 Estados-membros."
    },

    /* Sala 3 — História */
    h_jornal: {
      nome: "Jornal de 1950", tipo: "Facto", fonte: "diaEuropa",
      texto: "9 de maio de 1950 — Robert Schuman, ministro francês dos Negócios Estrangeiros, propõe que a França e a Alemanha (e outros países que quisessem) ponham em comum a produção de carvão e de aço. Objetivo: tornar uma nova guerra entre eles impossível, cinco anos depois do fim da Segunda Guerra Mundial."
    },
    h_caixa: {
      nome: "Caixa de carvão e aço", tipo: "Facto", fonte: "historia",
      texto: "1951 — O Tratado de Paris cria a Comunidade Europeia do Carvão e do Aço (CECA), com seis países: Alemanha (então Alemanha Ocidental), Bélgica, França, Itália, Luxemburgo e Países Baixos. O carvão e o aço eram essenciais para a indústria… e para fabricar armas."
    },
    h_pergaminho: {
      nome: "Pergaminho de Roma", tipo: "Facto", fonte: "historia",
      texto: "25 de março de 1957 — Os Tratados de Roma criam a Comunidade Económica Europeia (CEE) e a Comunidade Europeia da Energia Atómica (Euratom)."
    },
    h_foto: {
      nome: "Fotografia dos Jerónimos", tipo: "Facto", fonte: "paises",
      texto: "12 de junho de 1985 — Portugal assina o tratado de adesão, no Mosteiro dos Jerónimos, em Lisboa. A adesão de Portugal (e de Espanha) começa a 1 de janeiro de 1986."
    },
    h_pasta: {
      nome: "Pasta azul de Maastricht", tipo: "Facto", fonte: "historia",
      texto: "1992 — O Tratado de Maastricht cria a União Europeia, a cidadania europeia e prepara a moeda única. Entra em vigor em 1993."
    },
    h_cofre: {
      nome: "Moedas novas", tipo: "Facto", fonte: "historia",
      texto: "O euro nasce em 1999, primeiro só em transferências e contas. A 1 de janeiro de 2002, as notas e moedas de euro chegam aos bolsos dos cidadãos."
    },
    h_caneta: {
      nome: "Caneta de Lisboa", tipo: "Facto", fonte: "historia",
      texto: "13 de dezembro de 2007 — O Tratado de Lisboa é assinado no Mosteiro dos Jerónimos. Entra em vigor em 2009 e torna obrigatória a Carta dos Direitos Fundamentais da UE."
    },
    h_medalha: {
      nome: "Medalha", tipo: "Facto", fonte: "historia",
      texto: "2012 — A UE recebe o Prémio Nobel da Paz, por ter contribuído, durante mais de seis décadas, para a paz, a reconciliação, a democracia e os direitos humanos na Europa."
    },

    /* Sala 4 — Instituições */
    i_hemiciclo: {
      nome: "Hemiciclo", tipo: "Facto", fonte: "instituicoes",
      texto: "Parlamento Europeu: representa os cidadãos e é eleito diretamente, de 5 em 5 anos. Entre 2024 e 2029 tem 720 deputados; 21 foram eleitos em Portugal. Decide as leis em conjunto com o Conselho da UE e aprova o orçamento. Reúne-se em Estrasburgo e em Bruxelas."
    },
    i_comissao: {
      nome: "Púlpito da Comissão", tipo: "Facto", fonte: "instituicoes",
      texto: "Comissão Europeia: propõe novas leis (tem o chamado «direito de iniciativa»), executa as políticas e gere o orçamento da UE. Tem um comissário por cada país. Sede: Bruxelas."
    },
    i_conselho: {
      nome: "Mesa dos ministros", tipo: "Facto", fonte: "instituicoes",
      texto: "Conselho da União Europeia: reúne os ministros dos governos dos 27 países, conforme o tema (agricultura, ambiente, educação…). Adota as leis em conjunto com o Parlamento Europeu."
    },
    i_cimeira: {
      nome: "Mesa redonda das cimeiras", tipo: "Facto", fonte: "instituicoes",
      texto: "Conselho Europeu: reúne os chefes de Estado ou de Governo dos países da UE. Define as grandes orientações políticas, mas não aprova leis."
    },
    i_martelo: {
      nome: "Martelo de juiz", tipo: "Facto", fonte: "instituicoes",
      texto: "Tribunal de Justiça da União Europeia (Luxemburgo): garante que o direito da UE é interpretado e aplicado da mesma forma em todos os países e julga casos de incumprimento."
    },
    i_banco: {
      nome: "Cofre do banco", tipo: "Facto", fonte: "instituicoes",
      texto: "Banco Central Europeu (Frankfurt): mantém os preços estáveis na área do euro. Tribunal de Contas Europeu (Luxemburgo): verifica se o dinheiro da UE é bem utilizado."
    },
    i_rigor: {
      nome: "Bilhete amarelo", tipo: "Nota de rigor", fonte: "instituicoes",
      texto: "Cuidado com os nomes parecidos! Conselho Europeu = líderes dos países da UE. Conselho da União Europeia = ministros dos países da UE. Conselho da Europa = organização diferente, fora da UE, com 46 países, que defende os direitos humanos (sede em Estrasburgo)."
    },

    /* Sala 5 — Direitos e Valores */
    v_cartaz: {
      nome: "Cartaz da DUDH", tipo: "Facto", fonte: "dudh",
      texto: "A Declaração Universal dos Direitos Humanos foi aprovada pela Assembleia Geral da ONU (Organização das Nações Unidas), em Paris, a 10 de dezembro de 1948. Tem 30 artigos. O artigo 1.º afirma que todos os seres humanos nascem livres e iguais em dignidade e em direitos. Atenção: é um documento da ONU, não da UE."
    },
    v_valores: {
      nome: "Quadro dos valores", tipo: "Facto", fonte: "valores",
      texto: "Os valores da UE estão no artigo 2.º do Tratado da União Europeia: dignidade humana, liberdade, democracia, igualdade, Estado de direito e respeito pelos direitos humanos."
    },
    v_carta: {
      nome: "Livro azul", tipo: "Facto", fonte: "valores",
      texto: "A Carta dos Direitos Fundamentais da União Europeia foi proclamada em 2000 e tornou-se obrigatória em 2009, com o Tratado de Lisboa. Proíbe a discriminação, protege os dados pessoais e garante o acesso à justiça."
    },
    v_coe: {
      nome: "Placa de Estrasburgo", tipo: "Facto", fonte: "coe",
      texto: "O Conselho da Europa foi criado em 1949 e tem sede em Estrasburgo. Tem 46 Estados-membros (Portugal entrou em 1976). Criou a Convenção Europeia dos Direitos Humanos (1950), protegida pelo Tribunal Europeu dos Direitos Humanos."
    },
    v_urna: {
      nome: "Urna de voto", tipo: "Facto", fonte: "valores",
      texto: "Cidadania europeia: um cidadão da UE pode votar e ser candidato nas eleições europeias e nas eleições municipais do país da UE onde vive, mesmo que não seja o seu país de origem."
    },

    /* Sala 6 — Património e Futuro */
    f_maquete: {
      nome: "Maquete dos Jerónimos", tipo: "Facto", fonte: "unesco",
      texto: "O Mosteiro dos Jerónimos e a Torre de Belém, em Lisboa, são Património Mundial da UNESCO desde 1983. São património cultural: foram construídos pelo ser humano."
    },
    f_folha: {
      nome: "Folha de laurissilva", tipo: "Facto", fonte: "unesco",
      texto: "A Floresta Laurissilva da Madeira é Património Mundial desde 1999. É património natural: foi formada pela natureza, ao longo de milhões de anos, e guarda espécies que só existem ali."
    },
    f_rio: {
      nome: "Mapa do rio Douro", tipo: "Facto", fonte: "albufeira",
      texto: "O Douro nasce em Espanha e desagua no Porto. Portugal e Espanha cooperam na gestão dos rios que partilham através da Convenção de Albufeira (1998). O Alto Douro Vinhateiro é Património Mundial desde 2001 como «paisagem cultural»: uma paisagem natural transformada pelo trabalho humano — por isso a UNESCO classifica-o como património cultural."
    },
    f_postal: {
      nome: "Postal do Porto", tipo: "Facto", fonte: "unesco",
      texto: "O Centro Histórico do Porto é Património Mundial desde 1996. Fica a poucos quilómetros de São Pedro da Cova!"
    },
    f_painel: {
      nome: "Painel solar", tipo: "Facto e projeção", fonte: "clima",
      texto: "FACTO: a Lei Europeia do Clima (2021) fixa o objetivo de a UE atingir a neutralidade climática até 2050 — emitir apenas os gases com efeito de estufa que consegue absorver. PROJEÇÃO: se o objetivo será alcançado é uma previsão; depende de decisões que ainda vão ser tomadas."
    },
    f_jornal: {
      nome: "Jornal de hoje", tipo: "Facto", fonte: "historia",
      texto: "Na sua história mais recente, a UE destaca como grandes desafios a pandemia de COVID-19, a guerra de agressão da Rússia contra a Ucrânia e a luta contra as alterações climáticas."
    },
    f_mochila: {
      nome: "Mochila Erasmus", tipo: "Facto", fonte: "historia",
      texto: "O programa Erasmus começou em 1987. Desde então, milhões de estudantes, professores e jovens estudaram, ensinaram ou fizeram voluntariado noutro país europeu — uma forma de conhecer outras culturas e cooperar."
    }
  };

  /* ---------- Desafios ----------
     nivel: 2 = 2.º ciclo; 3 = 3.º ciclo; (ausente) = ambos */
  const DESAFIOS = {

    d_bandeira: {
      titulo: "Constrói a bandeira europeia", tipo: "construir", sala: "simbolos",
      requer: ["s_bandeira"], objetivos: ["O2", "O8"],
      aprendizagem: "Identificar os símbolos da UE e explicar o significado da bandeira.",
      instrucao: "A bandeira do clube perdeu as estrelas. Usa as pistas que recolheste e reconstrói a bandeira europeia: escolhe a cor do fundo, a cor das estrelas, quantas são e como se dispõem.",
      explicacao: "12 estrelas douradas em círculo sobre fundo azul. O círculo simboliza unidade, solidariedade e harmonia. O número 12 não muda quando entram ou saem países.",
      fonte: "bandeira"
    },

    d_linguas: {
      titulo: "Unida na diversidade: saudações", tipo: "associar", sala: "simbolos",
      requer: ["s_linguas", "s_lema"], objetivos: ["O8", "O1"],
      aprendizagem: "Reconhecer a diversidade linguística da Europa e o sentido do lema «Unida na diversidade».",
      instrucao: "Viajantes de vários países deixaram saudações no painel. Associa cada saudação à língua correspondente: escolhe uma saudação e depois a língua.",
      colA: "Saudação", colB: "Língua",
      explicacao: "Cada língua é uma forma diferente de dizer a mesma coisa. A UE tem 24 línguas oficiais e respeita a diversidade cultural e linguística — é isso que significa «Unida na diversidade».",
      fonte: "linguas"
    },

    d_bandeiras: {
      titulo: "Bandeiras da União", tipo: "associar", sala: "mapa",
      requer: ["m_globo"], objetivos: ["O3", "O8"],
      aprendizagem: "Identificar Estados-membros da UE e as suas bandeiras, comparando semelhanças e diferenças.",
      instrucao: "As bandeiras do mapa caíram! Associa cada bandeira ao país correspondente. Algumas podem ser parecidas: compara bem as cores e a sua ordem.",
      colA: "Bandeira", colB: "País",
      explicacao: "Muitas bandeiras usam as mesmas cores, mas em ordem ou direção diferentes. Comparar as semelhanças e as diferenças ajuda a reconhecer cada país — e a perceber que todos partilham a bandeira europeia.",
      fonte: "paises"
    },

    d_euro: {
      titulo: "Euro, UE ou fora da UE?", tipo: "classificar", sala: "mapa",
      requer: ["m_moedas", "m_postal"], objetivos: ["O1", "O3"],
      aprendizagem: "Distinguir a UE, a área do euro e os países europeus que não pertencem à UE.",
      instrucao: "Arruma os países em três gavetas: países da UE que usam o euro, países da UE que não usam o euro, e países europeus fora da UE.",
      categorias: [
        { id: "euro", nome: "UE com euro" },
        { id: "semeuro", nome: "UE sem euro" },
        { id: "fora", nome: "Fora da UE" }
      ],
      explicacao: "Estar na Europa não é o mesmo que estar na UE, e estar na UE não significa usar o euro. Hoje: 27 países na UE, 21 deles com o euro (dados de 2026).",
      fonte: "paises"
    },

    d_linha: {
      titulo: "Linha do tempo da Europa unida", tipo: "ordenar", sala: "historia",
      requer: ["h_jornal", "h_pergaminho", "h_foto"], objetivos: ["O1", "O6"],
      aprendizagem: "Situar no tempo os principais marcos da integração europeia, incluindo a adesão de Portugal.",
      instrucao: "Os documentos do arquivo estão baralhados. Ordena os acontecimentos do mais antigo (em cima) para o mais recente (em baixo). Usa os botões ↑ e ↓. Consulta o caderno se precisares das datas.",
      explicacao: "A integração europeia foi gradual: começou com o carvão e o aço, passou por um mercado comum, deu origem à União Europeia e à moeda única. Portugal participa desde 1986.",
      fonte: "historia"
    },

    d_porque: {
      titulo: "Porquê unir a Europa?", tipo: "passos", sala: "historia",
      requer: ["h_jornal", "h_caixa"], objetivos: ["O6", "O10"],
      aprendizagem: "Explicar o objetivo de paz na origem da integração europeia e distinguir factos, opiniões e hipóteses.",
      explicacao: "Facto: a Declaração Schuman (1950) e a CECA (1951) tinham como objetivo central tornar a guerra impossível. Interpretação: o peso de cada razão (paz, economia, contexto internacional) é debatido pelos historiadores.",
      fonte: "diaEuropa"
    },

    d_lei: {
      titulo: "A viagem de uma lei europeia", tipo: "passos", sala: "instituicoes",
      requer: ["i_comissao", "i_hemiciclo", "i_conselho"], objetivos: ["O2", "O10"],
      aprendizagem: "Descrever como se aprova uma lei europeia e o papel de cada instituição.",
      intro: "Imagina que muitos europeus querem reduzir o plástico descartável que vai parar às praias. Acompanha a viagem da lei.",
      explicacao: "Comissão propõe → Parlamento Europeu e Conselho da UE decidem → os países aplicam → o Tribunal de Justiça garante o cumprimento. Foi assim que nasceu, por exemplo, a diretiva europeia de 2019 sobre plásticos de utilização única.",
      fonte: "instituicoes"
    },

    d_quem: {
      titulo: "Quem faz o quê?", tipo: "associar", sala: "instituicoes",
      requer: ["i_martelo", "i_cimeira"], objetivos: ["O2"],
      aprendizagem: "Associar as instituições europeias às suas funções.",
      instrucao: "Os cartões de identificação das instituições misturaram-se. Associa cada instituição à sua função.",
      colA: "Instituição", colB: "Função",
      explicacao: "Cada instituição tem um papel diferente. Esta divisão de tarefas garante equilíbrio entre os interesses dos cidadãos, dos governos e da UE no seu conjunto.",
      fonte: "instituicoes"
    },

    d_valores: {
      titulo: "Valores no dia a dia", tipo: "classificar", sala: "direitos",
      requer: ["v_valores"], objetivos: ["O10", "O7"],
      aprendizagem: "Relacionar os valores da UE com situações do quotidiano.",
      instrucao: "Lê cada situação e escolhe o valor da UE que está mais diretamente em causa.",
      categorias: [
        { id: "dignidade", nome: "Dignidade humana" },
        { id: "liberdade", nome: "Liberdade" },
        { id: "democracia", nome: "Democracia" },
        { id: "igualdade", nome: "Igualdade" },
        { id: "direito", nome: "Estado de direito" }
      ],
      explicacao: "Nota de rigor: muitas situações tocam em mais do que um valor (por exemplo, a discriminação ofende também a dignidade). Aqui escolheste o valor mais evidente em cada caso.",
      fonte: "valores"
    },

    d_docs: {
      titulo: "Três organizações, um objetivo", tipo: "classificar", sala: "direitos",
      requer: ["v_cartaz", "v_carta", "v_coe"], objetivos: ["O7", "O3"],
      aprendizagem: "Distinguir a ONU, o Conselho da Europa e a UE, e os seus documentos de direitos humanos, incluindo a DUDH.",
      instrucao: "Três organizações diferentes protegem os direitos humanos. A que organização pertence cada documento ou órgão?",
      categorias: [
        { id: "onu", nome: "ONU" },
        { id: "coe", nome: "Conselho da Europa" },
        { id: "ue", nome: "União Europeia" }
      ],
      explicacao: "A DUDH é mundial (ONU). O Conselho da Europa reúne 46 países europeus. A UE tem 27 países. As três organizações defendem os direitos humanos, cada uma à sua escala.",
      fonte: "coe"
    },

    d_patrimonio: {
      titulo: "Património cultural ou natural?", tipo: "classificar", sala: "futuro",
      requer: ["f_maquete", "f_folha"], objetivos: ["O4", "O10"],
      aprendizagem: "Distinguir património cultural e natural e reconhecer a importância de o preservar.",
      instrucao: "Os cartões do museu do clube estão por arrumar. Indica se cada bem Património Mundial é cultural (obra humana) ou natural (obra da natureza).",
      categorias: [
        { id: "cultural", nome: "Cultural" },
        { id: "natural", nome: "Natural" }
      ],
      explicacao: "Património cultural é criado pelo ser humano; património natural é formado pela natureza. Algumas paisagens misturam os dois. Alguns bens são partilhados por vários países — protegê-los exige cooperação.",
      fonte: "unesco"
    },

    d_rio: {
      titulo: "Conselho do Clube: o rio partilhado", tipo: "passos", sala: "futuro",
      requer: ["f_rio", "f_painel"], objetivos: ["O9", "O10", "O5"],
      aprendizagem: "Reconhecer a interdependência europeia e a necessidade de cooperação na defesa do ambiente.",
      intro: "O Clube Europeu reuniu-se para discutir um problema ambiental. Toma as decisões.",
      explicacao: "Os problemas ambientais atravessam fronteiras: rios, ar e clima são partilhados. Facto: existem acordos e leis comuns. Interpretação: a melhor ação para o clube depende das escolhas e da justificação de cada grupo.",
      fonte: "albufeira"
    }
  };

  /* ---------- Salas e objetos (coordenadas lógicas 960 × 600) ---------- */
  const SALAS = {
    atrio: {
      nome: "Átrio do Clube Europeu", curto: "Átrio",
      chao: "#1b2f6b", chao2: "#213a80", parede: "#0e1b47", acento: "#ffcc00",
      descricao: "O ponto de partida. Daqui partem as portas para as seis salas. No centro, o pedestal da bandeira espera pelas 12 estrelas.",
      inicio: { x: 480, y: 455 },
      objetos: [
        { id: "porta_simbolos", tipo: "porta", destino: "simbolos", x: 150, y: 70, w: 110, h: 60, desenho: "porta", rotulo: "1 · Símbolos e Línguas" },
        { id: "porta_mapa", tipo: "porta", destino: "mapa", x: 425, y: 70, w: 110, h: 60, desenho: "porta", rotulo: "2 · Sala do Mapa" },
        { id: "porta_historia", tipo: "porta", destino: "historia", x: 700, y: 70, w: 110, h: 60, desenho: "porta", rotulo: "3 · Arquivo da História" },
        { id: "porta_instituicoes", tipo: "porta", destino: "instituicoes", x: 150, y: 530, w: 110, h: 60, desenho: "porta", rotulo: "4 · Sala do Hemiciclo" },
        { id: "porta_direitos", tipo: "porta", destino: "direitos", x: 425, y: 530, w: 110, h: 60, desenho: "porta", rotulo: "5 · Direitos e Valores" },
        { id: "porta_futuro", tipo: "porta", destino: "futuro", x: 700, y: 530, w: 110, h: 60, desenho: "porta", rotulo: "6 · Património e Futuro" },
        { id: "pedestal", tipo: "pedestal", x: 420, y: 230, w: 120, h: 120, desenho: "pedestal", rotulo: "Pedestal da bandeira" },
        { id: "a_placa", tipo: "pista", x: 70, y: 290, w: 60, h: 50, desenho: "placa", rotulo: "Placa do clube" },
        { id: "a_correio", tipo: "pista", x: 840, y: 290, w: 50, h: 60, desenho: "correio", rotulo: "Caixa de correio" }
      ]
    },
    simbolos: {
      nome: "Sala dos Símbolos e das Línguas", curto: "Símbolos",
      chao: "#3a2f6b", chao2: "#43377a", parede: "#211a45", acento: "#ffcc00",
      descricao: "Aqui guardam-se os símbolos da UE e as saudações em várias línguas.",
      inicio: { x: 480, y: 500 },
      objetos: [
        { id: "saida", tipo: "saida", x: 425, y: 545, w: 110, h: 45, desenho: "saida", rotulo: "Voltar ao átrio" },
        { id: "s_bandeira", tipo: "pista", x: 110, y: 110, w: 70, h: 60, desenho: "bandeira", rotulo: "Bandeira dobrada" },
        { id: "s_origem", tipo: "pista", x: 210, y: 120, w: 46, h: 40, desenho: "etiqueta", rotulo: "Etiqueta antiga" },
        { id: "s_hino", tipo: "pista", x: 360, y: 100, w: 80, h: 70, desenho: "giradiscos", rotulo: "Gira-discos" },
        { id: "s_lema", tipo: "pista", x: 520, y: 95, w: 90, h: 50, desenho: "placa", rotulo: "Placa dourada" },
        { id: "s_dia", tipo: "pista", x: 680, y: 100, w: 60, h: 70, desenho: "calendario", rotulo: "Calendário" },
        { id: "s_linguas", tipo: "pista", x: 800, y: 230, w: 90, h: 110, desenho: "saudacoes", rotulo: "Painel das saudações" },
        { id: "d_bandeira", tipo: "desafio", x: 200, y: 330, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: bandeira" },
        { id: "d_linguas", tipo: "desafio", x: 600, y: 360, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: saudações" }
      ]
    },
    mapa: {
      nome: "Sala do Mapa", curto: "Mapa",
      chao: "#17506b", chao2: "#1c5c7a", parede: "#0b2d40", acento: "#7fd3ff",
      descricao: "Uma sala de exploradores: globo, moedas, passaporte e bandeiras de vários países.",
      inicio: { x: 480, y: 500 },
      objetos: [
        { id: "saida", tipo: "saida", x: 425, y: 545, w: 110, h: 45, desenho: "saida", rotulo: "Voltar ao átrio" },
        { id: "m_globo", tipo: "pista", x: 140, y: 110, w: 80, h: 90, desenho: "globo", rotulo: "Globo" },
        { id: "m_moedas", tipo: "pista", x: 400, y: 110, w: 70, h: 50, desenho: "moedas", rotulo: "Porta-moedas" },
        { id: "m_passaporte", tipo: "pista", x: 640, y: 110, w: 56, h: 66, desenho: "passaporte", rotulo: "Passaporte" },
        { id: "m_postal", tipo: "pista", x: 810, y: 250, w: 80, h: 56, desenho: "postal", rotulo: "Postal de viagem" },
        { id: "d_bandeiras", tipo: "desafio", x: 200, y: 340, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: bandeiras" },
        { id: "d_euro", tipo: "desafio", x: 620, y: 360, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: euro" }
      ]
    },
    historia: {
      nome: "Arquivo da História", curto: "História",
      chao: "#5a3d24", chao2: "#664629", parede: "#2f2012", acento: "#f0c27a",
      descricao: "Estantes cheias de documentos antigos. Cada objeto guarda uma data importante.",
      inicio: { x: 480, y: 500 },
      objetos: [
        { id: "saida", tipo: "saida", x: 425, y: 545, w: 110, h: 45, desenho: "saida", rotulo: "Voltar ao átrio" },
        { id: "h_jornal", tipo: "pista", x: 90, y: 110, w: 70, h: 56, desenho: "jornal", rotulo: "Jornal de 1950" },
        { id: "h_caixa", tipo: "pista", x: 210, y: 105, w: 70, h: 60, desenho: "caixa", rotulo: "Caixa de carvão e aço" },
        { id: "h_pergaminho", tipo: "pista", x: 340, y: 110, w: 70, h: 50, desenho: "pergaminho", rotulo: "Pergaminho de Roma" },
        { id: "h_foto", tipo: "pista", x: 470, y: 100, w: 70, h: 60, desenho: "foto", rotulo: "Fotografia dos Jerónimos" },
        { id: "h_pasta", tipo: "pista", x: 600, y: 110, w: 64, h: 50, desenho: "pasta", rotulo: "Pasta azul" },
        { id: "h_cofre", tipo: "pista", x: 720, y: 110, w: 60, h: 50, desenho: "moedas", rotulo: "Moedas novas" },
        { id: "h_caneta", tipo: "pista", x: 840, y: 200, w: 60, h: 50, desenho: "caneta", rotulo: "Caneta de Lisboa" },
        { id: "h_medalha", tipo: "pista", x: 840, y: 330, w: 56, h: 60, desenho: "medalha", rotulo: "Medalha" },
        { id: "d_linha", tipo: "desafio", x: 220, y: 350, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: linha do tempo" },
        { id: "d_porque", tipo: "desafio", x: 580, y: 350, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: porquê unir?" }
      ]
    },
    instituicoes: {
      nome: "Sala do Hemiciclo", curto: "Instituições",
      chao: "#1e4a3a", chao2: "#235443", parede: "#0f2a20", acento: "#9be3c0",
      descricao: "Uma sala inspirada nas instituições europeias, com um hemiciclo de assentos.",
      inicio: { x: 480, y: 500 },
      objetos: [
        { id: "saida", tipo: "saida", x: 425, y: 545, w: 110, h: 45, desenho: "saida", rotulo: "Voltar ao átrio" },
        { id: "i_hemiciclo", tipo: "pista", x: 380, y: 90, w: 200, h: 100, desenho: "hemiciclo", rotulo: "Hemiciclo" },
        { id: "i_comissao", tipo: "pista", x: 120, y: 120, w: 60, h: 70, desenho: "pulpito", rotulo: "Púlpito da Comissão" },
        { id: "i_conselho", tipo: "pista", x: 720, y: 110, w: 100, h: 60, desenho: "mesa", rotulo: "Mesa dos ministros" },
        { id: "i_cimeira", tipo: "pista", x: 780, y: 270, w: 90, h: 80, desenho: "mesaredonda", rotulo: "Mesa redonda das cimeiras" },
        { id: "i_martelo", tipo: "pista", x: 100, y: 270, w: 60, h: 50, desenho: "martelo", rotulo: "Martelo de juiz" },
        { id: "i_banco", tipo: "pista", x: 830, y: 420, w: 60, h: 60, desenho: "cofre", rotulo: "Cofre do banco" },
        { id: "i_rigor", tipo: "pista", x: 280, y: 250, w: 44, h: 40, desenho: "bilhete", rotulo: "Bilhete amarelo" },
        { id: "d_lei", tipo: "desafio", x: 230, y: 400, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: viagem de uma lei" },
        { id: "d_quem", tipo: "desafio", x: 620, y: 380, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: quem faz o quê?" }
      ]
    },
    direitos: {
      nome: "Sala dos Direitos e Valores", curto: "Direitos",
      chao: "#6b2440", chao2: "#782a49", parede: "#3a1222", acento: "#ffb3c9",
      descricao: "Cartazes, livros e uma urna de voto: aqui fala-se de dignidade, liberdade e direitos.",
      inicio: { x: 480, y: 500 },
      objetos: [
        { id: "saida", tipo: "saida", x: 425, y: 545, w: 110, h: 45, desenho: "saida", rotulo: "Voltar ao átrio" },
        { id: "v_cartaz", tipo: "pista", x: 120, y: 95, w: 80, h: 90, desenho: "cartaz", rotulo: "Cartaz da DUDH" },
        { id: "v_valores", tipo: "pista", x: 360, y: 95, w: 120, h: 70, desenho: "quadro", rotulo: "Quadro dos valores" },
        { id: "v_carta", tipo: "pista", x: 610, y: 110, w: 60, h: 56, desenho: "livro", rotulo: "Livro azul" },
        { id: "v_coe", tipo: "pista", x: 790, y: 110, w: 80, h: 56, desenho: "placa", rotulo: "Placa de Estrasburgo" },
        { id: "v_urna", tipo: "pista", x: 820, y: 320, w: 60, h: 70, desenho: "urna", rotulo: "Urna de voto" },
        { id: "d_valores", tipo: "desafio", x: 220, y: 360, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: valores" },
        { id: "d_docs", tipo: "desafio", x: 590, y: 360, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: três organizações" }
      ]
    },
    futuro: {
      nome: "Sala do Património e do Futuro", curto: "Futuro",
      chao: "#2d5a2a", chao2: "#336632", parede: "#173016", acento: "#c8f08f",
      descricao: "Um rio atravessa a sala: património, ambiente e os desafios da Europa de hoje.",
      inicio: { x: 480, y: 500 },
      rio: true,
      objetos: [
        { id: "saida", tipo: "saida", x: 425, y: 545, w: 110, h: 45, desenho: "saida", rotulo: "Voltar ao átrio" },
        { id: "f_maquete", tipo: "pista", x: 100, y: 100, w: 90, h: 70, desenho: "maquete", rotulo: "Maquete dos Jerónimos" },
        { id: "f_folha", tipo: "pista", x: 260, y: 110, w: 56, h: 56, desenho: "folha", rotulo: "Folha de laurissilva" },
        { id: "f_rio", tipo: "pista", x: 430, y: 100, w: 100, h: 66, desenho: "mapario", rotulo: "Mapa do rio Douro" },
        { id: "f_postal", tipo: "pista", x: 600, y: 110, w: 70, h: 50, desenho: "postal", rotulo: "Postal do Porto" },
        { id: "f_painel", tipo: "pista", x: 760, y: 100, w: 100, h: 70, desenho: "painelsolar", rotulo: "Painel solar" },
        { id: "f_jornal", tipo: "pista", x: 840, y: 290, w: 66, h: 54, desenho: "jornal", rotulo: "Jornal de hoje" },
        { id: "f_mochila", tipo: "pista", x: 80, y: 300, w: 56, h: 66, desenho: "mochila", rotulo: "Mochila Erasmus" },
        { id: "d_patrimonio", tipo: "desafio", x: 240, y: 420, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: património" },
        { id: "d_rio", tipo: "desafio", x: 640, y: 420, w: 80, h: 70, desenho: "estacao", rotulo: "Estação: rio partilhado" }
      ]
    }
  };

  const ORDEM_SALAS = ["simbolos", "mapa", "historia", "instituicoes", "direitos", "futuro"];

  return { FONTES, OBJETIVOS_CLUBE, PISTAS, DESAFIOS, SALAS, ORDEM_SALAS };
})();
