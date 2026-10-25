# Verificação e notas de entrega

Data: 21 de outubro de 2026.

## Testado efetivamente

- Sintaxe JavaScript de todos os ficheiros próprios.
- Percurso completo pela interface do navegador integrado: início, recolha das 30 pistas, 10 desafios, duas transições entre salas, cofre e conclusão com 100/100.
- Erro e nova tentativa nas cronologias; pistas adicionais; nenhuma penalização e atribuição de pontos apenas após conclusão.
- Simulação de abastecimento: remessa insuficiente, acima da capacidade e válida.
- Associação, ordenação por botões e seleção de múltiplas conclusões.
- Progresso recuperado após recarregar a página.
- Caderno com as dez aprendizagens, pistas e explicações, e exportação para TXT; ficheiro exportado reaberto e verificado.
- Seleção de ambiente, melodia, volume por teclado e modo desligado na interface; nenhum erro de execução observado. Esta verificação funcional não equivale a uma avaliação acústica com auscultadores.
- Reinício confirmado e cancelado, retorno ao início com zero pistas, som desligado e escolha dos dois avatares.
- Teclas de interação, navegação de formulários, fecho com Esc e botões de deslocação.
- Inspeção visual em disposição de computador e ecrã pequeno (390 × 844 solicitado ao navegador), incluindo caderno e controlos. A disposição do cabeçalho foi ajustada após inspeção.
- Validação automática dos dez conjuntos de respostas, rejeição de soluções erradas e 6 561 combinações inteiras da remessa (0–8 em quatro campos). Mais quatro entradas inválidas verificadas. Total: 6 585 verificações de lógica, sem falhas.
- Todos os recursos de execução são locais. p5.js 2.3.3 e Bootstrap 5.3.8 estão incluídos, com licenças. O logótipo é o original, apresentado com proporções preservadas.

## Limites de verificação

- A abertura direta por file:// foi bloqueada pela política do navegador de testes; não se tentou contornar essa política. A aplicação foi testada por HTTP em 127.0.0.1. Não usa módulos, fetch, servidor ou serviços externos para o funcionamento normal, pelo que foi preparada para abrir diretamente pelo ficheiro index.html.
- Não houve ensaio em dispositivos táteis físicos, Safari ou Firefox, nem auditoria completa com leitores de ecrã.
- O som foi testado através dos controlos e da execução no navegador; a experiência acústica e o volume real dependem do equipamento.
- Não houve revisão por docente independente. As fontes consultadas e as precisões históricas estão em GUIA.html e no botão Fontes e rigor histórico.

## Origem e enquadramento

Leram-se a sebenta original (38 páginas), a revista AESPC (24 páginas) e a planificação HIST_9ano (2 páginas). A sebenta revista é a base principal; a original serve de confronto. O âmbito é I.1 e I.2 do Tema I, não o programa anual inteiro. As remissões referem páginas PDF verificadas. Não se distribuem os PDF nem se atribuem páginas ao manual Somos História 9, que não foi fornecido.

Os cenários e as personagens pertencem a uma narrativa ficcional contemporânea de investigação. Os esquemas do cenário não representam fronteiras históricas precisas. As cartas são recriações didáticas claramente identificadas; não são testemunhos históricos. A remessa e os valores monetários são modelos fictícios, sem pretensão quantitativa histórica.

A ilustração foi gerada com a ferramenta integrada image_gen; o pedido original está em assets/PROMPT-ILUSTRACAO.txt. A imagem final está em assets/arquivo.png. Não se alterou o desenho do logótipo da escola. A nova banda sonora consiste em três composições originais geradas por síntese de instrumentos e renderizadas em MP3 locais. Os efeitos e o ambiente discreto usam Web Audio. Não se usam gravações históricas nem amostras externas.

Os ficheiros contêm apenas progresso e nome facultativo no armazenamento local do navegador. Não se enviam dados, não há contas, telemetria ou serviços remotos. A consulta de fontes externas é uma ação facultativa do jogador.

## Atualização da banda sonora

Substituída a sequência de notas isoladas por três composições originais de 64 segundos, uma por sala, com piano e timbres sintetizados de cordas, celesta e palhetas, baixo e pulsação discreta. A troca de tema acompanha a mudança de sala. A renderização usa reverberação com caudas circulares para facilitar a repetição. Os MP3 locais evitam depender da Internet. Volume de 0 a 100%, inicialmente 26%; som inicialmente desligado.

Os três temas foram verificados quanto a duração, descodificação e ausência de saturação na renderização (pico máximo 0,76 antes de codificar). A reprodução do primeiro tema, os dois modos, o volume e o desligar foram verificados funcionalmente no navegador. A troca entre os três ficheiros e as condições de pausa foram verificadas com testes do controlador. A apreciação musical e acústica final depende da escuta pelo utilizador.

O controlador atualizado passou 16 verificações específicas: seleção dos três temas, manutenção da faixa dentro da mesma sala, volume zero e máximo, pausa, retoma, troca de modo, cancelamento de pedidos concorrentes e limpeza dos efeitos ao desligar. A primeira faixa foi descodificada no navegador com duração de 64 segundos e posição de reprodução em avanço; ao desligar, ficou em pausa e regressou à posição zero.
