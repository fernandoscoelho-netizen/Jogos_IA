# Análise do projeto original e direção da nova versão

## Âmbito

Análise do ZIP `Clube-Europeu-ue_V2.zip`, extraído sem alterar o arquivo de origem para `original/clube-europeu-ue/`. Foram examinados a estrutura e os ficheiros de código separados, a composição do HTML final, o README e o texto do guia PDF. As páginas do guia que mostram a entrada e o mapa foram também renderizadas e inspecionadas visualmente.

Esta é uma análise documental e estática para preparar a especificação. Não constitui um teste funcional completo no navegador, benchmark ou auditoria factual de todos os conteúdos e ligações externas.

## O que existe

Uma aplicação de HTML, CSS e JavaScript sem framework de interface. O `build.py` incorpora dados, código, ilustrações e logótipo num único `index.html`. O `package.json` contém dependências para gerar o mapa, não Three.js. Não foram encontrados modelos 3D, texturas de monumentos, áudio ambiente gravado ou um motor 3D no pacote.

O mapa é SVG, com fronteiras de Natural Earth previamente projetadas. O gerador usa `world-atlas`, `topojson-client` e `d3-geo`, numa projeção cónica conforme. As coordenadas de cada cidade incluem posição projetada e latitude/longitude. Há camadas de UE, euro, Schengen e adesão, fichas de países, zoom, arrastamento, cidades selecionáveis e rotas.

As cidades são postais SVG gerados em `scenes.js`, posteriormente harmonizados num duotone azul com acentos dourados. A viagem anima um ícone num caminho curvo sobre o mapa: aproximadamente 2,6 segundos para avião e 3,2 para comboio, além dos movimentos de enquadramento. Há movimento na versão atual, mas não existe exploração de ambientes tridimensionais.

A experiência principal apresenta mapa e painel lado a lado, seguidos de uma grelha de cidades. Cada cidade abre num diálogo com etapas Conhecer, Quiz, Desafio e Carimbo. Esta organização pode ser substituída integralmente, conforme a preferência expressa pelo utilizador.

## Património pedagógico a conservar

- 13 paragens em sequência, 12 ligações e escolha entre comboio e avião nos troços elegíveis.
- 39 perguntas base e 26 perguntas adicionais, uma fácil e uma difícil por cidade: 65 perguntas definidas, combinadas em quizzes de três conforme o nível.
- 13 desafios distribuídos por cinco motores: seleção (2), associação (5), mapa (2), ordenação (3) e bandeira (1).
- Guias locais, instituições, cronologias, factos, expressões locais e ligações para fontes e vídeos.
- Três níveis, aprovação do quiz com 2/3, pistas, tentativas e melhor resultado.
- Diário com mínimo de 20/40 caracteres e máximo de 600, carimbos datados e avanço após conclusão.
- Passaporte, seis distinções, hino sintetizado no navegador, saudações em 24 línguas e síntese de voz.
- Ferramentas docentes: relatório, leitura de códigos, modo livre, alteração de nível e reinício com confirmação.
- Estado local com a chave `clube-europeu-ue-v1`, códigos `CLUBEUE1.` e certificado final.

O guia prevê trabalho em pares. Não existe sincronização entre dispositivos nem um sistema de contas; convém manter a utilização simples e local.

## O que a identidade visual oferece

A entrada é clara e luminosa: cabeçalho branco, azuis suaves, títulos Manrope, texto DM Sans e um bilhete ilustrado com apontamentos dourados. O formulário é direto e os níveis têm explicações curtas. Esta linguagem combina com uma experiência de descoberta escolar e pode sustentar uma abertura mais cinematográfica.

Os tokens incluem azul UE `#003399`, amarelo `#FFCC00`, azul principal `#2459A2`, fundo `#FBFCFE` e céu `#EAF2FF`. A nova versão pode preservar esta família visual e usar cores naturais nos monumentos. A preferência do utilizador é preservar este espírito, com liberdade total para reinventar a navegação.

## Pontos que exigem decisões na migração

1. **Novos recursos:** os postais existentes ajudam a definir os locais, mas modelos 3D reconhecíveis terão de ser criados ou obtidos com licença. A qualidade das cidades é uma tarefa de produção de conteúdo, além de programação.
2. **Locais culturais e institucionais:** alguns postais ilustram um símbolo turístico enquanto o conteúdo fala de outro local. Roma mostra o Coliseu, mas a atividade trata dos tratados assinados no Capitólio. Paris evoca a Torre Eiffel, mas o momento pedagógico é no Quai d’Orsay. A nova experiência deve dar presença aos dois papéis sem trocar os locais históricos.
3. **Escala urbana:** Luxemburgo e Schengen são uma única paragem pedagógica com lugares distintos. Lisboa também junta Belém e Cais do Sodré. Usar núcleos ligados por deslocações explícitas.
4. **Rotas:** `PERNAS` fornece uma lista de países por ligação, sem a distinguir por transporte. As curvas SVG são esquemáticas. Uma representação 3D mais concreta exige trajetos plausíveis e dados específicos de comboio/avião.
5. **Estimativas:** o código usa distância geodésica, fator ferroviário 1,25, velocidade 115 km/h e mais 0,3 h; para avião usa 700 km/h e mais 2,5 h. Emissões: 0,035 e 0,16 kg/km. O guia descreve o acréscimo ferroviário como 20 minutos; 0,3 h são 18 minutos. Uniformizar texto e fórmula, documentando a escolha. São parâmetros educativos simplificados, não valores operacionais validados nesta análise.
6. **Rigor conceptual:** a pergunta base de Varsóvia sobre «fronteira externa da UE» mistura na explicação os limites de Schengen. Deve ser revista com cuidado, mantendo a aprendizagem e distinguindo explicitamente os dois conceitos.
7. **Factos datados:** euro, Schengen, titulares, sedes e acontecimentos futuros têm de ser verificados antes da publicação. A nota de verificação do original não garante atualidade numa versão posterior.
8. **Distribuição:** o HTML atual funciona por abertura direta. Módulos, modelos e carregamento por cidade favorecem distribuição por servidor estático. Esta mudança deve ser explicada e testada, incluindo subpastas e disponibilidade offline, se implementada.
9. **Continuidade:** dados locais são associados à origem. A importação do código antigo é essencial ao mudar a forma de alojamento. O hash existente deteta algumas alterações, mas não oferece autenticação forte.
10. **Separação de responsabilidades:** a lógica de ensino e a persistência devem ficar independentes das cenas. Assim, falhar um modelo ou desativar WebGL não impede completar a atividade.

## Proposta resultante

O prompt propõe «O Expresso das Estrelas»: uma expedição com um bilhete que abre para o Porto, um atlas vivo da Europa, embarques, janelas de viagem e bairros exploráveis. O caderno de descobertas une diários, postais e carimbos.

As três escalas — Europa, deslocação e lugar — permitem dar sensação de viagem sem exigir a reconstrução integral de cidades ou do continente. Cada cidade recebe arquitetura própria e atividades contextualizadas. Câmaras orientam a descoberta, com controlo do aluno, transições ignoráveis e estabilidade durante leitura e provas.

A proposta não exige conservar a grelha de cartões, os diálogos e os separadores como navegação principal. Conserva conteúdos e regras, enquanto lhes dá uma apresentação espacial nova.

O documento `PROMPT_TECNICO_VIAGEM_UE_3D.md` contém o briefing completo, a proposta das 13 cidades, arquitetura técnica, migração, entregáveis e critérios de aceitação. A implementação da nova aplicação não foi iniciada: o pedido desta etapa é analisar e preparar o prompt.
