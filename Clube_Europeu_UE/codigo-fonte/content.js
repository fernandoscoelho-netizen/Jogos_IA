/* Conteúdo do jogo — O Clube Europeu foi conhecer a UE… */

const PAISES_UE = {
  '040': { n: 'Áustria', cap: 'Viena', ano: 1995, euro: true, sch: true },
  '056': { n: 'Bélgica', cap: 'Bruxelas', ano: 1958, euro: true, sch: true },
  '100': { n: 'Bulgária', cap: 'Sófia', ano: 2007, euro: true, sch: true },
  '191': { n: 'Croácia', cap: 'Zagreb', ano: 2013, euro: true, sch: true },
  '196': { n: 'Chipre', cap: 'Nicósia', ano: 2004, euro: true, sch: false },
  '203': { n: 'Chéquia', cap: 'Praga', ano: 2004, euro: false, sch: true, moeda: 'coroa checa' },
  '208': { n: 'Dinamarca', cap: 'Copenhaga', ano: 1973, euro: false, sch: true, moeda: 'coroa dinamarquesa' },
  '233': { n: 'Estónia', cap: 'Taline', ano: 2004, euro: true, sch: true },
  '246': { n: 'Finlândia', cap: 'Helsínquia', ano: 1995, euro: true, sch: true },
  '250': { n: 'França', cap: 'Paris', ano: 1958, euro: true, sch: true },
  '276': { n: 'Alemanha', cap: 'Berlim', ano: 1958, euro: true, sch: true },
  '300': { n: 'Grécia', cap: 'Atenas', ano: 1981, euro: true, sch: true },
  '348': { n: 'Hungria', cap: 'Budapeste', ano: 2004, euro: false, sch: true, moeda: 'florim' },
  '372': { n: 'Irlanda', cap: 'Dublin', ano: 1973, euro: true, sch: false },
  '380': { n: 'Itália', cap: 'Roma', ano: 1958, euro: true, sch: true },
  '428': { n: 'Letónia', cap: 'Riga', ano: 2004, euro: true, sch: true },
  '440': { n: 'Lituânia', cap: 'Vílnius', ano: 2004, euro: true, sch: true },
  '442': { n: 'Luxemburgo', cap: 'Luxemburgo', ano: 1958, euro: true, sch: true },
  '470': { n: 'Malta', cap: 'Valeta', ano: 2004, euro: true, sch: true },
  '528': { n: 'Países Baixos', cap: 'Amesterdão', ano: 1958, euro: true, sch: true },
  '616': { n: 'Polónia', cap: 'Varsóvia', ano: 2004, euro: false, sch: true, moeda: 'zlóti' },
  '620': { n: 'Portugal', cap: 'Lisboa', ano: 1986, euro: true, sch: true },
  '642': { n: 'Roménia', cap: 'Bucareste', ano: 2007, euro: false, sch: true, moeda: 'leu romeno' },
  '703': { n: 'Eslováquia', cap: 'Bratislava', ano: 2004, euro: true, sch: true },
  '705': { n: 'Eslovénia', cap: 'Liubliana', ano: 2004, euro: true, sch: true },
  '724': { n: 'Espanha', cap: 'Madrid', ano: 1986, euro: true, sch: true },
  '752': { n: 'Suécia', cap: 'Estocolmo', ano: 1995, euro: false, sch: true, moeda: 'coroa sueca' }
};
/* Países fora da UE que fazem parte do espaço Schengen */
const SCHENGEN_EXTRA = { '578': 'Noruega', '352': 'Islândia', '756': 'Suíça', '438': 'Listenstaine' };
const NOMES_PT = {
  '578': 'Noruega', '352': 'Islândia', '756': 'Suíça', '438': 'Listenstaine', '826': 'Reino Unido',
  '804': 'Ucrânia', '498': 'Moldávia', '688': 'Sérvia', '070': 'Bósnia e Herzegovina', '499': 'Montenegro',
  '008': 'Albânia', '807': 'Macedónia do Norte', '792': 'Turquia', '112': 'Bielorrússia', '643': 'Rússia',
  '268': 'Geórgia', '504': 'Marrocos', '012': 'Argélia', '788': 'Tunísia', '434': 'Líbia', '818': 'Egito',
  '376': 'Israel', '422': 'Líbano', '760': 'Síria', '400': 'Jordânia', '051': 'Arménia', '031': 'Azerbaijão',
  '020': 'Andorra', '492': 'Mónaco', '674': 'São Marinho', '336': 'Vaticano', '304': 'Gronelândia',
  '234': 'Ilhas Faroé', '': 'Kosovo'
};

const PARAGENS = [
{
  id: 'porto', cidade: 'Porto', pais: 'Portugal', pid: '620',
  titulo: 'O ponto de partida',
  guia: { nome: 'Professora Inês', papel: 'coordenadora do Clube Europeu', pele: '#C68E6A', cabelo: '#2B1B12', camisola: '#003399', fala: 'Bem-vindo ao Clube Europeu! A nossa viagem começa aqui, no Porto, junto ao Douro. Antes de partir, vamos ver o que a Europa já mudou na nossa cidade. Depois carimbas o primeiro selo do passaporte.' },
  onde: 'Ribeira do Porto e Ponte Luiz I',
  instituicoes: [
    { nome: 'Cimeira Social do Porto', funcao: 'Em maio de 2021, durante a presidência portuguesa do Conselho da UE, os líderes europeus reuniram-se no Porto e assumiram metas sociais para 2030: mais emprego, mais formação e menos pobreza.', local: 'Alfândega do Porto' },
    { nome: 'Fundos europeus', funcao: 'A UE cofinancia obras que usamos todos os dias. As novas linhas do Metro do Porto, como a Linha Rosa, contam com financiamento europeu.', local: 'Área Metropolitana do Porto' },
    { nome: 'Erasmus+ nas escolas', funcao: 'Escolas da região participam em projetos Erasmus+, com intercâmbios de alunos e professores. A Universidade do Porto recebe todos os anos milhares de estudantes de outros países.', local: 'Escolas e universidades da região' }
  ],
  historia: [
    ['1986', 'Portugal adere à Comunidade Europeia, a 1 de janeiro, ao mesmo tempo que Espanha.'],
    ['2001', 'O Porto é Capital Europeia da Cultura, com Roterdão.'],
    ['2021', 'A Cimeira Social do Porto, a 7 de maio, define metas sociais europeias para 2030.']
  ],
  factos: [
    'As Capitais Europeias da Cultura são escolhidas todos os anos. Em Portugal já o foram Lisboa (1994), Porto (2001), Guimarães (2012) e Évora (2027).',
    'Uma das metas da Cimeira Social do Porto é que pelo menos 78% das pessoas entre os 20 e os 64 anos tenham emprego até 2030.',
    'Nas obras pagas em parte pela UE há sempre uma placa com a bandeira europeia. Procura uma na tua escola ou no teu bairro!'
  ],
  quiz: [
    { p: 'Em que ano Portugal aderiu à Comunidade Europeia?', o: ['1974', '1986', '1992', '2002'], c: 1, e: 'Portugal e Espanha aderiram juntos a 1 de janeiro de 1986.' },
    { p: 'Em que ano o Porto foi Capital Europeia da Cultura?', o: ['1994', '2001', '2012', '2027'], c: 1, e: 'Em 2001. Lisboa foi em 1994, Guimarães em 2012 e Évora será em 2027.' },
    { p: 'O que se discutiu na Cimeira Social do Porto, em 2021?', o: ['Emprego, formação e combate à pobreza', 'Futebol europeu', 'O preço do vinho do Porto', 'A construção de uma ponte'], c: 0, e: 'Os líderes comprometeram-se com metas sociais para 2030.' }
  ],
  desafio: {
    tipo: 'selecao', titulo: 'Prepara a mochila',
    enunciado: 'Vais viajar por vários países da UE. Seleciona tudo o que é útil levar e deixa de fora o que não precisas.',
    itens: [
      { t: 'Cartão de Cidadão válido', ok: true, e: 'Dentro da UE, o Cartão de Cidadão serve como documento de viagem.' },
      { t: 'Cartão Europeu de Seguro de Doença', ok: true, e: 'Dá acesso aos cuidados de saúde públicos nos outros países da UE.' },
      { t: 'Um visto para cada país', ok: false, e: 'Os cidadãos europeus não precisam de visto para circular na UE.' },
      { t: 'Telemóvel com o tarifário habitual', ok: true, e: 'Com o «roaming como em casa», usas o telemóvel na UE sem custos extra (em utilização normal).' },
      { t: 'Escudos portugueses', ok: false, e: 'O escudo deixou de circular em 2002, quando chegaram as notas e moedas de euro.' }
    ]
  }
},
{
  id: 'lisboa', cidade: 'Lisboa', pais: 'Portugal', pid: '620',
  titulo: 'A cidade que deu nome a um tratado',
  guia: { nome: 'Afonso', papel: 'guia no Mosteiro dos Jerónimos', pele: '#B9825E', cabelo: '#1E1A17', camisola: '#7A1F2B', fala: 'Foi aqui, no claustro dos Jerónimos, que em 2007 os líderes europeus assinaram o Tratado de Lisboa. É ele que hoje define como a UE funciona. E junto ao Tejo trabalham duas agências europeias.' },
  onde: 'Mosteiro dos Jerónimos e Cais do Sodré',
  instituicoes: [
    { nome: 'Agência Europeia da Segurança Marítima (EMSA)', funcao: 'Ajuda os países a prevenir acidentes e poluição no mar. Vigia derrames de petróleo com imagens de satélite.', local: 'Cais do Sodré, Lisboa' },
    { nome: 'Agência da UE sobre Drogas (EUDA)', funcao: 'Recolhe e analisa dados sobre drogas na Europa para apoiar a prevenção e a saúde pública.', local: 'Cais do Sodré, Lisboa' },
    { nome: 'Representação da Comissão Europeia em Portugal', funcao: 'Explica as políticas da UE em Portugal e organiza atividades para escolas e cidadãos.', local: 'Lisboa' }
  ],
  historia: [
    ['2000', 'O Conselho Europeu reúne-se em Lisboa e aprova a «Estratégia de Lisboa» para o crescimento e o emprego.'],
    ['2007', 'O Tratado de Lisboa é assinado no Mosteiro dos Jerónimos, a 13 de dezembro.'],
    ['2009', 'O Tratado de Lisboa entra em vigor e cria o cargo de presidente permanente do Conselho Europeu.']
  ],
  factos: [
    'O Tratado de Lisboa tornou obrigatória a Carta dos Direitos Fundamentais da UE.',
    'Foi também o Tratado de Lisboa que criou o artigo 50.º, que permite a um país sair da UE. O Reino Unido usou-o e saiu em 2020.',
    'O atual presidente do Conselho Europeu, António Costa, foi primeiro-ministro de Portugal.'
  ],
  quiz: [
    { p: 'Onde foi assinado o Tratado de Lisboa, em 2007?', o: ['Na Assembleia da República', 'No Palácio de Belém', 'No Mosteiro dos Jerónimos', 'Na Torre de Belém'], c: 2, e: 'Os líderes europeus assinaram-no no Mosteiro dos Jerónimos, a 13 de dezembro de 2007.' },
    { p: 'Que cargo criou o Tratado de Lisboa?', o: ['Presidente permanente do Conselho Europeu', 'Rei da Europa', 'Presidente do BCE', 'Primeiro-ministro europeu'], c: 0, e: 'Antes, o Conselho Europeu era presidido à vez pelos líderes dos países.' },
    { p: 'Que agência europeia com sede em Lisboa ajuda a proteger os mares da poluição?', o: ['EMSA', 'Europol', 'Frontex', 'BCE'], c: 0, e: 'A EMSA, Agência Europeia da Segurança Marítima, fica no Cais do Sodré.' }
  ],
  desafio: {
    tipo: 'associar', titulo: 'Tratados e cidades',
    enunciado: 'A tua viagem vai passar por cidades que deram nome a tratados. Associa cada tratado ao que criou.',
    pares: [
      ['Tratado de Paris (1951)', 'Comunidade do Carvão e do Aço'],
      ['Tratados de Roma (1957)', 'Comunidade Económica Europeia'],
      ['Tratado de Maastricht (1992)', 'União Europeia e cidadania europeia'],
      ['Tratado de Lisboa (2007)', 'Presidente permanente do Conselho Europeu']
    ]
  }
},
{
  id: 'paris', cidade: 'Paris', pais: 'França', pid: '250',
  titulo: 'A ideia que mudou a Europa',
  guia: { nome: 'Camille', papel: 'guia no Quai d’Orsay', pele: '#F1C7A8', cabelo: '#8A4B22', camisola: '#C8102E', fala: 'Estás no Ministério dos Negócios Estrangeiros de França. Foi aqui, no Salão do Relógio, que em 1950 se propôs juntar o carvão e o aço de países que tinham estado em guerra.' },
  onde: 'Salão do Relógio, Quai d’Orsay',
  instituicoes: [
    { nome: 'Autoridade Europeia dos Valores Mobiliários e dos Mercados (ESMA)', funcao: 'Supervisiona os mercados financeiros para proteger quem investe.', local: 'Paris' },
    { nome: 'Autoridade Bancária Europeia (EBA)', funcao: 'Cria regras comuns para os bancos e testa se aguentam crises.', local: 'Paris' }
  ],
  historia: [
    ['1950', 'A 9 de maio, Robert Schuman, ministro francês, apresenta a Declaração Schuman.'],
    ['1951', 'O Tratado de Paris cria a Comunidade Europeia do Carvão e do Aço (CECA), com 6 países.'],
    ['1985', 'O 9 de maio passa a ser celebrado como Dia da Europa.']
  ],
  factos: [
    'A ideia era simples: se a França e a Alemanha partilhassem o carvão e o aço, uma nova guerra entre elas tornava-se praticamente impossível.',
    'Jean Monnet, conselheiro francês, preparou o plano e foi o primeiro a dirigir a CECA.',
    'Os seis países fundadores foram a Alemanha, a Bélgica, a França, a Itália, o Luxemburgo e os Países Baixos.'
  ],
  quiz: [
    { p: 'Que dia se celebra como Dia da Europa?', o: ['25 de março', '1 de janeiro', '9 de maio', '1 de novembro'], c: 2, e: 'A 9 de maio de 1950 foi apresentada a Declaração Schuman.' },
    { p: 'Que dois recursos a CECA pôs em comum?', o: ['Trigo e vinho', 'Carvão e aço', 'Petróleo e gás', 'Ouro e prata'], c: 1, e: 'Eram os recursos necessários para fazer armas. Partilhá-los ajudava a garantir a paz.' },
    { p: 'Quantos países fundaram a CECA?', o: ['6', '9', '12', '27'], c: 0, e: 'Alemanha, Bélgica, França, Itália, Luxemburgo e Países Baixos.' }
  ],
  desafio: {
    tipo: 'mapa', titulo: 'Os seis fundadores',
    enunciado: 'Clica no mapa nos seis países que fundaram a Comunidade Europeia do Carvão e do Aço.',
    alvo: ['276', '056', '250', '380', '442', '528'],
    vista: [290, 360, 340, 380]
  }
},
{
  id: 'bruxelas', cidade: 'Bruxelas', pais: 'Bélgica', pid: '056',
  titulo: 'O coração das instituições',
  guia: { nome: 'Pieter', papel: 'estagiário na Comissão Europeia', pele: '#E8B996', cabelo: '#D8B36A', camisola: '#2E7D5B', fala: 'Bem-vindo ao bairro europeu! À tua frente está o Berlaymont, o edifício em forma de estrela onde trabalha a Comissão. Do outro lado da rua reúnem-se os ministros e os líderes dos 27 países.' },
  onde: 'Rond-point Schuman, bairro europeu',
  instituicoes: [
    { nome: 'Comissão Europeia', funcao: 'Propõe novas leis, gere o orçamento e verifica se os países cumprem as regras. Tem um comissário por país. É presidida por Ursula von der Leyen.', local: 'Edifício Berlaymont' },
    { nome: 'Conselho da União Europeia', funcao: 'Reúne os ministros dos 27 países. Aprova as leis em conjunto com o Parlamento. A presidência roda entre os países a cada 6 meses.', local: 'Edifícios Europa e Justus Lipsius' },
    { nome: 'Conselho Europeu', funcao: 'Reúne os chefes de Estado ou de Governo e define as grandes prioridades da UE. É presidido por António Costa.', local: 'Edifício Europa, a «lanterna»' },
    { nome: 'Parlamentarium', funcao: 'Centro de visitantes do Parlamento Europeu, gratuito e com exposições em 24 línguas.', local: 'Praça Simone Veil' }
  ],
  historia: [
    ['1958', 'A Comissão da Comunidade Económica Europeia instala-se em Bruxelas.'],
    ['1967', 'O Berlaymont é inaugurado.'],
    ['2017', 'O Conselho Europeu passa a reunir-se no novo edifício Europa.']
  ],
  factos: [
    'O Berlaymont tem forma de estrela de quatro braços e foi totalmente renovado nos anos 90.',
    'No segundo semestre de 2026, a presidência do Conselho da UE pertence à Irlanda.',
    'O Parlamento Europeu também tem gabinetes e reuniões de comissões em Bruxelas.'
  ],
  quiz: [
    { p: 'Que instituição propõe as novas leis europeias?', o: ['O Conselho Europeu', 'A Comissão Europeia', 'O Tribunal de Justiça', 'O Banco Central Europeu'], c: 1, e: 'A Comissão tem o «direito de iniciativa»: é ela que apresenta as propostas de lei.' },
    { p: 'Quem se senta no Conselho da União Europeia?', o: ['Os ministros dos países', 'Os deputados europeus', 'Os juízes europeus', 'Os comissários'], c: 0, e: 'Em cada reunião estão os ministros da área em causa, por exemplo os 27 ministros da Educação.' },
    { p: 'De quanto em quanto tempo muda a presidência do Conselho da UE?', o: ['Todos os anos', 'A cada 5 anos', 'A cada 6 meses', 'Nunca muda'], c: 2, e: 'Cada país preside durante um semestre, segundo uma ordem definida.' }
  ],
  desafio: {
    tipo: 'associar', titulo: 'Quem faz o quê?',
    enunciado: 'Associa cada instituição à sua função principal.',
    pares: [
      ['Comissão Europeia', 'Propõe leis e gere o orçamento'],
      ['Conselho da UE', 'Reúne os ministros dos 27 países'],
      ['Conselho Europeu', 'Reúne os líderes e define prioridades'],
      ['Parlamento Europeu', 'Representa os cidadãos que o elegem']
    ]
  }
},
{
  id: 'haia', cidade: 'Haia', pais: 'Países Baixos', pid: '528',
  titulo: 'Segurança e justiça sem fronteiras',
  guia: { nome: 'Sanne', papel: 'analista na Europol', pele: '#8D5A3B', cabelo: '#1A1110', camisola: '#E07B00', fala: 'As fronteiras abertas facilitam a vida aos cidadãos, mas os criminosos também viajam. Aqui em Haia, as polícias e os tribunais dos 27 países trabalham juntos.' },
  onde: 'Bairro internacional de Haia',
  instituicoes: [
    { nome: 'Europol', funcao: 'Agência da UE para a cooperação policial. Ajuda as polícias nacionais a combater o terrorismo, o tráfico e o cibercrime.', local: 'Haia' },
    { nome: 'Eurojust', funcao: 'Agência da UE para a cooperação judiciária. Ajuda os procuradores de vários países a investigar crimes em conjunto.', local: 'Haia' }
  ],
  historia: [
    ['1999', 'A Europol começa a funcionar em pleno.'],
    ['2002', 'É criada a Eurojust.'],
    ['2011', 'A Europol muda-se para a sua sede atual, em Haia.']
  ],
  factos: [
    'Haia é a sede do Governo dos Países Baixos, mas a capital é Amesterdão.',
    'O Tribunal Internacional de Justiça e o Tribunal Penal Internacional também ficam em Haia, mas não pertencem à UE: são organizações internacionais.',
    'A Europol não faz detenções: apoia e coordena as polícias de cada país.'
  ],
  quiz: [
    { p: 'Qual é a principal função da Europol?', o: ['Emitir o euro', 'Apoiar a cooperação entre polícias', 'Julgar os países', 'Organizar as eleições europeias'], c: 1, e: 'A Europol troca informações e apoia investigações entre polícias de vários países.' },
    { p: 'Qual é a capital dos Países Baixos?', o: ['Haia', 'Roterdão', 'Amesterdão', 'Utreque'], c: 2, e: 'A capital é Amesterdão, mas o Governo e o Parlamento estão em Haia.' },
    { p: 'O Tribunal Penal Internacional, em Haia, é uma instituição da UE?', o: ['Sim', 'Não'], c: 1, e: 'Não. É um tribunal internacional, com membros de todo o mundo.' }
  ],
  desafio: {
    tipo: 'associar', titulo: 'É da UE ou não?',
    enunciado: 'Classifica cada organização: pertence à União Europeia ou é outra organização internacional?',
    opcoes: ['É da UE', 'Não é da UE'],
    pares: [
      ['Europol', 'É da UE'],
      ['Tribunal Penal Internacional', 'Não é da UE'],
      ['Eurojust', 'É da UE'],
      ['Organização das Nações Unidas', 'Não é da UE'],
      ['NATO', 'Não é da UE']
    ]
  }
},
{
  id: 'maastricht', cidade: 'Maastricht', pais: 'Países Baixos', pid: '528',
  titulo: 'Nasce a União Europeia',
  guia: { nome: 'Lars', papel: 'estudante na Universidade de Maastricht', pele: '#F4D2B8', cabelo: '#6B4A2B', camisola: '#5B3FA8', fala: 'Esta cidade junto ao rio Mosa deu nome ao tratado que criou a União Europeia. Desde então, és cidadão de Portugal e também cidadão europeu.' },
  onde: 'Edifício do Governo Provincial, junto ao rio Mosa',
  instituicoes: [
    { nome: 'Tratado de Maastricht', funcao: 'Criou a União Europeia, a cidadania europeia e o caminho para a moeda única.', local: 'Assinado no Governo Provincial do Limburgo' }
  ],
  historia: [
    ['1992', 'O Tratado da União Europeia é assinado a 7 de fevereiro.'],
    ['1993', 'O tratado entra em vigor a 1 de novembro: nasce oficialmente a União Europeia.'],
    ['1999', 'Começa a terceira fase da União Económica e Monetária e nasce o euro.']
  ],
  factos: [
    'Maastricht fica perto das fronteiras da Bélgica e da Alemanha.',
    'O tratado definiu critérios que um país tem de cumprir para adotar o euro, como controlar a inflação e as contas públicas.',
    'Se vives noutro país da UE, podes votar e ser candidato nas eleições municipais e europeias desse país.'
  ],
  quiz: [
    { p: 'O que criou o Tratado de Maastricht?', o: ['A NATO', 'A União Europeia', 'O Conselho da Europa', 'A ONU'], c: 1, e: 'O Tratado da União Europeia, assinado em Maastricht, criou a UE em 1993.' },
    { p: 'Em que ano entrou em vigor?', o: ['1957', '1986', '1993', '2009'], c: 2, e: 'Entrou em vigor a 1 de novembro de 1993.' },
    { p: 'Quem é cidadão europeu?', o: ['Só quem vive em Bruxelas', 'Quem tem a nacionalidade de um país da UE', 'Quem fala duas línguas', 'Quem trabalha numa instituição europeia'], c: 1, e: 'A cidadania europeia junta-se à nacionalidade: não a substitui.' }
  ],
  desafio: {
    tipo: 'selecao', titulo: 'Os teus direitos de cidadão europeu',
    enunciado: 'Seleciona os direitos que a cidadania europeia te dá.',
    itens: [
      { t: 'Viver, estudar e trabalhar noutro país da UE', ok: true, e: 'É a livre circulação de pessoas.' },
      { t: 'Votar nas eleições europeias e municipais onde resides', ok: true, e: 'Mesmo que não tenhas a nacionalidade desse país.' },
      { t: 'Votar para o Presidente de outro país da UE', ok: false, e: 'As eleições nacionais são reservadas a quem tem a nacionalidade.' },
      { t: 'Pedir ajuda à embaixada de outro país da UE, fora da Europa', ok: true, e: 'Se Portugal não tiver embaixada nesse país, outro país da UE pode ajudar-te.' },
      { t: 'Apresentar uma petição ao Parlamento Europeu', ok: true, e: 'Qualquer cidadão pode fazê-lo, na sua língua.' },
      { t: 'Não pagar impostos em nenhum país', ok: false, e: 'Os impostos continuam a ser definidos por cada país.' }
    ]
  }
},
{
  id: 'luxemburgo', cidade: 'Luxemburgo e Schengen', pais: 'Luxemburgo', pid: '442',
  titulo: 'Fronteiras abertas e tribunais',
  guia: { nome: 'Marie', papel: 'capitã de um barco no rio Mosela', pele: '#EAC0A0', cabelo: '#3B2A20', camisola: '#0E7C86', fala: 'A poucos quilómetros da capital, num barco ancorado no Mosela, junto à aldeia de Schengen, cinco países assinaram em 1985 um acordo para acabar com os controlos nas fronteiras entre eles.' },
  onde: 'Planalto de Kirchberg e aldeia de Schengen',
  instituicoes: [
    { nome: 'Tribunal de Justiça da UE', funcao: 'Garante que as leis europeias são interpretadas e aplicadas da mesma forma em todos os países.', local: 'Kirchberg, Luxemburgo' },
    { nome: 'Tribunal de Contas Europeu', funcao: 'Verifica se o dinheiro da UE é bem gasto.', local: 'Kirchberg, Luxemburgo' },
    { nome: 'Banco Europeu de Investimento', funcao: 'Empresta dinheiro para projetos como escolas, transportes e energia limpa.', local: 'Kirchberg, Luxemburgo' },
    { nome: 'Eurostat', funcao: 'Serviço de estatística da UE: produz números comparáveis sobre todos os países.', local: 'Luxemburgo' }
  ],
  historia: [
    ['1985', 'A 14 de junho, o Acordo de Schengen é assinado no barco Princesse Marie-Astrid.'],
    ['1995', 'Os controlos acabam entre os primeiros 7 países, incluindo Portugal.'],
    ['2025', 'A Bulgária e a Roménia passam a membros plenos. O espaço Schengen tem 29 países.']
  ],
  factos: [
    'Schengen fica no ponto onde se encontram o Luxemburgo, a Alemanha e a França.',
    'Há países da UE fora de Schengen, como a Irlanda e Chipre. E há países fora da UE dentro de Schengen: Islândia, Noruega, Suíça e Listenstaine.',
    'O Luxemburgo é um dos seis países fundadores e tem três línguas oficiais: luxemburguês, francês e alemão.'
  ],
  quiz: [
    { p: 'O que acabou com o Acordo de Schengen?', o: ['O uso de moedas nacionais', 'Os controlos sistemáticos nas fronteiras internas', 'O roaming', 'As eleições nacionais'], c: 1, e: 'Dentro do espaço Schengen podes atravessar fronteiras sem controlo sistemático de documentos.' },
    { p: 'Quantos países fazem hoje parte do espaço Schengen?', o: ['12', '25', '27', '29'], c: 3, e: '25 países da UE e 4 de fora: Islândia, Noruega, Suíça e Listenstaine.' },
    { p: 'Que tribunal garante que o direito europeu se aplica da mesma forma em todos os países?', o: ['Tribunal de Justiça da UE', 'Tribunal Constitucional', 'Tribunal Penal Internacional', 'Tribunal de Contas'], c: 0, e: 'O Tribunal de Justiça da UE fica no Luxemburgo.' }
  ],
  desafio: {
    tipo: 'mapa', titulo: 'Desenha o espaço Schengen',
    enunciado: 'Clica nos 4 países que NÃO são da UE mas fazem parte do espaço Schengen. Repara bem no norte e nos Alpes.',
    alvo: ['578', '352', '756', '438'],
    vista: [140, -20, 560, 620]
  }
},
{
  id: 'estrasburgo', cidade: 'Estrasburgo', pais: 'França', pid: '250',
  titulo: 'A voz dos cidadãos',
  guia: { nome: 'Tomás', papel: 'intérprete no Parlamento Europeu', pele: '#D9A07A', cabelo: '#111111', camisola: '#003399', fala: 'Neste hemiciclo, cada deputado pode falar na sua língua. Eu traduzo em tempo real para português. Somos dezenas de intérpretes, para 24 línguas oficiais.' },
  onde: 'Edifício Louise Weiss',
  instituicoes: [
    { nome: 'Parlamento Europeu', funcao: 'Representa os cidadãos. Aprova as leis e o orçamento com o Conselho e controla a Comissão. Tem 720 deputados, 21 eleitos em Portugal. É presidido por Roberta Metsola.', local: 'Sessões plenárias em Estrasburgo, 12 por ano' },
    { nome: 'Provedor de Justiça Europeu', funcao: 'Investiga queixas de cidadãos sobre o mau funcionamento das instituições da UE.', local: 'Estrasburgo' }
  ],
  historia: [
    ['1979', 'Primeiras eleições diretas para o Parlamento Europeu.'],
    ['1999', 'É inaugurado o edifício Louise Weiss.'],
    ['2024', 'Eleições europeias: são eleitos 720 deputados para 2024–2029.']
  ],
  factos: [
    'O edifício tem o nome de Louise Weiss, jornalista que lutou pelo voto das mulheres em França e foi deputada europeia.',
    'O Conselho da Europa e o Tribunal Europeu dos Direitos Humanos também ficam em Estrasburgo, mas não são da UE.',
    'As eleições europeias acontecem de 5 em 5 anos. As próximas serão em 2029.'
  ],
  quiz: [
    { p: 'Quantos deputados tem o Parlamento Europeu (2024–2029)?', o: ['27', '230', '720', '1000'], c: 2, e: 'São 720 deputados, distribuídos conforme a população de cada país.' },
    { p: 'Quantos deputados europeus são eleitos em Portugal?', o: ['10', '21', '50', '96'], c: 1, e: 'Portugal elege 21 deputados.' },
    { p: 'Quantas línguas oficiais tem a UE?', o: ['3', '12', '24', '27'], c: 2, e: 'São 24 línguas oficiais, e todos os documentos importantes são traduzidos para todas.' }
  ],
  desafio: {
    tipo: 'ordenar', titulo: 'Como nasce uma lei europeia',
    enunciado: 'Põe as etapas do processo legislativo ordinário pela ordem certa.',
    passos: [
      'A Comissão Europeia apresenta uma proposta',
      'O Parlamento Europeu debate e vota alterações',
      'O Conselho da UE analisa e dá a sua posição',
      'Parlamento e Conselho aprovam o mesmo texto',
      'A lei é publicada no Jornal Oficial da UE'
    ]
  }
},
{
  id: 'frankfurt', cidade: 'Frankfurt', pais: 'Alemanha', pid: '276',
  titulo: 'A casa do euro',
  guia: { nome: 'Jonas', papel: 'economista no Banco Central Europeu', pele: '#F0C9A9', cabelo: '#A0522D', camisola: '#B8860B', fala: 'Daqui das torres do BCE decidimos as taxas de juro para os 21 países do euro. O nosso objetivo é que os preços não subam demasiado: uma inflação de 2% a médio prazo.' },
  onde: 'Torres do Banco Central Europeu, junto ao rio Meno',
  instituicoes: [
    { nome: 'Banco Central Europeu (BCE)', funcao: 'Define a política monetária da área do euro e mantém os preços estáveis. É presidido por Christine Lagarde.', local: 'Frankfurt' },
    { nome: 'Autoridade Europeia dos Seguros e Pensões (EIOPA)', funcao: 'Protege quem tem seguros e planos de pensões.', local: 'Frankfurt' }
  ],
  historia: [
    ['1998', 'É criado o Banco Central Europeu.'],
    ['1999', 'O euro nasce em 11 países, primeiro só em contas e pagamentos eletrónicos.'],
    ['2002', 'Chegam as notas e moedas de euro, a 1 de janeiro.'],
    ['2026', 'A Bulgária adota o euro: a área do euro passa a ter 21 países.']
  ],
  factos: [
    'As notas de euro são iguais em todos os países. As moedas têm uma face comum e uma face nacional.',
    'As moedas portuguesas mostram selos do rei D. Afonso Henriques e o castelo e os escudos de Portugal.',
    'Alguns países da UE ainda têm moeda própria, como a Polónia, a Suécia e a Chéquia.'
  ],
  quiz: [
    { p: 'Quantos países usam o euro em 2026?', o: ['12', '19', '21', '27'], c: 2, e: 'A Bulgária foi o 21.º país a adotar o euro, a 1 de janeiro de 2026.' },
    { p: 'Qual é o principal objetivo do BCE?', o: ['Construir estradas', 'Manter os preços estáveis', 'Aprovar leis', 'Controlar fronteiras'], c: 1, e: 'O BCE procura uma inflação de 2% a médio prazo.' },
    { p: 'Em que ano chegaram as notas e moedas de euro?', o: ['1992', '1999', '2002', '2009'], c: 2, e: 'A 1 de janeiro de 2002, em 12 países, incluindo Portugal.' }
  ],
  desafio: {
    tipo: 'ordenar', titulo: 'Linha do tempo do euro',
    enunciado: 'Ordena os acontecimentos do mais antigo para o mais recente.',
    passos: [
      'Tratado de Maastricht prevê uma moeda única (1992)',
      'O euro nasce nas contas e pagamentos eletrónicos (1999)',
      'Notas e moedas chegam aos bolsos (2002)',
      'A Croácia adota o euro (2023)',
      'A Bulgária adota o euro (2026)'
    ]
  }
},
{
  id: 'praga', cidade: 'Praga', pais: 'Chéquia', pid: '203',
  titulo: 'A Europa no espaço',
  guia: { nome: 'Eliška', papel: 'engenheira na Agência da UE para o Programa Espacial', pele: '#F2CDB0', cabelo: '#C9A15A', camisola: '#4A148C', fala: 'Sabes como o GPS do teu telemóvel te encontra? A Europa tem o seu próprio sistema de satélites, o Galileo. Ajudamos a pô-lo ao serviço de todos, aqui em Praga.' },
  onde: 'Bairro de Holešovice',
  instituicoes: [
    { nome: 'Agência da UE para o Programa Espacial (EUSPA)', funcao: 'Gere os serviços do Galileo e do EGNOS e promove o uso dos dados espaciais europeus.', local: 'Praga' }
  ],
  historia: [
    ['2004', 'A Chéquia adere à UE, com mais 9 países: o maior alargamento de sempre.'],
    ['2016', 'O Galileo começa a prestar os primeiros serviços.'],
    ['2021', 'É criada a EUSPA, que sucede a uma agência anterior também sediada em Praga.']
  ],
  factos: [
    'A Chéquia faz parte da UE, mas a moeda continua a ser a coroa checa.',
    'O Copernicus observa a Terra a partir do espaço e ajuda a acompanhar incêndios, cheias e alterações climáticas.',
    'Muitos telemóveis vendidos na Europa já usam os sinais do Galileo.'
  ],
  quiz: [
    { p: 'Como se chama o sistema europeu de navegação por satélite?', o: ['Galileo', 'Hubble', 'Apollo', 'Sputnik'], c: 0, e: 'O Galileo é o sistema de navegação da UE, semelhante ao GPS norte-americano.' },
    { p: 'Em que ano a Chéquia aderiu à UE?', o: ['1986', '1995', '2004', '2013'], c: 2, e: 'Em 2004 aderiram 10 países, entre eles a Chéquia, a Polónia e a Eslovénia.' },
    { p: 'Qual é a moeda da Chéquia?', o: ['Euro', 'Coroa checa', 'Zlóti', 'Florim'], c: 1, e: 'A Chéquia ainda não adotou o euro.' }
  ],
  desafio: {
    tipo: 'associar', titulo: 'Satélites europeus',
    enunciado: 'Associa cada programa espacial da UE ao que faz.',
    pares: [
      ['Galileo', 'Indica a tua localização'],
      ['Copernicus', 'Observa a Terra e o clima'],
      ['EGNOS', 'Torna a localização mais precisa para aviões'],
      ['IRIS²', 'Comunicações seguras por satélite']
    ]
  }
},
{
  id: 'varsovia', cidade: 'Varsóvia', pais: 'Polónia', pid: '616',
  titulo: 'Guardar as fronteiras externas',
  guia: { nome: 'Kasia', papel: 'guarda de fronteira destacada pela Frontex', pele: '#F5D5BD', cabelo: '#5A3A22', camisola: '#1B5E20', fala: 'Sem controlos nas fronteiras internas, as fronteiras externas são de todos. A Frontex apoia os países que guardam a fronteira exterior da UE, em terra e no mar.' },
  onde: 'Sede da Frontex, centro de Varsóvia',
  instituicoes: [
    { nome: 'Frontex — Agência Europeia da Guarda de Fronteiras e Costeira', funcao: 'Apoia os países na vigilância das fronteiras externas, em operações de salvamento no mar e na luta contra o crime transfronteiriço.', local: 'Varsóvia' }
  ],
  historia: [
    ['2004', 'A Polónia adere à UE. É criada a Frontex.'],
    ['2007', 'A Polónia entra no espaço Schengen.'],
    ['2025', 'Começa a funcionar o Sistema de Entrada/Saída, que regista quem chega de fora da UE.']
  ],
  factos: [
    'A Polónia faz fronteira com a Ucrânia e a Bielorrússia, que estão fora da UE. Por isso, guarda uma parte importante da fronteira externa.',
    'O Sistema de Entrada/Saída regista, com fotografia e impressões digitais, os viajantes de fora da UE que entram no espaço Schengen.',
    'Varsóvia foi quase toda destruída na Segunda Guerra Mundial. O centro histórico reconstruído é Património Mundial da UNESCO.'
  ],
  quiz: [
    { p: 'Onde fica a sede da Frontex?', o: ['Bruxelas', 'Varsóvia', 'Haia', 'Lisboa'], c: 1, e: 'A Frontex tem sede em Varsóvia, na Polónia.' },
    { p: 'O que é uma fronteira externa da UE?', o: ['A fronteira entre dois países da UE', 'A fronteira entre a UE e um país de fora', 'A fronteira entre duas regiões', 'A linha da costa'], c: 1, e: 'É onde o espaço Schengen termina. Aí há controlo de documentos.' },
    { p: 'Que moeda se usa na Polónia?', o: ['Euro', 'Coroa', 'Zlóti', 'Leu'], c: 2, e: 'A Polónia usa o zlóti.' }
  ],
  desafio: {
    tipo: 'associar', titulo: 'Interna ou externa?',
    enunciado: 'Para cada viagem, decide se atravessas uma fronteira interna ou externa do espaço Schengen.',
    opcoes: ['Interna', 'Externa'],
    pares: [
      ['De comboio de Lisboa para Vigo', 'Interna'],
      ['De avião de Nova Iorque para Varsóvia', 'Externa'],
      ['De carro da Polónia para a Ucrânia', 'Externa'],
      ['De comboio de Praga para Varsóvia', 'Interna'],
      ['De avião de Lisboa para Dublin', 'Externa']
    ],
    nota: 'A Irlanda é da UE mas não faz parte do espaço Schengen. Por isso há controlo de documentos.'
  }
},
{
  id: 'zagreb', cidade: 'Zagreb', pais: 'Croácia', pid: '191',
  titulo: 'O país mais recente',
  guia: { nome: 'Luka', papel: 'estudante Erasmus+ que voltou a casa', pele: '#E3B08C', cabelo: '#2C1E14', camisola: '#C62828', fala: 'Fiz um semestre de Erasmus no Porto! A Croácia foi o último país a entrar na UE. Em 2023 ganhámos o euro e acabaram os controlos de fronteira, tudo no mesmo dia.' },
  onde: 'Praça de São Marcos, Cidade Alta',
  instituicoes: [
    { nome: 'Programa Erasmus+', funcao: 'Programa da UE que apoia estudar, estagiar, fazer voluntariado e intercâmbios noutros países. Também é para alunos do ensino básico, secundário e profissional.', local: 'Em toda a UE e não só' }
  ],
  historia: [
    ['2013', 'A 1 de julho, a Croácia torna-se o 28.º país da UE.'],
    ['2020', 'O Reino Unido sai da UE, que fica com 27 países.'],
    ['2023', 'A 1 de janeiro, a Croácia adota o euro e entra no espaço Schengen.']
  ],
  factos: [
    'O telhado da Igreja de São Marcos tem os brasões da Croácia e de Zagreb desenhados com telhas coloridas.',
    'Para aderir, um país tem de cumprir os critérios de Copenhaga: democracia, Estado de direito, respeito pelos direitos humanos e uma economia de mercado.',
    'Há vários países candidatos à adesão, como a Ucrânia, a Moldávia, o Montenegro e a Albânia.'
  ],
  quiz: [
    { p: 'Qual foi o último país a aderir à UE?', o: ['Roménia', 'Croácia', 'Bulgária', 'Eslovénia'], c: 1, e: 'A Croácia aderiu a 1 de julho de 2013.' },
    { p: 'Quantos países tem a UE hoje?', o: ['25', '27', '28', '30'], c: 1, e: 'Eram 28 até à saída do Reino Unido, em 2020.' },
    { p: 'O que é o Erasmus+?', o: ['Um comboio europeu', 'Um programa de intercâmbio e mobilidade', 'Um imposto europeu', 'Uma agência de polícia'], c: 1, e: 'O Erasmus+ apoia a mobilidade de alunos, professores e jovens.' }
  ],
  desafio: {
    tipo: 'ordenar', titulo: 'De 6 para 27',
    enunciado: 'Ordena os alargamentos da UE do mais antigo para o mais recente.',
    passos: [
      'Dinamarca, Irlanda e Reino Unido (1973)',
      'Grécia (1981)',
      'Portugal e Espanha (1986)',
      'Áustria, Finlândia e Suécia (1995)',
      'Dez países, incluindo a Polónia e a Chéquia (2004)',
      'Bulgária e Roménia (2007)',
      'Croácia (2013)'
    ]
  }
},
{
  id: 'roma', cidade: 'Roma', pais: 'Itália', pid: '380',
  titulo: 'Onde tudo se uniu',
  guia: { nome: 'Giulia', papel: 'guia no Capitólio', pele: '#E6B793', cabelo: '#3A2414', camisola: '#003399', fala: 'Chegaste ao fim da viagem, ao sítio onde a Europa se começou a unir. Aqui, no Capitólio, foram assinados em 1957 os Tratados de Roma. Falta-te só o último selo!' },
  onde: 'Sala dos Horácios e Curiácios, Capitólio',
  instituicoes: [
    { nome: 'Tratados de Roma', funcao: 'Criaram a Comunidade Económica Europeia (CEE) e a Euratom, com um mercado comum entre os 6 fundadores.', local: 'Capitólio, Roma' }
  ],
  historia: [
    ['1957', 'A 25 de março, os seis fundadores assinam os Tratados de Roma.'],
    ['1958', 'Os tratados entram em vigor e começa a CEE.'],
    ['2017', 'Os líderes regressam a Roma para celebrar os 60 anos.']
  ],
  factos: [
    'A bandeira europeia tem 12 estrelas douradas em círculo, sobre fundo azul. O número 12 é símbolo de unidade e perfeição e não muda com o número de países.',
    'O hino europeu é a «Ode à Alegria», da 9.ª Sinfonia de Beethoven. Não tem letra oficial.',
    'O lema da UE é «Unida na diversidade».'
  ],
  quiz: [
    { p: 'Em que ano foram assinados os Tratados de Roma?', o: ['1945', '1957', '1973', '1992'], c: 1, e: 'A 25 de março de 1957, no Capitólio.' },
    { p: 'Porque é que a bandeira europeia tem 12 estrelas?', o: ['Porque havia 12 países', 'É um símbolo de unidade e perfeição', 'Representa os 12 meses', 'Representa 12 tratados'], c: 1, e: 'O número de estrelas não tem a ver com o número de países.' },
    { p: 'Qual é o lema da UE?', o: ['Liberdade, igualdade, fraternidade', 'Unida na diversidade', 'Um por todos, todos por um', 'Paz e progresso'], c: 1, e: '«Unida na diversidade» é o lema desde 2000.' }
  ],
  desafio: {
    tipo: 'bandeira', titulo: 'Monta a bandeira europeia',
    enunciado: 'Usa os controlos para reconstruir a bandeira da União Europeia.'
  }
}
];

/* Eventos de viagem entre cidades */
const PERNAS = {
  'porto-lisboa': { paises: ['Portugal'], facto: 'A nova linha de alta velocidade entre o Porto e Lisboa recebe financiamento europeu. A UE apoia uma rede de transportes que liga todo o continente.' },
  'lisboa-paris': { paises: ['Portugal', 'Espanha', 'França'], facto: 'Com o «roaming como em casa», em vigor desde 2017, ligas e usas dados noutro país da UE ao preço do teu tarifário.' },
  'paris-bruxelas': { paises: ['França', 'Bélgica'], facto: 'Os comboios de alta velocidade ligam Paris a Bruxelas em cerca de 1h30. A UE financia corredores ferroviários que unem as grandes cidades.' },
  'bruxelas-haia': { paises: ['Bélgica', 'Países Baixos'], facto: 'Se o teu comboio chegar com mais de 1 hora de atraso, as regras da UE dão-te direito a uma indemnização de pelo menos 25% do bilhete.' },
  'haia-maastricht': { paises: ['Países Baixos'], facto: 'Os Países Baixos têm mais bicicletas do que habitantes. A UE apoia ciclovias que atravessam fronteiras, como a rede EuroVelo.' },
  'maastricht-luxemburgo': { paises: ['Países Baixos', 'Bélgica', 'Luxemburgo'], facto: 'No Luxemburgo, os transportes públicos são gratuitos em todo o país desde 2020.' },
  'luxemburgo-estrasburgo': { paises: ['Luxemburgo', 'França'], facto: 'Milhares de pessoas vivem em França, na Bélgica ou na Alemanha e trabalham todos os dias no Luxemburgo: são trabalhadores transfronteiriços.' },
  'estrasburgo-frankfurt': { paises: ['França', 'Alemanha'], facto: 'Ao atravessar o rio Reno passas de França para a Alemanha. Durante séculos esta fronteira foi palco de guerras. Hoje há pontes para peões entre os dois países.' },
  'frankfurt-praga': { paises: ['Alemanha', 'Chéquia'], facto: 'Na Chéquia o preço vem em coroas. Pagar com cartão europeu é simples, mas convém saber que a moeda é diferente.' },
  'praga-varsovia': { paises: ['Chéquia', 'Polónia'], facto: 'Aos 18 anos podes candidatar-te ao DiscoverEU e ganhar um passe gratuito para viajar de comboio pela Europa.' },
  'varsovia-zagreb': { paises: ['Polónia', 'Eslováquia', 'Hungria', 'Croácia'], facto: 'Nesta viagem atravessas 4 países sem mostrar documentos. Mesmo assim, leva sempre o Cartão de Cidadão: a polícia pode pedir para o ver.' },
  'zagreb-roma': { paises: ['Croácia', 'Eslovénia', 'Itália'], facto: 'As regras europeias protegem os passageiros de avião: em atrasos longos ou cancelamentos podes ter direito a assistência e a indemnização.' }
};

/* Expressões locais (lang = código para a voz do navegador) */
const EXPRESSOES = {
  porto: { lingua: 'Português (falar do Porto)', lang: 'pt-PT', lista: [['Bem-vindo ao Porto!', 'Saudação'], ['Bora lá, carago!', 'Expressão típica do Porto: «Vamos lá!»'], ['Unida na diversidade', 'Lema da UE']] },
  lisboa: { lingua: 'Português', lang: 'pt-PT', lista: [['Olá! Bem-vindo a Lisboa.', 'Saudação'], ['Obrigado! / Obrigada!', 'Agradecer'], ['Saudade', 'Palavra portuguesa difícil de traduzir']] },
  paris: { lingua: 'Francês', lang: 'fr-FR', lista: [['Bonjour !', 'Bom dia!'], ['Merci beaucoup.', 'Muito obrigado.'], ['Unie dans la diversité', 'Lema da UE']] },
  bruxelas: { lingua: 'Neerlandês e francês', lang: 'nl-BE', lista: [['Goeiedag!', 'Bom dia! (neerlandês)', 'nl-BE'], ['Bonjour !', 'Bom dia! (francês)', 'fr-BE'], ['In verscheidenheid verenigd', 'Lema da UE (neerlandês)', 'nl-BE']], nota: 'A Bélgica tem três línguas oficiais: neerlandês, francês e alemão. Em Bruxelas, as placas das ruas estão em francês e neerlandês.' },
  haia: { lingua: 'Neerlandês', lang: 'nl-NL', lista: [['Hallo!', 'Olá!'], ['Dank je wel.', 'Obrigado.'], ['Waar is het station?', 'Onde é a estação?']] },
  maastricht: { lingua: 'Neerlandês', lang: 'nl-NL', lista: [['Goedemorgen!', 'Bom dia!'], ['Proost!', 'Saúde! (num brinde)'], ['Tot ziens!', 'Até à vista!']] },
  luxemburgo: { lingua: 'Luxemburguês, francês e alemão', lang: 'de-DE', lista: [['Moien!', 'Olá! (luxemburguês)', 'lb'], ['Merci!', 'Obrigado! (também se diz em luxemburguês)', 'fr-FR'], ['In Vielfalt geeint', 'Lema da UE (alemão)', 'de-DE']], nota: 'O luxemburguês é a língua nacional, mas não é língua oficial da UE. O francês e o alemão são.' },
  estrasburgo: { lingua: 'Francês', lang: 'fr-FR', lista: [['Je suis citoyen européen.', 'Sou cidadão europeu.'], ['S’il vous plaît.', 'Por favor.'], ['Au revoir !', 'Adeus!']] },
  frankfurt: { lingua: 'Alemão', lang: 'de-DE', lista: [['Guten Tag!', 'Bom dia!'], ['Danke schön!', 'Muito obrigado!'], ['Wie viel kostet das?', 'Quanto custa?']] },
  praga: { lingua: 'Checo', lang: 'cs-CZ', lista: [['Dobrý den!', 'Bom dia!'], ['Děkuji.', 'Obrigado.'], ['Jednotná v rozmanitosti', 'Lema da UE']] },
  varsovia: { lingua: 'Polaco', lang: 'pl-PL', lista: [['Dzień dobry!', 'Bom dia!'], ['Dziękuję.', 'Obrigado.'], ['Zjednoczona w różnorodności', 'Lema da UE']] },
  zagreb: { lingua: 'Croata', lang: 'hr-HR', lista: [['Bok!', 'Olá!'], ['Hvala.', 'Obrigado.'], ['Ujedinjeni u različitosti', 'Lema da UE']] },
  roma: { lingua: 'Italiano', lang: 'it-IT', lista: [['Buongiorno!', 'Bom dia!'], ['Grazie mille!', 'Muito obrigado!'], ['Unita nella diversità', 'Lema da UE']] }
};

const LINGUAS_UE = ['alemão', 'búlgaro', 'checo', 'croata', 'dinamarquês', 'eslovaco', 'esloveno', 'espanhol', 'estónio', 'finlandês', 'francês', 'grego', 'húngaro', 'inglês', 'irlandês', 'italiano', 'letão', 'lituano', 'maltês', 'neerlandês', 'polaco', 'português', 'romeno', 'sueco'];

/* Ligações oficiais (abrem num separador novo). v = vídeo curto */
const EP = 'https://www.europarl.europa.eu/topics/pt/article/';
const LIGACOES = {
  porto: [
    { t: 'Cimeira Social do Porto: metas sociais para 2030', u: 'https://portugal.representation.ec.europa.eu/news/cimeira-social-do-porto-todos-os-parceiros-afirmam-compromisso-com-metas-sociais-para-2030-2021-05-07_pt', f: 'Comissão Europeia em Portugal' },
    { t: 'Os benefícios da União Europeia', u: EP + '20230703STO01915/the-benefits-of-the-european-union-video', v: true, f: 'Parlamento Europeu' }
  ],
  lisboa: [
    { t: 'Representação da Comissão Europeia em Portugal', u: 'https://portugal.representation.ec.europa.eu/', f: 'Comissão Europeia' },
    { t: 'Ler os tratados fundadores', u: 'https://eur-lex.europa.eu/collection/eu-law/treaties/treaties-founding.html?locale=pt', f: 'EUR-Lex · Serviço das Publicações' },
    { t: 'Agência Europeia da Segurança Marítima', u: 'https://www.emsa.europa.eu/', f: 'EMSA' }
  ],
  paris: [
    { t: 'A Declaração Schuman', u: 'https://european-union.europa.eu/principles-countries-history/history-eu/1945-1959/schuman-declaration-may-1950_pt', f: 'União Europeia' },
    { t: 'Os valores da UE explicados num minuto', u: EP + '20210325STO00802/eu-values-explained-in-one-minute', v: true, f: 'Parlamento Europeu' }
  ],
  bruxelas: [
    { t: 'Quem é quem nas instituições', u: 'https://op.europa.eu/pt/web/who-is-who', f: 'EU Whoiswho · Serviço das Publicações' },
    { t: 'Como são escolhidos os membros da Comissão?', u: EP + '20231212STO15844/how-are-the-members-of-the-european-commission-elected-video', v: true, f: 'Parlamento Europeu' },
    { t: 'O processo democrático da UE em menos de um minuto', u: EP + '20180322STO00306/the-eu-democratic-process-in-under-one-minute-video', v: true, f: 'Parlamento Europeu' }
  ],
  haia: [
    { t: 'Europol', u: 'https://www.europol.europa.eu/', f: 'Europol' },
    { t: 'Como se faz cumprir a lei da UE?', u: EP + '20210628STO07268/how-is-eu-law-enforced-video', v: true, f: 'Parlamento Europeu' }
  ],
  maastricht: [
    { t: 'Ler os tratados fundadores', u: 'https://eur-lex.europa.eu/collection/eu-law/treaties/treaties-founding.html?locale=pt', f: 'EUR-Lex · Serviço das Publicações' },
    { t: 'Que poderes tem a UE?', u: EP + '20210325STO00804/what-powers-does-the-eu-have-video', v: true, f: 'Parlamento Europeu' },
    { t: 'História da UE', u: 'https://european-union.europa.eu/principles-countries-history/history-eu_pt', f: 'União Europeia' }
  ],
  luxemburgo: [
    { t: 'Dados europeus abertos', u: 'https://data.europa.eu/pt', f: 'data.europa.eu' },
    { t: 'O espaço Schengen', u: 'https://www.consilium.europa.eu/pt/policies/schengen-area/', f: 'Conselho da UE' },
    { t: 'Tribunal de Justiça da UE', u: 'https://curia.europa.eu/', f: 'CURIA' }
  ],
  estrasburgo: [
    { t: 'Como funciona o Parlamento Europeu', u: EP + '20180322STO00309/how-the-european-parliament-works-video', v: true, f: 'Parlamento Europeu' },
    { t: 'Votar nas eleições europeias', u: EP + '20180828STO10901/voting-in-the-european-elections-video', v: true, f: 'Parlamento Europeu' }
  ],
  frankfurt: [
    { t: 'As duas faces da moeda de euro', u: EP + '20210628STO07265/the-two-sides-of-the-euro-coin-video', v: true, f: 'Parlamento Europeu' },
    { t: 'Banco Central Europeu', u: 'https://www.ecb.europa.eu/', f: 'BCE' }
  ],
  praga: [
    { t: 'Agência da UE para o Programa Espacial', u: 'https://www.euspa.europa.eu/', f: 'EUSPA' },
    { t: 'Como influencia a UE as políticas globais?', u: EP + '20210628STO07267/how-does-the-eu-influence-global-policies-video', v: true, f: 'Parlamento Europeu' }
  ],
  varsovia: [
    { t: 'Frontex', u: 'https://www.frontex.europa.eu/', f: 'Frontex' },
    { t: 'A UE e o mundo', u: EP + '20180322STO00305/the-eu-and-the-world-why-the-eu-matters-video', v: true, f: 'Parlamento Europeu' }
  ],
  zagreb: [
    { t: 'A oferta do Parlamento para os jovens', u: EP + '20231212STO15845/parliament-s-youth-offer-learn-about-the-eu-and-stand-up-for-democracy-video', v: true, f: 'Parlamento Europeu' },
    { t: 'Erasmus+', u: 'https://erasmus-plus.ec.europa.eu/pt', f: 'Comissão Europeia' }
  ],
  roma: [
    { t: 'Ler os tratados fundadores', u: 'https://eur-lex.europa.eu/collection/eu-law/treaties/treaties-founding.html?locale=pt', f: 'EUR-Lex · Serviço das Publicações' },
    { t: 'O hino europeu', u: 'https://european-union.europa.eu/principles-countries-history/symbols/european-anthem_pt', f: 'União Europeia' },
    { t: 'Os símbolos da UE', u: 'https://european-union.europa.eu/principles-countries-history/symbols_pt', f: 'União Europeia' }
  ]
};
const LIGACOES_GERAIS = [
  { t: 'Publicações da UE para cidadãos e escolas', u: 'https://op.europa.eu/pt/web/general-publications/dgcomm_publications_for_citizens', f: 'Serviço das Publicações da UE' },
  { t: 'Serviço das Publicações da UE', u: 'https://op.europa.eu/pt/', f: 'op.europa.eu' },
  { t: 'Aprender a usar o EUR-Lex', u: 'https://eur-lex.europa.eu/content/online-learning/index.html', f: 'EUR-Lex' },
  { t: 'Vídeos explicativos do Parlamento Europeu', u: 'https://www.europarl.europa.eu/topics/pt/topic/explainers-videos', v: true, f: 'Parlamento Europeu' },
  { t: 'Espaço de Aprendizagem: materiais para alunos', u: 'https://learning-corner.learning.europa.eu/index_pt', f: 'União Europeia' },
  { t: 'As línguas da UE', u: 'https://european-union.europa.eu/principles-countries-history/languages_pt', f: 'União Europeia' },
  { t: 'O hino europeu', u: 'https://european-union.europa.eu/principles-countries-history/symbols/european-anthem_pt', f: 'União Europeia' }
];

/* «Ode à Alegria» (Beethoven, 1824, domínio público): [nota, tempos] */
const HINO = [
  ['E4',1],['E4',1],['F4',1],['G4',1],['G4',1],['F4',1],['E4',1],['D4',1],['C4',1],['C4',1],['D4',1],['E4',1],['E4',1.5],['D4',.5],['D4',2],
  ['E4',1],['E4',1],['F4',1],['G4',1],['G4',1],['F4',1],['E4',1],['D4',1],['C4',1],['C4',1],['D4',1],['E4',1],['D4',1.5],['C4',.5],['C4',2],
  ['D4',1],['D4',1],['E4',1],['C4',1],['D4',1],['E4',.5],['F4',.5],['E4',1],['C4',1],['D4',1],['E4',.5],['F4',.5],['E4',1],['D4',1],['C4',1],['D4',1],['G3',2],
  ['E4',1],['E4',1],['F4',1],['G4',1],['G4',1],['F4',1],['E4',1],['D4',1],['C4',1],['C4',1],['D4',1],['E4',1],['D4',1.5],['C4',.5],['C4',2]
];

/* Níveis: Explorador (2.º ciclo), Navegador (3.º ciclo), Embaixador (secundário) */
const NIVEIS = {
  1: { nome: 'Explorador', publico: '2.º ciclo', desc: 'Perguntas mais simples e ajuda do guia sempre à mão.' },
  2: { nome: 'Navegador', publico: '3.º ciclo', desc: 'Perguntas sobre instituições, datas e funções.' },
  3: { nome: 'Embaixador', publico: 'Ensino secundário', desc: 'Perguntas mais exigentes sobre tratados e funcionamento da UE.' }
};
const QUIZ_EXTRA = {
  porto: { f: { p: 'Que rio passa no Porto?', o: ['Douro', 'Tejo', 'Mondego', 'Minho'], c: 0, e: 'O Douro nasce em Espanha e desagua no Porto.' },
           d: { p: 'Que documento esteve no centro da Cimeira Social do Porto?', o: ['Pilar Europeu dos Direitos Sociais', 'Tratado de Roma', 'Carta das Nações Unidas', 'Acordo de Schengen'], c: 0, e: 'A cimeira aprovou metas para pôr em prática o Pilar Europeu dos Direitos Sociais.' } },
  lisboa: { f: { p: 'Que rio passa em Lisboa?', o: ['Douro', 'Tejo', 'Sado', 'Guadiana'], c: 1, e: 'Lisboa fica na foz do rio Tejo.' },
            d: { p: 'Que artigo do Tratado da UE permite a um país sair da União?', o: ['Artigo 1.º', 'Artigo 50.º', 'Artigo 7.º', 'Artigo 100.º'], c: 1, e: 'O artigo 50.º foi introduzido pelo Tratado de Lisboa e usado pelo Reino Unido.' } },
  paris: { f: { p: 'Qual é a capital de França?', o: ['Lyon', 'Paris', 'Marselha', 'Nice'], c: 1, e: 'Paris é a capital de França.' },
           d: { p: 'Quem preparou o plano que deu origem à Declaração Schuman?', o: ['Jean Monnet', 'Charles de Gaulle', 'Winston Churchill', 'Konrad Adenauer'], c: 0, e: 'Jean Monnet preparou o plano. Robert Schuman apresentou-o publicamente.' } },
  bruxelas: { f: { p: 'Em que país fica Bruxelas?', o: ['Países Baixos', 'Bélgica', 'França', 'Luxemburgo'], c: 1, e: 'Bruxelas é a capital da Bélgica.' },
              d: { p: 'Quem preside ao Conselho Europeu desde dezembro de 2024?', o: ['Ursula von der Leyen', 'Roberta Metsola', 'António Costa', 'Christine Lagarde'], c: 2, e: 'António Costa. Von der Leyen preside à Comissão, Metsola ao Parlamento e Lagarde ao BCE.' } },
  haia: { f: { p: 'Que meio de transporte é muito usado nos Países Baixos?', o: ['Camelo', 'Bicicleta', 'Teleférico', 'Trenó'], c: 1, e: 'Os Países Baixos têm mais bicicletas do que habitantes.' },
          d: { p: 'Qual é a diferença entre a Europol e uma polícia nacional?', o: ['A Europol faz detenções em todos os países', 'A Europol apoia e coordena, mas não faz detenções', 'A Europol só atua fora da UE', 'Não há diferença'], c: 1, e: 'As detenções são feitas pelas polícias de cada país.' } },
  maastricht: { f: { p: 'Junto a que rio fica Maastricht?', o: ['Tejo', 'Mosa', 'Sena', 'Danúbio'], c: 1, e: 'O nome da cidade vem do rio Mosa (Maas, em neerlandês).' },
                d: { p: 'Qual destes NÃO é um critério de Maastricht para adotar o euro?', o: ['Inflação controlada', 'Contas públicas equilibradas', 'Taxas de juro estáveis', 'Ter mais de 10 milhões de habitantes'], c: 3, e: 'O tamanho do país não conta: Malta e o Luxemburgo usam o euro.' } },
  luxemburgo: { f: { p: 'Schengen é o nome de…', o: ['uma aldeia do Luxemburgo', 'um queijo', 'um comboio', 'um rio'], c: 0, e: 'É uma pequena aldeia junto ao rio Mosela.' },
                d: { p: 'Qual destes países é da UE mas NÃO faz parte do espaço Schengen?', o: ['Áustria', 'Irlanda', 'Croácia', 'Bulgária'], c: 1, e: 'A Irlanda e Chipre são da UE mas estão fora de Schengen.' } },
  estrasburgo: { f: { p: 'Quem elege os deputados ao Parlamento Europeu?', o: ['Os cidadãos', 'Os reis', 'Os juízes', 'A Comissão'], c: 0, e: 'Os cidadãos votam nas eleições europeias, de 5 em 5 anos.' },
                 d: { p: 'Com que instituição o Parlamento partilha o poder de aprovar leis e o orçamento?', o: ['Conselho da UE', 'Conselho da Europa', 'Tribunal de Justiça', 'BCE'], c: 0, e: 'Parlamento e Conselho da UE são os dois colegisladores.' } },
  frankfurt: { f: { p: 'Qual é o símbolo do euro?', o: ['$', '€', '£', '¥'], c: 1, e: 'O símbolo € inspira-se na letra grega épsilon e no E de Europa.' },
               d: { p: 'O que é a inflação?', o: ['A subida geral dos preços', 'A descida dos salários', 'O aumento das exportações', 'A troca de moedas'], c: 0, e: 'Com inflação alta, o mesmo dinheiro compra menos coisas.' } },
  praga: { f: { p: 'Para que serve um sistema de navegação por satélite?', o: ['Saber onde estás', 'Ver televisão', 'Medir a temperatura', 'Enviar cartas'], c: 0, e: 'Os satélites enviam sinais que o telemóvel usa para calcular a posição.' },
           d: { p: 'Quantos países aderiram à UE em 2004?', o: ['2', '6', '10', '15'], c: 2, e: 'Chipre, Chéquia, Eslováquia, Eslovénia, Estónia, Hungria, Letónia, Lituânia, Malta e Polónia.' } },
  varsovia: { f: { p: 'Qual é a capital da Polónia?', o: ['Cracóvia', 'Varsóvia', 'Gdansk', 'Praga'], c: 1, e: 'Varsóvia é a capital e a maior cidade da Polónia.' },
              d: { p: 'O que regista o Sistema de Entrada/Saída?', o: ['Os cidadãos da UE em viagem', 'Os viajantes de fora da UE que entram e saem de Schengen', 'As mercadorias', 'Os horários dos comboios'], c: 1, e: 'Substitui os carimbos manuais nos passaportes de quem vem de fora da UE.' } },
  zagreb: { f: { p: 'Que programa da UE permite estudar noutro país?', o: ['Erasmus+', 'Galileo', 'Copernicus', 'Schengen'], c: 0, e: 'O Erasmus+ também tem projetos para escolas do básico e do secundário.' },
            d: { p: 'Como se chamam as condições que um país tem de cumprir para aderir à UE?', o: ['Critérios de Maastricht', 'Critérios de Copenhaga', 'Regras de Schengen', 'Acordos de Roma'], c: 1, e: 'Foram definidos em Copenhaga, em 1993.' } },
  roma: { f: { p: 'De que cor são as estrelas da bandeira europeia?', o: ['Brancas', 'Douradas', 'Vermelhas', 'Azuis'], c: 1, e: 'São 12 estrelas douradas sobre fundo azul.' },
          d: { p: 'Que duas comunidades criaram os Tratados de Roma?', o: ['CEE e Euratom', 'CECA e NATO', 'UE e BCE', 'Conselho da Europa e ONU'], c: 0, e: 'A Comunidade Económica Europeia e a Comunidade Europeia da Energia Atómica.' } }
};

const OLA_24 = [
  ['alemão', 'Hallo', 'de-DE'], ['búlgaro', 'Здравей (Zdravei)', 'bg-BG'], ['checo', 'Ahoj', 'cs-CZ'], ['croata', 'Bok', 'hr-HR'],
  ['dinamarquês', 'Hej', 'da-DK'], ['eslovaco', 'Ahoj', 'sk-SK'], ['esloveno', 'Živjo', 'sl-SI'], ['espanhol', 'Hola', 'es-ES'],
  ['estónio', 'Tere', 'et-EE'], ['finlandês', 'Hei', 'fi-FI'], ['francês', 'Bonjour', 'fr-FR'], ['grego', 'Γεια σου (Yia su)', 'el-GR'],
  ['húngaro', 'Szia', 'hu-HU'], ['inglês', 'Hello', 'en-IE'], ['irlandês', 'Dia duit', 'ga-IE'], ['italiano', 'Ciao', 'it-IT'],
  ['letão', 'Sveiki', 'lv-LV'], ['lituano', 'Labas', 'lt-LT'], ['maltês', 'Bonġu', 'mt-MT'], ['neerlandês', 'Hallo', 'nl-NL'],
  ['polaco', 'Cześć', 'pl-PL'], ['português', 'Olá', 'pt-PT'], ['romeno', 'Bună', 'ro-RO'], ['sueco', 'Hej', 'sv-SE']
];

const RESUMOS = {
  porto: 'O ponto de partida. Descobre o que a Europa já mudou na tua região.',
  lisboa: 'Um tratado com nome de cidade e duas agências europeias junto ao Tejo.',
  paris: 'Depois da guerra, uma ideia: partilhar o carvão e o aço para garantir a paz.',
  bruxelas: 'Comissão, Conselho e Conselho Europeu: aqui se propõe e se decide.',
  haia: 'Polícias e procuradores de 27 países a trabalhar em conjunto.',
  maastricht: 'O tratado que criou a União Europeia e a cidadania europeia.',
  luxemburgo: 'Tribunais, contas certas e a aldeia que abriu as fronteiras.',
  estrasburgo: '720 deputados, 24 línguas e a voz dos cidadãos.',
  frankfurt: 'A casa do euro e do banco que vigia os preços.',
  praga: 'Satélites europeus que te dizem onde estás.',
  varsovia: 'Quem guarda as fronteiras externas da União?',
  zagreb: 'O país mais recente e as portas abertas do Erasmus+.',
  roma: 'Onde tudo se uniu: tratados, bandeira e hino.'
};
