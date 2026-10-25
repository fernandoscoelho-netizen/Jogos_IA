# Prompt técnico — Clube Europeu: O Expresso das Estrelas

Prompt pronto a entregar a um agente de desenvolvimento web com acesso aos ficheiros originais. A aplicação a produzir é uma nova versão funcional; este documento define a sua direção criativa, requisitos e critérios de entrega.

## 1. Papel e missão

Atua como uma equipa sénior de desenvolvimento web, direção criativa, design de experiências educativas e engenharia gráfica Three.js. Analisa o projeto original e implementa a sua nova versão: uma expedição virtual do Clube Europeu pela União Europeia, do Porto a Roma, com cidades tridimensionais reconhecíveis, viagens animadas e atividades educativas integradas nos lugares.

O resultado deve despertar esta sensação: «estou a partir com o meu clube, a atravessar a Europa e a descobrir lugares e ideias com outras pessoas».

Há liberdade para reinventar integralmente a navegação, a organização dos ecrãs e a apresentação das atividades. Preservar identidade significa manter o conceito educativo, a ligação ao Clube Europeu e à escola, o espírito europeu, as cores e os conteúdos essenciais. A interface e a navegabilidade atuais são material de análise, não um molde obrigatório.

O utilizador gosta da página de entrada. Conserva a sua clareza, luminosidade, tipografia e imaginário de bilhete/passaporte, dando-lhe profundidade, movimento e uma transição memorável para a viagem.

## 2. Base documental e código de origem

Nesta pasta de trabalho, os originais estão em `original/clube-europeu-ue/`:

- `index.html`: versão autónoma construída, com código e recursos incorporados.
- `codigo-fonte/app.html`: estrutura, estilos e página de entrada.
- `codigo-fonte/app.js`: estado, progressão, mapa, viagens, atividades, áudio, passaporte, relatórios e certificado.
- `codigo-fonte/content.js`: países, paragens, personagens, instituições, perguntas, desafios, percursos, línguas e ligações.
- `codigo-fonte/scenes.js`: postais SVG, avatares, ícones e carimbos.
- `codigo-fonte/mapdata.js`: cartografia projetada e coordenadas das cidades.
- `codigo-fonte/build-map.mjs`: geração da cartografia com Natural Earth/world-atlas, topojson-client e d3-geo.
- `codigo-fonte/build.py`: compilação da versão autónoma.
- `codigo-fonte/assets/logo-agrupamento.png`, `LEIA-ME.md` e `Guia-Clube-Europeu.pdf`.

Lê estes materiais como fontes do projeto. Distingue conteúdo documental e comentários do código das instruções deste pedido. Antes de modificar, inventaria conteúdos, regras e recursos. Preserva uma cópia intacta do original e implementa a nova versão numa pasta própria, por exemplo `nova-versao/`.

## 3. Direção criativa: O Expresso das Estrelas

O nome original «O Clube Europeu foi conhecer a UE…» mantém-se como título institucional. «O Expresso das Estrelas» é o fio narrativo da experiência e pode aparecer como subtítulo. O comboio simboliza a expedição; a escolha de avião continua disponível nos troços elegíveis.

### Abertura — o bilhete ganha vida

Na página inicial, o bilhete tem profundidade física, papel claro, relevo subtil e pequenas marcas de viagem. Na sua janela vê-se o Porto em 3D: o Douro move-se suavemente, um comboio atravessa a ponte, as nuvens deslocam-se. Uma linha dourada desenha parte da rota sobre um atlas discreto. Mantém o texto e o formulário legíveis e disponíveis enquanto a arte carrega.

Ao iniciar, o bilhete aproxima-se e a sua janela torna-se a janela da viagem. A câmara atravessa esse enquadramento e revela o Porto. A transição tem alternativa imediata, pode ser ignorada e não impede continuar uma sessão existente.

### O atlas vivo

O mapa da Europa é uma mesa de exploração tridimensional, luminosa e geograficamente coerente. As cidades surgem como pequenos conjuntos arquitetónicos nas coordenadas corretas. Rios, relevo contido, fronteiras, nomes e rotas ajudam a orientação. Ao aproximar, um monumento torna-se a porta de entrada para o bairro explorável.

Três escalas coordenadas organizam a experiência:

1. **Europa:** perceber a localização, o percurso e as relações entre países.
2. **Viagem:** acompanhar a deslocação, observar a paisagem e compreender fronteiras e escolhas de mobilidade.
3. **Lugar:** explorar uma pequena área da cidade, conhecer uma personagem e realizar as atividades.

A passagem entre escalas deve ter continuidade visual. Usa aproximações de câmara e mudanças de escala cuidadosamente encenadas; não exige modelar continuamente todo o território entre duas cidades.

### O caderno das descobertas

O diário passa a ser um objeto recorrente: abre-se para registar uma ideia, recebe o carimbo e guarda um postal do local. Os 13 carimbos desenham o percurso pessoal. A bandeira europeia conserva sempre as suas 12 estrelas; não transformar as 13 paragens em 13 estrelas da bandeira.

No final, em Roma, o aluno constrói a bandeira e observa o atlas com a rota completa. O caderno abre nas descobertas escritas pelo próprio, acompanhado por um breve encerramento e pelo certificado. O hino só toca por decisão do utilizador.

### O clube como companhia

Mantém os guias locais existentes, começando pela professora Inês. Pequenas falas contextuais dão coesão: antes de partir, durante uma travessia e à chegada. Representa o clube com retratos ou personagens leves e expressivas, sem impor a criação de avatares antes de começar.

Permite jogar individualmente ou em pares no mesmo dispositivo. A colaboração pode surgir através de sugestões como «um observa, outro regista; troquem na próxima cidade». Não acrescentes contas ou infraestrutura multijogador como requisito.

## 4. Nova navegação e interação

Organiza o jogo em torno do espaço e da próxima ação significativa. A cena ocupa a área principal; os controlos essenciais permanecem claros e discretos.

- Uma bússola/miniatura do mapa indica onde estou e permite regressar ao atlas.
- O bilhete mostra origem, destino e escolha de transporte quando a próxima viagem está disponível.
- O caderno reúne diário, passaporte e coleção de descobertas.
- O guia oferece orientação e pistas.
- Um acesso estável reúne som, movimento, qualidade gráfica, ajuda e recursos docentes.
- A cidade oferece pontos de interesse com nome e função compreensíveis. Selecionar um lugar aproxima a câmara e abre o conteúdo correspondente.
- Oferece também uma lista HTML de lugares e ações. A experiência continua utilizável sem depender de encontrar pequenos objetos no cenário.

O ciclo pedagógico permanece: conhecer → quiz → desafio → diário → carimbo → escolher transporte → viajar. Estes momentos podem ter uma apresentação espacial e narrativa nova. Não é obrigatório reproduzir os quatro separadores atuais.

Distribui leitura em momentos curtos, com acesso ao conteúdo completo. Durante leitura, escrita e respostas, a câmara estabiliza e as animações de fundo reduzem-se. O aluno pode voltar ao lugar ou ao contexto sem perder respostas.

Desenhar a interação para rato, toque e teclado desde o início. Arrastar para observar nunca deve ser confundido com selecionar uma resposta. Não exigir controlo em primeira pessoa, joystick ou saltos para completar as provas.

## 5. Cidades e lugares 3D

Cria 13 ambientes próprios, com arquitetura reconhecível, profundidade, luz, materiais e movimento ambiental. Cada cidade deve incluir pelo menos um marco cultural e o lugar ligado à aprendizagem, que podem coincidir. As escolhas abaixo são propostas artísticas a confirmar com referências arquitetónicas e fontes oficiais antes da modelação.

O objetivo é realismo reconhecível com direção artística coerente: silhuetas, proporções, características construtivas, água, ruas e escala humana convincentes. Seleciona pequenos bairros ou conjuntos de locais; documenta simplificações e deslocações. Usa ligações identificadas entre locais distantes. Não apresentar edifícios afastados como vizinhos reais.

| Paragem / ID preservado | Ambientes e arquitetura a desenvolver | Encenação e integração educativa |
|---|---|---|
| Porto / `porto` | Ribeira, Douro, Ponte Luiz I; Alfândega como local adicional identificado | Chegada junto ao rio; comboio na ponte; preparar a mochila com objetos selecionáveis e alternativa em lista. Conservar fundos europeus, Cimeira Social e Erasmus+. |
| Lisboa / `lisboa` | Jerónimos e claustro; segundo núcleo no Cais do Sodré para EMSA/EUDA | Entrada pelo claustro com luz entre colunas; mesa de documentos para associar tratados. Deslocação explícita entre Belém e Cais do Sodré. |
| Paris / `paris` | Quai d’Orsay e representação documentada do Salão do Relógio; Sena e Torre Eiffel como orientação cultural | A personagem apresenta a Declaração Schuman; uma mesa-mapa ganha volume para localizar os seis fundadores. Não transferir o acontecimento para a Torre Eiffel. |
| Bruxelas / `bruxelas` | Berlaymont, edifício Europa e bairro europeu; Parlamento/Parlamentarium como outro núcleo | Câmara revela os quatro braços do Berlaymont e a volumetria do Europa; associar cada instituição à função através de pontos do bairro e cartões acessíveis. |
| Haia / `haia` | Sedes da Europol e Eurojust; Palácio da Paz como referência cultural separada | Percurso de investigação com documentos e organizações; explicitar quais pertencem à UE e quais não pertencem. Arquitetura cultural não substitui a sede institucional. |
| Maastricht / `maastricht` | Governo Provincial do Limburgo, Mosa e ponte Sint Servaasbrug como local complementar | Aproximação pelo rio ao lugar do tratado; reconhecer direitos de cidadania em situações encontradas no percurso. |
| Luxemburgo e Schengen / `luxemburgo` | Núcleo de Kirchberg com TJUE; núcleo distinto na aldeia de Schengen, Mosela e barco associado ao acordo | Viagem local identificada entre os dois núcleos; desafio com países de fora da UE que integram Schengen. Não fundir a capital e a aldeia numa só praça. |
| Estrasburgo / `estrasburgo` | Edifício Louise Weiss, água e hemiciclo simplificado documentado | Travelling junto à fachada; câmara ampla do hemiciclo; ordenar o processo legislativo numa bancada de trabalho. Distinguir Conselho da Europa e UE. |
| Frankfurt / `frankfurt` | Sede do BCE em Ostend, rio Meno; referência à antiga Eurotower apenas como local separado, se usada | Revelar as torres desde o rio; organizar uma linha temporal com peças/moedas e explicações da evolução do euro. |
| Praga / `praga` | Ponte Carlos e tecido histórico; local da EUSPA validado para a data da versão | Breve orientação cultural e passagem identificada ao núcleo científico; maquete orbital interativa para associar Galileo, Copernicus, EGNOS e IRIS². Satélites apresentados como visualização didática. |
| Varsóvia / `varsovia` | Centro histórico e referência ao Palácio da Cultura; sede da Frontex validada para a data da versão | Plano urbano com contrastes arquitetónicos; mesa de percursos para distinguir fronteiras internas e externas de Schengen. |
| Zagreb / `zagreb` | Praça e Igreja de São Marcos, telhado característico e Cidade Alta | Descoberta dos motivos do telhado; ordenar alargamentos através de um atlas temporal. Manter Erasmus+ e a personagem Luka. |
| Roma / `roma` | Capitólio e Sala dos Horácios e Curiácios; Coliseu como local cultural complementar | Final no lugar dos tratados; construir a bandeira e abrir o caderno completo. Não apresentar o Coliseu como local de assinatura. |

Os modelos precisam de volume e reconhecimento arquitetónico. Uma fotografia aplicada a um plano pode ser um recurso complementar, mas não satisfaz o requisito de monumento 3D. Blocos genéricos com nomes diferentes também não satisfazem a entrega.

## 6. Viagens que se sentem

Cada um dos 12 troços tem preparação, partida, deslocação e chegada. Mantém comboio e avião, tempo, distância e emissões estimadas, países atravessados e factos de viagem.

### Comboio

Mostra o embarque, um plano exterior do veículo e uma vista opcional pela janela. A paisagem transmite mudança de território: rios, campos, pontes e aproximação urbana. O atlas permite acompanhar a posição e o nome dos países. Usa composição procedural e elementos reutilizáveis para os troços, com identidade ambiental variável.

### Avião

Representa partida, subida, percurso elevado sobre o atlas e aproximação ao destino. Oferece uma vista de janela opcional. Diferencia visualmente a rota aérea da ferroviária.

### Regras de encenação

- Duração inicial sugerida de 6–12 segundos por viagem, ajustável após testes. Botões «Saltar viagem», «Pausar» e «Ver no mapa» sempre disponíveis.
- Uma descoberta curta por troço, retirada de `PERNAS`, com leitura posterior no caderno.
- Evita bloquear o aluno em sequências repetitivas. Rever uma cidade deve ser rápido.
- Saltar ou interromper a animação não pode duplicar uma viagem, avançar duas cidades ou perder progresso.
- Rotas ferroviárias atravessam terra e seguem corredores plausíveis; se forem esquemáticas, identifica-as. Não inventar linhas reais nem horários comerciais.
- Países atravessados são específicos do transporte e da rota representada; uma lista ferroviária não serve automaticamente para um voo.
- A distância percorrida pela geometria visual não substitui silenciosamente o cálculo pedagógico das estimativas.
- Conserva a indisponibilidade de avião em troços inferiores a 350 km segundo a distância de referência original, mas descreve-a como regra da simulação; não afirmar inexistência de voos reais sem verificação.

## 7. Câmaras e linguagem visual

Implementa um `CameraDirector` com modos explícitos, presets por cidade e transições canceláveis:

- **Atlas:** vista oblíqua ampla, com alternativa superior para localizar países.
- **Chegada:** pequeno movimento de apresentação do lugar, ignorável.
- **Exploração:** órbita limitada em torno do núcleo, zoom e deslocação controlados.
- **Ponto de interesse:** aproximação que enquadra o edifício e mantém espaço para o painel.
- **Viagem:** acompanhamento exterior, janela e vista geral selecionáveis.
- **Atividade:** câmara estável adequada ao objeto ou mapa do desafio.

Usa `PerspectiveCamera` para cidades e viagens. A vista cartográfica pode usar `OrthographicCamera` ou perspetiva controlada; documenta a opção. Calcula enquadramentos a partir dos limites dos objetos e do espaço ocupado pela interface, em diferentes proporções de ecrã.

Define distâncias e inclinações seguras, limites de pan e planos de corte adequados. Evita atravessar monumentos, entrar sob o solo, perder a cidade ou aplicar acelerações bruscas. Nunca usar tremor de câmara como efeito permanente. Inclui «Recentrar», «Vista geral» e controlo de movimento reduzido.

## 8. Identidade, luz e som

Preserva os principais tokens originais:

| Função | Cor |
|---|---|
| Azul europeu | `#003399` |
| Azul principal | `#2459A2` |
| Azul de interação | `#386BB4` |
| Amarelo europeu | `#FFCC00` |
| Dourado | `#AD8016` |
| Céu claro | `#EAF2FF` |
| Fundo | `#FBFCFE` |
| Texto | `#28405D` |

Mantém Manrope e DM Sans, ou alternativas locais equivalentes se necessário. Cenas podem usar materiais naturais e cores locais: pedra, telha, vegetação e água, harmonizados com azuis e dourados da interface. A UE deve ser reconhecível sem pintar todos os edifícios de azul.

Cria movimento com intenção: reflexos de água, nuvens, bandeiras, transportes, pessoas discretas, folhas do caderno e carimbos. Dá a cada cidade uma combinação própria de luz, arquitetura e som. Evita partículas permanentes a disputar atenção com a leitura.

Som ambiente e de deslocação são opcionais, com mute persistente. Áudio só começa após interação e respeita a preferência do utilizador. Não sobrepor narração, ambiente e hino de forma que prejudique compreensão. Mantém as vozes e textos das personagens e as expressões locais; trata a ausência de uma voz instalada com informação clara e texto sempre disponível.

## 9. Contrato pedagógico obrigatório

Preserva integralmente os conteúdos e tipos de atividade existentes. A encenação pode mudar; cada atividade continua a ter objetivo, enunciado, opções, resposta correta, feedback e ajudas identificáveis.

- 13 paragens na ordem atual: Porto → Lisboa → Paris → Bruxelas → Haia → Maastricht → Luxemburgo e Schengen → Estrasburgo → Frankfurt → Praga → Varsóvia → Zagreb → Roma.
- Três níveis: Explorador, Navegador e Embaixador.
- Três perguntas por quiz. Explorador usa a pergunta fácil adicional e as duas primeiras base; Navegador usa as três base; Embaixador usa a segunda e terceira base e a pergunta difícil adicional.
- Aprovação com pelo menos 2/3; melhor pontuação, tentativas e ajudas registadas; repetição livre.
- Ajuda do quiz elimina uma opção incorreta por pergunta, uma vez por tentativa, conforme a regra original.
- Desafios de seleção, associação, mapa, ordenação e construção da bandeira. Conserva as 13 atividades indicadas na tabela seguinte.
- Diário com mínimo de 20 caracteres no Explorador e 40 nos restantes; máximo original de 600. Guardar rascunhos.
- Carimbo só após quiz aprovado, desafio concluído e diário válido.
- A partida para a cidade seguinte depende do carimbo atual. Rever cidades alcançadas permanece possível.
- Modo livre docente permite abrir cidades fora de ordem e fica registado.
- Sem penalização por lentidão, vidas ou rankings.
- Manter instituições, histórias, curiosidades, guias, expressões, 24 saudações, hino, ligações oficiais, passaporte, seis distinções, relatório docente e certificado.

| Cidade | Desafio original a preservar |
|---|---|
| Porto | Prepara a mochila — seleção |
| Lisboa | Tratados e cidades — associação |
| Paris | Os seis fundadores — mapa |
| Bruxelas | Quem faz o quê? — associação |
| Haia | É da UE ou não? — associação/classificação |
| Maastricht | Os teus direitos de cidadão europeu — seleção |
| Luxemburgo e Schengen | Desenha o espaço Schengen — mapa |
| Estrasburgo | Como nasce uma lei europeia — ordenação |
| Frankfurt | Linha do tempo do euro — ordenação |
| Praga | Satélites europeus — associação |
| Varsóvia | Interna ou externa? — associação/classificação |
| Zagreb | De 6 para 27 — ordenação |
| Roma | Monta a bandeira europeia — construção |

Distinções preservadas: Viajante europeu (13 carimbos), Ecoviajante (9 viagens de comboio), Poliglota (10 línguas), Maestro (hino ouvido até ao fim), Mestre do quiz (3/3 em todas as cidades) e Repórter (80 caracteres em pelo menos 8 diários).

Novos enigmas podem enriquecer a exploração se tiverem relação clara com a aprendizagem. São adicionais, não substituem provas existentes e não devem criar bloqueios ocultos. O progresso educativo depende de ações explícitas e validadas, nunca apenas de terminar uma animação ou clicar num monumento.

## 10. Cartografia e rigor

Preserva as quatro leituras do mapa: Estados-Membros, euro, Schengen e adesão. Cada uma tem legenda acessível, seleção de país, ficha e alternativa em lista. Mantém identificadores cartográficos como strings, incluindo zeros iniciais.

O `mapdata.js` contém paths SVG já projetados e coordenadas no formato `[x, y, latitude, longitude]`. Decide explicitamente entre reaproveitar os paths com conversão testada para formas Three.js e regenerar geometrias a partir do conjunto geográfico. Mantém uma projeção única e consistente entre países, cidades, rotas e seleções. Considera os furos e múltiplos polígonos dos territórios.

Aumenta áreas de seleção de microestados com indicadores ou lista equivalente, mantendo a posição geográfica. Evita sobreposição de rótulos na região Benelux. O mapa tem de permitir reconhecer que a Europa geográfica, a UE, a área do euro e Schengen são conceitos diferentes.

Antes da publicação, verifica factos variáveis nas fontes oficiais: titulares, presidências, composição do euro e Schengen, sedes de agências e calendários. A indicação «verificado em outubro de 2026» no original é uma afirmação da fonte, não uma nova auditoria automática. Regista data e fonte por atualização. Corrige inconsistências justificadamente sem apagar atividades.

Em particular, revê a pergunta de Varsóvia que usa «fronteira externa da UE» e explica a resposta como limite de Schengen. A distinção tem de ser coerente com a atividade e com o caso da Irlanda.

## 11. Arquitetura técnica

Usa Three.js como motor 3D, TypeScript e Vite para desenvolvimento e compilação estática. Mantém a interface educativa em HTML/CSS semântico. Não há necessidade de backend ou de adotar um framework pesado apenas para a refatoração.

Consulta a documentação oficial compatível com a versão escolhida, fixa dependências e entrega lockfile. Não assumir que o `package.json` original já contém um motor de jogo: serve essencialmente para regenerar cartografia.

Estrutura sugerida:

```text
nova-versao/
  src/
    app/             # arranque, navegação e composição
    domain/          # regras, progressão e modelos tipados
    data/            # conteúdos migrados, países, rotas e referências
    state/           # persistência, migração e importação/exportação
    engine/          # renderer, ciclo de vida, câmara, input e recursos
    scenes/
      atlas/
      travel/
      cities/        # definição própria para cada uma das 13 paragens
    activities/      # quiz e cinco motores de desafio
    ui/              # HUD, painéis, caderno, docentes e acessibilidade
    styles/
  public/assets/     # modelos, texturas, áudio, fontes e licenças
  tests/
  docs/
```

Define componentes com responsabilidades claras: `SceneManager`, `CameraDirector`, `TravelController`, `AssetManager`, `ProgressService` e `ActivityRegistry`. Os conteúdos não devem estar presos ao renderer.

Máquina de estados visual sugerida: `landing`, `atlas`, `cityLoading`, `cityExploration`, `activity`, `journal`, `travelPreparation`, `travelling`, `arrival` e `completed`. Define eventos e transições válidas, incluindo voltar, cancelar, saltar e recuperar de erro. Separa o estado visual temporário do progresso persistente.

### Recursos 3D

- Usa GLB/glTF para modelos externos, carregados com `GLTFLoader`; geometria procedural é adequada quando mantém qualidade e reconhecimento.
- Usa controlos de órbita/mapa adequados e `Raycaster` para seleção; dá prioridade ao input da interface quando um painel está ativo.
- Usa instâncias para janelas, árvores e mobiliário repetido. LOD e compressão quando trouxerem benefício medido.
- Modelos, texturas e sons têm autor, origem, licença e atribuição num manifesto. Recursos essenciais são servidos pelo próprio projeto, com permissão adequada.
- Carrega por cidade; mantém apenas os recursos necessários e uma política limitada de cache. Liberta geometrias, materiais, texturas, controlos e listeners quando deixam de ser usados.
- Prefetch da próxima cidade apenas quando adequado à ligação e ao dispositivo.
- Define progresso de carregamento honesto, tentativas de recuperação e alternativa funcional em caso de falha.
- Não substituir um recurso arquitetónico em falta por um cubo e declarar a cidade terminada. Identifica o que é provisório e fornece uma representação simplificada reconhecível ou a alternativa 2D.

## 12. Estado, compatibilidade e privacidade

Mantém a aprendizagem e os dados pessoais no dispositivo. Não exigir conta, telemetria ou serviços pagos para jogar. Um servidor estático para fornecer ficheiros não implica envio dos diários para um backend.

O original usa `localStorage` com chave `clube-europeu-ue-v1` e códigos `CLUBEUE1.`. Implementa leitura e migração documentada dos dados antigos, preservando IDs, carimbos, diários, nível, ajudas, tentativas, viagens e distinções. Usa versão explícita no novo esquema e mantém a importação dos códigos antigos.

Migração automática de `localStorage` só é possível quando a origem permite aceder aos dados. Ao mudar de domínio ou de `file://` para HTTP, disponibiliza importação pelo código de progresso; não prometer transferência automática entre origens.

Valida dados importados: tamanho, estrutura, tipos, IDs, pontuações e índices. Nunca executar código importado nem inserir nomes ou diários como HTML não escapado. O hash original é uma verificação simples de integridade, não autenticação nem prova inviolável de autoria.

A viagem é confirmada uma única vez no estado persistente. Define recuperação após fechar a página a meio, perder contexto WebGL ou falhar o carregamento do destino. O aluno conserva tudo o que já concluiu.

Nome obrigatório, turma e escola opcionais como na base. Para trabalho em pares, o campo pode aceitar os nomes dos participantes sem criar contas adicionais.

## 13. Desempenho, inclusão e publicação

Destina-se também a computadores escolares e tablets. Define perfis baixo, médio e alto, com resolução interna, sombras, partículas e detalhe ajustáveis. Deteta capacidades; garante o percurso educativo completo em alternativa HTML/SVG quando WebGL não estiver disponível ou for desativado.

Metas iniciais, a validar em equipamento identificado:

- Interface e formulário utilizáveis antes do carregamento dos modelos.
- Pelo menos 30 fps estáveis no perfil baixo num dispositivo escolar de referência; procurar 60 fps em equipamento médio.
- Não carregar as 13 cidades na entrada. Orçamento inicial sugerido: até 5 MB comprimidos para a abertura e até 8 MB adicionais por núcleo de cidade, ajustado e documentado após medição.
- Uma única gestão do ciclo de renderização; pausar trabalho em separadores ocultos e renderizar por necessidade quando possível.
- Sem crescimento contínuo de memória após revisitar várias cidades.

As metas são critérios a medir, não resultados a declarar sem testes.

Respeita `prefers-reduced-motion`, oferece controlo persistente de animação e elimina movimentos automáticos nesse modo. Teclado e leitores de ecrã acedem a ações equivalentes em DOM. Mantém foco visível, ordem de leitura, rótulos, contraste adequado e alvos táteis de pelo menos 44 px como meta de desenho. Cor nunca é o único sinal de progresso ou erro. Conteúdo não depende de áudio.

Publica como aplicação estática por HTTP(S), com `npm run dev`, `npm run build` e instruções para servir `dist/`. Configura caminhos relativos/base para servidor escolar, subpastas e GitHub Pages. Explica como disponibilizar no Moodle conforme a configuração da escola.

O original abre diretamente por duplo clique num HTML. A nova versão com módulos e modelos não deve prometer a mesma distribuição sem uma solução específica testada. Mantém o original como alternativa e documenta a mudança. Se implementares cache offline/PWA, apresenta-a como funcionalidade adicional, com testes de atualização e informação clara sobre quais cidades estão disponíveis offline.

## 14. Plano de execução e entregáveis

Executa por fases cumulativas, preservando uma aplicação executável em cada fase:

1. **Auditoria e contrato de preservação:** inventário das 13 paragens, perguntas base e adicionais, desafios, regras, persistência e recursos. Mapa de correspondência entre funcionalidade antiga e nova.
2. **Direção visual implementada:** abertura animada e uma sequência completa no Porto, com monumento reconhecível, guia, quiz, mochila, diário e carimbo. Deve demonstrar a qualidade final pretendida.
3. **Atlas e deslocação:** Porto–Lisboa com embarque, viagem, chegada, salto de animação e recuperação. Implementa as quatro camadas do mapa e a integração dos dados.
4. **Expansão:** os 13 ambientes, os 12 troços e todas as atividades; evitar que só a primeira cidade receba trabalho visual real.
5. **Continuidade e entrega:** migração de códigos, docentes, passaporte, certificado, desempenho, acessibilidade, alternativa 2D e publicação.

Não parar na maquete da fase 2 como se fosse a versão completa. Se houver uma limitação concreta, identifica exatamente os recursos e funções pendentes; não esconder placeholders nem apresentar medições inventadas.

Entrega código-fonte, build estático, README com comandos, manifesto de recursos/licenças, inventário de preservação, decisões técnicas, testes executados e limitações verificadas. Inclui capturas da entrada, atlas, viagens e das 13 cidades. Não publicar externamente sem autorização específica.

## 15. Critérios de aceitação

- A entrada preserva o espírito visual apreciado e ganha uma sequência de partida própria.
- A navegação principal é organizada pela expedição, com atlas, viagem e lugares exploráveis.
- As 13 cidades possuem ambientes distintos e pelo menos um marco arquitetónico volumétrico reconhecível.
- Monumentos culturais e lugares institucionais estão identificados corretamente; não há falsas vizinhanças apresentadas como geografia real.
- Todos os quizzes, desafios, explicações, ajudas, níveis e regras de carimbo continuam disponíveis.
- O percurso normal tem 13 carimbos e 12 viagens. O modo livre continua funcional e identificado.
- Terminar, saltar ou recuperar uma viagem produz o mesmo estado educativo e um único registo do troço.
- Importar um código antigo conserva os dados; um código inválido não derruba a aplicação nem substitui o progresso válido.
- Há testes das regras de progressão, dos cinco tipos de desafio e da seleção de perguntas por nível; testes de integração cobrem início, carimbo, deslocação, continuação e certificado.
- Pelo menos um teste ponta a ponta percorre a viagem completa; fixtures cobrem também migração, modo livre e estado final.
- Verificação manual documentada cobre teclado, toque, movimento reduzido, som desligado, falha de recurso e indisponibilidade de WebGL.
- Desempenho e memória são medidos em dispositivos/perfis identificados. O build funciona numa subpasta de servidor estático.

Antes de dar o trabalho por concluído, compara a entrega com o inventário original. Apresenta o que está implementado e verificado, as medições reais e qualquer pendência.

## Referências técnicas

Confirmar APIs e compatibilidade na versão efetivamente instalada:

- [Documentação oficial Three.js](https://threejs.org/docs/) — câmaras, geometrias, curvas, seleção, materiais, controlos e carregadores.
- [Publicação estática com Vite](https://vite.dev/guide/static-deploy.html) — build, diretório de saída, configuração de base e alojamento estático.

O conceito criativo, as escolhas de arquitetura e os orçamentos acima são propostas deste briefing. A sua qualidade e viabilidade devem ser demonstradas na implementação e nos testes.
