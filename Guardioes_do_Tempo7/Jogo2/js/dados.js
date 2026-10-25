/* =========================================================
   Guardiões do Tempo — conteúdos do jogo
   Fonte principal: Sebenta de Estudo, História 7.º ano, Tema 1
   (Agrupamento de Escolas de São Pedro da Cova, 2026/2027).
   As referências «p. X» remetem para as páginas dessa sebenta.
   tipo: 'facto' | 'hipotese' | 'interpretacao'
   ========================================================= */

// Aprendizagens Essenciais (DGE, História 7.º ano, Tema 1) trabalhadas no jogo
const APRENDIZAGENS = {
  AE1: 'Reconhecer que o conhecimento histórico se constrói a partir de fontes (materiais, escritas e orais).',
  AE2: 'Identificar a produção de instrumentos e o domínio da natureza como momentos decisivos para a Humanidade.',
  AE3: 'Comparar sociedades recoletoras/caçadoras e agropastoris, e estas com as sociedades atuais.',
  AE4: 'Relacionar ritos mágicos e funerários com manifestações artísticas.',
  AE5: 'Compreender a passagem do modo de vida recoletor ao modo de vida produtor.',
  AE6: 'Relacionar a organização económica, social e política das primeiras civilizações urbanas com os recursos do espaço onde surgiram.',
  AE7: 'Destacar contributos das primeiras civilizações que permanecem na atualidade.',
  AE8: 'Diferenciar formas de escrita e suportes usados para registar mensagens, no passado e no presente.'
};

const ERAS = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: 'paleo',
    nome: 'O abrigo dos recoletores',
    periodo: 'Paleolítico',
    quando: 'Há mais de 3 milhões de anos até c. 10 000 a.C. (no Próximo Oriente)',
    paginas: 'pp. 3–5',
    intro: 'Chegaste a um abrigo na rocha, junto a um rio. Aqui viveu, durante algum tempo, um pequeno grupo de caçadores-recoletores. Investiga os vestígios que deixaram: são as tuas fontes.',
    objetivo: 'Investiga os 6 vestígios do abrigo e depois toca na Pedra do Tempo para resolver os desafios.',
    cenaLegenda: 'Ilustração estilizada de um abrigo paleolítico — não é uma reconstituição exata.',
    selo: { nome: 'Selo da Pedra Lascada', cor: '#a0785a' },
    objetos: [
      {
        id: 'camada', nome: 'Corte de escavação', x: 150, y: 420,
        titulo: 'Camadas da terra: o trabalho da arqueologia',
        texto: 'Os arqueólogos escavam o solo camada a camada. Em geral, as camadas mais fundas são as mais antigas. Em cada uma registam instrumentos, ossos, sementes e restos de fogueiras. Na Pré-História não havia escrita, por isso as <strong>fontes materiais</strong> são essenciais. Para épocas mais recentes, os historiadores também usam fontes escritas e orais.',
        pagina: 'p. 4 («Como sabemos?» e «Fonte histórica»)', tipo: 'facto',
        conceitos: ['arqueologia', 'fonte histórica'], ae: 'AE1'
      },
      {
        id: 'biface', nome: 'Instrumento de pedra lascada', x: 300, y: 455,
        titulo: 'Um instrumento de pedra lascada',
        texto: 'Este instrumento foi feito batendo uma pedra contra outra para retirar lascas e criar um gume cortante. Com pedra, madeira e osso, os grupos humanos cortavam carne, raspavam peles e trabalhavam a madeira. Os instrumentos aumentaram o <strong>domínio da natureza</strong>.',
        pagina: 'pp. 3–4', tipo: 'facto',
        nota: 'A sebenta indica «c. 2,5 milhões de anos» para os primeiros instrumentos. Hoje conhecem-se utensílios de pedra com cerca de 3,3 milhões de anos (sítio de Lomekwi 3, no Quénia). Os de c. 2,6 milhões de anos pertencem à tradição mais antiga bem estudada (olduvaiense).',
        conceitos: ['Paleolítico'], ae: 'AE2'
      },
      {
        id: 'fogueira', nome: 'Restos de fogueira', x: 470, y: 430,
        titulo: 'O domínio do fogo',
        texto: 'Cinzas, carvões e ossos queimados mostram que aqui se fez fogo. O fogo dava calor e luz, afastava animais, permitia cozinhar os alimentos e reunia o grupo à sua volta.',
        pagina: 'p. 3 («Mudanças decisivas»)', tipo: 'facto',
        nota: 'Quando começou o domínio do fogo? Há indícios com cerca de 1 milhão de anos (gruta de Wonderwerk, África do Sul), mas muitos vestígios antigos ainda são discutidos, porque também podem resultar de incêndios naturais. O uso regular do fogo está bem documentado a partir de há cerca de 400 000 anos.',
        conceitos: [], ae: 'AE2'
      },
      {
        id: 'cranio', nome: 'Molde de crânio fóssil', x: 620, y: 465,
        titulo: 'A hominização não foi uma escada',
        texto: 'A hominização é o longo processo evolutivo que levou ao ser humano atual. Algumas espécies e as datas aproximadas em que viveram:<br>• <em>Australopithecus</em>: c. 4 a 2 milhões de anos;<br>• <em>Homo habilis</em>: c. 2,4 a 1,4 milhões de anos;<br>• <em>Homo erectus</em>: c. 1,9 milhões a 110 000 anos;<br>• Neandertais: c. 400 000 a 40 000 anos;<br>• <em>Homo sapiens</em>: desde c. 300 000 anos.<br>Várias espécies viveram ao mesmo tempo. E atenção: não descendemos dos macacos atuais — partilhamos com eles antepassados comuns.',
        pagina: 'p. 3', tipo: 'facto',
        nota: 'Os fósseis de <em>Homo sapiens</em> mais antigos conhecidos (Jebel Irhoud, Marrocos) têm cerca de 300 000 anos. O esquema da p. 3 liga as espécies com setas, o que pode sugerir que cada uma «deu origem» à seguinte. Não é assim: por exemplo, os Neandertais não são nossos antepassados, mas «primos» que conviveram com o <em>Homo sapiens</em>.',
        conceitos: [], ae: 'AE2'
      },
      {
        id: 'pintura', nome: 'Pintura rupestre', x: 230, y: 250,
        titulo: 'Arte rupestre',
        texto: 'Na parede do abrigo há animais pintados com pigmentos como o ocre e o carvão. A arte rupestre inclui pinturas e gravuras em rochas. Podia ter funções simbólicas, rituais, narrativas ou sociais — mas o seu significado exato nem sempre é conhecido. Em Portugal, o Vale do Côa tem milhares de gravuras paleolíticas ao ar livre.',
        pagina: 'p. 5 («Arte rupestre»)', tipo: 'interpretacao',
        nota: 'Que as pinturas existem é um facto. Para que serviam é uma interpretação: a ideia de «magia para ter sorte na caça» é uma hipótese, não uma certeza.',
        conceitos: ['arte rupestre', 'ritos mágicos'], ae: 'AE4'
      },
      {
        id: 'sepultura', nome: 'Sepultura com oferendas', x: 800, y: 420,
        titulo: 'Um enterramento intencional',
        texto: 'Um corpo foi colocado numa cova, com conchas e um instrumento de pedra ao lado. Enterramentos intencionais e oferendas sugerem que algumas comunidades tinham crenças sobre a morte e praticavam <strong>ritos funerários</strong>.',
        pagina: 'p. 5', tipo: 'interpretacao',
        nota: 'Sem textos escritos, os historiadores interpretam estes vestígios com base em evidências e evitam certezas excessivas.',
        conceitos: ['ritos funerários'], ae: 'AE4'
      }
    ],
    desafios: [
      {
        id: 'p1', tipo: 'ordenar', titulo: 'Desafio 1 — A linha da hominização',
        ae: 'AE2', pagina: 'p. 3',
        enunciado: 'Ordena as espécies da mais antiga para a mais recente, de acordo com o momento em que surgiram. Usa os botões ↑ e ↓. Dica: a pista do crânio fóssil está no teu caderno.',
        itens: ['Australopithecus', 'Homo habilis', 'Homo erectus', 'Neandertais', 'Homo sapiens'],
        explicacao: 'Correto! <em>Australopithecus</em> (c. 4–2 milhões de anos) → <em>Homo habilis</em> (c. 2,4 milhões) → <em>Homo erectus</em> (c. 1,9 milhões) → Neandertais (c. 400 000 anos) → <em>Homo sapiens</em> (desde c. 300 000 anos). Mas lembra-te: esta ordem não é uma escada. Os Neandertais e o <em>Homo sapiens</em> viveram ao mesmo tempo e chegaram a cruzar-se.',
        dica: 'Procura no caderno as datas de cada espécie. A mais antiga tem milhões de anos; a nossa espécie surgiu há c. 300 000 anos.'
      },
      {
        id: 'p2', tipo: 'classificar', titulo: 'Desafio 2 — Facto ou interpretação?',
        ae: 'AE1', pagina: 'pp. 4–5',
        enunciado: 'Um historiador distingue o que observa nas fontes do que interpreta a partir delas. Classifica cada afirmação.',
        categorias: ['Facto observado', 'Interpretação'],
        itens: [
          { t: 'Na parede do abrigo há figuras de animais pintadas com ocre.', c: 0 },
          { t: 'As pinturas serviam para garantir sorte na caça.', c: 1 },
          { t: 'Junto à entrada há cinzas e ossos queimados.', c: 0 },
          { t: 'O grupo acendia fogueiras sobretudo para afastar animais perigosos.', c: 1 },
          { t: 'O corpo estava numa cova, com conchas e um instrumento de pedra.', c: 0 },
          { t: 'Este grupo acreditava numa vida depois da morte.', c: 1 }
        ],
        explicacao: 'Muito bem! Os factos descrevem o que se encontra nas fontes (pinturas, cinzas, uma sepultura). As interpretações explicam o seu significado — podem estar bem fundamentadas, mas não são certezas. Como não há textos escritos do Paleolítico, os historiadores devem evitar certezas excessivas.',
        dica: 'Pergunta-te: «Um arqueólogo consegue ver isto diretamente?» Se sim, é um facto observado.'
      }
    ]
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 'neo',
    nome: 'A aldeia dos primeiros agricultores',
    periodo: 'Neolítico',
    quando: 'A partir de c. 10 000 a.C. no Crescente Fértil; na Península Ibérica, só no VI milénio a.C.',
    paginas: 'pp. 5–6',
    intro: 'Avançaste milhares de anos. Este grupo já não se desloca à procura de alimento: semeia, cria animais e vive numa aldeia. O que mudou — e porquê?',
    objetivo: 'Investiga os 6 elementos da aldeia e depois toca na Pedra do Tempo. As tuas decisões vão fazer crescer a aldeia.',
    cenaLegenda: 'Ilustração estilizada de uma aldeia neolítica — não é uma reconstituição exata.',
    selo: { nome: 'Selo da Espiga', cor: '#c9a646' },
    objetos: [
      {
        id: 'campo', nome: 'Campo de cereais', x: 160, y: 400,
        titulo: 'Domesticar plantas',
        texto: 'A partir de cerca de 10 000 a.C., alguns grupos começaram a semear e a selecionar plantas como o trigo e a cevada. No <strong>Crescente Fértil</strong> esta mudança foi especialmente precoce; noutras regiões do mundo aconteceu de forma independente e em momentos diferentes. À Península Ibérica, a agricultura só chegou no VI milénio a.C.',
        pagina: 'p. 5', tipo: 'facto',
        conceitos: ['Neolítico', 'modo de vida produtor', 'milénio'], ae: 'AE5'
      },
      {
        id: 'cabras', nome: 'Cabras e ovelhas', x: 330, y: 455,
        titulo: 'Domesticar animais: a pastorícia',
        texto: 'Cabras, ovelhas e, mais tarde, bois foram domesticados. Davam carne, leite, peles e lã. A <strong>agricultura e a pastorícia</strong> permitiram produzir alimentos de forma mais regular, embora continuassem dependentes do clima e exigissem muito trabalho.',
        pagina: 'p. 5', tipo: 'facto',
        conceitos: ['modo de vida produtor'], ae: 'AE5'
      },
      {
        id: 'mo', nome: 'Mó de pedra', x: 520, y: 470,
        titulo: 'Moer o cereal',
        texto: 'Na mó, esfregava-se uma pedra sobre outra para transformar os grãos em farinha. Moagem, cerâmica, tecelagem e construção foram <strong>novos ofícios</strong>. No Neolítico também se generalizaram instrumentos de pedra polida, como machados para abater árvores.',
        pagina: 'p. 5 («Consequências»)', tipo: 'facto',
        nota: 'A «pedra polida» não é referida na sebenta, mas é uma característica habitual do Neolítico apresentada nos manuais.',
        conceitos: [], ae: 'AE2'
      },
      {
        id: 'ceramica', nome: 'Vaso de cerâmica', x: 640, y: 430,
        titulo: 'Cerâmica decorada',
        texto: 'Os vasos de barro cozido serviam para guardar cereais e líquidos e para cozinhar. Muitos eram decorados: tinham utilidade, mas também valor estético e simbólico.',
        pagina: 'p. 6', tipo: 'facto',
        conceitos: [], ae: 'AE4'
      },
      {
        id: 'celeiro', nome: 'Celeiro', x: 790, y: 380,
        titulo: 'Guardar os excedentes',
        texto: 'Quando se produz mais do que se consome no momento, há <strong>excedentes</strong>. Guardá-los em celeiros e vasos ajudava a enfrentar maus anos, permitia trocas e sustentava mais pessoas — a população cresceu. Em certos contextos, surgiram também maiores diferenças sociais e conflitos por recursos.',
        pagina: 'p. 5', tipo: 'facto',
        conceitos: ['acumulação de excedentes', 'sedentarização'], ae: 'AE5'
      },
      {
        id: 'tear', nome: 'Tear', x: 880, y: 455,
        titulo: 'Tecelagem e cestaria',
        texto: 'Com fibras vegetais (como o linho) e animais (como a lã), fabricavam-se tecidos no tear e cestos entrançados. A permanência num local favoreceu casas mais duradouras, celeiros e oficinas.',
        pagina: 'p. 6', tipo: 'facto',
        conceitos: ['sedentarização'], ae: 'AE5'
      }
    ],
    desafios: [
      {
        id: 'n1', tipo: 'classificar', titulo: 'Desafio 1 — Recoletor ou produtor?',
        ae: 'AE3', pagina: 'pp. 4–6 e 12',
        enunciado: 'Compara os dois modos de vida. Coloca cada característica na coluna certa.',
        categorias: ['Modo de vida recoletor', 'Modo de vida produtor'],
        itens: [
          { t: 'Caça, pesca e recolha de frutos', c: 0 },
          { t: 'Agricultura e pastorícia', c: 1 },
          { t: 'Nomadismo ou mobilidade sazonal', c: 0 },
          { t: 'Sedentarização em aldeias permanentes', c: 1 },
          { t: 'Grutas e abrigos temporários', c: 0 },
          { t: 'Celeiros para guardar excedentes', c: 1 },
          { t: 'Grande dependência dos recursos que a natureza oferece', c: 0 },
          { t: 'Novos ofícios: cerâmica e tecelagem', c: 1 }
        ],
        explicacao: 'Excelente! Os recoletores obtinham da natureza aquilo de que precisavam e deslocavam-se. Os produtores passaram a produzir alimentos, fixaram-se e começaram a acumular excedentes. Repara: os produtores continuavam dependentes do clima — a mudança não acabou com as dificuldades.',
        dica: 'Pergunta-te: esta característica exige ficar no mesmo lugar e produzir alimentos?'
      },
      {
        id: 'n2', tipo: 'decisoes', titulo: 'Desafio 2 — Um ano na aldeia',
        ae: 'AE5', pagina: 'p. 5 (esquema e «Consequências»)',
        enunciado: 'Ajuda a comunidade a tomar decisões. Cada boa decisão faz crescer a aldeia no ecrã.',
        passos: [
          {
            sit: 'Perto do acampamento cresceram espigas de cereal selvagem. O grupo observa que as sementes que caem no chão dão novas plantas. O que fazem?',
            op: [
              { t: 'Guardam parte das sementes para as semear perto do acampamento.', ok: true, f: 'Boa decisão! Observar a natureza e semear foi o início da domesticação das plantas.' },
              { t: 'Comem todas as sementes de imediato.', ok: false, f: 'Assim matam a fome hoje, mas não há sementes para semear. A agricultura exige guardar sementes.' },
              { t: 'Partem para outro lugar, como sempre fizeram.', ok: false, f: 'É o comportamento recoletor. Para cultivar, é preciso ficar para cuidar dos campos até à colheita.' }
            ]
          },
          {
            sit: 'Os campos exigem cuidados durante meses: semear, regar, afastar animais, colher. Como se organiza o grupo?',
            op: [
              { t: 'Constroem casas mais duradouras e fixam-se junto aos campos.', ok: true, f: 'Certo! A agricultura favoreceu a sedentarização e as aldeias permanentes.' },
              { t: 'Continuam a mudar de abrigo todas as semanas.', ok: false, f: 'Se partirem, os campos ficam abandonados. Produzir alimentos levou as comunidades a fixarem-se.' }
            ]
          },
          {
            sit: 'A colheita foi maior do que o necessário para os próximos dias. O que fazem ao cereal que sobra?',
            op: [
              { t: 'Guardam-no em celeiros e vasos de cerâmica.', ok: true, f: 'Exatamente: são os excedentes. Guardá-los ajuda nos maus anos e permite alimentar mais pessoas.' },
              { t: 'Deixam-no no campo.', ok: false, f: 'O cereal estragava-se ou era comido por animais. Armazenar foi uma das grandes novidades do Neolítico.' }
            ]
          },
          {
            sit: 'Com alimento guardado, nem todas as pessoas precisam de trabalhar sempre nos campos. Que mudança acontece?',
            op: [
              { t: 'Algumas pessoas dedicam-se a ofícios (cerâmica, tecelagem) e fazem trocas com outras aldeias.', ok: true, f: 'Muito bem! Os excedentes permitiram novos ofícios e trocas entre comunidades.' },
              { t: 'Toda a gente deixa de trabalhar.', ok: false, f: 'Os excedentes não eliminam o trabalho. Permitem que algumas pessoas façam outras tarefas.' },
              { t: 'Voltam a viver só da caça.', ok: false, f: 'A caça continuou a existir, mas a base da alimentação passou a ser a produção agrícola e pastoril.' }
            ]
          }
        ],
        explicacao: 'A tua aldeia cresceu! Observação da natureza → domesticação de plantas e animais → produção regular de alimentos → sedentarização → excedentes → crescimento da população, novos ofícios e trocas. Nota: foi uma mudança gradual, ao longo de milhares de anos, e as fases influenciaram-se umas às outras — em alguns locais do Próximo Oriente já existiam aldeias antes da agricultura.'
      }
    ]
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 'mega',
    nome: 'O campo das grandes pedras',
    periodo: 'Neolítico e Calcolítico — megalitismo',
    quando: 'Na Península Ibérica, sobretudo entre o V e o III milénio a.C. (datas aproximadas)',
    paginas: 'p. 6',
    intro: 'Estás numa planície do atual Alentejo. As comunidades agropastoris ergueram aqui monumentos com enormes blocos de pedra. Para que serviriam?',
    objetivo: 'Investiga os 4 vestígios megalíticos e depois toca na Pedra do Tempo para construíres uma anta.',
    cenaLegenda: 'Ilustração estilizada de uma paisagem megalítica — não é uma reconstituição exata.',
    selo: { nome: 'Selo do Menir', cor: '#8a8f7a' },
    objetos: [
      {
        id: 'menir', nome: 'Menir', x: 190, y: 400,
        titulo: 'O menir',
        texto: 'Um <strong>menir</strong> é uma grande pedra colocada verticalmente, isolada ou em grupo. O <strong>megalitismo</strong> é a construção de monumentos com grandes blocos de pedra («mega» = grande; «lito» = pedra).',
        pagina: 'p. 6 («Megalitismo — três termos»)', tipo: 'facto',
        conceitos: ['megalitismo'], ae: 'AE4'
      },
      {
        id: 'cromeleque', nome: 'Cromeleque', x: 420, y: 330,
        titulo: 'O cromeleque dos Almendres',
        texto: 'Um <strong>cromeleque</strong> é um conjunto de menires organizado em círculo ou em alinhamento. Perto de Évora, o Cromeleque dos Almendres tem cerca de uma centena de menires e é considerado o maior recinto megalítico da Península Ibérica.',
        pagina: 'p. 6', tipo: 'facto',
        nota: 'Há investigadores que pensam que alguns cromeleques estavam relacionados com a observação do Sol e da Lua. É uma hipótese, não uma certeza.',
        conceitos: ['megalitismo'], ae: 'AE4'
      },
      {
        id: 'anta', nome: 'Anta (dólmen)', x: 700, y: 400,
        titulo: 'A anta ou dólmen',
        texto: 'A <strong>anta</strong> (ou dólmen) é um monumento funerário formado por pedras verticais (esteios) e uma grande laje de cobertura. Muitas eram túmulos coletivos e ficavam cobertas por um monte de terra e pedras, a <strong>mamoa</strong>. Eram lugares de memória e de ritual ligados aos antepassados.',
        pagina: 'p. 6', tipo: 'facto',
        conceitos: ['ritos funerários'], ae: 'AE4'
      },
      {
        id: 'placa', nome: 'Placa de xisto gravada', x: 860, y: 465,
        titulo: 'Uma placa de xisto gravada',
        texto: 'Em antas do Alentejo encontraram-se placas de xisto com gravuras geométricas, colocadas junto dos mortos. Mostram a ligação entre ritos funerários e manifestações artísticas. Muitas estão hoje no Museu de Évora.',
        pagina: 'p. 6 («Manifestações religiosas e artísticas»)', tipo: 'interpretacao',
        nota: 'O significado destas placas (identidade, proteção, representação de divindades?) continua a ser discutido pelos arqueólogos.',
        conceitos: ['ritos funerários'], ae: 'AE4'
      }
    ],
    desafios: [
      {
        id: 'm1', tipo: 'associar', titulo: 'Desafio 1 — Vocabulário megalítico',
        ae: 'AE4', pagina: 'p. 6',
        enunciado: 'Associa cada termo à definição correta.',
        pares: [
          { termo: 'Megalitismo', def: 'Construção de monumentos com grandes blocos de pedra.' },
          { termo: 'Menir', def: 'Grande pedra colocada verticalmente.' },
          { termo: 'Anta ou dólmen', def: 'Monumento funerário com pedras verticais e uma laje de cobertura.' },
          { termo: 'Cromeleque', def: 'Conjunto de menires em círculo ou alinhamento.' }
        ],
        explicacao: 'Perfeito! Estes monumentos são hoje património arqueológico. Tal como preservamos cemitérios e memoriais, estas comunidades criaram lugares duradouros de memória, ritual e identidade coletiva.',
        dica: 'Lembra-te: «mega» = grande, «lito» = pedra. Qual destes termos é o único que é funerário?'
      },
      {
        id: 'm2', tipo: 'decisoes', titulo: 'Desafio 2 — Constrói uma anta',
        ae: 'AE4', pagina: 'p. 6',
        enunciado: 'A comunidade quer construir um túmulo coletivo para os seus mortos. Escolhe os passos e vê a anta a ganhar forma.',
        passos: [
          {
            sit: 'Os blocos de pedra já foram arrastados até ao local. Por onde começam?',
            op: [
              { t: 'Erguem as pedras verticais (os esteios) em círculo, formando a câmara.', ok: true, f: 'Certo! Os esteios formam as paredes da câmara funerária.' },
              { t: 'Põem primeiro a laje de cobertura no chão.', ok: false, f: 'Sem os esteios levantados, a laje não teria onde assentar.' },
              { t: 'Amontoam já a terra da mamoa.', ok: false, f: 'A mamoa cobre o monumento depois de construído.' }
            ]
          },
          {
            sit: 'Agora é preciso colocar a laje de cobertura, com várias toneladas, por cima dos esteios. Qual é a explicação mais plausível?',
            op: [
              { t: 'Arrastam-na por uma rampa de terra, com troncos, alavancas, cordas e muitas pessoas.', ok: true, f: 'É a hipótese mais aceite: técnicas simples e muita cooperação. Não há registos escritos, por isso é uma hipótese.' },
              { t: 'Usam uma grua com motor.', ok: false, f: 'Isso é um anacronismo: não existiam motores na Pré-História!' },
              { t: 'Um só homem forte levanta-a.', ok: false, f: 'Um bloco com várias toneladas exigia o esforço organizado de muitas pessoas.' }
            ]
          },
          {
            sit: 'A anta está pronta. Para que vai servir?',
            op: [
              { t: 'Para enterrar os mortos da comunidade, com oferendas, e lembrar os antepassados.', ok: true, f: 'Exatamente! As antas eram monumentos funerários, muitas vezes coletivos, cobertos por uma mamoa.' },
              { t: 'Para guardar os cereais da aldeia.', ok: false, f: 'Os cereais guardavam-se em celeiros e vasos. A anta era um monumento funerário.' },
              { t: 'Para servir de casa ao chefe.', ok: false, f: 'Os vestígios encontrados (ossos humanos e oferendas) mostram que eram túmulos.' }
            ]
          }
        ],
        explicacao: 'A anta está construída e coberta pela mamoa! Estes monumentos mostram que as comunidades neolíticas eram capazes de se organizar para grandes trabalhos coletivos e que tinham crenças ligadas à morte e aos antepassados.'
      }
    ]
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 'egito',
    nome: 'Nas margens do Nilo',
    periodo: 'Egito antigo',
    quando: 'De c. 3100 a.C. (unificação) a 30 a.C. (domínio romano)',
    paginas: 'pp. 7–10',
    intro: 'Agora estás no vale do Nilo. Aqui surgiu uma das primeiras civilizações urbanas, com um Estado, escrita e grandes monumentos. Descobre como o rio moldou esta sociedade.',
    objetivo: 'Investiga os 7 elementos do vale do Nilo e depois toca na Pedra do Tempo. Vais viver um ano agrícola, organizar a sociedade e ajudar um escriba.',
    cenaLegenda: 'Ilustração estilizada do vale do Nilo; reúne elementos de épocas diferentes da longa história egípcia.',
    selo: { nome: 'Selo do Escaravelho', cor: '#3f8f8a' },
    objetos: [
      {
        id: 'nilo', nome: 'O rio Nilo', x: 120, y: 470,
        titulo: 'O Nilo, eixo da civilização',
        texto: 'Todos os anos o Nilo transbordava e deixava nas margens <strong>lodos férteis</strong>. Com canais e diques, os agricultores geriam a água e produziam cereais em quantidade. A gestão da água e das obras exigia organização, o que favoreceu uma administração centralizada. Era um território rodeado de deserto: fora do vale, quase nada crescia.',
        pagina: 'p. 8 («O Nilo como eixo da civilização»)', tipo: 'facto',
        conceitos: ['núcleo urbano'], ae: 'AE6'
      },
      {
        id: 'barco', nome: 'Barco à vela', x: 300, y: 395,
        titulo: 'Uma estrada de água',
        texto: 'O Nilo era a grande via de comunicação entre o Alto e o Baixo Egito. Os barcos desciam o rio com a corrente (para norte) e subiam-no com a vela, aproveitando o vento que sopra geralmente de norte. Transportavam pessoas, cereais, pedra e madeira.',
        pagina: 'p. 8', tipo: 'facto',
        conceitos: [], ae: 'AE6'
      },
      {
        id: 'farao', nome: 'Estátua do faraó', x: 460, y: 330,
        titulo: 'O poder sacralizado do faraó',
        texto: 'O faraó era o centro do poder político e religioso. A sua autoridade era <strong>sacralizada</strong>: estava associada ao mundo divino e à manutenção da ordem. Governava com a ajuda de escribas, funcionários e sacerdotes. A unificação do Alto e do Baixo Egito ocorreu por volta de 3100 a.C.',
        pagina: 'p. 8', tipo: 'facto',
        conceitos: ['poder sacralizado'], ae: 'AE6'
      },
      {
        id: 'escriba', nome: 'Escriba com papiro', x: 590, y: 465,
        titulo: 'O escriba e a escrita',
        texto: 'Poucas pessoas sabiam escrever. Os escribas registavam colheitas, impostos, trabalhadores e decisões. Usavam os <strong>hieróglifos</strong> e formas mais rápidas de escrita (hierática e, mais tarde, demótica), em papiro, pedra, madeira ou cerâmica. Os registos mais antigos de escrita egípcia têm cerca de 5200 anos.',
        pagina: 'pp. 8 e 10', tipo: 'facto',
        nota: 'Os hieróglifos não são apenas «desenhos»: combinam sinais que representam ideias com sinais que representam sons.',
        conceitos: ['escrita figurativa'], ae: 'AE8'
      },
      {
        id: 'piramide', nome: 'Pirâmide', x: 740, y: 280,
        titulo: 'Quem construiu as pirâmides?',
        texto: 'As grandes pirâmides de Gizé foram construídas por volta de 2600–2500 a.C. como túmulos de faraós. A arqueologia encontrou aldeias, padarias e cemitérios de trabalhadores: eram equipas organizadas, alimentadas e alojadas pelo Estado, com trabalhadores especializados e outros que trabalhavam por turnos.',
        pagina: 'pp. 8–9 («Atenção»)', tipo: 'facto',
        nota: 'No Egito também existiam escravos (por exemplo, prisioneiros de guerra) — a «escravatura» é um conceito deste tema. Mas os estudos indicam que não foram a principal mão de obra das pirâmides. A sebenta não refere a existência de escravos, o que pode levar a pensar que não existiam.',
        conceitos: ['escravatura'], ae: 'AE6'
      },
      {
        id: 'templo', nome: 'Templo', x: 870, y: 360,
        titulo: 'Muitos deuses: o politeísmo',
        texto: 'A religião egípcia era maioritariamente <strong>politeísta</strong>. Os deuses estavam ligados à natureza, a cidades e a aspetos da vida: Rá (o Sol), Osíris, Ísis, Hórus, Anúbis… Os templos eram centros religiosos, económicos e administrativos.',
        pagina: 'p. 9', tipo: 'facto',
        conceitos: ['politeísmo'], ae: 'AE6'
      },
      {
        id: 'sarcofago', nome: 'Sarcófago', x: 780, y: 478,
        titulo: 'A vida depois da morte',
        texto: 'Os Egípcios acreditavam na continuidade da existência após a morte. A <strong>mumificação</strong> preservava o corpo, sobretudo entre as elites. Nos túmulos colocavam-se objetos para acompanhar o morto e textos funerários, como o <strong>Livro dos Mortos</strong>, que o orientavam e protegiam no além.',
        pagina: 'p. 9', tipo: 'facto',
        nota: 'O Livro dos Mortos só se generalizou a partir de c. 1550 a.C. (Império Novo); antes existiam outros textos funerários.',
        conceitos: [], ae: 'AE6'
      }
    ],
    desafios: [
      {
        id: 'e1', tipo: 'decisoes', titulo: 'Desafio 1 — O ano do Nilo',
        ae: 'AE6', pagina: 'p. 8',
        enunciado: 'O ano agrícola egípcio dividia-se em três estações, marcadas pelo rio. Decide o que fazem os camponeses em cada uma. Repara no nível da água!',
        passos: [
          {
            sit: '<strong>Akhet — a cheia.</strong> O Nilo transbordou e cobriu os campos durante semanas. O que fazem os camponeses?',
            op: [
              { t: 'Reparam ferramentas e cuidam dos animais; muitos trabalham em obras organizadas pelo Estado.', ok: true, f: 'Certo! Com os campos inundados não se podia cultivar. É provável que muitos camponeses trabalhassem então em obras públicas (é uma hipótese aceite por muitos historiadores).' },
              { t: 'Semeiam os campos debaixo de água.', ok: false, f: 'As sementes perdiam-se. É preciso esperar que a água baixe.' },
              { t: 'Colhem o trigo.', ok: false, f: 'Nesta altura ainda não há o que colher: a cheia está a fertilizar os solos.' }
            ]
          },
          {
            sit: '<strong>Peret — a sementeira.</strong> A água recuou e deixou lodo fértil. O que fazem?',
            op: [
              { t: 'Lavram, semeiam e regam os campos com a água guardada nos canais.', ok: true, f: 'Exatamente! O lodo fertilizava os solos e os canais permitiam regar.' },
              { t: 'Partem para o deserto à procura de caça.', ok: false, f: 'Esta é a estação mais importante para a agricultura: é preciso aproveitar o lodo fértil.' }
            ]
          },
          {
            sit: '<strong>Shemu — a colheita.</strong> O rio está baixo e os cereais estão maduros. O que fazem?',
            op: [
              { t: 'Colhem os cereais, guardam-nos em celeiros e entregam uma parte como imposto.', ok: true, f: 'Muito bem! Os excedentes sustentavam o Estado, os templos e as pessoas que não trabalhavam nos campos.' },
              { t: 'Deixam os cereais no campo até à próxima cheia.', ok: false, f: 'A cheia destruiria a colheita. É preciso colher e armazenar.' }
            ]
          },
          {
            sit: 'A colheita foi abundante. Quem regista as quantidades e os impostos devidos ao faraó?',
            op: [
              { t: 'Os escribas, em papiro.', ok: true, f: 'Certo! A escrita funcionava como um «sistema de informação» do Estado.' },
              { t: 'Ninguém: não era preciso registar nada.', ok: false, f: 'Um Estado tão grande precisava de registos de colheitas, impostos e trabalhadores.' },
              { t: 'Os camponeses, cada um no seu caderno.', ok: false, f: 'A maioria dos camponeses não sabia escrever. Escrever era tarefa dos escribas.' }
            ]
          }
        ],
        explicacao: 'O ano agrícola acompanhava o rio: cheia (Akhet), sementeira (Peret) e colheita (Shemu). O calendário civil egípcio tinha 12 meses de 30 dias e mais 5 dias, num total de 365. A riqueza agrícola, os impostos e a escrita sustentaram um Estado centralizado.'
      },
      {
        id: 'e2', tipo: 'ordenar', titulo: 'Desafio 2 — A pirâmide social',
        ae: 'AE6', pagina: 'p. 9',
        enunciado: 'Ordena os grupos sociais do topo (mais poder e prestígio) para a base.',
        itens: ['Faraó', 'Sacerdotes e nobres', 'Escribas e funcionários', 'Artesãos e comerciantes', 'Camponeses e trabalhadores'],
        explicacao: 'Correto! A sociedade egípcia era <strong>estratificada</strong>: a posição social influenciava funções, riqueza, prestígio e acesso ao poder. A maioria da população era camponesa. Atenção: esta pirâmide é um modelo didático — a realidade variou ao longo de mais de três mil anos. Existiam também escravos, sobretudo prisioneiros de guerra, mas eram uma minoria.',
        dica: 'No topo está quem tinha poder sacralizado. Na base está a maioria da população, que trabalhava a terra.'
      },
      {
        id: 'e3', tipo: 'associar', titulo: 'Desafio 3 — A banca do escriba',
        ae: 'AE7', pagina: 'p. 10',
        enunciado: 'O escriba está a organizar os registos. Associa cada contributo egípcio à área de conhecimento a que pertence.',
        pares: [
          { termo: 'Hieróglifos, hierática e demótica', def: 'Escrita' },
          { termo: 'Folhas feitas a partir de uma planta do Nilo', def: 'Suportes da escrita (papiro)' },
          { termo: 'Ano civil de 365 dias', def: 'Calendário' },
          { termo: 'Medir terras depois das cheias e calcular impostos', def: 'Matemática' },
          { termo: 'Receituários e tratamentos de doenças', def: 'Medicina' },
          { termo: 'Pirâmides, templos e obeliscos', def: 'Arquitetura' }
        ],
        explicacao: 'Muito bem! O legado egípcio resultou de conhecimentos acumulados para responder a necessidades concretas: administração, religião, agricultura e construção. O nosso calendário não é «o calendário egípcio», mas a ideia de um ano com cerca de 365 dias é uma herança de longa duração.',
        dica: 'Pensa em que profissão usaria cada contributo: um escriba, um agrimensor, um médico, um arquiteto…'
      }
    ]
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: 'porto',
    nome: 'O porto do Mediterrâneo',
    periodo: 'Fenícios e Hebreus',
    quando: 'Sobretudo a partir de c. 1200 a.C. (datas aproximadas)',
    paginas: 'p. 11',
    intro: 'Estás num porto de uma cidade-Estado fenícia, na costa oriental do Mediterrâneo. Chegam navios carregados e viajantes de outras terras. Que legados nos deixaram estes povos?',
    objetivo: 'Investiga os 5 elementos do porto e depois toca na Pedra do Tempo para seguires a viagem do alfabeto.',
    cenaLegenda: 'Ilustração estilizada de um porto fenício — não é uma reconstituição exata.',
    selo: { nome: 'Selo do Alfabeto', cor: '#7a4a7e' },
    objetos: [
      {
        id: 'navio', nome: 'Navio fenício', x: 200, y: 360,
        titulo: 'Navegadores do Mediterrâneo',
        texto: 'Os Fenícios viviam em <strong>cidades-Estado</strong> da costa oriental do Mediterrâneo, como Tiro, Sídon e Biblos. Destacaram-se como navegadores e comerciantes. Alguns navios tinham a proa decorada com uma cabeça de cavalo.',
        pagina: 'p. 11', tipo: 'facto',
        conceitos: [], ae: 'AE7'
      },
      {
        id: 'anforas', nome: 'Ânforas e tecidos', x: 420, y: 455,
        titulo: 'Comércio a longa distância',
        texto: 'Nas ânforas viajavam vinho e azeite. Os Fenícios vendiam também madeira de cedro, objetos de vidro e tecidos tingidos de <strong>púrpura</strong>, uma cor rara obtida de um molusco marinho (o múrex).',
        pagina: 'p. 11', tipo: 'facto',
        nota: 'A púrpura e o vidro não são referidos na sebenta; são exemplos complementares bem documentados.',
        conceitos: [], ae: 'AE7'
      },
      {
        id: 'mapa', nome: 'Mapa das rotas', x: 590, y: 445,
        titulo: 'Feitorias e colónias',
        texto: 'Os Fenícios fundaram <strong>feitorias</strong> (entrepostos comerciais) e colónias em todo o Mediterrâneo, como Cartago, no norte de África, e Gadir (Cádis), na Península Ibérica. Também chegaram à costa do atual território português — por exemplo, ao estuário do Sado.',
        pagina: 'p. 11', tipo: 'facto',
        conceitos: [], ae: 'AE7'
      },
      {
        id: 'alfabeto', nome: 'Tábua com o alfabeto', x: 750, y: 455,
        titulo: 'O alfabeto fenício',
        texto: 'Em vez de centenas de sinais, o alfabeto fenício tinha apenas <strong>22 letras</strong>, todas consoantes: cada sinal representava um som. Era simples e eficiente, fácil de aprender e útil para o comércio. Os Gregos adaptaram-no e acrescentaram vogais; o alfabeto grego influenciou o latino, que é a base do alfabeto português.',
        pagina: 'p. 11 («Do fenício ao nosso alfabeto»)', tipo: 'facto',
        nota: 'O alfabeto fenício não foi o primeiro alfabeto: desenvolveu-se a partir de escritas mais antigas da região (protocananeia ou protossinaítica), cujos sinais se inspiraram em hieróglifos egípcios. A sebenta usa «alfabeto fonético»; as Aprendizagens Essenciais usam «escrita alfabética».',
        conceitos: ['escrita alfabética'], ae: 'AE8'
      },
      {
        id: 'rolo', nome: 'Rolo de texto hebraico', x: 870, y: 452,
        titulo: 'Os Hebreus e o monoteísmo',
        texto: 'Os Hebreus formaram comunidades na região de Canaã/Palestina. O seu principal contributo foi religioso: o <strong>monoteísmo</strong>, a crença num único Deus (YHWH/Javé), e textos — leis, narrativas, profetas — que integram a Bíblia Hebraica. Influenciaram o judaísmo, o cristianismo e, de forma indireta, outras tradições.',
        pagina: 'p. 11', tipo: 'interpretacao',
        nota: 'Muitos historiadores consideram que o monoteísmo hebraico se afirmou de forma gradual, ao longo de séculos, e que os textos bíblicos foram escritos e reunidos durante um longo período.',
        conceitos: ['monoteísmo'], ae: 'AE7'
      }
    ],
    desafios: [
      {
        id: 'f1', tipo: 'ordenar', titulo: 'Desafio 1 — A viagem do alfabeto',
        ae: 'AE8', pagina: 'pp. 10–11',
        enunciado: 'Ordena as escritas da mais antiga para a mais recente e descobre o caminho até às letras que usas hoje.',
        itens: ['Hieróglifos egípcios', 'Alfabeto fenício', 'Alfabeto grego (com vogais)', 'Alfabeto latino', 'Alfabeto do português atual'],
        explicacao: 'Correto! Hieróglifos (c. 3200 a.C.) → alfabeto fenício (c. 1050 a.C.) → alfabeto grego (adaptação a partir dos séculos IX–VIII a.C., com vogais) → alfabeto latino → português. O alfabeto fenício não é «o nosso alfabeto», mas está na origem de uma longa cadeia de adaptações.',
        dica: 'Os Gregos acrescentaram vogais a um alfabeto que já existia. Qual?'
      },
      {
        id: 'f2', tipo: 'classificar', titulo: 'Desafio 2 — Figurativa ou alfabética?',
        ae: 'AE8', pagina: 'pp. 10–11',
        enunciado: 'Distingue as formas de escrita do passado e do presente.',
        categorias: ['Escrita figurativa', 'Escrita alfabética'],
        itens: [
          { t: 'Hieróglifos egípcios num túmulo', c: 0 },
          { t: 'Inscrição fenícia numa pedra', c: 1 },
          { t: 'Um texto grego antigo', c: 1 },
          { t: 'Uma mensagem escrita em português num telemóvel', c: 1 },
          { t: 'Uma mensagem só com emojis', c: 0 }
        ],
        explicacao: 'Muito bem! Na escrita figurativa, muitos sinais são desenhos (embora os hieróglifos também tivessem sinais com valor de som). Na escrita alfabética, cada letra representa um som, o que permite escrever qualquer palavra com poucos sinais. Os suportes também mudaram: papiro, pedra, argila… e hoje ecrãs digitais.',
        dica: 'Conta os sinais: a escrita alfabética usa poucas letras que representam sons.'
      },
      {
        id: 'f3', tipo: 'classificar', titulo: 'Desafio 3 — Quem deixou este legado?',
        ae: 'AE7', pagina: 'pp. 9–11',
        enunciado: 'Compara os contributos das três civilizações. Atribui cada legado ao povo certo.',
        categorias: ['Egípcios', 'Hebreus', 'Fenícios'],
        itens: [
          { t: 'Monoteísmo: crença num único Deus', c: 1 },
          { t: 'Alfabeto de 22 letras consoantes', c: 2 },
          { t: 'Ano civil de 365 dias', c: 0 },
          { t: 'Bíblia Hebraica', c: 1 },
          { t: 'Feitorias e colónias no Mediterrâneo', c: 2 },
          { t: 'Politeísmo e mumificação', c: 0 }
        ],
        explicacao: 'Excelente! Egípcios: escrita hieroglífica, calendário, matemática, medicina e arquitetura. Hebreus: monoteísmo e Bíblia Hebraica. Fenícios: navegação, comércio e alfabeto. Muitos destes contributos ainda fazem parte da nossa vida: o alfabeto, o calendário, as religiões monoteístas.',
        dica: 'Monoteísmo = um só deus; politeísmo = muitos deuses. Quem eram os grandes navegadores?'
      }
    ]
  }
];

// Desafio final: a Porta do Arquivo
const DESAFIO_FINAL = {
  id: 'final', tipo: 'ordenar', titulo: 'A Porta do Arquivo do Tempo',
  ae: 'AE5', pagina: 'pp. 2, 5, 6, 8 e 11',
  enunciado: 'Para abrir a porta, coloca os cinco selos por ordem cronológica, do mais antigo para o mais recente. Lembra-te: nas datas antes de Cristo (a.C.), quanto maior o número, mais antigo é o acontecimento.',
  itens: [
    'Primeiros instrumentos de pedra lascada',
    'Início da agricultura no Crescente Fértil',
    'Primeiros monumentos megalíticos no atual território português',
    'Unificação do Alto e do Baixo Egito',
    'Alfabeto fenício'
  ],
  datas: ['há mais de 3 milhões de anos', 'c. 10 000 a.C.', 'a partir do V milénio a.C. (aprox.)', 'c. 3100 a.C. (IV milénio a.C.)', 'c. 1050 a.C. (II milénio a.C.)'],
  explicacao: 'A porta abre-se! Percorreste uma longa cadeia de mudanças: novos instrumentos → produção de alimentos → aldeias e monumentos → excedentes e cidades → Estado e escrita → novos legados culturais. Repara que estas mudanças não aconteceram ao mesmo tempo em todo o mundo.',
  dica: 'Os instrumentos de pedra têm milhões de anos. Depois, compara os números «a.C.»: 10 000 é mais antigo do que 3100.'
};

// Notas de rigor científico sobre a sebenta (reunidas no caderno)
const NOTAS_RIGOR = [
  { t: 'Primeiros instrumentos (p. 2)', d: 'A linha do tempo indica c. 2,5 milhões de anos. Conhecem-se instrumentos de pedra com c. 3,3 milhões de anos (Lomekwi 3, Quénia).' },
  { t: 'Esquema da hominização (p. 3)', d: 'As setas entre espécies sugerem uma sequência linear, o que contradiz o texto da mesma página. Os Neandertais não são antepassados do Homo sapiens.' },
  { t: 'Domínio do fogo (p. 3)', d: 'A data de início é discutida: há indícios com c. 1 milhão de anos, mas o uso regular está bem documentado a partir de c. 400 000 anos.' },
  { t: 'Mapa do Crescente Fértil (p. 7)', d: 'É um esquema muito simplificado: o rótulo «Mar Mediterrâneo» aparece em baixo, a sul do Egito, quando o Mediterrâneo fica a norte. Convém comparar com um mapa à escala.' },
  { t: 'Escravatura (p. 9)', d: 'A sebenta desmente, corretamente, a ideia de pirâmides construídas por «escravos acorrentados», mas não refere que existiam escravos no Egito. «Escravatura» é um conceito das Aprendizagens Essenciais.' },
  { t: 'Alfabeto fenício (p. 11)', d: 'Não foi o primeiro alfabeto: deriva de escritas alfabéticas mais antigas da região, inspiradas em hieróglifos egípcios.' },
  { t: 'Ortografia (p. 12)', d: 'O quadro usa «Recolectores»; noutras páginas, «recoletores» (forma do Acordo Ortográfico em vigor).' },
  { t: 'Imagens de reconstituição', d: 'São ilustrações e reúnem por vezes elementos de épocas diferentes (por exemplo, no porto fenício, a cidade ao fundo lembra um templo grego). Neste jogo, as cenas também são ilustrações estilizadas.' }
];
